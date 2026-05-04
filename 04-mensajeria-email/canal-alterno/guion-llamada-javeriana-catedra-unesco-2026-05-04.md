# Guion llamada Javeriana Catedra UNESCO - 2026-05-04

> Estado: preparado para ejecucion manual en dia habil. El entorno del repo no puede realizar llamadas telefonicas reales.

## Contacto

- Contact ID: `agora-legacy-033`
- Unidad: Catedra UNESCO de Comunicacion - Javeriana
- Canal: telefono directo
- Numero: `+57 311 592 6487`
- Link local: `tel:+573115926487`
- Fuente: `https://www.javeriana.edu.co/unesco/contacto.html`

## Objetivo

Conseguir correo institucional, persona encargada o redireccion adecuada para enviar una invitacion breve a demo de Agora. No vender por telefono ni insistir si el canal no corresponde.

## Guion inicial

```text
Hola, habla Steven Vallejo de Elenxos. Somos un equipo nacido desde la Universidad de Antioquia. Queremos ubicar a la persona adecuada en la Catedra UNESCO de Comunicacion para enviarle una invitacion breve a una demo de Agora, una herramienta para ordenar lectura, escritura, fuentes y colaboracion academica.

Nos podrian indicar con quien hablar o a que correo institucional enviar la invitacion?
```

## Si piden mas contexto

```text
Claro. No es una solicitud de admisiones ni de prensa. Es una invitacion academica breve para mostrar una herramienta que ayuda a equipos de investigacion, escritura y docencia a centralizar fuentes, borradores, acuerdos y seguimiento. Solo buscamos el canal institucional correcto para enviar la informacion por escrito.
```

## Si entregan correo o nombre

```text
Perfecto, muchas gracias. Enviaremos un mensaje corto desde ventas@elenxos.com con los sitios oficiales de Elenxos y Agora.
```

Registrar:

- `outcome=email_received` si dan correo.
- `outcome=redirect_received` si dan persona, extension o unidad.
- `new_contact=<correo/persona/extension recibida>`.

## Si no corresponde

```text
Entendido, muchas gracias. No insistimos por este canal. Que tengas buen dia.
```

Registrar `outcome=not_relevant`.

## Registro posterior

Actualizar `05-datos-y-reportes/operacion-email/registro-canal-alterno-2026-04-30.csv` en la fila `agora-legacy-033` y correr:

```bash
python3 scripts/registrar_canal_alterno.py
```

Aplicar solo si el dry-run es correcto:

```bash
python3 scripts/registrar_canal_alterno.py --apply
```
