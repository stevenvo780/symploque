# Lluvia de ideas para generar una base de datos mas amplia

## Objetivo

Crear una base de datos comercial mucho mas grande sin perder calidad. La expansion no debe venir de recolectar miles de correos genéricos, sino de descubrir muchos nodos relevantes con buen encaje para Agora.

## Regla general

Primero ampliar por profundidad dentro de segmentos ganadores. Despues ampliar por geografia. Nunca al reves.

## Ideas para ampliar la base

### 1. Buscar por tipo de unidad academica

Consultas sugeridas:

- `"semillero" "lenguaje" "universidad"`
- `"centro de escritura" universidad`
- `"revista estudiantil" literatura universidad`
- `"prácticas" "literatura" universidad`
- `"comunicación y lenguaje" contacto`
- `"escuela de ciencias del lenguaje" contacto`

Resultado esperado:
- muchas puertas de entrada sin salir del ICP.

### 2. Buscar por dolores, no por programas

- grupos de investigacion,
- lineas de escritura,
- revistas,
- editoriales universitarias,
- laboratorios de narrativa,
- colectivos de medios,
- observatorios con mucha documentacion.

Resultado esperado:
- encontrar clientes fuera de los nombres tipicos.

### 3. Explotar paginas de semilleros

Los semilleros suelen publicar:

- correo,
- tutor,
- linea de trabajo,
- redes,
- actividad reciente.

Valor:
- mejor mezcla entre fit alto y contacto visible.

### 4. Explotar revistas universitarias

Buscar:

- revistas de humanidades,
- revistas de comunicacion,
- revistas de estudiantes,
- comites editoriales,
- equipos de edicion.

Valor:
- tienen flujo continuo y necesidad editorial real.

### 5. Explotar centros de escritura

Buscar:

- centro de escritura,
- centro de apoyo a la escritura,
- unidad de lectura y escritura,
- competencias comunicativas,
- lengua materna.

Valor:
- enorme encaje con revision, borradores y seguimiento.

### 6. Buscar clubes de lectura y extension cultural

No parecen compradores obvios, pero sirven para:

- visibilidad,
- comunidades,
- adopcion temprana,
- validacion social,
- y posibles referidos.

### 7. Buscar coordinadores de practicas y trabajo de grado

Este segmento tiene gran valor porque:

- tiene acceso a cohortes,
- necesita seguimiento,
- opera con documentos y entregas,
- puede institucionalizar flujos.

### 8. Buscar por autores o tutores visibles

Cuando una pagina publica un docente o coordinador:

- buscar su correo institucional,
- revisar si lidera semillero, revista o practica,
- y elevarlo como lead A o B.

### 9. Buscar por facultad y luego por subunidad

Ejemplo:

- primero "Facultad de Comunicacion y Lenguaje"
- despues:
  - semilleros,
  - revistas,
  - centros,
  - practicas,
  - grupos.

Valor:
- mayor rendimiento por institucion explorada.

### 10. Expandir por red de ciudades

Ruta recomendada:

1. Medellin.
2. Bogota.
3. Cali.
4. Bucaramanga.
5. Manizales.
6. Pereira.
7. Barranquilla.
8. Cartagena.

Valor:
- crecer de manera organizada.

### 11. Expandir por universidades con fuerte lenguaje/comunicacion

Categorias:

- publicas grandes,
- privadas con humanidades fuertes,
- universidades pedagogicas,
- universidades con centros de escritura visibles.

### 12. Buscar eventos y convocatorias

Las convocatorias dejan huella publica y muestran actividad:

- semana de la investigacion,
- convocatorias de semilleros,
- ferias editoriales,
- concursos de ensayo,
- jornadas de escritura.

Valor:
- detectar unidades activas, no solo existentes.

### 13. Rastrear contactos que redirigen a otros

No todo contacto debe cerrar.
Muchos sirven para decir:

- "escríbele a la coordinación",
- "este lo lleva el centro",
- "quien ve eso es la revista".

Valor:
- ampliar base a partir de la misma base.

### 14. Crear una taxonomia fija de la base

Cada lead debe tener:

- pais,
- ciudad,
- institucion,
- unidad,
- segmento,
- subsegmento,
- contacto,
- tipo de canal,
- dolor probable,
- rank,
- status.

Valor:
- que la base escale sin volverse caos.

### 15. Separar base institucional y base individual

- institucional:
  - programas,
  - semilleros,
  - revistas,
  - centros,
  - facultades.
- individual:
  - docentes,
  - editores,
  - tutores,
  - coordinadores.

Valor:
- dos rutas de venta complementarias.

### 16. Buscar por dominios de revistas y repositorios

Muchos equipos editoriales no estan en paginas de facultad sino en:

- revistas institucionales,
- portales de publicaciones,
- repositorios,
- bibliotecas digitales.

### 17. Buscar organizaciones fuera de universidad

Expandir a:

- fundaciones culturales,
- colectivos editoriales,
- escuelas de escritura,
- editoriales pequenas,
- observatorios sociales,
- centros de memoria.

Valor:
- amplia TAM sin perder encaje textual.

### 18. Generar listas tematicas

Ejemplos:

- lista de centros de escritura Colombia,
- lista de revistas de humanidades Antioquia,
- lista de semilleros de comunicacion,
- lista de practicas de literatura,
- lista de grupos de investigacion en lenguaje.

Valor:
- base mucho mas explotable para campañas.

### 19. Base de paginas sin contacto directo

Si una pagina no tiene correo, no se descarta.
Se marca como:

- fuente para buscar contacto en otra pagina,
- referencia de actividad,
- nodo de contexto.

### 20. Expandir con efecto espejo

Si un lead resulta bueno, buscar 20 clones:

- misma ciudad,
- mismo tipo de unidad,
- mismo segmento,
- mismo dolor.

Valor:
- escalar usando patrones que ya funcionan.

## Fuentes donde mas conviene buscar

- paginas oficiales universitarias,
- revistas institucionales,
- directorios de semilleros,
- directorios de centros de escritura,
- paginas de programas,
- bibliotecas universitarias,
- portafolios de grupos de investigacion,
- eventos y convocatorias.

## Estructura minima de una base seria

Columnas recomendadas:

- `rank_segmento`
- `institucion`
- `unidad`
- `tipo_unidad`
- `ciudad`
- `contacto_publico`
- `tipo_contacto`
- `responsable_visible`
- `fuente`
- `fecha_verificacion`
- `dolor_principal`
- `oferta_recomendada`
- `score`
- `estado`

## Orden de expansion recomendado

1. Completar Medellin con mucha profundidad.
2. Repetir en Bogota.
3. Repetir en Cali.
4. Repetir en Bucaramanga.
5. Abrir vertical no universitaria.

## Resultado ideal

Una base de 300 a 500 leads utiles, no de 5.000 contactos ruidosos. Para Agora vale mucho mas una base pequena y fina que una base enorme y ciega.
