# Playbook para que un agente busque clientes de forma autonoma

## Objetivo

Definir un proceso repetible para que un agente pueda descubrir clientes potenciales por su cuenta, sin improvisar cada vez.

## Mision del agente

Encontrar organizaciones, grupos o personas con alta probabilidad de necesitar Agora y dejar cada hallazgo listo para una accion comercial.

## Regla de oro

El agente no busca "gente cualquiera". Busca estructuras donde ya exista:

- escritura,
- investigacion,
- colaboracion,
- archivos,
- seguimiento,
- y necesidad de organizar conocimiento.

## Secuencia operativa

### Paso 1. Elegir un segmento

Segmentos recomendados:

1. semilleros,
2. centros de escritura,
3. coordinaciones de practicas,
4. revistas y medios,
5. clubes de lectura,
6. grupos de investigacion,
7. programas de literatura, lenguaje y comunicacion.

### Paso 2. Elegir geografia

Orden inicial:

1. Medellin,
2. Bogota,
3. Cali,
4. Bucaramanga,
5. resto de Colombia,
6. mercado hispanohablante.

### Paso 3. Construir consulta

Ejemplos de busqueda:

- `site:edu.co "semillero" "comunicación" "contacto"`
- `site:edu.co "centro de escritura" universidad correo`
- `site:edu.co "revista" "humanidades" correo`
- `site:edu.co "prácticas" literatura correo`
- `site:edu.co "grupo de investigación" lenguaje correo`
- `site:edu.co "club de lectura" universidad contacto`

### Paso 4. Abrir solo paginas prometedoras

Una pagina vale la pena si contiene al menos uno de estos:

- correo visible,
- numero oficial,
- coordinador o tutor,
- evidencia de actividad,
- nombre del programa o grupo,
- descripcion clara del trabajo.

### Paso 5. Extraer datos estructurados

Guardar:

- institucion,
- unidad,
- segmento,
- ciudad,
- nombre del contacto si existe,
- correo o WhatsApp,
- tipo de canal,
- fuente exacta,
- dolor probable,
- oferta sugerida.

### Paso 6. Calificar el lead

Score orientativo:

- +25 si el segmento es ICP-A.
- +20 si tiene correo institucional directo.
- +15 si hay coordinador o tutor visible.
- +15 si hay actividad reciente.
- +15 si el grupo parece colaborativo.
- +10 si la unidad puede arrastrar varios usuarios.

Restar:

- -20 si el canal es demasiado general.
- -15 si la pagina no tiene actividad ni responsable visible.
- -10 si el encaje es ambiguo.

### Paso 7. Clasificar

- A: contactar primero.
- B: utiles para segunda ronda.
- C: mantener como referencia.

### Paso 8. Proponer angulo comercial

No todos los leads deben recibir el mismo angulo.

Ejemplos:

- semillero:
  workspace colaborativo con evidencias y tareas.
- centro de escritura:
  seguimiento de borradores y revision.
- revista:
  flujo editorial y archivo.
- practicas:
  seguimiento documental y acompanamiento.

### Paso 9. Generar mensaje

Cada lead debe terminar con:

- asunto recomendado,
- mensaje corto,
- CTA.

### Paso 10. Registrar resultado

Cada busqueda debe dejar:

- cuantos leads nuevos aparecieron,
- cuantos fueron A,
- cuantos fueron B,
- que consultas rindieron mejor,
- que paginas dieron mas contactos.

## Señales de lead fuerte

- semillero activo,
- revista con equipo editorial,
- centro de escritura con coordinacion visible,
- practica con correo institucional,
- docente o tutor con rol claro,
- actividad 2025 o 2026.

## Señales de lead debil

- pagina de admisiones general,
- informacion vieja sin responsable,
- contacto unico para toda la universidad,
- pagina sin evidencia de actividad,
- segmento demasiado generico.

## Rutina diaria recomendada para el agente

### Bloque 1. Descubrimiento

- 3 consultas nuevas.
- 10 paginas revisadas.
- 5 leads extraidos.

### Bloque 2. Enriquecimiento

- completar ciudad, segmento, score y oferta.

### Bloque 3. Priorizacion

- decidir top 3 del dia.

### Bloque 4. Preparacion comercial

- generar mensaje y CTA por cada top 3.

### Bloque 5. Aprendizaje

- anotar que consultas fueron mejores.

## Plantilla minima de salida por lead

```md
Institucion:
Unidad:
Segmento:
Ciudad:
Contacto publico:
Tipo de canal:
Fuente:
Dolor probable:
Oferta sugerida:
Score:
Prioridad:
Mensaje recomendado:
```

## Consultas maestras por segmento

### Semilleros

- `site:edu.co "semillero" "lenguaje" correo`
- `site:edu.co "semillero" "comunicación" correo`
- `site:edu.co "semillero" "literatura" correo`

### Centros de escritura

- `site:edu.co "centro de escritura" correo`
- `site:edu.co "centro de apoyo a la escritura" universidad`
- `site:edu.co "lectura y escritura" universidad contacto`

### Revistas

- `site:edu.co "revista" "humanidades" contacto`
- `site:edu.co "revista" "comunicación" "editorial"`
- `site:edu.co "revistas" universidad "contact"`

### Practicas y trabajo de grado

- `site:edu.co prácticas literatura correo`
- `site:edu.co "trabajo de grado" comunicación contacto`
- `site:edu.co "coordinación de prácticas" lenguas`

### Clubes y extension

- `site:edu.co "club de lectura" universidad contacto`
- `site:edu.co "extensión cultural" literatura correo`

## Expansion automatica

Cuando un lead sea muy bueno, el agente debe buscar 10 similares con patron espejo:

- misma ciudad,
- mismo tipo de unidad,
- misma institucion o instituciones pares,
- mismo dolor.

## Resultado esperado de una buena corrida

Una corrida buena no es "muchos links". Una corrida buena deja:

- 5 a 15 leads utiles,
- 3 a 5 leads A,
- mensajes listos,
- fuente guardada,
- y criterio mejorado para la siguiente corrida.

## Limites

- no usar scraping agresivo donde no haga falta,
- no usar contactos dudosos,
- priorizar fuentes publicas y oficiales,
- no mandar outreach a ciegas sin clasificacion previa.
