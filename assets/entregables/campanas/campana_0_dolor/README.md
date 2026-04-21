# Campaña 0 — Dolor

## Target

Tesistas, investigadores individuales y semilleros que trabajan con archivos dispersos.

## Objetivo

Mostrar el dolor operativo y hacer evidente la necesidad de un flujo único de investigación.

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
| sin_ia | publicaciones | `n1_l2_post_ciclo` | `publicacion__n1_l2_post_ciclo__sin_ia_01` | Pieza editorial para publicación basada en ciclo. |
| sin_ia | publicaciones | `post_glass` | `publicacion__post_glass__sin_ia_01` | Pieza editorial para publicación basada en glass. |
| sin_ia | publicaciones | `post_geek_logo_hero` | `publicacion__post_geek_logo_hero__sin_ia_01` | Pieza editorial para publicación basada en geek logo hero. |
| sin_ia | publicaciones | `post_cita_roja` | `publicacion__post_cita_roja__sin_ia_01` | Post dramático sobre el problema real. |
| sin_ia | publicaciones | `n1_l2_post_fragmentos` | `publicacion__n1_l2_post_fragmentos__sin_ia_01` | Post de fragmentación académica. |
| con_ia | publicaciones | `n1_l2_hybrid_red` | `publicacion__n1_l2_hybrid_red__con_ia_01` | Post AI sobre red desconectada. |
| con_ia | publicaciones | `hybrid_arbol_tesis` | `publicacion__hybrid_arbol_tesis__con_ia_01` | Pieza AI para publicación basada en arbol tesis. |
| con_ia | publicaciones | `n1_l2_hybrid_puente` | `publicacion__n1_l2_hybrid_puente__con_ia_01` | Pieza AI para publicación basada en puente. |
| con_ia | publicaciones | `hybrid_problema` | `publicacion__hybrid_problema__con_ia_01` | Post AI que dramatiza el problema. |
| con_ia | publicaciones | `n1_l1_hybrid_escritorio` | `publicacion__n1_l1_hybrid_escritorio__con_ia_01` | Pieza AI para publicación basada en escritorio. |
| sin_ia | flyers | `n1_l2_post_fragmentos` | `flyer__n1_l2_post_fragmentos__sin_ia_01` | Pieza editorial para flyer basada en fragmentos. |
| sin_ia | flyers | `n1_l2_post_ciclo` | `flyer__n1_l2_post_ciclo__sin_ia_01` | Flyer del ciclo roto de trabajo. |
| sin_ia | flyers | `n1_l1_post_archivos` | `flyer__n1_l1_post_archivos__sin_ia_01` | Flyer del archivo disperso. |
| sin_ia | flyers | `n1_l2_post_dato` | `flyer__n1_l2_post_dato__sin_ia_01` | Pieza editorial para flyer basada en dato. |
| sin_ia | flyers | `post_geek_proof` | `flyer__post_geek_proof__sin_ia_01` | Pieza editorial para flyer basada en geek proof. |
| con_ia | flyers | `n1_l2_hybrid_nodos` | `flyer__n1_l2_hybrid_nodos__con_ia_01` | Flyer AI con nodos sin cohesión. |
| con_ia | flyers | `hybrid_diferenciador` | `flyer__hybrid_diferenciador__con_ia_01` | Flyer AI con vías divergentes y claim fuerte. |
| con_ia | flyers | `n1_l1_hybrid_escritorio` | `flyer__n1_l1_hybrid_escritorio__con_ia_01` | Flyer AI con escritorio saturado. |
| con_ia | flyers | `hybrid_madurez` | `flyer__hybrid_madurez__con_ia_01` | Pieza AI para flyer basada en madurez. |
| con_ia | flyers | `n1_l1_hybrid_antes` | `flyer__n1_l1_hybrid_antes__con_ia_01` | Pieza AI para flyer basada en antes. |
| sin_ia | reels | `n1_l1_reel_dolor` | `reel__n1_l1_reel_dolor__sin_ia_01` | Reel principal de awareness sobre dispersión. |
| sin_ia | reels | `n1_l2_reel_flujo` | `reel__n1_l2_reel_flujo__sin_ia_01` | Reel sobre fricción y pérdida de continuidad. |
| sin_ia | reels | `reel_geek_dialectic` | `reel__reel_geek_dialectic__sin_ia_01` | Pieza editorial para reel basada en geek dialectic. |
| sin_ia | reels | `n1_l1_story_stat` | `reel__n1_l1_story_stat__sin_ia_01` | Pieza editorial para reel basada en stat. |
| sin_ia | reels | `n1_l2_story_antes` | `reel__n1_l2_story_antes__sin_ia_01` | Pieza editorial para reel basada en antes. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_01` | Reel AI de alto impacto para dolor. |
| con_ia | reels | `hybrid_story_teaser` | `reel__hybrid_story_teaser__con_ia_01` | Pieza AI para reel basada en teaser. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_02` | Reel AI de alto impacto para dolor. · variación AI 02. |
| con_ia | reels | `hybrid_story_teaser` | `reel__hybrid_story_teaser__con_ia_02` | Pieza AI para reel basada en teaser. · variación AI 02. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_03` | Reel AI de alto impacto para dolor. · variación AI 03. |
| sin_ia | stories | `n1_l1_story_stat` | `story__n1_l1_story_stat__sin_ia_01` | Story con dato de dolor operativo. |
| sin_ia | stories | `reel_geek_chaos` | `story__reel_geek_chaos__sin_ia_01` | Pieza editorial para story basada en geek chaos. |
| sin_ia | stories | `n1_l1_reel_dolor` | `story__n1_l1_reel_dolor__sin_ia_01` | Pieza editorial para story basada en dolor. |
| sin_ia | stories | `reel_geek_proof` | `story__reel_geek_proof__sin_ia_01` | Pieza editorial para story basada en geek proof. |
| sin_ia | stories | `n1_l2_reel_flujo` | `story__n1_l2_reel_flujo__sin_ia_01` | Pieza editorial para story basada en flujo. |
| con_ia | stories | `hybrid_reel_manifiesto` | `story__hybrid_reel_manifiesto__con_ia_01` | Pieza AI para story basada en manifiesto. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_01` | Story AI de tensión y teaser. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_02` | Story AI de tensión y teaser. · variación AI 02. |
| con_ia | stories | `hybrid_reel_manifiesto` | `story__hybrid_reel_manifiesto__con_ia_02` | Pieza AI para story basada en manifiesto. · variación AI 02. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_03` | Story AI de tensión y teaser. · variación AI 03. |
| sin_ia | banners | `n1_l1_banner_x` | `banner__n1_l1_banner_x__sin_ia_01` | Pieza editorial para banner basada en x. |
| sin_ia | banners | `banner_denso` | `banner__banner_denso__sin_ia_01` | Banner denso con red micelial rota. |
| sin_ia | banners | `banner_original` | `banner__banner_original__sin_ia_01` | Pieza editorial para banner basada en original. |
| sin_ia | banners | `n1_l1_banner_linkedin` | `banner__n1_l1_banner_linkedin__sin_ia_01` | Banner base de dolor / dispersión. |
| sin_ia | banners | `banner_geek_glitch` | `banner__banner_geek_glitch__sin_ia_01` | Banner glitch para dramatizar el quiebre. |
| con_ia | banners | `hybrid_banner_x` | `banner__hybrid_banner_x__con_ia_01` | Banner AI panorámico con transformación incompleta. |
| con_ia | banners | `hybrid_banner_yt` | `banner__hybrid_banner_yt__con_ia_01` | Banner AI tipo portal / umbral de cambio. |
| con_ia | banners | `hybrid_banner_linkedin` | `banner__hybrid_banner_linkedin__con_ia_01` | Banner AI editorial para awareness. |
| con_ia | banners | `hybrid_banner_og` | `banner__hybrid_banner_og__con_ia_01` | Pieza AI para banner basada en og. |
| con_ia | banners | `hybrid_banner_yt` | `banner__hybrid_banner_yt__con_ia_02` | Banner AI tipo portal / umbral de cambio. · variación AI 02. |

## Video

Se omitió la exportación MP4 con `--skip-video`.

