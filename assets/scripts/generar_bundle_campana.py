#!/usr/bin/env python3
"""
Generador de bundle AI para campañas Agora / Elenxos.

Carga Playground v2.5 una sola vez y renderiza un lote arbitrario de assets
(definidos en JSON) para que el pipeline TypeScript pueda:
  1. construir prompts narrativos variables,
  2. asignar seeds por template,
  3. escribir los PNG finales exactamente en public/ai-images/.

Uso:
    python generar_bundle_campana.py --bundle /ruta/bundle.json
    python generar_bundle_campana.py --bundle /ruta/bundle.json --steps 60 --guidance 3.5

Formato esperado del bundle:
{
  "campaign": "campana_0_dolor",
  "items": [
    {
      "templateId": "hybrid_problema",
      "slot": "publicacion",
      "narrativa": "dolor",
      "prompt": "...",
      "negativePrompt": "... opcional ...",
      "width": 1080,
      "height": 1080,
      "seed": 123456,
      "outputPath": "/abs/path/to/file.png"
    }
  ]
}
"""

import argparse
import gc
import json
import os
import sys
import time
from pathlib import Path

# ── Entorno CUDA / diffusers ──────────────────────────────────────────────
os.environ.pop("CUDA_VISIBLE_DEVICES", None)
os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")

import torch

# ── Blackwell workarounds (mismo criterio que scripts existentes) ────────
torch.backends.cuda.enable_flash_sdp(False)
torch.backends.cuda.enable_mem_efficient_sdp(False)
torch.backends.cudnn.enabled = False

from diffusers import DiffusionPipeline, EDMDPMSolverMultistepScheduler
from PIL import Image

MODEL_ID = "playgroundai/playground-v2.5-1024px-aesthetic"
DEFAULT_DEVICE = "cuda:0"
DEFAULT_DTYPE = torch.bfloat16
DEFAULT_NEGATIVE = (
    "ugly, blurry, low quality, distorted, deformed, disfigured, "
    "bad anatomy, watermark, text artifacts, oversaturated, amateur, "
    "poorly rendered, low resolution, jpeg artifacts, duplicate subjects, "
    "cropped heads, extra limbs, legible letters, visible UI chrome"
)

# Resoluciones de generación optimizadas para SDXL / Playground.
RESOLUTIONS = {
    "ultra_wide": (1536, 640),
    "wide": (1344, 768),
    "square": (1024, 1024),
    "tall": (768, 1344),
    "ultra_tall": (640, 1536),
}


def vram_report(device: str) -> str:
    if not device.startswith("cuda") or not torch.cuda.is_available():
        return "n/a"

    try:
        device_index = int(device.split(":", 1)[1]) if ":" in device else 0
    except ValueError:
        device_index = 0

    alloc = torch.cuda.memory_allocated(device_index) / 1024**3
    reserved = torch.cuda.memory_reserved(device_index) / 1024**3
    total = torch.cuda.get_device_properties(device_index).total_memory / 1024**3
    return f"{alloc:.1f}GB alloc / {reserved:.1f}GB reserv / {total:.1f}GB total"


def classify_aspect(width: int, height: int) -> str:
    aspect = width / height
    if aspect >= 3.0:
        return "ultra_wide"
    if aspect >= 1.3:
        return "wide"
    if aspect <= 0.5:
        return "ultra_tall"
    if aspect <= 0.8:
        return "tall"
    return "square"


def build_pipeline(model_id: str, device: str, dtype: torch.dtype) -> DiffusionPipeline:
    print(f"[LOAD] Modelo: {model_id}")
    print(f"[LOAD] Device: {device} | dtype: {dtype}")
    print(f"[LOAD] VRAM pre-carga: {vram_report(device)}\n")

    pipe = DiffusionPipeline.from_pretrained(
        model_id,
        torch_dtype=dtype,
        variant="fp16",
    )
    pipe.scheduler = EDMDPMSolverMultistepScheduler()
    pipe = pipe.to(device)
    pipe.enable_vae_tiling()
    pipe.enable_vae_slicing()

    print("[LOAD] Pipeline listo.")
    print(f"[LOAD] VRAM post-carga: {vram_report(device)}")
    print("[LOAD] Modo: FULL GPU (sin offload, sin attention_slicing)\n")
    return pipe


def render_item(
    pipe: DiffusionPipeline,
    item: dict,
    *,
    steps: int,
    guidance: float,
    device: str,
) -> Path:
    width = int(item["width"])
    height = int(item["height"])
    seed = int(item["seed"])
    prompt = item["prompt"]
    negative_prompt = item.get("negativePrompt") or DEFAULT_NEGATIVE
    output_path = Path(item["outputPath"])

    output_path.parent.mkdir(parents=True, exist_ok=True)

    resolution_key = classify_aspect(width, height)
    gen_width, gen_height = RESOLUTIONS[resolution_key]
    generator = torch.Generator(device=device).manual_seed(seed)

    print(f"    ↳ {item['templateId']} [{item['slot']}/{item['narrativa']}]")
    print(f"      seed={seed} | gen={gen_width}x{gen_height} → final={width}x{height}")
    print(f"      VRAM: {vram_report(device)}")

    with torch.inference_mode():
        result = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=gen_width,
            height=gen_height,
            num_inference_steps=steps,
            guidance_scale=guidance,
            generator=generator,
        )

    image: Image.Image = result.images[0]
    if (image.width, image.height) != (width, height):
        image = image.resize((width, height), Image.LANCZOS)

    image.save(output_path, "PNG")
    return output_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Generar bundle AI de campaña")
    parser.add_argument("--bundle", required=True, help="Ruta al JSON del bundle")
    parser.add_argument("--steps", type=int, default=50, help="Pasos de inferencia")
    parser.add_argument("--guidance", type=float, default=3.0, help="Guidance scale")
    parser.add_argument("--device", type=str, default=DEFAULT_DEVICE, help="Device torch (default: cuda:0)")
    parser.add_argument("--model", type=str, default=MODEL_ID, help="Modelo diffusers")
    args = parser.parse_args()

    bundle_path = Path(args.bundle).resolve()
    if not bundle_path.exists():
        print(f"[ERROR] Bundle no encontrado: {bundle_path}")
        return 1

    if args.steps <= 0:
        print("[ERROR] --steps debe ser > 0")
        return 1

    if args.device.startswith("cuda") and not torch.cuda.is_available():
        print("[ERROR] Se pidió CUDA pero torch.cuda no está disponible.")
        return 1

    data = json.loads(bundle_path.read_text(encoding="utf-8"))
    items = data.get("items", [])
    if not items:
        print("[ERROR] El bundle no contiene items.")
        return 1

    if args.device == "cpu":
        dtype = torch.float32
    else:
        dtype = DEFAULT_DTYPE

    print("=" * 72)
    print(f"  BUNDLE AI — {data.get('campaign', 'sin_nombre')}")
    print(f"  Items: {len(items)}")
    print(f"  Modelo: {args.model}")
    print(f"  Device: {args.device}")
    print(f"  Steps: {args.steps} | Guidance: {args.guidance}")
    print(f"  Bundle: {bundle_path}")
    print("=" * 72)
    print()

    pipe = build_pipeline(args.model, args.device, dtype)

    failures: list[str] = []

    for index, item in enumerate(items, start=1):
        label = item.get("templateId", f"item_{index}")
        t0 = time.time()
        print(f"[{index}/{len(items)}] {label}")
        try:
            output_path = render_item(
                pipe,
                item,
                steps=args.steps,
                guidance=args.guidance,
                device=args.device,
            )
            elapsed = time.time() - t0
            print(f"      ✓ Guardada: {output_path} ({elapsed:.1f}s)\n")
        except torch.cuda.OutOfMemoryError:
            elapsed = time.time() - t0
            failures.append(label)
            print(f"      ✗ OOM ({elapsed:.1f}s)\n")
            if args.device.startswith("cuda"):
                torch.cuda.empty_cache()
            gc.collect()
        except Exception as exc:
            elapsed = time.time() - t0
            failures.append(label)
            print(f"      ✗ Error: {exc} ({elapsed:.1f}s)\n")
            if args.device.startswith("cuda"):
                torch.cuda.empty_cache()
            gc.collect()
        else:
            if args.device.startswith("cuda"):
                torch.cuda.empty_cache()
            gc.collect()

    print()
    print("=" * 72)
    print(f"  Resultado: {len(items) - len(failures)}/{len(items)} items generados")
    if failures:
        print(f"  Fallidos: {', '.join(failures)}")
    print(f"  VRAM final: {vram_report(args.device)}")
    print("=" * 72)

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
