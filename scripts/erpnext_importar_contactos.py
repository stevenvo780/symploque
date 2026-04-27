#!/usr/bin/env python3
"""Exporta o importa contactos operativos como Leads de ERPNext.

Por defecto no escribe en el ERP. Genera una vista previa o un CSV compatible
con Data Import. Para crear Leads via REST usa `--push` con estas variables:

- ERPNEXT_BASE_URL=https://crm.proxy.humanizar-dev.cloud
- ERPNEXT_API_KEY=...
- ERPNEXT_API_SECRET=...

Tambien acepta login por sesion:

- ERPNEXT_USERNAME=admin@elenxos.com
- ERPNEXT_PASSWORD=...
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from datetime import datetime
from http.cookiejar import CookieJar
import json
import os
from pathlib import Path
import re
import sys
from urllib import error, parse, request


REPO_DIR = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "contactos-maestro-operativo.csv"
DEFAULT_EXPORT = REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "erp-leads-wave-1.csv"
DEFAULT_ENV_FILE = REPO_DIR / ".env"
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

ERP_EXPORT_HEADERS = [
    "ID",
    "Lead Name",
    "Organization Name",
    "Email Id",
    "Status",
    "Website",
    "Notes",
]

SYNC_FIELDS = ["erp_lead_id", "erp_sync_status", "erp_synced_at", "erp_sync_notes"]


@dataclass(frozen=True)
class PushResult:
    contact_id: str
    email: str
    status: str
    lead_id: str
    detail: str


@dataclass
class FrappeClient:
    base_url: str
    timeout: float
    auth_header: str = ""
    opener: request.OpenerDirector | None = None


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def is_email(value: str) -> bool:
    return bool(EMAIL_RE.match(value))


def rank_key(row: dict[str, str]) -> tuple[int, str]:
    raw = normalize(row.get("legacy_priority_rank", ""))
    try:
        return int(raw), normalize(row.get("contact_id", ""))
    except ValueError:
        return 999_999, normalize(row.get("contact_id", ""))


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


def read_contacts(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        headers = list(reader.fieldnames or [])
        rows = [{key: normalize(value) for key, value in row.items() if key is not None} for row in reader]
    missing = [field for field in SYNC_FIELDS if field not in headers]
    if missing:
        raise ValueError(f"El CSV operativo no tiene campos ERP: {', '.join(missing)}. Corre el bootstrap fresh launch.")
    return headers, rows


def write_contacts(path: Path, headers: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)


def select_candidates(
    rows: list[dict[str, str]],
    wave: str,
    limit: int | None,
    min_rank: int | None,
    max_rank: int | None,
    include_synced: bool,
) -> list[dict[str, str]]:
    selected: list[dict[str, str]] = []
    seen_emails: set[str] = set()

    for row in sorted(rows, key=rank_key):
        contact_id = normalize(row.get("contact_id", ""))
        email = normalize_email(row.get("contact_value", ""))
        sync_status = normalize(row.get("erp_sync_status", "")).lower()
        rank, _ = rank_key(row)

        if row.get("contact_channel", "").lower() != "email":
            continue
        if not is_email(email):
            continue
        if wave and normalize(row.get("launch_wave", "")) != wave:
            continue
        if min_rank is not None and rank < min_rank:
            continue
        if max_rank is not None and rank > max_rank:
            continue
        if not include_synced and sync_status in {"synced", "synced_existing"}:
            continue
        if email in seen_emails:
            continue
        if normalize(row.get("status", "")).startswith("do_not_contact"):
            continue

        row = dict(row)
        row["contact_value"] = email
        row["_contact_id"] = contact_id
        selected.append(row)
        seen_emails.add(email)
        if limit is not None and len(selected) >= limit:
            break

    return selected


def build_notes(row: dict[str, str]) -> str:
    parts = [
        f"Origen local: {row.get('contact_id', '')}",
        f"Rank: {row.get('legacy_priority_rank', '')}",
        f"Segmento: {row.get('segment', '')}",
        f"Rol/unidad: {row.get('role_or_unit', '')}",
        f"Ciudad: {row.get('city', '')}",
        f"Fuente: {row.get('source_url', '')}",
        "Estado outreach: no contactado; guardar en ERP antes del primer correo.",
    ]
    return "\n".join(part for part in parts if part and not part.endswith(": "))


def truncate_detail(value: str, max_len: int = 500) -> str:
    value = (value or "").replace("\n", " ").strip()
    if len(value) <= max_len:
        return value
    return f"{value[:max_len]}..."


def to_erp_export_row(row: dict[str, str]) -> dict[str, str]:
    return {
        "ID": "",
        "Lead Name": row.get("contact_name", "") or row.get("organization", "") or row.get("contact_value", ""),
        "Organization Name": row.get("organization", "") or row.get("institution", ""),
        "Email Id": row.get("contact_value", ""),
        "Status": "Lead",
        "Website": row.get("domain_objetivo", ""),
        "Notes": build_notes(row),
    }


def write_export(path: Path, rows: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=ERP_EXPORT_HEADERS)
        writer.writeheader()
        writer.writerows(to_erp_export_row(row) for row in rows)


def api_request(
    client: FrappeClient,
    method: str,
    path: str,
    params: dict[str, str] | None = None,
    payload: dict[str, str] | None = None,
) -> dict:
    url = f"{client.base_url.rstrip('/')}{path}"
    if params:
        url = f"{url}?{parse.urlencode(params)}"
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    if client.auth_header:
        headers["Authorization"] = client.auth_header
    req = request.Request(
        url,
        data=data,
        method=method,
        headers=headers,
    )
    try:
        opener = client.opener or request.build_opener()
        with opener.open(req, timeout=client.timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")
        raise RuntimeError(f"HTTP {exc.code}: {detail}") from exc


def login_client(base_url: str, username: str, password: str, timeout: float) -> FrappeClient:
    cookie_jar = CookieJar()
    opener = request.build_opener(request.HTTPCookieProcessor(cookie_jar))
    client = FrappeClient(base_url=base_url, timeout=timeout, opener=opener)
    response = api_request(
        client,
        "POST",
        "/api/method/login",
        payload={"usr": username, "pwd": password},
    )
    if response.get("message") != "Logged In":
        raise RuntimeError(f"Login ERPNext no confirmado: {response}")
    return client


def build_client(timeout: float) -> FrappeClient:
    base_url = os.environ.get("ERPNEXT_BASE_URL") or os.environ.get("FRAPPE_BASE_URL")
    api_key = os.environ.get("ERPNEXT_API_KEY") or os.environ.get("FRAPPE_API_KEY")
    api_secret = os.environ.get("ERPNEXT_API_SECRET") or os.environ.get("FRAPPE_API_SECRET")
    username = os.environ.get("ERPNEXT_USERNAME") or os.environ.get("FRAPPE_USERNAME")
    password = os.environ.get("ERPNEXT_PASSWORD") or os.environ.get("FRAPPE_PASSWORD")

    if not base_url:
        raise RuntimeError("Falta ERPNEXT_BASE_URL o FRAPPE_BASE_URL")

    if api_key and api_secret:
        return FrappeClient(base_url=base_url, timeout=timeout, auth_header=f"token {api_key}:{api_secret}")

    if username and password:
        return login_client(base_url, username, password, timeout)

    raise RuntimeError(
        "Faltan credenciales ERPNext: use ERPNEXT_API_KEY/ERPNEXT_API_SECRET "
        "o ERPNEXT_USERNAME/ERPNEXT_PASSWORD"
    )


def find_existing_lead(client: FrappeClient, email: str) -> str:
    response = api_request(
        client,
        "GET",
        "/api/resource/Lead",
        params={
            "fields": json.dumps(["name", "lead_name", "email_id"]),
            "filters": json.dumps([["Lead", "email_id", "=", email]]),
            "limit_page_length": "1",
        },
    )
    data = response.get("data") or []
    if not data:
        return ""
    return normalize(data[0].get("name", ""))


def create_lead(client: FrappeClient, row: dict[str, str]) -> str:
    payload = {
        "doctype": "Lead",
        "lead_name": row.get("contact_name", "") or row.get("organization", "") or row.get("contact_value", ""),
        "organization": row.get("organization", "") or row.get("institution", ""),
        "email_id": row.get("contact_value", ""),
        "status": "Lead",
        "website": row.get("domain_objetivo", ""),
    }
    response = api_request(client, "POST", "/api/resource/Lead", payload=payload)
    return normalize((response.get("data") or {}).get("name", ""))


def push_to_erp(rows: list[dict[str, str]], timeout: float) -> list[PushResult]:
    client = build_client(timeout)
    results: list[PushResult] = []
    for row in rows:
        contact_id = row.get("contact_id", "")
        email = row.get("contact_value", "")
        try:
            existing = find_existing_lead(client, email)
            if existing:
                results.append(PushResult(contact_id, email, "synced_existing", existing, "Ya existia en ERPNext"))
                continue
            lead_id = create_lead(client, row)
            results.append(PushResult(contact_id, email, "synced", lead_id, "Creado en ERPNext"))
        except Exception as exc:  # noqa: BLE001
            results.append(PushResult(contact_id, email, "failed", "", str(exc)))
    return results


def mark_rows(
    rows: list[dict[str, str]],
    candidates: list[dict[str, str]],
    status: str,
    note: str,
    results: list[PushResult] | None = None,
) -> None:
    now = datetime.now().isoformat(timespec="seconds")
    by_id = {row.get("contact_id", ""): row for row in rows}
    results_by_id = {result.contact_id: result for result in results or []}
    for candidate in candidates:
        contact_id = candidate.get("contact_id", "")
        row = by_id.get(contact_id)
        if row is None:
            continue
        result = results_by_id.get(contact_id)
        if result:
            row["erp_lead_id"] = result.lead_id
            row["erp_sync_status"] = result.status
            row["erp_sync_notes"] = truncate_detail(result.detail)
            row["erp_synced_at"] = now if result.status in {"synced", "synced_existing"} else ""
        else:
            row["erp_sync_status"] = status
            row["erp_sync_notes"] = truncate_detail(note)
            row["erp_synced_at"] = now if status in {"synced", "synced_existing"} else ""


def print_preview(rows: list[dict[str, str]], limit: int = 10) -> None:
    print(f"Candidatos ERP seleccionados: {len(rows)}")
    for row in rows[:limit]:
        print(
            f"- {row.get('contact_id')} | rank {row.get('legacy_priority_rank')} | "
            f"{row.get('contact_name')} <{row.get('contact_value')}> | {row.get('organization')}"
        )
    if len(rows) > limit:
        print(f"... {len(rows) - limit} mas")


def main() -> int:
    parser = argparse.ArgumentParser(description="Exporta/importa contactos operativos como Leads de ERPNext.")
    parser.add_argument("--source", default=str(DEFAULT_SOURCE), help="CSV maestro operativo.")
    parser.add_argument("--wave", default="wave_1", help="Ola a procesar. Vacio para todas.")
    parser.add_argument("--limit", type=int, help="Limita la cantidad de contactos.")
    parser.add_argument("--min-rank", type=int, help="Rank minimo incluido.")
    parser.add_argument("--max-rank", type=int, help="Rank maximo incluido.")
    parser.add_argument("--include-synced", action="store_true", help="Incluye filas ya sincronizadas.")
    parser.add_argument("--export-csv", nargs="?", const=str(DEFAULT_EXPORT), help="Escribe CSV para Data Import de ERPNext.")
    parser.add_argument("--mark-ready", action="store_true", help="Marca candidatos como ready_for_import en el CSV operativo.")
    parser.add_argument("--push", action="store_true", help="Crea Leads reales via API REST de ERPNext.")
    parser.add_argument("--yes", action="store_true", help="Omite confirmacion interactiva para --push.")
    parser.add_argument("--no-update-source", action="store_true", help="No escribe el resultado de --push/--mark-ready en el CSV fuente.")
    parser.add_argument("--env-file", default=str(DEFAULT_ENV_FILE), help="Archivo .env local opcional.")
    parser.add_argument("--timeout", type=float, default=30.0, help="Timeout HTTP por request.")
    args = parser.parse_args()

    if args.limit is not None and args.limit < 1:
        print("--limit debe ser mayor que cero", file=sys.stderr)
        return 2

    load_env_file(Path(args.env_file))
    source = Path(args.source)
    headers, rows = read_contacts(source)
    candidates = select_candidates(
        rows,
        wave=args.wave,
        limit=args.limit,
        min_rank=args.min_rank,
        max_rank=args.max_rank,
        include_synced=args.include_synced,
    )

    print_preview(candidates)

    if args.export_csv:
        export_path = Path(args.export_csv)
        write_export(export_path, candidates)
        print(f"CSV ERPNext escrito: {export_path}")
        if args.mark_ready and not args.no_update_source:
            mark_rows(rows, candidates, "ready_for_import", f"Exportado a {export_path}")
            write_contacts(source, headers, rows)
            print(f"CSV operativo actualizado: {source}")

    if args.push:
        if not args.yes:
            confirm = input(f"Se crearan/sincronizaran {len(candidates)} Leads en ERPNext. Escribe IMPORTAR para continuar: ")
            if confirm != "IMPORTAR":
                print("Importacion cancelada.")
                return 0
        try:
            results = push_to_erp(candidates, timeout=args.timeout)
        except RuntimeError as exc:
            print(f"ERPNext no disponible para push: {truncate_detail(str(exc))}", file=sys.stderr)
            return 2
        ok = sum(1 for result in results if result.status in {"synced", "synced_existing"})
        failed = len(results) - ok
        for result in results:
            print(f"{result.status.upper()} {result.email} lead={result.lead_id or '-'} detail={truncate_detail(result.detail)}")
        if not args.no_update_source:
            mark_rows(rows, candidates, "synced", "Sincronizado con ERPNext", results=results)
            write_contacts(source, headers, rows)
            print(f"CSV operativo actualizado: {source}")
        print(f"Resumen ERPNext: ok={ok} failed={failed}")
        return 1 if failed else 0

    if not args.export_csv:
        print("Preview solamente. Usa --export-csv para generar import manual o --push para crear Leads.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
