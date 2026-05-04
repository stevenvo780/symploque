# Protocolo WhatsApp institucional - 2026-04-30

> Objetivo: navegar bots institucionales de forma transparente para conseguir redireccion humana, correo oficial o contacto de coordinacion. No usar engano, identidad falsa ni pretextos.

## Regla base

El operador siempre debe presentarse como Elenxos/Agora y pedir redireccion institucional. Si el bot o asesor pregunta si somos aspirantes, proveedores o estudiantes, responder con honestidad:

```text
No somos aspirantes. Somos Elenxos, un equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada para presentar una demo breve de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Buscamos un correo institucional o redireccion a coordinacion/programa.
```

## Palabras utiles para bots

Usar una por una, no todas juntas:

- `asesor`
- `hablar con asesor`
- `otra consulta`
- `informacion academica`
- `pregrados`
- `programa academico`
- `coordinacion`
- `correo institucional`
- `transferir`
- `menu`

Si el bot no entiende:

```text
Otra consulta
```

Si ofrece menu de admisiones:

```text
Pregrados
```

Si pide programa:

```text
[nombre del programa]
```

Si ofrece asesor humano:

```text
Hablar con asesor
```

## Mensaje inicial corto

Este mensaje sirve antes de entrar al menu o cuando aparece un asesor:

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en [unidad/programa] para presentarle una demo breve de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o contacto de coordinacion?
```

## Mensaje si el bot pide seleccionar tipo de usuario

```text
Otra consulta
```

Si no existe esa opcion:

```text
Informacion academica
```

Si insiste en aspirante/estudiante:

```text
No somos aspirantes ni estudiantes. Buscamos redireccion institucional a la coordinacion del programa o unidad academica.
```

## Mensaje si responde un asesor humano

```text
Gracias. Para ubicar bien la solicitud: somos Elenxos, equipo nacido desde la UdeA. Construimos Agora para organizar lectura, escritura, fuentes y colaboracion academica. Quisieramos enviar una invitacion breve a la persona adecuada de [unidad/programa] para una demo. Nos puede compartir el correo institucional de coordinacion o indicarnos con quien hablar?
```

## Si piden enlace o contexto

```text
Claro. Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

La idea es una demo breve, no una venta por WhatsApp. Solo buscamos el canal institucional correcto.
```

## Si el asesor no puede ayudar

```text
Entendido, gracias. Podrian indicarnos un correo general de la facultad, escuela o programa para solicitar redireccion formal?
```

## Si entregan correo o contacto

```text
Muchas gracias. Lo registramos y enviaremos una invitacion breve por el canal institucional.
```

Registrar inmediatamente:

- correo o contacto recibido;
- nombre del asesor si lo da;
- fecha;
- canal;
- siguiente accion;
- captura o nota manual fuera del repo si contiene datos sensibles.

## Secuencias por contacto

### `agora-legacy-018` - Pregrado en Literatura / EAFIT

- Canal: WhatsApp oficial
- Link: `https://wa.me/573216420341`
- Objetivo: obtener correo o contacto de coordinacion del Pregrado en Literatura.

Secuencia sugerida:

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en el Pregrado en Literatura de EAFIT para presentarle una demo breve de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o contacto de coordinacion?
```

Si aparece bot:

```text
Pregrados
```

Luego:

```text
Literatura
```

Luego:

```text
Hablar con asesor
```

### `agora-legacy-019` - Escuela de Artes y Humanidades / EAFIT

- Canal: WhatsApp oficial
- Link: `https://wa.me/573108992908`
- Objetivo: obtener correo de escuela o redireccion a pregrado/area academica.

Secuencia sugerida:

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en la Escuela de Artes y Humanidades de EAFIT para una demo breve de Agora sobre lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o redireccion?
```

Si aparece bot:

```text
Otra consulta
```

Luego:

```text
Hablar con asesor
```

### `agora-legacy-022` - Comunicacion Social y Periodismo / UPB

- Canal: WhatsApp oficial
- Link: `https://wa.me/573136035630`
- Objetivo: obtener correo o contacto de coordinacion de Comunicacion Social y Periodismo.

Secuencia sugerida:

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en Comunicacion Social y Periodismo de UPB para presentarle una demo breve de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o contacto de coordinacion?
```

Si aparece bot:

```text
Pregrados
```

Luego:

```text
Comunicacion Social y Periodismo
```

Luego:

```text
Hablar con asesor
```

### `agora-legacy-033` - Catedra UNESCO de Comunicacion / Javeriana

- Canal: telefono directo
- Link: `tel:+573115926487`
- Objetivo: obtener correo o contacto de coordinacion de la Catedra UNESCO de Comunicacion.

Guion:

```text
Hola, habla Steven Vallejo de Elenxos. Somos un equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en la Catedra UNESCO de Comunicacion para enviarle una invitacion breve a una demo de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica.

Nos podrian indicar con quien hablar o a que correo institucional enviar la invitacion?
```

## Registro operativo recomendado

Despues de cada intento, registrar en `05-datos-y-reportes/operacion-email/registro-canal-alterno-2026-04-30.csv`:

- `contact_id`
- `attempted_at`
- `operator`
- `channel`
- `route_used`
- `outcome`
- `new_contact`
- `next_action`
- `notes`

Estados sugeridos:

- `bot_no_human`
- `human_requested_context`
- `redirect_received`
- `email_received`
- `not_relevant`
- `retry_later`

## Aplicar resultados al maestro

Cuando el registro manual tenga `attempted_at` y `outcome` real, revisar primero en modo seco:

```bash
python3 scripts/registrar_canal_alterno.py
```

Si el resumen es correcto, aplicar:

```bash
python3 scripts/registrar_canal_alterno.py --apply
```

El script no envia mensajes ni toca servicios externos; solo actualiza los CSVs operativos con resultados ya confirmados por el operador.
