# symploque

Workspace operativo para arrancar `Elenxos` y `Agora` con una capa minima pero seria de:

- datos comerciales
- mensajeria reusable
- marca y media kit
- salida de correo corporativo
- trazabilidad documental

Este repo conserva dos capas:

- historico documental y comercial de `Agora`
- fase activa bajo `Elenxos`, con producto y sitio ya publicados

## Entrada canonica

Si solo vas a abrir cinco archivos, abre estos en este orden:

1. [00-central/estado-actual-y-transicion.md](00-central/estado-actual-y-transicion.md)
2. [docs/codex/NEXT_ACTIONS.md](docs/codex/NEXT_ACTIONS.md)
3. [03-datos/README.md](03-datos/README.md)
4. [05-redes-sociales/README.md](05-redes-sociales/README.md)
5. [email.md](email.md)

## Estructura

- `00-central/`: contexto rector, foco actual y criterio de operacion
- `01-estrategia/`: planes y playbooks heredados
- `02-mensajeria/`: copy comercial reusable por segmento
- `03-datos/`: historico, bootstrap y nueva base operativa de outreach
- `04-reportes/`: ejecucion historica y reportes metodologicos
- `05-redes-sociales/`: documentos canonicos de redes, manifiesto y media kit
- `06-operacion-email/`: gating de remitente, declaracion y lanzamiento corporativo
- `assets/`: sistema visual, renders exploratorios e inventario de media kit
- `scripts/`: automatizaciones locales de soporte
- `docs/codex/`: contexto persistente, protocolo y cola de trabajo

## Estado operativo actual

- Sitios publicos verificados: `https://www.elenxos.com/` y `https://agora.elenxos.com/`
- La prioridad no es enviar mas; es cerrar `datos + remitente + CTA + firma + marca`
- La API de correo existe y responde; el cuello de botella real es reconciliacion y gating
- La narrativa de marca ya existe; el faltante principal era volverla operable y menos redundante
- La nueva base de outreach se puede bootstrapear desde el historico con `scripts/bootstrap_operacion_email.py`

## Reglas del repo

- No tratar docs historicos como si fueran la fase activa sin marcar contexto.
- No guardar secretos en markdown, CSV ni scripts.
- No lanzar correo corporativo sin pasar por `03-datos/operacion-email/` y `06-operacion-email/`.
- No abrir nuevas piezas de marca sin revisar antes `assets/README.md` y `05-redes-sociales/README.md`.

## Nota

Este repo no es una app tradicional. La verificacion principal es operativa: consistencia entre mensajes, CSV, URLs publicas, firma, brand system y cola de ejecucion.
