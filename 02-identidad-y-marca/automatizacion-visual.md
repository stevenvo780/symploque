# Automatización Visual de Redes

Este archivo conecta la capa de identidad de `02-identidad-y-marca/`, la operacion de `03-operacion-redes/`, los assets que viven en `assets/` y el renderer que vive en `../elenxos_design_system/`.

La regla operativa es simple:

- `assets/` define la identidad y el pipeline
- `elenxos_design_system/` renderiza las piezas ejecutables
- `02-identidad-y-marca/` define el criterio de marca
- `03-operacion-redes/` define que pieza sale, en que momento y para que objetivo
- la automatizacion solo arranca si esas capas estan sincronizadas

## Fuente canonica

- inventario visual: [../assets/README.md](../assets/README.md)
- manual de marca: [../assets/brand/manual_de_marca.md](../assets/brand/manual_de_marca.md)
- renderer y templates: [../elenxos_design_system/src/templates/registry.ts](../elenxos_design_system/src/templates/registry.ts)
- media kit operativo: [media-kit-estructura.md](./media-kit-estructura.md)
- calendarizacion: [../03-operacion-redes/calendario-semana-1-redes.md](../03-operacion-redes/calendario-semana-1-redes.md)
- copy por plataforma: [../03-operacion-redes/lote-1-publicaciones-por-plataforma.md](../03-operacion-redes/lote-1-publicaciones-por-plataforma.md)

## Regla para no mezclar sistemas

- `03-operacion-redes/` manda la ejecucion semanal real.
- `06-redes-sociales/` conserva el arco estrategico de 8 semanas y usa IDs narrativos tipo `s1_*`.
- `elenxos_design_system/` renderiza con IDs ejecutables tipo `n1_l1_*`, `n2_l3_*` y plantillas standalone.
- `assets/scripts/generate_hybrid.py` usa una tercera capa de IDs de exportacion (`s1_post1`, `s2_post1`, etc.), asi que hoy debe tratarse como puente legacy hasta unificar el mapping.

## Que trajo la actualizacion grande

Los ultimos commits dejaron operativo este stack:

- kit exportable de logos, favicons y banners en `assets/brand/mto/kit_logos/`
- variantes decorativas regenerables en `assets/brand/mto/variantes/`
- registry renderizable de templates en `../elenxos_design_system/src/RenderPage.tsx`
- templates concretos de arranque para redes en `lote1_estandar`, `lote1_flujo`, `reel_manifiesto` y `banner_minimal`

## Mapa operativo del lote 1

| Frente | Pieza | Asset canonico | Estado |
| :--- | :--- | :--- | :--- |
| Perfil LinkedIn Elenxos | Foto de perfil | `logo_kodama_512.png` o `logo_white_512.png` | listo |
| Perfil LinkedIn Elenxos | Banner corporativo | `banner_main.png` o `banner_minimal.png` | listo |
| Perfil Instagram Agora | Foto de perfil | `logo_kodama_512.png` | listo |
| Perfil Instagram Agora | Banner o media kit de apoyo | `banner_agora.png` | listo |
| LinkedIn Publicacion 1 | tesis de marca | `lote1_estandar` | listo |
| LinkedIn Publicacion 2 | diferenciador real | `lote1_flujo` | listo |
| LinkedIn Publicacion 3 | prueba de madurez | collage con screenshots reales | parcial |
| Instagram Carrusel 1 | portada del problema | `lote1_estandar` | listo |
| Instagram Reel 1 | pieza vertical de arranque | `reel_manifiesto` | listo |
| Instagram Carrusel 2 | portada de flujo | `lote1_flujo` | listo |
| X / teasers | banner o imagen de apoyo | `banner_minimal` o `lote1_estandar` | listo |

## Comando unico de arranque

Desde la raiz del repo:

```bash
./scripts/iniciar_automatizacion_redes.sh
```

Ese script hace tres cosas:

1. regenera logos, favicons y banners del kit
2. regenera variantes decorativas
3. renderiza el paquete minimo del lote 1 en PNG

Si `rsvg-convert` no esta instalado, el script no bloquea el arranque: conserva el kit existente y sigue con el render de piezas React.
En la primera corrida, el script tambien descarga Chromium para Playwright si todavia no existe en la maquina.

## Comando unico para campañas

Cuando el objetivo no es solo el lote 1 sino producir el paquete operativo completo, el punto de entrada simple es:

```bash
./scripts/generar_campana.sh
```

Ejemplos utiles:

```bash
./scripts/generar_campana.sh --skip-video
./scripts/generar_campana.sh --narrativa dolor
./scripts/generar_campana.sh --legacy --lote 1
./scripts/generar_campana.sh --narrativa solucion --video-duration 6
```

Ese comando delega en `elenxos_design_system/scripts/generate-campaign.ts` y ahora deja el entregable oficial dentro de `assets/`:

- `assets/entregables/campanas/campana_0_dolor/`
- `assets/entregables/campanas/campana_1_solucion/`
- `assets/entregables/campanas/campana_2_ecosistema/`

Cada campaña queda estructurada asi:

- `sin_ia/` y `con_ia/`
- `publicaciones/`, `flyers/`, `reels/`, `stories/`, `banners/`
- `README.md` y `manifest.json`

Regla fija del pipeline por campaña:

- 50 piezas totales
- 5 piezas por categoría dentro de `sin_ia/`
- 5 piezas por categoría dentro de `con_ia/`
- 10 piezas por categoría en total (`publicaciones`, `flyers`, `reels`, `stories`, `banners`)
- la corrida oficial completa genera 25 piezas editoriales y 25 piezas con IA fresca
- reels y stories exportan PNG preview y MP4
- `flyers/` usa el layout cuadrado de `post` porque el renderer todavia no tiene un formato flyer dedicado

Si se usa un filtro puntual (`--narrativa`, `--lote`, `--tipo` o `--legacy`), la salida cae en `assets/entregables/campanas/selecciones/`.

## Salida esperada

- logos y banners: `assets/brand/mto/kit_logos/`
- variantes: `assets/brand/mto/variantes/`
- campañas oficiales: `assets/entregables/campanas/`
- selecciones puntuales filtradas: `assets/entregables/campanas/selecciones/`

## Ejecucion manual por partes

Si se quiere correr por bloques:

```bash
python3 assets/brand/mto/generate_kit.py
python3 assets/brand/mto/generate_variants.py
npm --prefix elenxos_design_system run render -- --template lote1_estandar,lote1_flujo,reel_manifiesto,banner_minimal --output ./output/redes-sociales-lote-1
```

`rsvg-convert` solo es obligatorio cuando se quiere regenerar PNGs y favicons del kit desde cero.
La primera ejecucion del renderer puede tardar mas porque Playwright instala su navegador.

## Bloqueos reales que siguen abiertos

- `Publicacion 3 / prueba de madurez` todavia requiere screenshots reales de producto y docs
- la plantilla `Caso Verificado` sigue pendiente
- el fondo de videollamada sigue pendiente

La automatizacion puede arrancar ya para identidad, perfiles y lote 1. No puede cerrar el media kit completo sin esas tres piezas.