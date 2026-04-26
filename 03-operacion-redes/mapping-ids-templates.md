# Mapping de IDs entre sistemas de templates

Este documento resuelve la deuda de tener tres niveles de IDs sin un puente documentado.

## Los tres niveles

| Nivel | Prefijo | Fuente | Ejemplo | Uso |
|---|---|---|---|---|
| **Narrativo** | `s{N}_*` | `06-redes-sociales/sistema-publicaciones-semanales.md` | `s1_dolor_archivos` | Planificacion estrategica del arco de 8 semanas |
| **Ejecutable** | `{formato}_{nombre}` o `n{N}_l{L}_{tipo}_{nombre}` | `elenxos_design_system/src/templates/registry.ts` | `post_tesis`, `n1_l1_post_caos` | Render final en PNG/MP4 via Playwright |
| **Legacy export** | `s{N}_post{M}` | `assets/scripts/generate_hybrid.py` | `s1_post1` | Exportacion de hibridos (puente viejo) |

## Regla de uso

- **Para planificar que se publica:** usar IDs narrativos (`s1_*`) del sistema de 8 semanas.
- **Para renderizar la pieza:** usar IDs ejecutables del registry (`post_tesis`, `n1_l1_*`).
- **Para exportar hibridos legacy:** usar IDs de export (`s1_post1`), pero preferir el pipeline nuevo de campañas.

## Mapping actual: Lote 1 de arranque

El Lote 1 (`03-operacion-redes/lote-1-publicaciones-por-plataforma.md`) es el primer bloque ejecutable. Sus assets mapean directamente a templates standalone del registry:

| Pieza del Lote 1 | Asset referenciado en copy | ID ejecutable en registry |
|---|---|---|
| LinkedIn Pub 1 — tesis de marca | `lote1_estandar` | `lote1_estandar` (post, instagram) |
| LinkedIn Pub 2 — diferenciador real | `lote1_flujo` | `lote1_flujo` (post, instagram) |
| LinkedIn Pub 3 — prueba de madurez | collage con screenshots reales | sin template (requiere screenshots reales) |
| Instagram Carrusel 1 — portada | `lote1_estandar` | `lote1_estandar` |
| Instagram Reel 1 — que es Agora | `reel_manifiesto` | `reel_manifiesto` (reel, instagram) |
| Instagram Carrusel 2 — flujo | `lote1_flujo` | `lote1_flujo` |
| X / teasers | `banner_minimal` | `banner_minimal` (banner, linkedin) |

## Mapping: Semana 1 del sistema de 8 semanas vs templates de campaña

Los IDs narrativos `s1_*` del sistema de 8 semanas NO tienen un mapping 1:1 con los templates de campaña del registry. La relacion es tematica, no directa:

| ID narrativo (sistema 8 sem) | Tema | Templates de campaña afines |
|---|---|---|
| `s1_dolor_archivos` | Tu tesis no se perdio | `n1_l1_post_caos`, `n1_l1_post_archivos` |
| `s1_antes_despues` | 14 archivos → 1 flujo | `n1_l1_hybrid_antes` |
| `s1_reel_pregunta` | Cuantas veces reescribiste | `n1_l1_reel_dolor` |
| `s1_banner_linkedin` | Menos dispersion | `n1_l1_banner_linkedin` |
| `s1_story_encuesta` | Cuantos archivos tiene tu tesis | `n1_l1_story_stat` |

## Relacion entre Lote 1 y Semana 1

El **Lote 1** (`03-operacion-redes/`) y la **Semana 1** (`06-redes-sociales/`) cubren la misma fase narrativa (dolor / cercania) pero desde angulos distintos:

- **Lote 1**: copy ejecutable listo para publicar, anclado en la landing y docs reales, con assets automatizados del design system.
- **Semana 1**: copy conceptual del arco largo, con prompts de IA para generar fondos y un tono mas editorial.

En la practica, el Lote 1 es el punto de arranque inmediato. Las Semanas 1-2 del sistema de 8 semanas amplian y complementan ese material, no lo reemplazan.

## Cuando unificar

El mapping solo deberia unificarse a un solo nivel de IDs cuando:

1. El pipeline de campañas (`scripts/generar_campana.sh`) sea la unica via de produccion.
2. El script legacy `generate_hybrid.py` se retire.
3. Los IDs narrativos se alineen directamente a los IDs del registry.

Mientras tanto, este documento sirve de puente.
