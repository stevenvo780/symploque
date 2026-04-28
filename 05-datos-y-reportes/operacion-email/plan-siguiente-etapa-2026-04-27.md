# Plan siguiente etapa - operacion email

Fecha: 2026-04-27

## Estado base

- Enviados aceptados por SMTP: 296
- Rebotes confirmados: 8
- Pendientes de respuesta: 288
- Leads creados en ERPNext: 296
- Pendientes sin email valido: 4
- Rebote acumulado inicial: 2.70%

## Prioridad comercial

Maximizar conversion ahora no es enviar mas a la misma base: ya se contacto todo contacto con email valido. La prioridad es capturar respuestas, reducir perdida por rebote y preparar seguimiento rapido a los que no contesten.

## Proximas acciones

1. Monitorear INBOX de `ventas@elenxos.com` varias veces el 2026-04-27 y 2026-04-28.
2. Ejecutar `scripts/sincronizar_rebotes_imap.py` despues de cada revision de correo.
3. Responder manualmente en menos de 2 horas a cualquier senal positiva.
4. Verificar correo alternativo para los 8 rebotados el 2026-04-28.
5. Enriquecer o descartar los 4 pendientes sin email valido.
6. Preparar seguimiento corto para los 288 pendientes si no responden antes del 2026-05-04.

## Segmentos para seguimiento

- `wave_1`: 45 pendientes de respuesta, 1 rebote.
- `wave_2`: 65 pendientes de respuesta, 5 rebotes.
- `wave_3`: 178 pendientes de respuesta, 2 rebotes.

## Guardrails

- No reenviar a rebotados sin correo alternativo verificado.
- No abrir una nueva tanda externa sin revisar respuestas y rebotes de las 24 horas posteriores.
- Mantener CTA a `https://agora.elenxos.com/` y firma con sitios oficiales `www.elenxos.com` / `agora.elenxos.com`.
- Mantener mencion UdeA/Universidad de Antioquia en plantillas de primer contacto.
