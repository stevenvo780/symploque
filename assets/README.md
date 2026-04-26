# Assets y Media Kit

Este directorio concentra la capa visual real del emprendimiento. La regla es simple:

- `manual_de_marca.md` y los tokens del design system mandan
- los renders existentes sirven como materia prima
- lo que no exista aqui o no este inventariado no cuenta como media kit listo

## Fuente canonica de identidad

- Manual conceptual y visual: [brand/manual_de_marca.md](./brand/manual_de_marca.md)
- Tokens de color del design system: [../elenxos_design_system/src/tokens/_colors.scss](../elenxos_design_system/src/tokens/_colors.scss)

## Sistema visual vigente

### Elenxos

- Fondo principal: `#0F2519`
- Logo principal de plataforma: isotipo dorado `#C6A64A` sobre fondo negro o blanco
- Acento principal: `#A3E4D7` y `#7FFFD4`
- Acento secundario: `#C73030`
- Neutros: `#3A3F41`, `#1E2224`, blanco
- Tipografia de autoridad: `Playfair Display`
- Tipografia de interfaz y cuerpo: `Inter`

### Agora

Agora debe heredar el sistema de Elenxos, pero hablar mas desde:

- utilidad operativa
- screenshots de producto
- pruebas de flujo
- layouts mas claros y pedagogicos

No volver a abrir una tercera paleta paralela sin justificarlo.

## Inventario actual

### Ya existe

- manual de marca, logos base y MTO en `brand/`
- design system base en `../elenxos_design_system/`
- renders React ya exportados en `../elenxos_design_system/output/react/`

### Disponible hoy para usar

- logo principal listo en `logo_elenxos_principal.svg`
- lockup principal sobre negro en `logo_elenxos_principal_fondo_negro.svg`
- lockup principal sobre blanco en `logo_elenxos_principal_fondo_blanco.svg`
- PNGs directos del principal en `logo_elenxos_principal_1024.png`, `logo_elenxos_principal_fondo_negro.png` y `logo_elenxos_principal_fondo_blanco.png`
- kit de logos y banners exportables en `brand/mto/kit_logos/`
- pipeline React → PNG para piezas sociales en `../elenxos_design_system/` via `npm run render`
- lote renderizado base en `../elenxos_design_system/output/react/`
- lote operativo regenerado para salida inmediata en `../elenxos_design_system/output/redes-sociales-lote-1/`
- campañas operativas renderizadas en `entregables/campanas/`

### Entregables oficiales de campañas

Cuando se corre `../scripts/generar_campana.sh` sin filtros, el output oficial ya no cae en `output/` sino aqui:

- `entregables/campanas/campana_0_dolor/`
- `entregables/campanas/campana_1_solucion/`
- `entregables/campanas/campana_2_ecosistema/`

Cada carpeta contiene:

- `sin_ia/` y `con_ia/`
- `publicaciones/`, `flyers/`, `reels/`, `stories/`, `banners/`
- `README.md` y `manifest.json`

Regla actual del pipeline:

- 50 piezas por campaña
- 5 piezas por categoría dentro de `sin_ia/`
- 5 piezas por categoría dentro de `con_ia/`
- 10 piezas por categoría en total (`publicaciones`, `flyers`, `reels`, `stories`, `banners`)
- la corrida oficial completa genera 25 piezas editoriales y 25 piezas con IA fresca por campaña
- el slot `flyer` usa el layout cuadrado de `post` como equivalente operativo

## Faltantes reales del media kit

- isotipo y lockups horizontales/verticales
- screenshots reales del producto
- mockups por dispositivo
- plantilla de `Caso Verificado`
- foto de fundador y foto de workspace
- OG image oficial del sitio
- fondo de videollamada para demos

## Regla operativa

Antes de producir una pieza nueva:

1. revisar si ya existe un asset reutilizable
2. revisar `../02-identidad-y-marca/media-kit-estructura.md`
3. si la pieza va a salir del pipeline, revisar `../02-identidad-y-marca/automatizacion-visual.md`
4. si la pieza sera publica, dejarla registrada en este inventario o en el repo visual hermano
