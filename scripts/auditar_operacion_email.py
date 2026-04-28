#!/usr/bin/env python3
"""
Auditoria local de la operacion email.

No envia correos ni modifica datos. Sirve como gate antes de cualquier lote real:
- valida estructura minima de CSVs operativos
- detecta emails invalidos y duplicados
- cruza historico, enviados y declaracion
- devuelve codigo no-cero con --fail-on-blockers si hay bloqueadores
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
import json
from pathlib import Path
import re
from typing import Iterable

from enviar_lote_primer_contacto import markdown_to_email_html, markdown_to_plain_text
from preparar_lote_primer_contacto import read_template, render_body


REPO_DIR = Path(__file__).resolve().parents[1]
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

FILES = {
    "legacy_master": REPO_DIR / "05-datos-y-reportes" / "leads-agora-maestro.csv",
    "top_50": REPO_DIR / "05-datos-y-reportes" / "leads-agora-top-50-hoy.csv",
    "master_operativo": REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "contactos-maestro-operativo.csv",
    "enviados": REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "correos-enviados-importar.csv",
    "declaracion": REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "declaracion-pendientes.csv",
    "disculpa": REPO_DIR / "05-datos-y-reportes" / "operacion-email" / "disculpa-error-pendientes.csv",
}

MESSAGE_FILES = {
    "template_disculpa": REPO_DIR / "04-mensajeria-email" / "01-disculpa-repetidos.md",
    "template_estandar": REPO_DIR / "04-mensajeria-email" / "02-primer-contacto-estandar.md",
    "template_semilleros": REPO_DIR / "04-mensajeria-email" / "03-primer-contacto-semilleros.md",
    "template_directores": REPO_DIR / "04-mensajeria-email" / "04-primer-contacto-directores.md",
    "template_seguimiento": REPO_DIR / "04-mensajeria-email" / "05-seguimiento-corto.md",
    "template_declaracion": REPO_DIR / "04-mensajeria-email" / "06-correo-declaracion.md",
    "review_wave_1": REPO_DIR / "04-mensajeria-email" / "lote-primer-contacto-wave-1-revision.md",
}

UDEA_RE = re.compile(r"\b(UdeA|Universidad de Antioquia)\b", re.IGNORECASE)
SOCIAL_LINK_RE = re.compile(r"linkedin|instagram|twitter|x\.com|s[ií]guenos", re.IGNORECASE)
DUPLICATE_AGORA_CTA_RE = re.compile(r"👉.*agora\.elenxos\.com", re.IGNORECASE)
OFFICIAL_URLS = ("https://www.elenxos.com/", "https://agora.elenxos.com/")

REQUIRED_HEADERS = {
    "legacy_master": {"priority_rank", "contact_name", "contact_type", "contact_value", "estado", "fecha_ultimo_contacto"},
    "top_50": {"priority_rank", "contact_name", "contact_type", "contact_value", "estado", "fecha_ultimo_contacto"},
    "master_operativo": {
        "contact_id",
        "contact_channel",
        "contact_value",
        "status",
        "declaration_required",
        "declaration_status",
        "erp_doctype",
        "erp_lead_id",
        "erp_sync_status",
        "erp_synced_at",
        "erp_sync_notes",
    },
    "enviados": {"source_id", "email", "sent_at", "last_sender_email", "declaration_required", "declaration_status"},
    "declaracion": {"contact_id", "email", "last_contact_date", "ready_to_send", "send_status"},
    "disculpa": {"email", "contact_name", "subject", "body_variant", "duplicate_count"},
}

VALID_ERP_SYNC_STATUSES = {"pending", "ready_for_import", "synced", "synced_existing", "failed"}


@dataclass(frozen=True)
class CsvData:
    name: str
    path: Path
    headers: list[str]
    rows: list[dict[str, str]]


@dataclass(frozen=True)
class Issue:
    severity: str
    scope: str
    message: str


@dataclass(frozen=True)
class Check:
    scope: str
    message: str


@dataclass
class AuditReport:
    files: dict[str, CsvData]
    issues: list[Issue]
    checks: list[Check]

    @property
    def blockers(self) -> list[Issue]:
        return [issue for issue in self.issues if issue.severity == "blocker"]

    @property
    def warnings(self) -> list[Issue]:
        return [issue for issue in self.issues if issue.severity == "warning"]


def normalize(value: str) -> str:
    return (value or "").strip()


def normalize_email(value: str) -> str:
    return normalize(value).lower()


def is_email(value: str) -> bool:
    return bool(EMAIL_RE.match(value))


def read_csv(name: str, path: Path) -> CsvData:
    if not path.exists():
        return CsvData(name=name, path=path, headers=[], rows=[])

    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        headers = list(reader.fieldnames or [])
        rows = [{key: normalize(value) for key, value in row.items() if key is not None} for row in reader]
    return CsvData(name=name, path=path, headers=headers, rows=rows)


def email_for_dataset(name: str, row: dict[str, str]) -> str:
    if name in {"legacy_master", "top_50"}:
        if normalize(row.get("contact_type", "")).lower() != "email":
            return ""
        return normalize_email(row.get("contact_value", ""))
    if name == "master_operativo":
        if normalize(row.get("contact_channel", "")).lower() != "email":
            return ""
        return normalize_email(row.get("contact_value", ""))
    return normalize_email(row.get("email", ""))


def find_duplicates(values: Iterable[tuple[str, int]]) -> dict[str, list[int]]:
    found: dict[str, list[int]] = {}
    for value, line in values:
        if not value:
            continue
        found.setdefault(value, []).append(line)
    return {value: lines for value, lines in found.items() if len(lines) > 1}


def add_structure_issues(report: AuditReport) -> None:
    for name, expected_headers in REQUIRED_HEADERS.items():
        data = report.files[name]
        if not data.path.exists():
            severity = "warning" if name == "disculpa" else "blocker"
            report.issues.append(Issue(severity, name, f"No existe {data.path}"))
            continue

        missing = sorted(expected_headers - set(data.headers))
        if missing:
            report.issues.append(Issue("blocker", name, f"Faltan columnas: {', '.join(missing)}"))


def add_email_quality_issues(report: AuditReport) -> None:
    for name, data in report.files.items():
        if not data.path.exists():
            continue

        email_lines: list[tuple[str, int]] = []
        empty_email_rows = 0
        for index, row in enumerate(data.rows, start=2):
            email = email_for_dataset(name, row)
            if not email:
                if name in {"enviados", "declaracion", "disculpa"}:
                    empty_email_rows += 1
                continue
            email_lines.append((email, index))
            if not is_email(email):
                report.issues.append(Issue("blocker", name, f"Email invalido en linea {index}: {email}"))

        for email, lines in find_duplicates(email_lines).items():
            report.issues.append(Issue("blocker", name, f"Email duplicado {email} en lineas {', '.join(map(str, lines))}"))

        if empty_email_rows:
            report.issues.append(Issue("blocker", name, f"Filas sin email: {empty_email_rows}"))


def add_cross_dataset_issues(report: AuditReport) -> None:
    legacy = report.files["legacy_master"].rows
    enviados = report.files["enviados"].rows
    declaracion = report.files["declaracion"].rows
    master_operativo = report.files["master_operativo"].rows

    sent_by_id = {normalize(row.get("source_id", "")): row for row in enviados if normalize(row.get("source_id", ""))}
    sent_ids = set(sent_by_id)
    declaration_ids = {normalize(row.get("contact_id", "")) for row in declaracion if normalize(row.get("contact_id", ""))}
    operativo_ids = {normalize(row.get("contact_id", "")) for row in master_operativo if normalize(row.get("contact_id", ""))}

    for row in legacy:
        rank = normalize(row.get("priority_rank", ""))
        contact_id = f"agora-legacy-{rank.zfill(3) if rank else '000'}"
        contacted = normalize(row.get("estado", "")).lower() == "contactado"
        if contacted:
            if not normalize(row.get("fecha_ultimo_contacto", "")):
                report.issues.append(Issue("warning", "legacy_master", f"{contact_id} marcado contactado sin fecha_ultimo_contacto"))
            if contact_id not in sent_ids:
                report.issues.append(Issue("blocker", "enviados", f"{contact_id} contactado en historico pero ausente en correos-enviados-importar.csv"))
            sent_row = sent_by_id.get(contact_id, {})
            declaration_required = normalize(sent_row.get("declaration_required", "")).lower()
            if declaration_required == "yes" and contact_id not in declaration_ids:
                report.issues.append(Issue("blocker", "declaracion", f"{contact_id} contactado en historico pero ausente en declaracion-pendientes.csv"))
            elif not sent_row and contact_id not in declaration_ids:
                report.issues.append(Issue("blocker", "declaracion", f"{contact_id} contactado en historico sin envio reconciliado ni declaracion"))

    for row in declaracion:
        contact_id = normalize(row.get("contact_id", ""))
        ready = normalize(row.get("ready_to_send", "")).lower()
        status = normalize(row.get("send_status", "")).lower()
        if contact_id and contact_id not in operativo_ids:
            report.issues.append(Issue("blocker", "declaracion", f"{contact_id} no existe en contactos-maestro-operativo.csv"))
        if ready == "yes" and status in {"pending_reconciliation", "", "pending"}:
            report.issues.append(Issue("warning", "declaracion", f"{contact_id} esta ready_to_send=yes pero send_status={status or 'vacio'}"))

    sent_emails = {
        normalize_email(row.get("email", ""))
        for row in enviados
        if normalize_email(row.get("email", "")) and normalize(row.get("declaration_required", "")).lower() == "yes"
    }
    declaration_emails = {normalize_email(row.get("email", "")) for row in declaracion if normalize_email(row.get("email", ""))}
    missing_declaration_emails = sorted(sent_emails - declaration_emails)
    if missing_declaration_emails:
        report.issues.append(
            Issue(
                "blocker",
                "declaracion",
                f"Emails enviados con declaracion requerida sin fila de declaracion: {', '.join(missing_declaration_emails[:10])}",
            )
        )


def add_erp_sync_issues(report: AuditReport) -> None:
    data = report.files["master_operativo"]
    if not data.path.exists():
        return

    for index, row in enumerate(data.rows, start=2):
        sync_status = normalize(row.get("erp_sync_status", "")).lower()
        doctype = normalize(row.get("erp_doctype", ""))
        lead_id = normalize(row.get("erp_lead_id", ""))

        if sync_status and sync_status not in VALID_ERP_SYNC_STATUSES:
            report.issues.append(Issue("blocker", "master_operativo", f"erp_sync_status invalido en linea {index}: {sync_status}"))

        if sync_status in {"synced", "synced_existing"} and not lead_id:
            report.issues.append(Issue("warning", "master_operativo", f"Linea {index} marcada {sync_status} sin erp_lead_id"))

        if sync_status in {"ready_for_import", "synced", "synced_existing"} and doctype != "Lead":
            report.issues.append(Issue("warning", "master_operativo", f"Linea {index} lista para ERP con erp_doctype={doctype or 'vacio'}"))


def add_message_content_checks(report: AuditReport) -> None:
    template_names = ["template_estandar", "template_semilleros", "template_directores"]
    missing_udea: list[str] = []
    missing_official_urls: list[str] = []
    social_mentions: list[str] = []
    duplicate_agora_ctas: list[str] = []

    for name in template_names:
        path = MESSAGE_FILES[name]
        if not path.exists():
            report.issues.append(Issue("blocker", "mensajeria", f"No existe {path}"))
            continue

        content = path.read_text(encoding="utf-8")
        if not UDEA_RE.search(content):
            missing_udea.append(name)
        if not all(url in content for url in OFFICIAL_URLS):
            missing_official_urls.append(name)
        if SOCIAL_LINK_RE.search(content):
            social_mentions.append(name)
        if DUPLICATE_AGORA_CTA_RE.search(content):
            duplicate_agora_ctas.append(name)

    if missing_udea:
        report.issues.append(
            Issue("blocker", "mensajeria", f"Plantillas sin mencion UdeA/Universidad de Antioquia: {', '.join(missing_udea)}")
        )
    else:
        report.checks.append(Check("mensajeria", "Plantillas de primer contacto mencionan procedencia UdeA/Universidad de Antioquia: 3/3"))

    if missing_official_urls:
        report.issues.append(
            Issue("blocker", "mensajeria", f"Plantillas sin ambos sitios oficiales Elenxos/Agora: {', '.join(missing_official_urls)}")
        )
    else:
        report.checks.append(Check("mensajeria", "Plantillas incluyen solo sitios oficiales requeridos: www.elenxos.com y agora.elenxos.com"))

    if social_mentions:
        report.issues.append(Issue("blocker", "mensajeria", f"Plantillas con referencias a redes sociales: {', '.join(social_mentions)}"))
    else:
        report.checks.append(Check("mensajeria", "Plantillas de correo sin enlaces ni llamados a redes sociales"))

    if duplicate_agora_ctas:
        report.issues.append(Issue("blocker", "mensajeria", f"Plantillas con CTA duplicado de Agora: {', '.join(duplicate_agora_ctas)}"))
    else:
        report.checks.append(Check("mensajeria", "Plantillas sin CTA duplicado de Agora"))

    review_paths = sorted((REPO_DIR / "04-mensajeria-email").glob("lote-primer-contacto-wave-*-revision.md"))
    reviewed_ok = 0
    for review_path in review_paths:
        review = review_path.read_text(encoding="utf-8")
        review_name = review_path.name
        if not UDEA_RE.search(review):
            report.issues.append(Issue("blocker", "mensajeria", f"{review_name} no contiene mencion UdeA/Universidad de Antioquia"))
        if SOCIAL_LINK_RE.search(review):
            report.issues.append(Issue("blocker", "mensajeria", f"{review_name} contiene referencias a redes sociales"))
        if DUPLICATE_AGORA_CTA_RE.search(review):
            report.issues.append(Issue("blocker", "mensajeria", f"{review_name} contiene CTA duplicado de Agora"))
        if UDEA_RE.search(review) and not SOCIAL_LINK_RE.search(review) and not DUPLICATE_AGORA_CTA_RE.search(review):
            reviewed_ok += 1
    if review_paths and reviewed_ok == len(review_paths):
        report.checks.append(Check("mensajeria", f"Revisiones de lote validas para UdeA/sin redes/sin CTA duplicado: {reviewed_ok}/{len(review_paths)}"))

    sample_row = {
        "contact_name": "Contacto Prueba",
        "institution": "UdeA",
        "organization": "UdeA",
        "role_or_unit": "unidad academica",
        "asunto_del_correo_anterior": "Correo anterior",
    }
    render_names = [
        "template_disculpa",
        "template_estandar",
        "template_semilleros",
        "template_directores",
        "template_seguimiento",
        "template_declaracion",
    ]
    render_failures: list[str] = []
    for name in render_names:
        path = MESSAGE_FILES[name]
        if not path.exists():
            continue
        _, body_template = read_template(path)
        markdown_body = render_body(body_template, sample_row)
        plain = markdown_to_plain_text(markdown_body)
        html = markdown_to_email_html(markdown_body)
        if any(token in plain for token in ["**", "]("]) or any(token in html for token in ["**", "]("]) or "<a href=" not in html:
            render_failures.append(name)
    if render_failures:
        report.issues.append(Issue("blocker", "mensajeria", f"Render Markdown->email falla en: {', '.join(render_failures)}"))
    else:
        report.checks.append(Check("mensajeria", f"Render Markdown a text/plain + text/html sin Markdown crudo: {len(render_names)}/{len(render_names)}"))


def audit() -> AuditReport:
    files = {name: read_csv(name, path) for name, path in FILES.items()}
    report = AuditReport(files=files, issues=[], checks=[])
    add_structure_issues(report)
    add_email_quality_issues(report)
    add_cross_dataset_issues(report)
    add_erp_sync_issues(report)
    add_message_content_checks(report)
    return report


def as_json(report: AuditReport) -> str:
    return json.dumps(
        {
            "files": {
                name: {"path": str(data.path), "exists": data.path.exists(), "rows": len(data.rows), "headers": data.headers}
                for name, data in report.files.items()
            },
            "issues": [issue.__dict__ for issue in report.issues],
            "checks": [check.__dict__ for check in report.checks],
            "summary": {"blockers": len(report.blockers), "warnings": len(report.warnings)},
        },
        ensure_ascii=False,
        indent=2,
    )


def print_text(report: AuditReport) -> None:
    print("Auditoria de operacion email")
    print("================================")
    print("\nArchivos:")
    for name, data in report.files.items():
        exists = "OK" if data.path.exists() else "MISSING"
        print(f"- {name}: {exists} rows={len(data.rows)} path={data.path}")

    print(f"\nResumen: blockers={len(report.blockers)} warnings={len(report.warnings)}")
    if report.checks:
        print("\nChecks confirmados:")
        for check in report.checks:
            print(f"- [{check.scope}] {check.message}")

    for severity in ("blocker", "warning"):
        selected = [issue for issue in report.issues if issue.severity == severity]
        if not selected:
            continue
        print(f"\n{severity.upper()}S:")
        for issue in selected:
            print(f"- [{issue.scope}] {issue.message}")

    if not report.issues:
        print("\nSin hallazgos.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Audita CSVs de la operacion email sin modificar datos.")
    parser.add_argument("--format", choices={"text", "json"}, default="text", help="Formato de salida.")
    parser.add_argument("--fail-on-blockers", action="store_true", help="Devuelve codigo 1 si hay bloqueadores.")
    args = parser.parse_args()

    report = audit()
    if args.format == "json":
        print(as_json(report))
    else:
        print_text(report)

    if args.fail_on_blockers and report.blockers:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
