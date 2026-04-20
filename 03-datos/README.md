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

## Flujo recomendado

1. importar la lista real de enviados a `correos-enviados-importar.csv`
2. deduplicar y cruzar con el historico
3. poblar `contactos-maestro-operativo.csv`
4. marcar quienes requieren `declaracion`
5. poblar `declaracion-pendientes.csv`
6. no lanzar la nueva ola comercial hasta que la landing este aprobada

## Regla de seguridad

- no guardar credenciales en CSV
- no pegar respuestas privadas completas en los campos de notas
- usar identificadores y estados, no informacion sensible innecesaria

## Regla de versionado

Los archivos historicos de `Agora` se conservan como referencia.

La fase nueva no debe sobrescribir esos CSV a ciegas. Si luego conviene unificar todo en una sola base, esa migracion se hace con confirmacion y con mapping explicito.
