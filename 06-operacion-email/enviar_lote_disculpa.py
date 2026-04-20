#!/usr/bin/env python3
import argparse
import csv
import json
import os
import sys
from pathlib import Path
from urllib import error, parse, request


CSV_PATH = Path("03-datos/operacion-email/disculpa-error-pendientes.csv")


def build_body(contact_name: str, body_variant: str, duplicate_count: int) -> str:
    if body_variant == "persona":
        saludo = f"Hola, {contact_name}."
    else:
        saludo = f"Hola, equipo de {contact_name}."

    mensaje_prev = "los correos anteriores, que fueron enviados por error" if duplicate_count > 1 else "el correo anterior, que fue enviado por error"

    return (
        f"{saludo}\n\n"
        f"Le escribimos desde Elenxos para ofrecer una disculpa por {mensaje_prev}.\n\n"
        "Por favor ignore ese mensaje. No requiere ninguna accion de su parte.\n\n"
        "Lamentamos la confusion y agradecemos su comprension.\n\n"
        "Saludos,\n"
        "Equipo Elenxos\n"
        "www.elenxos.com\n"
    )


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required env var: {name}")
    return value


def send_email(base_url: str, api_key: str, sender: str, sender_password: str, to: str, subject: str, body: str) -> tuple[bool, str]:
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
        with request.urlopen(req, timeout=30) as resp:
            data = resp.read().decode("utf-8", "replace")
        return True, data
    except error.HTTPError as exc:
        return False, exc.read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)


def main() -> int:
    parser = argparse.ArgumentParser(description="Enviar lote de disculpa por error de envio.")
    parser.add_argument("--csv", default=str(CSV_PATH), help="Ruta al CSV del lote.")
    parser.add_argument("--sender", default="admin@elenxos.com", help="Cuenta remitente.")
    parser.add_argument("--send", action="store_true", help="Ejecuta el envio real. Sin esta bandera solo hace preview.")
    args = parser.parse_args()

    path = Path(args.csv)
    if not path.exists():
        print(f"CSV not found: {path}", file=sys.stderr)
        return 1

    with path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    if not args.send:
        print(f"Preview for {len(rows)} emails from {args.sender}")
        for row in rows:
            body = build_body(row["contact_name"], row["body_variant"], int(row["duplicate_count"]))
            print("---")
            print(row["email"])
            print(row["subject"])
            print(body)
        return 0

    try:
        base_url = require_env("MAIL_API_BASE_URL")
        api_key = require_env("MAIL_API_KEY")
        sender_password = require_env("MAIL_FROM_PASSWORD")
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    failures = 0
    for row in rows:
        body = build_body(row["contact_name"], row["body_variant"], int(row["duplicate_count"]))
        ok, detail = send_email(base_url, api_key, args.sender, sender_password, row["email"], row["subject"], body)
        status = "OK" if ok else "FAIL"
        print(f"{status} {row['email']} {detail}")
        if not ok:
            failures += 1

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
