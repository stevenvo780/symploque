# Micro-ronda centros de escritura - 2026-05-04

> Estado: preparada para aprobacion. No se importo ERPNext, no se envio correo
> y no se modifico el maestro operativo.

## Objetivo

Probar una micro-ronda altamente enfocada en centros de escritura antes de
abrir `wave_4` completa. La hipotesis es que estos centros tienen el fit mas
directo: tutorias, talleres, borradores, evidencias de acompanamiento y equipos
pequenos.

## Lote recomendado

| Prioridad | Contacto | Institucion | Score | Email |
|---:|---|---|---:|---|
| 1 | CLEO Centro de Lectura Escritura y Oralidad | Universidad de La Salle | 92 | `cleo@lasalle.edu.co` |
| 2 | CELOA Centro de Escritura Lectura y Oralidad Academica | Universidad Santiago de Cali | 91 | `celoa@usc.edu.co` |
| 3 | Centro de Escritura Unicauca | Universidad del Cauca | 90 | `centroescritura@unicauca.edu.co` |

Backups si se decide ampliar a 5:

- CELEO Politecnico Grancolombiano: `jjrodriguez@poligran.edu.co`
- Centro de Escritura Luis Amigo: `centro.escritura@amigo.edu.co`

## Mensaje base

Asunto:

```text
Demo breve para acompanamiento de lectura y escritura academica
```

Cuerpo:

```text
Hola, equipo de {contact_name}.

Soy Steven Vallejo, de Elenxos, equipo nacido desde la Universidad de Antioquia. Estamos construyendo Agora, una herramienta para ordenar lectura, escritura, fuentes, acuerdos y seguimiento en procesos academicos colaborativos.

Vi que {contact_name} acompana procesos de lectura, escritura u oralidad con estudiantes y docentes.
Por eso pense que una demo breve podria servirles para evaluar si Agora ayuda a centralizar recursos, borradores, evidencias de acompanamiento y trabajo entre el equipo.

Sitios oficiales:
https://www.elenxos.com/
https://agora.elenxos.com/

Les interesaria una demo de 15 minutos o que les envie primero un ejemplo de workspace aplicado a un centro de escritura?
```

## Ejecucion segura

1. Importar o sincronizar solo estos leads en ERPNext si se aprueba.
2. Enviar con script controlado o manualmente desde `ventas@elenxos.com`.
3. Registrar cada envio en `correos-enviados-importar.csv`.
4. Medir respuesta antes de abrir `wave_4` completa.
