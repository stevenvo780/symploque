# Plan siguiente etapa - operacion email

Fecha: 2026-04-27

## Estado base

- Enviados aceptados por SMTP: 296
- Rebotes confirmados al 2026-04-29: 15
- Pendientes de respuesta al 2026-04-29: 281
- Leads creados en ERPNext: 296
- Pendientes sin email valido: 4
- Rebote acumulado actualizado: 5.07%

## Prioridad comercial

Maximizar conversion ahora no es enviar mas a la misma base: ya se contacto todo contacto con email valido. La prioridad es capturar respuestas, reducir perdida por rebote y preparar seguimiento rapido a los que no contesten.

## Proximas acciones

1. Monitorear INBOX de `ventas@elenxos.com` varias veces el 2026-04-27 y 2026-04-28.
2. Ejecutar `scripts/sincronizar_rebotes_imap.py` despues de cada revision de correo.
3. Responder manualmente en menos de 2 horas a cualquier senal positiva.
4. Verificar correo alternativo para los 15 rebotados antes de cualquier reenvio.
5. Enriquecer o descartar los 4 pendientes sin email valido.
6. Preparar seguimiento corto para los 281 pendientes si no responden antes del 2026-05-04.

## Segmentos para seguimiento

- `wave_1`: 45 pendientes de respuesta, 1 rebote.
- `wave_2`: 62 pendientes de respuesta, 8 rebotes.
- `wave_3`: 174 pendientes de respuesta, 6 rebotes.

## Guardrails

- No reenviar a rebotados sin correo alternativo verificado.
- No abrir una nueva tanda externa sin revisar respuestas y rebotes de las 24 horas posteriores.
- Mantener CTA a `https://agora.elenxos.com/` y firma con sitios oficiales `www.elenxos.com` / `agora.elenxos.com`.
- Mantener mencion UdeA/Universidad de Antioquia en plantillas de primer contacto.
