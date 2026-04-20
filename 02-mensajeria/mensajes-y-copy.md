# Mensajes y Copy - Sistema modular de outreach

## Objetivo

Este archivo ya no funciona como una lista suelta de mensajes. Ahora es un sistema reusable para armar outreach segun:

- universidad
- tipo de contacto
- necesidad principal
- canal
- estrategia de captacion
- posicionamiento relacional

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
- `{{quienes_somos}}`: bloque corto de identidad. Base recomendada: `somos un equipo de estudiantes que esta emprendiendo con Agora`.
- `{{anclaje_academico}}`: por que escribimos desde afinidad con el sector. Base recomendada: `nos interesa crecer fortaleciendo procesos de escritura, investigacion y coordinacion academica`.
- `{{prueba_de_cercania}}`: frase que muestre que no hablamos como vendedor externo. Ejemplo: `lo estamos construyendo desde problemas que tambien vemos en la vida academica`.

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

## Regla de posicionamiento

La baja respuesta no se corrige solo con mas personalizacion institucional. Tambien hay que dejar claro desde el primer contacto:

1. quienes somos
2. desde donde escribimos
3. por que nos importa el sector academico

El marco recomendado para Agora en esta etapa es:

- iniciativa nacida desde estudiantes o perfiles cercanos a la academia
- interes genuino en fortalecer procesos academicos, no solo vender software
- tono de conversacion y validacion, no de proveedor distante

Evitar:

- sonar como empresa grande o impersonal
- esconder que estamos emprendiendo
- vender primero "plataforma" y despues relacion

## Bloques de identidad reutilizables

Usar uno por mensaje. No meter todos.

- `{{quienes_somos}} y estamos construyendo Agora porque vemos que muchas cosas de escritura, investigacion y coordinacion academica siguen demasiado dispersas.`
- `{{quienes_somos}} y nos interesa que esta herramienta crezca ayudando a fortalecer el trabajo academico, no solo como software sino como soporte real para procesos de estudio, escritura e investigacion.`
- `Estamos emprendiendo con Agora desde una preocupacion muy concreta: que en muchos equipos academicos lecturas, borradores, comentarios y evidencias siguen viviendo en demasiados lugares al tiempo.`
- `No les escribimos desde una logica comercial generica. {{anclaje_academico}} y por eso queremos validar el producto con casos reales del sector.`

## Como armar un mensaje en 2 minutos

1. tomar una fila del CSV
2. elegir la estrategia de captacion
3. elegir el bloque por universidad
4. elegir la plantilla por tipo de contacto
5. elegir un bloque de identidad
6. insertar una necesidad concreta
7. cerrar con un CTA pequeno: demo corta, ejemplo adaptado o piloto

Formula base:

`apertura institucional + quienes somos + dolor especifico + encaje de Agora + CTA pequeno`

## Regla de canal para esta etapa

La restriccion actual es clara:

- no contamos con WhatsApp personales publicos para la base actual
- solo hay unos pocos canales institucionales
- y la friccion de venta sube cuando el mensaje suena corporativo

Por eso el orden operativo cambia asi:

1. `email estilo WhatsApp`
2. `LinkedIn B2B`
3. `navegacion de bot institucional`

## Estrategia 1. Email estilo WhatsApp

Es el canal principal.

Reglas obligatorias:

- asunto corto y en minusculas
- 3 lineas utiles, no bloques largos
- sin HTML
- sin logos
- sin firma pesada
- siempre incluir:
  - que somos un grupo de estudiantes emprendedores
  - que buscamos fortalecer el sector academico
  - el link `https://agora.elenxos.com`

Objetivo:

- abrir una conversacion
- pedir feedback rapido
- o lograr redireccionamiento al contacto correcto

## Estrategia 2. LinkedIn B2B

Usarla para:

- directores
- coordinadores
- representantes de maestria o doctorado
- y referentes de unidad con poder de arrastre

Reglas obligatorias:

- maximo `300` caracteres
- tono de pedido de feedback, no de pitch
- incluir el contexto de estudiantes emprendedores
- incluir `https://agora.elenxos.com`

Plantilla base:

```text
Hola, {{contact_name}}. Soy parte de un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. Me serviria mucho su feedback rapido sobre esta plataforma: https://agora.elenxos.com
```

## Estrategia 3. Navegacion de bot institucional

Usarla solo con:

- WhatsApp institucionales
- recepciones
- lineas de admisiones
- o telefonos generales

Objetivo:

- no vender al bot
- no explicar de mas
- conseguir correo o extension del decisor humano

Plantilla base:

```text
Hola. Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico con Agora. ¿Nos podrian compartir el correo o extension del coordinador o director que lleva {{proceso_academico}} en {{institution}}? https://agora.elenxos.com
```

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

Somos un equipo de estudiantes que esta emprendiendo con Agora para ayudar a investigar, escribir y coordinar conocimiento en equipo. La herramienta sirve para reunir lecturas, borradores, evidencias, tareas y archivos en un mismo lugar.

### Pitch de 60 segundos

Somos un equipo de estudiantes que esta emprendiendo con Agora con la idea de crecer fortaleciendo procesos reales del sector academico. La herramienta sirve para grupos y unidades que trabajan con lectura, escritura, investigacion o produccion editorial. En vez de repartir el trabajo entre Drive, WhatsApp, documentos sueltos y cadenas de correos, permite centralizar materiales, borradores, comentarios, tareas y seguimiento dentro de un mismo workspace. Tiene mejor encaje en semilleros, programas, centros de escritura, revistas, grupos de investigacion y docentes con lineas activas.

## Plantilla madre

Usar esta base antes de bajar a cada segmento:

```text
Hola, {{saludo}}. Vi {{referencia_real}} en {{institution}} y pense que Agora podria tener encaje ahi.

{{quienes_somos}} y {{anclaje_academico}}.

Lo estamos mostrando a equipos que hoy tienen {{dolor_concreto}} repartido entre varias herramientas. Agora ayuda a reunir {{bloque_de_valor}} en un mismo workspace. https://agora.elenxos.com

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

#### Version email estilo WhatsApp

```text
Asunto: idea rapida para {{proceso_academico}}

Hola, {{contact_name}}.

Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar {{proceso_academico}} en {{institution}} sin tanta dispersion. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido o que me redirija con quien lleve este frente.
```

#### Version WhatsApp

```text
Hola, {{contact_name}}. Vi {{role_or_unit}} en {{institution}}.

Somos estudiantes emprendiendo con Agora y nos interesa fortalecer procesos academicos. Le escribo porque estamos mostrando la herramienta a programas y coordinaciones que necesitan ordenar materiales, borradores, evidencias y seguimiento en un mismo espacio. https://agora.elenxos.com

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

#### Version email estilo WhatsApp

```text
Asunto: feedback rapido sobre esto

Hola, {{contact_name}}.

Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho su feedback sobre Agora para {{curso_o_linea}} o {{role_or_unit}} en {{institution}}. https://agora.elenxos.com
Si no le corresponde directamente, me basta con que me indique con quien deberia hablar.
```

#### Version WhatsApp

```text
Hola, {{contact_name}}. Vi su trabajo en {{role_or_unit}} en {{institution}}.

Somos estudiantes emprendiendo con Agora y la estamos mostrando a profesores e investigadores que trabajan con lecturas, borradores y seguimiento de estudiantes o equipos. La idea es tener todo eso en un mismo workspace, con menos dispersion. https://agora.elenxos.com

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

#### Version email estilo WhatsApp

```text
Asunto: idea rapida para el semillero

Hola, {{contact_name}}.

Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creemos que Agora podria servirles para ordenar lecturas, borradores y tareas del semillero. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido y le comparto un ejemplo.
```

#### Version WhatsApp

```text
Hola, {{contact_name}}. Vi {{role_or_unit}} en {{institution}}.

Somos estudiantes emprendiendo con Agora. Creo que puede servirles para ordenar lecturas, borradores, tareas y materiales del semillero en un mismo espacio, sin depender de varias herramientas. https://agora.elenxos.com

Si le hace sentido, le mando un ejemplo de workspace para semilleros y lo revisamos rapido.
```

#### Personalizacion recomendada

- Javeriana: semilleros de lenguaje, discursos y practicas educativas
- UdeA: semilleros ligados a comunicacion, cambio social o construccion de paz
- grupos de investigacion UIS: combinar lenguaje de semillero con trabajo de investigacion

### 4. Centros de escritura y acompanamiento

#### Cuando usarlo

- `segment` como centro de escritura, tutoria, lengua materna

#### Version email estilo WhatsApp

```text
Hola, {{contact_name}}.

Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y seguimiento de escritura en {{institution}}. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido o que me indiquen quien lleva este frente.
```

### 5. Revistas, medios y flujos editoriales

#### Cuando usarlo

- `segment` relacionado con revista, medio, editorial, comunicacion

#### Version email estilo WhatsApp

```text
Hola, {{contact_name}}.

Somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y creo que Agora puede servir para ordenar borradores, comentarios y flujo editorial en {{institution}}. https://agora.elenxos.com
Si le ve sentido, me basta un feedback rapido o que me redirijan con quien lleve ese proceso.
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

Somos un equipo de estudiantes emprendiendo con Agora y nos interesa validarla con casos reales que fortalezcan trabajo academico. Creo que puede servir especialmente para {{dolor_concreto}} en {{institution}}. https://agora.elenxos.com

Si quiere, le comparto un ejemplo ya armado y vemos rapido si tendria sentido probarlo.
```

### Seguimiento corto estilo WhatsApp

```text
Hola, {{contact_name}}.

Le escribo de nuevo porque somos un grupo de estudiantes emprendedores que busca fortalecer el sector academico, y me serviria mucho saber si Agora podria tener sentido para {{role_or_unit}} en {{institution}}. https://agora.elenxos.com
Si no le corresponde, me basta con que me diga con quien deberia hablar.
```

### Seguimiento con anclaje institucional

```text
Hola, {{contact_name}}. Retomo este mensaje porque sigo viendo que en {{institution}} hay un caso claro para ordenar {{proceso_academico}} sin depender de archivos y mensajes dispersos.

Lo estamos construyendo desde una preocupacion muy cercana al sector academico y por eso queria insistir con un ejemplo adaptado a {{role_or_unit}}. https://agora.elenxos.com

Si quiere, le dejo ese ejemplo.
```

### Seguimiento con reposicionamiento humano

Usarlo cuando el primer correo sono demasiado frio o demasiado vendedor.

```text
Hola, {{contact_name}}.

Le escribo de nuevo con un poco mas de contexto porque el mensaje anterior pudo sonar demasiado directo. Somos un equipo de estudiantes que esta emprendiendo con Agora y nos interesa que la herramienta crezca ayudando a fortalecer procesos academicos reales.

Por eso pense en {{role_or_unit}} en {{institution}}: ahi hay un caso claro para ordenar {{bloque_de_valor}} sin repartir todo entre varias herramientas. https://agora.elenxos.com

Si le sirve, le comparto un ejemplo muy concreto y usted me dice si tiene sentido o no para su contexto.
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
- cercania con la academia
- origen estudiante o emprendedor cuando sume confianza

Hablar menos de infraestructura tecnica. El primer mensaje vende claridad de uso, no sofisticacion interna.
