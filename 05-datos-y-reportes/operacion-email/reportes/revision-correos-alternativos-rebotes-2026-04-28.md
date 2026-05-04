# Revision de correos alternativos para rebotes - 2026-04-28

> Estado: verificacion documental preparada. No se enviaron correos ni se tocaron registros externos.

- Fuente de rebotes: `05-datos-y-reportes/operacion-email/rebotes-detectados-2026-04-27.csv`
- Tabla operativa: `05-datos-y-reportes/operacion-email/rebotes-recuperacion-2026-04-28.csv`
- Preview de mensajes: `04-mensajeria-email/preview-recuperacion-rebotes-2026-04-28.md`
- Total revisado: 8 rebotes

## Resumen ejecutivo

| Resultado | Cantidad | Contactos |
|---|---:|---|
| Correo corregido o alternativo listo para revisar | 2 | `agora-legacy-029`, `agora-legacy-124` |
| Correo original sigue publicado, pero el rebote parece de infraestructura | 4 | `agora-legacy-052`, `agora-legacy-056`, `agora-legacy-059`, `agora-legacy-072` |
| Sin correo alternativo confiable; requiere canal manual | 2 | `agora-legacy-099`, `agora-legacy-289` |

## Hallazgos por contacto

### `agora-legacy-029` - Luis Fernando Gutierrez Cano / UPB

- Reboto: `luisfe.gutierrezcano@upb.edu.co`
- Candidato verificado: `luisfe.gutierrez@upb.edu.co`
- Accion recomendada: preparar reenvio manual revisado.
- Fuente: `https://repository.upb.edu.co/bitstream/handle/20.500.11912/8688/GT10.%20Comunicaci%C3%B3n%2C%20tecnolog%C3%ADa%20y%20desarrollo.pdf?isAllowed=y&sequence=37`

### `agora-legacy-052` - Zsofia Varga / Javeriana

- Reboto: `varga@javeriana.edu.co`
- Verificacion: el mismo correo sigue publicado oficialmente.
- Diagnostico: rebote por `Hop count exceeded - possible mail loop`.
- Accion recomendada: no cambiar el correo ni reenviar de inmediato; reintentar solo si cesa el problema de dominio. Si persiste, usar coordinacion del Centro de Escritura.
- Fuente: `https://comunicacionylenguaje.javeriana.edu.co/web/facultad-comunicacion-lenguaje/centro-de-escritura`

### `agora-legacy-056` - Maria Alejandra Lopez Arias / Javeriana

- Reboto: `m.lopeza01@javeriana.edu.co`
- Verificacion: el mismo correo sigue publicado oficialmente.
- Diagnostico: rebote por `Hop count exceeded - possible mail loop`.
- Accion recomendada: no cambiar el correo ni reenviar de inmediato; reintentar solo si cesa el problema de dominio. Si persiste, usar coordinacion del Centro de Escritura.
- Fuente: `https://comunicacionylenguaje.javeriana.edu.co/web/facultad-comunicacion-lenguaje/centro-de-escritura`

### `agora-legacy-059` - Maximoni Lopez / Javeriana

- Reboto: `maximoni.lopez@javeriana.edu.co`
- Verificacion: el mismo correo aparece publicado oficialmente.
- Diagnostico: rebote por `Hop count exceeded - possible mail loop`.
- Accion recomendada: no reenviar de inmediato; si persiste el problema de dominio, usar tutoras del semillero: `ibermejo@javeriana.edu.co` y `va.solano@javeriana.edu.co`.
- Fuente: `https://comunicacionylenguaje.javeriana.edu.co/inicio/-/asset_publisher/dr4nHq6VZ5Kk/content/id/1670610`

### `agora-legacy-072` - Semillero Subjetividad / Javeriana

- Reboto: `semillerosubjetividad@javeriana.edu.co`
- Verificacion: el correo del semillero y las tutoras aparecen publicados oficialmente.
- Diagnostico: rebote por `Hop count exceeded - possible mail loop`.
- Accion recomendada: no reenviar de inmediato al mismo dominio; si persiste el problema, contactar una sola vez a las tutoras del semillero.
- Fuente: `https://comunicacionylenguaje.javeriana.edu.co/inicio/-/asset_publisher/dr4nHq6VZ5Kk/content/id/1670610`

### `agora-legacy-099` - Jesus Anturi Perdomo / Uninorte

- Reboto: `arturij@uninorte.edu.co`
- Verificacion: el mismo correo sigue publicado en el directorio de Comunicaciones de Uninorte.
- Diagnostico: rebote `550 5.4.1`; puede ser rechazo del servidor receptor.
- Accion recomendada: no reenviar por email hasta revisar entregabilidad; usar canal manual o extension `4634`.
- Fuente: `https://www.uninorte.edu.co/web/comunicaciones/inicio`

### `agora-legacy-124` - Maria Emilia Montes / UNAL Bogota

- Reboto: `memontesro@unal.edu.co`
- Candidato verificado: `memontesr@unal.edu.co`
- Accion recomendada: preparar reenvio manual revisado.
- Fuente: `https://www.humanas.unal.edu.co/2017/unidades-academicas/departamentos/linguistica/programas/maestria/equipo`

### `agora-legacy-289` - Pablo Munoz Specht / UNAL Bogota

- Reboto: `pmunozs@unal.edu.co`
- Verificacion: el mismo correo aparece publicado en perfil institucional.
- Diagnostico: rebote `Address not found`; el dato puede estar obsoleto aunque la pagina lo conserve.
- Accion recomendada: no reenviar por email; usar telefono/ext `16328` o busqueda manual adicional.
- Fuente: `https://www.humanas.unal.edu.co/2017/docentes/pablo-munoz-specht/perfil`

## Reglas para siguiente accion

- Enviar solo los 2 casos con correo corregido despues de revision manual del preview.
- No reintentar los 4 casos Javeriana mientras el rebote sea de tipo `mail loop`.
- No reintentar Uninorte ni Pablo Munoz por email hasta tener confirmacion manual o canal alterno.
- Registrar cualquier accion real en `contactos-maestro-operativo.csv`, `leads-agora-maestro.csv` y `correos-enviados-importar.csv`.
