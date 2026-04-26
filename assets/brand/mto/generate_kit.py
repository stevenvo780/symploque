import os
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Paleta de colores oficial (Manual de Marca + principal de plataforma)
PALETTE = {
    "gold": "#C6A64A",    # Principal / doradito original de plataforma
    "forest": "#0F2519",  # Primario
    "kodama": "#A3E4D7",  # Acento Lógico
    "mask": "#8B0000",    # Rojo Máscara / Vitalidad
    "ash": "#3A3F41",     # Gris Ceniza
    "white": "#FFFFFF",
    "black": "#000000"
}

BACKGROUNDS = {
    "black": "#050805",
    "white": "#FFFFFF",
}

OUTPUT_DIR = os.path.join(SCRIPT_DIR, "kit_logos")

def get_logo_geometry(color=PALETTE["gold"]):
    """Retorna los elementos internos del logo de Elenxos sin el tag <svg>."""
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
    """Retorna un SVG completo del logo."""
    dims = f'width="{size}" height="{size}"' if size else ""
    background = f'    <rect width="40" height="40" fill="{background_color}"/>\n' if background_color else ""
    return f'''<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {dims}>
{background}    {get_logo_geometry(color)}
</svg>'''

def get_svg_lockup(background_color=BACKGROUNDS["black"], logo_color=PALETTE["gold"], text_color=PALETTE["white"]):
    """Retorna el logo completo: isotipo dorado + wordmark elenxos."""
    return f'''<svg viewBox="0 0 360 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="360" height="96" fill="{background_color}"/>
    <g transform="translate(24, 20) scale(1.4)">
        {get_logo_geometry(logo_color)}
    </g>
    <text x="96" y="61" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="700" letter-spacing="-0.8" fill="{text_color}">elenxos</text>
</svg>'''

def get_svg_banner(bg_color=BACKGROUNDS["black"], logo_color=PALETTE["gold"], text_color="#FFFFFF", title="ELENXOS", subtitle="AGORA · INVESTIGACIÓN COOPERATIVA"):
    """Retorna el contenido SVG de un banner 3:1 optimizado."""
    return f'''<svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
    <!-- Fondo -->
    <rect width="1200" height="400" fill="{bg_color}"/>
    
    <!-- Patrón de fondo sutil (Opcional: Rejilla lógica) -->
    <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="{logo_color}" stroke-width="0.5" opacity="0.05"/>
        </pattern>
    </defs>
    <rect width="1200" height="400" fill="url(#grid)" />

    <!-- Logo: Ahora incrustado directamente como grupo para máxima compatibilidad -->
    <g transform="translate(150, 100) scale(5)">
        {get_logo_geometry(logo_color)}
    </g>
    
    <!-- Composición de Texto -->
    <g transform="translate(420, 185)">
        <text font-family="Playfair Display, serif" font-size="100" fill="{text_color}" font-weight="bold" letter-spacing="2">{title}</text>
        <text y="70" font-family="Inter, sans-serif" font-size="28" fill="{logo_color}" letter-spacing="6" opacity="0.9">{subtitle}</text>
    </g>
    
    <!-- Elemento decorativo: Línea de rigor -->
    <rect x="420" y="210" width="400" height="1" fill="{logo_color}" opacity="0.3"/>
</svg>'''

def run_command(command):
    try:
        subprocess.run(command, check=True, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al ejecutar: {command}\n{e}")

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    # 0. Generar set principal dorado usado en plataforma
    print("⭐ Generando logo principal dorado...")
    principal_assets = {
        "logo_principal": get_svg_logo(PALETTE["gold"]),
        "logo_principal_fondo_negro_icono": get_svg_logo(PALETTE["gold"], background_color=BACKGROUNDS["black"]),
        "logo_principal_fondo_blanco_icono": get_svg_logo(PALETTE["gold"], background_color=BACKGROUNDS["white"]),
        "logo_principal_fondo_negro": get_svg_lockup(BACKGROUNDS["black"], PALETTE["gold"], PALETTE["white"]),
        "logo_principal_fondo_blanco": get_svg_lockup(BACKGROUNDS["white"], PALETTE["gold"], PALETTE["forest"]),
    }
    for name, svg_content in principal_assets.items():
        svg_path = os.path.join(OUTPUT_DIR, f"{name}.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        
    # 1. Generar SVGs de logos
    print("🎨 Generando SVGs de logos...")
    for name, color in PALETTE.items():
        svg_path = os.path.join(OUTPUT_DIR, f"logo_{name}.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(get_svg_logo(color))
            
    # 2. Convertir a PNGs (Varios tamaños)
    sizes = [16, 32, 64, 128, 256, 512, 1024]
    print("🖼️ Generando PNGs y Favicons...")
    for name, color in PALETTE.items():
        svg_path = os.path.join(OUTPUT_DIR, f"logo_{name}.svg")
        for size in sizes:
            prefix = "favicon" if size <= 64 else "logo"
            output_png = os.path.join(OUTPUT_DIR, f"{prefix}_{name}_{size}.png")
            # Forzamos dimensiones en rsvg-convert para asegurar nitidez
            run_command(f"rsvg-convert -w {size} -h {size} {svg_path} -o {output_png}")

    print("🧩 Generando PNGs del set principal...")
    principal_png_sizes = {
        "logo_principal": [(512, 512), (1024, 1024)],
        "logo_principal_fondo_negro_icono": [(512, 512), (1024, 1024)],
        "logo_principal_fondo_blanco_icono": [(512, 512), (1024, 1024)],
        "logo_principal_fondo_negro": [(1200, 320)],
        "logo_principal_fondo_blanco": [(1200, 320)],
    }
    for name, target_sizes in principal_png_sizes.items():
        svg_path = os.path.join(OUTPUT_DIR, f"{name}.svg")
        for width, height in target_sizes:
            suffix = f"_{width}" if width == height else f"_{width}x{height}"
            output_png = os.path.join(OUTPUT_DIR, f"{name}{suffix}.png")
            run_command(f"rsvg-convert -w {width} -h {height} {svg_path} -o {output_png}")

    # 3. Generar Banners
    print("🚩 Generando Banners optimizados...")
    banner_variations = [
        ("banner_main", BACKGROUNDS["black"], PALETTE["gold"], PALETTE["white"], "ELENXOS", "AGORA · INVESTIGACIÓN COOPERATIVA"),
        ("banner_forest_kodama", PALETTE["forest"], PALETTE["kodama"], PALETTE["white"], "ELENXOS", "AGORA · INVESTIGACIÓN COOPERATIVA"),
        ("banner_minimal", PALETTE["black"], PALETTE["white"], PALETTE["white"], "ELENXOS", "CANON METODOLÓGICO"),
        ("banner_vibrant", PALETTE["mask"], PALETTE["white"], PALETTE["white"], "ELENXOS", "EL RIGOR DEL INSTINTO"),
        ("banner_agora", PALETTE["forest"], PALETTE["kodama"], PALETTE["white"], "AGORA", "ESPACIO DE TRABAJO RIGUROSO"),
    ]
    
    for name, bg, logo, text, title, subtitle in banner_variations:
        svg_banner_path = os.path.join(OUTPUT_DIR, f"{name}.svg")
        with open(svg_banner_path, "w", encoding="utf-8") as f:
            f.write(get_svg_banner(bg, logo, text, title, subtitle))
        
        # Convertir banner a PNG
        output_png = os.path.join(OUTPUT_DIR, f"{name}.png")
        run_command(f"rsvg-convert -w 1200 -h 400 {svg_banner_path} -o {output_png}")

    print(f"\n✅ Kit de logos mejorado y banners corregidos en: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
