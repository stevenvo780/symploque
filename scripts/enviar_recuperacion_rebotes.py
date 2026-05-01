#!/usr/bin/env python3
"""Envio controlado para correos corregidos despues de rebote.

Por defecto solo hace preview. Para envio real requiere `--send --yes`.
No reintenta casos Javeriana con mail loop ni direcciones sin confirmacion.
"""

from __future__ import annotations

import argparse
import csv
from datetime import date, datetime, timedelta
import imaplib
import sys
import time
from pathlib import Path

from enviar_lote_primer_contacto import (
    DEFAULT_ENV_FILE,
    DEFAULT_IMAP_HOST,
    DEFAULT_SENT_FOLDER,
    DEFAULT_SENT_PATH,
    SENT_HEADERS,
    append_csv,
    append_sent_copy,
    build_sent_message,
    load_env_file,
    markdown_to_email_html,
    markdown_to_plain_text,
    read_csv,
    require_env,
    send_email_with_retries,
    write_log,
)


REPO_DIR = Path(__file__).resolve().parents[1]
MASTER_PATH = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "contactos-maestro-operativo.csv"
LEGACY_PATH = REPO_DIR / "05-datos-y-reportes" / "leads-agora-maestro.csv"
TOP50_PATH = REPO_DIR / "05-datos-y-reportes" / "leads-agora-top-50-hoy.csv"
DEFAULT_LOG_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "logs"
CAMPAIGN = "recuperacion_rebote_2026_04_30"
SENDER = "ventas@elenxos.com"
LANDING_URL = "https://agora.elenxos.com/"
FOLLOWUP_TEXT = "hacer seguimiento si no responde al correo corregido"


RECOVERY_ROWS = [
    {
        "contact_id": "agora-legacy-029",
        "contact_name": "Luis Fernando Gutierrez Cano",
        "organization": "UPB",
        "institution": "UPB",
        "bounced_email": "luisfe.gutierrezcano@upb.edu.co",
        "email": "luisfe.gutierrez@upb.edu.co",
        "subject": "Demo breve de Agora para investigacion y escritura academica",
        "body": """Hola Luis Fernando,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Creemos que puede ser util para flujos de comunicacion, investigacion y produccion textual en contexto universitario. Nos gustaria mostrarte una demo breve y ver si tiene sentido para algun grupo, curso o proyecto cercano a tu trabajo.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/""",
    },
    {
        "contact_id": "agora-legacy-124",
        "contact_name": "Maria Emilia Montes",
        "organization": "UNAL Bogota",
        "institution": "UNAL Bogota",
        "bounced_email": "memontesro@unal.edu.co",
        "email": "memontesr@unal.edu.co",
        "subject": "Agora para organizar fuentes, escritura y trabajo de investigacion",
        "body": """Hola Maria Emilia,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Por tu trabajo en linguistica y documentacion, creemos que Agora podria ser util para organizar materiales, evidencias, borradores y colaboracion en proyectos academicos. Nos gustaria mostrarte una demo breve y escuchar si hay algun caso donde pueda aportar.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/""",
    },
    {
        "contact_id": "agora-legacy-148",
        "contact_name": "Maria Eugenia Lopez",
        "organization": "UNAL Bogota",
        "institution": "UNAL Bogota",
        "bounced_email": "melopezhu@unal.edu.co",
        "email": "melopez@unal.edu.co",
        "subject": "Agora para ordenar escritura, fuentes y colaboracion academica",
        "body": """Hola Maria Eugenia,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Por tu trabajo en lenguas extranjeras e investigacion pedagogica, creemos que Agora podria ser util para centralizar materiales, evidencias, borradores y acompanamiento de proyectos academicos.

Si tiene sentido, nos gustaria compartirte una demo breve.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/""",
    },
]


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def line_terminator_for(path: Path) -> str:
    if not path.exists():
        return "\n"
    content = path.read_bytes()
    newline_count = content.count(b"\n")
    crlf_count = content.count(b"\r\n")
    return "\r\n" if newline_count and crlf_count == newline_count else "\n"


def write_csv_preserve(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    line_terminator = line_terminator_for(path)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, lineterminator=line_terminator)
        writer.writeheader()
        writer.writerows(rows)


def append_csv_preserve(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    exists = path.exists()
    line_terminator = line_terminator_for(path)
    with path.open("a", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, lineterminator=line_terminator)
        if not exists:
            writer.writeheader()
        writer.writerows(rows)


def sent_keys(rows: list[dict[str, str]]) -> set[tuple[str, str]]:
    return {
        (normalize(row.get("source_id", "")), normalize_email(row.get("email", "")))
        for row in rows
        if normalize(row.get("source_id", "")) or normalize_email(row.get("email", ""))
    }


def open_imap_sent(sender: str, password: str) -> imaplib.IMAP4_SSL:
    import os

    host = os.environ.get("MAIL_IMAP_HOST", DEFAULT_IMAP_HOST)
    port = int(os.environ.get("MAIL_IMAP_PORT", "993"))
    client = imaplib.IMAP4_SSL(host, port)
    client.login(sender, password)
    return client


def build_sent_row(row: dict[str, str], master_row: dict[str, str], sent_at: str) -> dict[str, str]:
    return {
        "source_id": row["contact_id"],
        "contact_name": row["contact_name"],
        "organization": row["organization"],
        "institution": row["institution"],
        "email": row["email"],
        "sent_at": sent_at,
        "last_sender_email": SENDER,
        "sender_identity": "corporate",
        "campaign": CAMPAIGN,
        "subject": row["subject"],
        "landing_url_shared": LANDING_URL,
        "reply_status": "pending",
        "declaration_required": "no",
        "declaration_status": "not_applicable",
        "notes": (
            f"Reenvio recuperacion de rebote. correo_rebotado={row['bounced_email']}; "
            f"erp_sync_status={master_row.get('erp_sync_status', '')}; "
            f"erp_lead_id={master_row.get('erp_lead_id', '')}"
        ),
    }


def update_master_row(master_row: dict[str, str], recovery_row: dict[str, str], sent_day: date) -> None:
    old_email = master_row.get("contact_value", recovery_row["bounced_email"])
    master_row["contact_channel"] = "email"
    master_row["contact_value"] = recovery_row["email"]
    master_row["quick_contact_url"] = f"mailto:{recovery_row['email']}"
    master_row["status"] = "first_contact_sent"
    master_row["last_contact_date"] = sent_day.isoformat()
    master_row["next_action"] = FOLLOWUP_TEXT
    master_row["next_action_date"] = (sent_day + timedelta(days=7)).isoformat()
    master_row["reply_status"] = "pending"
    master_row["last_sender_email"] = SENDER
    master_row["last_sender_identity"] = "corporate"
    master_row["last_campaign"] = CAMPAIGN
    master_row["last_subject"] = recovery_row["subject"]
    master_row["landing_url_sent"] = LANDING_URL
    master_row["declaration_required"] = "no"
    master_row["declaration_status"] = "not_applicable"
    master_row["notes"] = (
        f"Correo recuperado tras rebote: {old_email} -> {recovery_row['email']}. "
        f"Primer contacto corregido enviado el {sent_day.isoformat()} desde {SENDER}; "
        f"campana {CAMPAIGN}."
    )


def update_legacy_rows(recovery_rows: list[dict[str, str]], sent_day: date) -> None:
    by_person = {(row["contact_name"], row["institution"]): row for row in recovery_rows}
    for path in [LEGACY_PATH, TOP50_PATH]:
        if not path.exists():
            continue
        headers, rows = read_csv(path)
        changed = False
        for row in rows:
            recovery_row = by_person.get((row.get("contact_name", ""), row.get("institution", "")))
            if not recovery_row:
                continue
            old_email = row.get("contact_value", recovery_row["bounced_email"])
            row["contact_type"] = "email"
            row["contact_value"] = recovery_row["email"]
            row["quick_contact_url"] = f"mailto:{recovery_row['email']}"
            row["estado"] = "contactado"
            row["fecha_ultimo_contacto"] = sent_day.isoformat()
            row["proxima_accion"] = FOLLOWUP_TEXT
            row["fecha_proxima_accion"] = (sent_day + timedelta(days=7)).isoformat()
            row["respuesta"] = "pendiente"
            row["canal_preferido"] = "email"
            row["notas"] = (
                f"Correo recuperado tras rebote: {old_email} -> {recovery_row['email']}. "
                f"Primer contacto corregido enviado desde {SENDER}; campana {CAMPAIGN}."
            )
            changed = True
        if changed:
            write_csv_preserve(path, headers, rows)


def validate_rows(master_by_id: dict[str, dict[str, str]], existing_sent: set[tuple[str, str]]) -> list[str]:
    errors: list[str] = []
    for row in RECOVERY_ROWS:
        contact_id = row["contact_id"]
        email = normalize_email(row["email"])
        master_row = master_by_id.get(contact_id)
        if master_row is None:
            errors.append(f"{contact_id}: no existe en maestro operativo")
            continue
        if (contact_id, email) in existing_sent:
            errors.append(f"{contact_id}: ya fue enviado a {email}")
        if master_row.get("reply_status") not in {"bounced", "pending"}:
            errors.append(f"{contact_id}: reply_status inesperado {master_row.get('reply_status', '')}")
        if normalize_email(master_row.get("contact_value", "")) == email and master_row.get("last_campaign") == CAMPAIGN:
            errors.append(f"{contact_id}: maestro ya parece actualizado con la campana {CAMPAIGN}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Envio controlado de recuperacion de rebotes.")
    parser.add_argument("--send", action="store_true", help="Ejecuta envio real.")
    parser.add_argument("--yes", action="store_true", help="Confirma ejecucion no interactiva.")
    parser.add_argument("--no-append-sent", action="store_true", help="No guarda copia en IMAP Sent.")
    parser.add_argument("--delay-seconds", type=float, default=1.0, help="Pausa entre envios aceptados.")
    parser.add_argument("--retries", type=int, default=1, help="Reintentos adicionales por envio.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local.")
    parser.add_argument("--log-dir", default=str(DEFAULT_LOG_DIR), help="Directorio de logs.")
    args = parser.parse_args()

    if args.delay_seconds < 0:
        print("--delay-seconds no puede ser negativo", file=sys.stderr)
        return 2
    if args.retries < 0:
        print("--retries no puede ser negativo", file=sys.stderr)
        return 2

    load_env_file(Path(args.env_file))
    master_headers, master_rows = read_csv(MASTER_PATH)
    _, sent_rows_existing = read_csv(DEFAULT_SENT_PATH)
    master_by_id = {row["contact_id"]: row for row in master_rows}
    errors = validate_rows(master_by_id, sent_keys(sent_rows_existing))

    print(f"Lote recuperacion: {len(RECOVERY_ROWS)}")
    print(f"Campana: {CAMPAIGN}")
    for row in RECOVERY_ROWS:
        print(f"- {row['contact_id']} {row['bounced_email']} -> {row['email']} | {row['subject']}")

    if errors:
        print("\nBloqueos:")
        for error in errors:
            print(f"- {error}")
        return 3 if args.send else 0

    if not args.send:
        print("\nPreview solamente. No se envio ningun correo.")
        return 0
    if not args.yes:
        print("Para envio real use --send --yes", file=sys.stderr)
        return 2

    base_url = require_env("MAIL_API_BASE_URL")
    api_key = require_env("MAIL_API_KEY")
    password = require_env("MAIL_FROM_PASSWORD")

    sent_folder = __import__("os").environ.get("MAIL_SENT_FOLDER", DEFAULT_SENT_FOLDER)
    imap_client: imaplib.IMAP4_SSL | None = None
    if not args.no_append_sent:
        try:
            imap_client = open_imap_sent(SENDER, password)
        except Exception as exc:  # noqa: BLE001
            print(f"No se pudo abrir IMAP para guardar copias en Sent: {exc}", file=sys.stderr)

    sent_at = datetime.now().isoformat(timespec="seconds")
    sent_day = date.today()
    sent_rows_new: list[dict[str, str]] = []
    sent_recovery_rows: list[dict[str, str]] = []
    log_rows: list[dict[str, str]] = []
    failures = 0

    for index, row in enumerate(RECOVERY_ROWS, start=1):
        html_body = markdown_to_email_html(row["body"])
        plain_body = markdown_to_plain_text(row["body"])
        ok, detail = send_email_with_retries(
            base_url,
            api_key,
            SENDER,
            password,
            row["email"],
            row["subject"],
            plain_body,
            html_body,
            args.retries,
        )
        if ok and imap_client is not None:
            copy_ok, copy_detail = append_sent_copy(
                imap_client,
                sent_folder,
                build_sent_message(SENDER, row["email"], row["subject"], row["body"], row["contact_id"], CAMPAIGN, html_body),
            )
            detail = f"{detail} {copy_detail}"
        status = "sent" if ok else "failed"
        print(f"{status.upper()} {row['contact_id']} {row['email']} {detail}")
        log_rows.append({"timestamp": sent_at, "contact_id": row["contact_id"], "email": row["email"], "status": status, "detail": detail[:700]})
        if ok:
            master_row = master_by_id[row["contact_id"]]
            sent_rows_new.append(build_sent_row(row, master_row, sent_at))
            update_master_row(master_row, row, sent_day)
            sent_recovery_rows.append(row)
            if args.delay_seconds and index < len(RECOVERY_ROWS):
                time.sleep(args.delay_seconds)
        else:
            failures += 1

    if sent_rows_new:
        append_csv_preserve(DEFAULT_SENT_PATH, SENT_HEADERS, sent_rows_new)
        write_csv_preserve(MASTER_PATH, master_headers, master_rows)
        update_legacy_rows(sent_recovery_rows, sent_day)

    log_path = Path(args.log_dir) / f"recuperacion-rebotes-{datetime.now().strftime('%Y%m%d-%H%M%S')}.csv"
    write_log(log_path, log_rows)

    if imap_client is not None:
        try:
            imap_client.logout()
        except Exception:
            pass

    print(f"Log: {log_path}")
    print(f"Resumen: enviados={len(sent_rows_new)} fallidos={failures}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
