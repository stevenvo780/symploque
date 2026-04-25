# Sistema de Publicaciones Semanales — Elenxos / Agora

> Nota operativa: este documento define el arco narrativo y los prompts conceptuales. La ejecucion semanal real vive en `../03-operacion-redes/`, y los IDs renderizables del design system viven en `../elenxos_design_system/src/templates/registry.ts`.

## Pipeline de producción

```
Narrativa semanal → Prompts de IA por pieza → Imágenes AI generadas → Híbridos (AI + Design System) → Publicación
```

Cada semana tiene:
- **1 tema narrativo central** (siguiendo la escalera: Cercanía → Utilidad → Rigor → Ecosistema)
- **5-7 piezas visuales** con copy comercial real
- **Prompts de IA** para generar los fondos de cada pieza
- **Formatos**: 2 posts (1080×1080), 1 reel (1080×1920), 1 banner LinkedIn (1500×500), 1 story (1080×1920)

## Público objetivo (ICP principal)

- **ICP-A**: Semilleros de investigación (score 94)
- **ICP-B**: Coordinaciones de trabajo de grado (score 90)
- **ICP-C**: Centros de escritura académica (score 88)
- **Secundario**: Docentes de lógica, filosofía, metodología (score 82)

---

## SEMANA 1 — CERCANÍA: "¿Te suena esto?"

**Tema**: El dolor cotidiano del investigador. Archivos perdidos, versiones rotas, herramientas desconectadas.
**Tono**: Empático, cercano, sin tecnicismos. Nombrar el problema que todos viven.
**CTA**: Seguir la cuenta / compartir si te identificas.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s1_dolor_archivos` | "Tu tesis no se perdió. Se dispersó." | 3 carpetas. 7 versiones. 0 contexto. Eso no es investigación, es arqueología digital. | Escritorio académico oscuro con papeles y pantallas dispersas, estilo cinematográfico, tonos verdes oscuros y negro, iluminación dramática lateral |
| 2 | Post 1080² | `s1_antes_despues` | "Antes: 14 archivos. Después: 1 flujo." | ¿Cuántas horas pierdes buscando el archivo correcto? Agora reúne lectura, escritura, evidencia y colaboración en un solo lugar. | Split visual: lado izquierdo caótico (carpetas, notas, cables), lado derecho ordenado (interfaz limpia, árbol lógico), tonos verde bosque |
| 3 | Reel 1080×1920 | `s1_reel_pregunta` | "¿Cuántas veces reescribiste lo que ya habías escrito?" | El problema no eres tú. Son las herramientas. | Túnel de documentos flotantes desenfocados, partículas verdes, profundidad cinematográfica, movimiento sutil |
| 4 | Banner LinkedIn | `s1_banner_linkedin` | "Menos dispersión. Más contexto." | Agora — Plataforma de investigación cooperativa | Gradiente oscuro horizontal con micelio sutil, textura orgánica, estilo minimalista premium |
| 5 | Story | `s1_story_encuesta` | "¿Cuántos archivos tiene tu tesis ahora mismo?" | A) 1-5  B) 6-15  C) Ni sé  D) Me da miedo contar | Fondo abstracto oscuro con un solo punto de luz verde, minimalista |

---

## SEMANA 2 — CERCANÍA: "No estás solo"

**Tema**: Validar que este problema es universal. Datos, testimonios, comunidad.
**Tono**: Solidario, datos concretos, inicio de autoridad.
**CTA**: Guardar el post / etiquetar a un colega que lo necesita.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s2_dato_perdida` | "El 73% del contexto académico se pierde entre herramientas." | No es un número inventado. Es lo que pasa cuando tu argumento vive en un doc, tu bibliografía en otro, y tus notas en un chat. | Red de nodos desconectándose, fragmentos de texto flotando en la oscuridad, tonos fríos con acentos verdes |
| 2 | Post 1080² | `s2_semillero_real` | "Un semillero con 8 integrantes. 4 herramientas distintas. 0 trazabilidad." | Esto le pasa a 9 de cada 10 equipos de investigación en Latinoamérica. Agora existe para cambiarlo. | Grupo de siluetas trabajando en una mesa iluminada por pantallas, atmósfera colaborativa oscura, humo sutil verde |
| 3 | Reel 1080×1920 | `s2_reel_testimonio` | "Lo que un investigador nos dijo:" | "Paso más tiempo organizando archivos que pensando en mi argumento." — Coordinador de semillero, UdeA | Close-up de manos sobre teclado con luz cálida lateral, fondo oscuro con bokeh verde |
| 4 | Banner LinkedIn | `s2_banner_dato` | "9 de 10 equipos académicos trabajan con herramientas que no se hablan." | Agora conecta lo que la academia fragmenta. | Visualización de datos abstracta, líneas que convergen, transición de rojo fragmentado a verde conectado |
| 5 | Story | `s2_story_etiqueta` | "Etiqueta a alguien que necesita dejar de trabajar así." | Todos conocemos a esa persona con 47 pestañas abiertas y 12 versiones de la misma introducción. | Captura estilizada de múltiples pestañas de navegador, efecto glitch sutil |

---

## SEMANA 3 — UTILIDAD: "Así se ve la solución"

**Tema**: Mostrar qué hace Agora concretamente. Demos, flujos, screenshots.
**Tono**: Práctico, visual, sin exageraciones.
**CTA**: Visitar agora.elenxos.com / agendar demo de 10 min.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s3_flujo_completo` | "De la idea a la demostración. Un solo flujo." | Escribe en Markdown académico. Formaliza en lógica ST. Verifica derivaciones. Colabora en tiempo real. Todo en el navegador. | Diagrama de flujo luminoso con 4 nodos conectados por líneas verdes brillantes sobre fondo negro, estilo blueprint |
| 2 | Post 1080² | `s3_editor_real` | "Markdown académico + lógica formal = un editor que entiende tu argumento." | No necesitas ser programador. Necesitas una herramienta que respete la estructura de tu pensamiento. | Interfaz de editor con código lógico y texto académico lado a lado, glow verde en los bordes, fondo oscuro premium |
| 3 | Reel 1080×1920 | `s3_reel_demo` | "30 segundos que cambian cómo investigas." | Mira cómo un argumento pasa de borrador a demostración verificada. | Secuencia de pantallas de interfaz en perspectiva 3D, transiciones suaves, partículas kodama |
| 4 | Banner LinkedIn | `s3_banner_propuesta` | "Escribe con libertad. Verifica con rigor." | Agora: la plataforma donde el pensamiento académico tiene infraestructura. | Horizonte digital con estructura de árbol lógico emerginedo, luz verde desde abajo, cinematográfico |
| 5 | Story | `s3_story_cta` | "¿10 minutos para ver cómo funciona?" | Agenda una demo — sin compromiso, sin pitch de ventas. Solo tu caso de uso real. | Reloj minimalista con manecillas en verde kodama, fondo oscuro, clean |

---

## SEMANA 4 — UTILIDAD: "Casos de uso reales"

**Tema**: Mostrar Agora en contextos específicos del ICP.
**Tono**: Concreto, casos reales, útil.
**CTA**: "¿Esto se parece a tu caso? Hablemos."

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s4_caso_semillero` | "Así se vería tu semillero en Agora." | Un espacio compartido donde cada integrante escribe, el director revisa, y el argumento tiene trazabilidad completa. | Espacio de coworking académico futurista, pantallas con diagramas lógicos, luz verde ambient, colaboración |
| 2 | Post 1080² | `s4_caso_tesis` | "Tu tesis merece madurez epistémica." | No es solo escribir. Es estructurar, formalizar, verificar y publicar — con herramientas que entienden el proceso. | Árbol de conocimiento digital creciendo desde un libro abierto, raíces de luz, copa con nodos lógicos |
| 3 | Reel 1080×1920 | `s4_reel_antes_despues` | "Antes de Agora vs. después de Agora." | No prometemos magia. Prometemos menos dispersión. | Transición dramática: izquierda caos digital en rojo, derecha orden en verde, split screen cinematográfico |
| 4 | Banner LinkedIn | `s4_banner_caso` | "Semilleros. Centros de escritura. Revistas. Tu equipo." | Cada caso tiene un flujo. Cada flujo tiene un hogar. | Iconografía de diferentes contextos académicos conectados por líneas, estilo mapa de metro, colores kodama |
| 5 | Story | `s4_story_poll` | "¿Qué usas hoy para coordinar tu investigación?" | A) Google Docs  B) Notion  C) Overleaf  D) Nada (ojalá algo) | Fondo con logos tenues de las herramientas actuales, gradiente oscuro |

---

## SEMANA 5 — RIGOR: "No es solo tecnología"

**Tema**: Diferenciación intelectual. Mostrar que Agora tiene fundamento epistemológico.
**Tono**: Riguroso pero accesible. Mini-ensayo visual.
**CTA**: Leer el manifiesto / subscribirse al newsletter.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s5_epistemologia` | "No es solo lenguaje. Es epistemología aplicada." | Otras herramientas organizan archivos. Agora organiza pensamiento. La diferencia es el fundamento. | Cerebro abstracto formado por redes lógicas, sinapsis verdes brillantes, fondo abismal oscuro |
| 2 | Post 1080² | `s5_verificacion` | "¿Tu argumento resiste una tabla de verdad?" | En Agora puedes escribir una premisa, formalizarla, y verificar si tu conclusión se sostiene — en el mismo editor. | Tabla de verdad luminosa flotando en el espacio, variables en verde kodama, resultado highlighted |
| 3 | Reel 1080×1920 | `s5_reel_manifiesto` | "La academia no necesita más papers. Necesita mejores preguntas." | No somos una agencia. Somos el puente entre el pensamiento y el mundo. | Puente arquitectónico suspendido sobre un abismo, niebla verde, luz al final, cinematográfico |
| 4 | Banner LinkedIn | `s5_banner_rigor` | "Donde el rigor se encuentra con la intuición." | Elenxos — Canon metodológico para la academia global | Horizonte con dos fuerzas convergiendo (orgánico + geométrico), fusión en el centro, tonos bosque |
| 5 | Story | `s5_story_cita` | "Destruir un paradigma no es violencia. Es higiene epistémica." | — Manifiesto Elenxos | Texto sobre fondo texturizado oscuro, fuente serif grande, acento rojo dramático |

---

## SEMANA 6 — RIGOR: "La comunidad intelectual"

**Tema**: Posicionar a Elenxos/Agora como parte de una conversación intelectual más grande.
**Tono**: Académico-editorial, pensamiento claro, no solo anuncios.
**CTA**: Unirse a la comunidad / participar en el reto semanal.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s6_logica_accesible` | "∀x: Si piensas con rigor, mereces herramientas a su altura." | El cuantificador universal no es solo símbolo. Es promesa. Agora la cumple. | Símbolo ∀ monumental en luz verde, perspectiva desde abajo, escala épica, partículas |
| 2 | Post 1080² | `s6_reto_argumento` | "Reto Agora: ¿Puedes formalizar este argumento?" | "Todo conocimiento valioso requiere método. La filosofía es conocimiento valioso. Entonces..." Demuéstralo o refútalo. | Pizarra digital con fragmento de formalización lógica, tiza verde luminosa, fondo slate |
| 3 | Reel 1080×1920 | `s6_reel_simbolos` | "Para todo x." | El cuantificador universal. La promesa de que una proposición aplica sin excepción. En Elenxos, construimos herramientas que aspiran a eso. | Animación de símbolo ∀ rotando lentamente, partículas orbitando, profundidad de campo |
| 4 | Banner LinkedIn | `s6_banner_comunidad` | "La resistencia intelectual tiene infraestructura." | Únete a la conversación — Elenxos | Estantería de biblioteca futurista con libros que emiten luz verde, profundidad, cinematográfico |
| 5 | Story | `s6_story_quiz` | "¿Qué símbolo lógico representa 'existe al menos un'?" | A) ∀  B) ∃  C) ¬  D) → | Fondo con los 4 símbolos lógicos en grande, glow diferente para cada uno |

---

## SEMANA 7 — ECOSISTEMA: "El futuro ya tiene estructura"

**Tema**: Visión de largo plazo. Lo que viene. Roadmap emocional.
**Tono**: Visionario pero creíble. Ambición con pie en tierra.
**CTA**: Early access / waitlist para funciones próximas.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s7_vision_futuro` | "El futuro ya tiene estructura." | Hoy: workspaces para investigación. Mañana: biblioteca de flujos, agentes especializados, y una comunidad que piensa en serio. | Ciudad futurista construida sobre raíces de árbol, bioluminiscencia verde, arquitectura orgánica-digital |
| 2 | Post 1080² | `s7_roadmap` | "Lo que viene." | Templates para metodología. Agentes de revisión. Flujos compartidos entre universidades. El conocimiento como bien común. | Línea de tiempo visual con hitos luminosos, cada nodo un icono (editor, lógica, agente, red), progresión horizontal |
| 3 | Reel 1080×1920 | `s7_reel_2027` | "2027." | Lo que hoy es un editor, mañana es la infraestructura del pensamiento riguroso. Agora crece. ¿Creces con nosotros? | Número 2027 emergiendo de la niebla verde, revelación lenta, partículas ascendentes, épico |
| 4 | Banner LinkedIn | `s7_banner_ecosistema` | "Del archivo suelto al conocimiento trabajado." | Agora — Infraestructura para el pensamiento riguroso | Ecosistema de nodos interconectados formando un organismo vivo, bioluminiscente, vista aérea |
| 5 | Story | `s7_story_waitlist` | "¿Quieres acceso anticipado a lo que viene?" | Desliza ↑ para entrar a la lista. Los primeros 100 definen el producto. | Puerta entreabierta con luz verde intensa saliendo, misterioso, invitante |

---

## SEMANA 8 — ECOSISTEMA: "Únete"

**Tema**: Conversión. Llamada directa a la acción con todo el contexto previo.
**Tono**: Directo, cálido, urgente pero no presionante.
**CTA**: Agendar demo / crear cuenta / unirse al piloto.

| # | Formato | ID template | Copy principal | Copy secundario | Prompt IA (fondo) |
|---|---------|-------------|----------------|-----------------|-------------------|
| 1 | Post 1080² | `s8_invitacion` | "¿Listo para pensar diferente?" | 8 semanas hablando de lo que falta en la academia. Ahora es tu turno. Prueba Agora — sin costo, sin compromiso. | Portal luminoso verde en medio de la oscuridad, perspectiva frontal, invitante, profundidad |
| 2 | Post 1080² | `s8_promesa` | "Menos dispersión. Más contexto. Más verificabilidad." | Un lugar donde escribes, formalizas, verificas y colaboras. Todo en el navegador. Todo con rigor. | Workspace limpio y luminoso, interfaz flotante sobre fondo oscuro, sensación de hogar digital |
| 3 | Reel 1080×1920 | `s8_reel_final` | "Esto no es un pitch. Es una invitación." | Conocimos el problema. Mostramos la solución. Ahora falta que la pruebes tú. agora.elenxos.com | Secuencia recapitulativa: flashes rápidos de todas las piezas anteriores, culminando en logo |
| 4 | Banner LinkedIn | `s8_banner_cta` | "Tu investigación merece un mejor entorno." | Prueba Agora — agora.elenxos.com | Banner limpio premium, logo central grande, tagline, fondo oscuro con glow sutil |
| 5 | Story | `s8_story_final` | "El primer paso es simple." | Crea tu cuenta → Invita a tu equipo → Empieza a escribir con contexto. | Tres pasos ilustrados con iconos minimalistas, flechas verdes, fondo oscuro |

---

## Resumen de arco narrativo

| Semana | Fase | Escalón | Tema central | Emoción objetivo |
|--------|------|---------|--------------|------------------|
| 1 | Cercanía | 1 | El dolor cotidiano | "¡Eso me pasa!" |
| 2 | Cercanía | 1 | No estás solo | "Somos muchos" |
| 3 | Utilidad | 2 | La solución concreta | "¿Esto existe?" |
| 4 | Utilidad | 2 | Casos de uso reales | "Esto es para mí" |
| 5 | Rigor | 3 | Fundamento intelectual | "Saben lo que hacen" |
| 6 | Rigor | 3 | Comunidad intelectual | "Quiero participar" |
| 7 | Ecosistema | 4 | Visión de futuro | "Quiero estar ahí" |
| 8 | Ecosistema | 4 | Conversión | "Voy a probarlo" |

## Métricas por fase

- **Semanas 1-2** (Cercanía): Alcance, shares, comentarios tipo "me pasa"
- **Semanas 3-4** (Utilidad): Clics a web, demos agendadas, guardados
- **Semanas 5-6** (Rigor): Engagement cualificado, suscriptores newsletter, participación en retos
- **Semanas 7-8** (Ecosistema): Cuentas creadas, waitlist, demos completadas

## Producción por semana

Para cada semana se generan:
1. **5 prompts de IA** (usando la columna "Prompt IA" de la tabla)
2. **5 imágenes AI** en las resoluciones correctas (1080², 1080×1920, 1500×500)
3. **5 templates híbridos** combinando AI + design system React
4. **Copy final** listo para publicar en cada plataforma
