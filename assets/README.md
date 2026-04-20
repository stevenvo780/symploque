# Assets y Media Kit

Este directorio concentra la capa visual real del emprendimiento. La regla es simple:

- `manual_de_marca.md` y los tokens del design system mandan
- los renders existentes sirven como materia prima
- lo que no exista aqui o no este inventariado no cuenta como media kit listo

## Fuente canonica de identidad

- Manual conceptual y visual: [basic/manual_de_marca.md](./basic/manual_de_marca.md)
- Tokens de color del design system: [elenxos_design_system/src/tokens/_colors.scss](./elenxos_design_system/src/tokens/_colors.scss)

## Sistema visual vigente

### Elenxos

- Fondo principal: `#0F2519`
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

- manual de marca, logos base y MTO en `basic/`
- design system base en `elenxos_design_system/`
- renders React ya exportados en `elenxos_design_system/output/react/`

### Disponible hoy para usar

- kit de logos y banners exportables en `basic/mto/kit_logos/`
- pipeline React → PNG para piezas sociales en `elenxos_design_system/` via `npm run render`
- lote renderizado base en `elenxos_design_system/output/react/`
- lote operativo regenerado para salida inmediata en `elenxos_design_system/output/redes-sociales-lote-1/`

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
2. revisar `../05-redes-sociales/media-kit-estructura.md`
3. si la pieza va a salir del pipeline, revisar `../05-redes-sociales/automatizacion-visual.md`
4. si la pieza sera publica, dejarla registrada en este inventario o en el repo visual hermano
