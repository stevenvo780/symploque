# Campaña 1 — Solución

## Target

Coordinadores de semilleros, centros de escritura y equipos que necesitan flujo + verificación.

## Objetivo

Mostrar a Agora como infraestructura útil: editor, lógica formal, verificación y colaboración.

## Regla del pack

- 50 piezas totales
- 5 piezas por categoría en `sin_ia/`
- 5 piezas por categoría en `con_ia/`
- 10 piezas por categoría en total (publicaciones, flyers, reels, stories, banners)
- distribución generada en esta corrida: 25 sin_ia / 25 con_ia
- tipos cubiertos: publicaciones, flyers, reels, stories, banners
- nota: `flyers/` usa layout cuadrado de post (1080×1080) porque hoy no existe un layout flyer dedicado en el renderer

## Estructura

- `sin_ia/publicaciones/`
- `sin_ia/flyers/`
- `sin_ia/reels/`
- `sin_ia/stories/`
- `sin_ia/banners/`
- `con_ia/publicaciones/`
- `con_ia/flyers/`
- `con_ia/reels/`
- `con_ia/stories/`
- `con_ia/banners/`

## Variación de esta corrida

- seed base: `12345`
- modo IA: `fresh`
- fondos AI frescos únicos por instancia guardados en `con_ia/fuentes_ai/`
- prompts y seeds de IA guardados en `prompts_ai.json`

## Mapping de templates

| Variante | Tipo | Template | Archivo | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| sin_ia | publicaciones | `post_geek_proof` | `publicacion__post_geek_proof__sin_ia_01` | Post visual de demostración formal. |
| sin_ia | publicaciones | `n2_l4_post_logica` | `publicacion__n2_l4_post_logica__sin_ia_01` | Pieza editorial para publicación basada en logica. |
| sin_ia | publicaciones | `lote1_estandar` | `publicacion__lote1_estandar__sin_ia_01` | Pieza editorial para publicación basada en lote1 estandar. |
| sin_ia | publicaciones | `post_geek_turing` | `publicacion__post_geek_turing__sin_ia_01` | Post técnico sobre computabilidad. |
| sin_ia | publicaciones | `post_glass` | `publicacion__post_glass__sin_ia_01` | Post glassmorphism sobre un solo flujo. |
| con_ia | publicaciones | `n2_l3_hybrid_equipo` | `publicacion__n2_l3_hybrid_equipo__con_ia_01` | Pieza AI para publicación basada en equipo. |
| con_ia | publicaciones | `hybrid_respuesta` | `publicacion__hybrid_respuesta__con_ia_01` | Post AI de solución / transformación. |
| con_ia | publicaciones | `hybrid_problema` | `publicacion__hybrid_problema__con_ia_01` | Pieza AI para publicación basada en problema. |
| con_ia | publicaciones | `n2_l3_hybrid_flujo` | `publicacion__n2_l3_hybrid_flujo__con_ia_01` | Post AI de flujo verde integrado. |
| con_ia | publicaciones | `n2_l4_hybrid_rigor` | `publicacion__n2_l4_hybrid_rigor__con_ia_01` | Post AI de formalización y precisión. |
| sin_ia | flyers | `n2_l3_post_verificacion` | `flyer__n2_l3_post_verificacion__sin_ia_01` | Flyer sobre verificación integrada. |
| sin_ia | flyers | `lote1_estandar` | `flyer__lote1_estandar__sin_ia_01` | Pieza editorial para flyer basada en lote1 estandar. |
| sin_ia | flyers | `n2_l4_post_logica` | `flyer__n2_l4_post_logica__sin_ia_01` | Flyer sobre lógica aplicada. |
| sin_ia | flyers | `n2_l4_post_rigor` | `flyer__n2_l4_post_rigor__sin_ia_01` | Pieza editorial para flyer basada en rigor. |
| sin_ia | flyers | `lote1_flujo` | `flyer__lote1_flujo__sin_ia_01` | Flyer limpio de flujo de trabajo. |
| con_ia | flyers | `n2_l3_hybrid_equipo` | `flyer__n2_l3_hybrid_equipo__con_ia_01` | Pieza AI para flyer basada en equipo. |
| con_ia | flyers | `n2_l3_hybrid_flujo` | `flyer__n2_l3_hybrid_flujo__con_ia_01` | Pieza AI para flyer basada en flujo. |
| con_ia | flyers | `n2_l4_hybrid_pensar` | `flyer__n2_l4_hybrid_pensar__con_ia_01` | Flyer AI sobre pensar con profundidad estructurada. |
| con_ia | flyers | `n2_l3_hybrid_editor` | `flyer__n2_l3_hybrid_editor__con_ia_01` | Flyer AI con editor central. |
| con_ia | flyers | `hybrid_madurez` | `flyer__hybrid_madurez__con_ia_01` | Flyer AI de madurez y evidencia. |
| sin_ia | reels | `n2_l4_story_formal` | `reel__n2_l4_story_formal__sin_ia_01` | Pieza editorial para reel basada en formal. |
| sin_ia | reels | `n2_l3_reel_demo` | `reel__n2_l3_reel_demo__sin_ia_01` | Reel demo del flujo Agora. |
| sin_ia | reels | `reel_simbolo` | `reel__reel_simbolo__sin_ia_01` | Reel de símbolo / promesa de producto. |
| sin_ia | reels | `n2_l4_reel_rigor` | `reel__n2_l4_reel_rigor__sin_ia_01` | Reel sobre rigor, lógica y validación. |
| sin_ia | reels | `n2_l3_story_feature` | `reel__n2_l3_story_feature__sin_ia_01` | Pieza editorial para reel basada en feature. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_01` | Reel AI de posicionamiento / demostración. |
| con_ia | reels | `hybrid_story_teaser` | `reel__hybrid_story_teaser__con_ia_01` | Pieza AI para reel basada en teaser. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_02` | Reel AI de posicionamiento / demostración. · variación AI 02. |
| con_ia | reels | `hybrid_story_teaser` | `reel__hybrid_story_teaser__con_ia_02` | Pieza AI para reel basada en teaser. · variación AI 02. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_03` | Reel AI de posicionamiento / demostración. · variación AI 03. |
| sin_ia | stories | `n2_l3_reel_demo` | `story__n2_l3_reel_demo__sin_ia_01` | Pieza editorial para story basada en demo. |
| sin_ia | stories | `n2_l3_story_feature` | `story__n2_l3_story_feature__sin_ia_01` | Story de feature principal. |
| sin_ia | stories | `reel_geek_chaos` | `story__reel_geek_chaos__sin_ia_01` | Pieza editorial para story basada en geek chaos. |
| sin_ia | stories | `reel_geek_quantum` | `story__reel_geek_quantum__sin_ia_01` | Story experimental sobre observación y decisión. |
| sin_ia | stories | `n2_l4_story_formal` | `story__n2_l4_story_formal__sin_ia_01` | Story de validación formal. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_01` | Story AI de activación y prueba. |
| con_ia | stories | `hybrid_reel_manifiesto` | `story__hybrid_reel_manifiesto__con_ia_01` | Pieza AI para story basada en manifiesto. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_02` | Story AI de activación y prueba. · variación AI 02. |
| con_ia | stories | `hybrid_reel_manifiesto` | `story__hybrid_reel_manifiesto__con_ia_02` | Pieza AI para story basada en manifiesto. · variación AI 02. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_03` | Story AI de activación y prueba. · variación AI 03. |
| sin_ia | banners | `n2_l3_banner_solucion` | `banner__n2_l3_banner_solucion__sin_ia_01` | Banner de propuesta de valor. |
| sin_ia | banners | `n2_l3_banner_cta` | `banner__n2_l3_banner_cta__sin_ia_01` | Pieza editorial para banner basada en cta. |
| sin_ia | banners | `banner_geek_proof` | `banner__banner_geek_proof__sin_ia_01` | Banner de lógica formal aplicada. |
| sin_ia | banners | `n2_l4_banner_formal` | `banner__n2_l4_banner_formal__sin_ia_01` | Banner sobre formalización rigurosa. |
| sin_ia | banners | `banner_geek_glitch` | `banner__banner_geek_glitch__sin_ia_01` | Pieza editorial para banner basada en geek glitch. |
| con_ia | banners | `hybrid_banner_yt` | `banner__hybrid_banner_yt__con_ia_01` | Banner AI para demo/portal. |
| con_ia | banners | `hybrid_banner_x` | `banner__hybrid_banner_x__con_ia_01` | Pieza AI para banner basada en x. |
| con_ia | banners | `hybrid_banner_og` | `banner__hybrid_banner_og__con_ia_01` | Banner AI para sharing institucional. |
| con_ia | banners | `hybrid_banner_linkedin` | `banner__hybrid_banner_linkedin__con_ia_01` | Banner AI editorial para propuesta de valor. |
| con_ia | banners | `hybrid_banner_yt` | `banner__hybrid_banner_yt__con_ia_02` | Banner AI para demo/portal. · variación AI 02. |

## Video

Se omitió la exportación MP4 con `--skip-video`.

