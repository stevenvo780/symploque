# Preview recuperacion de rebotes - 2026-04-28

> Estado: listo para revision manual. No se enviaron correos desde el repo.

- Revision fuente: `05-datos-y-reportes/operacion-email/revision-correos-alternativos-rebotes-2026-04-28.md`
- Tabla operativa: `05-datos-y-reportes/operacion-email/rebotes-recuperacion-2026-04-28.csv`
- Envio recomendado ahora: solo 2 contactos con correo corregido.
- Casos en espera: 4 Javeriana por `mail loop`, 2 por canal manual.

## Guardrails

- No reenviar a direcciones que rebotaron sin cambio verificable.
- No hacer reintentos masivos de Javeriana mientras el diagnostico sea `Hop count exceeded`.
- Enviar como primer contacto, no como disculpa ni declaracion.
- Registrar cada envio real con fecha, campana, remitente y resultado.

## Listos para correo manual revisado

### 1. Luis Fernando Gutierrez Cano - UPB

- Contact ID: `agora-legacy-029`
- Correo rebotado: `luisfe.gutierrezcano@upb.edu.co`
- Correo candidato: `luisfe.gutierrez@upb.edu.co`
- Fuente: `https://repository.upb.edu.co/bitstream/handle/20.500.11912/8688/GT10.%20Comunicaci%C3%B3n%2C%20tecnolog%C3%ADa%20y%20desarrollo.pdf?isAllowed=y&sequence=37`
- Asunto sugerido: `Demo breve de Agora para investigacion y escritura academica`

```text
Hola Luis Fernando,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Creemos que puede ser util para flujos de comunicacion, investigacion y produccion textual en contexto universitario. Nos gustaria mostrarte una demo breve y ver si tiene sentido para algun grupo, curso o proyecto cercano a tu trabajo.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

### 2. Maria Emilia Montes - UNAL Bogota

- Contact ID: `agora-legacy-124`
- Correo rebotado: `memontesro@unal.edu.co`
- Correo candidato: `memontesr@unal.edu.co`
- Fuente: `https://www.humanas.unal.edu.co/2017/unidades-academicas/departamentos/linguistica/programas/maestria/equipo`
- Asunto sugerido: `Agora para organizar fuentes, escritura y trabajo de investigacion`

```text
Hola Maria Emilia,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Por tu trabajo en linguistica y documentacion, creemos que Agora podria ser util para organizar materiales, evidencias, borradores y colaboracion en proyectos academicos. Nos gustaria mostrarte una demo breve y escuchar si hay algun caso donde pueda aportar.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## En espera por problema de dominio Javeriana

No enviar ahora. Los correos siguen publicados oficialmente, pero el rebote fue de infraestructura (`Hop count exceeded - possible mail loop`).

| Contact ID | Correo | Backup si persiste el problema |
|---|---|---|
| `agora-legacy-052` | `varga@javeriana.edu.co` | `va.solano@javeriana.edu.co` |
| `agora-legacy-056` | `m.lopeza01@javeriana.edu.co` | `va.solano@javeriana.edu.co` |
| `agora-legacy-059` | `maximoni.lopez@javeriana.edu.co` | `ibermejo@javeriana.edu.co`, `va.solano@javeriana.edu.co` |
| `agora-legacy-072` | `semillerosubjetividad@javeriana.edu.co` | `ibermejo@javeriana.edu.co`, `va.solano@javeriana.edu.co` |

Accion recomendada:

```text
Esperar una nueva revision de rebotes o confirmar entregabilidad del dominio Javeriana antes de reintentar. Si el problema persiste, usar solo un contacto backup por unidad para pedir redireccion.
```

## En espera por canal manual

### Jesus Anturi Perdomo - Uninorte

- Correo publicado: `arturij@uninorte.edu.co`
- Fuente: `https://www.uninorte.edu.co/web/comunicaciones/inicio`
- Directorio: Coordinador Periodistico, ext `4634`
- Accion: no reenviar por email hasta confirmar entregabilidad; intentar canal manual o redireccion.

### Pablo Munoz Specht - UNAL Bogota

- Correo publicado: `pmunozs@unal.edu.co`
- Fuente: `https://www.humanas.unal.edu.co/2017/docentes/pablo-munoz-specht/perfil`
- Perfil: ext `16328`
- Accion: no reenviar por email; usar telefono/ext o busqueda manual adicional.
