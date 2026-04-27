# Reporte wave_3 - primer contacto

Fecha: 2026-04-27
Remitente: `ventas@elenxos.com`
Campana: `primer_contacto_wave_3`

## Ajustes aplicados

- Se corrigio la credencial ERP local sin versionar secretos.
- Se agregaron reintentos cortos y pausa configurable al script de envio.
- Se corrigio la clasificacion de plantillas para que "Departamento de..." no fuerce plantilla de directores cuando el destinatario es profesor.
- Se automatizo la reconciliacion del maestro legacy despues de envios reales.
- Se mejoro el parser de rebotes para capturar `Address not found` de Gmail.

## Resultado ERP

- Candidatos: 180
- Leads creados: 180
- Fallidos: 0
- Rango ERPNext: `CRM-LEAD-2026-00117` a `CRM-LEAD-2026-00296`
- Archivo: `05-datos-y-reportes/operacion-email/erp-leads-wave-3.csv`

## Resultado de envio

- Aceptados por SMTP: 180
- Fallidos en API: 0
- Copias anexadas a IMAP `Sent`: 180
- Rebotes confirmados inmediatos: 1
- Pendientes de respuesta de `wave_3`: 179
- Archivo lote: `05-datos-y-reportes/operacion-email/primer-contacto-wave-3.csv`
- Revision historica: `04-mensajeria-email/lote-primer-contacto-wave-3-revision.md`
- Log: `05-datos-y-reportes/operacion-email/logs/primer-contacto-20260427-155159.csv`

## Distribucion de plantillas

- `02-primer-contacto-estandar`: 180

## Rebote de wave_3

| Contact ID | Email | Diagnostico | Accion |
|---|---|---|---|
| `agora-legacy-124` | `memontesro@unal.edu.co` | `Address not found: recipient address could not be found or cannot receive mail` | Verificar correo alternativo o no contactar por email |

## Estado acumulado

- Aceptados por SMTP acumulados: 296
- Rebotes confirmados acumulados: 5
- Pendientes de respuesta: 291
- Leads ERP acumulados: 296
- Pendientes sin email valido: 4
- IMAP `Sent`: 297 mensajes totales, incluyendo 296 copias de campana y 1 prueba interna.
- Siguiente accion: monitorear respuestas/rebotes; seguimiento a pendientes el 2026-05-04.
