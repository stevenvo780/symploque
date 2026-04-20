import os

# Paleta
PALETTE = {
    "kodama": "#A3E4D7",
    "mask": "#8B0000",
}

OUTPUT_DIR = "variantes"

def get_hexagon(color):
    return f'''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11" fill="none" stroke="{color}" stroke-width="2"/>
</svg>'''

def get_triangle(color):
    return f'''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <polygon points="4.4,11 35.6,11 20,38" fill="none" stroke="{color}" stroke-width="2"/>
</svg>'''

def get_nodes(color):
    return f'''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="4" fill="{color}"/>
    <circle cx="20" cy="11" r="2" fill="{color}"/>
    <circle cx="27.8" cy="24.5" r="2" fill="{color}"/>
    <circle cx="12.2" cy="24.5" r="2" fill="{color}"/>
</svg>'''

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    variants = [
        ("hexagon", get_hexagon),
        ("triangle", get_triangle),
        ("nodes", get_nodes)
    ]
    
    for name, func in variants:
        for color_name, color_val in PALETTE.items():
            path = os.path.join(OUTPUT_DIR, f"{name}_{color_name}.svg")
            with open(path, "w") as f:
                f.write(func(color_val))
                
    print(f"✅ Variantes decorativas generadas en: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
