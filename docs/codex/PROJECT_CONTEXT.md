# symploque Project Context

## Product

- Purpose: repositorio operativo para outreach comercial de `Elenxos` y `Agora`.
- Primary users: operador comercial y agente de Codex encargado de ordenar datos, guardar Leads en ERPNext, preparar correo corporativo y ejecutar outreach con trazabilidad.
- Current focus: seguimiento post-envio de `wave_1`, `wave_2` y `wave_3`. Hay 296 Leads creados en ERPNext, 296 envios aceptados por SMTP, 8 rebotes confirmados, 288 contactos pendientes de respuesta y 4 prospectos preparados por canal alterno.

## Architecture

- Main entrypoints:
  - `00-central/estado-actual-y-transicion.md`
  - `00-central/central-operativo-agora.md`
  - `05-datos-y-reportes/operacion-email/README.md`
  - `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv`
  - `04-mensajeria-email/email.md`
- Key modules:
  - `00-central/`: estado actual, transicion y mapa operativo
  - `01-estrategia-comercial/`: estrategia y playbooks comerciales
  - `04-mensajeria-email/`: plantillas, lotes revisables y documentacion de Mail API
  - `05-datos-y-reportes/`: base historica, maestro operativo, ERP y reportes
  - `03-operacion-redes/` y `06-redes-sociales/`: narrativa, calendario y operaciones de redes
  - `scripts/`: automatizaciones de bootstrap, auditoria, ERPNext y envio controlado
- Data stores and external services:
  - `leads-agora-maestro.csv`: 300 prospectos; 288 contactados, 8 rebotados y 4 pendientes por canal alterno
  - `contactos-maestro-operativo.csv`: 300 prospectos; 296 sincronizados con ERPNext, 288 pendientes de respuesta, 8 rebotados y 4 preparados por canal alterno
  - ERP/CRM: `https://crm.proxy.humanizar-dev.cloud`
  - Mail API: `https://mailapi.proxy.humanizar-dev.cloud`
  - sitio corporativo: `https://www.elenxos.com/`
  - producto Agora: `https://agora.elenxos.com/`

## Local Commands

- Auditoria:
  - `python3 scripts/auditar_operacion_email.py --fail-on-blockers`
- Exportar o sincronizar Leads ERP:
  - `python3 scripts/erpnext_importar_contactos.py --push --yes`
- Preparar lote de primer contacto:
  - `python3 scripts/preparar_lote_primer_contacto.py`
- Preview de envio:
  - `python3 scripts/enviar_lote_primer_contacto.py --limit 3`
- Envio real:
  - `python3 scripts/enviar_lote_primer_contacto.py --send`
  - Solo con aprobacion explicita del lote revisable.

## Current State

- Remitente oficial de correos comerciales: `ventas@elenxos.com`.
- Usuario ERP operativo: `admin@elenxos.com`; contrasena como secreto local no versionado.
- `wave_1`: 46 Leads creados en ERPNext (`CRM-LEAD-2026-00001` a `CRM-LEAD-2026-00046`).
- `wave_2`: 70 Leads creados en ERPNext (`CRM-LEAD-2026-00047` a `CRM-LEAD-2026-00116`).
- `wave_3`: 180 Leads creados en ERPNext (`CRM-LEAD-2026-00117` a `CRM-LEAD-2026-00296`).
- Lote enviado: `04-mensajeria-email/lote-primer-contacto-wave-1-revision.md`.
- Lote enviado: `04-mensajeria-email/lote-primer-contacto-wave-2-revision.md`.
- Lote enviado: `04-mensajeria-email/lote-primer-contacto-wave-3-revision.md`.
- Envio real acumulado: 296 aceptados por SMTP; 8 rebotados, 288 pendientes de respuesta; siguiente seguimiento el 2026-05-04.
- Carpeta IMAP `Sent`: 296 copias de campana visibles; futuros envios anexan copia automaticamente.
- Auditoria de mensajeria confirma UdeA/Universidad de Antioquia, ausencia de redes sociales, ausencia de CTA duplicado y sitios oficiales Elenxos/Agora.

## Constraints

- No guardar secretos en markdown, CSV ni scripts.
- No abrir nuevas etapas sin revisar respuestas, rebotes y aprendizajes de `wave_1`, `wave_2` y `wave_3`.
- Registrar cada envio real en `correos-enviados-importar.csv` y `contactos-maestro-operativo.csv`.
- Mantener `declaracion-pendientes.csv` y `disculpa-error-pendientes.csv` vacios salvo evidencia real de contacto previo.
