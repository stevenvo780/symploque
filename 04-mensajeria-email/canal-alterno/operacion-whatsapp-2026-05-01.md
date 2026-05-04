# Operacion WhatsApp canal alterno - 2026-05-01

> Estado: **3 de 3 WhatsApp enviados y confirmados**. Los 3 bots institucionales respondieron; asesores humanos no disponibles por festivo 1 de mayo. Pendiente: reintentar en dia habil y ejecutar `agora-legacy-033` por telefono.

## Preflight ejecutado

- Repo: `main...origin/main [ahead 1]`, con cambios operativos recientes en curso.
- Auditoria local: `python3 scripts/auditar_operacion_email.py --fail-on-blockers` paso con `blockers=0 warnings=0`.
- Rebotes desde el 2026-05-01: `0` detectados en dry-run IMAP.
- Mensajes no rebote desde el 2026-05-01: `0`.
- Registro de canal alterno: actualizado con resultados reales 2026-05-01.

## Ejecucion por Codex (intento 1)

- `2026-05-01 12:06 -05`: Codex abrio en Firefox los links prellenados pero no se confirmo envio desde terminal.

## Ejecucion por Antigravity (intento 2, confirmado)

- `2026-05-01 13:39 -05`: Mensaje enviado a `agora-legacy-018` (EAFIT Pregrados). Bot reconocio solicitud, ofrecio escalar a asesor humano. Se acepto. Asesores no disponibles por festivo.
- `2026-05-01 13:43 -05`: Mensaje enviado a `agora-legacy-019` (Universidad EAFIT / Artes y Humanidades). Bot Ana respondio, derivo a menu Pregrado-Posgrado. Asesores fuera de horario por festivo. Mensaje de seguimiento dejado.
- `2026-05-01 12:07 -05` (mensaje original) + `~13:58 -05` (navegacion bot): Mensaje enviado a `agora-legacy-022` (UPB Comunicacion Social). Bot GEMA recolecto datos, derivo a menu Pregrados. Asesores no disponibles por festivo. Mensaje final dejado.
- `agora-legacy-033` (Javeriana Catedra UNESCO): **pendiente** — contacto por telefono, debe ejecutarse en dia habil.
- Registro actualizado en `05-datos-y-reportes/operacion-email/registro-canal-alterno-2026-04-30.csv`.

## Guardrail operativo

- Presentarse siempre como Elenxos/Agora.
- No fingir ser aspirante, estudiante, proveedor oculto ni usuario final.
- Pedir redireccion institucional, correo oficial o contacto de coordinacion.
- Enviar una sola vez por contacto mientras no haya respuesta.
- Si entregan correo/contacto, registrar y no insistir por WhatsApp.

Protocolo completo: `04-mensajeria-email/protocolo-whatsapp-bots-2026-04-30.md`.

## Orden de ejecucion

1. `agora-legacy-018` - Pregrado en Literatura / EAFIT.
2. `agora-legacy-019` - Escuela de Artes y Humanidades / EAFIT.
3. `agora-legacy-022` - Comunicacion Social y Periodismo / UPB.
4. `agora-legacy-033` - Catedra UNESCO de Comunicacion / Javeriana, por telefono directo.

## WhatsApp 1 - EAFIT Literatura

- Contact ID: `agora-legacy-018`
- Canal: WhatsApp oficial
- Numero: `+57 321 642 0341`
- Fuente: `https://www.eafit.edu.co/pregrados/escuela-artes-humanidades/literatura`
- Link prellenado:
  `https://wa.me/573216420341?text=Hola.%20Somos%20Steven%20Vallejo%20y%20Jacob%20Agudelo%20de%20Elenxos%2C%20equipo%20nacido%20desde%20la%20UdeA.%20Queremos%20ubicar%20a%20la%20persona%20adecuada%20en%20el%20Pregrado%20en%20Literatura%20de%20EAFIT%20para%20presentarle%20una%20demo%20breve%20de%20Agora%2C%20una%20herramienta%20para%20ordenar%20lectura%2C%20escritura%2C%20fuentes%20y%20colaboracion%20academica.%20Nos%20pueden%20indicar%20correo%20institucional%20o%20contacto%20de%20coordinacion%3F`

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en el Pregrado en Literatura de EAFIT para presentarle una demo breve de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o contacto de coordinacion?
```

Si aparece bot: `Pregrados` -> `Literatura` -> `Hablar con asesor`.

## WhatsApp 2 - EAFIT Artes y Humanidades

- Contact ID: `agora-legacy-019`
- Canal: WhatsApp oficial
- Numero: `+57 310 899 2908`
- Fuente: `https://www.eafit.edu.co/artesyhumanidades`
- Link prellenado:
  `https://wa.me/573108992908?text=Hola.%20Somos%20Steven%20Vallejo%20y%20Jacob%20Agudelo%20de%20Elenxos%2C%20equipo%20nacido%20desde%20la%20UdeA.%20Queremos%20ubicar%20a%20la%20persona%20adecuada%20en%20la%20Escuela%20de%20Artes%20y%20Humanidades%20de%20EAFIT%20para%20una%20demo%20breve%20de%20Agora%20sobre%20lectura%2C%20escritura%2C%20fuentes%20y%20colaboracion%20academica.%20Nos%20pueden%20indicar%20correo%20institucional%20o%20redireccion%3F`

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en la Escuela de Artes y Humanidades de EAFIT para una demo breve de Agora sobre lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o redireccion?
```

Si aparece bot: `Otra consulta` -> `Hablar con asesor`.

## WhatsApp 3 - UPB Comunicacion Social y Periodismo

- Contact ID: `agora-legacy-022`
- Canal: WhatsApp oficial
- Numero: `+57 313 603 56 30`
- Fuente: `https://portal.upb.edu.co/pregrados/comunicacion-social-medellin/`
- Link prellenado:
  `https://wa.me/573136035630?text=Hola.%20Somos%20Steven%20Vallejo%20y%20Jacob%20Agudelo%20de%20Elenxos%2C%20equipo%20nacido%20desde%20la%20UdeA.%20Queremos%20ubicar%20a%20la%20persona%20adecuada%20en%20Comunicacion%20Social%20y%20Periodismo%20de%20UPB%20para%20presentarle%20una%20demo%20breve%20de%20Agora%2C%20una%20herramienta%20para%20ordenar%20lectura%2C%20escritura%2C%20fuentes%20y%20colaboracion%20academica.%20Nos%20pueden%20indicar%20correo%20institucional%20o%20contacto%20de%20coordinacion%3F`

```text
Hola. Somos Steven Vallejo y Jacob Agudelo de Elenxos, equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en Comunicacion Social y Periodismo de UPB para presentarle una demo breve de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica. Nos pueden indicar correo institucional o contacto de coordinacion?
```

Si aparece bot: `Pregrados` -> `Comunicacion Social y Periodismo` -> `Hablar con asesor`.

## Telefono - Javeriana Catedra UNESCO

- Contact ID: `agora-legacy-033`
- Canal: telefono directo
- Numero: `+57 311 592 6487`
- Fuente: `https://www.javeriana.edu.co/unesco/contacto.html`
- Link de llamada: `tel:+573115926487`

```text
Hola, habla Steven Vallejo de Elenxos. Somos un equipo nacido desde la UdeA. Queremos ubicar a la persona adecuada en la Catedra UNESCO de Comunicacion para enviarle una invitacion breve a una demo de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica.

Nos podrian indicar con quien hablar o a que correo institucional enviar la invitacion?
```

## Registro posterior

Despues de cada intento real, completar `05-datos-y-reportes/operacion-email/registro-canal-alterno-2026-04-30.csv`:

- `attempted_at`: fecha/hora local, por ejemplo `2026-05-01 09:30`.
- `operator`: nombre de quien ejecuto el contacto.
- `route_used`: palabras usadas o ruta del menu, por ejemplo `Pregrados > Literatura > asesor`.
- `outcome`: `bot_no_human`, `human_requested_context`, `redirect_received`, `email_received`, `not_relevant` o `retry_later`.
- `new_contact`: correo/contacto recibido, si aplica.
- `next_action`: accion concreta posterior.
- `notes`: resumen breve sin capturas ni datos sensibles.

Luego revisar:

```bash
python3 scripts/registrar_canal_alterno.py
```

Aplicar solo si el dry-run muestra los contactos correctos:

```bash
python3 scripts/registrar_canal_alterno.py --apply
```
