# Estado de operacion email / ERP

Fecha de corte: 2026-04-27

## Diagnostico

La operacion tenia una contradiccion: 29 filas figuraban como contactadas y alimentaban colas de declaracion/disculpa, pero la instruccion operativa vigente confirma que no se ha contactado a nadie. Se reinicio la capa operativa como lanzamiento fresco.

## Resultado

| Archivo | Estado |
|---|---|
| `leads-agora-maestro.csv` | 116 contactados, 184 pendientes |
| `leads-agora-top-50-hoy.csv` | 46 contactados, 4 pendientes sin email |
| `contactos-maestro-operativo.csv` | 116 con primer contacto enviado, 184 pendientes |
| `correos-enviados-importar.csv` | 116 envios reales |
| `declaracion-pendientes.csv` | 0 filas |
| `disculpa-error-pendientes.csv` | 0 filas |
| `erp-leads-wave-1.csv` | 46 Leads creados en ERP |
| `erp-leads-wave-2.csv` | 70 Leads creados en ERP |
| `primer-contacto-wave-1.csv` | 46 correos enviados |
| `primer-contacto-wave-2.csv` | 70 correos enviados |

Backup previo generado por la maquina:

```text
05-datos-y-reportes/operacion-email/backups/fresh-launch-reset-20260426-234204
```

## Primer lote ejecutado

La operacion siguio la secuencia definida: primero guardar contactos efectivos en ERPNext como `Lead`; despues enviar primer contacto corporativo.

- Lote: `wave_1`
- Candidatos totales: 50
- Candidatos con email: 46
- Estado local: `erp_sync_status=synced`
- Archivo de importacion: `05-datos-y-reportes/operacion-email/erp-leads-wave-1.csv`
- Envio real: 46 enviados, 0 fallidos
- Remitente: `ventas@elenxos.com`
- Siguiente accion: seguimiento si no responden el 2026-05-04

## Segundo lote ejecutado

Se aplico lo aprendido del primer lote: enlaces sin redundancia, sin redes sociales, sitios oficiales de Elenxos/Agora y campana separada como `primer_contacto_wave_2`.

- Lote: `wave_2`
- Candidatos totales: 70
- Candidatos con email: 70
- Estado local: `erp_sync_status=synced`
- Archivo de importacion: `05-datos-y-reportes/operacion-email/erp-leads-wave-2.csv`
- Distribucion de plantillas:
  - `02-primer-contacto-estandar`: 17
  - `03-primer-contacto-semilleros`: 25
  - `04-primer-contacto-directores`: 28
- Envio real: 70 enviados, 0 fallidos
- Remitente: `ventas@elenxos.com`
- Siguiente accion: seguimiento si no responden el 2026-05-04

## ERP

El usuario operativo registrado es `admin@elenxos.com`. La contrasena no se versiona; vive como secreto local.

El push directo por login ERPNext se ejecuto correctamente:

- Leads creados: 46
- Rango ERP: `CRM-LEAD-2026-00001` a `CRM-LEAD-2026-00046`
- Fallidos: 0

El segundo push directo por login ERPNext tambien se ejecuto correctamente:

- Leads creados: 70
- Rango ERP: `CRM-LEAD-2026-00047` a `CRM-LEAD-2026-00116`
- Fallidos: 0

## Conectividad CRM

El endpoint publico de Frappe respondio correctamente:

```json
{"message":"pong"}
```

La barrera no es conectividad, sino autenticacion para crear registros.

## Ejecucion adicional

- Se preparo y envio el lote de primer contacto `wave_1`.
- CSV: `05-datos-y-reportes/operacion-email/primer-contacto-wave-1.csv`
- Revision: `04-mensajeria-email/lote-primer-contacto-wave-1-revision.md`
- Distribucion de plantillas:
  - `02-primer-contacto-estandar`: 26
  - `03-primer-contacto-semilleros`: 4
  - `04-primer-contacto-directores`: 16
- Remitente previsto: `ventas@elenxos.com`
- Mail API probado con envio interno seguro desde `ventas@elenxos.com`: OK (`Email sent`).
- Script de envio controlado creado: `scripts/enviar_lote_primer_contacto.py`.
- Auditoria de mensajeria: OK, confirma UdeA/Universidad de Antioquia en las 3 plantillas y en la revision del lote.
- Limpieza de enlaces: OK, sin redes sociales; solo sitios oficiales `www.elenxos.com` y `agora.elenxos.com`.
- Preview de envio real verificado: sin bloqueos ERP.
- Envio real ejecutado: 46 enviados, 0 fallidos.
- Se preparo y envio el lote de primer contacto `wave_2`.
- CSV: `05-datos-y-reportes/operacion-email/primer-contacto-wave-2.csv`
- Revision: `04-mensajeria-email/lote-primer-contacto-wave-2-revision.md`
- Preview de envio real verificado: sin bloqueos ERP.
- Envio real `wave_2` ejecutado: 70 enviados, 0 fallidos.
- Envio acumulado: 116 enviados, 0 fallidos.
