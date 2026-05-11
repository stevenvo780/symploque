# Runbook wave 4 posterior al seguimiento

> Estado: preparado. El paquete `wave_4` existe, pero sigue bloqueado para
> promoción real porque `seguimiento-2026-05-04.csv` aún tiene 281 filas en
> `draft_review` y no hay confirmación de envío en esta sesión.

## Estado real del paquete

- `wave-4-candidatos-2026-05-01.csv`: 15 candidatos operativos revisables.
- `primer-contacto-wave-4-candidatos-2026-05-01.csv`: 15 borradores en
  `send_status=draft_review`.
- `leads-wave-4-anillo-1-2026-05-01.csv`: 21 leads de investigación Anillo 1
  todavía separados del paquete operativo principal.
- Último monitoreo readonly disponible:
  `reportes/monitoreo-inbox-2026-05-04.md` reporta 0 mensajes nuevos, 0 rebotes
  y 0 respuestas humanas.

## Orden recomendado

1. Revisar respuestas, rebotes y senales del seguimiento 2026-05-04.
2. Si no hay alertas, revisar `04-mensajeria-email/lotes/lote-primer-contacto-wave-4-candidatos-2026-05-01.md`.
3. Siguiente paso seguro si no se va a aprobar envío todavía: dry-run de promocion.

```bash
python3 scripts/promover_wave4_candidatos.py
```

4. Promover al maestro solo con aprobacion:

```bash
python3 scripts/promover_wave4_candidatos.py --apply
```

5. Importar o sincronizar ERPNext solo despues de promover:

```bash
python3 scripts/erpnext_importar_contactos.py \
  --source 05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv \
  --wave wave_4_public_research \
  --export-csv 05-datos-y-reportes/operacion-email/erp-leads-wave-4-aprobados.csv \
  --mark-ready
```

6. Enviar solo despues de ERP sync y preview:

```bash
python3 scripts/enviar_lote_primer_contacto.py \
  --csv 05-datos-y-reportes/operacion-email/primer-contacto-wave-4-candidatos-2026-05-01.csv \
  --campaign primer_contacto_wave_4 \
  --limit 5
```

Envio real:

```bash
python3 scripts/enviar_lote_primer_contacto.py \
  --csv 05-datos-y-reportes/operacion-email/primer-contacto-wave-4-candidatos-2026-05-01.csv \
  --campaign primer_contacto_wave_4 \
  --send
```

## Bloqueos

- No tratar el seguimiento 2026-05-04 como ejecutado mientras las 281 filas
  sigan en `draft_review`.
- No promover antes de revisar seguimiento 2026-05-04.
- No importar ERPNext sin aprobacion.
- No enviar sin `erp_sync_status=synced` o `synced_existing`.
- No mezclar wave 4 con seguimientos.
- Si faltan `MAIL_FROM_EMAIL` y credenciales locales, usar el último reporte
  readonly disponible o configurar entorno antes de relanzar monitoreo IMAP.
