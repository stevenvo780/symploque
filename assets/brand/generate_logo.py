import os

BRAND_NAME = "elenxos"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

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


def resolve_output_path(output_path):
    """Resuelve salidas relativas desde assets/brand, no desde el cwd."""
    if os.path.isabs(output_path):
        return output_path
    return os.path.join(SCRIPT_DIR, output_path)


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


def write_svg(output_path, svg_content):
    resolved_path = resolve_output_path(output_path)
    os.makedirs(os.path.dirname(resolved_path), exist_ok=True)
    with open(resolved_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    return resolved_path


def generate_elenxos_logo(output_path="logo_elenxos.svg", color=PALETTE["gold"], background_color=None):
    """Generates the Elenxos vector icon as an SVG file."""
    resolved_path = write_svg(output_path, get_svg_logo(color, background_color=background_color))
    print(f"✅ Logo generado exitosamente en: {resolved_path} (Color: {color})")


def generate_elenxos_lockup(
    output_path="logo_elenxos_principal_fondo_negro.svg",
    background_color=BACKGROUNDS["black"],
    text_color=PALETTE["white"],
):
    """Generates the complete Elenxos logo with icon and wordmark."""
    resolved_path = write_svg(
        output_path,
        get_svg_lockup(background_color=background_color, text_color=text_color),
    )
    print(f"✅ Logo completo generado exitosamente en: {resolved_path}")


def generate_principal_assets(prefix=""):
    """Genera el set principal dorado, con versiones para fondo negro y blanco."""
    generate_elenxos_logo(f"{prefix}logo_elenxos.svg", PALETTE["gold"])
    generate_elenxos_logo(f"{prefix}logo_elenxos_principal.svg", PALETTE["gold"])
    generate_elenxos_logo(
        f"{prefix}logo_elenxos_principal_fondo_negro_icono.svg",
        PALETTE["gold"],
        BACKGROUNDS["black"],
    )
    generate_elenxos_logo(
        f"{prefix}logo_elenxos_principal_fondo_blanco_icono.svg",
        PALETTE["gold"],
        BACKGROUNDS["white"],
    )
    generate_elenxos_lockup(
        f"{prefix}logo_elenxos_principal_fondo_negro.svg",
        BACKGROUNDS["black"],
        PALETTE["white"],
    )
    generate_elenxos_lockup(
        f"{prefix}logo_elenxos_principal_fondo_blanco.svg",
        BACKGROUNDS["white"],
        PALETTE["forest"],
    )


if __name__ == "__main__":
    # Principal en assets/brand.
    generate_principal_assets()

    # Copia corta en assets/ para consumo directo desde la plataforma o docs.
    generate_principal_assets("../")
    
    # Variantes cromáticas conservadas.
    for name, color in PALETTE.items():
        generate_elenxos_logo(f"logo_elenxos_{name}.svg", color)
