# Reporte wave_2 - primer contacto

Fecha: 2026-04-27
Remitente: `ventas@elenxos.com`
Campana: `primer_contacto_wave_2`

## Estado recibido

- `wave_1` ya estaba aceptada por SMTP: 46 aceptados, 1 rebote confirmado posteriormente.
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

- Aceptados por SMTP: 70
- Fallidos en API: 0
- Rebotes confirmados posteriormente: 3
- Archivo lote: `05-datos-y-reportes/operacion-email/primer-contacto-wave-2.csv`
- Revision historica: `04-mensajeria-email/lote-primer-contacto-wave-2-revision.md`
- Log: `05-datos-y-reportes/operacion-email/logs/primer-contacto-20260427-142800.csv`

## Distribucion de plantillas

- `02-primer-contacto-estandar`: 17
- `03-primer-contacto-semilleros`: 25
- `04-primer-contacto-directores`: 28

## Estado acumulado

- Aceptados por SMTP acumulados: 116
- Rebotes confirmados acumulados: 4
- Pendientes de respuesta: 112
- Leads ERP acumulados: 116
- Pendientes operativos: 184
- Siguiente accion: monitorear respuestas/rebotes y hacer seguimiento el 2026-05-04.

## Correccion posterior

El webmail no mostraba los lotes en `Sent` porque la Mail API envia por SMTP pero no anexaba copia IMAP. Se reconstruyeron 116 copias en `Sent` y el script de envio quedo actualizado para anexar copia automaticamente en futuros lotes.

## Criterio para wave_3

Este criterio se aplico y `wave_3` quedo ejecutada el 2026-04-27. Antes de abrir nuevas etapas, revisar:

- respuestas recibidas
- rebotes o errores de entrega
- calidad de segmentos que respondan mejor
- necesidad de ajustar asunto/cuerpo antes de ampliar volumen
