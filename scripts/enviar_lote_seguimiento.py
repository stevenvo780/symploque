#!/usr/bin/env python3
"""Preview/envio controlado del lote de seguimiento.

Por defecto solo hace preview. Para envio real exige `--send`, confirmacion
interactiva, fecha habilitada, credenciales Mail API y filas aun elegibles en
el maestro operativo.
"""

from __future__ import annotations

import argparse
import csv
from datetime import date, datetime, timedelta
from pathlib import Path
import re
import sys
import time

from enviar_lote_primer_contacto import (
    DEFAULT_ENV_FILE,
    DEFAULT_LOG_DIR,
    DEFAULT_SENT_FOLDER,
    DEFAULT_SENT_PATH,
    LEGACY_PATH,
    MASTER_PATH,
    SENT_HEADERS,
    TOP50_PATH,
    append_csv,
    append_sent_copy,
    build_sent_message,
    load_env_file,
    markdown_to_email_html,
    normalize,
    normalize_email,
    open_imap_sent,
    read_csv,
    require_env,
    send_email_with_retries,
    write_csv,
)


REPO_DIR = Path(__file__).resolve().parents[1]
OPERACION_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email"
DEFAULT_FOLLOWUP_CSV = OPERACION_DIR / "seguimiento-2026-05-04.csv"
CAMPAIGNS = {"primer_contacto_wave_1", "primer_contacto_wave_2", "primer_contacto_wave_3"}
REQUIRED_LOTE_HEADERS = {
    "contact_id",
    "email",
    "followup_subject",
    "sender",
    "landing_url",
    "body_text",
    "send_status",
    "sent_at",
    "notes",
}


def infer_target_date(path: Path) -> str:
    match = re.search(r"seguimiento-(\d{4}-\d{2}-\d{2})", path.name)
    return match.group(1) if match else "2026-05-04"


def campaign_name(target_date: str) -> str:
    return f"seguimiento_{target_date.replace('-', '_')}"


def sent_campaign_keys(rows: list[dict[str, str]]) -> set[tuple[str, str, str]]:
    keys: set[tuple[str, str, str]] = set()
    for row in rows:
        contact_id = normalize(row.get("source_id", ""))
        email = normalize_email(row.get("email", ""))
        campaign = normalize(row.get("campaign", ""))
        if contact_id or email:
            keys.add((contact_id, email, campaign))
    return keys


def select_lote_rows(lote_rows: list[dict[str, str]], limit: int | None) -> list[dict[str, str]]:
    closed_statuses = {"sent", "bounced", "do_not_contact"}
    selected = [row for row in lote_rows if normalize(row.get("send_status", "")).lower() not in closed_statuses]
    if limit is not None:
        selected = selected[:limit]
    return selected


def validate_headers(headers: list[str]) -> list[str]:
    missing = sorted(REQUIRED_LOTE_HEADERS - set(headers))
    return [f"faltan columnas en CSV de seguimiento: {', '.join(missing)}"] if missing else []


def validate_sendable(
    selected: list[dict[str, str]],
    master_by_id: dict[str, dict[str, str]],
    existing_sent: set[tuple[str, str, str]],
    target_date: str,
    campaign: str,
    allowed_campaigns: set[str],
) -> list[str]:
    errors: list[str] = []
    for row in selected:
        contact_id = normalize(row.get("contact_id", ""))
        email = normalize_email(row.get("email", ""))
        source = master_by_id.get(contact_id)
        if source is None:
            errors.append(f"{contact_id}: no existe en maestro operativo")
            continue
        if (contact_id, email, campaign) in existing_sent:
            errors.append(f"{contact_id}: ya existe envio de campana {campaign}")
        if source.get("status", "") != "first_contact_sent":
            errors.append(f"{contact_id}: status={source.get('status', '')}; requiere first_contact_sent")
        if source.get("reply_status", "") != "pending":
            errors.append(f"{contact_id}: reply_status={source.get('reply_status', '')}; requiere pending")
        if source.get("next_action_date", "") != target_date:
            errors.append(f"{contact_id}: next_action_date={source.get('next_action_date', '')}; requiere {target_date}")
        if source.get("last_campaign", "") not in allowed_campaigns:
            errors.append(f"{contact_id}: last_campaign={source.get('last_campaign', '')}; no es primer contacto elegible")
        if source.get("contact_channel", "") != "email":
            errors.append(f"{contact_id}: canal={source.get('contact_channel', '')}; requiere email")
        if normalize_email(source.get("contact_value", "")) != email:
            errors.append(f"{contact_id}: email del lote no coincide con maestro")
        if not normalize(row.get("followup_subject", "")):
            errors.append(f"{contact_id}: followup_subject vacio")
        if not normalize(row.get("body_text", "")):
            errors.append(f"{contact_id}: body_text vacio")
        if not normalize(row.get("sender", "")):
            errors.append(f"{contact_id}: sender vacio")
    return errors


def build_sent_row(row: dict[str, str], source: dict[str, str], sent_at: str, campaign: str) -> dict[str, str]:
    return {
        "source_id": row.get("contact_id", ""),
        "contact_name": row.get("contact_name", ""),
        "organization": source.get("organization", ""),
        "institution": row.get("institution", "") or source.get("institution", ""),
        "email": row.get("email", ""),
        "sent_at": sent_at,
        "last_sender_email": row.get("sender", ""),
        "sender_identity": "corporate",
        "campaign": campaign,
        "subject": row.get("followup_subject", ""),
        "landing_url_shared": row.get("landing_url", ""),
        "reply_status": "pending",
        "declaration_required": "no",
        "declaration_status": "not_applicable",
        "notes": f"Envio seguimiento. Primer contacto previo={source.get('last_campaign', '')}; erp_lead_id={source.get('erp_lead_id', '')}",
    }


def update_master_row(source: dict[str, str], lote_row: dict[str, str], sent_date: date, campaign: str) -> None:
    source["status"] = "followup_sent"
    source["last_contact_date"] = sent_date.isoformat()
    source["next_action"] = "esperar respuesta y proponer demo si hay interes"
    source["next_action_date"] = (sent_date + timedelta(days=7)).isoformat()
    source["reply_status"] = "pending"
    source["last_sender_email"] = lote_row.get("sender", "")
    source["last_sender_identity"] = "corporate"
    source["last_campaign"] = campaign
    source["last_subject"] = lote_row.get("followup_subject", "")
    source["landing_url_sent"] = lote_row.get("landing_url", "")
    source["declaration_required"] = "no"
    source["declaration_status"] = "not_applicable"
    source["notes"] = (
        f"Seguimiento enviado el {sent_date.isoformat()} desde {lote_row.get('sender', '')}; "
        f"campana {campaign}; no enviar nuevo seguimiento antes de revisar respuestas."
    )


def sync_legacy_statuses(master_rows: list[dict[str, str]]) -> None:
    by_email = {normalize_email(row.get("contact_value", "")): row for row in master_rows if row.get("contact_value")}
    for path in [LEGACY_PATH, TOP50_PATH]:
        if not path.exists():
            continue
        headers, rows = read_csv(path)
        changed = False
        for row in rows:
            source = by_email.get(normalize_email(row.get("contact_value", "")))
            if not source:
                continue
            if source.get("status") in {"first_contact_sent", "followup_sent"}:
                row["estado"] = "contactado"
                row["fecha_ultimo_contacto"] = source.get("last_contact_date", "")
                row["proxima_accion"] = source.get("next_action", "")
                row["fecha_proxima_accion"] = source.get("next_action_date", "")
                row["respuesta"] = "pendiente"
                row["canal_preferido"] = "email"
                row["notas"] = source.get("notes", "")
                changed = True
        if changed:
            write_csv(path, headers, rows)


def write_log(path: Path, rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    headers = ["timestamp", "contact_id", "email", "status", "detail"]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Preview/envio controlado del seguimiento.")
    parser.add_argument("--csv", default=str(DEFAULT_FOLLOWUP_CSV), help="CSV de seguimiento.")
    parser.add_argument("--target-date", help="Fecha esperada de next_action_date. Por defecto se infiere del CSV.")
    parser.add_argument("--limit", type=int, help="Limita el lote.")
    parser.add_argument("--send", action="store_true", help="Ejecuta envio real.")
    parser.add_argument("--allow-before-date", action="store_true", help="Permite enviar antes de target-date.")
    parser.add_argument("--campaign", help="Nombre de campana. Por defecto seguimiento_YYYY_MM_DD.")
    parser.add_argument("--allowed-campaign", action="append", dest="allowed_campaigns", help="Campana previa permitida. Repetible. Por defecto waves 1-3.")
    parser.add_argument("--no-append-sent", action="store_true", help="No guarda copia en IMAP Sent.")
    parser.add_argument("--delay-seconds", type=float, default=0.0, help="Pausa entre correos aceptados.")
    parser.add_argument("--retries", type=int, default=1, help="Reintentos adicionales por correo.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local.")
    parser.add_argument("--log-dir", default=str(DEFAULT_LOG_DIR), help="Directorio de logs.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        print("--limit debe ser mayor que cero", file=sys.stderr)
        return 2
    if args.delay_seconds < 0:
        print("--delay-seconds no puede ser negativo", file=sys.stderr)
        return 2
    if args.retries < 0:
        print("--retries no puede ser negativo", file=sys.stderr)
        return 2

    load_env_file(Path(args.env_file))
    lote_path = Path(args.csv)
    target_date = args.target_date or infer_target_date(lote_path)
    campaign = args.campaign or campaign_name(target_date)
    allowed_campaigns = set(args.allowed_campaigns or CAMPAIGNS)
    lote_headers, lote_rows = read_csv(lote_path)
    master_headers, master_rows = read_csv(MASTER_PATH)
    _, sent_rows_existing = read_csv(DEFAULT_SENT_PATH)
    master_by_id = {row["contact_id"]: row for row in master_rows}
    selected = select_lote_rows(lote_rows, args.limit)

    errors = validate_headers(lote_headers)
    errors.extend(validate_sendable(selected, master_by_id, sent_campaign_keys(sent_rows_existing), target_date, campaign, allowed_campaigns))

    print(f"Lote seleccionado: {len(selected)}")
    print(f"Fecha objetivo: {target_date}")
    print(f"Campana: {campaign}")
    print(f"Campanas previas permitidas: {', '.join(sorted(allowed_campaigns))}")
    for row in selected[:10]:
        print(f"- {row['contact_id']} {row['email']} {row['followup_subject']}")
    if len(selected) > 10:
        print(f"... {len(selected) - 10} mas")

    if not args.send:
        if errors:
            print("\nBloqueos para envio real:")
            for item in errors[:30]:
                print(f"- {item}")
            if len(errors) > 30:
                print(f"... {len(errors) - 30} mas")
        print("\nPreview solamente. No se envio ningun correo.")
        return 0

    try:
        target = date.fromisoformat(target_date)
    except ValueError:
        print(f"--target-date invalida: {target_date}", file=sys.stderr)
        return 2
    today = date.today()
    if today < target and not args.allow_before_date:
        print(f"Envio bloqueado: hoy es {today.isoformat()} y target-date es {target_date}.", file=sys.stderr)
        return 4

    if errors:
        print("Envio bloqueado:", file=sys.stderr)
        for item in errors:
            print(f"- {item}", file=sys.stderr)
        return 3

    confirm = input(f"Se enviaran {len(selected)} seguimientos reales. Escribe ENVIAR_SEGUIMIENTO para continuar: ")
    if confirm != "ENVIAR_SEGUIMIENTO":
        print("Envio cancelado.")
        return 0

    try:
        base_url = require_env("MAIL_API_BASE_URL")
        api_key = require_env("MAIL_API_KEY")
        password = require_env("MAIL_FROM_PASSWORD")
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    sent_folder = DEFAULT_SENT_FOLDER
    imap_client = None
    if not args.no_append_sent:
        try:
            imap_client = open_imap_sent(selected[0]["sender"], password) if selected else None
        except Exception as exc:  # noqa: BLE001
            print(f"No se pudo abrir IMAP para guardar copias en Sent: {exc}", file=sys.stderr)

    sent_at = datetime.now().isoformat(timespec="seconds")
    sent_date = today
    sent_rows_new: list[dict[str, str]] = []
    log_rows: list[dict[str, str]] = []
    failures = 0

    for index, row in enumerate(selected, start=1):
        body = normalize(row.get("body_text", "")) + "\n"
        html_body = markdown_to_email_html(body)
        ok, detail = send_email_with_retries(
            base_url,
            api_key,
            row["sender"],
            password,
            row["email"],
            row["followup_subject"],
            body,
            html_body,
            args.retries,
        )
        if ok and imap_client is not None:
            _, copy_detail = append_sent_copy(
                imap_client,
                sent_folder,
                build_sent_message(row["sender"], row["email"], row["followup_subject"], body, row["contact_id"], campaign, html_body),
            )
            detail = f"{detail} {copy_detail}"
        status = "sent" if ok else "failed"
        print(f"{status.upper()} {row['contact_id']} {row['email']} {detail}")
        log_rows.append({"timestamp": sent_at, "contact_id": row["contact_id"], "email": row["email"], "status": status, "detail": detail[:700]})
        row["send_status"] = status
        row["sent_at"] = sent_at if ok else ""
        row["notes"] = detail[:700]
        if ok:
            source = master_by_id[row["contact_id"]]
            sent_rows_new.append(build_sent_row(row, source, sent_at, campaign))
            update_master_row(source, row, sent_date, campaign)
            if args.delay_seconds and index < len(selected):
                time.sleep(args.delay_seconds)
        else:
            failures += 1

    append_csv(DEFAULT_SENT_PATH, SENT_HEADERS, sent_rows_new)
    write_csv(MASTER_PATH, master_headers, master_rows)
    sync_legacy_statuses(master_rows)
    write_csv(lote_path, lote_headers, lote_rows)

    log_path = Path(args.log_dir) / f"seguimiento-{datetime.now().strftime('%Y%m%d-%H%M%S')}.csv"
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
