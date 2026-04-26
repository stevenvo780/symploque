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
2. [00-central/central-operativo-agora.md](00-central/central-operativo-agora.md)
3. [02-identidad-y-marca/README.md](02-identidad-y-marca/README.md)
4. [03-operacion-redes/README.md](03-operacion-redes/README.md)
5. [04-mensajeria-email/email.md](04-mensajeria-email/email.md)

## Estructura

- `00-central/`: contexto rector, foco actual y criterio de operacion
- `01-estrategia-comercial/`: planes y playbooks comerciales
- `02-identidad-y-marca/`: criterio de marca, media kit y automatizacion visual
- `03-operacion-redes/`: copy, calendario y operacion diaria de redes
- `04-mensajeria-email/`: plantillas y operacion de correo
- `05-datos-y-reportes/`: base operativa, reconciliacion y reportes
- `06-redes-sociales/`: sistema estrategico semanal y roadmap narrativo
- `assets/`: kit de marca, prompts y entregables visuales
- `elenxos_design_system/`: renderer React → PNG / MP4 para piezas publicas
- `scripts/`: automatizaciones locales de soporte
- `docs/codex/`: contexto persistente, protocolo y cola de trabajo

## Estado operativo actual

- Sitios publicos verificados: `https://www.elenxos.com/` y `https://agora.elenxos.com/`
- La prioridad no es enviar mas; es cerrar `datos + remitente + CTA + firma + marca`
- La API de correo existe y responde; el cuello de botella real es reconciliacion y gating
- La narrativa de marca ya existe; el faltante principal era volverla operable y menos redundante
- La nueva base de outreach se puede bootstrapear desde el historico con `scripts/bootstrap_operacion_email.py`

## Generacion de contenidos: que manda hoy

Para no mezclar capas:

- `02-identidad-y-marca/` define la marca y el criterio visual
- `03-operacion-redes/` define que sale esta semana y en que formato
- `06-redes-sociales/` conserva el sistema estrategico de 8 semanas y prompts narrativos
- `assets/` guarda el kit de marca, prompts y entregables
- `elenxos_design_system/` es el renderer ejecutable para generar piezas
- `scripts/iniciar_automatizacion_redes.sh` es el punto de entrada rapido para identidad + lote 1 minimo
- `scripts/generar_campana.sh` es el comando simple para producir campañas completas en carpetas ordenadas

### Comando simple para campañas

Desde la raiz del repo:

```bash
./scripts/generar_campana.sh
```

Ejemplos utiles:

```bash
./scripts/generar_campana.sh --skip-video
./scripts/generar_campana.sh --reuse-ai
./scripts/generar_campana.sh --seed 12345
./scripts/generar_campana.sh --narrativa dolor
./scripts/generar_campana.sh --legacy --lote 1
./scripts/generar_campana.sh --narrativa solucion --video-duration 6
```

Salida por defecto:

- `assets/entregables/campanas/campana_0_dolor/`
- `assets/entregables/campanas/campana_1_solucion/`
- `assets/entregables/campanas/campana_2_ecosistema/`

Cada campaña contiene:

- `sin_ia/` y `con_ia/`
- `publicaciones/`, `flyers/`, `reels/`, `stories/`, `banners/`
- `README.md` y `manifest.json`

Regla actual del pipeline:

- 50 piezas por campaña
- 5 piezas por categoría dentro de `sin_ia/`
- 5 piezas por categoría dentro de `con_ia/`
- 10 piezas por categoría en total (`publicaciones`, `flyers`, `reels`, `stories`, `banners`)
- la corrida oficial sin argumentos genera 25 piezas editoriales y 25 piezas con IA fresca por campaña
- sin argumentos, el modo oficial genera fondos AI nuevos por campaña y deja trazas en `prompts_ai.json` + `con_ia/fuentes_ai/`
- el generador ahora elige variaciones de templates compatibles por narrativa usando un seed reproducible
- puedes fijar la corrida con `--seed 12345`
- si quieres reutilizar la librería AI ya sincronizada, usa `--reuse-ai`
- los `flyers` usan el layout cuadrado de `post` porque hoy no existe un formato flyer dedicado en el renderer

Si usas filtros (`--narrativa`, `--lote`, `--tipo` o `--legacy`), la salida puntual cae en:

- `assets/entregables/campanas/selecciones/YYYY-MM-DD_campaign_*/`

## Reglas del repo

- No tratar docs historicos como si fueran la fase activa sin marcar contexto.
- No guardar secretos en markdown, CSV ni scripts.
- No lanzar correo corporativo sin pasar por `05-datos-y-reportes/operacion-email/` y `04-mensajeria-email/`.
- No abrir nuevas piezas de marca sin revisar antes `assets/README.md`, `02-identidad-y-marca/README.md` y `03-operacion-redes/README.md`.

## Nota

Este repo no es una app tradicional. La verificacion principal es operativa: consistencia entre mensajes, CSV, URLs publicas, firma, brand system y cola de ejecucion.
