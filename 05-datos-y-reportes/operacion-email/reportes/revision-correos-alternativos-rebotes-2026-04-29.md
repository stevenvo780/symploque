# Revision de correos alternativos para rebotes - 2026-04-29

> Estado: verificacion documental preparada. No se enviaron correos ni se tocaron registros externos.

- Fuente de rebotes: `05-datos-y-reportes/operacion-email/rebotes-detectados-2026-04-27.csv`
- Tabla operativa: `05-datos-y-reportes/operacion-email/rebotes-recuperacion-2026-04-29.csv`
- Preview de mensajes: `04-mensajeria-email/preview-recuperacion-rebotes-2026-04-29.md`
- Total revisado: 15 rebotes

## Resumen ejecutivo

| Resultado | Cantidad | Contactos |
|---|---:|---|
| Correo corregido o alternativo listo para revisar | 3 | `agora-legacy-029`, `agora-legacy-124`, `agora-legacy-148` |
| Javeriana en espera por `mail loop` | 6 | `agora-legacy-052`, `agora-legacy-056`, `agora-legacy-057`, `agora-legacy-059`, `agora-legacy-072`, `agora-legacy-076` |
| Requiere canal manual, redireccion o confirmacion adicional | 6 | `agora-legacy-099`, `agora-legacy-111`, `agora-legacy-131`, `agora-legacy-170`, `agora-legacy-243`, `agora-legacy-289` |

## Hallazgos

### Listos para revisar correo corregido

- `agora-legacy-029` / UPB: rebotado `luisfe.gutierrezcano@upb.edu.co`; candidato `luisfe.gutierrez@upb.edu.co`.
- `agora-legacy-124` / UNAL: rebotado `memontesro@unal.edu.co`; candidato `memontesr@unal.edu.co`.
- `agora-legacy-148` / UNAL: rebotado `melopezhu@unal.edu.co`; candidato `melopez@unal.edu.co`.

### En espera por `mail loop` Javeriana

No reenviar mientras persista `554 5.4.14 Hop count exceeded - possible mail loop`.

- `agora-legacy-052`: `varga@javeriana.edu.co`; backup `va.solano@javeriana.edu.co`.
- `agora-legacy-056`: `m.lopeza01@javeriana.edu.co`; backup `va.solano@javeriana.edu.co`.
- `agora-legacy-057`: `investigacioncisc@javeriana.edu.co`; backup `aquinones@javeriana.edu.co`.
- `agora-legacy-059`: `maximoni.lopez@javeriana.edu.co`; backups `ibermejo@javeriana.edu.co`, `va.solano@javeriana.edu.co`.
- `agora-legacy-072`: `semillerosubjetividad@javeriana.edu.co`; backups `ibermejo@javeriana.edu.co`, `va.solano@javeriana.edu.co`.
- `agora-legacy-076`: `semillerol.n.a@javeriana.edu.co`; posible correo relacionado `semilleroldpe@javeriana.edu.co`; backup `hernandez-s@javeriana.edu.co`.

### Canal manual o confirmacion adicional

- `agora-legacy-099` / Uninorte: el correo publicado `arturij@uninorte.edu.co` reboto; usar extension `4634` o redireccion manual.
- `agora-legacy-111` / UNAL Literatura: usar `deplit_bog@unal.edu.co` solo para pedir redireccion si se decide contacto manual.
- `agora-legacy-131` / UNAL: el correo `fariverab@unal.edu.co` aparece en publicaciones, pero reboto como inexistente.
- `agora-legacy-170` / UNAL Historia: `sgallini@unal.edu.co` sigue publicado; posibles canales de linea/departamento `hacal.un@gmail.com` y `dephistoria_bog@unal.edu.co`.
- `agora-legacy-243` / UNAL/externo: aparecen correos externos `jmdiazster@gmail.com` y `juan.diaz@marviva.net`; requieren decision manual por no ser canal institucional principal.
- `agora-legacy-289` / UNAL: el correo publicado `pmunozs@unal.edu.co` reboto; usar extension `16328` o busqueda manual adicional.

## Reglas para siguiente accion

- Enviar solo los 3 casos con correo corregido despues de revision manual del preview.
- No reintentar los 6 casos Javeriana mientras el rebote sea de tipo `mail loop`.
- No usar correos externos sin decision manual del operador.
- Registrar cualquier accion real en `contactos-maestro-operativo.csv`, `leads-agora-maestro.csv` y `correos-enviados-importar.csv`.
