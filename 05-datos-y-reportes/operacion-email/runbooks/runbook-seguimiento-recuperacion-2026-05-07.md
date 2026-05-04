# Runbook seguimiento recuperacion rebotes - 2026-05-07

> Estado: preparado. Mini-lote separado para los 3 correos recuperados enviados el 2026-04-30.

## Archivos

- CSV: `05-datos-y-reportes/operacion-email/seguimiento-recuperacion-2026-05-07.csv`
- Revision: `04-mensajeria-email/lotes/lote-seguimiento-recuperacion-2026-05-07-revision.md`

## Orden obligatorio

1. Revisar INBOX readonly desde el envio recuperado:

```bash
python3 scripts/monitorear_inbox_operacion.py --since 2026-04-30 --limit 100
```

2. Revisar rebotes readonly:

```bash
python3 scripts/sincronizar_rebotes_imap.py --since 30-Apr-2026 --dry-run
```

3. Regenerar mini-lote:

```bash
python3 scripts/preparar_lote_seguimiento.py \
  --date 2026-05-07 \
  --campaign recuperacion_rebote_2026_04_30 \
  --csv-output 05-datos-y-reportes/operacion-email/seguimiento-recuperacion-2026-05-07.csv \
  --md-output 04-mensajeria-email/lotes/lote-seguimiento-recuperacion-2026-05-07-revision.md \
  --preview-limit 3
```

4. Preview:

```bash
python3 scripts/enviar_lote_seguimiento.py \
  --csv 05-datos-y-reportes/operacion-email/seguimiento-recuperacion-2026-05-07.csv \
  --target-date 2026-05-07 \
  --allowed-campaign recuperacion_rebote_2026_04_30 \
  --limit 3
```

5. Envio real solo con aprobacion explicita:

```bash
python3 scripts/enviar_lote_seguimiento.py \
  --csv 05-datos-y-reportes/operacion-email/seguimiento-recuperacion-2026-05-07.csv \
  --target-date 2026-05-07 \
  --allowed-campaign recuperacion_rebote_2026_04_30 \
  --send
```
