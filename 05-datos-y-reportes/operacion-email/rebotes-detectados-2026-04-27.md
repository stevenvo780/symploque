# Rebotes detectados - 2026-04-27

Origen: INBOX de `ventas@elenxos.com` via IMAP.

## Resumen

- Envios aceptados por SMTP: 296
- Rebotes confirmados: 8
- Pendientes de respuesta/seguimiento: 288
- Copias visibles de campana en carpeta `Sent`: 296

## Rebotes

| Contact ID | Email | Campana | Diagnostico | Accion |
|---|---|---|---|---|
| `agora-legacy-029` | `luisfe.gutierrezcano@upb.edu.co` | `primer_contacto_wave_1` | `550 5.4.1 Recipient address rejected: Access denied` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-052` | `varga@javeriana.edu.co` | `primer_contacto_wave_2` | `554 5.4.14 Hop count exceeded - possible mail loop` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-056` | `m.lopeza01@javeriana.edu.co` | `primer_contacto_wave_2` | `554 5.4.14 Hop count exceeded - possible mail loop` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-059` | `maximoni.lopez@javeriana.edu.co` | `primer_contacto_wave_2` | `554 5.4.14 Hop count exceeded - possible mail loop` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-072` | `semillerosubjetividad@javeriana.edu.co` | `primer_contacto_wave_2` | `554 5.4.14 Hop count exceeded - possible mail loop` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-099` | `arturij@uninorte.edu.co` | `primer_contacto_wave_2` | `550 5.4.1` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-124` | `memontesro@unal.edu.co` | `primer_contacto_wave_3` | `Address not found: recipient address could not be found or cannot receive mail` | Verificar correo alternativo o no contactar por email |
| `agora-legacy-289` | `pmunozs@unal.edu.co` | `primer_contacto_wave_3` | `Address not found: recipient address could not be found or cannot receive mail` | Verificar correo alternativo o no contactar por email |

## Correccion aplicada

- `correos-enviados-importar.csv`: `reply_status=bounced` para los 8 casos.
- `contactos-maestro-operativo.csv`: `status=email_bounced`, `reply_status=bounced`, siguiente accion el `2026-04-28`.
- `primer-contacto-wave-1.csv`, `primer-contacto-wave-2.csv` y `primer-contacto-wave-3.csv`: `send_status=bounced` para los casos devueltos.
- `leads-agora-maestro.csv` y `leads-agora-top-50-hoy.csv`: estado historico corregido a `rebotado` donde aplica.
- Carpeta IMAP `Sent`: hay 296 copias de campana visibles; `wave_3` ya anexo copias automaticamente durante el envio.

## Causa del problema de Enviados

La Mail API envia por SMTP y devuelve exito cuando el servidor acepta el mensaje para entrega. Esa aceptacion no implica entrega final ni guarda automaticamente una copia en la carpeta IMAP `Sent`.

Correccion permanente: `scripts/enviar_lote_primer_contacto.py` ahora anexa una copia en `Sent` despues de cada envio SMTP exitoso, salvo que se use `--no-append-sent`.
