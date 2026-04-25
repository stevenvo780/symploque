#!/usr/bin/env python3
import argparse
import csv
import json
import os
import sys
from pathlib import Path
from urllib import error, parse, request


CSV_PATH = Path("05-datos-y-reportes/operacion-email/disculpa-error-pendientes.csv")


TEMPLATE_PATH = Path("04-mensajeria-email/01-disculpa-repetidos.md")
DEFAULT_SENDER = "ventas@elenxos.com"
DEFAULT_REVIEW_PATH = Path("04-mensajeria-email/lote-disculpa-error-revision.md")


def build_body(contact_name: str, body_variant: str, duplicate_count: int) -> str:
    with TEMPLATE_PATH.open("r", encoding="utf-8") as f:
        content = f.read()

    # Extraer el cuerpo despues de la linea '---'
    parts = content.split("---")
    if len(parts) > 1:
        body = parts[-1].strip()
    else:
        body = content.strip()

    if body_variant != "persona":
        contact_name = f"equipo de {contact_name}"

    # Reemplazar la variable {{contact_name}}
    body = body.replace("{{contact_name}}", contact_name)

    if duplicate_count > 1:
        body = body.replace("el correo anterior", "los correos anteriores")
        body = body.replace("El mensaje fue enviado", "Los mensajes fueron enviados")
        body = body.replace("ese mensaje", "esos mensajes")
        body = body.replace("No requiere", "No requieren")

    return body + "\n"


def format_review_markdown(rows: list[dict[str, str]], sender: str, csv_path: Path) -> str:
    double_rows = [row for row in rows if int(row["duplicate_count"]) > 1]
    lines = [
        "# Lote de Correos de Disculpa - Revision",
        "",
        "> Estado: borrador revisable. No se ha ejecutado ningun envio desde este archivo.",
        "",
        f"- Remitente oficial previsto: `{sender}`",
        f"- Archivo fuente: `{csv_path}`",
        f"- Plantilla base: `{TEMPLATE_PATH}`",
        f"- Total de correos en el lote: {len(rows)}",
        f"- Casos con mas de un envio errado registrado: {len(double_rows)}",
        "",
        "## Checklist antes del envio oficial",
        "",
        "- Confirmar que todos los destinatarios corresponden al incidente.",
        "- Confirmar que el asunto y el nombre de saludo son correctos.",
        "- Revisar especialmente los casos con mas de un envio errado.",
        f"- Preview en consola: `python3 scripts/enviar_lote_disculpa.py --sender {sender}`",
        f"- Envio oficial, solo tras aprobar: `python3 scripts/enviar_lote_disculpa.py --sender {sender} --send`",
        "",
        "## Correos",
        "",
    ]

    for index, row in enumerate(rows, start=1):
        body = build_body(row["contact_name"], row["body_variant"], int(row["duplicate_count"])).rstrip()
        lines.extend(
            [
                f"### {index:02d}. {row['contact_name']} - {row['institution']}",
                "",
                f"- Incidente: `{row['incident_id']}`",
                f"- Para: `{row['email']}`",
                f"- Remitente previsto: `{sender}`",
                f"- Asunto: `{row['subject']}`",
                f"- Variante: `{row['body_variant']}`",
                f"- Envios errados registrados: {row['duplicate_count']}",
                f"- Estado actual: `{row['send_status']}`",
                "",
                "```text",
                body,
                "```",
                "",
            ]
        )

    return "\n".join(lines)


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
    parser.add_argument("--sender", default=DEFAULT_SENDER, help="Cuenta remitente.")
    parser.add_argument(
        "--review-md",
        nargs="?",
        const=str(DEFAULT_REVIEW_PATH),
        help="Escribe un Markdown revisable del lote. Si no se pasa ruta, usa la ruta operativa por defecto.",
    )
    parser.add_argument("--send", action="store_true", help="Ejecuta el envio real. Sin esta bandera solo hace preview.")
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
            body = build_body(row["contact_name"], row["body_variant"], int(row["duplicate_count"]))
            print("---")
            print(row["email"])
            print(row["subject"])
            print(body)
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
