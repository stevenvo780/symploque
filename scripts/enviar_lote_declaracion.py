#!/usr/bin/env python3
"""Generar lote de correos de declaración para revisión y envío."""
import argparse
import csv
import json
import os
import sys
from pathlib import Path
from urllib import error, parse, request


CSV_PATH = Path("05-datos-y-reportes/operacion-email/declaracion-pendientes.csv")
TEMPLATE_PATH = Path("04-mensajeria-email/06-correo-declaracion.md")
DEFAULT_SENDER = "ventas@elenxos.com"
DEFAULT_REVIEW_PATH = Path("04-mensajeria-email/lote-declaracion-revision.md")


def build_body(contact_name: str, institution: str, role_or_unit: str) -> str:
    with TEMPLATE_PATH.open("r", encoding="utf-8") as f:
        content = f.read()

    # Extraer el cuerpo después de la línea '---'
    parts = content.split("---")
    if len(parts) > 1:
        body = parts[-1].strip()
    else:
        body = content.strip()

    # Reemplazar variables
    body = body.replace("{{contact_name}}", contact_name)
    body = body.replace("{{institution}}", institution)
    body = body.replace("{{role_or_unit}}", role_or_unit or "su unidad")

    return body + "\n"


def format_review_markdown(rows: list[dict[str, str]], sender: str, csv_path: Path) -> str:
    lines = [
        "# Lote de Correos de Declaración - Revisión",
        "",
        f"> Estado: listo para enviar tras aprobación",
        f"- Remitente oficial: `{sender}`",
        f"- Archivo fuente: `{csv_path}`",
        f"- Plantilla base: `{TEMPLATE_PATH}`",
        f"- Total de correos en el lote: {len(rows)}",
        "",
        "## Checklist antes del envío",
        "",
        "- Confirmar que todos los destinatarios ya recibieron correo previo",
        "- Revisar que el asunto sea apropiado",
        "- Verificar que el nombre de saludo sea correcto",
        f"- Preview: `python3 scripts/enviar_lote_declaracion.py --sender {sender}`",
        f"- Envío oficial: `python3 scripts/enviar_lote_declaracion.py --sender {sender} --send`",
        "",
        "## Correos",
        "",
    ]

    for index, row in enumerate(rows, start=1):
        body = build_body(row["contact_name"], row["institution"], row.get("role_or_unit", "")).rstrip()
        lines.extend(
            [
                f"### {index:02d}. {row['contact_name']} - {row['institution']}",
                "",
                f"- Para: `{row['email']}`",
                f"- Remitente: `{sender}`",
                f"- Asunto: `Desde Elenxos - Actualización de nuestro canal de comunicación`",
                f"- Razón: `{row.get('declaration_reason', 'normalizar canal')}`",
                f"- Prioridad: `{row.get('declaration_priority', 'media')}`",
                f"- Estado: `{row.get('send_status', 'pending')}`",
                "",
                "```text",
                body,
                "```",
                "",
            ]
        )

    return "\n".join(lines)


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


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required env var: {name}")
    return value


def main() -> int:
    parser = argparse.ArgumentParser(description="Enviar lote de declaración.")
    parser.add_argument("--csv", default=str(CSV_PATH), help="Ruta al CSV del lote.")
    parser.add_argument("--sender", default=DEFAULT_SENDER, help="Cuenta remitente.")
    parser.add_argument(
        "--review-md",
        nargs="?",
        const=str(DEFAULT_REVIEW_PATH),
        help="Escribe un Markdown revisable del lote.",
    )
    parser.add_argument("--send", action="store_true", help="Ejecuta el envío real.")
    args = parser.parse_args()

    path = Path(args.csv)
    if not path.exists():
        print(f"CSV not found: {path}", file=sys.stderr)
        return 1

    with path.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    if args.send and args.review_md:
        print("--review-md no puede combinarse con --send.", file=sys.stderr)
        return 2

    if not args.send:
        if args.review_md:
            review_path = Path(args.review_md)
            review_path.parent.mkdir(parents=True, exist_ok=True)
            review_path.write_text(format_review_markdown(rows, args.sender, path), encoding="utf-8")
            print(f"Review written to {review_path}")
            return 0

        print(f"Preview for {len(rows)} emails from {args.sender}")
        for row in rows:
            body = build_body(row["contact_name"], row["institution"], row.get("role_or_unit", ""))
            print("---")
            print(row["email"])
            print("Desde Elenxos - Actualización de nuestro canal de comunicación")
            print(body)
        return 0

    print(f"\n¡ADVERTENCIA DE SEGURIDAD!")
    print(f"Está a punto de enviar {len(rows)} correos reales desde {args.sender}.")
    confirm = input("¿Está absolutamente seguro? Escriba 'CONFIRMAR' para enviar: ")
    if confirm != "CONFIRMAR":
        print("Envío cancelado.")
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
        body = build_body(row["contact_name"], row["institution"], row.get("role_or_unit", ""))
        ok, detail = send_email(base_url, api_key, args.sender, sender_password, row["email"], "Desde Elenxos - Actualización de nuestro canal de comunicación", body)
        status = "OK" if ok else "FAIL"
        print(f"{status} {row['email']} {detail}")
        if not ok:
            failures += 1

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())