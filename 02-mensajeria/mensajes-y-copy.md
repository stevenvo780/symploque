# Mensajes y Copy - Sistema modular de outreach

## Objetivo

Este archivo ya no funciona como una lista suelta de mensajes. Ahora es un sistema reusable para armar outreach segun:

- universidad
- tipo de contacto
- necesidad principal
- canal
- estrategia de captacion

La regla es simple: no mandar un mensaje genericamente correcto. Mandar un mensaje que parezca escrito para `{{institution}}`, para `{{role_or_unit}}` y para el momento comercial del lead.

## Variables base

Usar, cuando existan, los mismos nombres del CSV maestro:

- `{{contact_name}}`
- `{{institution}}`
- `{{city}}`
- `{{segment}}`
- `{{role_or_unit}}`
- `{{contact_type}}`
- `{{contact_value}}`
- `{{interes_principal}}`
- `{{plan_objetivo}}`
- `{{canal_preferido}}`
- `{{source_url}}`

## Variables derivadas

Estas no siempre salen literales del CSV. Se construyen rapido para que la plantilla quede natural.

- `{{saludo}}`: usar `{{contact_name}}` si es una persona. Si el lead es una unidad, usar `equipo de {{contact_name}}` o `equipo de {{role_or_unit}}`.
- `{{referencia_real}}`: pagina, unidad, semillero o programa visto en `{{source_url}}`.
- `{{proceso_academico}}`: practica, seminario, trabajo de grado, acompanamiento de escritura, flujo editorial o semillero.
- `{{curso_o_linea}}`: curso, linea de investigacion, programa o proyecto al que el lead esta asociado.
- `{{dolor_concreto}}`: problema principal que se va a nombrar en el mensaje.
- `{{bloque_de_valor}}`: lecturas, borradores, evidencias, tareas, materiales o comentarios segun el caso.
- `{{caso_de_uso}}`: demo o ejemplo que se va a prometer.
- `{{caso_de_uso_programa}}`: piloto aplicado a cohorte, programa, practicas o trabajo de grado.

## Regla de saludo

- Si `contact_name` es persona: `Hola, {{contact_name}}.`
- Si `contact_name` es unidad, comite, coordinacion o correo general: `Hola, equipo de {{contact_name}}.`
- Si el canal es WhatsApp institucional, usar una apertura aun mas corta y sin asunto.

## Regla de personalizacion minima

Cada mensaje debe tocar al menos 4 capas:

1. nombre o unidad real
2. universidad real
3. dolor concreto del segmento
4. siguiente paso pequeno y claro

Si falta una de esas 4 capas, el mensaje sigue demasiado generico.

## Como armar un mensaje en 2 minutos

1. tomar una fila del CSV
2. elegir la estrategia de captacion
3. elegir el bloque por universidad
4. elegir la plantilla por tipo de contacto
5. insertar una necesidad concreta
6. cerrar con un CTA pequeno: demo corta, ejemplo adaptado o piloto

Formula base:

`apertura institucional + dolor especifico + encaje de Agora + CTA pequeno`

## Selector rapido por estrategia

| Tipo de contacto | Estrategia de captacion | Objetivo del primer mensaje | Oferta sugerida |
|---|---|---|---|
| departamentos, programas, coordinaciones, escuelas | multiplicador institucional | abrir una conversacion con alguien que pueda arrastrar cohortes o procesos completos | piloto de programa o demo aplicada a una cohorte |
| profesores, investigadores, directores de linea | entrada por referente | activar interes desde una persona con autoridad academica o capacidad de meter semilleros, cursos o proyectos | caso de uso para seminario, semillero o proyecto de investigacion |
| semilleros y grupos estudiantiles | adopcion rapida | entrar por dolor operativo evidente y facilidad de prueba | workspace de semillero o piloto corto |
| centros de escritura, revistas, medios | nodo especializado | mostrar que Agora organiza acompanamiento, comentarios, flujo editorial y materiales | demo de flujo editorial o acompanamiento |
| clubes, bibliotecas, extension | visibilidad y comunidad | validar si hay encaje para comunidades de lectura y mediacion | ejemplo de comunidad de lectura |

## Selector rapido por necesidad del cliente

| Necesidad detectada | Senales en el lead | Mensaje que conviene usar |
|---|---|---|
| coordinacion de cohortes, practicas o programas | `segment` = practicas, programa, pregrado, escuela, departamento | plantilla para departamentos y programas |
| acompanamiento de escritura y retroalimentacion | centro de escritura, lengua materna, tutoria, asesoria | plantilla de centro de escritura o plantilla de profesor |
| investigacion colaborativa | semillero, grupo de investigacion, docente investigador | plantilla de semillero o profesor |
| flujo editorial y trabajo con borradores | revista, medio, editorial, comunicacion | plantilla editorial |
| lectura guiada o extension cultural | club, biblioteca, extension | plantilla de comunidad |

## Hooks por universidad

Usar solo uno por mensaje. La idea es sonar especifico, no recargado.

### UdeA

- Estamos empezando por UdeA porque ahi el cruce entre escritura, investigacion y coordinacion academica es muy visible.
- Ya estamos revisando casos donde materiales, borradores y seguimiento viven en espacios separados y generan friccion.

### Uniandes

- En Uniandes vemos un encaje claro en literatura, humanidades y trabajo docente donde conviven seminarios, investigacion y produccion escrita.
- Nos interesa especialmente mostrar un flujo simple para departamentos y profesores que trabajan lecturas, borradores y seguimiento academico.

### Javeriana

- En Javeriana hay un fit fuerte en lenguaje, centros de escritura y semilleros por el tipo de acompanamiento y trabajo con texto.
- La apuesta aqui es menos archivo suelto y mas seguimiento con contexto sobre lecturas, versiones y tareas.

### UPB

- En UPB el encaje se ve muy bien en comunicacion, periodismo, investigacion aplicada y flujos editoriales.
- El mensaje debe ir hacia coordinacion, produccion de contenidos y trabajo de equipos pequenos.

### EAFIT

- En EAFIT el punto fuerte es literatura, humanidades y comunidades de lectura donde se mezclan materiales, agenda y seguimiento.
- Conviene hablar de orden, continuidad y trabajo colaborativo sin depender de varios canales dispersos.

### Univalle

- En Univalle el caso mas claro aparece en la Escuela de Ciencias del Lenguaje y procesos donde la escritura y el acompanamiento son centrales.
- El mensaje debe resaltar organizacion de materiales, borradores y seguimiento academico.

### UNAL Medellin

- En UNAL Medellin el encaje esta en practicas, pasantias, facultad y proyectos con alto volumen de materiales y seguimiento.
- Conviene hablar de articulacion entre coordinacion, escritura y evidencias.

### UIS

- En UIS el mensaje entra mejor por idiomas, grupos de investigacion y coordinaciones que necesitan ordenar materiales y trabajo compartido.
- Conviene usar un tono sobrio y orientado a eficiencia academica.

### Hook general si la universidad no tiene bloque propio

- Estamos mostrando Agora a programas, semilleros y unidades academicas donde lectura, escritura y coordinacion siguen muy repartidas entre varias herramientas.
- Vi que en `{{institution}}` hay un contexto donde eso puede tener mucho sentido.

## Pitches base

### Pitch de 20 segundos

Agora es un workspace para investigar, escribir y coordinar conocimiento en equipo. Sirve para reunir lecturas, borradores, evidencias, tareas y archivos en un mismo lugar.

### Pitch de 60 segundos

Agora sirve para grupos y unidades academicas que trabajan con lectura, escritura, investigacion o produccion editorial. En vez de repartir el trabajo entre Drive, WhatsApp, documentos sueltos y cadenas de correos, permite centralizar materiales, borradores, comentarios, tareas y seguimiento dentro de un mismo workspace. Tiene mejor encaje en semilleros, programas, centros de escritura, revistas, grupos de investigacion y docentes con lineas activas.

## Plantilla madre

Usar esta base antes de bajar a cada segmento:

```text
Hola, {{saludo}}. Vi {{referencia_real}} en {{institution}} y pense que Agora podria tener encaje ahi.

Lo estamos mostrando a equipos que hoy tienen {{dolor_concreto}} repartido entre varias herramientas. Agora ayuda a reunir {{bloque_de_valor}} en un mismo workspace.

Si le hace sentido, le comparto un ejemplo armado para {{caso_de_uso}} y miramos en 15 minutos si vale la pena probar un piloto.
```

## Mensajes por tipo de contacto

### 1. Departamentos, programas, coordinaciones y escuelas

#### Cuando usarlo

- `segment` como practicas, programa, pregrado, escuela, departamento, pasantias
- cuando el lead puede arrastrar cohorte, curso, practica o linea completa

#### Dolor que se debe nombrar

- materiales dispersos
- seguimiento de estudiantes o cohortes
- borradores y evidencias desperdigadas
- coordinacion entre personas y momentos del proceso

#### Version email

```text
Asunto: idea para ordenar {{proceso_academico}} en {{institution}}

Hola, {{contact_name}}.

Vi {{role_or_unit}} en {{institution}} y pense que Agora podria tener buen encaje ahi. Estamos mostrando la herramienta a programas y coordinaciones donde lecturas, materiales, borradores, evidencias y seguimiento suelen quedar repartidos entre varias herramientas.

Agora permite reunir ese trabajo en un mismo workspace y puede servir especialmente en {{proceso_academico}}, donde importa tener materiales, tareas y avance visibles sin depender de carpetas y mensajes sueltos.

Si le interesa, le comparto un ejemplo ya armado para {{caso_de_uso_programa}} y vemos en una llamada corta si tendria sentido un piloto pequeno.
```

#### Version WhatsApp

```text
Hola, {{contact_name}}. Vi {{role_or_unit}} en {{institution}}.

Le escribo porque estamos mostrando Agora a programas y coordinaciones que necesitan ordenar materiales, borradores, evidencias y seguimiento en un mismo espacio.

Creo que podria servirles en {{proceso_academico}}. Si quiere, le mando un ejemplo concreto y vemos rapido si vale la pena un piloto.
```

#### Personalizacion recomendada

- UdeA: practicas, filologia, licenciatura, doble titulacion
- Uniandes: departamento, maestria, doctorado, estudios literarios
- Univalle: escuela, direccion, secretaria academica
- UNAL Medellin: pasantias, facultad, coordinacion de procesos

### 2. Profesores, investigadores y directores de linea

#### Cuando usarlo

- `segment` como docencia, investigacion, posgrado
- cuando la puerta de entrada es una persona con capacidad de activar curso, semillero o proyecto

#### Dolor que se debe nombrar

- lecturas y versiones dispersas
- comentarios sin contexto
- dificultad para seguir avances de estudiantes o auxiliares
- trabajo de investigacion y escritura repartido en demasiados canales

#### Version email

```text
Asunto: un flujo mas simple para {{curso_o_linea}} en {{institution}}

Hola, {{contact_name}}.

Vi su trabajo en {{role_or_unit}} en {{institution}} y quise escribirle porque Agora puede encajar bien en contextos donde se mezclan lectura, escritura, acompanamiento y coordinacion.

La herramienta ayuda a reunir lecturas, borradores, evidencias, tareas y archivos en un mismo workspace. Para profesores y grupos de investigacion esto suele ser util cuando hay que seguir avances, comentar textos y mantener contexto sin repartir todo entre carpetas, correos y chats.

Si le interesa, le comparto un caso de uso pensado para {{curso_o_linea}} o para un semillero asociado, y vemos si un piloto corto tiene sentido.
```

#### Version WhatsApp

```text
Hola, {{contact_name}}. Vi su trabajo en {{role_or_unit}} en {{institution}}.

Estamos mostrando Agora a profesores e investigadores que trabajan con lecturas, borradores y seguimiento de estudiantes o equipos. La idea es tener todo eso en un mismo workspace, con menos dispersion.

Si le sirve, le comparto un ejemplo rapido aplicado a {{curso_o_linea}} o a un proyecto de investigacion.
```

#### Personalizacion recomendada

- profesores Uniandes: hablar de seminarios, lineas de literatura y seguimiento de textos
- docentes UPB: hablar de comunicacion, periodismo, produccion de contenidos y proyectos de aula
- docentes investigadores UIS: hablar de grupo de investigacion, materiales y trabajo compartido

### 3. Semilleros y grupos de investigacion

#### Cuando usarlo

- `segment` como semillero o grupo de investigacion
- cuando el dolor operativo es evidente y la adopcion puede ser rapida

#### Dolor que se debe nombrar

- lecturas, notas y PDFs dispersos
- borradores sin seguimiento claro
- tareas y acuerdos en chats sueltos
- dificultad para sostener continuidad entre reuniones

#### Version email

```text
Asunto: piloto para organizar el trabajo de {{contact_name}}

Hola, {{contact_name}}.

Vi el trabajo de {{role_or_unit}} en {{institution}} y pense que Agora podria servirles bastante. Estamos mostrando la herramienta a semilleros y grupos que necesitan reunir lecturas, borradores, evidencias, tareas y archivos en un mismo espacio.

La idea es que el equipo no pierda contexto entre reuniones y pueda trabajar sobre materiales reales, no sobre carpetas y mensajes sueltos.

Si quiere, le comparto un workspace piloto pensado para semilleros y vemos en una llamada corta si les ahorra trabajo.
```

#### Version WhatsApp

```text
Hola, {{contact_name}}. Vi {{role_or_unit}} en {{institution}}.

Creo que Agora puede servirles para ordenar lecturas, borradores, tareas y materiales del semillero en un mismo espacio, sin depender de varias herramientas.

Si le hace sentido, le mando un ejemplo de workspace para semilleros y lo revisamos rapido.
```

#### Personalizacion recomendada

- Javeriana: semilleros de lenguaje, discursos y practicas educativas
- UdeA: semilleros ligados a comunicacion, cambio social o construccion de paz
- grupos de investigacion UIS: combinar lenguaje de semillero con trabajo de investigacion

### 4. Centros de escritura y acompanamiento

#### Cuando usarlo

- `segment` como centro de escritura, tutoria, lengua materna

#### Version base

```text
Hola, {{contact_name}}.

Vi {{role_or_unit}} en {{institution}} y pense que Agora puede encajar bien en procesos de acompanamiento de escritura. La herramienta ayuda a centralizar borradores, comentarios, evidencias, tareas y seguimiento en un mismo workspace.

Si quiere, le comparto un ejemplo aplicado a tutorias o talleres y vemos si tiene sentido para su equipo.
```

### 5. Revistas, medios y flujos editoriales

#### Cuando usarlo

- `segment` relacionado con revista, medio, editorial, comunicacion

#### Version base

```text
Hola, {{contact_name}}.

Vi {{role_or_unit}} en {{institution}} y pense en escribirle porque Agora puede servir mucho cuando hay borradores, calendario editorial, archivos, comentarios y tareas repartidos en varias herramientas.

Si quiere, le muestro un flujo simple para revista o medio universitario y le comparto un workspace de prueba.
```

## Bloques de dolor listos para insertar

### Para departamentos y programas

- seguimiento de cohortes, practicas o trabajos de grado
- materiales y evidencias repartidos entre varias carpetas
- borradores y tareas sin una vista comun

### Para profesores

- comentarios sobre textos sin contexto acumulado
- versiones dispersas de borradores y lecturas
- dificultad para seguir avance de estudiantes, auxiliares o semilleristas

### Para semilleros

- reuniones que no dejan un hilo de trabajo claro
- PDFs, notas y acuerdos en lugares distintos
- poca continuidad entre lectura, escritura y tareas

### Para centros de escritura

- seguimiento de procesos de acompanamiento
- comentarios, borradores y tareas repartidos
- dificultad para conservar evidencias de avance

## CTAs pequenos y utiles

Elegir uno segun el nivel de friccion del lead:

- le comparto un ejemplo armado
- le muestro un caso de uso en 15 minutos
- les dejo un workspace piloto para revisar con calma
- si quiere, validamos rapido si esto les ahorra trabajo real

Evitar en primer contacto:

- demos largas
- lenguaje tecnico del producto
- promesas demasiado amplias
- hablar de terminales, workers o arquitectura interna

## Seguimientos

### Seguimiento a 48 horas

```text
Hola, {{contact_name}}. Le escribo de nuevo por si el mensaje anterior se perdio.

Creo que Agora puede servir especialmente para {{dolor_concreto}} en {{institution}}. Si quiere, le comparto un ejemplo ya armado y vemos rapido si tendria sentido probarlo.
```

### Seguimiento con anclaje institucional

```text
Hola, {{contact_name}}. Retomo este mensaje porque sigo viendo que en {{institution}} hay un caso claro para ordenar {{proceso_academico}} sin depender de archivos y mensajes dispersos.

Si quiere, le dejo un ejemplo adaptado a {{role_or_unit}}.
```

### Cierre despues de conversacion positiva

```text
El siguiente paso mas simple seria activar un workspace piloto y cargar un caso real de ustedes. Si en esta misma semana les ayuda a ordenar mejor {{proceso_academico}}, seguimos; si no, no tiene sentido forzarlo.
```

## Combinaciones sugeridas para la primera oleada

### UdeA

- practicas y pregrado: plantilla de departamentos y programas
- semilleros: plantilla de semillero

### Javeriana

- centro de escritura: plantilla de centro de escritura
- semilleros: plantilla de semillero
- redes academicas: plantilla de profesor o nodo especializado segun el caso

### Uniandes

- departamento y posgrado: plantilla de departamentos y programas
- profesores: plantilla de profesor

### UPB

- comunicacion y programa: plantilla de profesor o programa segun el lead
- docentes de comunicacion digital o periodismo: plantilla de profesor

### EAFIT

- programa de literatura: plantilla de programa
- club de lectura: plantilla de comunidad o semillero si el tono pide mas cercania

### Univalle, UNAL Medellin y UIS

- escuelas, facultades y practicas: plantilla de departamento/programa
- grupos de investigacion: plantilla de profesor o semillero segun el tono del lead

## Landing copy recomendado

### Hero

- Titulo:
  Tu investigacion, tus lecturas y tus borradores en un solo espacio.
- Subtitulo:
  Agora ayuda a grupos, programas y comunidades de escritura a reunir fuentes, borradores, evidencias, archivos y tareas en un mismo workspace.
- CTA principal:
  Empezar gratis
- CTA secundaria:
  Pedir demo

### Segmentos visibles

- Semilleros y grupos de investigacion.
- Centros de escritura.
- Revistas y medios universitarios.
- Programas de literatura, lenguas, historia y comunicacion.
- Tesis y proyectos editoriales.

### Beneficios principales

- Guarda lecturas, PDFs, notas y borradores en un mismo lugar.
- Conserva evidencias y fragmentos clave dentro del flujo de escritura.
- Convierte texto en tareas y seguimiento.
- Facilita trabajo colaborativo sin perder contexto.
- Mantiene acceso web y PWA para uso flexible.

## Regla final de estilo

En el primer impacto comercial hablar mas de:

- investigacion
- escritura
- coordinacion
- evidencias
- conocimiento

Hablar menos de infraestructura tecnica. El primer mensaje vende claridad de uso, no sofisticacion interna.
