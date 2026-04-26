#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from datetime import datetime
import json
import os
import re
import sys
from time import monotonic
from pathlib import Path
from urllib import error, parse, request


REPO_DIR = Path(__file__).resolve().parents[1]
CSV_PATH = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "disculpa-error-pendientes.csv"
DEFAULT_LOG_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "logs"
REQUIRED_COLUMNS = {"email", "contact_name", "subject", "body_variant", "duplicate_count"}
VALID_BODY_VARIANTS = {"persona", "organizacion", "unidad"}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@dataclass(frozen=True)
class SendResult:
    ok: bool
    detail: str
    http_status: int | None
    attempts: int


@dataclass(frozen=True)
class ValidationResult:
    rows: list[dict[str, str]]
    warnings: list[str]


def build_body(contact_name: str, body_variant: str, duplicate_count: int) -> str:
    if body_variant == "persona":
        saludo = f"Hola, {contact_name}."
    else:
        saludo = f"Hola, equipo de {contact_name}."

    mensaje_prev = "los correos anteriores, que fueron enviados por error" if duplicate_count > 1 else "el correo anterior, que fue enviado por error"

    return (
        f"{saludo}\n\n"
        f"Le escribimos desde Elenxos para ofrecer una sincera disculpa por {mensaje_prev} durante la migración de nuestro sistema.\n\n"
        "Por favor ignore ese mensaje. No requiere ninguna acción de su parte.\n\n"
        "Lamentamos la confusión y agradecemos profundamente su comprensión.\n\n"
        "Saludos,\n\n"
        "Jacob Agudelo & Steven Vallejo\n"
        "Fundadores, Elenxos\n"
        "www.elenxos.com\n"
    )


def normalize_email(value: str) -> str:
    return value.strip().lower()


def is_valid_email(value: str) -> bool:
    return bool(EMAIL_RE.match(value))


def truncate_detail(value: str, max_len: int = 700) -> str:
    value = value.replace("\n", " ").strip()
    if len(value) <= max_len:
        return value
    return f"{value[:max_len]}..."


def load_and_validate_rows(path: Path, allow_duplicates: bool) -> ValidationResult:
    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = set(reader.fieldnames or [])
        missing = sorted(REQUIRED_COLUMNS - fieldnames)
        if missing:
            raise ValueError(f"CSV invalido. Faltan columnas obligatorias: {', '.join(missing)}")

        rows: list[dict[str, str]] = []
        errors: list[str] = []
        warnings: list[str] = []
        seen_emails: dict[str, int] = {}

        for line_number, raw_row in enumerate(reader, start=2):
            row = {key: (value or "").strip() for key, value in raw_row.items() if key is not None}
            email = normalize_email(row.get("email", ""))
            row["email"] = email
            row["_line"] = str(line_number)

            for column in REQUIRED_COLUMNS:
                if not row.get(column):
                    errors.append(f"Linea {line_number}: columna obligatoria vacia: {column}")

            if email and not is_valid_email(email):
                errors.append(f"Linea {line_number}: email invalido: {email}")

            variant = row.get("body_variant", "")
            if variant and variant not in VALID_BODY_VARIANTS:
                errors.append(
                    f"Linea {line_number}: body_variant invalido '{variant}'. Valores: {', '.join(sorted(VALID_BODY_VARIANTS))}"
                )

            duplicate_count_raw = row.get("duplicate_count", "")
            if duplicate_count_raw:
                try:
                    duplicate_count = int(duplicate_count_raw)
                    if duplicate_count < 1:
                        raise ValueError
                except ValueError:
                    errors.append(f"Linea {line_number}: duplicate_count debe ser entero positivo")

            if email:
                if email in seen_emails:
                    message = f"Email duplicado: {email} (lineas {seen_emails[email]} y {line_number})"
                    if allow_duplicates:
                        warnings.append(message)
                    else:
                        errors.append(message)
                else:
                    seen_emails[email] = line_number

            rows.append(row)

    if errors:
        raise ValueError("\n".join(errors))

    return ValidationResult(rows=rows, warnings=warnings)


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required env var: {name}")
    return value


def send_email_once(
    base_url: str,
    api_key: str,
    sender: str,
    sender_password: str,
    to: str,
    subject: str,
    body: str,
    timeout: float,
) -> tuple[bool, str, int | None]:
    url = f"{base_url.rstrip('/')}/send?{parse.urlencode({'api_key': api_key})}"
    payload = json.dumps(
        {
            "from_email": sender,
            "from_password": sender_password,
            "to": to,
            "subject": subject,
            "body": body,
        }
    ).encode("utf-8")
    req = request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with request.urlopen(req, timeout=timeout) as resp:
            data = resp.read().decode("utf-8", "replace")
            status = getattr(resp, "status", None)
        return 200 <= int(status or 200) < 300, data, int(status or 200)
    except error.HTTPError as exc:
        return False, exc.read().decode("utf-8", "replace"), exc.code
    except Exception as exc:  # noqa: BLE001
        return False, str(exc), None


def should_retry(result: SendResult) -> bool:
    if result.ok:
        return False
    if result.http_status is None:
        return True
    return result.http_status in {408, 409, 425, 429} or result.http_status >= 500


def send_email(
    base_url: str,
    api_key: str,
    sender: str,
    sender_password: str,
    to: str,
    subject: str,
    body: str,
    timeout: float,
    retries: int,
) -> SendResult:
    attempts = 0
    last = SendResult(ok=False, detail="not attempted", http_status=None, attempts=0)
    max_attempts = max(1, retries + 1)

    while attempts < max_attempts:
        attempts += 1
        started = monotonic()
        ok, detail, http_status = send_email_once(base_url, api_key, sender, sender_password, to, subject, body, timeout)
        elapsed = monotonic() - started
        last = SendResult(ok=ok, detail=f"{detail} (elapsed={elapsed:.2f}s)", http_status=http_status, attempts=attempts)
        if not should_retry(last):
            return last

    return last


def write_log_header(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["timestamp", "line", "email", "subject", "sender", "status", "http_status", "attempts", "detail"],
        )
        writer.writeheader()


def append_log(path: Path, row: dict[str, str], sender: str, result: SendResult) -> None:
    with path.open("a", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["timestamp", "line", "email", "subject", "sender", "status", "http_status", "attempts", "detail"],
        )
        writer.writerow(
            {
                "timestamp": datetime.now().isoformat(timespec="seconds"),
                "line": row.get("_line", ""),
                "email": row.get("email", ""),
                "subject": row.get("subject", ""),
                "sender": sender,
                "status": "ok" if result.ok else "fail",
                "http_status": "" if result.http_status is None else str(result.http_status),
                "attempts": str(result.attempts),
                "detail": truncate_detail(result.detail),
            }
        )


def main() -> int:
    parser = argparse.ArgumentParser(description="Enviar lote de disculpa por error de envio.")
    parser.add_argument("--csv", default=str(CSV_PATH), help="Ruta al CSV del lote.")
    parser.add_argument("--sender", default="admin@elenxos.com", help="Cuenta remitente.")
    parser.add_argument("--send", action="store_true", help="Ejecuta el envio real. Sin esta bandera solo hace preview.")
    parser.add_argument("--allow-duplicates", action="store_true", help="Permite emails duplicados en el CSV. Por defecto se bloquean.")
    parser.add_argument("--limit", type=int, help="Limita el lote a las primeras N filas validas.")
    parser.add_argument("--retries", type=int, default=2, help="Reintentos por email ante errores transitorios. Default: 2.")
    parser.add_argument("--timeout", type=float, default=30.0, help="Timeout HTTP por intento, en segundos. Default: 30.")
    parser.add_argument("--log-dir", default=str(DEFAULT_LOG_DIR), help="Directorio local para logs CSV de envio.")
    args = parser.parse_args()

    path = Path(args.csv)
    if not path.exists():
        print(f"CSV not found: {path}", file=sys.stderr)
        return 1

    try:
        validation = load_and_validate_rows(path, args.allow_duplicates)
    except ValueError as exc:
        print(f"Validacion fallida:\n{exc}", file=sys.stderr)
        return 3

    rows = validation.rows
    if args.limit is not None:
        if args.limit < 1:
            print("--limit debe ser mayor que cero", file=sys.stderr)
            return 3
        rows = rows[: args.limit]

    for warning in validation.warnings:
        print(f"WARN {warning}", file=sys.stderr)

    if not args.send:
        print(f"Preview for {len(rows)} emails from {args.sender}")
        for row in rows:
            body = build_body(row["contact_name"], row["body_variant"], int(row["duplicate_count"]))
            print("---")
            print(f"linea CSV: {row.get('_line', '')}")
            print(row["email"])
            print(row["subject"])
            print(body)
        print("---")
        print("Preview completado. Para envio real: repetir con --send despues de revisar el lote.")
        return 0

    print(f"\n¡ADVERTENCIA DE SEGURIDAD!")
    print(f"Está a punto de enviar {len(rows)} correos reales desde {args.sender}.")
    print("Asegúrese de haber revisado el preview sin la bandera --send antes de continuar.")
    confirm = input("¿Está absolutamente seguro de que desea proceder? Escriba 'CONFIRMAR' para enviar: ")
    if confirm != "CONFIRMAR":
        print("Envío cancelado por seguridad.")
        return 0

    try:
        base_url = require_env("MAIL_API_BASE_URL")
        api_key = require_env("MAIL_API_KEY")
        sender_password = require_env("MAIL_FROM_PASSWORD")
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    log_path = Path(args.log_dir) / f"envio-disculpa-{timestamp}.csv"
    write_log_header(log_path)
    print(f"Log local: {log_path}")

    failures = 0
    for row in rows:
        body = build_body(row["contact_name"], row["body_variant"], int(row["duplicate_count"]))
        result = send_email(
            base_url,
            api_key,
            args.sender,
            sender_password,
            row["email"],
            row["subject"],
            body,
            timeout=args.timeout,
            retries=args.retries,
        )
        append_log(log_path, row, args.sender, result)
        status = "OK" if result.ok else "FAIL"
        http_status = "" if result.http_status is None else f" http={result.http_status}"
        print(f"{status} {row['email']} attempts={result.attempts}{http_status} {truncate_detail(result.detail)}")
        if not result.ok:
            failures += 1

    print(f"Resumen: enviados_ok={len(rows) - failures} fallidos={failures} log={log_path}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
