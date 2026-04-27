#!/usr/bin/env python3
"""Sincroniza rebotes del buzon IMAP con los CSV operativos.

No envia correos. Lee mensajes recientes de INBOX, detecta NDR/bounces,
extrae destinatarios fallidos y actualiza:

- correos-enviados-importar.csv
- contactos-maestro-operativo.csv
- primer-contacto-wave-*.csv
- leads-agora-maestro.csv
- leads-agora-top-50-hoy.csv
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from email.header import decode_header
import email
import imaplib
import os
from pathlib import Path
import re
import sys

from enviar_lote_primer_contacto import DEFAULT_ENV_FILE, DEFAULT_IMAP_HOST, read_csv, write_csv


REPO_DIR = Path(__file__).resolve().parents[1]
OPERACION_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email"
SENT_PATH = OPERACION_DIR / "correos-enviados-importar.csv"
MASTER_PATH = OPERACION_DIR / "contactos-maestro-operativo.csv"
LEGACY_PATH = REPO_DIR / "05-datos-y-reportes" / "leads-agora-maestro.csv"
TOP50_PATH = REPO_DIR / "05-datos-y-reportes" / "leads-agora-top-50-hoy.csv"
BOUNCE_REPORT_PATH = OPERACION_DIR / "rebotes-detectados-2026-04-27.csv"

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")
BOUNCE_KEYWORDS = (
    "undelivered mail returned",
    "undeliverable:",
    "delivery status notification",
    "delivery failure",
    "mail delivery system",
    "mailer-daemon",
    "postmaster",
    "couldn't be delivered",
    "recipient address rejected",
)
DIAGNOSTIC_PATTERNS = (
    r"Diagnostic-Code:\s*([^\n\r]+)",
    r"Error:\s*([^\n\r]+)",
    r"Status code\s*([^\n\r]+)",
    r"said:\s*([^\n\r]+)",
)


@dataclass(frozen=True)
class Bounce:
    contact_id: str
    email: str
    campaign: str
    bounced_at: str
    source: str
    reason: str


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


def decode_mime(value: str | None) -> str:
    if not value:
        return ""
    parts: list[str] = []
    for part, encoding in decode_header(value):
        if isinstance(part, bytes):
            parts.append(part.decode(encoding or "utf-8", "replace"))
        else:
            parts.append(part)
    return "".join(parts)


def message_text(msg: email.message.Message) -> str:
    chunks: list[str] = []
    parts = msg.walk() if msg.is_multipart() else [msg]
    for part in parts:
        content_type = part.get_content_type()
        if content_type not in {"text/plain", "message/delivery-status"}:
            continue
        payload = part.get_payload(decode=True)
        if payload:
            chunks.append(payload.decode(part.get_content_charset() or "utf-8", "replace"))
    return "\n".join(chunks)


def is_bounce(msg: email.message.Message, text: str) -> bool:
    haystack = " ".join([decode_mime(msg.get("From")), decode_mime(msg.get("Subject")), text[:2000]]).lower()
    return any(keyword in haystack for keyword in BOUNCE_KEYWORDS)


def reason_from_text(text: str) -> str:
    normalized_text = " ".join(text.split())
    lowered_text = normalized_text.lower()
    if "address not found" in lowered_text or "couldn't be found" in lowered_text:
        return "Address not found: recipient address could not be found or cannot receive mail"
    for pattern in DIAGNOSTIC_PATTERNS:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return " ".join(match.group(1).split())[:240]
    for line in text.splitlines():
        if any(token in line for token in ["550", "554", "5.4.", "5.1."]):
            return " ".join(line.split())[:240]
    return "Rebote detectado sin diagnostico especifico"


def find_bounces(since: str, folder: str) -> list[dict[str, str]]:
    sender = os.environ.get("MAIL_FROM_EMAIL")
    password = os.environ.get("MAIL_FROM_PASSWORD")
    if not sender or not password:
        raise RuntimeError("Faltan MAIL_FROM_EMAIL o MAIL_FROM_PASSWORD")
    host = os.environ.get("MAIL_IMAP_HOST", DEFAULT_IMAP_HOST)
    port = int(os.environ.get("MAIL_IMAP_PORT", "993"))

    found: list[dict[str, str]] = []
    with imaplib.IMAP4_SSL(host, port) as client:
        client.login(sender, password)
        client.select(folder, readonly=True)
        result, data = client.search(None, "SINCE", since)
        ids = (data[0] or b"").split() if result == "OK" else []
        for message_id in ids:
            result, fetched = client.fetch(message_id, "(BODY.PEEK[])")
            if result != "OK" or not fetched or not fetched[0]:
                continue
            msg = email.message_from_bytes(fetched[0][1])
            text = message_text(msg)
            if not is_bounce(msg, text):
                continue
            found.append(
                {
                    "date": decode_mime(msg.get("Date")),
                    "from": decode_mime(msg.get("From")),
                    "subject": decode_mime(msg.get("Subject")),
                    "text": text,
                    "reason": reason_from_text(text),
                }
            )
    return found


def build_known_sent() -> dict[str, dict[str, str]]:
    _, rows = read_csv(SENT_PATH)
    return {row["email"].lower(): row for row in rows if row.get("email")}


def normalize_bounces(raw_bounces: list[dict[str, str]], sent_by_email: dict[str, dict[str, str]]) -> list[Bounce]:
    bounces: dict[str, Bounce] = {}
    for item in raw_bounces:
        candidates = {match.lower() for match in EMAIL_RE.findall(item["text"])}
        for address in candidates:
            sent = sent_by_email.get(address)
            if not sent:
                continue
            bounces[address] = Bounce(
                contact_id=sent.get("source_id", ""),
                email=address,
                campaign=sent.get("campaign", ""),
                bounced_at=item.get("date", ""),
                source=item.get("from", ""),
                reason=item.get("reason", ""),
            )
    return sorted(bounces.values(), key=lambda item: item.contact_id)


def append_once(existing: str, note: str, marker: str) -> str:
    if marker in existing:
        return existing
    return " | ".join(part for part in [existing, note] if part)


def update_operational_csvs(bounces: list[Bounce]) -> None:
    by_email = {item.email: item for item in bounces}

    headers, rows = read_csv(SENT_PATH)
    for row in rows:
        bounce = by_email.get(row.get("email", "").lower())
        if bounce:
            row["reply_status"] = "bounced"
            note = f"Rebote confirmado {bounce.bounced_at}: {bounce.reason}. Fuente: {bounce.source}."
            existing_note = row.get("notes", "")
            if "Rebote confirmado" in existing_note:
                existing_note = existing_note.split(" | Rebote confirmado", 1)[0]
            row["notes"] = append_once(existing_note, note, "Rebote confirmado")
    write_csv(SENT_PATH, headers, rows)

    headers, rows = read_csv(MASTER_PATH)
    for row in rows:
        bounce = by_email.get(row.get("contact_value", "").lower())
        if bounce:
            row["status"] = "email_bounced"
            row["reply_status"] = "bounced"
            row["next_action"] = "verificar correo alternativo o no contactar por email"
            row["next_action_date"] = "2026-04-28"
            row["notes"] = f"Rebote confirmado {bounce.bounced_at}: {bounce.reason}. Fuente: {bounce.source}."
    write_csv(MASTER_PATH, headers, rows)

    for lote_path in sorted(OPERACION_DIR.glob("primer-contacto-wave-*.csv")):
        headers, rows = read_csv(lote_path)
        changed = False
        for row in rows:
            bounce = by_email.get(row.get("email", "").lower())
            if bounce:
                row["send_status"] = "bounced"
                row["notes"] = f"Rebote confirmado {bounce.bounced_at}: {bounce.reason}. Fuente: {bounce.source}."
                changed = True
        if changed:
            write_csv(lote_path, headers, rows)

    for path in [LEGACY_PATH, TOP50_PATH]:
        headers, rows = read_csv(path)
        for row in rows:
            bounce = by_email.get(row.get("contact_value", "").lower())
            if bounce:
                row["estado"] = "rebotado"
                row["respuesta"] = "rebote"
                row["proxima_accion"] = "verificar correo alternativo o no contactar por email"
                row["fecha_proxima_accion"] = "2026-04-28"
                row["notas"] = f"Rebote confirmado {bounce.bounced_at}: {bounce.reason}. Fuente: {bounce.source}."
        write_csv(path, headers, rows)


def write_report(bounces: list[Bounce], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    headers = ["contact_id", "email", "campaign", "bounced_at", "source", "reason", "next_action"]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        for bounce in bounces:
            writer.writerow(
                {
                    "contact_id": bounce.contact_id,
                    "email": bounce.email,
                    "campaign": bounce.campaign,
                    "bounced_at": bounce.bounced_at,
                    "source": bounce.source,
                    "reason": bounce.reason,
                    "next_action": "verificar correo alternativo o no contactar por email",
                }
            )


def main() -> int:
    parser = argparse.ArgumentParser(description="Sincroniza rebotes IMAP con CSVs operativos.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local.")
    parser.add_argument("--since", default="27-Apr-2026", help="Fecha IMAP SINCE, formato 27-Apr-2026.")
    parser.add_argument("--folder", default="INBOX", help="Carpeta IMAP a escanear.")
    parser.add_argument("--report", default=str(BOUNCE_REPORT_PATH), help="CSV de salida con rebotes detectados.")
    parser.add_argument("--dry-run", action="store_true", help="No modifica CSVs.")
    args = parser.parse_args()

    load_env_file(Path(args.env_file))
    raw = find_bounces(args.since, args.folder)
    bounces = normalize_bounces(raw, build_known_sent())
    print(f"Mensajes de rebote detectados: {len(raw)}")
    print(f"Rebotes asociados a envios registrados: {len(bounces)}")
    for bounce in bounces:
        print(f"- {bounce.contact_id} {bounce.email} {bounce.campaign} {bounce.reason}")
    if args.dry_run:
        return 0
    update_operational_csvs(bounces)
    write_report(bounces, Path(args.report))
    print(f"Reporte: {args.report}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
