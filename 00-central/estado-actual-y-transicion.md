# Estado actual y transicion operativa

Fecha de actualizacion: 2026-04-20

## Lectura corta

Este repo conserva el historico comercial y narrativo de `Agora`, pero la fase activa cambio.

La prioridad ya no es redactar mas correos desde remitente personal. La prioridad actual es:

1. reconciliar los correos ya enviados desde `stevenvallejo780@gmail.com`
2. preparar una ola de `declaracion` desde remitente corporativo
3. alinear el repo con la marca publica `Elenxos`
4. relanzar outreach desde cuenta de empresa y con trazabilidad limpia

## Estado publico verificado

Se verifico el 2026-04-20 que ya existen estos puntos publicos:

- sitio corporativo: `https://www.elenxos.com/`
- producto: `https://agora.elenxos.com/`
- manifest publico de Agora: `https://agora.elenxos.com/manifest.json`
- documentacion publica de Agora: `https://agora.elenxos.com/docs`

La documentacion del repo ya no debe tratar esos dominios como hipoteticos.

## Lectura estrategica

La capa publica ahora queda partida en dos niveles:

- `Elenxos` como marca corporativa e intelectual
- `Agora` como producto operativo y plataforma concreta

Eso obliga a que el repo haga la misma separacion:

- narrativa de empresa en clave `Elenxos`
- oferta, demos, docs y outreach del producto en clave `Agora`

1. [00-central/plan-transicion-remitente-y-sitios-publicos.md](./plan-transicion-remitente-y-sitios-publicos.md)
2. [email.md](../04-mensajeria-email/email.md)
3. [05-datos-y-reportes/operacion-email](../05-datos-y-reportes/operacion-email)
4. [03-operacion-redes/estrategia-redes-sociales.md](../03-operacion-redes/estrategia-redes-sociales.md)
5. [assets/README.md](../assets/README.md)
6. [docs/codex/NEXT_ACTIONS.md](../docs/codex/NEXT_ACTIONS.md)

## Que documentos siguen vigentes

- `03-datos/leads-agora-maestro.csv`: base historica principal
- `03-datos/leads-agora-top-50-hoy.csv`: corte historico de ejecucion
- `02-mensajeria/mensajes-y-copy.md`: sistema reutilizable de copy
- `04-reportes/`: historial de lotes y ejecucion
- `05-redes-sociales/`: historial de narrativa y marca de Agora

## Que cambia desde hoy

- la nueva verdad operativa para correo sale desde `04-mensajeria-email/`
- la nueva organizacion de datos sale desde `05-datos-y-reportes/operacion-email/`
- el bootstrap inicial de la base nueva ya sale desde `scripts/bootstrap_operacion_email.py`
- no se deben guardar secretos reales en markdown ni CSV

## Insumos que faltan del usuario

- lista de correos ya enviados desde la cuenta personal
- criterio para el correo de declaracion: formal, cercano o correccion simple de remitente
- criterio de CTA por pieza: enviar a `www.elenxos.com` o directo a `agora.elenxos.com`

## Regla operativa

Hasta que no entren esos insumos, el trabajo correcto no es enviar. El trabajo correcto es dejar:

- plan
- base de datos
- checklist
- automatizacion

listos para ejecutar sin improvisacion sobre los sitios ya publicados.
