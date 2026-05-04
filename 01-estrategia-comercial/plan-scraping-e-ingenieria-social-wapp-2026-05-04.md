# Plan de scraping e ingenieria social para WhatsApp manual

Fecha: 2026-05-04
Estado: propuesta operativa, pendiente de aprobacion en 4 puntos al final.

## Objetivo

Ampliar la base de prospectos ICP con contactos accionables por WhatsApp manual,
priorizando perfiles de letras, investigacion, ensenanza y aprendizaje en
universidades colombianas, partiendo de Anillo 1 (Medellin) y UdeA como nodo
central.

Resultado esperado:

- base nueva de prospectos publicos verificables con score ICP
- previews de mensajes WhatsApp personalizados listos para copiar
- flujo manual sostenible de 25 contactos/dia con registro idempotente
- multiplicacion por nodos (semilleros, coordinaciones, revistas)

## Frente 1: Scraping dirigido sobre fuentes publicas

### Targets priorizados por valor multiplicador

1. Coordinaciones de semilleros y centros de escritura
   - UdeA, EAFIT, UPB, UNAL Medellin, U. de Medellin, Javeriana, U. del Valle,
     U. del Norte.
2. Direcciones de programa: Literatura, Filologia, Linguistica, Filosofia,
   Humanidades, Comunicacion, Ensenanza de Lenguas.
3. Revistas universitarias y editoriales academicas: editores, comites
   editoriales, comites cientificos.
4. Docentes con lineas activas en escritura, lectura critica, hermeneutica,
   linguistica aplicada, didactica de la lengua.
5. Clubes de lectura, nodos de extension cultural, bibliotecas universitarias.

### Fuentes publicas legitimas

- Directorios institucionales `.edu.co`, paginas de facultad y departamento.
- GrupLAC y CvLAC de Minciencias para grupos y miembros.
- Repositorios institucionales (autoria reciente como senal de actividad).
- Revistas en OJS, Scielo, Redalyc, Latindex (comites editoriales).
- Eventos publicos: congresos, coloquios, afiches de semilleros, agendas de
  extension.

### Reglas de calidad

- Solo fuentes publicas verificables, con URL guardada y fecha de verificacion.
- No incluir telefonos personales que no esten publicados por la institucion.
- Deduplicar contra `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv`.
- Deduplicar contra `05-datos-y-reportes/leads-agora-maestro.csv`.
- Marcar `consentimiento=publico_institucional` cuando el dato venga de fuente
  oficial.
- Preferir nodos con efecto multiplicador sobre individuos aislados.

### Entregable de scraping

Archivo: `05-datos-y-reportes/prospeccion-wapp-2026-05-04.csv`

Campos minimos:

- `nombre`
- `rol`
- `institucion`
- `dependencia`
- `email_institucional`
- `telefono_publico` (solo si esta publicado oficialmente)
- `fuente_url`
- `fecha_verificacion`
- `senal_actividad_reciente` (cita corta de publicacion, evento o linea)
- `score_icp` (1 a 5)
- `consentimiento`
- `notas`

### Heuristica de score ICP (1 a 5)

- +2 si rol es coordinacion de semillero, centro de escritura, direccion de
  programa o editor de revista.
- +1 si la dependencia es Literatura, Filologia, Linguistica, Filosofia,
  Humanidades, Comunicacion o Ensenanza de Lenguas.
- +1 si hay senal de actividad reciente verificable en los ultimos 12 meses.
- +1 si la institucion pertenece a Anillo 1 priorizado.
- 0 si solo hay nombre y email sin contexto.

## Frente 2: Ingenieria social etica para WhatsApp manual

### Principios

- Contacto calido, contexto verificable, valor inmediato.
- Nada de suplantacion, nada de blast, nada de bots haciendose pasar por humano.
- Cada mensaje debe poder explicarse publicamente sin generar incomodidad.

### Tacticas

- **Puente legitimo**: citar publicacion, semillero, evento o linea de
  investigacion especifica del contacto.
- **Apertura corta**: presentacion + razon concreta + pregunta abierta. Sin
  link en el primer mensaje.
- **Valor antes de pedir**: ofrecer demo guiada de 15 min de Agora aplicada a
  su linea, o acceso piloto para el semillero.
- **Prueba social local**: mencionar UdeA cuando aplique, o pares de la misma
  facultad ya contactados.
- **Doble canal**: WhatsApp solo cuando el numero sea publico (perfil docente,
  tarjeta institucional, web del grupo).
- **Ventana horaria**: martes a jueves, 9:30 a 11:30 y 14:30 a 16:30 hora local.
- **Cadencia**: primer mensaje, recordatorio breve a las 72h si no responde,
  cierre cordial y baja.

### Plantillas a producir

Ubicacion: `04-mensajeria-email/canal-alterno/`

- `wapp-01-apertura-coordinador-semillero.md`
- `wapp-02-apertura-director-programa.md`
- `wapp-03-apertura-docente-linea-activa.md`
- `wapp-04-apertura-editor-revista.md`
- `wapp-05-recordatorio-72h.md`
- `wapp-06-cierre-cordial.md`

Variables comunes: `{{nombre}}`, `{{institucion}}`, `{{dependencia}}`,
`{{senal_actividad}}`, `{{cta}}`.

## Flujo operativo manual

1. Scraping diario produce CSV priorizado con score ICP.
2. Se selecciona Top 25 del dia hacia
   `04-mensajeria-email/previews/preview-wapp-YYYY-MM-DD.md` con:
   - link `wa.me/<numero>?text=<mensaje_url_encoded>`
   - mensaje listo para copiar
   - URL de la fuente que justifica el contacto
3. El operador humano abre el link, revisa y envia manualmente.
4. Resultado manual se registra con
   `scripts/registrar_canal_alterno.py --apply` (idempotente).
5. Reporte diario en `04-reportes/` con enviados, respondidos, bots, no
   contacta, agendados.

## Metricas de exito

- 25 contactos manuales por dia sostenidos cinco dias seguidos.
- Tasa de respuesta humana superior al 8% en Top 25 (vs blast email).
- Al menos 3 demos agendadas por semana.
- 0 reportes de spam o quejas formales.
- Crecimiento de la base ICP en al menos 100 contactos verificables por semana.

## Riesgos y mitigaciones

- Bloqueo de WhatsApp por volumen: enviar manual, no automatizar el envio.
- Numeros desactualizados: validar contra fuente publica antes de cada lote.
- Dato sensible filtrado: revisar que ningun campo contenga secretos o datos
  no publicos antes de versionar.
- Saturacion del operador: limitar a 25/dia y preparar plantillas con variables
  ya rellenas.

## Decisiones pendientes del usuario

1. Alcance geografico inicial: Anillo 1 Medellin solo, o sumar Bogota, Cali y
   Barranquilla desde el primer dia.
2. Volumen sostenido objetivo: confirmar 25 contactos manuales por dia.
3. Politica de telefonos institucionales publicados que sean celulares
   (semilleros suelen publicar WhatsApp): aceptar o rechazar.
4. Score ICP: heuristica automatica como la propuesta, o validacion manual
   lote por lote antes de mover a previews.

Hasta que esten estas cuatro respuestas, no se inicia el scraping ni se
generan previews.

## Anexos y referencias

- Estado vigente: [00-central/estado-actual-y-transicion.md](../00-central/estado-actual-y-transicion.md)
- Acciones siguientes: [docs/codex/NEXT_ACTIONS.md](../docs/codex/NEXT_ACTIONS.md)
- Maestro historico: [05-datos-y-reportes/leads-agora-maestro.csv](../05-datos-y-reportes/leads-agora-maestro.csv)
- Maestro operativo: [05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv](../05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv)
- Registro canal alterno previo: [04-mensajeria-email/canal-alterno/](../04-mensajeria-email/canal-alterno/)
