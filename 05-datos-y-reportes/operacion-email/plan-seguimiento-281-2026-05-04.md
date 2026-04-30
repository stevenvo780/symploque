# Plan de seguimiento 281 pendientes - 2026-05-04

> Estado: preparado. No se debe ejecutar antes de revisar respuestas y rebotes el 2026-05-04.

- Preview de mensajes: `04-mensajeria-email/preview-seguimiento-281-2026-05-04.md`
- Base operativa: `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv`
- Contactos elegibles actuales: 281 pendientes de respuesta
- Contactos excluidos: 15 rebotados, 4 por canal alterno, cualquier respuesta humana nueva

## Objetivo

Convertir contactos silenciosos en conversaciones utiles, demos o pilotos sin saturar la base ni mezclar casos rebotados con casos pendientes.

## Criterio de elegibilidad

Un contacto entra al seguimiento si cumple todo esto:

- `status=first_contact_sent`
- `reply_status=pending`
- `next_action_date=2026-05-04`
- `last_campaign` pertenece a `primer_contacto_wave_1`, `primer_contacto_wave_2` o `primer_contacto_wave_3`
- no aparece como rebotado en `rebotes-detectados-2026-04-27.csv`
- no tiene respuesta humana nueva registrada

## Orden de trabajo

1. Revisar INBOX de `ventas@elenxos.com`.
2. Sincronizar rebotes si entraron nuevos.
3. Recalcular elegibles.
4. Generar lote final de seguimiento.
5. Revisar preview pequeno.
6. Enviar solo con autorizacion explicita.
7. Registrar resultado y proxima accion.

## Distribucion actual

| Wave | Pendientes | Rebotes |
|---|---:|---:|
| `wave_1` | 45 | 1 |
| `wave_2` | 62 | 8 |
| `wave_3` | 174 | 6 |
| Total | 281 | 15 |

## Reglas comerciales

- El seguimiento debe sonar como recordatorio breve, no como presion.
- Mantener origen UdeA/Elenxos y sitios oficiales.
- CTA unico: demo breve o caso piloto.
- No incluir redes sociales.
- No enviar a rebotados sin correo corregido y revision manual.
- No enviar a contactos de canal alterno por email si no existe correo valido.

## Siguiente decision requerida antes de ejecutar

El 2026-05-04, despues de revisar INBOX/rebotes, decidir si el seguimiento se envia:

- por wave completa,
- por segmento de mayor prioridad,
- o por lote pequeno inicial para medir respuesta.
