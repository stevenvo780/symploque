# symploque Project Context

## Product

- Purpose: repositorio operativo para outreach comercial. Conserva el historico de `Agora` y ahora opera bajo la capa publica de `Elenxos`, con sitio corporativo y producto ya publicados.
- Primary users: operador comercial y agente de Codex encargado de ordenar datos, preparar correo corporativo y ejecutar outreach con trazabilidad.
- Current focus: reconciliar correos ya enviados desde remitente personal, preparar la ola de `declaracion`, y alinear toda la documentacion con `www.elenxos.com` y `agora.elenxos.com`.

## Architecture

- Main entrypoints:
  - `00-central/estado-actual-y-transicion.md`
  - `06-operacion-email/plan-transicion-remitente-y-sitios-publicos.md`
  - `email.md`
  - `03-datos/README.md`
  - `03-datos/operacion-email/contactos-maestro-operativo.csv`
- Key modules:
  - `00-central/`: estado actual, transicion y mapa operativo
  - `01-estrategia/`: estrategia y playbooks heredados
  - `02-mensajeria/`: sistema modular de copy reutilizable
  - `03-datos/`: historico de contactos y nueva base de operacion email
  - `04-reportes/`: reportes y lotes historicos
  - `06-redes-sociales/`: narrativa y marca historica
  - `06-operacion-email/`: plan de remitente corporativo y salida sobre sitios publicos vivos
- Data stores and external services:
  - CSV historicos de `Agora`
  - nuevos CSV de reconciliacion y declaracion para operacion email
  - Mail API documentada en `email.md`
  - sitio corporativo: `https://www.elenxos.com/`
  - producto Agora: `https://agora.elenxos.com/`
  - docs publicas: `https://agora.elenxos.com/docs`
  - manifest publico: `https://agora.elenxos.com/manifest.json`

## Local Commands

- Install: no aplica; no se detecto stack de aplicacion local obligatorio.
- Test: verificacion manual de consistencia documental, CSV y flujo de envio.
- Lint: no aplica; repo documental y de datos.
- Run:
  - abrir `00-central/estado-actual-y-transicion.md`
  - revisar `06-operacion-email/plan-transicion-remitente-y-sitios-publicos.md`
  - poblar `03-datos/operacion-email/`
  - registrar decisiones en `docs/codex/WORKLOG.md`

## Constraints

- Runtime or platform constraints: workspace documental; no asumir stack de app ni despliegue local.
- Security or compliance notes: no guardar secretos en markdown o CSV; usar solo datos de contacto que el usuario autorice operar; deduplicar antes de cualquier envio.
- Known sharp edges:
  - el repo contiene material historico de `Agora` y nueva operacion de correo; no mezclar ambas capas sin marcar contexto.
  - no se debe lanzar una ola nueva sin primero reconciliar los correos ya enviados desde remitente personal.
  - `Elenxos` y `Agora` hoy cumplen funciones publicas distintas: marca corporativa vs producto.
  - la automatizacion ya existe, pero el gating real sigue dependiendo de deduplicacion, CTA correcto y trazabilidad.
  - el HTML publico de `elenxos.com` todavia referencia el dominio antiguo de Agora en `sameAs`; eso es una inconsistencia externa a corregir fuera del repo.
