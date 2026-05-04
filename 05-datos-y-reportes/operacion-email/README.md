# Operacion email y ERP

Este directorio es la verdad operativa de datos para email, ERPNext y
seguimiento comercial. La capa de copy y revisiones de mensajes vive en
[`04-mensajeria-email`](../../04-mensajeria-email/README.md).

Fecha de lectura: 2026-05-04.

## Entrada rapida

1. [`contactos-maestro-operativo.csv`](./contactos-maestro-operativo.csv): maestro
   operativo para scripts, ERP y estado de contacto.
2. [`correos-enviados-importar.csv`](./correos-enviados-importar.csv): log
   acumulado de envios aceptados por SMTP.
3. [`seguimiento-2026-05-04.csv`](./seguimiento-2026-05-04.csv): lote elegible
   de seguimiento general.
4. [`runbooks/runbook-seguimiento-2026-05-04.md`](./runbooks/runbook-seguimiento-2026-05-04.md):
   orden de ejecucion para seguimiento, rebotes y canal alterno.
5. [`reportes/revision-post-analisis-2026-05-01.md`](./reportes/revision-post-analisis-2026-05-01.md):
   ultimo corte narrativo antes del seguimiento.

## Estado actual

- `wave_1`, `wave_2` y `wave_3` ya fueron contactadas por primer correo
  corporativo el 2026-04-27.
- Hay 300 prospectos operativos; 296 quedaron como Leads en ERPNext.
- SMTP acepto 299 envios de campana: 296 primeros contactos y 3 recuperaciones
  de rebotes.
- Rebotes historicos confirmados: 15. Rebotes activos por recuperar: 12.
- Pendientes de respuesta email: 284.
- Canal alterno: 3 WhatsApp enviados y registrados; 1 llamada directa pendiente.
- `wave_4` esta preparado como paquete candidato revisable, sin importar a ERP
  ni enviar hasta aprobacion explicita.

## Estructura

- CSVs en la raiz: archivos vivos que leen o escriben los scripts.
- `runbooks/`: pasos de ejecucion y planes fechados.
- `reportes/`: cortes historicos, revisiones post-analisis, rebotes y monitoreo.
- `logs/`: resultados tecnicos de envios ejecutados.

## CSVs vivos

- `contactos-maestro-operativo.csv`: fuente primaria de estado.
- `correos-enviados-importar.csv`: bitacora acumulada de envios.
- `primer-contacto-wave-1.csv`, `primer-contacto-wave-2.csv`,
  `primer-contacto-wave-3.csv`: lotes ya ejecutados.
- `seguimiento-2026-05-04.csv`: seguimiento general.
- `seguimiento-recuperacion-2026-05-07.csv`: seguimiento separado para
  recuperaciones.
- `wave-4-candidatos-2026-05-01.csv`,
  `erp-leads-wave-4-candidatos-2026-05-01.csv` y
  `primer-contacto-wave-4-candidatos-2026-05-01.csv`: paquete candidato.
- `registro-canal-alterno-2026-04-30.csv`: WhatsApp y llamada.

## Comandos canonicos

Auditoria sin modificar datos:

```bash
python3 scripts/auditar_operacion_email.py --fail-on-blockers
```

Monitoreo readonly de INBOX:

```bash
python3 scripts/monitorear_inbox_operacion.py --since 2026-05-01 --limit 100
```

Preview del seguimiento general:

```bash
python3 scripts/enviar_lote_seguimiento.py --limit 5
```

Envio real del seguimiento general, solo con aprobacion:

```bash
python3 scripts/enviar_lote_seguimiento.py --send
```

Preview del seguimiento separado de recuperaciones:

```bash
python3 scripts/enviar_lote_seguimiento.py \
  --csv 05-datos-y-reportes/operacion-email/seguimiento-recuperacion-2026-05-07.csv \
  --target-date 2026-05-07 \
  --allowed-campaign recuperacion_rebote_2026_04_30 \
  --limit 3
```

## Reglas

- Primero existe o se sincroniza el Lead en ERPNext; despues se prepara el
  correo.
- No abrir nuevas olas mientras haya seguimiento o rebotes sin revisar.
- No mezclar `wave_4_candidate` con los 296 contactos iniciales.
- No guardar secretos en Markdown, CSV ni scripts.
- Todo envio real debe dejar rastro en `correos-enviados-importar.csv`,
  `contactos-maestro-operativo.csv`, el CSV del lote y copia IMAP `Sent`.
