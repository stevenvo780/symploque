# MTO - Mantenimiento Técnico de Objetos Visuales (Logos & Assets)

Este directorio contiene las herramientas para la generación automatizada de la identidad visual de Elenxos y Agora.

## Contenido

- `generate_kit.py`: Script principal que genera el kit completo de logos en múltiples formatos y colores basados en el Manual de Marca.
- `../logos/`: Directorio generado y ordenado (vía scripts) que contiene:
    - `principal/`: Logo principal dorado en SVG, PNG, JPEG y JPG, separado por icono/logo completo y fondo negro/blanco.
    - `kit_completo/`: Kit extendido de logos, favicons y banners.
    - `variantes/`: Variantes cromáticas y decorativas.

`generate_kit.py` escribe en `../logos/kit_completo/`, no en esta carpeta MTO.

## Kit completo

- `../logos/kit_completo/` contiene:
    - **Logo principal dorado**: Isotipo y lockups de plataforma en fondo negro/blanco.
    - **Logos SVG**: Vectores escalables en los colores oficiales (Forest, Kodama, Mask, Ash, White, Black).
    - **Logos PNG**: Versiones en alta resolución (256px, 512px, 1024px).
    - **Favicons**: Tamaños optimizados para web (16px, 32px, 64px).
    - **Banners**: Formatos 3:1 (1200x400px) para redes sociales (LinkedIn, Twitter, etc.).

## Cómo usar

Para regenerar el kit completo:

```bash
python3 generate_kit.py
```

Para regenerar el logo principal ordenado con JPEG/JPG:

```bash
python3 ../generate_logo.py
```

## Requisitos

- `python3`
- `rsvg-convert` (parte de `librsvg`): Necesario para la conversión de SVG a PNG con alta fidelidad.

## Colores Oficiales Aplicados
- **Gold / Doradito plataforma (Principal de logo)**: `#C6A64A`
- **Forest (Primario)**: `#0F2519`
- **Kodama (Acento)**: `#A3E4D7`
- **Mask (Vitalidad)**: `#8B0000`
- **Ash (Estructura)**: `#3A3F41`
