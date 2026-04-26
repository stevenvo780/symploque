# Estructura de Media Kit Agora / Elenxos

Este documento ya no es solo una lista aspiracional. Desde ahora funciona como checklist operativo del media kit.

Referencia complementaria:

- inventario actual: [../assets/README.md](../assets/README.md)
- criterio visual canonico: [../assets/brand/manual_de_marca.md](../assets/brand/manual_de_marca.md)
- tokens oficiales: [../elenxos_design_system/src/tokens/_colors.scss](../elenxos_design_system/src/tokens/_colors.scss)

## 1. Identidad Visual (Brand Assets)
- [x] **Logos:** Ya existe un kit exportable en `../assets/brand/mto/kit_logos/` con SVG y PNG en multiples tamaños.
- [x] **Variantes de Color:** Ya existen variantes `forest`, `kodama`, `mask`, `ash`, `white` y `black` dentro del kit.
- [x] **Paleta de Colores:** Ya existe una paleta canonica en el manual de marca y en el design system.
- [x] **Tipografías:** Ya existe criterio claro: `Playfair Display` + `Inter`.

## 2. Capturas de Pantalla (Product Shots)
- `[x]` **Hero Shot:** Captura limpia del dashboard de Agora en alta resolución.
- `[x]` **Módulo de Editor Semántico:** Zoom en el editor con un texto en Markdown y lógica ST visible.
- `[ ]` **Módulo de Terminal:** Captura de la terminal multi-sesión con una ejecución real.
- `[ ]` **Módulo de Colaboración:** Vista de tableros Kanban o lista de miembros del equipo.
- [ ] **Dispositivos:** Mockups de Agora funcionando en un MacBook, un iPad y un iPhone (para denotar PWA & Offline).

## 3. Gráficos de Redes Sociales (Social Media Templates)
- [x] **Banners exploratorios:** Ya existen banners y logos base en `../assets/brand/mto/kit_logos/`.
- [x] **Renders multi-plataforma:** Ya existe el pipeline React → PNG en `../elenxos_design_system/` y mantiene el registry renderizable.
- [x] **Plantilla para Carruseles:** Ya existen `lote1_estandar` y `lote1_flujo` para arrancar la primera semana.
- [x] **Plantilla para Reel:** Ya existe `reel_manifiesto` para la pieza vertical de arranque.
- [x] **Banners listos para perfiles:** Ya existen `banner_main.png`, `banner_minimal.png`, `banner_vibrant.png` y `banner_agora.png` en el kit.
- `[ ]` **Plantilla para "Caso Verificado":** Falta el diseño estandar para testimonios o pilotos.
- [ ] **Fondo de Videollamada:** Un fondo profesional con el logo de Agora/Elenxos para demos y reuniones.

## 4. Fotos de Equipo (Human Assets)
- [ ] **Retrato de Fundador:** Foto profesional en alta resolución.
- [ ] **Workspace:** Foto del equipo trabajando o de un escritorio con Agora abierto (para "humanizar" la marca).

## 5. Pipeline de automatización

Fuente operativa:

- inventario y sistema visual: [../assets/README.md](../assets/README.md)
- arranque de automatización: [automatizacion-visual.md](./automatizacion-visual.md)

Comandos base:

```bash
python3 ../assets/brand/mto/generate_kit.py
python3 ../assets/brand/mto/generate_variants.py
npm --prefix ../elenxos_design_system run render -- --template lote1_estandar,lote1_flujo,reel_manifiesto,banner_minimal --output ./output/redes-sociales-lote-1
```

Comando recomendado para no repetir pasos a mano:

```bash
../scripts/iniciar_automatizacion_redes.sh
```

Si `rsvg-convert` no esta disponible, el script conserva el kit ya generado y sigue con el render del lote social.

## 6. Especificaciones Técnicas de Entrega
- **Imágenes:** Formato PNG para capturas de pantalla, JPG para fotos de equipo y SVG para logos.
- **Videos/Reels:** Formato MP4, 1080x1920 (9:16), máximo 60 segundos.
- **Compresión:** Todas las imágenes para web deben estar optimizadas (usar TinyPNG o similar antes de subir al repo).

## 7. Regla de cierre

El media kit no se considera cerrado hasta que existan simultaneamente:

- identidad visual exportable
- screenshots reales del producto
- assets sociales publicables
- al menos una pieza humana del fundador o workspace
