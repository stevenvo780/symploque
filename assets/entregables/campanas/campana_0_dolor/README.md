# Campaña 0 — Dolor

## Target

Tesistas, investigadores individuales y semilleros que trabajan con archivos dispersos.

## Objetivo

Mostrar el dolor operativo y hacer evidente la necesidad de un flujo único de investigación.

## Regla del pack

- 25 piezas totales
- al menos 5 piezas por categoría (publicaciones, flyers, reels, stories, banners)
- distribución generada en esta corrida: 17 sin_ia / 8 con_ia
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
- modo IA: `cached`
- se reutilizó la librería AI sincronizada en `public/ai-images/`

## Mapping de templates

| Variante | Tipo | Template | Descripción |
| :--- | :--- | :--- | :--- |
| con_ia | publicaciones | `n1_l2_hybrid_nodos` | Pieza AI para publicación basada en nodos. |
| con_ia | publicaciones | `hybrid_problema` | Post AI que dramatiza el problema. |
| sin_ia | publicaciones | `n1_l1_post_caos` | Post principal del caos documental. |
| sin_ia | publicaciones | `post_cita_roja` | Post dramático sobre el problema real. |
| sin_ia | publicaciones | `n1_l2_post_fragmentos` | Post de fragmentación académica. |
| con_ia | flyers | `n1_l1_hybrid_antes` | Pieza AI para flyer basada en antes. |
| con_ia | flyers | `hybrid_arbol_tesis` | Pieza AI para flyer basada en arbol tesis. |
| sin_ia | flyers | `n1_l2_post_dato` | Pieza editorial para flyer basada en dato. |
| sin_ia | flyers | `post_datos_split` | Flyer con fractura entre dato y flujo. |
| sin_ia | flyers | `n1_l2_post_ciclo` | Flyer del ciclo roto de trabajo. |
| con_ia | reels | `hybrid_reel_manifiesto` | Reel AI de alto impacto para dolor. |
| sin_ia | reels | `n1_l2_reel_flujo` | Reel sobre fricción y pérdida de continuidad. |
| sin_ia | reels | `n1_l1_story_stat` | Pieza editorial para reel basada en stat. |
| sin_ia | reels | `n1_l2_story_antes` | Pieza editorial para reel basada en antes. |
| sin_ia | reels | `reel_geek_chaos` | Reel visual del paso del caos al orden. |
| con_ia | stories | `hybrid_story_teaser` | Story AI de tensión y teaser. |
| sin_ia | stories | `reel_geek_matrix` | Story con caída de símbolos y desorientación. |
| sin_ia | stories | `reel_geek_proof` | Pieza editorial para story basada en geek proof. |
| sin_ia | stories | `reel_geek_dialectic` | Pieza editorial para story basada en geek dialectic. |
| sin_ia | stories | `n1_l1_reel_dolor` | Pieza editorial para story basada en dolor. |
| con_ia | banners | `hybrid_banner_x` | Banner AI panorámico con transformación incompleta. |
| con_ia | banners | `hybrid_banner_yt` | Banner AI tipo portal / umbral de cambio. |
| sin_ia | banners | `n1_l1_banner_linkedin` | Banner base de dolor / dispersión. |
| sin_ia | banners | `n1_l2_banner_contraste` | Banner de contraste entre caos y foco. |
| sin_ia | banners | `n1_l2_banner_pregunta` | Pieza editorial para banner basada en pregunta. |

## Video

Se omitió la exportación MP4 con `--skip-video`.

