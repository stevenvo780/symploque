# Bases de datos de contacto

## Estado actual

Esta carpeta mezcla dos capas:

- historico comercial de `Agora`
- nueva capa operativa para correo corporativo y reconciliacion de envios

La idea no es borrar el historico. La idea es separarlo del flujo nuevo.

## Historico existente

- `leads-agora-maestro.csv`: base principal heredada con `300` contactos
- `leads-agora-top-50-hoy.csv`: corte historico de trabajo inmediato
- `canales-publicos-contacto.md`: respaldo metodologico de contactos publicos

## Nueva capa operativa

Todo lo nuevo de correo y reconciliacion queda en `03-datos/operacion-email/`.

Archivos canonicos:

- `contactos-maestro-operativo.csv`: base maestra para la nueva fase
- `correos-enviados-importar.csv`: lista cruda de correos ya enviados desde remitente personal
- `declaracion-pendientes.csv`: cola de contactos que deben recibir correo de declaracion
- `disculpa-error-pendientes.csv`: cola dedicada para incidentes de correos mal enviados

## Bootstrap disponible

Para no arrancar desde cero cada vez, existe:

- `scripts/bootstrap_operacion_email.py`

Ese script toma `leads-agora-maestro.csv` y genera una primera capa operativa provisional:

- todos los contactos entran a `contactos-maestro-operativo.csv`
- los `contactado` pasan a una cola provisional de enviados historicos
- los `contactado` tambien entran a una cola provisional de `declaracion`

Importante:

- el bootstrap no reemplaza la verificacion contra la bandeja real
- no inventa respuestas, asuntos ni fechas externas al historico
- sirve para dejar la operacion arrancada y trazable

## Flujo recomendado

1. correr `python3 scripts/bootstrap_operacion_email.py`
2. importar o contrastar la lista real de enviados en `correos-enviados-importar.csv`
3. deduplicar y cruzar con el historico
4. validar quienes realmente requieren `declaracion`
5. revisar `contactos-maestro-operativo.csv`
6. no lanzar la nueva ola comercial hasta cerrar CTA, remitente y firma

## Regla de seguridad

- no guardar credenciales en CSV
- no pegar respuestas privadas completas en los campos de notas
- usar identificadores y estados, no informacion sensible innecesaria

## Regla de versionado

Los archivos historicos de `Agora` se conservan como referencia.

La fase nueva no debe sobrescribir esos CSV a ciegas. Si luego conviene unificar todo en una sola base, esa migracion se hace con confirmacion y con mapping explicito.
