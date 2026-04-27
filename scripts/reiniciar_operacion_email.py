#!/usr/bin/env python3
"""Reinicia la operacion de correo como lanzamiento fresco.

Uso: cuando se confirma que no se ha contactado a nadie todavia, este script
vuelve coherentes los CSV operativos:

- deja el maestro historico y el top 50 en estado pendiente
- elimina colas de declaracion/disculpa derivadas de falsos envios previos
- regenera el maestro operativo con campos de sincronizacion ERP
- crea backup local antes de escribir
"""

from __future__ import annotations

import argparse
import csv
from datetime import datetime
from pathlib import Path
import shutil

from bootstrap_operacion_email import (
    DECLARACION_HEADERS,
    DECLARACION_PENDIENTES,
    ENVIADOS_HEADERS,
    ENVIADOS_IMPORTAR,
    LEGACY_MASTER,
    MASTER_HEADERS,
    MASTER_OPERATIVO,
    OPERACION_DIR,
    build_master_row,
    read_legacy_rows,
    write_csv,
)


TOP_50 = LEGACY_MASTER.with_name("leads-agora-top-50-hoy.csv")
DISCULPA_PENDIENTES = OPERACION_DIR / "disculpa-error-pendientes.csv"

DISCULPA_HEADERS = [
    "incident_id",
    "source_token",
    "duplicate_count",
    "priority_rank",
    "contact_name",
    "institution",
    "role_or_unit",
    "email",
    "subject",
    "body_variant",
    "send_status",
    "last_sender_email",
    "official_sender_email",
    "notes",
]

RESET_SOURCE_COLUMNS = {
    "estado": "pendiente",
    "fecha_ultimo_contacto": "",
    "proxima_accion": "contactar",
    "fecha_proxima_accion": "",
    "respuesta": "",
}


def backup_files(paths: list[Path], label: str) -> Path:
    backup_dir = OPERACION_DIR / "backups" / f"{label}-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    backup_dir.mkdir(parents=True, exist_ok=True)
    for path in paths:
        if path.exists():
            shutil.copy2(path, backup_dir / path.name)
    return backup_dir


def read_csv_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        return list(reader.fieldnames or []), [{key: value or "" for key, value in row.items() if key is not None} for row in reader]


def write_rows(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def reset_source_csv(path: Path) -> int:
    headers, rows = read_csv_rows(path)
    changed = 0
    for row in rows:
        was_contacted = row.get("estado", "").strip().lower() == "contactado"
        had_contact_trace = bool(row.get("fecha_ultimo_contacto", "").strip() or row.get("respuesta", "").strip())
        for column, value in RESET_SOURCE_COLUMNS.items():
            if column in headers and row.get(column, "") != value:
                row[column] = value
        if was_contacted or had_contact_trace:
            changed += 1
    write_rows(path, headers, rows)
    return changed


def build_fresh_operational_files() -> dict[str, int]:
    rows = read_legacy_rows()
    master_rows = [build_master_row(row, fresh_launch=True) for row in rows]
    write_csv(MASTER_OPERATIVO, MASTER_HEADERS, master_rows)
    write_csv(ENVIADOS_IMPORTAR, ENVIADOS_HEADERS, [])
    write_csv(DECLARACION_PENDIENTES, DECLARACION_HEADERS, [])
    write_csv(DISCULPA_PENDIENTES, DISCULPA_HEADERS, [])

    email_rows = [row for row in master_rows if row["contact_channel"] == "email"]
    wave_1_email_rows = [row for row in email_rows if row["launch_wave"] == "wave_1"]
    return {
        "master_rows": len(master_rows),
        "email_rows": len(email_rows),
        "wave_1_email_rows": len(wave_1_email_rows),
        "sent_rows": 0,
        "declaration_rows": 0,
        "apology_rows": 0,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Reinicia la operacion email como lanzamiento fresco sin contactos previos.")
    parser.add_argument("--dry-run", action="store_true", help="Calcula cambios sin escribir archivos.")
    parser.add_argument("--no-backup", action="store_true", help="No crear backup previo.")
    args = parser.parse_args()

    source_files = [LEGACY_MASTER, TOP_50]
    operation_files = [MASTER_OPERATIVO, ENVIADOS_IMPORTAR, DECLARACION_PENDIENTES, DISCULPA_PENDIENTES]
    all_files = source_files + operation_files

    if args.dry_run:
        print("Dry-run: reinicio fresh launch")
        for path in source_files:
            _, rows = read_csv_rows(path)
            touched = sum(
                1
                for row in rows
                if row.get("estado", "").strip().lower() == "contactado"
                or row.get("fecha_ultimo_contacto", "").strip()
                or row.get("respuesta", "").strip()
            )
            print(f"- {path}: filas con trazas de contacto a resetear={touched}")
        print("- CSVs operativos: maestro fresh launch, enviados/declaracion/disculpa en blanco")
        return 0

    OPERACION_DIR.mkdir(parents=True, exist_ok=True)
    backup_dir = None if args.no_backup else backup_files(all_files, "fresh-launch-reset")

    source_counts = {str(path): reset_source_csv(path) for path in source_files}
    operation_counts = build_fresh_operational_files()

    print("Operacion email reiniciada como fresh launch.")
    if backup_dir:
        print(f"Backup previo: {backup_dir}")
    for path, count in source_counts.items():
        print(f"- {path}: filas corregidas={count}")
    print(f"- maestro operativo: {operation_counts['master_rows']} contactos")
    print(f"- candidatos email para ERP: {operation_counts['email_rows']}")
    print(f"- candidatos email wave_1: {operation_counts['wave_1_email_rows']}")
    print("- enviados/declaracion/disculpa: 0 filas")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
