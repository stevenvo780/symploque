# symploque Project Context

## Product

- Purpose: repositorio operativo para captacion comercial de `Agora`, con estrategia, mensajeria, base de leads y reportes de ejecucion.
- Primary users: operador comercial y agente de Codex encargado de expandir, priorizar y activar outreach.
- Current focus: partir de UdeA, trabajar leads por oleadas, y mejorar mensajes de outreach por universidad y tipo de contacto.

## Architecture

- Main entrypoints:
  - `00-central/agente.md`
  - `00-central/central-operativo-agora.md`
  - `03-datos/leads-agora-maestro.csv`
  - `03-datos/leads-agora-top-50-hoy.csv`
  - `02-mensajeria/mensajes-y-copy.md`
  - `05-redes-sociales/estrategia-redes-sociales.md`
  - `05-redes-sociales/manifiesto-corto-agora.md`
  - `05-redes-sociales/lote-1-publicaciones-por-plataforma.md`
- Key modules:
  - `00-central/`: brief rector y central operativo
  - `01-estrategia/`: plan comercial, playbooks, segmentacion y automatizaciones
  - `02-mensajeria/`: mensajes base de outreach
  - `03-datos/`: CSV maestro y canales publicos de contacto
  - `04-reportes/`: cortes operativos y reportes metodologicos
  - `05-redes-sociales/`: narrativa de marca, aprendizajes del vision board y estrategia por plataforma
- Data stores and external services:
  - CSV maestro de leads como fuente operativa unica
  - fuentes publicas verificables para enriquecimiento de contactos
  - producto objetivo: `https://agora.humanizar.cloud`

## Local Commands

- Install: no aplica; no se detecto stack de aplicacion ni dependencias locales obligatorias.
- Test: verificacion manual de consistencia documental y del CSV maestro.
- Lint: no aplica; repo documental y de datos.
- Run:
  - abrir `00-central/central-operativo-agora.md`
  - trabajar `03-datos/leads-agora-maestro.csv` o `03-datos/leads-agora-top-50-hoy.csv`
  - actualizar `02-mensajeria/mensajes-y-copy.md`
  - registrar decisiones en `04-reportes/` y `docs/codex/WORKLOG.md`

## Constraints

- Runtime or platform constraints: workspace documental montado sobre `/mnt/c/...`; no asumir tooling de app.
- Security or compliance notes: usar solo fuentes publicas verificables, priorizar correos institucionales y evitar contactos dudosos.
- Known sharp edges:
  - el CSV maestro es el activo operativo principal; cambios incorrectos degradan todo el pipeline.
  - la priorizacion comercial se trabaja por tandas, no sobre la base completa al mismo tiempo.
  - `prompt4.md` apunta a mejorar la mensajeria y la segmentacion de copy; esa es una linea de trabajo inmediata.
  - la narrativa futura de Agora no debe adelantarse demasiado al mercado actual; primero academia, luego ecosistema.
  - el sitio actual ya tiene una tesis publica fuerte sobre `investigacion rigurosa`; la estrategia de marca debe alinearse con eso y no volver a una version demasiado generica.
