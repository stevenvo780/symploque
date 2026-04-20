# Lote 3 - Estrategia baja friccion

Fecha de preparacion: 2026-04-19

## Nota de control

El prompt operativo habla de `41` correos para `Uniandes`, `Javeriana`, `UPB` y `UIS` con `canal_preferido = email`.

El CSV real `03-datos/leads-agora-top-50-hoy.csv` hoy devuelve:

- `33` leads email con ese filtro
- `17` en `estado = contactado`
- `16` en `estado = pendiente`

No se inventaron los `8` faltantes.

Ademas:

- los canales institucionales `18`, `19` y `22` si son `whatsapp`
- el lead `33` es `telefono`, no `whatsapp`

Este lote deja:

1. los `33` correos listos en formato `email estilo WhatsApp`
2. la lista de prospeccion de LinkedIn B2B
3. los scripts para hablar con recepcion o canal institucional

## Regla de este lote

- asunto corto y en minusculas
- 3 lineas utiles
- sin HTML
- sin firma larga
- siempre incluir:
  - que somos un grupo de estudiantes emprendedores
  - que buscamos fortalecer el sector academico
  - el link `https://agora.humanizar.cloud`

## Correos listos

## Javeriana

### Lead 6

- `priority_rank`: 6
- `estado actual`: contactado
- `contacto`: centrodeescritura@javeriana.edu.co

**Asunto**

`idea rapida para escritura`

**Cuerpo**

```text
Hola, equipo de Centro de Escritura Javeriana.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y seguimiento de escritura en Javeriana. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

### Lead 7

- `priority_rank`: 7
- `estado actual`: contactado
- `contacto`: poticanaturalpoticaforzada@javeriana.edu.co

**Asunto**

`idea rapida para el semillero`

**Cuerpo**

```text
Hola, equipo de Semillero Decolonizando el Lenguaje.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creemos que Agora podria servir para ordenar lecturas, borradores y tareas del semillero. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido y le comparto un ejemplo.
```

### Lead 8

- `priority_rank`: 8
- `estado actual`: contactado
- `contacto`: semilleroldpe@javeriana.edu.co

**Asunto**

`idea rapida para el semillero`

**Cuerpo**

```text
Hola, equipo de Semillero Lenguajes Discursos y Practicas Educativas.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creemos que Agora podria servir para ordenar lecturas, borradores y tareas del semillero. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido y le comparto un ejemplo.
```

### Lead 32

- `priority_rank`: 32
- `estado actual`: pendiente
- `contacto`: catedraunesco@javeriana.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, equipo de Catedra UNESCO de Comunicacion.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir cuando una red o catedra necesita ordenar materiales, escritura y trabajo compartido. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indiquen con quien deberia hablar.
```

### Lead 49

- `priority_rank`: 49
- `estado actual`: pendiente
- `contacto`: atorresp@javeriana.edu.co

**Asunto**

`idea rapida para escritura`

**Cuerpo**

```text
Hola, Andrea Torres.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y seguimiento de escritura en Javeriana. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

### Lead 50

- `priority_rank`: 50
- `estado actual`: pendiente
- `contacto`: mo-diana@javeriana.edu.co

**Asunto**

`idea rapida para escritura`

**Cuerpo**

```text
Hola, Diana Moreno.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y seguimiento de escritura en Javeriana. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

## UIS

### Lead 12

- `priority_rank`: 12
- `estado actual`: contactado
- `contacto`: esclet@uis.edu.co

**Asunto**

`idea rapida para idiomas`

**Cuerpo**

```text
Hola, equipo de Escuela de Idiomas UIS.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar escritura, logica, archivos y trabajo compartido en la Escuela de Idiomas UIS. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indiquen con quien deberia hablar.
```

### Lead 13

- `priority_rank`: 13
- `estado actual`: contactado
- `contacto`: mlpena@uis.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Milton Leonardo Pena.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para trabajo de investigacion, lecturas y verificacion compartida. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

## UPB

### Lead 21

- `priority_rank`: 21
- `estado actual`: contactado
- `contacto`: asesoria.integral@upb.edu.co

**Asunto**

`idea rapida para el semestre`

**Cuerpo**

```text
Hola, equipo de Comunicacion Social y Periodismo.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para mostrar un flujo mas riguroso de escritura, trabajo colaborativo e investigacion en UPB. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirijan con quien lleve este frente.
```

### Lead 23

- `priority_rank`: 23
- `estado actual`: contactado
- `contacto`: johanna.villada@upb.edu.co

**Asunto**

`idea rapida para el semestre`

**Cuerpo**

```text
Hola, Niny Johanna Villada Castro.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para coordinar materiales, borradores y trabajo academico en UPB. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

### Lead 24

- `priority_rank`: 24
- `estado actual`: contactado
- `contacto`: erika.jaillier@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Erika Jaillier Castrillon.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para investigacion aplicada, borradores y trabajo con equipos pequenos. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 25

- `priority_rank`: 25
- `estado actual`: contactado
- `contacto`: juan.munoz@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Juan Fernando Munoz Uribe.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir cuando una red o catedra necesita ordenar materiales, escritura y trabajo compartido. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 26

- `priority_rank`: 26
- `estado actual`: contactado
- `contacto`: ximena.tabares@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Lida Ximena Tabares Higuita.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en UPB. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 27

- `priority_rank`: 27
- `estado actual`: contactado
- `contacto`: harol.salinas@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Harold Jimmy Salinas Arboleda.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en UPB. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 28

- `priority_rank`: 28
- `estado actual`: contactado
- `contacto`: luis.orcasitas@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Luis Jorge Orcasitas Pacheco.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en UPB. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 29

- `priority_rank`: 29
- `estado actual`: contactado
- `contacto`: luisfe.gutierrezcano@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Luis Fernando Gutierrez Cano.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en UPB. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 30

- `priority_rank`: 30
- `estado actual`: contactado
- `contacto`: claudiap.sanchez@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Claudia Patricia Sanchez Aguiar.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en UPB. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 31

- `priority_rank`: 31
- `estado actual`: contactado
- `contacto`: edwin.amaya@upb.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Edwin Alexander Amaya Vera.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en UPB. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

## Uniandes

### Lead 34

- `priority_rank`: 34
- `estado actual`: contactado
- `contacto`: n.vaughan20@uniandes.co

**Asunto**

`idea rapida para humanidades`

**Cuerpo**

```text
Hola, Nicolas Vaughan Caro.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede tener sentido para lectura, escritura y verificacion formal en Humanidades de Uniandes. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

### Lead 35

- `priority_rank`: 35
- `estado actual`: contactado
- `contacto`: af.patinha@uniandes.co

**Asunto**

`idea rapida para posgrado`

**Cuerpo**

```text
Hola, Ana Filipa Prata.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para trabajo de posgrado, seminarios y proyectos de investigacion. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 36

- `priority_rank`: 36
- `estado actual`: pendiente
- `contacto`: calzate@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Carolina Alzate.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 37

- `priority_rank`: 37
- `estado actual`: pendiente
- `contacto`: dsolodko@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, David Solodkow.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 38

- `priority_rank`: 38
- `estado actual`: pendiente
- `contacto`: maandrad@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Maria Mercedes Andrade.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 39

- `priority_rank`: 39
- `estado actual`: pendiente
- `contacto`: mbarrero@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Mario Barrero.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 40

- `priority_rank`: 40
- `estado actual`: pendiente
- `contacto`: g.bernado@uniandes.edu.co

**Asunto**

`idea rapida para posgrado`

**Cuerpo**

```text
Hola, Gemma Bernado.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para trabajo de posgrado, seminarios y proyectos de investigacion. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 41

- `priority_rank`: 41
- `estado actual`: pendiente
- `contacto`: mydiaz@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Myriam Diaz.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 42

- `priority_rank`: 42
- `estado actual`: pendiente
- `contacto`: ce.hernandez@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Camilo Hernandez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 43

- `priority_rank`: 43
- `estado actual`: pendiente
- `contacto`: a.lozano72@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Andrea Lozano Vasquez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 44

- `priority_rank`: 44
- `estado actual`: pendiente
- `contacto`: cmontill@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Claudia Montilla.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 45

- `priority_rank`: 45
- `estado actual`: pendiente
- `contacto`: j.pizarro188@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Jeronimo Pizarro.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 46

- `priority_rank`: 46
- `estado actual`: pendiente
- `contacto`: huramire@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Hugo Hernan Ramirez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 47

- `priority_rank`: 47
- `estado actual`: pendiente
- `contacto`: srestreporamirez@uniandes.edu.co

**Asunto**

`feedback rapido sobre esto`

**Cuerpo**

```text
Hola, Santiago Restrepo Ramirez.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para cursos, seminarios o acompanamiento de escritura en Uniandes. https://agora.humanizar.cloud
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

### Lead 48

- `priority_rank`: 48
- `estado actual`: pendiente
- `contacto`: literatura@uniandes.edu.co

**Asunto**

`idea rapida para el semestre`

**Cuerpo**

```text
Hola, equipo de Departamento de Literatura.
Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para coordinar materiales, borradores y trabajo academico en Uniandes. https://agora.humanizar.cloud
Si le ve sentido, me basta un feedback rapido o que me redirijan con quien lleve este frente.
```

## Prospeccion LinkedIn B2B

## Nota

La base actual no trae perfiles de LinkedIn ni nombres de directores para todos los casos.

Por eso aqui se dejan:

- contactos nominales cuando existen
- y consultas sugeridas cuando la base solo ofrece unidad o correo general

La nota de conexion debe mantenerse debajo de `300` caracteres.

## 1. Nicolas Vaughan Caro

- `base actual`: director departamento humanidades - Uniandes
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Nicolas%20Vaughan%20Caro%20Uniandes%20director%20departamento%20humanidades

**Nota de conexion**

```text
Hola, Nicolas. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.humanizar.cloud
```

## 2. Ana Filipa Prata

- `base actual`: directora doctorado en literatura - Uniandes
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Ana%20Filipa%20Prata%20Uniandes%20doctorado%20literatura

**Nota de conexion**

```text
Hola, Ana Filipa. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.humanizar.cloud
```

## 3. Gemma Bernado

- `base actual`: representante maestria en estudios clasicos - Uniandes
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Gemma%20Bernado%20Uniandes%20maestria%20estudios%20clasicos

**Nota de conexion**

```text
Hola, Gemma. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.humanizar.cloud
```

## 4. Escuela de Idiomas UIS

- `base actual`: unidad institucional, sin director nominal en el CSV
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Escuela%20de%20Idiomas%20UIS%20director

**Nota de conexion**

```text
Hola. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.humanizar.cloud
```

## 5. Comunicacion Social y Periodismo UPB

- `base actual`: no hay director nominal en el CSV; la puerta mas fuerte hoy es `Niny Johanna Villada Castro`
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Comunicacion%20Social%20y%20Periodismo%20UPB%20coordinacion%20practicas

**Nota de conexion**

```text
Hola. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.humanizar.cloud
```

## 6. Catedra UNESCO de Comunicacion

- `base actual`: unidad institucional Javeriana, sin director nominal en el CSV
- `busqueda sugerida`: https://www.linkedin.com/search/results/all/?keywords=Catedra%20UNESCO%20de%20Comunicacion%20Javeriana%20director

**Nota de conexion**

```text
Hola. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma de investigacion rigurosa: https://agora.humanizar.cloud
```

## Script de recepcion o bot institucional

## Nota

El objetivo aqui no es vender.

El objetivo es:

- conseguir correo directo
- conseguir extension
- o identificar el nombre del decisor humano

## Lead 18 - EAFIT - Pregrado en Literatura - WhatsApp institucional

- `canal`: `https://wa.me/573216420341`

**Script**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Estamos intentando mostrar la plataforma al Pregrado en Literatura. ¿Nos podrian compartir el correo o la extension de la coordinacion o direccion del programa? https://agora.humanizar.cloud
```

## Lead 19 - EAFIT - Escuela de Artes y Humanidades - WhatsApp institucional

- `canal`: `https://wa.me/573108992908`

**Script**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Queremos ubicar a la persona que lleve Literatura o un frente cercano en la Escuela de Artes y Humanidades. ¿Nos podrian compartir su correo o extension? https://agora.humanizar.cloud
```

## Lead 22 - UPB - Comunicacion Social y Periodismo - WhatsApp institucional

- `canal`: `https://wa.me/573136035630`

**Script**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Estamos tratando de ubicar a la coordinacion o direccion de Comunicacion Social y Periodismo. ¿Nos podrian compartir el correo o la extension del contacto correcto? https://agora.humanizar.cloud
```

## Lead 33 - Javeriana - Catedra UNESCO de Comunicacion - telefono directo

- `canal`: `tel:+573115926487`
- `nota`: este lead no es WhatsApp en el CSV actual; es telefono

**Script**

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Queremos ubicar a la persona que coordina la Catedra UNESCO de Comunicacion. ¿Nos podrian compartir su correo o extension directa? https://agora.humanizar.cloud
```

## Uso sugerido

1. Empezar por los `16` leads `pendiente` de este lote.
2. Reusar el mismo formato como recontacto corto para los `17` que ya estaban en `contactado`.
3. Hacer LinkedIn solo sobre cargos de arrastre.
4. Usar los canales institucionales solo para conseguir el contacto humano correcto.
