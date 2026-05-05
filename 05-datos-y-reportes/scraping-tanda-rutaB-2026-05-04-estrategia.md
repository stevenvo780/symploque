# Estrategia de contacto Ruta B — celular/WhatsApp principal (2026-05-04)

CSV: `05-datos-y-reportes/scraping-tanda-rutaB-2026-05-04.csv`

## Resultado real del scraping

- **94 contactos extraídos** (no 200 — abajo está el porqué).
- **38 con celular o WhatsApp directo** (canal principal pedido).
- **44 con fijo + extensión** (canal de fallback).
- **12 con email institucional como única vía pública**.

## Por qué 94 y no 200

El scraping público colombiano para celular individual de personas ICP letras tiene un techo bajo. Lo confirmé empíricamente tras 12 oleadas y ~600 URLs:

- Profesores universitarios: **no publican celular**. La página de profesores de Externado, Uninorte, Javeriana, Uniandes solo trae email institucional + extensión del conmutador.
- Idartes / BibloRed / Banrep / Mincultura: solo publican el conmutador de la sede (`+57 601 XXX XXXX`).
- Casas de poesía, escuelas de escritura, fundaciones: muchas tienen WhatsApp en Instagram bio, pero **Instagram bloquea por login wall** desde 2023; no hay forma sin sesión autenticada.
- Eventbrite Colombia: renderiza con JS y bloquea bots no autenticados.
- Mincultura Sistema Convocatorias: los anexos PDF están en Azure Blob con SAS token expirado.
- Facebook event pages: bloqueo total por login wall.
- Las cuentas de WhatsApp públicas que sí logré extraer vienen de homepages de cajas de compensación, colegios privados, librerías y algunas escuelas de escritura.

Con un dataset propio (export de Eventbrite/Sympla, lista de asistentes a Filbo, base de antiguos clientes UdeA, sesión autenticada de Instagram) podríamos triplicar el yield. Sin eso, 94 es el techo razonable para esta sesión.

## Distribución por canal recomendado

| Canal | Contactos | Uso |
|---|---|---|
| WhatsApp / celular directo | 38 | Tanda 1 — outreach personalizado por WhatsApp |
| Fijo + extensión | 44 | Tanda 2 — llamada en horario laboral con guion |
| Email institucional | 12 | Tanda 3 — fallback solo si no hay otro canal |

## Distribución por segmento

| Segmento | # | Notas |
|---|---|---|
| colegio-privado | 22 | Coordinaciones académicas, dirección de humanidades — buen ICP educación + letras |
| caja-compensacion | 19 | Comfama, Comfenalco, Colsubsidio, Compensar — programas culturales con talleres |
| cultura-distrital | 8 | Idartes, BibloRed, Teatros Bogotá |
| libreria-club-lectura | 5 | Librerías con club lectura activo |
| biblioteca-publica | 4 | BibloRed, Biblioteca Antioquia, Bibliotecas Medellín |
| editorial-indie | 1 | Editoriales independientes |
| festival-literario | 1 | FILBo / Hay Festival |
| centro-escritura-uni / fundacion-cultural / red-talleres / tallerista-poesia | 6 | Nodos académicos y de red |
| otro-cultural | 29 | Mezcla — revisar uno por uno |

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

**Tanda 1 — WhatsApp (38 contactos, scores 5)**: arrancar mañana. Mensaje personalizado por nombre + organización. Espaciar 10-15 mensajes/hora para no levantar bandera de spam en WhatsApp Business. Template depende de plantilla_id en el CSV.

**Tanda 2 — Llamadas (44 contactos)**: martes a jueves entre 10:00 y 12:00. Guion corto (30 segundos): "Buenos días, lo llamo de Elenxos. Estamos lanzando una herramienta de IA para [SEGMENTO]. ¿Tiene 5 minutos esta semana para que le muestre cómo apoya su trabajo?" — si dice sí, agendar Calendly + mandar email seguimiento.

**Tanda 3 — Email (12 contactos)**: enviar batch único con plantilla-buzon-institucional pidiendo remisión a la persona ICP correcta.

## Reglas operativas

- Validar cada celular antes de WhatsApp: usar `wa.me/57XXXXXXXXXX` y verificar que el perfil exista (foto/estado público).
- Marcar todo en `operacion-email/contactos-maestro-operativo.csv` con campaña `wave-rutaB-whatsapp-2026-05-04`.
- Para colegios privados, dirigirse a "Coordinación Académica" o "Dirección de Humanidades" — el celular publicado suele ser admisiones; pedir transferencia.
- Para cajas de compensación, apuntar a "Coordinación Cultura" o "Coordinación Bibliotecas" — son los que deciden compras de herramientas para talleres.
- Para Casa de Poesía Silva, Casa Tomada, escuelas indie: el celular suele ser del fundador/director — abordaje muy personal, no corporativo.
- WhatsApp **nunca antes de las 8:00 ni después de las 19:00**, ni domingos.

## Recomendación honesta para superar el techo de 94

Para llegar a 200 con celular real necesitamos al menos uno de:

1. **Sesión Instagram autenticada** (cuenta tuya en navegador) — abre @red.relata, @casadepoesiasilva, @casatomada.bog, @relataantioquia, @lapiedraenelagua, @fundacionletra15 y harvester de bios.
2. **Export Eventbrite/Sympla** de eventos pasados de "taller literario" Colombia 2024-2025 — los flyers tienen WhatsApp del organizador.
3. **Dataset propio** (asistentes a eventos previos, base de antiguos clientes, contactos UdeA del cliente original).
4. **Compra de directorio** Cámara Colombiana del Libro o Asociación Colombiana de Escritores (suelen costar ~$300-500 USD y traen 500-1000 nombres con celular).

Cualquiera de los cuatro multiplica el yield x3-x5. Sin alguno, el techo público es ~90-100.

## Pendientes de la sesión

- Tarea #7-#11 quedaron parcialmente hechas (parte del Idartes/BibloRed/Comfama/Comfenalco/colegios sí se scrapeó, pero la mayoría de pages devolvieron solo conmutador o 404).
- No se pudo scrapear Instagram, Eventbrite, Mincultura PDFs ni Facebook events.
- Quedan ~80 URLs con respuesta vacía o redirección que probablemente no existen como dominio (errores 404 / dominios apagados).
