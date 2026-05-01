#!/usr/bin/env python3
"""Registra resultados manuales de canal alterno en los CSV operativos.

No envia mensajes ni toca servicios externos. Lee un CSV de registro manual
y actualiza los maestros solo cuando una fila tiene `attempted_at` y un
`outcome` distinto de `pending`.
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from pathlib import Path


REPO_DIR = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "registro-canal-alterno-2026-04-30.csv"
OPERATIVE_MASTER = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "contactos-maestro-operativo.csv"
LEGACY_MASTER = REPO_DIR / "05-datos-y-reportes" / "leads-agora-maestro.csv"
TOP50_MASTER = REPO_DIR / "05-datos-y-reportes" / "leads-agora-top-50-hoy.csv"


@dataclass(frozen=True)
class ManualResult:
    contact_id: str
    attempted_at: str
    operator: str
    channel: str
    route_used: str
    outcome: str
    new_contact: str
    next_action: str
    notes: str


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        return list(reader.fieldnames or []), list(reader)


def write_csv(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def load_results(path: Path) -> list[ManualResult]:
    _, rows = read_csv(path)
    results: list[ManualResult] = []
    for row in rows:
        outcome = row.get("outcome", "").strip()
        attempted_at = row.get("attempted_at", "").strip()
        if not attempted_at or not outcome or outcome == "pending":
            continue
        results.append(
            ManualResult(
                contact_id=row.get("contact_id", "").strip(),
                attempted_at=attempted_at,
                operator=row.get("operator", "").strip(),
                channel=row.get("channel", "").strip(),
                route_used=row.get("route_used", "").strip(),
                outcome=outcome,
                new_contact=row.get("new_contact", "").strip(),
                next_action=row.get("next_action", "").strip(),
                notes=row.get("notes", "").strip(),
            )
        )
    return [item for item in results if item.contact_id]


def append_note(existing: str, note: str) -> str:
    if note in existing:
        return existing
    return " | ".join(part for part in [existing, note] if part)


def default_next_action(result: ManualResult) -> str:
    if result.next_action:
        return result.next_action
    if result.outcome in {"email_received", "redirect_received"}:
        return "preparar contacto por canal institucional recibido"
    if result.outcome == "human_requested_context":
        return "responder contexto y pedir correo institucional"
    if result.outcome == "retry_later":
        return "reintentar canal alterno"
    if result.outcome == "not_relevant":
        return "descartar o reclasificar"
    return "hacer seguimiento si no responde"


def status_for(result: ManualResult) -> str:
    if result.outcome in {"email_received", "redirect_received"}:
        return "alternate_channel_redirected"
    if result.outcome == "not_relevant":
        return "not_relevant"
    return "alternate_channel_contacted"


def update_operative(rows: list[dict[str, str]], results: dict[str, ManualResult]) -> int:
    changed = 0
    for row in rows:
        result = results.get(row.get("contact_id", ""))
        if not result:
            continue
        row["status"] = status_for(result)
        row["last_contact_date"] = result.attempted_at[:10]
        row["next_action"] = default_next_action(result)
        row["next_action_date"] = ""
        row["reply_status"] = "pending"
        note = (
            f"Canal alterno {result.channel} ejecutado {result.attempted_at}; "
            f"outcome={result.outcome}; route={result.route_used or 'n/a'}; "
            f"new_contact={result.new_contact or 'n/a'}; notes={result.notes or 'n/a'}."
        )
        row["notes"] = append_note(row.get("notes", ""), note)
        changed += 1
    return changed


def update_legacy(rows: list[dict[str, str]], results: dict[str, ManualResult]) -> int:
    changed = 0
    ids_by_rank = {
        result.contact_id.replace("agora-legacy-", "").lstrip("0"): result
        for result in results.values()
    }
    for row in rows:
        result = ids_by_rank.get(row.get("priority_rank", "").strip())
        if not result:
            continue
        row["estado"] = "contactado" if result.outcome != "not_relevant" else "descartado"
        row["fecha_ultimo_contacto"] = result.attempted_at[:10]
        row["proxima_accion"] = default_next_action(result)
        row["fecha_proxima_accion"] = ""
        row["respuesta"] = "pendiente" if result.outcome != "not_relevant" else "no aplica"
        note = (
            f"Canal alterno {result.channel} ejecutado {result.attempted_at}; "
            f"outcome={result.outcome}; new_contact={result.new_contact or 'n/a'}."
        )
        row["notas"] = append_note(row.get("notas", ""), note)
        changed += 1
    return changed


def main() -> int:
    parser = argparse.ArgumentParser(description="Registra resultados manuales de canal alterno.")
    parser.add_argument("--input", default=str(DEFAULT_INPUT), help="CSV de resultados manuales.")
    parser.add_argument("--apply", action="store_true", help="Escribe cambios en los CSV maestros.")
    args = parser.parse_args()

    results = {item.contact_id: item for item in load_results(Path(args.input))}
    print(f"Resultados aplicables: {len(results)}")
    for item in results.values():
        print(f"- {item.contact_id} {item.outcome} {item.channel} {item.new_contact or '-'}")

    op_headers, op_rows = read_csv(OPERATIVE_MASTER)
    legacy_headers, legacy_rows = read_csv(LEGACY_MASTER)
    top_headers, top_rows = read_csv(TOP50_MASTER)

    op_changed = update_operative(op_rows, results)
    legacy_changed = update_legacy(legacy_rows, results)
    top_changed = update_legacy(top_rows, results)

    print(f"Filas a actualizar: operativo={op_changed} legacy={legacy_changed} top50={top_changed}")

    if args.apply:
        write_csv(OPERATIVE_MASTER, op_headers, op_rows)
        write_csv(LEGACY_MASTER, legacy_headers, legacy_rows)
        write_csv(TOP50_MASTER, top_headers, top_rows)
        print("Cambios escritos.")
    else:
        print("Dry-run. Use --apply para escribir cambios.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
