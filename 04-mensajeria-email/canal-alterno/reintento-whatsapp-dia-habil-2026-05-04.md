# Reintento WhatsApp dia habil - 2026-05-04

> Estado: preparado. Usar solo si el 2026-05-04 no hubo respuesta humana previa en los chats abiertos el 2026-05-01.

## Contexto

El 2026-05-01 se enviaron 3 WhatsApp oficiales por canal alterno. Los tres bots respondieron, pero los asesores no estaban disponibles por festivo.

Contactos:

- `agora-legacy-018` - EAFIT Pregrado en Literatura.
- `agora-legacy-019` - EAFIT Escuela de Artes y Humanidades.
- `agora-legacy-022` - UPB Comunicacion Social y Periodismo.

## Regla

- No reenviar el mensaje largo.
- No abrir un hilo nuevo si el chat anterior sigue disponible.
- Enviar solo un recordatorio corto para pedir asesor humano o correo institucional.
- Si hay asesor humano, responder con identidad transparente Elenxos/Agora.

## Mensaje comun de reintento

```text
Hola, buen dia. Retomo este mensaje porque el 1 de mayo los asesores no estaban disponibles. Somos Elenxos, equipo nacido desde la UdeA, y solo buscamos el correo institucional o contacto adecuado para enviar una invitacion breve a una demo de Agora. Nos pueden redirigir con la persona encargada?
```

## EAFIT Literatura - `agora-legacy-018`

Si el bot pide ruta:

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

Si responde humano:

```text
Gracias. La solicitud es para ubicar a la persona adecuada del Pregrado en Literatura. Queremos enviar una invitacion breve a una demo de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Que correo institucional recomiendan?
```

## EAFIT Artes y Humanidades - `agora-legacy-019`

Si el bot pide ruta:

```text
Otra consulta
```

Luego:

```text
Hablar con asesor
```

Si responde humano:

```text
Gracias. La solicitud es para ubicar a la persona adecuada en la Escuela de Artes y Humanidades. Somos Elenxos/Agora y queremos enviar una invitacion breve a demo por canal institucional. Nos pueden compartir correo o redireccion?
```

## UPB Comunicacion Social - `agora-legacy-022`

Si GEMA vuelve a pedir datos y no permite asesor:

```text
Ya dejamos la solicitud inicial. Buscamos redireccion institucional para Comunicacion Social y Periodismo, no informacion de admisiones. Nos pueden comunicar con asesor humano o compartir correo del programa?
```

Si responde humano:

```text
Gracias. Queremos ubicar a la persona adecuada en Comunicacion Social y Periodismo para enviar una invitacion breve a demo de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Que correo institucional recomiendan?
```

## Registro despues del reintento

Actualizar `05-datos-y-reportes/operacion-email/registro-canal-alterno-2026-04-30.csv` con una nueva nota en `notes` o cambiar `outcome` si hubo avance:

- `redirect_received`: entregaron persona o unidad.
- `email_received`: entregaron correo.
- `retry_later`: pidieron volver a escribir.
- `bot_no_human`: no se logro salir del bot.
- `not_relevant`: canal rechazo la solicitud o no corresponde.

Despues correr:

```bash
python3 scripts/registrar_canal_alterno.py
```

Aplicar solo si el dry-run es correcto:

```bash
python3 scripts/registrar_canal_alterno.py --apply
```
