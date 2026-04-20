import os

def generate_elenxos_logo(output_path="logo_elenxos.svg", color="#f0e6d3"):
    """
    Generates the Elenxos vector logo as an SVG file.
    
    The logo consists of:
    1. A Hexagon (Analytical framework and rigorous standardization)
    2. An immersed Triangle (Disciplinary synthesis: Philosophy, Biology, Informatics)
    3. Network Topology (Emergent properties and complex systems)
    4. Nodes (Epistemic convergence points)
    """
    
    svg_content = f'''<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Hexágono: El marco analítico y la estandarización rigurosa -->
    <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" stroke="{color}" stroke-width="1.2" stroke-linejoin="round" opacity="0.4"/>
    
    <!-- Triángulo inmerso: La síntesis disciplinar (Filosofía, Biología, Informática) -->
    <polygon points="4.4,11 35.6,11 20,38" stroke="{color}" stroke-width="1" stroke-linejoin="round" opacity="0.6"/>
    
    <!-- Topología de red: Propiedades emergentes y sistemas complejos -->
    <path d="M20,20 L20,2 M20,20 L35.6,29 M20,20 L4.4,29" stroke="{color}" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
    
    <!-- Nodos: Puntos de convergencia epistémica -->
    <circle cx="20" cy="20" r="3.5" fill="{color}" opacity="1"/>
    <circle cx="20" cy="11" r="1.5" fill="{color}" opacity="0.9"/>
    <circle cx="27.8" cy="24.5" r="1.5" fill="{color}" opacity="0.9"/>
    <circle cx="12.2" cy="24.5" r="1.5" fill="{color}" opacity="0.9"/>
</svg>'''

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"✅ Logo generado exitosamente en: {output_path} (Color: {color})")

if __name__ == "__main__":
    # Colores de la paleta Elenxos
    PALETTE = {
        "cream": "#f0e6d3",   # Color principal (texto/iconos)
        "amber": "#c8a45a",   # Acentos
        "crimson": "#8b2232", # Botones/Llamadas a la acción
        "forest": "#0a1a0f"   # Fondo (por si se necesita logo oscuro)
    }
    
    # Generar el logo por defecto
    generate_elenxos_logo("logo_elenxos.svg", PALETTE["cream"])
    
    # Generar variantes
    generate_elenxos_logo("logo_elenxos_amber.svg", PALETTE["amber"])
    generate_elenxos_logo("logo_elenxos_crimson.svg", PALETTE["crimson"])
