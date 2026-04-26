#!/usr/bin/env python3
"""
Verificacion local de DNS para salida de correo.

No modifica registros. Usa `dig` si esta disponible y cae a `nslookup`.
Comprueba MX, SPF, DMARC y selectores DKIM comunes o indicados por CLI.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
import shutil
import subprocess
import sys


COMMON_DKIM_SELECTORS = ["default", "google", "selector1", "selector2", "mail", "dkim"]


@dataclass(frozen=True)
class Check:
    name: str
    ok: bool
    detail: str


def run_command(command: list[str]) -> tuple[int, str, str]:
    completed = subprocess.run(command, capture_output=True, text=True, timeout=15, check=False)
    return completed.returncode, completed.stdout.strip(), completed.stderr.strip()


def query_dns(name: str, record_type: str) -> list[str]:
    if shutil.which("dig"):
        code, stdout, stderr = run_command(["dig", "+short", name, record_type])
        if code != 0:
            raise RuntimeError(stderr or f"dig fallo para {name} {record_type}")
        return [line.strip().strip('"') for line in stdout.splitlines() if line.strip()]

    if shutil.which("nslookup"):
        code, stdout, stderr = run_command(["nslookup", f"-type={record_type}", name])
        if code != 0:
            raise RuntimeError(stderr or f"nslookup fallo para {name} {record_type}")
        return [line.strip() for line in stdout.splitlines() if line.strip() and not line.startswith("Server:")]

    raise RuntimeError("No se encontro dig ni nslookup en el sistema")


def flatten_txt(records: list[str]) -> list[str]:
    return [record.replace('" "', "").replace('"', "").strip() for record in records]


def check_mx(domain: str) -> Check:
    records = query_dns(domain, "MX")
    return Check("MX", bool(records), "; ".join(records) if records else "Sin registros MX")


def check_spf(domain: str) -> Check:
    records = flatten_txt(query_dns(domain, "TXT"))
    spf = [record for record in records if record.lower().startswith("v=spf1")]
    return Check("SPF", bool(spf), "; ".join(spf) if spf else "Sin TXT SPF v=spf1")


def check_dmarc(domain: str) -> Check:
    records = flatten_txt(query_dns(f"_dmarc.{domain}", "TXT"))
    dmarc = [record for record in records if record.lower().startswith("v=dmarc1")]
    return Check("DMARC", bool(dmarc), "; ".join(dmarc) if dmarc else "Sin TXT DMARC v=DMARC1")


def check_dkim(domain: str, selectors: list[str]) -> Check:
    found: list[str] = []
    checked: list[str] = []
    for selector in selectors:
        host = f"{selector}._domainkey.{domain}"
        checked.append(host)
        try:
            records = flatten_txt(query_dns(host, "TXT"))
        except RuntimeError:
            continue
        dkim = [record for record in records if "v=dkim1" in record.lower() or "p=" in record.lower()]
        if dkim:
            found.append(f"{host}: {'; '.join(dkim)}")
    if found:
        return Check("DKIM", True, " | ".join(found))
    return Check("DKIM", False, f"No se encontro DKIM en selectores: {', '.join(selectors)}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Verifica DNS minimo de email para un dominio.")
    parser.add_argument("--domain", default="elenxos.com", help="Dominio a validar. Default: elenxos.com")
    parser.add_argument(
        "--dkim-selector",
        action="append",
        dest="dkim_selectors",
        help="Selector DKIM a revisar. Puede repetirse. Si se omite, usa selectores comunes.",
    )
    parser.add_argument("--fail-on-missing", action="store_true", help="Devuelve codigo 1 si falta MX, SPF, DMARC o DKIM.")
    args = parser.parse_args()

    selectors = args.dkim_selectors or COMMON_DKIM_SELECTORS
    try:
        checks = [check_mx(args.domain), check_spf(args.domain), check_dmarc(args.domain), check_dkim(args.domain, selectors)]
    except RuntimeError as exc:
        print(f"ERROR {exc}", file=sys.stderr)
        return 2

    print(f"Verificacion DNS email: {args.domain}")
    missing = 0
    for check in checks:
        status = "OK" if check.ok else "MISSING"
        print(f"- {check.name}: {status} :: {check.detail}")
        if not check.ok:
            missing += 1

    if missing:
        print("\nAccion: corregir registros faltantes antes de enviar lotes corporativos.")
    else:
        print("\nDNS minimo encontrado. Revisar alineacion SPF/DKIM/DMARC con el proveedor real antes de escalar volumen.")

    return 1 if args.fail_on_missing and missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
