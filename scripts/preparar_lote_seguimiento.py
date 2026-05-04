#!/usr/bin/env python3
"""Prepara el lote de seguimiento sin enviar correos.

Lee `contactos-maestro-operativo.csv`, aplica las reglas del plan de
seguimiento y genera:

- CSV operativo con elegibles
- Markdown revisable con conteo y previews

No toca servicios externos ni modifica maestros.
"""

from __future__ import annotations

import argparse
import csv
from collections import Counter
from pathlib import Path


REPO_DIR = Path(__file__).resolve().parents[1]
OPERACION_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email"
MENSAJERIA_DIR = REPO_DIR / "04-mensajeria-email"
MASTER_PATH = OPERACION_DIR / "contactos-maestro-operativo.csv"

CAMPAIGNS = {"primer_contacto_wave_1", "primer_contacto_wave_2", "primer_contacto_wave_3"}


VARIANTS = {
    "semilleros": {
        "segments": {"semillero", "grupo de investigacion"},
        "label": "Semilleros y grupos",
        "body": """Hola {contact_name},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para que semilleros y grupos academicos puedan ordenar fuentes, notas, borradores y tareas en un mismo espacio de trabajo.

Pensamos que en {role_or_unit} de {institution} podria servir para sostener memoria de trabajo y coordinar mejor lo que hoy suele quedar repartido entre correos, Drive y chats.

Si tiene sentido, puedo compartir una demo breve con un caso de semillero.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

Un saludo,

Jacob Agudelo & Steven Vallejo
Fundadores, Elenxos""",
    },
    "coordinaciones": {
        "segments": {"practicas", "pregrado", "programa", "posgrado", "administrativo", "admisiones", "escuela", "facultad"},
        "label": "Coordinaciones, programas y practicas",
        "body": """Hola {contact_name},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para ordenar lectura, escritura, fuentes y seguimiento academico en procesos con estudiantes, cohortes o trabajos de grado.

Pensamos que en {role_or_unit} de {institution} podria servir como un piloto pequeno para centralizar materiales, avances y evidencias sin aumentar la carga operativa del equipo.

Si lo ves pertinente, puedo compartir una demo concreta de 10 a 15 minutos.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

Un saludo,

Jacob Agudelo & Steven Vallejo
Fundadores, Elenxos""",
    },
    "docentes": {
        "segments": {"docencia", "linguistica", "lenguas extranjeras", "literatura", "ciencias humanas", "humanidades"},
        "label": "Docentes e investigadores",
        "body": """Hola {contact_name},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para apoyar trabajo academico con fuentes, notas, borradores y colaboracion en proyectos de investigacion o docencia.

Por el perfil de {role_or_unit} en {institution}, creemos que podria tener sentido explorarlo en un caso pequeno: un curso, un grupo de lectura, un proyecto o una linea de investigacion.

Si te interesa, puedo enviarte una demo breve y concreta.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

Un saludo,

Jacob Agudelo & Steven Vallejo
Fundadores, Elenxos""",
    },
    "escritura": {
        "segments": {"centro de escritura", "revista", "comunicaciones", "periodismo", "realizacion", "medios"},
        "label": "Centros de escritura, revistas y medios",
        "body": """Hola {contact_name},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para ordenar procesos de escritura, revision, fuentes y produccion textual colaborativa.

Pensamos que en {role_or_unit} de {institution} podria ser util para acompanamiento de borradores, memoria editorial o seguimiento de textos en proceso.

Si tiene sentido, puedo compartir una demo breve enfocada en escritura y revision.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

Un saludo,

Jacob Agudelo & Steven Vallejo
Fundadores, Elenxos""",
    },
    "generica": {
        "segments": set(),
        "label": "Humanidades generica segura",
        "body": """Hola {contact_name},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para ordenar fuentes, borradores y colaboracion academica en equipos que leen, escriben, investigan o ensenan.

Pensamos que en {role_or_unit} de {institution} podria ser util si hay procesos donde se mezclan documentos, notas, evidencias y seguimiento de trabajo.

Si tiene sentido, puedo compartir una demostracion breve y concreta.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

Un saludo,

Jacob Agudelo & Steven Vallejo
Fundadores, Elenxos""",
    },
}


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def write_csv(path: Path, rows: list[dict[str, str]]) -> None:
    headers = [
        "contact_id",
        "legacy_priority_rank",
        "contact_name",
        "institution",
        "segment",
        "role_or_unit",
        "email",
        "last_campaign",
        "last_subject",
        "followup_subject",
        "sender",
        "landing_url",
        "variant",
        "variant_label",
        "body_text",
        "send_status",
        "sent_at",
        "notes",
    ]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def eligible(row: dict[str, str], target_date: str) -> bool:
    return (
        row.get("status") == "first_contact_sent"
        and row.get("reply_status") == "pending"
        and row.get("next_action_date") == target_date
        and row.get("last_campaign") in CAMPAIGNS
        and row.get("contact_channel") == "email"
        and row.get("contact_value")
    )


def variant_for(segment: str) -> str:
    segment = (segment or "").strip().lower()
    for key, config in VARIANTS.items():
        if key == "generica":
            continue
        if segment in config["segments"]:
            return key
    return "generica"


def render(row: dict[str, str], variant: str) -> str:
    values = {
        "contact_name": row.get("contact_name", "").strip() or "equipo",
        "role_or_unit": row.get("role_or_unit", "").strip() or row.get("segment", "").strip() or "su unidad",
        "institution": row.get("institution", "").strip() or row.get("organization", "").strip() or "su institucion",
    }
    return VARIANTS[variant]["body"].format(**values)


def build_rows(master_rows: list[dict[str, str]], target_date: str, sender: str) -> list[dict[str, str]]:
    output: list[dict[str, str]] = []
    for row in master_rows:
        if not eligible(row, target_date):
            continue
        variant = variant_for(row.get("segment", ""))
        last_subject = row.get("last_subject", "").strip()
        output.append(
            {
                "contact_id": row.get("contact_id", ""),
                "legacy_priority_rank": row.get("legacy_priority_rank", ""),
                "contact_name": row.get("contact_name", ""),
                "institution": row.get("institution", ""),
                "segment": row.get("segment", ""),
                "role_or_unit": row.get("role_or_unit", ""),
                "email": row.get("contact_value", "").strip().lower(),
                "last_campaign": row.get("last_campaign", ""),
                "last_subject": last_subject,
                "followup_subject": f"RE: {last_subject}" if last_subject else "Seguimiento breve sobre Agora",
                "sender": sender,
                "landing_url": row.get("domain_objetivo", "https://agora.elenxos.com/"),
                "variant": variant,
                "variant_label": VARIANTS[variant]["label"],
                "body_text": render(row, variant),
                "send_status": "draft_review",
                "sent_at": "",
                "notes": "No enviado. Revisar INBOX/rebotes el dia de ejecucion antes de enviar.",
            }
        )
    return output


def write_markdown(path: Path, rows: list[dict[str, str]], target_date: str, preview_limit: int) -> None:
    by_wave = Counter(row["last_campaign"] for row in rows)
    by_variant = Counter(row["variant"] for row in rows)
    lines = [
        f"# Lote seguimiento elegible - {target_date}",
        "",
        "> Estado: generado para revision. No envia correos ni modifica servicios externos.",
        "",
        f"- Total elegible: {len(rows)}",
        f"- CSV: `05-datos-y-reportes/operacion-email/seguimiento-{target_date}.csv`",
        "- Regla: enviar solo despues de revisar INBOX/rebotes el dia de ejecucion y recibir autorizacion explicita.",
        "- CSV incluye `send_status=draft_review`; el envio real debe cambiarlo solo mediante script controlado.",
        "",
        "## Distribucion por campana",
        "",
        "| Campana | Cantidad |",
        "|---|---:|",
    ]
    for campaign, count in sorted(by_wave.items()):
        lines.append(f"| `{campaign}` | {count} |")
    lines.extend(["", "## Distribucion por variante", "", "| Variante | Cantidad |", "|---|---:|"])
    for variant, count in sorted(by_variant.items()):
        lines.append(f"| {VARIANTS[variant]['label']} | {count} |")
    lines.extend(["", f"## Preview primeros {min(preview_limit, len(rows))}", ""])
    for index, row in enumerate(rows[:preview_limit], start=1):
        lines.extend(
            [
                f"### {index}. {row['contact_id']} - {row['contact_name']}",
                "",
                f"- Email: `{row['email']}`",
                f"- Institucion: {row['institution']}",
                f"- Variante: {row['variant_label']}",
                f"- Asunto: `{row['followup_subject']}`",
                "",
                "```text",
                row["body_text"],
                "```",
                "",
            ]
        )
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Prepara lote de seguimiento sin enviar.")
    parser.add_argument("--date", default="2026-05-04", help="Fecha objetivo next_action_date.")
    parser.add_argument("--csv-output", default="", help="Ruta CSV de salida.")
    parser.add_argument("--md-output", default="", help="Ruta Markdown de salida.")
    parser.add_argument("--preview-limit", type=int, default=10)
    parser.add_argument("--sender", default="ventas@elenxos.com", help="Remitente previsto.")
    args = parser.parse_args()

    rows = build_rows(read_csv(MASTER_PATH), args.date, args.sender)
    csv_output = Path(args.csv_output) if args.csv_output else OPERACION_DIR / f"seguimiento-{args.date}.csv"
    md_output = Path(args.md_output) if args.md_output else MENSAJERIA_DIR / f"lote-seguimiento-{args.date}-revision.md"
    write_csv(csv_output, rows)
    write_markdown(md_output, rows, args.date, args.preview_limit)
    print(f"Elegibles: {len(rows)}")
    print(f"CSV: {csv_output}")
    print(f"Markdown: {md_output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
