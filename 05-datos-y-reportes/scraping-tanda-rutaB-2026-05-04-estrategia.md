# Estrategia de contacto Ruta B — celular/WhatsApp principal (2026-05-04)

CSV: `05-datos-y-reportes/scraping-tanda-rutaB-2026-05-04.csv`

## Resultado real del scraping

- **211 contactos acumulados en el CSV actual**.
- **99 vías directas de WhatsApp**: 85 `whatsapp-celular` + 14 `whatsapp`.
- **88 vías de llamada**: 79 `llamada-fijo` + 9 `llamada-fijo-extension`.
- **24 emails institucionales** como fallback.
- **Distribución de score_canal**: 99 score 5, 16 score 3, 72 score 2 y 24 score 1.

## Por qué una versión anterior hablaba de 94

La primera narrativa cerró una pasada temprana con foco casi exclusivo en celular
individual. El CSV actual ya incorpora nuevas oleadas y canales accionables
adicionales: WhatsApp público institucional, conmutadores útiles, extensiones y
puertas laterales por email.

El límite duro sigue siendo el mismo: el scraping público colombiano para
celular individual de personas ICP letras tiene un techo bajo. Lo confirmé
empíricamente tras 12 oleadas y ~600 URLs:

- Profesores universitarios: **no publican celular**. La página de profesores de Externado, Uninorte, Javeriana, Uniandes solo trae email institucional + extensión del conmutador.
- Idartes / BibloRed / Banrep / Mincultura: solo publican el conmutador de la sede (`+57 601 XXX XXXX`).
- Casas de poesía, escuelas de escritura, fundaciones: muchas tienen WhatsApp en Instagram bio, pero **Instagram bloquea por login wall** desde 2023; no hay forma sin sesión autenticada.
- Eventbrite Colombia: renderiza con JS y bloquea bots no autenticados.
- Mincultura Sistema Convocatorias: los anexos PDF están en Azure Blob con SAS token expirado.
- Facebook event pages: bloqueo total por login wall.
- Las cuentas de WhatsApp públicas que sí logré extraer vienen de homepages de
  cajas de compensación, colegios privados, librerías y algunas escuelas de
  escritura.

El salto de 94 a 211 no vino de descubrir mas celulares personales de docentes,
sino de ampliar la cobertura a canales laterales accionables. Con un dataset
propio (export de Eventbrite/Sympla, lista de asistentes a Filbo, base de
antiguos clientes UdeA, sesión autenticada de Instagram) sí podríamos mejorar
de verdad el yield de WhatsApp directo.

## Distribución por canal recomendado

| Canal | Contactos | Uso |
|---|---|---|
| WhatsApp directo | 99 | Tanda 1 — outreach personalizado por WhatsApp |
| Llamada fija / extensión | 88 | Tanda 2 — llamada en horario laboral con guion |
| Email institucional | 24 | Tanda 3 — fallback solo si no hay otro canal |

## Distribución por segmento

| Segmento | # | Notas |
|---|---|---|
| otro-cultural | 100 | Bolsa amplia de nodos culturales; requiere revisión manual antes de mandar volumen |
| caja-compensacion | 34 | Comfama, Comfenalco, Colsubsidio, Compensar — programas culturales con talleres |
| colegio-privado | 27 | Coordinaciones académicas y humanidades; buen ICP educación + letras |
| biblioteca-publica | 13 | Bibliotecas públicas y redes de lectura |
| cultura-distrital | 10 | Idartes, BibloRed y nodos públicos afines |
| libreria-club-lectura | 6 | Librerías con club activo |
| academia-letras | 5 | Contactos más cercanos al ICP universitario clásico |
| fundacion-cultural | 5 | Nodos culturales pequeños con decisión ágil |
| centro-escritura-uni | 4 | Fit directo con Agora |
| tallerista-poesia + red-talleres-relata | 4 | Mensaje muy personal, no corporativo |
| editorial-indie | 1 | Editorial independiente |
| cultura-nacional | 1 | Nodo institucional amplio |
| festival-literario | 1 | FILBo / Hay Festival |

## Plantillas WhatsApp/celular

### plantilla-tallerista-poesia (Casa de Poesía Silva, Casa Tomada, La Piedra en el Agua)

```
Hola [NOMBRE], te escribe Steven de Elenxos.

Estamos lanzando Agora (https://agora.elenxos.com), un gestor de conocimiento con agentes IA pensado para escritores y talleristas: tu corpus personal + IA que razona sobre lo que vos has escrito y leído, no sobre internet.

Para tu taller/escuela podemos abrir cuentas piloto gratis para vos y tus estudiantes durante 60 días. ¿Te interesa que te muestre 10 minutos por video?
```

### plantilla-coordinador-cultura (caja de compensación, cultura distrital, fundación)

```
Hola, te escribo de Elenxos. Estamos lanzando Agora (agora.elenxos.com), una herramienta para programas de creación literaria y clubes de lectura: corpus compartido + agente IA que apoya a tutores y participantes.

Para [ORGANIZACION] podemos pilotar gratis con uno de tus talleres durante 60 días, sin costo. ¿Lo coordinamos por una llamada esta semana?
```

### plantilla-coordinador-academico-colegio (colegio privado)

```
Hola, te escribe Steven de Elenxos. Estamos abriendo Agora (agora.elenxos.com) para coordinaciones académicas con énfasis en humanidades y lenguaje en colegios privados: una IA que trabaja sobre el currículo y los textos del colegio, no sobre internet.

¿Te interesa que te muestre 15 minutos cómo lo usan otros colegios? Tenemos plan gratuito para arrancar.
```

### plantilla-libreria-club (librería con club de lectura)

```
Hola, te escribo de Elenxos por el club de lectura de [LIBRERIA]. Estamos abriendo Agora (agora.elenxos.com), una IA que apoya clubes de lectura: agentes que conocen la obra y dialogan con los lectores. Te puedo abrir un piloto gratis para tu club. ¿Hablamos por aquí?
```

### plantilla-editorial-indie / plantilla-festival

```
Hola, soy Steven de Elenxos. Estamos lanzando Agora (agora.elenxos.com) para editoriales independientes y festivales literarios: corpus de manuscritos + IA que razona sobre la línea editorial, búsqueda semántica del catálogo histórico. Hay piloto gratuito de 60 días. ¿Te muestro 10 minutos?
```

## Plan de envío

**Tanda 1 — WhatsApp (99 contactos, todos score 5)**: arrancar por los 85
`whatsapp-celular` y luego los 14 `whatsapp` institucionales. Mensaje
personalizado por nombre + organización. Espaciar 10-15 mensajes/hora para no
levantar bandera de spam en WhatsApp Business. Template depende de
`plantilla_id` en el CSV.

**Tanda 2 — Llamadas (88 contactos)**: martes a jueves entre 10:00 y 12:00.
Guion corto (30 segundos): "Buenos días, lo llamo de Elenxos. Estamos
lanzando una herramienta de IA para [SEGMENTO]. ¿Tiene 5 minutos esta semana
para que le muestre cómo apoya su trabajo?" Si dice sí, agendar Calendly +
mandar email seguimiento.

**Tanda 3 — Email (24 contactos)**: enviar batch único con
`plantilla-buzon-institucional` pidiendo remisión a la persona ICP correcta.

## Reglas operativas

- Validar cada celular antes de WhatsApp: usar `wa.me/57XXXXXXXXXX` y verificar que el perfil exista (foto/estado público).
- Marcar todo en `operacion-email/contactos-maestro-operativo.csv` con campaña `wave-rutaB-whatsapp-2026-05-04`.
- Para colegios privados, dirigirse a "Coordinación Académica" o "Dirección de Humanidades" — el celular publicado suele ser admisiones; pedir transferencia.
- Para cajas de compensación, apuntar a "Coordinación Cultura" o "Coordinación Bibliotecas" — son los que deciden compras de herramientas para talleres.
- Para Casa de Poesía Silva, Casa Tomada, escuelas indie: el celular suele ser del fundador/director — abordaje muy personal, no corporativo.
- WhatsApp **nunca antes de las 8:00 ni después de las 19:00**, ni domingos.

## Recomendación honesta para subir el rendimiento de WhatsApp directo

Para mejorar la fracción de celulares reales y no solo el volumen total del CSV
necesitamos al menos uno de:

1. **Sesión Instagram autenticada** (cuenta tuya en navegador) — abre @red.relata, @casadepoesiasilva, @casatomada.bog, @relataantioquia, @lapiedraenelagua, @fundacionletra15 y harvester de bios.
2. **Export Eventbrite/Sympla** de eventos pasados de "taller literario" Colombia 2024-2025 — los flyers tienen WhatsApp del organizador.
3. **Dataset propio** (asistentes a eventos previos, base de antiguos clientes, contactos UdeA del cliente original).
4. **Compra de directorio** Cámara Colombiana del Libro o Asociación Colombiana de Escritores (suelen costar ~$300-500 USD y traen 500-1000 nombres con celular).

Cualquiera de los cuatro multiplica el yield x3-x5 sobre WhatsApp directo. Sin
alguno, el CSV todavía puede crecer por conmutadores, extensiones y buzones,
pero el techo público de celular individual sigue siendo bajo.

## Pendientes de la sesión

- Tarea #7-#11 quedaron parcialmente hechas (parte del Idartes/BibloRed/Comfama/Comfenalco/colegios sí se scrapeó, pero la mayoría de pages devolvieron solo conmutador o 404).
- No se pudo scrapear Instagram, Eventbrite, Mincultura PDFs ni Facebook events.
- Quedan ~80 URLs con respuesta vacía o redirección que probablemente no existen como dominio (errores 404 / dominios apagados).
