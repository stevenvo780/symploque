import os

def get_logo_geometry(color="#A3E4D7"):
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

def generate_elenxos_logo(output_path="logo_elenxos.svg", color="#A3E4D7"):
    """
    Generates the Elenxos vector logo as an SVG file.
    """
    svg_content = f'''<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {get_logo_geometry(color)}
</svg>'''

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"✅ Logo generado exitosamente en: {output_path} (Color: {color})")

if __name__ == "__main__":
    # Paleta oficial Elenxos (Manual de Marca)
    PALETTE = {
        "kodama": "#A3E4D7",  # Acento Lógico / Principal
        "mask": "#8B0000",    # Rojo Máscara / Vitalidad
        "ash": "#3A3F41",     # Gris Ceniza
        "forest": "#0F2519",  # Verde Bosque
        "white": "#FFFFFF"
    }
    
    # Generar el logo por defecto
    generate_elenxos_logo("logo_elenxos.svg", PALETTE["kodama"])
    
    # Generar variantes
    for name, color in PALETTE.items():
        generate_elenxos_logo(f"logo_elenxos_{name}.svg", color)
