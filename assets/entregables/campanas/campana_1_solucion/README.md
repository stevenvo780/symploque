# Campaña 1 — Solución

## Target

Coordinadores de semilleros, centros de escritura y equipos que necesitan flujo + verificación.

## Objetivo

Mostrar a Agora como infraestructura útil: editor, lógica formal, verificación y colaboración.

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
| con_ia | publicaciones | `n2_l3_hybrid_flujo` | Post AI de flujo verde integrado. |
| con_ia | publicaciones | `n2_l4_hybrid_pensar` | Pieza AI para publicación basada en pensar. |
| sin_ia | publicaciones | `post_geek_proof` | Post visual de demostración formal. |
| sin_ia | publicaciones | `post_geek_turing` | Post técnico sobre computabilidad. |
| sin_ia | publicaciones | `post_glass` | Post glassmorphism sobre un solo flujo. |
| con_ia | flyers | `n2_l3_hybrid_editor` | Flyer AI con editor central. |
| con_ia | flyers | `hybrid_diferenciador` | Pieza AI para flyer basada en diferenciador. |
| sin_ia | flyers | `post_perspectiva` | Pieza editorial para flyer basada en perspectiva. |
| sin_ia | flyers | `post_datos_split` | Flyer de datos y estructura. |
| sin_ia | flyers | `n2_l3_post_verificacion` | Flyer sobre verificación integrada. |
| con_ia | reels | `hybrid_reel_manifiesto` | Reel AI de posicionamiento / demostración. |
| sin_ia | reels | `reel_geek_proof` | Reel visual paso a paso de prueba formal. |
| sin_ia | reels | `n2_l4_reel_rigor` | Reel sobre rigor, lógica y validación. |
| sin_ia | reels | `n2_l4_story_formal` | Pieza editorial para reel basada en formal. |
| sin_ia | reels | `reel_geek_chaos` | Pieza editorial para reel basada en geek chaos. |
| con_ia | stories | `hybrid_story_teaser` | Story AI de activación y prueba. |
| sin_ia | stories | `reel_geek_quantum` | Story experimental sobre observación y decisión. |
| sin_ia | stories | `n2_l3_story_feature` | Story de feature principal. |
| sin_ia | stories | `n2_l3_reel_demo` | Pieza editorial para story basada en demo. |
| sin_ia | stories | `reel_simbolo` | Pieza editorial para story basada en simbolo. |
| con_ia | banners | `hybrid_banner_yt` | Banner AI para demo/portal. |
| con_ia | banners | `hybrid_banner_og` | Banner AI para sharing institucional. |
| sin_ia | banners | `banner_conferencia` | Banner editorial con credibilidad institucional. |
| sin_ia | banners | `n2_l4_banner_formal` | Banner sobre formalización rigurosa. |
| sin_ia | banners | `n2_l4_banner_motor` | Pieza editorial para banner basada en motor. |

## Video

Se omitió la exportación MP4 con `--skip-video`.

