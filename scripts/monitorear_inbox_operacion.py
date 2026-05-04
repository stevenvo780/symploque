#!/usr/bin/env python3
"""Monitorea INBOX en modo readonly y genera un reporte operativo.

No modifica correos, no marca mensajes como leidos y no escribe CSVs maestros.
Clasifica mensajes recientes como rebote, auto-respuesta, posible respuesta
humana o ruido para decidir si se puede enviar seguimiento.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from datetime import date, datetime
from email import message_from_bytes
from email.header import decode_header
from email.message import Message
from email.utils import parsedate_to_datetime
import imaplib
import os
from pathlib import Path
import re
from typing import Iterable

from enviar_lote_primer_contacto import DEFAULT_ENV_FILE, DEFAULT_IMAP_HOST, load_env_file, require_env


REPO_DIR = Path(__file__).resolve().parents[1]
OPERACION_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email"
REPORTES_DIR = OPERACION_DIR / "reportes"
DEFAULT_FOLDER = "INBOX"
BOUNCE_RE = re.compile(r"mailer-daemon|postmaster|delivery status|undeliver|failure notice|returned mail|mail delivery", re.I)
AUTO_REPLY_RE = re.compile(r"auto.?reply|automatic reply|out of office|fuera de (la )?oficina|respuesta automatica|vacaciones", re.I)
NOISE_RE = re.compile(r"newsletter|no.?reply|noreply|notification|seguridad|security alert", re.I)


@dataclass(frozen=True)
class InboxItem:
    uid: str
    sent_at: str
    sender: str
    subject: str
    category: str
    snippet: str


def decode_value(value: str | None) -> str:
    if not value:
        return ""
    parts: list[str] = []
    for raw, charset in decode_header(value):
        if isinstance(raw, bytes):
            parts.append(raw.decode(charset or "utf-8", "replace"))
        else:
            parts.append(raw)
    return " ".join(part.strip() for part in parts if part.strip())


def message_text(message: Message, max_len: int = 500) -> str:
    chunks: list[str] = []
    if message.is_multipart():
        for part in message.walk():
            content_type = part.get_content_type()
            disposition = (part.get("Content-Disposition") or "").lower()
            if "attachment" in disposition or content_type not in {"text/plain", "text/html"}:
                continue
            payload = part.get_payload(decode=True)
            if not payload:
                continue
            chunks.append(payload.decode(part.get_content_charset() or "utf-8", "replace"))
            if sum(len(chunk) for chunk in chunks) >= max_len:
                break
    else:
        payload = message.get_payload(decode=True)
        if payload:
            chunks.append(payload.decode(message.get_content_charset() or "utf-8", "replace"))
    text = re.sub(r"\s+", " ", " ".join(chunks)).strip()
    return text[:max_len]


def classify(sender: str, subject: str, snippet: str) -> str:
    haystack = " ".join([sender, subject, snippet])
    if BOUNCE_RE.search(haystack):
        return "rebote"
    if AUTO_REPLY_RE.search(haystack):
        return "auto_respuesta"
    if NOISE_RE.search(haystack):
        return "ruido"
    return "posible_respuesta_humana"


def parse_message(uid: str, raw: bytes) -> InboxItem:
    message = message_from_bytes(raw)
    sender = decode_value(message.get("From"))
    subject = decode_value(message.get("Subject"))
    try:
        sent_at = parsedate_to_datetime(message.get("Date", "")).isoformat()
    except Exception:
        sent_at = ""
    snippet = message_text(message)
    return InboxItem(
        uid=uid,
        sent_at=sent_at,
        sender=sender,
        subject=subject,
        category=classify(sender, subject, snippet),
        snippet=snippet,
    )


def imap_since(value: str) -> str:
    parsed = date.fromisoformat(value)
    return parsed.strftime("%d-%b-%Y")


def fetch_items(since: str, folder: str, limit: int | None) -> list[InboxItem]:
    sender = require_env("MAIL_FROM_EMAIL")
    password = require_env("MAIL_FROM_PASSWORD")
    host = os.environ.get("MAIL_IMAP_HOST", DEFAULT_IMAP_HOST)
    port = int(os.environ.get("MAIL_IMAP_PORT", "993"))
    items: list[InboxItem] = []
    with imaplib.IMAP4_SSL(host, port) as client:
        client.login(sender, password)
        client.select(folder, readonly=True)
        status, data = client.uid("search", None, f'(SINCE "{imap_since(since)}")')
        if status != "OK":
            raise RuntimeError(f"IMAP search fallo: {data}")
        uids = (data[0] or b"").split()
        if limit is not None:
            uids = uids[-limit:]
        for raw_uid in uids:
            uid = raw_uid.decode("ascii", "replace")
            status, fetched = client.uid("fetch", raw_uid, "(BODY.PEEK[])")
            if status != "OK" or not fetched:
                continue
            for item in fetched:
                if isinstance(item, tuple):
                    items.append(parse_message(uid, item[1]))
                    break
    return items


def counts(items: Iterable[InboxItem]) -> dict[str, int]:
    output: dict[str, int] = {}
    for item in items:
        output[item.category] = output.get(item.category, 0) + 1
    return output


def write_report(path: Path, since: str, folder: str, items: list[InboxItem]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    summary = counts(items)
    lines = [
        f"# Monitoreo INBOX operacion - {date.today().isoformat()}",
        "",
        "> Modo readonly: no marca mensajes como leidos y no modifica CSVs.",
        "",
        f"- Carpeta: `{folder}`",
        f"- Desde: `{since}`",
        f"- Total mensajes: {len(items)}",
        f"- Posibles respuestas humanas: {summary.get('posible_respuesta_humana', 0)}",
        f"- Rebotes: {summary.get('rebote', 0)}",
        f"- Auto-respuestas: {summary.get('auto_respuesta', 0)}",
        f"- Ruido: {summary.get('ruido', 0)}",
        "",
        "## Mensajes",
        "",
    ]
    if not items:
        lines.append("Sin mensajes nuevos en el rango revisado.")
    for item in items:
        lines.extend(
            [
                f"### UID {item.uid} - {item.category}",
                "",
                f"- Fecha: {item.sent_at or 'sin fecha'}",
                f"- From: {item.sender or 'sin remitente'}",
                f"- Subject: {item.subject or 'sin asunto'}",
                "",
                "```text",
                item.snippet or "(sin texto legible)",
                "```",
                "",
            ]
        )
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Monitorea INBOX en readonly y genera reporte.")
    parser.add_argument("--since", default=date.today().isoformat(), help="Fecha inicial YYYY-MM-DD.")
    parser.add_argument("--folder", default=DEFAULT_FOLDER, help="Carpeta IMAP.")
    parser.add_argument("--limit", type=int, help="Limita cantidad de mensajes recientes a inspeccionar.")
    parser.add_argument("--report-out", help="Ruta Markdown de salida.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit debe ser mayor que cero")
    date.fromisoformat(args.since)
    load_env_file(Path(args.env_file))
    items = fetch_items(args.since, args.folder, args.limit)
    report_out = Path(args.report_out) if args.report_out else REPORTES_DIR / f"monitoreo-inbox-{date.today().isoformat()}.md"
    write_report(report_out, args.since, args.folder, items)
    summary = counts(items)
    print(f"Mensajes revisados: {len(items)}")
    print(f"- posibles_respuestas_humanas={summary.get('posible_respuesta_humana', 0)}")
    print(f"- rebotes={summary.get('rebote', 0)}")
    print(f"- auto_respuestas={summary.get('auto_respuesta', 0)}")
    print(f"- ruido={summary.get('ruido', 0)}")
    print(f"Reporte: {report_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
