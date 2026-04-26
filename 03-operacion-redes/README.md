# Operación de Redes

Este directorio concentra la ejecucion de contenido y la operacion diaria de redes.

## Documentos canonicos

- [estrategia-redes-sociales.md](./estrategia-redes-sociales.md)
  Marco general de plataformas, tension de marca y funcion comercial.
- [lote-1-publicaciones-por-plataforma.md](./lote-1-publicaciones-por-plataforma.md)
  Copy y asset sugerido por plataforma.
- [calendario-semana-1-redes.md](./calendario-semana-1-redes.md)
  Secuencia minima de ejecucion semanal.
- [protocolo-de-interaccion.md](./protocolo-de-interaccion.md)
  Rutina de engagement y salto a demo.
- [directorio-cuentas-y-estado.md](./directorio-cuentas-y-estado.md)
  Estado operativo de cuentas, bios, banners, acceso centralizado y dependencias externas.
- [mapping-ids-templates.md](./mapping-ids-templates.md)
  Puente entre IDs narrativos (`s1_*`), ejecutables (`n1_l1_*`) y de export legacy (`s1_post1`).
- [guia-configuracion-manual-redes.md](./guia-configuracion-manual-redes.md)
  Textos copy-paste exactos para configurar cada plataforma (perfil, bio, banner, primer post).

## Automatización

- Script de publicación: [`../scripts/publicar_redes.py`](../scripts/publicar_redes.py)
  Publica posts del Lote 1 vía APIs de LinkedIn, X e Instagram.
  ```bash
  python3 scripts/publicar_redes.py --listar          # ver posts disponibles
  python3 scripts/publicar_redes.py --post 1 --dry-run # preview sin publicar
  python3 scripts/publicar_redes.py --post 1 --todas   # publicar en todas
  ```
  Requiere tokens de API en `.env`. Ver docstring del script para instrucciones.

## Dependencias de identidad

La operacion no debe separarse del sistema de marca. Antes de lanzar piezas, revisa:

- [../02-identidad-y-marca/guia-estilo-y-marca-redes.md](../02-identidad-y-marca/guia-estilo-y-marca-redes.md)
- [../02-identidad-y-marca/media-kit-estructura.md](../02-identidad-y-marca/media-kit-estructura.md)
- [../02-identidad-y-marca/automatizacion-visual.md](../02-identidad-y-marca/automatizacion-visual.md)

## Regla de uso

1. Si vas a publicar esta semana: abre `lote-1-publicaciones-por-plataforma.md` + `calendario-semana-1-redes.md`.
2. Si vas a responder o mover leads: abre `protocolo-de-interaccion.md`.
3. Si vas a crear o configurar cuentas: abre `guia-configuracion-manual-redes.md`.
4. Si necesitas conectar IDs narrativos con templates renderizables: abre `mapping-ids-templates.md`.
5. Si quieres publicar vía script: `python3 scripts/publicar_redes.py --listar`.

## Relación con `06-redes-sociales/`

El directorio `06-redes-sociales/` conserva el arco narrativo largo (sistema de 8 semanas con copies y prompts por fase). No manda la ejecución real.

- **Este directorio** (`03-operacion-redes/`) tiene el copy listo para publicar, los calendarios semanales y el protocolo de interacción.
- **`06-redes-sociales/`** tiene el plan conceptual de 8 semanas con temas, copies editoriales y prompts de IA.

Ambos cubren la misma fase inicial (dolor / cercanía), pero el Lote 1 de aquí es el punto de arranque inmediato. Las Semanas 1-2 del sistema de 8 semanas amplían y complementan, no reemplazan.