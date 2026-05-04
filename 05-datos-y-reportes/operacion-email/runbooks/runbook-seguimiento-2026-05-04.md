# Runbook seguimiento - 2026-05-04

> Estado: preparado. No ejecutar envio real antes de revisar INBOX/rebotes y confirmar explicitamente.

## Orden obligatorio

1. Revisar INBOX readonly:

```bash
python3 scripts/monitorear_inbox_operacion.py --since 2026-05-01 --limit 100
```

2. Revisar rebotes readonly:

```bash
python3 scripts/sincronizar_rebotes_imap.py --since 01-May-2026 --dry-run
```

3. Regenerar lote si no hubo respuestas/rebotes que cambien elegibilidad:

```bash
python3 scripts/preparar_lote_seguimiento.py --date 2026-05-04 --preview-limit 10
```

4. Auditar:

```bash
python3 scripts/auditar_operacion_email.py --fail-on-blockers
```

5. Preview final:

```bash
python3 scripts/enviar_lote_seguimiento.py --limit 5
```

6. Envio real solo con aprobacion explicita:

```bash
python3 scripts/enviar_lote_seguimiento.py --send
```

El script pide `ENVIAR_SEGUIMIENTO`, valida el maestro operativo, evita duplicar `seguimiento_2026_05_04` y bloquea ejecucion antes de `2026-05-04` salvo `--allow-before-date`.

## Canales alternos el mismo dia

- Reintentar EAFIT/UPB con `04-mensajeria-email/canal-alterno/reintento-whatsapp-dia-habil-2026-05-04.md`.
- Ejecutar llamada manual Javeriana con `04-mensajeria-email/canal-alterno/guion-llamada-javeriana-catedra-unesco-2026-05-04.md`.
- Registrar cualquier resultado en `registro-canal-alterno-2026-04-30.csv`.
- Correr `python3 scripts/registrar_canal_alterno.py` y aplicar solo si el dry-run muestra filas nuevas correctas.

## Criterios de bloqueo

- Cualquier respuesta humana pendiente de clasificar.
- Nuevos rebotes asociados al lote.
- Auditoria con bloqueadores.
- Duda sobre fecha, remitente, elegibilidad o duplicado.
- Falta de aprobacion explicita para envio real.
