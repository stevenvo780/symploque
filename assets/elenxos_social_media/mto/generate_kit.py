import os
import subprocess

# Paleta de colores oficial (Manual de Marca)
PALETTE = {
    "forest": "#0F2519",  # Primario
    "kodama": "#A3E4D7",  # Acento Lógico
    "mask": "#8B0000",    # Rojo Máscara / Vitalidad
    "ash": "#3A3F41",     # Gris Ceniza
    "white": "#FFFFFF",
    "black": "#000000"
}

OUTPUT_DIR = "kit_logos"

def get_svg_logo(color="#A3E4D7"):
    """Retorna el contenido SVG del logo de Elenxos."""
    return f'''<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Hexágono -->
    <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" stroke="{color}" stroke-width="1.2" stroke-linejoin="round" opacity="0.4"/>
    
    <!-- Triángulo inmerso -->
    <polygon points="4.4,11 35.6,11 20,38" stroke="{color}" stroke-width="1" stroke-linejoin="round" opacity="0.6"/>
    
    <!-- Topología de red -->
    <path d="M20,20 L20,2 M20,20 L35.6,29 M20,20 L4.4,29" stroke="{color}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
    
    <!-- Nodos -->
    <circle cx="20" cy="20" r="3.5" fill="{color}" opacity="1"/>
    <circle cx="20" cy="11" r="1.5" fill="{color}" opacity="0.9"/>
    <circle cx="27.8" cy="24.5" r="1.5" fill="{color}" opacity="0.9"/>
    <circle cx="12.2" cy="24.5" r="1.5" fill="{color}" opacity="0.9"/>
</svg>'''

def get_svg_banner(bg_color="#0F2519", logo_color="#A3E4D7", text_color="#FFFFFF"):
    """Retorna el contenido SVG de un banner básico 3:1."""
    return f'''<svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="400" fill="{bg_color}"/>
    
    <!-- Logo a la izquierda -->
    <g transform="translate(100, 100) scale(5)">
        {get_svg_logo(logo_color)}
    </g>
    
    <!-- Texto -->
    <text x="350" y="200" font-family="Playfair Display, serif" font-size="80" fill="{text_color}" font-weight="bold">ELENXOS</text>
    <text x="350" y="260" font-family="Inter, sans-serif" font-size="30" fill="{logo_color}" letter-spacing="4">AGORA · INVESTIGACIÓN COOPERATIVA</text>
</svg>'''

def run_command(command):
    try:
        subprocess.run(command, check=True, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al ejecutar: {command}\n{e}")

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    # 1. Generar SVGs básicos
    print("🎨 Generando SVGs...")
    for name, color in PALETTE.items():
        svg_path = os.path.join(OUTPUT_DIR, f"logo_{name}.svg")
        with open(svg_path, "w") as f:
            f.write(get_svg_logo(color))
            
    # 2. Convertir a PNGs (Varios tamaños)
    sizes = [16, 32, 64, 128, 256, 512, 1024]
    print("🖼️ Generando PNGs y Favicons...")
    for name, color in PALETTE.items():
        svg_path = os.path.join(OUTPUT_DIR, f"logo_{name}.svg")
        for size in sizes:
            ext = "png"
            if size <= 64:
                prefix = "favicon"
            else:
                prefix = "logo"
            
            output_png = os.path.join(OUTPUT_DIR, f"{prefix}_{name}_{size}.{ext}")
            # rsvg-convert -w {size} -h {size} {svg_path} > {output_png}
            run_command(f"rsvg-convert -w {size} -h {size} {svg_path} -o {output_png}")

    # 3. Generar Banners
    print("🚩 Generando Banners...")
    banner_variations = [
        ("banner_main", PALETTE["forest"], PALETTE["kodama"], PALETTE["white"]),
        ("banner_minimal", PALETTE["black"], PALETTE["white"], PALETTE["white"]),
        ("banner_vibrant", PALETTE["mask"], PALETTE["white"], PALETTE["white"]),
    ]
    
    for name, bg, logo, text in banner_variations:
        svg_banner_path = os.path.join(OUTPUT_DIR, f"{name}.svg")
        with open(svg_banner_path, "w") as f:
            f.write(get_svg_banner(bg, logo, text))
        
        # Convertir banner a PNG
        output_png = os.path.join(OUTPUT_DIR, f"{name}.png")
        run_command(f"rsvg-convert -w 1200 -h 400 {svg_banner_path} -o {output_png}")

    print(f"\n✅ Kit de logos completado en la carpeta: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
