#!/usr/bin/env python3
"""Promueve candidatos wave 4 al maestro operativo con dedupe.

Por defecto solo hace dry-run. No importa ERPNext ni envia correos.
"""

from __future__ import annotations

import argparse
import csv
from datetime import date
from pathlib import Path

from bootstrap_operacion_email import MASTER_HEADERS
from erpnext_importar_contactos import ERP_EXPORT_HEADERS, to_erp_export_row


REPO_DIR = Path(__file__).resolve().parents[1]
OPERACION_DIR = REPO_DIR / "05-datos-y-reportes" / "operacion-email"
DEFAULT_CANDIDATES = OPERACION_DIR / "wave-4-candidatos-2026-05-01.csv"
DEFAULT_MASTER = OPERACION_DIR / "contactos-maestro-operativo.csv"
DEFAULT_ERP = OPERACION_DIR / "erp-leads-wave-4-aprobados.csv"


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        return list(reader.fieldnames or []), [{key: normalize(value) for key, value in row.items() if key is not None} for row in reader]


def write_csv(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, lineterminator="\n")
        writer.writeheader()
        writer.writerows({field: row.get(field, "") for field in headers} for row in rows)


def existing_keys(rows: list[dict[str, str]]) -> tuple[set[str], set[str]]:
    contact_ids = {normalize(row.get("contact_id", "")) for row in rows if normalize(row.get("contact_id", ""))}
    emails = {
        normalize_email(row.get("contact_value", ""))
        for row in rows
        if normalize(row.get("contact_channel", "")).lower() == "email" and normalize(row.get("contact_value", ""))
    }
    return contact_ids, emails


def select_approved(candidates: list[dict[str, str]], limit: int | None) -> list[dict[str, str]]:
    selected = [
        dict(row)
        for row in candidates
        if normalize(row.get("status", "")) in {"new_prospect_pending_review", "approved_for_wave_4"}
    ]
    if limit is not None:
        selected = selected[:limit]
    return selected


def promotion_note(row: dict[str, str], approved_date: str) -> str:
    base = normalize(row.get("notes", ""))
    suffix = f"Aprobado localmente como wave 4 el {approved_date}; importar ERP antes de enviar."
    return " | ".join(part for part in [base, suffix] if part)


def build_promoted_rows(candidates: list[dict[str, str]], master_rows: list[dict[str, str]], approved_date: str) -> tuple[list[dict[str, str]], list[str]]:
    existing_ids, existing_emails = existing_keys(master_rows)
    promoted: list[dict[str, str]] = []
    skipped: list[str] = []
    seen_emails: set[str] = set()
    for row in candidates:
        contact_id = normalize(row.get("contact_id", ""))
        email = normalize_email(row.get("contact_value", ""))
        if contact_id in existing_ids:
            skipped.append(f"{contact_id}: contact_id ya existe")
            continue
        if email in existing_emails:
            skipped.append(f"{contact_id}: email ya existe en maestro ({email})")
            continue
        if email in seen_emails:
            skipped.append(f"{contact_id}: email duplicado en seleccion ({email})")
            continue
        promoted_row = {field: row.get(field, "") for field in MASTER_HEADERS}
        promoted_row["contact_value"] = email
        promoted_row["status"] = "new_prospect_pending_erp_import"
        promoted_row["next_action"] = "guardar en ERP y preparar primer contacto wave 4"
        promoted_row["next_action_date"] = approved_date
        promoted_row["erp_sync_status"] = "pending"
        promoted_row["erp_lead_id"] = ""
        promoted_row["erp_synced_at"] = ""
        promoted_row["erp_sync_notes"] = ""
        promoted_row["notes"] = promotion_note(row, approved_date)
        promoted.append(promoted_row)
        seen_emails.add(email)
    return promoted, skipped


def main() -> int:
    parser = argparse.ArgumentParser(description="Promueve candidatos wave 4 al maestro operativo.")
    parser.add_argument("--candidates", default=str(DEFAULT_CANDIDATES), help="CSV candidato wave 4.")
    parser.add_argument("--master", default=str(DEFAULT_MASTER), help="Maestro operativo.")
    parser.add_argument("--erp-csv", default=str(DEFAULT_ERP), help="CSV ERPNext de aprobados.")
    parser.add_argument("--approved-date", default=date.today().isoformat(), help="Fecha de aprobacion local YYYY-MM-DD.")
    parser.add_argument("--limit", type=int, help="Limita candidatos a promover.")
    parser.add_argument("--apply", action="store_true", help="Escribe cambios en maestro y ERP CSV.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit debe ser mayor que cero")
    Path(args.candidates)
    master_headers, master_rows = read_csv(Path(args.master))
    _, candidate_rows = read_csv(Path(args.candidates))
    approved = select_approved(candidate_rows, args.limit)
    promoted, skipped = build_promoted_rows(approved, master_rows, args.approved_date)
    print(f"Candidatos seleccionados: {len(approved)}")
    print(f"Promovibles: {len(promoted)}")
    for row in promoted[:10]:
        print(f"- {row['contact_id']} {row['contact_value']} {row['institution']}")
    if len(promoted) > 10:
        print(f"... {len(promoted) - 10} mas")
    if skipped:
        print(f"Excluidos: {len(skipped)}")
        for item in skipped[:20]:
            print(f"- {item}")
    if not args.apply:
        print("Dry-run. Use --apply para escribir cambios.")
        return 0
    write_csv(Path(args.master), master_headers or MASTER_HEADERS, master_rows + promoted)
    write_csv(Path(args.erp_csv), ERP_EXPORT_HEADERS, [to_erp_export_row(row) for row in promoted])
    print(f"Maestro actualizado: {args.master}")
    print(f"CSV ERPNext aprobados: {args.erp_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
