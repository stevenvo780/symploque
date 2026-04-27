#!/usr/bin/env python3
"""Reconstruye copias en la carpeta IMAP Sent para envios ya registrados.

No envia correos. Lee `correos-enviados-importar.csv`, reconstruye el cuerpo
desde las plantillas y anexa una copia visible en la carpeta Sent del remitente.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path
import sys

from enviar_lote_primer_contacto import (
    DEFAULT_ENV_FILE,
    DEFAULT_SENT_FOLDER,
    build_sent_message,
    open_imap_sent,
    read_csv,
)
from preparar_lote_primer_contacto import MASTER_PATH, read_template, render_body, template_for


REPO_DIR = Path(__file__).resolve().parents[1]
DEFAULT_SENT_CSV = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "correos-enviados-importar.csv"


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


def body_for_source(source: dict[str, str]) -> str:
    template = template_for(source)
    _, body_template = read_template(template["path"])  # type: ignore[arg-type]
    return render_body(body_template, source)


def sent_copy_exists(client, folder: str, contact_id: str, campaign: str) -> bool:
    client.select(folder)
    result, data = client.search(None, "HEADER", "X-Elenxos-Contact-ID", contact_id)
    if result != "OK":
        return False
    ids = (data[0] or b"").split()
    if not ids:
        return False
    result, data = client.search(None, "HEADER", "X-Elenxos-Campaign", campaign)
    if result != "OK":
        return True
    campaign_ids = set((data[0] or b"").split())
    return any(message_id in campaign_ids for message_id in ids)


def main() -> int:
    parser = argparse.ArgumentParser(description="Anexa a Sent copias IMAP de envios ya registrados.")
    parser.add_argument("--sent-csv", default=str(DEFAULT_SENT_CSV), help="CSV de envios registrados.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local.")
    parser.add_argument("--folder", default=os.environ.get("MAIL_SENT_FOLDER", DEFAULT_SENT_FOLDER), help="Carpeta IMAP Sent.")
    parser.add_argument("--dry-run", action="store_true", help="No anexa; solo muestra conteo.")
    args = parser.parse_args()

    load_env_file(Path(args.env_file))
    sender = os.environ.get("MAIL_FROM_EMAIL")
    password = os.environ.get("MAIL_FROM_PASSWORD")
    if not sender or not password:
        print("Faltan MAIL_FROM_EMAIL o MAIL_FROM_PASSWORD", file=sys.stderr)
        return 2

    _, master_rows = read_csv(MASTER_PATH)
    _, sent_rows = read_csv(Path(args.sent_csv))
    master_by_id = {row["contact_id"]: row for row in master_rows}
    rows = [row for row in sent_rows if row.get("last_sender_email") == sender]

    print(f"Copias candidatas: {len(rows)}")
    if args.dry_run:
        return 0

    client = open_imap_sent(sender, password)
    appended = 0
    skipped = 0
    missing = 0
    try:
        for row in rows:
            contact_id = row.get("source_id", "")
            campaign = row.get("campaign", "")
            source = master_by_id.get(contact_id)
            if not source:
                missing += 1
                print(f"MISSING_SOURCE {contact_id} {row.get('email', '')}")
                continue
            if sent_copy_exists(client, args.folder, contact_id, campaign):
                skipped += 1
                continue
            body = body_for_source(source)
            message = build_sent_message(
                row.get("last_sender_email", sender),
                row.get("email", ""),
                row.get("subject", ""),
                body,
                contact_id,
                campaign,
            )
            result, data = client.append(args.folder, "\\Seen", None, message)
            if result != "OK":
                print(f"APPEND_FAILED {contact_id} {row.get('email', '')} {data}", file=sys.stderr)
                continue
            appended += 1
            print(f"APPENDED {contact_id} {row.get('email', '')} {campaign}")
    finally:
        client.logout()

    print(f"Resumen: appended={appended} skipped={skipped} missing_source={missing}")
    return 0 if missing == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
