# Automatización Visual de Redes

Este archivo conecta la capa de identidad de `02-identidad-y-marca/`, la operacion de `03-operacion-redes/` y el protocolo visual que vive en `assets/`.

La regla operativa es simple:

- `assets/` define la identidad y el pipeline
- `02-identidad-y-marca/` define el criterio de marca
- `03-operacion-redes/` define que pieza sale, en que momento y para que objetivo
- la automatizacion solo arranca si esas capas estan sincronizadas

## Fuente canonica

- inventario visual: [../assets/README.md](../assets/README.md)
- manual de marca: [../assets/basic/manual_de_marca.md](../assets/basic/manual_de_marca.md)
- media kit operativo: [media-kit-estructura.md](./media-kit-estructura.md)
- calendarizacion: [../03-operacion-redes/calendario-semana-1-redes.md](../03-operacion-redes/calendario-semana-1-redes.md)
- copy por plataforma: [../03-operacion-redes/lote-1-publicaciones-por-plataforma.md](../03-operacion-redes/lote-1-publicaciones-por-plataforma.md)

## Que trajo la actualizacion grande

Los ultimos commits dejaron operativo este stack:

- kit exportable de logos, favicons y banners en `assets/basic/mto/kit_logos/`
- variantes decorativas regenerables en `assets/basic/mto/variantes/`
- registry renderizable de templates en `assets/elenxos_design_system/src/RenderPage.tsx`
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

## Salida esperada

- logos y banners: `assets/basic/mto/kit_logos/`
- variantes: `assets/basic/mto/variantes/`
- piezas renderizadas: `assets/elenxos_design_system/output/redes-sociales-lote-1/`

## Ejecucion manual por partes

Si se quiere correr por bloques:

```bash
python3 assets/basic/mto/generate_kit.py
python3 assets/basic/mto/generate_variants.py
npm --prefix assets/elenxos_design_system run render -- --template lote1_estandar,lote1_flujo,reel_manifiesto,banner_minimal --output assets/elenxos_design_system/output/redes-sociales-lote-1
```

`rsvg-convert` solo es obligatorio cuando se quiere regenerar PNGs y favicons del kit desde cero.
La primera ejecucion del renderer puede tardar mas porque Playwright instala su navegador.

## Bloqueos reales que siguen abiertos

- `Publicacion 3 / prueba de madurez` todavia requiere screenshots reales de producto y docs
- la plantilla `Caso Verificado` sigue pendiente
- el fondo de videollamada sigue pendiente

La automatizacion puede arrancar ya para identidad, perfiles y lote 1. No puede cerrar el media kit completo sin esas tres piezas.