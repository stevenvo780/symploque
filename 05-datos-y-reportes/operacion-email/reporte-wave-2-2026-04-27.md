# Reporte wave_2 - primer contacto

Fecha: 2026-04-27
Remitente: `ventas@elenxos.com`
Campana: `primer_contacto_wave_2`

## Estado recibido

- `wave_1` ya estaba enviada: 46 enviados, 0 fallidos.
- El aprendizaje principal fue reducir friccion en el copy: un solo bloque de links oficiales, sin CTA redundante de Agora, sin redes sociales.
- El envio debe quedar separado por campana para no mezclar trazabilidad con `primer_contacto_wave_1`.

## Plan aplicado

1. Corregir scripts para que el envio infiera la campana desde el CSV (`primer_contacto_wave_2`).
2. Exportar y sincronizar los 70 contactos email de `wave_2` como Leads en ERPNext.
3. Preparar `primer-contacto-wave-2.csv` y `lote-primer-contacto-wave-2-revision.md` con plantillas limpias.
4. Verificar antes del envio:
   - sin redes sociales
   - sin CTA duplicado de Agora
   - remitente `ventas@elenxos.com`
   - Leads en `erp_sync_status=synced`
5. Ejecutar envio real y registrar resultados.

## Resultado ERP

- Candidatos: 70
- Leads creados: 70
- Fallidos: 0
- Rango ERPNext: `CRM-LEAD-2026-00047` a `CRM-LEAD-2026-00116`
- Archivo: `05-datos-y-reportes/operacion-email/erp-leads-wave-2.csv`

## Resultado de envio

- Enviados: 70
- Fallidos: 0
- Archivo lote: `05-datos-y-reportes/operacion-email/primer-contacto-wave-2.csv`
- Revision historica: `04-mensajeria-email/lote-primer-contacto-wave-2-revision.md`
- Log: `05-datos-y-reportes/operacion-email/logs/primer-contacto-20260427-142800.csv`

## Distribucion de plantillas

- `02-primer-contacto-estandar`: 17
- `03-primer-contacto-semilleros`: 25
- `04-primer-contacto-directores`: 28

## Estado acumulado

- Enviados acumulados: 116
- Fallidos acumulados: 0
- Leads ERP acumulados: 116
- Pendientes operativos: 184
- Siguiente accion: monitorear respuestas/rebotes y hacer seguimiento el 2026-05-04.

## Criterio para wave_3

No abrir `wave_3` hasta revisar:

- respuestas recibidas
- rebotes o errores de entrega
- calidad de segmentos que respondan mejor
- necesidad de ajustar asunto/cuerpo antes de ampliar volumen
