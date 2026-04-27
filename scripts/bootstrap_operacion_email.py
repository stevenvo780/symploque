#!/usr/bin/env python3
"""
Bootstrap de la nueva operacion email desde el historico de Agora.

No inventa respuestas ni asuntos reales. Solo transforma el historico existente
en una capa operativa provisional para que el equipo pueda reconciliar:

- contactos ya marcados como `contactado`
- cola inicial de `declaracion`
- base maestra de outreach con trazabilidad minima

Tambien soporta `--fresh-launch` para reiniciar la operacion cuando se confirma
que no se ha contactado a nadie: no crea historico de envios ni colas de
declaracion, y deja todos los contactos como prospectos pendientes.
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
import shutil
import sys


REPO_DIR = Path(__file__).resolve().parents[1]
LEGACY_MASTER = REPO_DIR / "05-datos-y-reportes" / "leads-agora-maestro.csv"
OPERACION_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email"
MASTER_OPERATIVO = OPERACION_DIR / "contactos-maestro-operativo.csv"
ENVIADOS_IMPORTAR = OPERACION_DIR / "correos-enviados-importar.csv"
DECLARACION_PENDIENTES = OPERACION_DIR / "declaracion-pendientes.csv"
OUTPUT_FILES = [MASTER_OPERATIVO, ENVIADOS_IMPORTAR, DECLARACION_PENDIENTES]

PERSONAL_SENDER = "stevenvallejo780@gmail.com"
OFFICIAL_SENDER = "ventas@elenxos.com"
PRODUCT_URL = "https://agora.elenxos.com/"


MASTER_HEADERS = [
    "contact_id",
    "source_dataset",
    "legacy_priority_rank",
    "brand",
    "domain_objetivo",
    "contact_name",
    "organization",
    "institution",
    "city",
    "segment",
    "role_or_unit",
    "contact_channel",
    "contact_value",
    "quick_contact_url",
    "source_url",
    "status",
    "last_contact_date",
    "next_action",
    "next_action_date",
    "reply_status",
    "owner",
    "last_sender_email",
    "last_sender_identity",
    "last_campaign",
    "last_subject",
    "landing_url_sent",
    "declaration_required",
    "declaration_status",
    "erp_doctype",
    "erp_lead_id",
    "erp_sync_status",
    "erp_synced_at",
    "erp_sync_notes",
    "launch_wave",
    "tags",
    "notes",
]

ENVIADOS_HEADERS = [
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

DECLARACION_HEADERS = [
    "contact_id",
    "contact_name",
    "organization",
    "institution",
    "email",
    "last_contact_date",
    "last_sender_email",
    "declaration_reason",
    "declaration_priority",
    "official_sender_email",
    "landing_url_target",
    "ready_to_send",
    "send_status",
    "next_action",
    "notes",
]


@dataclass
class LegacyRow:
    priority_rank: str
    priority_tier: str
    institution: str
    city: str
    segment: str
    contact_name: str
    role_or_unit: str
    contact_type: str
    contact_value: str
    quick_contact_url: str
    source_url: str
    estado: str
    fecha_ultimo_contacto: str
    proxima_accion: str
    fecha_proxima_accion: str
    owner: str

    @classmethod
    def from_dict(cls, row: dict[str, str]) -> "LegacyRow":
        return cls(
            priority_rank=(row.get("priority_rank") or "").strip(),
            priority_tier=(row.get("priority_tier") or "").strip(),
            institution=(row.get("institution") or "").strip(),
            city=(row.get("city") or "").strip(),
            segment=(row.get("segment") or "").strip(),
            contact_name=(row.get("contact_name") or "").strip(),
            role_or_unit=(row.get("role_or_unit") or "").strip(),
            contact_type=(row.get("contact_type") or "").strip(),
            contact_value=(row.get("contact_value") or "").strip(),
            quick_contact_url=(row.get("quick_contact_url") or "").strip(),
            source_url=(row.get("source_url") or "").strip(),
            estado=(row.get("estado") or "").strip(),
            fecha_ultimo_contacto=(row.get("fecha_ultimo_contacto") or "").strip(),
            proxima_accion=(row.get("proxima_accion") or "").strip(),
            fecha_proxima_accion=(row.get("fecha_proxima_accion") or "").strip(),
            owner=(row.get("owner") or "").strip(),
        )

    @property
    def is_contacted(self) -> bool:
        return self.estado.lower() == "contactado"

    @property
    def contact_id(self) -> str:
        rank = self.priority_rank.zfill(3) if self.priority_rank else "000"
        return f"agora-legacy-{rank}"

    @property
    def launch_wave(self) -> str:
        try:
            rank = int(self.priority_rank)
        except ValueError:
            return "wave_unclassified"

        if self.is_contacted:
            return "declaracion"
        if rank <= 50:
            return "wave_1"
        if rank <= 120:
            return "wave_2"
        return "wave_3"

    @property
    def fresh_launch_wave(self) -> str:
        try:
            rank = int(self.priority_rank)
        except ValueError:
            return "wave_unclassified"

        if rank <= 50:
            return "wave_1"
        if rank <= 120:
            return "wave_2"
        return "wave_3"

    @property
    def declaration_priority(self) -> str:
        try:
            rank = int(self.priority_rank)
        except ValueError:
            return "normal"

        if rank <= 50:
            return "alta"
        if rank <= 120:
            return "media"
        return "normal"

    @property
    def tags(self) -> str:
        tags = [
            "historico_agora",
            self.priority_tier.lower() if self.priority_tier else "",
            self.segment.lower().replace(" ", "_"),
            "legacy_contacted" if self.is_contacted else "legacy_pending",
        ]
        return ",".join(tag for tag in tags if tag)

    def fresh_launch_tags(self) -> str:
        tags = [
            "historico_agora",
            self.priority_tier.lower() if self.priority_tier else "",
            self.segment.lower().replace(" ", "_"),
            "fresh_launch",
            "legacy_uncontacted",
        ]
        return ",".join(tag for tag in tags if tag)


def read_legacy_rows() -> list[LegacyRow]:
    with open(LEGACY_MASTER, newline="", encoding="utf-8") as handle:
        return [LegacyRow.from_dict(row) for row in csv.DictReader(handle)]


def write_csv(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def existing_outputs(paths: list[Path]) -> list[Path]:
    return [path for path in paths if path.exists()]


def backup_outputs(paths: list[Path]) -> Path | None:
    existing = existing_outputs(paths)
    if not existing:
        return None

    backup_dir = OPERACION_DIR / "backups" / f"bootstrap-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    backup_dir.mkdir(parents=True, exist_ok=True)
    for path in existing:
        shutil.copy2(path, backup_dir / path.name)
    return backup_dir


def build_master_row(row: LegacyRow, fresh_launch: bool = False) -> dict[str, str]:
    contacted = row.is_contacted and not fresh_launch

    return {
        "contact_id": row.contact_id,
        "source_dataset": "leads-agora-maestro.csv",
        "legacy_priority_rank": row.priority_rank,
        "brand": "Agora",
        "domain_objetivo": PRODUCT_URL,
        "contact_name": row.contact_name,
        "organization": row.institution,
        "institution": row.institution,
        "city": row.city,
        "segment": row.segment,
        "role_or_unit": row.role_or_unit,
        "contact_channel": row.contact_type,
        "contact_value": row.contact_value,
        "quick_contact_url": row.quick_contact_url,
        "source_url": row.source_url,
        "status": "legacy_contacted_needs_reconciliation" if contacted else "new_prospect_pending_erp_import",
        "last_contact_date": "" if fresh_launch else row.fecha_ultimo_contacto,
        "next_action": "guardar en ERP y preparar primer contacto" if fresh_launch else row.proxima_accion or (
            "verificar historial y preparar declaracion" if contacted else "guardar en ERP y preparar primer contacto"
        ),
        "next_action_date": "" if fresh_launch else row.fecha_proxima_accion,
        "reply_status": "unknown" if contacted else "not_sent",
        "owner": row.owner,
        "last_sender_email": PERSONAL_SENDER if contacted else "",
        "last_sender_identity": "personal" if contacted else "",
        "last_campaign": "legacy_personal_outreach" if contacted else "",
        "last_subject": "",
        "landing_url_sent": PRODUCT_URL if contacted else "",
        "declaration_required": "yes" if contacted else "no",
        "declaration_status": "pending_reconciliation" if contacted else "not_applicable",
        "erp_doctype": "Lead",
        "erp_lead_id": "",
        "erp_sync_status": "pending",
        "erp_synced_at": "",
        "erp_sync_notes": "",
        "launch_wave": row.launch_wave if contacted else row.fresh_launch_wave,
        "tags": row.tags if contacted else row.fresh_launch_tags(),
        "notes": (
            "Auto-bootstrap desde historico. Verificar contra la bandeja real antes de enviar declaracion."
            if contacted
            else "Auto-bootstrap fresh launch. No se ha contactado aun; importar al ERP antes de enviar."
        ),
    }


def build_sent_row(row: LegacyRow) -> dict[str, str]:
    return {
        "source_id": row.contact_id,
        "contact_name": row.contact_name,
        "organization": row.institution,
        "institution": row.institution,
        "email": row.contact_value if row.contact_type == "email" else "",
        "sent_at": row.fecha_ultimo_contacto,
        "last_sender_email": PERSONAL_SENDER,
        "sender_identity": "personal",
        "campaign": "legacy_personal_outreach",
        "subject": "",
        "landing_url_shared": PRODUCT_URL,
        "reply_status": "unknown",
        "declaration_required": "yes",
        "declaration_status": "pending_reconciliation",
        "notes": "Fila provisional derivada del CSV historico. Confirmar fecha y asunto contra el outbox real.",
    }


def build_declaration_row(row: LegacyRow) -> dict[str, str]:
    return {
        "contact_id": row.contact_id,
        "contact_name": row.contact_name,
        "organization": row.institution,
        "institution": row.institution,
        "email": row.contact_value if row.contact_type == "email" else "",
        "last_contact_date": row.fecha_ultimo_contacto,
        "last_sender_email": PERSONAL_SENDER,
        "declaration_reason": "normalizar remitente corporativo y corregir canal oficial",
        "declaration_priority": row.declaration_priority,
        "official_sender_email": OFFICIAL_SENDER,
        "landing_url_target": PRODUCT_URL,
        "ready_to_send": "no",
        "send_status": "pending_reconciliation",
        "next_action": "confirmar contra la bandeja real y aprobar copy de declaracion",
        "notes": "Cola provisional auto-generada desde el historico de contactos marcados como contactado.",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Bootstrap seguro de la operacion email desde leads-agora-maestro.csv.")
    parser.add_argument("--force", action="store_true", help="Sobrescribe CSVs operativos existentes.")
    parser.add_argument("--backup", action="store_true", help="Copia CSVs existentes a operacion-email/backups/ antes de sobrescribir.")
    parser.add_argument("--dry-run", action="store_true", help="Calcula conteos sin escribir archivos.")
    parser.add_argument(
        "--fresh-launch",
        action="store_true",
        help="Ignora marcas historicas de contactado y arranca con cero envios/declaraciones.",
    )
    args = parser.parse_args()

    rows = read_legacy_rows()

    master_rows = [build_master_row(row, fresh_launch=args.fresh_launch) for row in rows]
    sent_rows = [] if args.fresh_launch else [build_sent_row(row) for row in rows if row.is_contacted]
    declaration_rows = [] if args.fresh_launch else [build_declaration_row(row) for row in rows if row.is_contacted]

    print("Bootstrap calculado:")
    print(f"- modo fresh launch: {'si' if args.fresh_launch else 'no'}")
    print(f"- contactos maestro: {len(master_rows)}")
    print(f"- enviados provisionales: {len(sent_rows)}")
    print(f"- declaracion provisional: {len(declaration_rows)}")

    if args.dry_run:
        print("Modo dry-run: no se escribieron archivos.")
        return 0

    existing = existing_outputs(OUTPUT_FILES)
    if existing and not args.force:
        print("\nSalida bloqueada: ya existen CSVs operativos.", file=sys.stderr)
        for path in existing:
            print(f"- {path}", file=sys.stderr)
        print("\nUse --force para sobrescribir o --force --backup para respaldar antes.", file=sys.stderr)
        return 2

    OPERACION_DIR.mkdir(parents=True, exist_ok=True)
    backup_dir = backup_outputs(OUTPUT_FILES) if args.backup else None
    write_csv(MASTER_OPERATIVO, MASTER_HEADERS, master_rows)
    write_csv(ENVIADOS_IMPORTAR, ENVIADOS_HEADERS, sent_rows)
    write_csv(DECLARACION_PENDIENTES, DECLARACION_HEADERS, declaration_rows)

    print("\nBootstrap escrito correctamente:")
    print(f"- {MASTER_OPERATIVO}")
    print(f"- {ENVIADOS_IMPORTAR}")
    print(f"- {DECLARACION_PENDIENTES}")
    if backup_dir:
        print(f"Backup previo: {backup_dir}")
    print()
    print("Siguiente paso obligatorio:")
    print("- verificar las filas contactadas contra la bandeja real antes de enviar declaracion")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
