#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
design_root="$repo_root/elenxos_design_system"
skip_video=0
reuse_ai=0
legacy_like=0

print_help() {
  cat <<'EOF'
Uso:
  ./scripts/generar_campana.sh
  ./scripts/generar_campana.sh --skip-video
  ./scripts/generar_campana.sh --reuse-ai
  ./scripts/generar_campana.sh --seed 12345
  ./scripts/generar_campana.sh --narrativa dolor
  ./scripts/generar_campana.sh --lote 1
  ./scripts/generar_campana.sh --tipo post
  ./scripts/generar_campana.sh --legacy --lote 1
  ./scripts/generar_campana.sh --video-duration 6
  ./scripts/generar_campana.sh --output /ruta/de/salida

Sin argumentos genera 3 campañas oficiales en:
  assets/entregables/campanas/

En ese modo, el pipeline ahora:
  - genera fondos NUEVOS con IA local por campaña
  - varía templates compatibles por narrativa
  - guarda trazas en prompts_ai.json y con_ia/fuentes_ai/

Si quieres reutilizar la librería AI ya sincronizada en vez de generar fondos nuevos:
  ./scripts/generar_campana.sh --reuse-ai

Cada campaña sale como:
  campana_0_dolor/
  campana_1_solucion/
  campana_2_ecosistema/

Cada una contiene:
  con_ia/ y sin_ia/
  publicaciones/, flyers/, reels/, stories/, banners/

Con filtros (--narrativa / --lote / --tipo o --legacy) genera selecciones puntuales en:
  assets/entregables/campanas/selecciones/

Ejemplos:
  ./scripts/generar_campana.sh
  ./scripts/generar_campana.sh --skip-video
  ./scripts/generar_campana.sh --reuse-ai
  ./scripts/generar_campana.sh --seed 12345
  ./scripts/generar_campana.sh --narrativa dolor
  ./scripts/generar_campana.sh --legacy --lote 1
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Falta dependencia requerida: $1" >&2
    exit 1
  fi
}

for arg in "$@"; do
  case "$arg" in
    --help|-h)
      print_help
      exit 0
      ;;
    --skip-video)
      skip_video=1
      ;;
    --reuse-ai|--skip-ai-generation)
      reuse_ai=1
      ;;
    --legacy|--narrativa|--lote|--tipo)
      legacy_like=1
      ;;
  esac
done

if [[ ! -d "$design_root" ]]; then
  echo "No existe el renderer esperado en: $design_root" >&2
  exit 1
fi

require_cmd npm

if [[ "$reuse_ai" -eq 0 && "$legacy_like" -eq 0 ]]; then
  require_cmd python3
fi

if [[ "$skip_video" -eq 0 ]]; then
  require_cmd ffmpeg
fi

if [[ ! -d "$design_root/node_modules" ]]; then
  npm --prefix "$design_root" ci
fi

npm --prefix "$design_root" exec playwright install chromium
npm --prefix "$design_root" run campaign -- "$@"
