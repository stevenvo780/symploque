# Reporte y notas del proceso

Fecha de corte: 2026-04-11

## Objetivo de esta iteracion

Expandir la base desde 100 hasta 300 contactos publicos, manteniendo acceso rapido para contacto y corrigiendo un vacio importante: la ausencia de UNAL Bogota en la primera entrega.

## Entregables de esta iteracion

- Base operativa actual: [leads-agora-maestro.csv](../03-datos/leads-agora-maestro.csv)
- Reporte central: [central-operativo-agora.md](../00-central/central-operativo-agora.md)

## Por que no aparecio UNAL Bogota en la primera base de 100

No fue una decision estrategica de excluirla.

La razon real fue metodologica:

1. En la primera pasada priorice paginas con contacto publico muy obvio y rapido de verificar: semilleros, centros de escritura, coordinaciones, practicas, revistas y paginas de programa.
2. En ese barrido inicial, UNAL Medellin salio antes porque sus paginas de FCHE, pasantias y egresados eran mas directas para el tipo de nodo que estabamos atacando.
3. UNAL Bogota si tenia valor comercial claro, pero su capa mas rica de contactos no estaba expuesta de forma tan evidente en la primera lectura manual del sitio.
4. El directorio realmente util estaba detras de la pagina de docentes de Humanas, y la clave fue revisar el codigo fuente y detectar el endpoint JSON que alimenta el mosaico de docentes.

En otras palabras: fue un hueco de descubrimiento, no un descarte por falta de prioridad.

## Como se corrigio en esta iteracion

En esta expansion use como fuente principal el directorio docente publico de Humanas UNAL Bogota:

- `https://www.humanas.unal.edu.co/correo/2018/docentes.json`

Tambien tome como contexto y validacion estas rutas oficiales:

- `https://www.humanas.unal.edu.co/2026/docentes/`
- `https://www.humanas.unal.edu.co/2017/unidades-academicas/departamentos/literatura/contacto`
- `https://www.humanas.unal.edu.co/2017/unidades-academicas/departamentos/linguistica/contacto`
- `https://www.humanas.unal.edu.co/ple/el-programa/docentes`
- `https://www.humanas.unal.edu.co/explora/el-programa/docentes`
- `https://www.humanas.unal.edu.co/retoalaun/docentes`

## Resultado de la correccion

- La base nueva sube a 300 contactos.
- Agregue 200 contactos nuevos de `UNAL Bogota`.
- De la fuente JSON salieron 211 correos institucionales validos y unicos.
- En este corte entre al archivo 200 de esos 211.
- Deje por fuera 11 validos solo para no desbordar la base mas alla de 300 en esta iteracion.
- Luego unifique los CSV previos en un solo maestro con columnas de seguimiento comercial.

## Criterios de inclusion

- Solo contactos publicos visibles en fuentes oficiales.
- Prioridad a correos institucionales.
- Enlace rapido de contacto en `quick_contact_url`.
- Deduplique por `contact_value`.
- Mantengo la logica de prioridad por cercania al ICP:
  - literatura
  - linguistica
  - lenguas extranjeras
  - luego humanidades adyacentes

## Exclusiones y limpieza

En el directorio de UNAL Bogota detecte dos registros que no quise meter a la base:

- `pvignolo@unal.edu.c`
  - correo malformado en la fuente publica
- `mlcardenasb@gmail.com`
  - correo no institucional

Tambien mantuve fuera cualquier dato que no tuviera una ruta publica verificable o que tuviera riesgo claro de error.

## Lectura estrategica

La expansion corrige un sesgo de la primera version: estabamos mas cargados a Medellin y a nodos de acceso directo, pero faltaba una capa docente muy potente en una de las plazas mas importantes.

Con UNAL Bogota ya adentro, la base queda mejor equilibrada entre:

- nodos de entrada institucional,
- nodos docentes con autoridad academica,
- y nodos multiplicadores de adopcion.

## Limites actuales

- La base ya tiene volumen, pero no toda la cola tiene la misma capacidad de cierre.
- Los primeros 100 siguen siendo el tramo mas comercialmente eficiente.
- Los nuevos 200 de UNAL Bogota sirven mucho para expansion, pero conviene trabajarlos por oleadas y con copy distinto segun unidad academica.

## Recomendacion operativa

Trabajaria esta base en tres tandas:

1. `1-40`
   - contacto directo y seguimiento rapido
2. `41-120`
   - outreach con personalizacion ligera
3. `121-300`
   - cadencia mas sistematica y mensajes por cluster

## Siguiente mejora recomendable

La siguiente iteracion no deberia ser solo "mas volumen". Deberia ser:

- enriquecer `leads-agora-maestro.csv` con mejor scoring, `owner` y notas de respuesta;
- sacar lotes de mensajes por segmento;
- y construir una version `top 50 listos para atacar hoy`.

## Actualizacion 2026-04-12: corte operativo top 50

Para pasar de expansion a ejecucion se genero un lote separado con los `priority_rank` `1-50`:

- [leads-agora-top-50-hoy.csv](../03-datos/leads-agora-top-50-hoy.csv)
- [top-50-listos-para-atacar-hoy.md](./top-50-listos-para-atacar-hoy.md)

Lectura rapida del corte:

- 15 leads `A1`
- 20 leads `A2`
- 15 leads `B1`
- 50 registros `pendiente`
- 50 registros con `proxima_accion = contactar`

Esto deja una primera oleada lista para operar sin tocar todavia el resto del maestro.
