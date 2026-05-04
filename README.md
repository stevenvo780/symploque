# symploque

Workspace operativo para arrancar `Elenxos` y `Agora`: estrategia comercial,
marca, mensajes, datos de outreach, redes y automatizaciones locales.

Este repo no es una app tradicional. La verificacion principal es operativa:
consistencia entre CSVs, mensajes, sitios publicos, ERP, firma, brand system y
cola de ejecucion.

## Leer primero

Si vas a abrir pocos archivos, abre estos en orden:

1. [`00-central/central-operativo-agora.md`](00-central/central-operativo-agora.md)
2. [`04-mensajeria-email/README.md`](04-mensajeria-email/README.md)
3. [`05-datos-y-reportes/operacion-email/README.md`](05-datos-y-reportes/operacion-email/README.md)
4. [`03-operacion-redes/README.md`](03-operacion-redes/README.md)
5. [`02-identidad-y-marca/README.md`](02-identidad-y-marca/README.md)
6. [`docs/codex/NEXT_ACTIONS.md`](docs/codex/NEXT_ACTIONS.md)

## Estado operativo

- Sitios publicos: `https://www.elenxos.com/` y `https://agora.elenxos.com/`.
- `wave_1`, `wave_2` y `wave_3`: 296 primeros contactos enviados desde
  `ventas@elenxos.com` y sincronizados como Leads en ERPNext.
- SMTP acepto 299 envios de campana: 296 primeros contactos y 3 recuperaciones.
- Pendiente inmediato: revisar INBOX/rebotes y ejecutar el runbook de
  seguimiento del 2026-05-04 antes de cualquier nuevo envio.
- `wave_4` existe solo como candidato revisable. No importar ni enviar sin
  aprobacion explicita.

## Mapa del repo

- `00-central/`: criterio rector, estado activo y prioridades.
- `01-estrategia-comercial/`: planes y playbooks comerciales.
- `02-identidad-y-marca/`: sistema de marca, media kit y automatizacion visual.
- `03-operacion-redes/`: contenido listo, calendario, cuentas y protocolo diario.
- `04-mensajeria-email/`: plantillas, lotes, previews y canal alterno.
- `05-datos-y-reportes/`: maestros, CSVs operativos, reportes y runbooks.
- `06-redes-sociales/`: sistema narrativo largo de redes.
- `assets/`: kit de marca, prompts, imagenes y entregables.
- `elenxos_design_system/`: renderer React para PNG / MP4.
- `scripts/`: automatizaciones locales.
- `docs/`: infraestructura, contexto persistente y protocolo de trabajo.

## Comandos frecuentes

Auditar operacion email:

```bash
python3 scripts/auditar_operacion_email.py --fail-on-blockers
```

Preview de seguimiento:

```bash
python3 scripts/enviar_lote_seguimiento.py --limit 5
```

Generar campanas visuales:

```bash
./scripts/generar_campana.sh
```

Preflight de redes:

```bash
python3 scripts/publicar_redes.py --preflight
```

## Reglas del repo

- No tratar documentos historicos como si fueran la fase activa.
- No guardar secretos en Markdown, CSV ni scripts.
- No enviar correo corporativo sin pasar por auditoria, ERP y CSV operativo.
- No duplicar contenido: si algo es historico va a `reportes/`, `previews/` o
  `lotes/`; si algo manda la ejecucion actual debe estar enlazado desde un
  `README`.
