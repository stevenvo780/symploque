#!/usr/bin/env python3
"""Preview/envio controlado del lote de primer contacto.

Por defecto solo hace preview. Para envio real exige:

- `--send`
- confirmacion interactiva
- credenciales Mail API en `.env` o entorno
- Leads sincronizados en ERP (`synced` o `synced_existing`)

Si el envio es exitoso actualiza:

- `correos-enviados-importar.csv`
- `contactos-maestro-operativo.csv`
- el CSV del lote
"""

from __future__ import annotations

import argparse
import csv
from datetime import date, datetime, timedelta
import json
import os
from pathlib import Path
import re
import sys
from urllib import error, parse, request

from preparar_lote_primer_contacto import (
    DEFAULT_CSV_OUT,
    LOTE_HEADERS,
    MASTER_PATH,
    read_master,
    read_template,
    render_body,
    template_for,
)


REPO_DIR = Path(__file__).resolve().parents[1]
DEFAULT_SENT_PATH = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "correos-enviados-importar.csv"
DEFAULT_LOG_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "logs"
DEFAULT_ENV_FILE = REPO_DIR / ".env"
SYNCED_ERP_STATUSES = {"synced", "synced_existing"}
READY_ERP_STATUSES = {"ready_for_import", "synced", "synced_existing"}

SENT_HEADERS = [
    "source_id",
    "contact_name",
    "organization",
    "institution",
    "email",
    "sent_at",
    "last_sender_email",
    "sender_identity",
    "campaign",
    "subject",
    "landing_url_shared",
    "reply_status",
    "declaration_required",
    "declaration_status",
    "notes",
]


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        return list(reader.fieldnames or []), [{key: normalize(value) for key, value in row.items() if key is not None} for row in reader]


def write_csv(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def append_csv(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    exists = path.exists()
    with path.open("a", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        if not exists:
            writer.writeheader()
        writer.writerows(rows)


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required env var: {name}")
    return value


def send_email(base_url: str, api_key: str, sender: str, password: str, to: str, subject: str, body: str) -> tuple[bool, str]:
    url = f"{base_url.rstrip('/')}/send?{parse.urlencode({'api_key': api_key})}"
    payload = json.dumps(
        {
            "from_email": sender,
            "from_password": password,
            "to": to,
            "subject": subject,
            "body": body,
        }
    ).encode("utf-8")
    req = request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with request.urlopen(req, timeout=30) as resp:
            return True, resp.read().decode("utf-8", "replace")
    except error.HTTPError as exc:
        return False, exc.read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)


def sent_keys(rows: list[dict[str, str]]) -> set[tuple[str, str]]:
    keys: set[tuple[str, str]] = set()
    for row in rows:
        source_id = normalize(row.get("source_id", ""))
        email = normalize_email(row.get("email", ""))
        if source_id or email:
            keys.add((source_id, email))
    return keys


def campaign_from_csv_path(path: Path) -> str:
    match = re.search(r"wave[-_](\d+)", path.name)
    if match:
        return f"primer_contacto_wave_{match.group(1)}"
    return "primer_contacto_wave_1"


def select_lote_rows(lote_rows: list[dict[str, str]], limit: int | None) -> list[dict[str, str]]:
    selected = [row for row in lote_rows if normalize(row.get("send_status", "")) != "sent"]
    if limit is not None:
        selected = selected[:limit]
    return selected


def validate_sendable(
    selected: list[dict[str, str]],
    master_by_id: dict[str, dict[str, str]],
    existing_sent: set[tuple[str, str]],
    allow_ready_for_import: bool,
) -> list[str]:
    errors: list[str] = []
    allowed_statuses = READY_ERP_STATUSES if allow_ready_for_import else SYNCED_ERP_STATUSES
    for row in selected:
        contact_id = normalize(row.get("contact_id", ""))
        email = normalize_email(row.get("email", ""))
        source = master_by_id.get(contact_id)
        if source is None:
            errors.append(f"{contact_id}: no existe en maestro operativo")
            continue
        if (contact_id, email) in existing_sent:
            errors.append(f"{contact_id}: ya existe en correos-enviados-importar.csv")
        if source.get("erp_sync_status", "").lower() not in allowed_statuses:
            errors.append(f"{contact_id}: erp_sync_status={source.get('erp_sync_status', '')}; requiere {', '.join(sorted(allowed_statuses))}")
    return errors


def body_for_lote_row(row: dict[str, str], master_by_id: dict[str, dict[str, str]]) -> str:
    source = master_by_id[row["contact_id"]]
    template = template_for(source)
    _, body_template = read_template(template["path"])  # type: ignore[arg-type]
    return render_body(body_template, source)


def build_sent_row(row: dict[str, str], source: dict[str, str], sent_at: str, campaign: str) -> dict[str, str]:
    return {
        "source_id": row.get("contact_id", ""),
        "contact_name": row.get("contact_name", ""),
        "organization": row.get("organization", ""),
        "institution": row.get("institution", ""),
        "email": row.get("email", ""),
        "sent_at": sent_at,
        "last_sender_email": row.get("sender", ""),
        "sender_identity": "corporate",
        "campaign": campaign,
        "subject": row.get("subject", ""),
        "landing_url_shared": row.get("landing_url", ""),
        "reply_status": "pending",
        "declaration_required": "no",
        "declaration_status": "not_applicable",
        "notes": f"Envio primer contacto. erp_sync_status={source.get('erp_sync_status', '')}; erp_lead_id={source.get('erp_lead_id', '')}",
    }


def update_master_row(source: dict[str, str], lote_row: dict[str, str], sent_date: date, campaign: str) -> None:
    source["status"] = "first_contact_sent"
    source["last_contact_date"] = sent_date.isoformat()
    source["next_action"] = "hacer seguimiento si no responde"
    source["next_action_date"] = (sent_date + timedelta(days=7)).isoformat()
    source["reply_status"] = "pending"
    source["last_sender_email"] = lote_row.get("sender", "")
    source["last_sender_identity"] = "corporate"
    source["last_campaign"] = campaign
    source["last_subject"] = lote_row.get("subject", "")
    source["landing_url_sent"] = lote_row.get("landing_url", "")
    source["declaration_required"] = "no"
    source["declaration_status"] = "not_applicable"


def write_log(path: Path, rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    headers = ["timestamp", "contact_id", "email", "status", "detail"]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Preview/envio controlado del primer contacto.")
    parser.add_argument("--csv", default=str(DEFAULT_CSV_OUT), help="CSV de lote.")
    parser.add_argument("--limit", type=int, help="Limita el lote.")
    parser.add_argument("--send", action="store_true", help="Ejecuta envio real.")
    parser.add_argument("--allow-ready-for-import", action="store_true", help="Permite enviar con erp_sync_status=ready_for_import.")
    parser.add_argument("--campaign", help="Nombre de campana para trazabilidad. Por defecto se infiere del nombre del CSV.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local.")
    parser.add_argument("--log-dir", default=str(DEFAULT_LOG_DIR), help="Directorio de logs.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        print("--limit debe ser mayor que cero", file=sys.stderr)
        return 2

    load_env_file(Path(args.env_file))
    lote_path = Path(args.csv)
    campaign = args.campaign or campaign_from_csv_path(lote_path)
    lote_headers, lote_rows = read_csv(lote_path)
    master_headers, master_rows = read_csv(MASTER_PATH)
    _, sent_rows_existing = read_csv(DEFAULT_SENT_PATH)
    master_by_id = {row["contact_id"]: row for row in master_rows}
    selected = select_lote_rows(lote_rows, args.limit)
    errors = validate_sendable(selected, master_by_id, sent_keys(sent_rows_existing), args.allow_ready_for_import)

    print(f"Lote seleccionado: {len(selected)}")
    print(f"Campana: {campaign}")
    for row in selected[:10]:
        print(f"- {row['contact_id']} {row['email']} {row['subject']}")
    if len(selected) > 10:
        print(f"... {len(selected) - 10} mas")

    if not args.send:
        if errors:
            print("\nBloqueos para envio real:")
            for item in errors[:20]:
                print(f"- {item}")
            if len(errors) > 20:
                print(f"... {len(errors) - 20} mas")
        print("\nPreview solamente. No se envio ningun correo.")
        return 0

    if errors:
        print("Envio bloqueado:", file=sys.stderr)
        for item in errors:
            print(f"- {item}", file=sys.stderr)
        return 3

    confirm = input(f"Se enviaran {len(selected)} correos reales a leads. Escribe ENVIAR para continuar: ")
    if confirm != "ENVIAR":
        print("Envio cancelado.")
        return 0

    try:
        base_url = require_env("MAIL_API_BASE_URL")
        api_key = require_env("MAIL_API_KEY")
        password = require_env("MAIL_FROM_PASSWORD")
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    sent_date = date.today()
    sent_at = datetime.now().isoformat(timespec="seconds")
    sent_rows_new: list[dict[str, str]] = []
    log_rows: list[dict[str, str]] = []
    failures = 0

    for row in selected:
        body = body_for_lote_row(row, master_by_id)
        ok, detail = send_email(base_url, api_key, row["sender"], password, row["email"], row["subject"], body)
        status = "sent" if ok else "failed"
        print(f"{status.upper()} {row['contact_id']} {row['email']} {detail}")
        log_rows.append({"timestamp": sent_at, "contact_id": row["contact_id"], "email": row["email"], "status": status, "detail": detail[:700]})
        row["send_status"] = status
        row["notes"] = detail[:700]
        if ok:
            source = master_by_id[row["contact_id"]]
            sent_rows_new.append(build_sent_row(row, source, sent_at, campaign))
            update_master_row(source, row, sent_date, campaign)
        else:
            failures += 1

    append_csv(DEFAULT_SENT_PATH, SENT_HEADERS, sent_rows_new)
    write_csv(MASTER_PATH, master_headers, master_rows)
    write_csv(lote_path, lote_headers or LOTE_HEADERS, lote_rows)

    log_path = Path(args.log_dir) / f"primer-contacto-{datetime.now().strftime('%Y%m%d-%H%M%S')}.csv"
    write_log(log_path, log_rows)
    print(f"Log: {log_path}")
    print(f"Resumen: enviados={len(sent_rows_new)} fallidos={failures}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
