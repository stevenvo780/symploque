#!/usr/bin/env python3
"""
Pipeline: Generar fondos IA con SDXL local + componer híbridos con templates React.
RTX 5070 Ti (16GB) — Stable Diffusion XL base 1.0
"""

import torch
import os
from pathlib import Path
from diffusers import StableDiffusionXLPipeline
from PIL import Image, ImageEnhance, ImageFilter

# ─── Rutas ───
BASE = Path("/home/stev/Documentos/symploque")
REACT_DIR = BASE / "assets/templates-react"
OUT_AI = BASE / "assets/ai-images/sdxl-backgrounds"
OUT_HYBRID = BASE / "assets/ai-images/hybrid"
PKG = BASE / "assets/entregables"

OUT_AI.mkdir(parents=True, exist_ok=True)
OUT_HYBRID.mkdir(parents=True, exist_ok=True)

# ─── Estilo global para coherencia de marca ───
STYLE_SUFFIX = (
    ", dark moody atmosphere, deep forest green (#0D3B2E) and black tones, "
    "cinematic lighting, bioluminescent accents, kodama green glow, "
    "premium editorial quality, 8k, no text, no watermark"
)

# ─── Piezas: (id, formato, prompt_ia, react_source, target) ───
PIECES = [
    # ── SEMANA 1: Cercanía ──
    {
        "id": "s1_post1",
        "prompt": "Academic desk in darkness with scattered papers and glowing screens, documents floating chaotically, dramatic side lighting",
        "size": (1024, 1024),
        "react_src": "n1_dolor/n1_l1_post_caos.png",
        "target": "feed/01.png",
    },
    {
        "id": "s1_post2",
        "prompt": "Split visual, left side chaotic folders cables messy notes, right side clean minimal interface with logic tree, green forest tones transition",
        "size": (1024, 1024),
        "react_src": "n1_dolor/n1_l1_post_archivos.png",
        "target": "feed/02.png",
    },
    {
        "id": "s1_reel",
        "prompt": "Tunnel of floating unfocused documents, green particles swirling, deep cinematic depth of field, subtle motion blur",
        "size": (768, 1344),
        "react_src": "n1_dolor/n1_l1_reel_dolor.png",
        "target": "reels/01.png",
    },
    {
        "id": "s1_story",
        "prompt": "Abstract dark background with single point of green bioluminescent light, minimalist, vast empty space",
        "size": (768, 1344),
        "react_src": "n1_dolor/n1_l1_story_stat.png",
        "target": "stories/01.png",
    },
    # ── SEMANA 2: Cercanía ──
    {
        "id": "s2_post1",
        "prompt": "Network of nodes disconnecting, fragments of text floating in darkness, cold tones with green accents, data visualization breaking apart",
        "size": (1024, 1024),
        "react_src": "n1_dolor/n1_l1_post_pregunta.png",
        "target": "feed/03.png",
    },
    {
        "id": "s2_post2",
        "prompt": "Group of silhouettes working at a table illuminated by screens, dark collaborative atmosphere, subtle green smoke, academic setting",
        "size": (1024, 1024),
        "react_src": "n1_dolor/n1_l2_post_dato.png",
        "target": "feed/04.png",
    },
    {
        "id": "s2_reel",
        "prompt": "Close-up of hands on keyboard with warm side lighting, dark background with green bokeh, focused academic work",
        "size": (768, 1344),
        "react_src": "n1_dolor/n1_l2_reel_flujo.png",
        "target": "reels/02.png",
    },
    {
        "id": "s2_story",
        "prompt": "Stylized capture of multiple browser tabs stacked, subtle glitch effect, digital chaos, dark background",
        "size": (768, 1344),
        "react_src": "n1_dolor/n1_l2_story_antes.png",
        "target": "stories/02.png",
    },
    # ── SEMANA 3: Utilidad ──
    {
        "id": "s3_post1",
        "prompt": "Luminous flow diagram with 4 nodes connected by bright green lines on black background, blueprint style, clean geometric",
        "size": (1024, 1024),
        "react_src": "n2_solucion/n2_l3_post_flujo.png",
        "target": "feed/05.png",
    },
    {
        "id": "s3_post2",
        "prompt": "Code editor interface with logic code and academic text side by side, green glow on borders, dark premium background, split screen",
        "size": (1024, 1024),
        "react_src": "n2_solucion/n2_l3_post_markdown.png",
        "target": "feed/06.png",
    },
    {
        "id": "s3_reel",
        "prompt": "Sequence of interface screens in 3D perspective, smooth transitions between them, kodama green particles floating around",
        "size": (768, 1344),
        "react_src": "n2_solucion/n2_l3_reel_demo.png",
        "target": "reels/03.png",
    },
    {
        "id": "s3_story",
        "prompt": "Minimalist clock with hands in kodama green, dark clean background, elegant timepiece, editorial style",
        "size": (768, 1344),
        "react_src": "n2_solucion/n2_l3_story_feature.png",
        "target": "stories/03.png",
    },
    # ── SEMANA 4: Utilidad ──
    {
        "id": "s4_post1",
        "prompt": "Futuristic academic coworking space, screens showing logic diagrams, ambient green light, collaboration atmosphere",
        "size": (1024, 1024),
        "react_src": "n2_solucion/n2_l3_post_verificacion.png",
        "target": "feed/07.png",
    },
    {
        "id": "s4_post2",
        "prompt": "Digital knowledge tree growing from an open book, roots of light, crown with logic nodes, organic technology fusion",
        "size": (1024, 1024),
        "react_src": "n1_dolor/n1_l2_post_fragmentos.png",
        "target": "feed/08.png",
    },
    # ── SEMANA 5: Rigor ──
    {
        "id": "s5_post1",
        "prompt": "Abstract brain formed by logic networks, bright green synapses firing, deep dark abyssal background, neural connections",
        "size": (1024, 1024),
        "react_src": "n2_solucion/n2_l4_post_rigor.png",
        "target": "feed/09.png",
    },
    {
        "id": "s5_post2",
        "prompt": "Truth table floating in space, variables glowing in kodama green, highlighted result row, mathematical elegance, dark void",
        "size": (1024, 1024),
        "react_src": "n2_solucion/n2_l4_post_logica.png",
        "target": "feed/10.png",
    },
    {
        "id": "s5_reel",
        "prompt": "Architectural bridge suspended over an abyss, green fog below, light at the end, dramatic cinematic perspective",
        "size": (768, 1344),
        "react_src": "n2_solucion/n2_l4_reel_rigor.png",
        "target": "reels/04.png",
    },
    {
        "id": "s5_story",
        "prompt": "Dark textured background with dramatic red accent, serif typography style, moody editorial feel, manifesto aesthetic",
        "size": (768, 1344),
        "react_src": "n2_solucion/n2_l4_story_formal.png",
        "target": "stories/04.png",
    },
    # ── SEMANA 6: Rigor ──
    {
        "id": "s6_post1",
        "prompt": "Monumental universal quantifier symbol (upside down A) in green light, epic low angle perspective, particles floating around it",
        "size": (1024, 1024),
        "react_src": "n2_solucion/n2_l4_post_motor.png",
        "target": "feed/11.png",
    },
    {
        "id": "s6_post2",
        "prompt": "Digital chalkboard with logic formalization fragment, luminous green chalk marks, dark slate background, academic",
        "size": (1024, 1024),
        "react_src": "n1_dolor/n1_l2_post_ciclo.png",
        "target": "feed/12.png",
    },
    # ── SEMANA 7: Ecosistema ──
    {
        "id": "s7_post1",
        "prompt": "Futuristic city built on tree roots, green bioluminescence everywhere, organic-digital architecture fusion, epic wide shot",
        "size": (1024, 1024),
        "react_src": "n3_ecosistema/n3_l5_post_semillero.png",
        "target": "feed/13.png",
    },
    {
        "id": "s7_post2",
        "prompt": "Visual timeline with luminous milestones, each node an icon (editor, logic, agent, network), horizontal progression, futuristic",
        "size": (1024, 1024),
        "react_src": "n3_ecosistema/n3_l5_post_cooperar.png",
        "target": "feed/14.png",
    },
    {
        "id": "s7_reel",
        "prompt": "Number 2027 emerging from green fog, epic slow reveal, ascending particles, dramatic lighting, futuristic typography",
        "size": (768, 1344),
        "react_src": "n3_ecosistema/n3_l5_reel_vision.png",
        "target": "reels/05.png",
    },
    {
        "id": "s7_story",
        "prompt": "Door ajar with intense green light pouring out, mysterious inviting atmosphere, dark corridor, cinematic",
        "size": (768, 1344),
        "react_src": "n3_ecosistema/n3_l5_story_unete.png",
        "target": "stories/05.png",
    },
    # ── SEMANA 8: Conversión ──
    {
        "id": "s8_post1",
        "prompt": "Luminous green portal in the middle of darkness, frontal perspective, inviting depth, epic gateway, clean composition",
        "size": (1024, 1024),
        "react_src": "n3_ecosistema/n3_l5_post_futuro.png",
        "target": "feed/15.png",
    },
]


def load_pipeline():
    """Cargar SDXL desde cache local."""
    print("⏳ Cargando Stable Diffusion XL...")
    pipe = StableDiffusionXLPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-base-1.0",
        torch_dtype=torch.float16,
        variant="fp16",
        use_safetensors=True,
    )
    pipe = pipe.to("cuda")
    pipe.enable_vae_slicing()
    print("✅ Pipeline SDXL cargado en GPU")
    return pipe


def generate_background(pipe, prompt: str, size: tuple, output_path: Path):
    """Generar una imagen de fondo con SDXL."""
    w, h = size
    full_prompt = prompt + STYLE_SUFFIX
    negative = (
        "text, watermark, logo, words, letters, numbers, signature, "
        "blurry, low quality, deformed, ugly, bright colors, white background"
    )

    image = pipe(
        prompt=full_prompt,
        negative_prompt=negative,
        width=w,
        height=h,
        num_inference_steps=30,
        guidance_scale=7.5,
        generator=torch.Generator("cuda").manual_seed(42),
    ).images[0]

    image.save(output_path)
    return image


def create_hybrid(ai_bg_path: Path, react_path: Path, output_path: Path, target_size: tuple):
    """
    Componer imagen híbrida: fondo IA + overlay del design system React.
    El template React se superpone con transparencia controlada.
    """
    # Abrir fondo IA y redimensionar al tamaño final
    final_w, final_h = target_size
    bg = Image.open(ai_bg_path).convert("RGBA")
    bg = bg.resize((final_w, final_h), Image.LANCZOS)

    # Oscurecer ligeramente el fondo para que el texto destaque
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(0.6)

    # Aplicar blur sutil al fondo
    bg = bg.filter(ImageFilter.GaussianBlur(radius=2))

    # Abrir template React
    react = Image.open(react_path).convert("RGBA")
    react = react.resize((final_w, final_h), Image.LANCZOS)

    # Crear máscara de opacidad para el template React (semi-transparente)
    # El texto y elementos del template se mantienen, el fondo se vuelve translúcido
    r, g, b, a = react.split()

    # Aumentar la opacidad del template (80%) para que el texto sea legible
    # pero el fondo IA se vea a través
    import numpy as np
    react_array = np.array(react)

    # Detectar píxeles oscuros del fondo del template (hacerlos más transparentes)
    # y mantener opacos los elementos de texto/gráficos
    brightness = (react_array[:, :, 0].astype(int) +
                  react_array[:, :, 1].astype(int) +
                  react_array[:, :, 2].astype(int)) / 3

    # Crear máscara: píxeles muy oscuros → transparentes, resto → semi-opaco
    alpha_mask = np.ones((final_h, final_w), dtype=np.uint8) * 200  # default: 78% opaco
    alpha_mask[brightness < 40] = 30      # muy oscuro → casi transparente (fondo IA se ve)
    alpha_mask[brightness < 20] = 10      # negro puro → muy transparente
    alpha_mask[brightness > 150] = 240    # elementos claros/texto → muy opaco

    react_array[:, :, 3] = alpha_mask
    react_blended = Image.fromarray(react_array)

    # Componer
    hybrid = Image.alpha_composite(bg, react_blended)

    # Convertir a RGB para guardar como PNG sin canal alpha innecesario
    hybrid = hybrid.convert("RGB")
    hybrid.save(output_path, quality=95)
    return hybrid


def main():
    pipe = load_pipeline()

    total = len(PIECES)
    for i, piece in enumerate(PIECES, 1):
        pid = piece["id"]
        print(f"\n{'='*60}")
        print(f"[{i}/{total}] {pid}")
        print(f"{'='*60}")

        # Tamaños finales para Instagram
        gen_size = piece["size"]  # generación SDXL
        if gen_size == (1024, 1024):
            final_size = (1080, 1080)
        else:
            final_size = (1080, 1920)

        # 1. Generar fondo IA
        ai_path = OUT_AI / f"{pid}.png"
        if ai_path.exists():
            print(f"  ↳ Fondo IA ya existe, saltando generación")
        else:
            print(f"  ↳ Generando fondo IA ({gen_size[0]}×{gen_size[1]})...")
            generate_background(pipe, piece["prompt"], gen_size, ai_path)
            print(f"  ↳ ✅ Fondo IA guardado: {ai_path.name}")

        # 2. Crear híbrido
        react_path = REACT_DIR / piece["react_src"]
        hybrid_path = OUT_HYBRID / f"{pid}.png"

        if not react_path.exists():
            print(f"  ↳ ⚠️  Template React no encontrado: {piece['react_src']}")
            continue

        print(f"  ↳ Componiendo híbrido (fondo IA + React overlay)...")
        create_hybrid(ai_path, react_path, hybrid_path, final_size)
        print(f"  ↳ ✅ Híbrido guardado: {hybrid_path.name}")

        # 3. Copiar al paquete final
        target = PKG / piece["target"]
        hybrid_final = Image.open(hybrid_path)
        hybrid_final.save(target, quality=95)
        print(f"  ↳ ✅ Copiado a: {piece['target']}")

    print(f"\n{'='*60}")
    print(f"🎉 Pipeline completo: {total} imágenes híbridas generadas")
    print(f"   Fondos IA en:  {OUT_AI}")
    print(f"   Híbridos en:   {OUT_HYBRID}")
    print(f"   Paquete final: {PKG}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
