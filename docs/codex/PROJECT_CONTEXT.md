# symploque Project Context

## Product

- Purpose: repositorio operativo para outreach comercial de `Elenxos` y `Agora`.
- Primary users: operador comercial y agente de Codex encargado de ordenar datos, guardar Leads en ERPNext, preparar correo corporativo y ejecutar outreach con trazabilidad.
- Current focus: seguimiento post-envio de `wave_1`, `wave_2`, `wave_3`, recuperacion de rebotes y nueva prospeccion. Hay 296 Leads creados en ERPNext, 299 envios aceptados por SMTP, 15 rebotes historicos, 12 rebotes activos por recuperar, 284 contactos email pendientes de respuesta, 3 contactos por WhatsApp pendientes de asesor humano y 1 telefono pendiente.

## Architecture

- Main entrypoints:
  - `00-central/estado-actual-y-transicion.md`
  - `00-central/central-operativo-agora.md`
  - `05-datos-y-reportes/operacion-email/README.md`
  - `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv`
  - `04-mensajeria-email/README.md`
- Key modules:
  - `00-central/`: estado actual, transicion y mapa operativo
  - `01-estrategia-comercial/`: estrategia y playbooks comerciales
  - `04-mensajeria-email/`: plantillas, lotes revisables y documentacion de Mail API
  - `05-datos-y-reportes/`: base historica, maestro operativo, ERP y reportes
  - `03-operacion-redes/` y `06-redes-sociales/`: narrativa, calendario y operaciones de redes
  - `scripts/`: automatizaciones de bootstrap, auditoria, ERPNext y envio controlado
- Data stores and external services:
  - `leads-agora-maestro.csv`: 300 prospectos; 287 contactados, 12 rebotados y 1 pendiente por canal alterno
  - `contactos-maestro-operativo.csv`: 300 prospectos; 296 sincronizados con ERPNext, 284 pendientes de respuesta email, 12 rebotados, 3 contactados por canal alterno y 1 preparado por canal alterno
  - `prospeccion-publica-2026-05-01.csv`: 15 prospectos nuevos preparados para revision como `wave_4_candidate`
  - `wave-4-candidatos-2026-05-01.csv`: conversion operativa revisable, sin append al maestro y sin envio/import ERP real
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
- Preview de seguimiento:
  - `python3 scripts/enviar_lote_seguimiento.py --limit 5`
- Monitoreo readonly:
  - `python3 scripts/monitorear_inbox_operacion.py --since 2026-05-01 --limit 100`
- Preflight redes:
  - `python3 scripts/publicar_redes.py --preflight`
- Envio real:
  - `python3 scripts/enviar_lote_primer_contacto.py --send`
  - Solo con aprobacion explicita del lote revisable.

## Current State

- Remitente oficial de correos comerciales: `ventas@elenxos.com`.
- Usuario ERP operativo: `admin@elenxos.com`; contrasena como secreto local no versionado.
- `wave_1`: 46 Leads creados en ERPNext (`CRM-LEAD-2026-00001` a `CRM-LEAD-2026-00046`).
- `wave_2`: 70 Leads creados en ERPNext (`CRM-LEAD-2026-00047` a `CRM-LEAD-2026-00116`).
- `wave_3`: 180 Leads creados en ERPNext (`CRM-LEAD-2026-00117` a `CRM-LEAD-2026-00296`).
- Lote enviado: `04-mensajeria-email/lotes/lote-primer-contacto-wave-1-revision.md`.
- Lote enviado: `04-mensajeria-email/lotes/lote-primer-contacto-wave-2-revision.md`.
- Lote enviado: `04-mensajeria-email/lotes/lote-primer-contacto-wave-3-revision.md`.
- Envio real acumulado: 299 aceptados por SMTP; 15 rebotes historicos, 12 rebotes activos, 284 pendientes de respuesta; siguiente seguimiento elegible el 2026-05-04 para 281 contactos, excluyendo las 3 recuperaciones hasta el 2026-05-07.
- Carpeta IMAP `Sent`: 299 copias de campana visibles; futuros envios anexan copia automaticamente.
- Seguimiento 2026-05-04: `scripts/preparar_lote_seguimiento.py` genera 281 elegibles en `seguimiento-2026-05-04.csv` y preview revisable en `04-mensajeria-email/lotes/lote-seguimiento-2026-05-04-revision.md`.
- Envio de seguimiento: `scripts/enviar_lote_seguimiento.py` hace preview por defecto, valida contra maestro, evita duplicados por campana y bloquea `--send` antes del 2026-05-04.
- Seguimiento recuperaciones 2026-05-07: mini-lote separado para los 3 correos recuperados, con `--allowed-campaign recuperacion_rebote_2026_04_30`.
- Wave 4 candidata: `scripts/preparar_wave4_desde_prospeccion.py` genera 15 candidatos, export ERPNext manual y borradores personalizados en `04-mensajeria-email/lotes/lote-primer-contacto-wave-4-candidatos-2026-05-01.md`; `scripts/promover_wave4_candidatos.py` promueve al maestro solo con `--apply` y despues de aprobacion.
- Redes: `scripts/publicar_redes.py --preflight` valida assets/tokens y mantiene bloqueadas publicaciones por API mientras falten credenciales, URL LinkedIn confirmada o handle X.
- Auditoria de mensajeria confirma UdeA/Universidad de Antioquia, ausencia de redes sociales, ausencia de CTA duplicado y sitios oficiales Elenxos/Agora.

## Constraints

- No guardar secretos en markdown, CSV ni scripts.
- No abrir nuevas etapas sin revisar respuestas, rebotes y aprendizajes de `wave_1`, `wave_2` y `wave_3`.
- Registrar cada envio real en `correos-enviados-importar.csv` y `contactos-maestro-operativo.csv`.
- Mantener `declaracion-pendientes.csv` y `disculpa-error-pendientes.csv` vacios salvo evidencia real de contacto previo.
