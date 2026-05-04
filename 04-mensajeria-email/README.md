# Mensajeria email

Este directorio contiene la capa de mensajes: plantillas, revisiones de lotes,
previews y canal alterno. Los datos operativos viven en
[`05-datos-y-reportes/operacion-email`](../05-datos-y-reportes/operacion-email/README.md).

## Lectura rapida

1. [`email.md`](./email.md): Mail API, remitente, variables y reglas de envio.
2. [`02-primer-contacto-estandar.md`](./02-primer-contacto-estandar.md),
   [`03-primer-contacto-semilleros.md`](./03-primer-contacto-semilleros.md) y
   [`04-primer-contacto-directores.md`](./04-primer-contacto-directores.md):
   plantillas activas de primer contacto.
3. [`05-seguimiento-corto.md`](./05-seguimiento-corto.md): plantilla base de seguimiento.
4. [`lotes/`](./lotes/): revisiones completas generadas por scripts.
5. [`canal-alterno/`](./canal-alterno/): WhatsApp, llamada y protocolo para bots o asesores.

## Estructura

- `01-*.md` a `06-*.md`: plantillas fuente. Se quedan en esta raiz porque los
  scripts las leen directamente.
- `email.md`: referencia tecnica de Mail API y guardrails del remitente.
- `lotes/`: artefactos revisables antes o despues de enviar. Incluye waves 1-4,
  disculpa y seguimientos.
- `previews/`: borradores exploratorios o historicos que no son el lote final.
- `canal-alterno/`: documentos para WhatsApp, llamada Javeriana y protocolo de bots.

## Estado operativo

- `wave_1`, `wave_2` y `wave_3` ya fueron enviadas por primer contacto desde
  `ventas@elenxos.com`.
- El seguimiento general del 2026-05-04 esta en
  [`lotes/lote-seguimiento-2026-05-04-revision.md`](./lotes/lote-seguimiento-2026-05-04-revision.md).
- El seguimiento separado de recuperaciones del 2026-05-07 esta en
  [`lotes/lote-seguimiento-recuperacion-2026-05-07-revision.md`](./lotes/lote-seguimiento-recuperacion-2026-05-07-revision.md).
- `wave_4` sigue como candidato revisable; no importar a ERP ni enviar sin
  aprobacion explicita:
  [`lotes/lote-primer-contacto-wave-4-candidatos-2026-05-01.md`](./lotes/lote-primer-contacto-wave-4-candidatos-2026-05-01.md).
- Canal alterno pendiente:
  [`canal-alterno/guion-llamada-javeriana-catedra-unesco-2026-05-04.md`](./canal-alterno/guion-llamada-javeriana-catedra-unesco-2026-05-04.md).

## Regla de uso

No enviar correo desde un Markdown suelto. El flujo correcto es:

1. Revisar el runbook en
   [`05-datos-y-reportes/operacion-email/runbooks`](../05-datos-y-reportes/operacion-email/runbooks).
2. Auditar datos y plantillas con `python3 scripts/auditar_operacion_email.py --fail-on-blockers`.
3. Generar o revisar el CSV operativo en
   [`05-datos-y-reportes/operacion-email`](../05-datos-y-reportes/operacion-email/README.md).
4. Revisar el lote Markdown en `lotes/`.
5. Enviar solo con el script correspondiente y autorizacion explicita.
