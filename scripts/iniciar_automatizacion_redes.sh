#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
design_root="$repo_root/assets/elenxos_design_system"
logo_root="$repo_root/assets/basic/mto"
output_root="${1:-$design_root/output/redes-sociales-lote-1}"
templates="${2:-lote1_estandar,lote1_flujo,reel_manifiesto,banner_minimal}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Falta dependencia requerida: $1" >&2
    exit 1
  fi
}

require_cmd python3
require_cmd npm

have_rsvg=1
if ! command -v rsvg-convert >/dev/null 2>&1; then
  have_rsvg=0
  echo "Aviso: rsvg-convert no esta disponible; se reutilizara el kit de logos existente." >&2
fi

if [[ ! -d "$design_root/node_modules" ]]; then
  npm --prefix "$design_root" ci
fi

npm --prefix "$design_root" exec playwright install chromium

(
  cd "$logo_root"
  if [[ "$have_rsvg" -eq 1 ]]; then
    python3 generate_kit.py
    python3 generate_variants.py
  else
    echo "Saltando regeneracion raster de logos y variantes." >&2
  fi
)

mkdir -p "$output_root"

npm --prefix "$design_root" run render -- --template "$templates" --output "$output_root"

cat <<EOF
Automatizacion visual completada.
Logos y banners: $logo_root/kit_logos
Variantes: $logo_root/variantes
Renders: $output_root
Templates: $templates
EOF