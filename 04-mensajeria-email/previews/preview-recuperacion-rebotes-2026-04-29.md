# Preview recuperacion de rebotes - 2026-04-29

> Estado: ejecutado parcialmente el 2026-04-30. Se enviaron solo los 3 correos corregidos; no se reintentaron casos Javeriana ni contactos sin confirmacion.

- Revision fuente: `05-datos-y-reportes/operacion-email/revision-correos-alternativos-rebotes-2026-04-29.md`
- Tabla operativa: `05-datos-y-reportes/operacion-email/rebotes-recuperacion-2026-04-29.csv`
- Envio recomendado ahora: solo 3 contactos con correo corregido.
- Casos en espera: 6 Javeriana por `mail loop`, 6 por canal manual o confirmacion adicional.
- Ejecucion: `recuperacion_rebote_2026_04_30`, 3 enviados, 0 fallidos, copias en `Sent`.

## Guardrails

- No reenviar a direcciones que rebotaron sin cambio verificable.
- No hacer reintentos masivos de Javeriana mientras el diagnostico sea `Hop count exceeded`.
- Enviar como primer contacto, no como disculpa ni declaracion.
- No usar correos externos sin decision manual.
- Registrar cada envio real con fecha, campana, remitente y resultado.

## Enviados por correo manual revisado

### 1. Luis Fernando Gutierrez Cano - UPB

- Contact ID: `agora-legacy-029`
- Correo rebotado: `luisfe.gutierrezcano@upb.edu.co`
- Correo candidato: `luisfe.gutierrez@upb.edu.co`
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
- Asunto sugerido: `Agora para organizar fuentes, escritura y trabajo de investigacion`

```text
Hola Maria Emilia,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Por tu trabajo en linguistica y documentacion, creemos que Agora podria ser util para organizar materiales, evidencias, borradores y colaboracion en proyectos academicos. Nos gustaria mostrarte una demo breve y escuchar si hay algun caso donde pueda aportar.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

### 3. Maria Eugenia Lopez - UNAL Bogota

- Contact ID: `agora-legacy-148`
- Correo rebotado: `melopezhu@unal.edu.co`
- Correo candidato: `melopez@unal.edu.co`
- Asunto sugerido: `Agora para ordenar escritura, fuentes y colaboracion academica`

```text
Hola Maria Eugenia,

Somos Steven Vallejo y Jacob Agudelo de Elenxos, un equipo nacido desde la Universidad de Antioquia. Construimos Agora para ordenar lectura, escritura, fuentes y colaboracion academica en equipos que investigan, ensenan o producen conocimiento.

Por tu trabajo en lenguas extranjeras e investigacion pedagogica, creemos que Agora podria ser util para centralizar materiales, evidencias, borradores y acompanamiento de proyectos academicos.

Si tiene sentido, nos gustaria compartirte una demo breve.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## En espera por problema de dominio Javeriana

No enviar ahora. Los correos siguen publicados o tienen backup, pero el rebote fue de infraestructura (`Hop count exceeded - possible mail loop`).

| Contact ID | Correo | Backup si persiste el problema |
|---|---|---|
| `agora-legacy-052` | `varga@javeriana.edu.co` | `va.solano@javeriana.edu.co` |
| `agora-legacy-056` | `m.lopeza01@javeriana.edu.co` | `va.solano@javeriana.edu.co` |
| `agora-legacy-057` | `investigacioncisc@javeriana.edu.co` | `aquinones@javeriana.edu.co` |
| `agora-legacy-059` | `maximoni.lopez@javeriana.edu.co` | `ibermejo@javeriana.edu.co`, `va.solano@javeriana.edu.co` |
| `agora-legacy-072` | `semillerosubjetividad@javeriana.edu.co` | `ibermejo@javeriana.edu.co`, `va.solano@javeriana.edu.co` |
| `agora-legacy-076` | `semillerol.n.a@javeriana.edu.co` | `semilleroldpe@javeriana.edu.co`, `hernandez-s@javeriana.edu.co` |

## En espera por canal manual o confirmacion adicional

| Contact ID | Contacto | Motivo | Ruta sugerida |
|---|---|---|---|
| `agora-legacy-099` | Jesus Anturi Perdomo | correo publicado reboto | extension `4634` |
| `agora-legacy-111` | Patricia Trujillo Monton | sin correo personal alternativo | `deplit_bog@unal.edu.co` para redireccion |
| `agora-legacy-131` | Fernando Alfredo Rivera | correo publicado reboto como inexistente | confirmar manualmente antes de insistir |
| `agora-legacy-170` | Stefania Gallini | correo publicado reboto como inexistente | `hacal.un@gmail.com` o departamento solo si se decide manualmente |
| `agora-legacy-243` | Juan Manuel Diaz Merlano | alternos externos/no institucionales | decidir manualmente si procede |
| `agora-legacy-289` | Pablo Munoz Specht | correo publicado reboto como inexistente | extension `16328` o busqueda adicional |
