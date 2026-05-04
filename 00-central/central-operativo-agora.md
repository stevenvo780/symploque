# Central operativo Agora

Fecha de actualizacion: 2026-05-04

Este es el punto de entrada del repo. Su funcion es decir que esta activo,
que es historico y donde actuar sin abrir veinte archivos.

## Lectura rapida

1. [Mensajeria email](../04-mensajeria-email/README.md)
2. [Operacion email y ERP](../05-datos-y-reportes/operacion-email/README.md)
3. [Acciones siguientes](../docs/codex/NEXT_ACTIONS.md)
4. [Operacion redes](../03-operacion-redes/README.md)
5. [Identidad y marca](../02-identidad-y-marca/README.md)

## Estado actual

- Producto objetivo: `Agora`.
- Marca corporativa: `Elenxos`.
- Sitios publicos activos:
  - `https://www.elenxos.com/`
  - `https://agora.elenxos.com/`
- Objetivo comercial inicial: 100 clientes en 3 meses.
- Base inicial: 300 prospectos historicos, 296 Leads sincronizados en ERPNext.
- Envios aceptados por SMTP: 299.
- Rebotes historicos confirmados: 15.
- Pendientes email: 284.
- Canal alterno: 3 WhatsApp registrados y 1 llamada Javeriana pendiente.
- `wave_4`: candidato revisable; no importar a ERP ni enviar sin aprobacion.

## Prioridad inmediata

1. Revisar INBOX y rebotes antes de enviar seguimiento.
2. Ejecutar el runbook:
   [runbook-seguimiento-2026-05-04.md](../05-datos-y-reportes/operacion-email/runbooks/runbook-seguimiento-2026-05-04.md).
3. Si no hay bloqueadores, revisar el lote:
   [lote-seguimiento-2026-05-04-revision.md](../04-mensajeria-email/lotes/lote-seguimiento-2026-05-04-revision.md).
4. Enviar solo con script controlado y aprobacion explicita.
5. Registrar resultados antes de abrir `wave_4`.

## Documentos canonicos

- [agente.md](./agente.md): brief consolidado del agente.
- [estado-actual-y-transicion.md](./estado-actual-y-transicion.md): separacion
  Elenxos / Agora y reglas de transicion.
- [plan-transicion-remitente-y-sitios-publicos.md](./plan-transicion-remitente-y-sitios-publicos.md):
  criterio de remitente, sitios y salida publica.
- [04-mensajeria-email/README.md](../04-mensajeria-email/README.md): plantillas,
  lotes, previews y canal alterno.
- [05-datos-y-reportes/operacion-email/README.md](../05-datos-y-reportes/operacion-email/README.md):
  CSVs vivos, runbooks, reportes y comandos.
- [03-operacion-redes/README.md](../03-operacion-redes/README.md): ejecucion de redes.
- [docs/erpnext-erp-crm.md](../docs/erpnext-erp-crm.md): infraestructura ERP/CRM.

## Que es historico

- Los lotes completos de `wave_1`, `wave_2` y `wave_3` estan en
  [`04-mensajeria-email/lotes`](../04-mensajeria-email/lotes).
- Los previews exploratorios estan en
  [`04-mensajeria-email/previews`](../04-mensajeria-email/previews).
- Los cortes narrativos de operacion email estan en
  [`05-datos-y-reportes/operacion-email/reportes`](../05-datos-y-reportes/operacion-email/reportes).
- Los planes y runbooks fechados estan en
  [`05-datos-y-reportes/operacion-email/runbooks`](../05-datos-y-reportes/operacion-email/runbooks).

## Regla operativa

Para cualquier nueva accion comercial:

1. Auditar datos y plantillas.
2. Confirmar que el Lead existe o queda listo para ERPNext.
3. Revisar el lote Markdown.
4. Enviar con script, no manualmente desde un documento.
5. Actualizar maestro, log de enviados, CSV del lote y reporte.

Si un documento no esta enlazado desde este archivo, desde el `README` de su
directorio o desde `docs/codex/NEXT_ACTIONS.md`, tratarlo como soporte historico.
