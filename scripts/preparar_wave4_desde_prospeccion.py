#!/usr/bin/env python3
"""Prepara candidatos wave 4 desde prospeccion publica.

No envia correos, no importa en ERP y no modifica el maestro operativo. Genera
artefactos revisables para decidir una micro-ronda posterior al seguimiento.
"""

from __future__ import annotations

import argparse
import csv
import os
from pathlib import Path
import re
from typing import Iterable

from bootstrap_operacion_email import MASTER_HEADERS
from erpnext_importar_contactos import ERP_EXPORT_HEADERS, to_erp_export_row


REPO_DIR = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = REPO_DIR / "05-datos-y-reportes" / "prospeccion-publica-2026-05-01.csv"
DEFAULT_MASTER = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "contactos-maestro-operativo.csv"
DEFAULT_CANDIDATE_CSV = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "wave-4-candidatos-2026-05-01.csv"
DEFAULT_ERP_CSV = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "erp-leads-wave-4-candidatos-2026-05-01.csv"
DEFAULT_LOTE_CSV = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "primer-contacto-wave-4-candidatos-2026-05-01.csv"
DEFAULT_REVIEW = REPO_DIR / "04-mensajeria-email" / "lotes" / "lote-primer-contacto-wave-4-candidatos-2026-05-01.md"
PRODUCT_URL = "https://agora.elenxos.com/"
CORPORATE_URL = "https://www.elenxos.com/"
DEFAULT_NEXT_ACTION_DATE = "2026-05-05"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

LOTE_HEADERS = [
    "contact_id",
    "prospect_id",
    "score",
    "priority_tier",
    "email",
    "contact_name",
    "institution",
    "segment",
    "role_or_unit",
    "template_id",
    "subject",
    "sender",
    "landing_url",
    "source_url",
    "body_text",
    "send_status",
    "notes",
]

VARIANTS = {
    "centro_escritura": {
        "template_id": "wave4-centros-escritura",
        "subject": "Demo breve para acompanar lectura y escritura academica",
        "opening": "Vi que {unit} acompana procesos de lectura, escritura u oralidad con estudiantes y docentes.",
        "fit": "Por eso pense que una demo breve podria servirles para evaluar si Agora ayuda a centralizar recursos, borradores, evidencias de acompanamiento y trabajo entre el equipo.",
        "question": "Les interesaria una demo de 15 minutos o que les envie primero un ejemplo de workspace aplicado a un centro de escritura?",
    },
    "semillero": {
        "template_id": "wave4-semilleros",
        "subject": "Workspace para semilleros de literatura y lenguaje",
        "opening": "Vi el trabajo de {unit} y su relacion con lectura, lenguaje, escritura o investigacion formativa.",
        "fit": "Me parecio un caso cercano porque en los semilleros suele ser dificil sostener continuidad entre reuniones, documentos, fuentes, avances y productos.",
        "question": "Les interesaria una demo breve o un ejemplo de workspace para semillero de investigacion?",
    },
    "revista": {
        "template_id": "wave4-revistas",
        "subject": "Trazabilidad ligera para flujo editorial universitario",
        "opening": "Vi el trabajo editorial de {unit}.",
        "fit": "Pensamos que Agora podria servir como apoyo liviano para ordenar documentos, decisiones, fuentes y seguimiento de textos sin reemplazar su sistema editorial principal.",
        "question": "Les interesaria una demo de 15 minutos enfocada en flujo editorial universitario?",
    },
    "investigacion": {
        "template_id": "wave4-investigacion-formativa",
        "subject": "Apoyo para coordinar semilleros y evidencias academicas",
        "opening": "Vi que {unit} funciona como entrada o apoyo para semilleros y procesos de investigacion formativa.",
        "fit": "Agora podria ayudar a organizar fuentes, acuerdos, productos y evidencias entre varios equipos sin aumentar la carga administrativa.",
        "question": "Les interesaria revisar un ejemplo breve de workspace para coordinacion de semilleros?",
    },
}


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def is_email(value: str) -> bool:
    return bool(EMAIL_RE.match(value))


def score_key(row: dict[str, str]) -> tuple[int, str]:
    try:
        score = int(normalize(row.get("score", "")))
    except ValueError:
        score = 0
    return (-score, normalize(row.get("prospect_id", "")))


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        headers = list(reader.fieldnames or [])
        rows = [{key: normalize(value) for key, value in row.items() if key is not None} for row in reader]
    return headers, rows


def write_csv(path: Path, headers: list[str], rows: Iterable[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({field: row.get(field, "") for field in headers})


def existing_emails(master_path: Path) -> set[str]:
    if not master_path.exists():
        return set()
    _, rows = read_csv(master_path)
    emails: set[str] = set()
    for row in rows:
        if normalize(row.get("contact_channel", "")).lower() != "email":
            continue
        email = normalize_email(row.get("contact_value", ""))
        if email:
            emails.add(email)
    return emails


def select_prospects(rows: list[dict[str, str]], existing: set[str], limit: int | None) -> tuple[list[dict[str, str]], list[str]]:
    selected: list[dict[str, str]] = []
    skipped: list[str] = []
    seen: set[str] = set()

    for row in sorted(rows, key=score_key):
        prospect_id = normalize(row.get("prospect_id", ""))
        email = normalize_email(row.get("contact_value", ""))
        contact_type = normalize(row.get("contact_type", "")).lower()
        state = normalize(row.get("estado", "")).lower()

        if contact_type != "email":
            skipped.append(f"{prospect_id or '?'} sin canal email")
            continue
        if not is_email(email):
            skipped.append(f"{prospect_id or '?'} email invalido: {email or 'vacio'}")
            continue
        if email in existing:
            skipped.append(f"{prospect_id or '?'} duplicado contra maestro: {email}")
            continue
        if email in seen:
            skipped.append(f"{prospect_id or '?'} duplicado dentro de prospeccion: {email}")
            continue
        if state and state != "ready_for_review":
            skipped.append(f"{prospect_id or '?'} estado no listo: {state}")
            continue

        selected.append(dict(row, contact_value=email))
        seen.add(email)
        if limit is not None and len(selected) >= limit:
            break

    return selected, skipped


def slug_tag(value: str) -> str:
    value = normalize(value).lower()
    value = re.sub(r"[^a-z0-9]+", "_", value)
    return value.strip("_")


def contact_id_for(row: dict[str, str], index: int) -> str:
    prospect_id = normalize(row.get("prospect_id", ""))
    if prospect_id.startswith("prospect-"):
        return "agora-public-" + prospect_id.replace("prospect-", "")
    return f"agora-public-20260501-{index:03d}"


def variant_for(row: dict[str, str]) -> str:
    haystack = " ".join(
        [
            normalize(row.get("segment", "")).lower(),
            normalize(row.get("role_or_unit", "")).lower(),
            normalize(row.get("contact_name", "")).lower(),
        ]
    )
    if "revista" in haystack or "editorial" in haystack:
        return "revista"
    if "investigacion" in haystack or "investigaciones" in haystack:
        return "investigacion"
    if "semillero" in haystack:
        return "semillero"
    return "centro_escritura"


def compact_note(row: dict[str, str]) -> str:
    parts = [
        f"Score {row.get('score', '')}",
        f"tier {row.get('priority_tier', '')}",
        f"evidencia: {row.get('source_evidence', '')}",
        f"dolor: {row.get('dolor_probable', '')}",
        f"oferta: {row.get('oferta_sugerida', '')}",
        "Candidato wave 4; no enviar ni importar sin aprobacion.",
    ]
    return " | ".join(part for part in parts if part and not part.endswith(": "))


def build_candidate_rows(prospects: list[dict[str, str]], source_name: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for index, prospect in enumerate(prospects, start=1):
        segment = normalize(prospect.get("segment", ""))
        tier = normalize(prospect.get("priority_tier", "")).lower()
        tags = [
            "public_research",
            "wave_4_candidate",
            tier,
            slug_tag(segment),
            slug_tag(variant_for(prospect)),
        ]
        rows.append(
            {
                "contact_id": contact_id_for(prospect, index),
                "source_dataset": source_name,
                "legacy_priority_rank": str(400 + index),
                "brand": "Agora",
                "domain_objetivo": PRODUCT_URL,
                "contact_name": normalize(prospect.get("contact_name", "")),
                "organization": normalize(prospect.get("institution", "")),
                "institution": normalize(prospect.get("institution", "")),
                "city": normalize(prospect.get("city", "")),
                "segment": segment,
                "role_or_unit": normalize(prospect.get("role_or_unit", "")),
                "contact_channel": "email",
                "contact_value": normalize_email(prospect.get("contact_value", "")),
                "quick_contact_url": normalize(prospect.get("quick_contact_url", "")),
                "source_url": normalize(prospect.get("source_url", "")),
                "status": "new_prospect_pending_review",
                "last_contact_date": "",
                "next_action": "revisar prospecto, guardar en ERP y preparar primer contacto",
                "next_action_date": DEFAULT_NEXT_ACTION_DATE,
                "reply_status": "not_sent",
                "owner": "",
                "last_sender_email": "",
                "last_sender_identity": "",
                "last_campaign": "",
                "last_subject": "",
                "landing_url_sent": "",
                "declaration_required": "no",
                "declaration_status": "not_applicable",
                "erp_doctype": "Lead",
                "erp_lead_id": "",
                "erp_sync_status": "pending",
                "erp_synced_at": "",
                "erp_sync_notes": "",
                "launch_wave": "wave_4_public_research",
                "tags": ",".join(tag for tag in tags if tag),
                "notes": compact_note(prospect),
                "_prospect_id": normalize(prospect.get("prospect_id", "")),
                "_score": normalize(prospect.get("score", "")),
                "_priority_tier": normalize(prospect.get("priority_tier", "")),
                "_variant": variant_for(prospect),
                "_source_evidence": normalize(prospect.get("source_evidence", "")),
                "_dolor_probable": normalize(prospect.get("dolor_probable", "")),
                "_oferta_sugerida": normalize(prospect.get("oferta_sugerida", "")),
            }
        )
    return rows


def build_erp_rows(candidate_rows: list[dict[str, str]]) -> list[dict[str, str]]:
    return [to_erp_export_row(row) for row in candidate_rows]


def render_email(row: dict[str, str]) -> tuple[str, str, str]:
    variant = VARIANTS[row["_variant"]]
    unit = row.get("contact_name", "") or row.get("institution", "") or "su equipo"
    institution = row.get("institution", "") or "su institucion"
    greeting = f"Hola, equipo de {unit}."
    body = [
        greeting,
        "",
        "Soy Steven Vallejo, de Elenxos, equipo nacido desde la Universidad de Antioquia. Estamos construyendo Agora, una herramienta para ordenar lectura, escritura, fuentes, acuerdos y seguimiento en procesos academicos colaborativos.",
        "",
        variant["opening"].format(unit=unit, institution=institution),
        variant["fit"],
        "",
        "Sitios oficiales:",
        CORPORATE_URL,
        PRODUCT_URL,
        "",
        variant["question"],
    ]
    return str(variant["template_id"]), str(variant["subject"]), "\n".join(body)


def build_lote_rows(candidate_rows: list[dict[str, str]], sender: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for candidate in candidate_rows:
        template_id, subject, body_text = render_email(candidate)
        rows.append(
            {
                "contact_id": candidate.get("contact_id", ""),
                "prospect_id": candidate.get("_prospect_id", ""),
                "score": candidate.get("_score", ""),
                "priority_tier": candidate.get("_priority_tier", ""),
                "email": candidate.get("contact_value", ""),
                "contact_name": candidate.get("contact_name", ""),
                "institution": candidate.get("institution", ""),
                "segment": candidate.get("segment", ""),
                "role_or_unit": candidate.get("role_or_unit", ""),
                "template_id": template_id,
                "subject": subject,
                "sender": sender,
                "landing_url": PRODUCT_URL,
                "source_url": candidate.get("source_url", ""),
                "body_text": body_text,
                "send_status": "draft_review",
                "notes": "No enviado. No importar ni enviar hasta aprobar wave 4.",
            }
        )
    return rows


def distribution(rows: list[dict[str, str]], field: str) -> list[tuple[str, int]]:
    counts: dict[str, int] = {}
    for row in rows:
        key = normalize(row.get(field, "")) or "sin_valor"
        counts[key] = counts.get(key, 0) + 1
    return sorted(counts.items(), key=lambda item: (-item[1], item[0]))


def display_path(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_DIR))
    except ValueError:
        return str(path)


def write_review(
    path: Path,
    candidate_rows: list[dict[str, str]],
    lote_rows: list[dict[str, str]],
    skipped: list[str],
    source: Path,
    candidate_csv: Path,
    erp_csv: Path,
    lote_csv: Path,
    preview_limit: int,
) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# Lote primer contacto wave 4 candidatos - 2026-05-01",
        "",
        "> Estado: borrador revisable. No se envio correo, no se importo ERPNext y no se modifico el maestro operativo.",
        "",
        f"- Fuente: `{display_path(source)}`",
        f"- Candidatos operativos: `{display_path(candidate_csv)}`",
        f"- Export ERPNext manual: `{display_path(erp_csv)}`",
        f"- CSV lote email: `{display_path(lote_csv)}`",
        f"- Total candidatos: {len(candidate_rows)}",
        f"- Excluidos por deduplicacion/calidad: {len(skipped)}",
        "",
        "## Distribucion",
        "",
    ]

    for label, field in [("Tier", "_priority_tier"), ("Segmento", "segment"), ("Plantilla", "template_id")]:
        lines.append(f"### {label}")
        lines.append("")
        source_rows = lote_rows if field == "template_id" else candidate_rows
        for value, count in distribution(source_rows, field):
            lines.append(f"- {value}: {count}")
        lines.append("")

    lines.extend(
        [
            "## Candidatos",
            "",
            "| Score | Tier | Contacto | Institucion | Email | Plantilla |",
            "| --- | --- | --- | --- | --- | --- |",
        ]
    )
    lote_by_id = {row["contact_id"]: row for row in lote_rows}
    for row in candidate_rows:
        lote = lote_by_id[row["contact_id"]]
        lines.append(
            "| {score} | {tier} | {contact} | {institution} | `{email}` | {template} |".format(
                score=row.get("_score", ""),
                tier=row.get("_priority_tier", ""),
                contact=row.get("contact_name", ""),
                institution=row.get("institution", ""),
                email=row.get("contact_value", ""),
                template=lote.get("template_id", ""),
            )
        )

    if skipped:
        lines.extend(["", "## Excluidos", ""])
        for item in skipped:
            lines.append(f"- {item}")

    lines.extend(["", "## Previews", ""])
    for index, row in enumerate(candidate_rows[:preview_limit], start=1):
        lote = lote_by_id[row["contact_id"]]
        _, _, body = render_email(row)
        lines.extend(
            [
                f"### {index:02d}. {row.get('contact_name', '')} - {row.get('institution', '')}",
                "",
                f"- Contact ID: `{row.get('contact_id', '')}`",
                f"- Prospect ID: `{row.get('_prospect_id', '')}`",
                f"- Para: `{row.get('contact_value', '')}`",
                f"- Remitente previsto: `{lote.get('sender', '')}`",
                f"- Asunto: `{lote.get('subject', '')}`",
                f"- Fuente: {row.get('source_url', '')}",
                "",
                "```text",
                body,
                "```",
                "",
            ]
        )

    if len(candidate_rows) > preview_limit:
        lines.append(f"_Se omitieron {len(candidate_rows) - preview_limit} previews para mantener revision manejable._")

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Prepara candidatos wave 4 desde prospeccion publica.")
    parser.add_argument("--source", default=str(DEFAULT_SOURCE), help="CSV de prospeccion publica.")
    parser.add_argument("--master", default=str(DEFAULT_MASTER), help="Maestro operativo para deduplicar.")
    parser.add_argument("--candidate-csv", default=str(DEFAULT_CANDIDATE_CSV), help="CSV candidato con schema operativo.")
    parser.add_argument("--erp-csv", default=str(DEFAULT_ERP_CSV), help="CSV exportable a ERPNext Data Import.")
    parser.add_argument("--lote-csv", default=str(DEFAULT_LOTE_CSV), help="CSV borrador de primer contacto.")
    parser.add_argument("--review-out", default=str(DEFAULT_REVIEW), help="Markdown de revision.")
    parser.add_argument("--limit", type=int, help="Limita candidatos seleccionados.")
    parser.add_argument("--preview-limit", type=int, default=15, help="Cantidad de previews renderizados.")
    parser.add_argument("--sender", default=os.environ.get("MAIL_FROM_EMAIL", "ventas@elenxos.com"), help="Remitente previsto.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit debe ser mayor que cero")
    if args.preview_limit < 1:
        raise SystemExit("--preview-limit debe ser mayor que cero")

    source = Path(args.source)
    master = Path(args.master)
    _, prospect_rows = read_csv(source)
    selected, skipped = select_prospects(prospect_rows, existing_emails(master), args.limit)
    candidate_rows = build_candidate_rows(selected, source.name)
    erp_rows = build_erp_rows(candidate_rows)
    lote_rows = build_lote_rows(candidate_rows, args.sender)

    candidate_csv = Path(args.candidate_csv)
    erp_csv = Path(args.erp_csv)
    lote_csv = Path(args.lote_csv)
    review_out = Path(args.review_out)

    write_csv(candidate_csv, MASTER_HEADERS, candidate_rows)
    write_csv(erp_csv, ERP_EXPORT_HEADERS, erp_rows)
    write_csv(lote_csv, LOTE_HEADERS, lote_rows)
    write_review(
        review_out,
        candidate_rows,
        lote_rows,
        skipped,
        source,
        candidate_csv,
        erp_csv,
        lote_csv,
        args.preview_limit,
    )

    print(f"Candidatos wave 4 preparados: {len(candidate_rows)}")
    print(f"- CSV operativo candidato: {candidate_csv}")
    print(f"- CSV ERPNext: {erp_csv}")
    print(f"- CSV lote email: {lote_csv}")
    print(f"- Revision: {review_out}")
    if skipped:
        print(f"- Excluidos: {len(skipped)}")
    for row in lote_rows[:10]:
        print(f"- {row['contact_id']} | {row['score']} | {row['email']} | {row['template_id']}")
    if len(lote_rows) > 10:
        print(f"... {len(lote_rows) - 10} mas")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
