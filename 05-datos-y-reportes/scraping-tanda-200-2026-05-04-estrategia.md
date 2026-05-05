# Estrategia de contacto — Tanda 200 contactos (2026-05-04)

Origen: scraping autonomo via Chrome DevTools MCP + curl masivo a paginas publicas de universidades, revistas indexadas y centros de escritura. Dedup contra los 303 emails ya operativos en `leads-agora-maestro.csv` y `operacion-email/contactos-maestro-operativo.csv`.

CSV: `05-datos-y-reportes/scraping-tanda-200-2026-05-04.csv`

## Resumen

- 200 contactos nuevos (ninguno duplica los emails existentes)
- Score ICP 5 (alto): 28 contactos — coordinaciones, decanaturas, editoriales, programas de literatura/lengua/idiomas
- Score ICP 4: 17 contactos — docentes ICP de letras/educacion
- Score ICP 3: 44 contactos — docentes adyacentes (comunicacion, humanidades), coordinaciones secundarias
- Score ICP 2-1: 111 contactos — buzones institucionales secundarios o roles no-letras (utiles como puerta lateral)
- Top 5 instituciones por volumen: Uninorte (43), Externado (38), UNAB (27), Uniminuto (18), Caro y Cuervo (17)

## Fuentes scrapeadas

- Caro y Cuervo: directorio institucional + facultad SAB + maestrias
- Univalle: Escuela Estudios Literarios + Escuela de Ciencias del Lenguaje
- Externado: profesores de Comunicacion Social y de FIGRI/FAE
- Uninorte: profesores Comunicacion Social, Lenguas Extranjeras, Centro de Escritura, Programa Lenguas Modernas y Cultura
- UNAB: Departamento de Lenguas + Comunicacion + buzones institucionales
- Uniminuto: Lic. Lenguas Extranjeras, Lic. Humanidades y Lengua Castellana, Centro de Idiomas
- Revistas indexadas: Ikala (UdeA), Forma y Funcion (UN), Lit. Teoria Historia Critica (UN), Folios (UPN), Estudios Lit. Colombiana, Cuadernos Lit. (Javeriana), Praxis Filosofica (Univalle), Glossa (UNAB)
- Centros de Escritura: Uniandes, Javeriana, Uninorte, Rosario
- Otros: UMNG (Editorial Neogranadina), Utadeo, Unicauca, Unisabana, Eafit, Unicaribe, Ucaldas

## Plantillas por plantilla_id

### plantilla-coordinacion-letras (top priority — buzon de programa/escuela/decanatura)

```
Asunto: Agora — gestor de conocimiento con agentes IA para programas de letras y lengua

Estimada coordinacion del programa de [PROGRAMA] en [INSTITUCION],

Soy Steven Vallejo, de Elenxos. Estamos lanzando Agora (https://agora.elenxos.com), un gestor de conocimiento que combina escritura asistida, agentes IA especializados y un lenguaje propio para razonamiento riguroso sobre el corpus de un grupo o programa.

Estamos abriendo cupos para programas de literatura, filologia, linguistica y lengua. Nos interesa explorar como podriamos apoyar a su programa con:
- repositorio centralizado de notas, lecturas y produccion de profesores y estudiantes,
- agentes IA entrenados sobre el corpus del programa (no sobre internet),
- soporte a semilleros y centros de escritura.

Hay un plan freemium para arrancar sin compromiso. ¿Podemos coordinar 20 minutos esta semana o la proxima?

Steven Vallejo — ventas@elenxos.com — agora.elenxos.com
```

### plantilla-docente-investigador (docente identificado por nombre)

```
Asunto: Agora para investigacion en [LITERATURA/LINGUISTICA/...] — invitacion piloto

Estimad[a/o] profesor[a] [APELLIDO],

Soy Steven Vallejo, de Elenxos. Vi su trabajo en [PROGRAMA / LINEA / REVISTA / GRUPO] y por eso le escribo: estamos abriendo el piloto de Agora (https://agora.elenxos.com), una herramienta para investigadores y docentes de letras que combina:
- gestion de conocimiento sobre su corpus personal y de su grupo,
- agentes IA especializados (no genericos) que razonan sobre lo que usted ha escrito y leido,
- lenguaje propio para argumentar con rigor sobre lo registrado.

Tenemos plan gratuito y planes con mayor capacidad de almacenamiento. Si le interesa, le activo una cuenta de prueba con almacenamiento ampliado durante 60 dias.

Si esto resuena, le contesto con una demo de 15 minutos cuando le quede comodo.

Steven Vallejo — ventas@elenxos.com
```

### plantilla-editor-revista (editor / comite editorial)

```
Asunto: Agora para revistas academicas y editoriales — propuesta de uso

Estimad[a/o] [NOMBRE / equipo editorial de REVISTA],

Estamos lanzando Agora (https://agora.elenxos.com), un gestor de conocimiento con IA pensado para investigadores, editores y centros de escritura. Para revistas y editoriales academicas hay tres usos concretos:
1. lectura asistida y resumenes razonados de manuscritos en evaluacion,
2. mantenimiento del corpus historico de la revista con busqueda semantica,
3. soporte a autores y pares con un agente que conoce la linea editorial.

¿Podemos abrirles una cuenta de prueba con su comite editorial durante 60 dias y agendar una sesion corta de revision?

Steven Vallejo — ventas@elenxos.com — agora.elenxos.com
```

### plantilla-centro-escritura (centro de escritura / red COLE)

```
Asunto: Agora para Centros de Escritura — apoyo IA al acompanamiento

Estimad[a/o] equipo del Centro de Escritura de [INSTITUCION],

Soy Steven Vallejo, de Elenxos. Estamos lanzando Agora (https://agora.elenxos.com), un gestor de conocimiento con agentes IA especializados, pensado para entornos de escritura academica y acompanamiento.

Para un centro de escritura podemos habilitar:
- agente de retroalimentacion entrenado sobre la guia metodologica del centro,
- registro estructurado de tutorias, generos textuales y casos,
- soporte para los tutores en la lectura y devolucion de textos.

Hay plan gratuito para empezar. ¿Les interesa una demo de 20 minutos con el equipo de tutores?

Steven Vallejo — ventas@elenxos.com
```

### plantilla-buzon-institucional (puerta lateral, score bajo)

```
Asunto: Solicitud de remision — Agora para programas de letras

Buen dia,

Soy Steven Vallejo, de Elenxos. Estamos contactando programas de literatura, filologia, linguistica, idiomas y centros de escritura en Colombia para presentar Agora (https://agora.elenxos.com), un gestor de conocimiento con agentes IA.

¿Podrian remitir este correo a la coordinacion del programa de letras / lengua / idiomas / centro de escritura mas afin? Con gusto les hago llegar materiales o agendamos una demo corta.

Gracias por su gestion.
Steven Vallejo — ventas@elenxos.com
```

## Plan de envio recomendado

1. Tanda A — score 5 (28 contactos): envio personalizado en 2 dias habiles. Plantilla = plantilla-coordinacion-letras o plantilla-docente-investigador segun rol. Personalizacion minima: nombre + programa + linea conocida.
2. Tanda B — score 4 (17 contactos): envio dia 3-4. Igual personalizacion que A.
3. Tanda C — score 3 (44): envio dia 5-7. Tolera plantilla mas estandar.
4. Tanda D — score 2-1 (111): envio masivo con plantilla-buzon-institucional + plantilla-docente-investigador segun corresponda. Espaciar 30-40 envios/dia para evitar reputacion de remitente.

## Reglas de calidad

- Antes de enviar, validar dominio (MX) — algunos buzones de uniminuto.edu no tienen .co; deben ir tal cual estan en el CSV.
- Personalizar nombre + programa para los score 4-5.
- Marcar el envio en `operacion-email/contactos-maestro-operativo.csv` y crear lead en ERPNext con campana `wave-5-scraping-2026-05-04`.
- Seguimiento a los 7 dias si no responden.
- Para Caro y Cuervo, priorizar a Norma Donato Rodriguez (decana FSAB) como contacto humano clave.
- Para Uninorte/Externado, los profesores son nodos academicos: la conversion mas alta vendra de coordinaciones, no de docentes individuales.

## Observaciones del scraping

- Las paginas de docentes de Univalle y EAFIT estan renderizadas con JS pesado o SharePoint y no exponen emails individuales por curl. Para una segunda iteracion con mas profundidad, usar Chrome DevTools MCP con `evaluate_script` por perfil.
- Los OJS (revistas indexadas) son la mejor fuente de emails individuales con contexto: comites editoriales, comites cientificos, asistentes editoriales.
- Las paginas /contactenos/ corporativas de la mayoria de universidades solo dan buzones genericos (juridica@, notificaciones@) — utiles como puerta lateral, no como ICP directo.
- Quedaron pendientes para iteraciones futuras: UPTC, Universidad de Cartagena programa de Linguistica y Literatura, Universidad del Tolima, Universidad del Cauca (paginas dinamicas), Universidad del Norte programa de Letras (no figura programa propio), Universidad de Cordoba, Unipamplona.
