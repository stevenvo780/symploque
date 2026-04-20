# Ejecucion Lote 3 y Seguimiento

Fecha de preparacion: 2026-04-19

## Nota de control

El universo de esta fase no son `41` leads.

El CSV real `03-datos/leads-agora-top-50-hoy.csv` devuelve hoy:

- `33` leads con `institution` en `Uniandes`, `Javeriana`, `UPB` y `UIS`
- `33` leads con `canal_preferido = email`
- `16` leads en `estado = pendiente`
- `17` leads en `estado = contactado`

No se inventaron los `8` faltantes.

Ademas:

- los canales institucionales `18`, `19` y `22` si son `whatsapp`
- el lead `33` es `telefono`, no `whatsapp`

## Regla operativa de esta fase

1. Ejecutar primero la `primera ola inmediata` sobre los `16` leads `pendiente`.
2. Usar `recontacto corto` solo sobre los `17` leads `contactado`.
3. Priorizar LinkedIn solo para cargos de arrastre o cuando el correo no mueva respuesta.
4. Usar recepcion institucional solo para conseguir el contacto humano correcto.
5. Actualizar el maestro despues de cada interaccion.

## Primera ola inmediata

### Lead 32

- `priority_rank`: 32
- `institution`: Javeriana
- `contact_name o saludo`: equipo de Catedra UNESCO de Comunicacion
- `contacto`: catedraunesco@javeriana.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto y buscar redireccion al decisor correcto si aplica

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, equipo de Catedra UNESCO de Comunicacion.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir cuando una red o catedra necesita ordenar materiales, escritura y trabajo compartido. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indiquen con quien deberia hablar.
```

### Lead 36

- `priority_rank`: 36
- `institution`: Uniandes
- `contact_name o saludo`: Carolina Alzate
- `contacto`: calzate@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Carolina Alzate.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 37

- `priority_rank`: 37
- `institution`: Uniandes
- `contact_name o saludo`: David Solodkow
- `contacto`: dsolodko@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, David Solodkow.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 38

- `priority_rank`: 38
- `institution`: Uniandes
- `contact_name o saludo`: Maria Mercedes Andrade
- `contacto`: maandrad@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Maria Mercedes Andrade.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 39

- `priority_rank`: 39
- `institution`: Uniandes
- `contact_name o saludo`: Mario Barrero
- `contacto`: mbarrero@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Mario Barrero.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 40

- `priority_rank`: 40
- `institution`: Uniandes
- `contact_name o saludo`: Gemma Bernado
- `contacto`: g.bernado@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy y, si responde, mover a validacion de decisor o derivacion interna

**Mensaje a usar**

`Asunto`: `idea rapida para posgrado`

```text
Hola, Gemma Bernado.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para trabajo de posgrado, seminarios y proyectos de investigacion. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 41

- `priority_rank`: 41
- `institution`: Uniandes
- `contact_name o saludo`: Myriam Diaz
- `contacto`: mydiaz@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Myriam Diaz.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 42

- `priority_rank`: 42
- `institution`: Uniandes
- `contact_name o saludo`: Camilo Hernandez
- `contacto`: ce.hernandez@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Camilo Hernandez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 43

- `priority_rank`: 43
- `institution`: Uniandes
- `contact_name o saludo`: Andrea Lozano Vasquez
- `contacto`: a.lozano72@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Andrea Lozano Vasquez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 44

- `priority_rank`: 44
- `institution`: Uniandes
- `contact_name o saludo`: Claudia Montilla
- `contacto`: cmontill@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Claudia Montilla.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 45

- `priority_rank`: 45
- `institution`: Uniandes
- `contact_name o saludo`: Jeronimo Pizarro
- `contacto`: j.pizarro188@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Jeronimo Pizarro.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 46

- `priority_rank`: 46
- `institution`: Uniandes
- `contact_name o saludo`: Hugo Hernan Ramirez
- `contacto`: huramire@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Hugo Hernan Ramirez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 47

- `priority_rank`: 47
- `institution`: Uniandes
- `contact_name o saludo`: Santiago Restrepo Ramirez
- `contacto`: srestreporamirez@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto

**Mensaje a usar**

`Asunto`: `feedback rapido sobre esto`

```text
Hola, Santiago Restrepo Ramirez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 48

- `priority_rank`: 48
- `institution`: Uniandes
- `contact_name o saludo`: equipo de Departamento de Literatura
- `contacto`: literatura@uniandes.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy y, si responde, mover a validacion de decisor o derivacion interna

**Mensaje a usar**

`Asunto`: `idea rapida para el semestre`

```text
Hola, equipo de Departamento de Literatura.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para coordinar materiales, borradores y trabajo academico en Uniandes. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido o que me redirijan con quien lleve este frente.
```

### Lead 49

- `priority_rank`: 49
- `institution`: Javeriana
- `contact_name o saludo`: Andrea Torres
- `contacto`: atorresp@javeriana.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto y buscar redireccion al decisor correcto si aplica

**Mensaje a usar**

`Asunto`: `idea rapida para escritura`

```text
Hola, Andrea Torres.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y seguimiento de escritura en Javeriana. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

### Lead 50

- `priority_rank`: 50
- `institution`: Javeriana
- `contact_name o saludo`: Diana Moreno
- `contacto`: mo-diana@javeriana.edu.co
- `estado actual`: pendiente
- `accion recomendada`: enviar hoy como primer contacto y buscar redireccion al decisor correcto si aplica

**Mensaje a usar**

`Asunto`: `idea rapida para escritura`

```text
Hola, Diana Moreno.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y seguimiento de escritura en Javeriana. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

## Recontacto corto

### Lead 6

- `priority_rank`: 6
- `institution`: Javeriana
- `contact_name o saludo`: equipo de Centro de Escritura Javeriana
- `contacto`: centrodeescritura@javeriana.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, equipo de Centro de Escritura Javeriana.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para escritura y seguimiento de borradores. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 7

- `priority_rank`: 7
- `institution`: Javeriana
- `contact_name o saludo`: equipo de Semillero Decolonizando el Lenguaje
- `contacto`: poticanaturalpoticaforzada@javeriana.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `cierro por aqui`

```text
Hola, equipo de Semillero Decolonizando el Lenguaje.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para ordenar lecturas, borradores y tareas del semillero. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 8

- `priority_rank`: 8
- `institution`: Javeriana
- `contact_name o saludo`: equipo de Semillero Lenguajes Discursos y Practicas Educativas
- `contacto`: semilleroldpe@javeriana.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `cierro por aqui`

```text
Hola, equipo de Semillero Lenguajes Discursos y Practicas Educativas.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para ordenar lecturas, borradores y tareas del semillero. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 12

- `priority_rank`: 12
- `institution`: UIS
- `contact_name o saludo`: equipo de Escuela de Idiomas UIS
- `contacto`: esclet@uis.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `le hago una ultima consulta`

```text
Hola, equipo de Escuela de Idiomas UIS.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para trabajo compartido en idiomas. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 13

- `priority_rank`: 13
- `institution`: UIS
- `contact_name o saludo`: Milton Leonardo Pena
- `contacto`: mlpena@uis.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `le hago una ultima consulta`

```text
Hola, Milton Leonardo Pena.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para investigacion, lecturas y verificacion compartida. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 21

- `priority_rank`: 21
- `institution`: UPB
- `contact_name o saludo`: equipo de Comunicacion Social y Periodismo
- `contacto`: asesoria.integral@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, equipo de Comunicacion Social y Periodismo.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para coordinar materiales y trabajo academico en comunicacion. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 23

- `priority_rank`: 23
- `institution`: UPB
- `contact_name o saludo`: Niny Johanna Villada Castro
- `contacto`: johanna.villada@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Niny Johanna Villada Castro.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para coordinar materiales y trabajo academico en comunicacion. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 24

- `priority_rank`: 24
- `institution`: UPB
- `contact_name o saludo`: Erika Jaillier Castrillon
- `contacto`: erika.jaillier@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Erika Jaillier Castrillon.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 25

- `priority_rank`: 25
- `institution`: UPB
- `contact_name o saludo`: Juan Fernando Munoz Uribe
- `contacto`: juan.munoz@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Juan Fernando Munoz Uribe.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 26

- `priority_rank`: 26
- `institution`: UPB
- `contact_name o saludo`: Lida Ximena Tabares Higuita
- `contacto`: ximena.tabares@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Lida Ximena Tabares Higuita.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 27

- `priority_rank`: 27
- `institution`: UPB
- `contact_name o saludo`: Harold Jimmy Salinas Arboleda
- `contacto`: harol.salinas@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Harold Jimmy Salinas Arboleda.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 28

- `priority_rank`: 28
- `institution`: UPB
- `contact_name o saludo`: Luis Jorge Orcasitas Pacheco
- `contacto`: luis.orcasitas@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Luis Jorge Orcasitas Pacheco.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 29

- `priority_rank`: 29
- `institution`: UPB
- `contact_name o saludo`: Luis Fernando Gutierrez Cano
- `contacto`: luisfe.gutierrezcano@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Luis Fernando Gutierrez Cano.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 30

- `priority_rank`: 30
- `institution`: UPB
- `contact_name o saludo`: Claudia Patricia Sanchez Aguiar
- `contacto`: claudiap.sanchez@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Claudia Patricia Sanchez Aguiar.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 31

- `priority_rank`: 31
- `institution`: UPB
- `contact_name o saludo`: Edwin Alexander Amaya Vera
- `contacto`: edwin.amaya@upb.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y cerrar pertinencia o redireccion

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Edwin Alexander Amaya Vera.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para cursos, seminarios o investigacion aplicada. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 34

- `priority_rank`: 34
- `institution`: Uniandes
- `contact_name o saludo`: Nicolas Vaughan Caro
- `contacto`: n.vaughan20@uniandes.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y, si no responde, priorizar LinkedIn el mismo dia

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Nicolas Vaughan Caro.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para lectura, escritura y verificacion formal en Humanidades. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

### Lead 35

- `priority_rank`: 35
- `institution`: Uniandes
- `contact_name o saludo`: Ana Filipa Prata
- `contacto`: af.patinha@uniandes.edu.co
- `estado actual`: contactado
- `accion recomendada`: enviar seguimiento corto y, si no responde, priorizar LinkedIn el mismo dia

**Mensaje a usar**

`Asunto`: `solo para confirmar`

```text
Hola, Ana Filipa Prata.
Le escribo una sola vez mas por si se me paso el correo anterior. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico y creo que esto puede servir para posgrado, seminarios y proyectos de investigacion. https://agora.elenxos.com
Si no le corresponde, me basta con que me redirija al contacto correcto o me diga si no aplica.
```

## Prospeccion LinkedIn consolidada

## Prioridad 1. Cargos de arrastre con nombre propio

### Nicolas Vaughan Caro

- `razon de prioridad`: director de departamento; si responde, puede redirigir o validar a nivel de Humanidades
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Nicolas%20Vaughan%20Caro%20Uniandes%20director%20departamento%20humanidades

**Nota de conexion final**

```text
Hola, Nicolas. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.elenxos.com
```

### Ana Filipa Prata

- `razon de prioridad`: direccion de doctorado; puerta de entrada a posgrado y profesores con arrastre
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Ana%20Filipa%20Prata%20Uniandes%20doctorado%20literatura

**Nota de conexion final**

```text
Hola, Ana Filipa. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.elenxos.com
```

### Gemma Bernado

- `razon de prioridad`: representante de maestria; puede abrir conversacion en posgrado sin tanta friccion
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Gemma%20Bernado%20Uniandes%20maestria%20estudios%20clasicos

**Nota de conexion final**

```text
Hola, Gemma. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.elenxos.com
```

## Prioridad 2. Unidades institucionales sin nombre propio

### Comunicacion Social y Periodismo UPB

- `razon de prioridad`: programa activo en el tramo, con varios docentes ya tocados y una puerta interna identificada
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Comunicacion%20Social%20y%20Periodismo%20UPB%20coordinacion%20practicas

**Nota de conexion final**

```text
Hola. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.elenxos.com
```

### Escuela de Idiomas UIS

- `razon de prioridad`: unidad institucional con potencial de uso transversal y solo dos correos disponibles en la base
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Escuela%20de%20Idiomas%20UIS%20director

**Nota de conexion final**

```text
Hola. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.elenxos.com
```

### Catedra UNESCO de Comunicacion

- `razon de prioridad`: red academica con correo general; la prioridad es encontrar el decisor humano
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Catedra%20UNESCO%20de%20Comunicacion%20Javeriana%20director

**Nota de conexion final**

```text
Hola. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.elenxos.com
```

## Recepcion institucional consolidada

### Lead 22

- `institucion`: UPB
- `programa o unidad objetivo`: Comunicacion Social y Periodismo
- `canal`: `https://wa.me/573136035630`
- `objetivo exacto`: conseguir correo o extension de coordinacion o direccion del programa
- `dato a capturar si funciona`: nombre del decisor, correo directo, extension, area correcta

**Script exacto**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Estamos tratando de ubicar a la coordinacion o direccion de Comunicacion Social y Periodismo. ¿Nos podrian compartir el correo o la extension del contacto correcto? https://agora.elenxos.com
```

### Lead 33

- `institucion`: Javeriana
- `programa o unidad objetivo`: Catedra UNESCO de Comunicacion
- `canal`: `tel:+573115926487`
- `objetivo exacto`: conseguir correo o extension directa de quien coordina la catedra
- `dato a capturar si funciona`: nombre del decisor, correo directo, extension, area correcta
- `nota`: este lead es `telefono`, no `whatsapp`

**Script exacto**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Queremos ubicar a la persona que coordina la Catedra UNESCO de Comunicacion. ¿Nos podrian compartir su correo o extension directa? https://agora.elenxos.com
```

### Lead 18

- `institucion`: EAFIT
- `programa o unidad objetivo`: Pregrado en Literatura
- `canal`: `https://wa.me/573216420341`
- `objetivo exacto`: conseguir correo o extension de coordinacion o direccion del programa
- `dato a capturar si funciona`: nombre del decisor, correo directo, extension, area correcta

**Script exacto**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Estamos intentando mostrar la plataforma al Pregrado en Literatura. ¿Nos podrian compartir el correo o la extension de la coordinacion o direccion del programa? https://agora.elenxos.com
```

### Lead 19

- `institucion`: EAFIT
- `programa o unidad objetivo`: Escuela de Artes y Humanidades
- `canal`: `https://wa.me/573108992908`
- `objetivo exacto`: conseguir correo o extension de la persona que lleve Literatura o un frente cercano
- `dato a capturar si funciona`: nombre del decisor, correo directo, extension, area correcta

**Script exacto**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Queremos ubicar a la persona que lleve Literatura o un frente cercano en la Escuela de Artes y Humanidades. ¿Nos podrian compartir su correo o extension? https://agora.elenxos.com
```

## Checklist de actualizacion del maestro

Despues de cada interaccion, actualizar como minimo:

- `estado`
- `fecha_ultimo_contacto`
- `respuesta`
- `proxima_accion`
- `fecha_proxima_accion`
- `owner`
- `notas`

## Uso sugerido

1. Ejecutar primero los `16` correos de `primera ola inmediata`.
2. En paralelo, abrir LinkedIn solo para `Nicolas Vaughan Caro`, `Ana Filipa Prata` y `Gemma Bernado`.
3. Usar los canales `22` y `33` antes que `18` y `19`, porque conectan mejor con el tramo actual.
4. Pasar a `recontacto corto` solo cuando la primera ola ya este enviada o cuando toque la ventana de seguimiento.
