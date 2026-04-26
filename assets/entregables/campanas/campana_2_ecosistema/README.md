# Campaña 2 — Ecosistema

## Target

Directores de semilleros, comunidades académicas y alianzas institucionales.

## Objetivo

Presentar a Agora como plataforma cooperativa y ecosistema de investigación a escala.

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
| sin_ia | publicaciones | `n3_l5_post_futuro` | `publicacion__n3_l5_post_futuro__sin_ia_01` | Post sobre futuro académico cooperativo. |
| sin_ia | publicaciones | `post_geek_logo_hero` | `publicacion__post_geek_logo_hero__sin_ia_01` | Post marca / comunidad ampliada. |
| sin_ia | publicaciones | `post_micelio` | `publicacion__post_micelio__sin_ia_01` | Post orgánico sobre red viva de conocimiento. |
| sin_ia | publicaciones | `n3_l5_post_cooperar` | `publicacion__n3_l5_post_cooperar__sin_ia_01` | Pieza editorial para publicación basada en cooperar. |
| sin_ia | publicaciones | `post_geek_rizoma` | `publicacion__post_geek_rizoma__sin_ia_01` | Post rizomático sobre conexiones múltiples. |
| con_ia | publicaciones | `n3_l5_hybrid_red` | `publicacion__n3_l5_hybrid_red__con_ia_01` | Pieza AI para publicación basada en red. |
| con_ia | publicaciones | `n3_l5_hybrid_comunidad` | `publicacion__n3_l5_hybrid_comunidad__con_ia_01` | Post AI de comunidad académica viva. |
| con_ia | publicaciones | `hybrid_arbol_tesis` | `publicacion__hybrid_arbol_tesis__con_ia_01` | Post AI de conocimiento conectado. |
| con_ia | publicaciones | `n3_l5_hybrid_agora` | `publicacion__n3_l5_hybrid_agora__con_ia_01` | Post AI de agora futura. |
| con_ia | publicaciones | `hybrid_madurez` | `publicacion__hybrid_madurez__con_ia_01` | Pieza AI para publicación basada en madurez. |
| sin_ia | flyers | `post_geek_fib_nature` | `flyer__post_geek_fib_nature__sin_ia_01` | Flyer orgánico sobre crecimiento gradual. |
| sin_ia | flyers | `post_datos_split` | `flyer__post_datos_split__sin_ia_01` | Pieza editorial para flyer basada en datos split. |
| sin_ia | flyers | `n3_l5_post_semillero` | `flyer__n3_l5_post_semillero__sin_ia_01` | Pieza editorial para flyer basada en semillero. |
| sin_ia | flyers | `post_perspectiva` | `flyer__post_perspectiva__sin_ia_01` | Pieza editorial para flyer basada en perspectiva. |
| sin_ia | flyers | `n3_l5_post_futuro` | `flyer__n3_l5_post_futuro__sin_ia_01` | Pieza editorial para flyer basada en futuro. |
| con_ia | flyers | `n3_l5_hybrid_agora` | `flyer__n3_l5_hybrid_agora__con_ia_01` | Pieza AI para flyer basada en agora. |
| con_ia | flyers | `hybrid_diferenciador` | `flyer__hybrid_diferenciador__con_ia_01` | Flyer AI de múltiples caminos convergentes. |
| con_ia | flyers | `hybrid_respuesta` | `flyer__hybrid_respuesta__con_ia_01` | Flyer AI de síntesis y convergencia. |
| con_ia | flyers | `n3_l5_hybrid_red` | `flyer__n3_l5_hybrid_red__con_ia_01` | Flyer AI de red cooperativa. |
| con_ia | flyers | `hybrid_arbol_tesis` | `flyer__hybrid_arbol_tesis__con_ia_01` | Pieza AI para flyer basada en arbol tesis. |
| sin_ia | reels | `reel_geek_dialectic` | `reel__reel_geek_dialectic__sin_ia_01` | Reel de síntesis institucional. |
| sin_ia | reels | `reel_geek_chaos` | `reel__reel_geek_chaos__sin_ia_01` | Pieza editorial para reel basada en geek chaos. |
| sin_ia | reels | `reel_simbolo` | `reel__reel_simbolo__sin_ia_01` | Reel símbolo / invitación a pertenecer. |
| sin_ia | reels | `n3_l5_reel_vision` | `reel__n3_l5_reel_vision__sin_ia_01` | Reel de visión de ecosistema. |
| sin_ia | reels | `reel_original` | `reel__reel_original__sin_ia_01` | Pieza editorial para reel basada en original. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_01` | Reel AI para visión narrativa del ecosistema. |
| con_ia | reels | `hybrid_story_teaser` | `reel__hybrid_story_teaser__con_ia_01` | Pieza AI para reel basada en teaser. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_02` | Reel AI para visión narrativa del ecosistema. · variación AI 02. |
| con_ia | reels | `hybrid_story_teaser` | `reel__hybrid_story_teaser__con_ia_02` | Pieza AI para reel basada en teaser. · variación AI 02. |
| con_ia | reels | `hybrid_reel_manifiesto` | `reel__hybrid_reel_manifiesto__con_ia_03` | Reel AI para visión narrativa del ecosistema. · variación AI 03. |
| sin_ia | stories | `n3_l5_story_unete` | `story__n3_l5_story_unete__sin_ia_01` | Story de invitación a sumarse. |
| sin_ia | stories | `reel_simbolo` | `story__reel_simbolo__sin_ia_01` | Pieza editorial para story basada en simbolo. |
| sin_ia | stories | `reel_geek_matrix` | `story__reel_geek_matrix__sin_ia_01` | Story experimental de red emergente. |
| sin_ia | stories | `reel_geek_chaos` | `story__reel_geek_chaos__sin_ia_01` | Pieza editorial para story basada en geek chaos. |
| sin_ia | stories | `reel_manifiesto` | `story__reel_manifiesto__sin_ia_01` | Story manifiesto breve de pertenencia. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_01` | Story AI de onboarding / invitación. |
| con_ia | stories | `hybrid_reel_manifiesto` | `story__hybrid_reel_manifiesto__con_ia_01` | Pieza AI para story basada en manifiesto. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_02` | Story AI de onboarding / invitación. · variación AI 02. |
| con_ia | stories | `hybrid_reel_manifiesto` | `story__hybrid_reel_manifiesto__con_ia_02` | Pieza AI para story basada en manifiesto. · variación AI 02. |
| con_ia | stories | `hybrid_story_teaser` | `story__hybrid_story_teaser__con_ia_03` | Story AI de onboarding / invitación. · variación AI 03. |
| sin_ia | banners | `n3_l5_banner_ecosistema` | `banner__n3_l5_banner_ecosistema__sin_ia_01` | Banner sobre red cooperativa. |
| sin_ia | banners | `banner_geek_quantum` | `banner__banner_geek_quantum__sin_ia_01` | Banner de red viva / partículas conectadas. |
| sin_ia | banners | `n3_l5_banner_cta` | `banner__n3_l5_banner_cta__sin_ia_01` | Banner de CTA comunitario. |
| sin_ia | banners | `banner_geek_dialectic` | `banner__banner_geek_dialectic__sin_ia_01` | Banner dialéctico de síntesis académica. |
| sin_ia | banners | `banner_denso` | `banner__banner_denso__sin_ia_01` | Pieza editorial para banner basada en denso. |
| con_ia | banners | `hybrid_banner_og` | `banner__hybrid_banner_og__con_ia_01` | Banner AI para sharing y portada. |
| con_ia | banners | `hybrid_banner_linkedin` | `banner__hybrid_banner_linkedin__con_ia_01` | Banner AI editorial para alianzas. |
| con_ia | banners | `hybrid_banner_yt` | `banner__hybrid_banner_yt__con_ia_01` | Banner AI panorámico de visión. |
| con_ia | banners | `hybrid_banner_x` | `banner__hybrid_banner_x__con_ia_01` | Pieza AI para banner basada en x. |
| con_ia | banners | `hybrid_banner_linkedin` | `banner__hybrid_banner_linkedin__con_ia_02` | Banner AI editorial para alianzas. · variación AI 02. |

## Video

Se omitió la exportación MP4 con `--skip-video`.

