import os
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# Paleta oficial (Manual de Marca + principal de plataforma)
PALETTE = {
    "gold": "#C6A64A",
    "kodama": "#A3E4D7",
    "mask": "#8B0000",
    "ash": "#3A3F41",
    "forest": "#0F2519",
    "white": "#FFFFFF"
}

OUTPUT_DIR = os.path.join(SCRIPT_DIR, "variantes")

def get_hexagon(color):
    return f'''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" fill="none" stroke="{color}" stroke-width="2" opacity="0.6"/>
</svg>'''

def get_triangle(color):
    return f'''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <polygon points="4.4,11 35.6,11 20,38" fill="none" stroke="{color}" stroke-width="2" opacity="0.6"/>
</svg>'''

def get_nodes(color):
    return f'''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="4" fill="{color}"/>
    <circle cx="20" cy="11" r="2" fill="{color}" opacity="0.8"/>
    <circle cx="27.8" cy="24.5" r="2" fill="{color}" opacity="0.8"/>
    <circle cx="12.2" cy="24.5" r="2" fill="{color}" opacity="0.8"/>
</svg>'''

def run_command(command):
    try:
        subprocess.run(command, check=True, shell=True)
    except subprocess.CalledProcessError:
        pass # Ignorar si no está rsvg-convert

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    variants = [
        ("hexagon", get_hexagon),
        ("triangle", get_triangle),
        ("nodes", get_nodes)
    ]
    
    print("🎨 Generando variantes decorativas...")
    for name, func in variants:
        for color_name, color_val in PALETTE.items():
            svg_path = os.path.join(OUTPUT_DIR, f"{name}_{color_name}.svg")
            with open(svg_path, "w", encoding="utf-8") as f:
                f.write(func(color_val))
            
            # También generamos PNG para uso directo en redes/docs
            png_path = os.path.join(OUTPUT_DIR, f"{name}_{color_name}.png")
            run_command(f"rsvg-convert -w 512 -h 512 {svg_path} -o {png_path}")
                
    print(f"✅ Variantes generadas exitosamente en: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
