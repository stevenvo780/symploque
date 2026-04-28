import os
import shutil
import subprocess
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover - fallback operativo si Pillow no está instalado
    Image = None


BRAND_NAME = "elenxos"
BRAND_DIR = Path(__file__).resolve().parent
ASSETS_DIR = BRAND_DIR.parent
LOGOS_DIR = BRAND_DIR / "logos"

# Paleta oficial Elenxos + color principal usado en plataforma.
PALETTE = {
    "gold": "#C6A64A",    # Principal / doradito original de plataforma
    "kodama": "#A3E4D7",  # Acento Lógico
    "mask": "#8B0000",    # Rojo Máscara / Vitalidad
    "ash": "#3A3F41",     # Gris Ceniza
    "forest": "#0F2519",  # Verde Bosque
    "white": "#FFFFFF",
    "black": "#000000",
}

BACKGROUNDS = {
    "black": "#050805",
    "white": "#FFFFFF",
}


def get_logo_geometry(color=PALETTE["gold"]):
    """Internal geometry of the Elenxos logo."""
    return f'''
    <!-- Hexágono: El marco analítico -->
    <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" stroke="{color}" stroke-width="1.2" stroke-linejoin="round" opacity="0.4" fill="none"/>
    
    <!-- Triángulo inmerso: La síntesis disciplinar -->
    <polygon points="4.4,11 35.6,11 20,38" stroke="{color}" stroke-width="1" stroke-linejoin="round" opacity="0.6" fill="none"/>
    
    <!-- Topología de red: Sistemas complejos -->
    <path d="M20,20 L20,2 M20,20 L35.6,29 M20,20 L4.4,29" stroke="{color}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
    
    <!-- Nodos: Convergencia epistémica -->
    <circle cx="20" cy="20" r="3.5" fill="{color}" opacity="1"/>
    <circle cx="20" cy="11" r="1.5" fill="{color}" opacity="0.9"/>
    <circle cx="27.8" cy="24.5" r="1.5" fill="{color}" opacity="0.9"/>
    <circle cx="12.2" cy="24.5" r="1.5" fill="{color}" opacity="0.9"/>
'''


def get_svg_logo(color=PALETTE["gold"], size=None, background_color=None):
    """Retorna el isotipo de Elenxos como SVG."""
    dims = f' width="{size}" height="{size}"' if size else ""
    background = f'    <rect width="40" height="40" fill="{background_color}"/>\n' if background_color else ""
    return f'''<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"{dims}>
{background}    {get_logo_geometry(color)}
</svg>'''


def get_svg_lockup(
    background_color=BACKGROUNDS["black"],
    icon_color=PALETTE["gold"],
    text_color=PALETTE["white"],
    width=360,
    height=96,
):
    """Retorna el logo completo: isotipo dorado + wordmark elenxos."""
    background = f'    <rect width="{width}" height="{height}" fill="{background_color}"/>\n' if background_color else ""
    return f'''<svg viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">
{background}    <g transform="translate(24, 20) scale(1.4)">
        {get_logo_geometry(icon_color)}
    </g>
    <text x="96" y="61" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="-0.8" fill="{text_color}">{BRAND_NAME}</text>
</svg>'''


def write_text(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return path


def require_rsvg_convert():
    if not shutil.which("rsvg-convert"):
        raise RuntimeError("Falta rsvg-convert. Instala librsvg para exportar PNG/JPEG.")


def export_png(svg_path, png_path, width, height):
    """Exporta PNG desde SVG."""
    require_rsvg_convert()
    png_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["rsvg-convert", "-w", str(width), "-h", str(height), str(svg_path), "-o", str(png_path)],
        check=True,
    )
    return png_path


def export_jpeg(png_path, jpeg_path, background_color="#FFFFFF"):
    """Convierte PNG a JPEG/JPG, aplanando transparencias porque JPEG no soporta alpha."""
    if Image is None:
        print("⚠️ Pillow no está instalado; se omite JPEG:", jpeg_path)
        return None

    jpeg_path.parent.mkdir(parents=True, exist_ok=True)
    jpg_path = jpeg_path.with_suffix(".jpg")
    image = Image.open(png_path).convert("RGBA")
    background = Image.new("RGBA", image.size, background_color)
    background.alpha_composite(image)
    rgb_image = background.convert("RGB")
    rgb_image.save(jpeg_path, "JPEG", quality=95, optimize=True)
    rgb_image.save(jpg_path, "JPEG", quality=95, optimize=True)
    return jpeg_path


def export_asset(svg_path, base_path, width, height, jpeg_background=None):
    """Exporta PNG y, cuando aplica, JPEG desde un SVG ya escrito."""
    png_path = export_png(svg_path, base_path.with_suffix(".png"), width, height)
    if jpeg_background:
        export_jpeg(png_path, base_path.with_suffix(".jpeg"), jpeg_background)


def remove_path(path):
    if path.is_dir():
        shutil.rmtree(path)
    elif path.exists():
        path.unlink()


def clean_generated_outputs():
    """Limpia salidas antiguas para evitar logos duplicados y archivos sueltos."""
    remove_path(LOGOS_DIR)

    for base_dir in (ASSETS_DIR, BRAND_DIR):
        for loose_file in base_dir.glob("logo_elenxos*"):
            if loose_file.is_file():
                loose_file.unlink()

    for legacy_dir in (BRAND_DIR / "mto" / "kit_logos", BRAND_DIR / "mto" / "variantes"):
        remove_path(legacy_dir)


def write_logo_family(relative_dir, filename, svg_content, width, height, jpeg_background=None):
    target_base = LOGOS_DIR / relative_dir / filename
    svg_path = write_text(target_base.with_suffix(".svg"), svg_content)
    export_asset(svg_path, target_base, width, height, jpeg_background)
    print(f"✅ {target_base.relative_to(BRAND_DIR)}")


def generate_principal_assets():
    """Genera el set principal dorado, ordenado por uso."""
    print("⭐ Generando logo principal dorado ordenado...")

    write_logo_family(
        Path("principal/icono/transparente"),
        "elenxos_icono_dorado",
        get_svg_logo(PALETTE["gold"]),
        1024,
        1024,
    )
    write_logo_family(
        Path("principal/icono/fondo_negro"),
        "elenxos_icono_dorado_fondo_negro",
        get_svg_logo(PALETTE["gold"], background_color=BACKGROUNDS["black"]),
        1024,
        1024,
        BACKGROUNDS["black"],
    )
    write_logo_family(
        Path("principal/icono/fondo_blanco"),
        "elenxos_icono_dorado_fondo_blanco",
        get_svg_logo(PALETTE["gold"], background_color=BACKGROUNDS["white"]),
        1024,
        1024,
        BACKGROUNDS["white"],
    )
    write_logo_family(
        Path("principal/logo_completo/fondo_negro"),
        "elenxos_logo_completo_fondo_negro",
        get_svg_lockup(BACKGROUNDS["black"], PALETTE["gold"], PALETTE["white"]),
        1200,
        320,
        BACKGROUNDS["black"],
    )
    write_logo_family(
        Path("principal/logo_completo/fondo_blanco"),
        "elenxos_logo_completo_fondo_blanco",
        get_svg_lockup(BACKGROUNDS["white"], PALETTE["gold"], PALETTE["forest"]),
        1200,
        320,
        BACKGROUNDS["white"],
    )


def generate_color_variants():
    """Genera variantes cromáticas del isotipo sin ensuciar la raíz de brand."""
    print("🎨 Generando variantes cromáticas del icono...")
    for name, color in PALETTE.items():
        write_logo_family(
            Path("variantes/icono") / name,
            f"elenxos_icono_{name}",
            get_svg_logo(color),
            512,
            512,
        )


def write_index():
    index = """# Logos Elenxos

Salida oficial generada por `assets/brand/generate_logo.py`.

## Estructura

- `principal/icono/transparente/`: isotipo dorado en SVG/PNG con fondo transparente.
- `principal/icono/fondo_negro/`: isotipo dorado en SVG/PNG/JPEG/JPG sobre negro.
- `principal/icono/fondo_blanco/`: isotipo dorado en SVG/PNG/JPEG/JPG sobre blanco.
- `principal/logo_completo/fondo_negro/`: isotipo + wordmark en SVG/PNG/JPEG/JPG sobre negro.
- `principal/logo_completo/fondo_blanco/`: isotipo + wordmark en SVG/PNG/JPEG/JPG sobre blanco.
- `variantes/icono/`: variaciones cromáticas del isotipo.
- `kit_completo/`: kit extendido generado por `mto/generate_kit.py`.
- `variantes/decorativas/`: piezas decorativas generadas por `mto/generate_variants.py`.

## Nota sobre JPEG

JPEG/JPG no soporta transparencia. Por eso los JPEG/JPG oficiales están en las carpetas `fondo_negro` y `fondo_blanco`.
"""
    write_text(LOGOS_DIR / "README.md", index)


def main():
    clean_generated_outputs()
    generate_principal_assets()
    generate_color_variants()
    write_index()
    print(f"\n✅ Logos ordenados en: {LOGOS_DIR}")


if __name__ == "__main__":
    main()