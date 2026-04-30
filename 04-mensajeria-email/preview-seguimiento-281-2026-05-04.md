# Preview seguimiento 281 pendientes - 2026-05-04

> Estado: preparado para revision. No enviar antes del 2026-05-04 y no ejecutar sin nueva revision de respuestas/rebotes.

- Base: `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv`
- Plan: `05-datos-y-reportes/operacion-email/plan-seguimiento-281-2026-05-04.md`
- Plantilla base: `04-mensajeria-email/05-seguimiento-corto.md`
- Pendientes actuales: 281
- Excluir siempre: rebotados, contactos por canal alterno, respuestas humanas, redirecciones ya registradas.

## Distribucion actual

| Grupo | Cantidad |
|---|---:|
| `wave_1` pendientes | 45 |
| `wave_2` pendientes | 62 |
| `wave_3` pendientes | 174 |
| Total seguimiento elegible | 281 |

## Regla de envio

1. El 2026-05-04, revisar INBOX y rebotes antes de generar lote final.
2. Excluir cualquier contacto que haya respondido, rebotado de nuevo o quedado con redireccion manual.
3. Mantener asunto como `RE: {{last_subject}}` para conservar contexto.
4. Enviar en orden: `wave_1`, `wave_2`, `wave_3`.
5. Hacer preview pequeno antes de cualquier envio real.
6. Registrar cada envio real en `correos-enviados-importar.csv` y `contactos-maestro-operativo.csv`.

## Variante 1 - Semilleros y grupos

```text
Hola {{contact_name}},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para que semilleros y grupos academicos puedan ordenar fuentes, notas, borradores y tareas en un mismo espacio de trabajo.

Pensamos que en {{role_or_unit}} de {{institution}} podria servir para sostener memoria de trabajo y coordinar mejor lo que hoy suele quedar repartido entre correos, Drive y chats.

Si tiene sentido, puedo compartir una demo breve con un caso de semillero.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## Variante 2 - Coordinaciones, programas y practicas

```text
Hola {{contact_name}},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para ordenar lectura, escritura, fuentes y seguimiento academico en procesos con estudiantes, cohortes o trabajos de grado.

Pensamos que en {{role_or_unit}} de {{institution}} podria servir como un piloto pequeno para centralizar materiales, avances y evidencias sin aumentar la carga operativa del equipo.

Si lo ves pertinente, puedo compartir una demo concreta de 10 a 15 minutos.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## Variante 3 - Docentes e investigadores

```text
Hola {{contact_name}},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para apoyar trabajo academico con fuentes, notas, borradores y colaboracion en proyectos de investigacion o docencia.

Por el perfil de {{role_or_unit}} en {{institution}}, creemos que podria tener sentido explorarlo en un caso pequeno: un curso, un grupo de lectura, un proyecto o una linea de investigacion.

Si te interesa, puedo enviarte una demo breve y concreta.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## Variante 4 - Centros de escritura, revistas y medios

```text
Hola {{contact_name}},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para ordenar procesos de escritura, revision, fuentes y produccion textual colaborativa.

Pensamos que en {{role_or_unit}} de {{institution}} podria ser util para acompanamiento de borradores, memoria editorial o seguimiento de textos en proceso.

Si tiene sentido, puedo compartir una demo breve enfocada en escritura y revision.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## Variante 5 - Humanidades / generica segura

```text
Hola {{contact_name}},

Te escribo de nuevo brevemente por si mi correo anterior se perdio entre mensajes.

En Elenxos, un equipo nacido desde la UdeA, estamos construyendo Agora para ordenar fuentes, borradores y colaboracion academica en equipos que leen, escriben, investigan o ensenan.

Pensamos que en {{role_or_unit}} de {{institution}} podria ser util si hay procesos donde se mezclan documentos, notas, evidencias y seguimiento de trabajo.

Si tiene sentido, puedo compartir una demostracion breve y concreta.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/
```

## Mapping sugerido por segmento

| Segmentos | Variante |
|---|---|
| `semillero`, `grupo de investigacion` | Variante 1 |
| `practicas`, `pregrado`, `programa`, `posgrado`, `administrativo` | Variante 2 |
| `docencia`, `linguistica`, `lenguas extranjeras`, `literatura`, `ciencias humanas`, `humanidades` | Variante 3 o 5 |
| `centro de escritura`, `revista`, `comunicaciones`, `periodismo`, `realizacion` | Variante 4 |
| segmentos ambiguos | Variante 5 |

## Checklist previo al envio real

- [ ] INBOX revisado el 2026-05-04.
- [ ] Rebotes sincronizados.
- [ ] 15 rebotados excluidos o recuperados por flujo separado.
- [ ] 4 canales alternos no mezclados en seguimiento email.
- [ ] Lote final revisado con conteo exacto.
- [ ] Preview de al menos 10 mensajes aprobado.
- [ ] Envio real autorizado explicitamente.
