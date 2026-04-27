#!/usr/bin/env python3
"""Prepara un lote revisable de primer contacto.

No envia correos. Selecciona contactos del maestro operativo que ya estan
listos para ERP (`ready_for_import`, `synced` o `synced_existing`) y genera:

- CSV operativo del lote
- Markdown de revision con el cuerpo renderizado por contacto
"""

from __future__ import annotations

import argparse
import csv
import os
from pathlib import Path
import re


REPO_DIR = Path(__file__).resolve().parents[1]
MASTER_PATH = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "contactos-maestro-operativo.csv"
DEFAULT_CSV_OUT = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "primer-contacto-wave-1.csv"
DEFAULT_REVIEW_OUT = REPO_DIR / "04-mensajeria-email" / "lote-primer-contacto-wave-1-revision.md"
READY_ERP_STATUSES = {"ready_for_import", "synced", "synced_existing"}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

TEMPLATES = {
    "estandar": {
        "id": "02-primer-contacto-estandar",
        "path": REPO_DIR / "04-mensajeria-email" / "02-primer-contacto-estandar.md",
    },
    "semilleros": {
        "id": "03-primer-contacto-semilleros",
        "path": REPO_DIR / "04-mensajeria-email" / "03-primer-contacto-semilleros.md",
    },
    "directores": {
        "id": "04-primer-contacto-directores",
        "path": REPO_DIR / "04-mensajeria-email" / "04-primer-contacto-directores.md",
    },
}

LOTE_HEADERS = [
    "contact_id",
    "legacy_priority_rank",
    "email",
    "contact_name",
    "institution",
    "organization",
    "segment",
    "role_or_unit",
    "template_id",
    "subject",
    "sender",
    "landing_url",
    "send_status",
    "notes",
]


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def is_email(value: str) -> bool:
    return bool(EMAIL_RE.match(value))


def rank_key(row: dict[str, str]) -> tuple[int, str]:
    try:
        return int(normalize(row.get("legacy_priority_rank", ""))), normalize(row.get("contact_id", ""))
    except ValueError:
        return 999_999, normalize(row.get("contact_id", ""))


def read_master(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return [{key: normalize(value) for key, value in row.items() if key is not None} for row in csv.DictReader(handle)]


def template_for(row: dict[str, str]) -> dict[str, Path | str]:
    segment = normalize(row.get("segment", "")).lower()
    role = normalize(row.get("role_or_unit", "")).lower()

    if any(token in f"{segment} {role}" for token in ["semillero", "grupo de investigacion", "grupo "]) :
        return TEMPLATES["semilleros"]

    if any(
        token in f"{segment} {role}"
        for token in [
            "coordinacion",
            "coordinador",
            "direccion",
            "director",
            "escuela",
            "facultad",
            "programa",
            "pregrado",
            "posgrado",
            "pasantias",
            "practicas",
            "admisiones",
            "departamento",
        ]
    ):
        return TEMPLATES["directores"]

    return TEMPLATES["estandar"]


def read_template(path: Path) -> tuple[str, str]:
    content = path.read_text(encoding="utf-8")
    subject = ""
    body = content

    for line in content.splitlines():
        if line.startswith("**Asunto:**"):
            subject = line.replace("**Asunto:**", "").strip()
            break

    parts = content.split("---", 1)
    if len(parts) == 2:
        body = parts[1].strip()

    return subject, body


def render_body(template_body: str, row: dict[str, str]) -> str:
    values = {
        "{{contact_name}}": row.get("contact_name", "") or "equipo",
        "{{institution}}": row.get("institution", "") or row.get("organization", "") or "su institucion",
        "{{role_or_unit}}": row.get("role_or_unit", "") or "su unidad",
    }
    body = template_body
    for token, value in values.items():
        body = body.replace(token, value)
    return body.rstrip() + "\n"


def select_rows(rows: list[dict[str, str]], wave: str, limit: int | None) -> list[dict[str, str]]:
    selected: list[dict[str, str]] = []
    seen_emails: set[str] = set()

    for row in sorted(rows, key=rank_key):
        email = normalize_email(row.get("contact_value", ""))
        if row.get("launch_wave") != wave:
            continue
        if row.get("contact_channel", "").lower() != "email":
            continue
        if row.get("erp_sync_status", "").lower() not in READY_ERP_STATUSES:
            continue
        if row.get("status", "").lower() in {"first_contact_sent", "contactado"} or row.get("last_contact_date"):
            continue
        if not is_email(email):
            continue
        if email in seen_emails:
            continue

        row = dict(row)
        row["contact_value"] = email
        selected.append(row)
        seen_emails.add(email)
        if limit is not None and len(selected) >= limit:
            break

    return selected


def build_lote_rows(rows: list[dict[str, str]], sender: str) -> list[dict[str, str]]:
    lote_rows: list[dict[str, str]] = []
    for row in rows:
        template = template_for(row)
        subject, _ = read_template(template["path"])  # type: ignore[arg-type]
        lote_rows.append(
            {
                "contact_id": row.get("contact_id", ""),
                "legacy_priority_rank": row.get("legacy_priority_rank", ""),
                "email": row.get("contact_value", ""),
                "contact_name": row.get("contact_name", ""),
                "institution": row.get("institution", ""),
                "organization": row.get("organization", ""),
                "segment": row.get("segment", ""),
                "role_or_unit": row.get("role_or_unit", ""),
                "template_id": str(template["id"]),
                "subject": subject,
                "sender": sender,
                "landing_url": row.get("domain_objetivo", "https://agora.elenxos.com/"),
                "send_status": "draft_review",
                "notes": "No enviado. Revisar copy y confirmar ERP antes del envio real.",
            }
        )
    return lote_rows


def write_lote_csv(path: Path, rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=LOTE_HEADERS)
        writer.writeheader()
        writer.writerows(rows)


def write_review(path: Path, source_rows: list[dict[str, str]], lote_rows: list[dict[str, str]], wave: str, csv_out: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        f"# Lote primer contacto {wave} - revision",
        "",
        "> Estado: borrador revisable. No se ha enviado ningun correo a leads.",
        "",
        f"- Total: {len(lote_rows)}",
        f"- CSV fuente: `{MASTER_PATH}`",
        f"- CSV lote: `{csv_out}`",
        "",
        "## Correos",
        "",
    ]

    source_by_id = {row["contact_id"]: row for row in source_rows}
    for index, lote_row in enumerate(lote_rows, start=1):
        source = source_by_id[lote_row["contact_id"]]
        template = template_for(source)
        _, body_template = read_template(template["path"])  # type: ignore[arg-type]
        body = render_body(body_template, source).rstrip()
        lines.extend(
            [
                f"### {index:02d}. {lote_row['contact_name']} - {lote_row['institution']}",
                "",
                f"- Contact ID: `{lote_row['contact_id']}`",
                f"- Para: `{lote_row['email']}`",
                f"- Remitente: `{lote_row['sender']}`",
                f"- Plantilla: `{lote_row['template_id']}`",
                f"- Asunto: `{lote_row['subject']}`",
                f"- Segmento: `{lote_row['segment']}`",
                "",
                "```text",
                body,
                "```",
                "",
            ]
        )

    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Prepara lote de primer contacto sin enviar correos.")
    parser.add_argument("--wave", default="wave_1", help="Ola a preparar.")
    parser.add_argument("--limit", type=int, help="Limita el lote.")
    parser.add_argument("--sender", default=os.environ.get("MAIL_FROM_EMAIL", "ventas@elenxos.com"), help="Remitente previsto.")
    parser.add_argument("--csv-out", default=str(DEFAULT_CSV_OUT), help="Ruta CSV de salida.")
    parser.add_argument("--review-out", default=str(DEFAULT_REVIEW_OUT), help="Ruta Markdown revisable.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit debe ser mayor que cero")

    master_rows = read_master(MASTER_PATH)
    selected = select_rows(master_rows, args.wave, args.limit)
    lote_rows = build_lote_rows(selected, args.sender)
    csv_out = Path(args.csv_out)
    write_lote_csv(csv_out, lote_rows)
    write_review(Path(args.review_out), selected, lote_rows, args.wave, csv_out)

    print(f"Lote preparado: {len(lote_rows)} correos")
    print(f"- CSV: {args.csv_out}")
    print(f"- Revision: {args.review_out}")
    for row in lote_rows[:10]:
        print(f"- {row['contact_id']} {row['template_id']} {row['email']}")
    if len(lote_rows) > 10:
        print(f"... {len(lote_rows) - 10} mas")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
