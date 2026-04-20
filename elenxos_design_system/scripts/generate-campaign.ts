#!/usr/bin/env npx tsx
/**
 * generate-campaign.ts — Orquesta campañas completas y entregables en assets/
 *
 * Modos:
 * 1) Sin filtros → genera 3 campañas oficiales en assets/entregables/campanas/
 * 2) Con filtros (--narrativa / --lote / --tipo o --legacy) → genera una
 *    selección puntual en assets/entregables/campanas/selecciones/
 */

import { execSync } from 'child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  CAMPAIGN_META,
  getTemplateById,
  type CampaignMeta,
} from '../src/templates/registry';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WORKSPACE_ROOT = resolve(ROOT, '..');
const DEFAULT_ASSET_OUTPUT = join(WORKSPACE_ROOT, 'assets', 'entregables', 'campanas');

type Narrative = CampaignMeta['narrativa'];
type AssetVariant = 'con_ia' | 'sin_ia';
type AssetKind = 'publicaciones' | 'flyers' | 'reels' | 'stories' | 'banners';
type DeliverySlot = 'publicacion' | 'flyer' | 'reel' | 'story' | 'banner';
type AiMode = 'auto' | 'fresh' | 'reuse';

interface DeliveryItem {
  slot: DeliverySlot;
  kind: AssetKind;
  variant: AssetVariant;
  templateId: string;
  description: string;
}

interface CandidateTemplate {
  templateId: string;
  description: string;
  weight?: number;
}

interface DeliveryCampaign {
  folderName: string;
  titulo: string;
  narrativa: Narrative;
  target: string;
  objetivo: string;
  items: DeliveryItem[];
}

interface DeliveryCampaignBlueprint {
  folderName: string;
  titulo: string;
  narrativa: Narrative;
  target: string;
  objetivo: string;
  pools: Record<AssetVariant, Record<DeliverySlot, CandidateTemplate[]>>;
}

interface AIGenerationItem {
  templateId: string;
  slot: DeliverySlot;
  kind: AssetKind;
  variant: AssetVariant;
  narrativa: Narrative;
  description: string;
  width: number;
  height: number;
  seed: number;
  prompt: string;
  negativePrompt: string;
  publicPath: string;
  outputPath: string;
}

interface AIGenerationBundle {
  campaignFolder: string;
  campaignTitle: string;
  narrativa: Narrative;
  seedBase: number;
  steps: number;
  guidance: number;
  items: AIGenerationItem[];
}

interface Args {
  narrativa: string | null;
  lotes: number[] | null;
  tipo: string | null;
  outputBase: string | null;
  skipVideo: boolean;
  videoDuration: number;
  legacy: boolean;
  aiMode: AiMode;
  seed: number | null;
  aiSteps: number;
  aiGuidance: number;
}

const AI_IMAGE_PATHS: Record<string, string> = {
  // Campaign hybrids (modo legacy)
  n1_l1_hybrid_caos: '/ai-images/campaign/n1_caos_digital.png',
  n1_l1_hybrid_escritorio: '/ai-images/campaign/n1_escritorio_caos.png',
  n1_l1_hybrid_antes: '/ai-images/campaign/n1_antes_despues.png',
  n1_l2_hybrid_red: '/ai-images/campaign/n1_red_fragmentada.png',
  n1_l2_hybrid_nodos: '/ai-images/campaign/n1_nodos_conectados.png',
  n1_l2_hybrid_puente: '/ai-images/campaign/n1_puente_conocimiento.png',
  n2_l3_hybrid_flujo: '/ai-images/campaign/n2_flujo_verde.png',
  n2_l3_hybrid_editor: '/ai-images/campaign/n2_editor_agora.png',
  n2_l3_hybrid_equipo: '/ai-images/campaign/n2_equipo_semillero.png',
  n2_l4_hybrid_rigor: '/ai-images/campaign/n2_rigor_formal.png',
  n2_l4_hybrid_pensar: '/ai-images/campaign/n2_pensar_profundo.png',
  n2_l4_hybrid_cta: '/ai-images/campaign/n2_cta_demo.png',
  n3_l5_hybrid_comunidad: '/ai-images/campaign/n3_comunidad_academica.png',
  n3_l5_hybrid_red: '/ai-images/campaign/n3_red_cooperativa.png',
  n3_l5_hybrid_agora: '/ai-images/campaign/n3_agora_futuro.png',

  // Generic hybrid templates (modo assets)
  hybrid_arbol_tesis: '/ai-images/instagram/ig_post_tesis.png',
  hybrid_problema: '/ai-images/instagram/ig_carrusel_problema_1.png',
  hybrid_respuesta: '/ai-images/instagram/ig_carrusel_problema_3.png',
  hybrid_diferenciador: '/ai-images/linkedin/linkedin_post_diferenciador.png',
  hybrid_madurez: '/ai-images/linkedin/linkedin_post_madurez.png',
  hybrid_reel_manifiesto: '/ai-images/instagram/ig_reel_cover.png',
  hybrid_story_teaser: '/ai-images/instagram/ig_story_teaser.png',
  hybrid_banner_linkedin: '/ai-images/linkedin/linkedin_banner.png',
  hybrid_banner_og: '/ai-images/web/og_general.png',
  hybrid_banner_x: '/ai-images/x/x_post_principal.png',
  hybrid_banner_yt: '/ai-images/youtube/yt_thumbnail.png',
};

const MAX_QUALITY_SYNC_DIRS = [
  'instagram',
  'linkedin',
  'web',
  'whatsapp',
  'x',
  'youtube',
] as const;

const CAMPAIGN_AI_ALIASES: Array<{ source: string; target: string }> = [
  { source: 's1_post1.png', target: 'n1_caos_digital.png' },
  { source: 's1_post2.png', target: 'n1_escritorio_caos.png' },
  { source: 's1_story.png', target: 'n1_antes_despues.png' },
  { source: 's2_post1.png', target: 'n1_red_fragmentada.png' },
  { source: 's2_post2.png', target: 'n1_nodos_conectados.png' },
  { source: 's2_story.png', target: 'n1_puente_conocimiento.png' },
  { source: 's3_post1.png', target: 'n2_flujo_verde.png' },
  { source: 's3_post2.png', target: 'n2_editor_agora.png' },
  { source: 's3_story.png', target: 'n2_equipo_semillero.png' },
  { source: 's5_post1.png', target: 'n2_rigor_formal.png' },
  { source: 's5_post2.png', target: 'n2_pensar_profundo.png' },
  { source: 's5_story.png', target: 'n2_cta_demo.png' },
  { source: 's7_post1.png', target: 'n3_comunidad_academica.png' },
  { source: 's7_post2.png', target: 'n3_red_cooperativa.png' },
  { source: 's7_story.png', target: 'n3_agora_futuro.png' },
];

const SLOT_ORDER: DeliverySlot[] = ['publicacion', 'flyer', 'reel', 'story', 'banner'];

const SLOT_TO_KIND: Record<DeliverySlot, AssetKind> = {
  publicacion: 'publicaciones',
  flyer: 'flyers',
  reel: 'reels',
  story: 'stories',
  banner: 'banners',
};

const candidate = (templateId: string, description: string, weight = 1): CandidateTemplate => ({
  templateId,
  description,
  weight,
});

const DELIVERY_BLUEPRINTS: DeliveryCampaignBlueprint[] = [
  {
    folderName: 'campana_0_dolor',
    titulo: 'Campaña 0 — Dolor',
    narrativa: 'dolor',
    target: 'Tesistas, investigadores individuales y semilleros que trabajan con archivos dispersos.',
    objetivo: 'Mostrar el dolor operativo y hacer evidente la necesidad de un flujo único de investigación.',
    pools: {
      sin_ia: {
        publicacion: [
          candidate('n1_l1_post_caos', 'Post principal del caos documental.', 4),
          candidate('n1_l2_post_fragmentos', 'Post de fragmentación académica.', 4),
          candidate('post_cita_roja', 'Post dramático sobre el problema real.', 2),
          candidate('post_pregunta', 'Post provocador para abrir la conversación.', 2),
          candidate('post_geek_wittgenstein', 'Post visual sobre límites del lenguaje.', 1),
          candidate('post_geek_caos', 'Post abstracto sobre orden oculto en el caos.', 1),
        ],
        flyer: [
          candidate('n1_l1_post_archivos', 'Flyer del archivo disperso.', 4),
          candidate('n1_l2_post_ciclo', 'Flyer del ciclo roto de trabajo.', 3),
          candidate('post_datos_split', 'Flyer con fractura entre dato y flujo.', 2),
          candidate('post_geek_nietzsche', 'Flyer oscuro de eterno retorno / desgaste.', 1),
        ],
        reel: [
          candidate('n1_l1_reel_dolor', 'Reel principal de awareness sobre dispersión.', 4),
          candidate('n1_l2_reel_flujo', 'Reel sobre fricción y pérdida de continuidad.', 3),
          candidate('reel_manifiesto', 'Reel manifiesto sobre demasiadas herramientas.', 2),
          candidate('reel_geek_chaos', 'Reel visual del paso del caos al orden.', 1),
        ],
        story: [
          candidate('n1_l1_story_stat', 'Story con dato de dolor operativo.', 4),
          candidate('n1_l2_story_antes', 'Story de antes y fricción.', 4),
          candidate('reel_geek_matrix', 'Story con caída de símbolos y desorientación.', 1),
        ],
        banner: [
          candidate('n1_l1_banner_linkedin', 'Banner base de dolor / dispersión.', 4),
          candidate('n1_l2_banner_contraste', 'Banner de contraste entre caos y foco.', 4),
          candidate('banner_denso', 'Banner denso con red micelial rota.', 2),
          candidate('banner_geek_glitch', 'Banner glitch para dramatizar el quiebre.', 1),
        ],
      },
      con_ia: {
        publicacion: [
          candidate('hybrid_problema', 'Post AI que dramatiza el problema.', 3),
          candidate('n1_l1_hybrid_caos', 'Post AI sobre caos digital fragmentado.', 4),
          candidate('n1_l2_hybrid_red', 'Post AI sobre red desconectada.', 4),
        ],
        flyer: [
          candidate('hybrid_diferenciador', 'Flyer AI con vías divergentes y claim fuerte.', 3),
          candidate('n1_l1_hybrid_escritorio', 'Flyer AI con escritorio saturado.', 4),
          candidate('n1_l2_hybrid_nodos', 'Flyer AI con nodos sin cohesión.', 4),
        ],
        reel: [candidate('hybrid_reel_manifiesto', 'Reel AI de alto impacto para dolor.', 1)],
        story: [candidate('hybrid_story_teaser', 'Story AI de tensión y teaser.', 1)],
        banner: [
          candidate('hybrid_banner_x', 'Banner AI panorámico con transformación incompleta.', 3),
          candidate('hybrid_banner_yt', 'Banner AI tipo portal / umbral de cambio.', 2),
          candidate('hybrid_banner_linkedin', 'Banner AI editorial para awareness.', 1),
        ],
      },
    },
  },
  {
    folderName: 'campana_1_solucion',
    titulo: 'Campaña 1 — Solución',
    narrativa: 'solucion',
    target: 'Coordinadores de semilleros, centros de escritura y equipos que necesitan flujo + verificación.',
    objetivo: 'Mostrar a Agora como infraestructura útil: editor, lógica formal, verificación y colaboración.',
    pools: {
      sin_ia: {
        publicacion: [
          candidate('n2_l3_post_flujo', 'Post principal sobre flujo unificado.', 4),
          candidate('n2_l4_post_rigor', 'Post principal sobre rigor formal.', 4),
          candidate('post_glass', 'Post glassmorphism sobre un solo flujo.', 2),
          candidate('post_perspectiva', 'Post de perspectiva / proceso en capas.', 2),
          candidate('post_geek_proof', 'Post visual de demostración formal.', 2),
          candidate('post_geek_turing', 'Post técnico sobre computabilidad.', 1),
          candidate('post_geek_dashboard', 'Post tipo dashboard de productividad.', 1),
        ],
        flyer: [
          candidate('n2_l3_post_verificacion', 'Flyer sobre verificación integrada.', 4),
          candidate('n2_l4_post_logica', 'Flyer sobre lógica aplicada.', 4),
          candidate('lote1_flujo', 'Flyer limpio de flujo de trabajo.', 2),
          candidate('post_datos_split', 'Flyer de datos y estructura.', 2),
        ],
        reel: [
          candidate('n2_l3_reel_demo', 'Reel demo del flujo Agora.', 4),
          candidate('n2_l4_reel_rigor', 'Reel sobre rigor, lógica y validación.', 4),
          candidate('reel_simbolo', 'Reel de símbolo / promesa de producto.', 2),
          candidate('reel_geek_proof', 'Reel visual paso a paso de prueba formal.', 1),
        ],
        story: [
          candidate('n2_l3_story_feature', 'Story de feature principal.', 4),
          candidate('n2_l4_story_formal', 'Story de validación formal.', 4),
          candidate('reel_geek_quantum', 'Story experimental sobre observación y decisión.', 1),
        ],
        banner: [
          candidate('n2_l3_banner_solucion', 'Banner de propuesta de valor.', 4),
          candidate('n2_l4_banner_formal', 'Banner sobre formalización rigurosa.', 4),
          candidate('banner_conferencia', 'Banner editorial con credibilidad institucional.', 2),
          candidate('banner_geek_proof', 'Banner de lógica formal aplicada.', 1),
        ],
      },
      con_ia: {
        publicacion: [
          candidate('hybrid_respuesta', 'Post AI de solución / transformación.', 3),
          candidate('n2_l3_hybrid_flujo', 'Post AI de flujo verde integrado.', 4),
          candidate('n2_l4_hybrid_rigor', 'Post AI de formalización y precisión.', 4),
        ],
        flyer: [
          candidate('hybrid_madurez', 'Flyer AI de madurez y evidencia.', 3),
          candidate('n2_l3_hybrid_editor', 'Flyer AI con editor central.', 4),
          candidate('n2_l4_hybrid_pensar', 'Flyer AI sobre pensar con profundidad estructurada.', 4),
        ],
        reel: [candidate('hybrid_reel_manifiesto', 'Reel AI de posicionamiento / demostración.', 1)],
        story: [candidate('hybrid_story_teaser', 'Story AI de activación y prueba.', 1)],
        banner: [
          candidate('hybrid_banner_linkedin', 'Banner AI editorial para propuesta de valor.', 3),
          candidate('hybrid_banner_og', 'Banner AI para sharing institucional.', 2),
          candidate('hybrid_banner_yt', 'Banner AI para demo/portal.', 1),
        ],
      },
    },
  },
  {
    folderName: 'campana_2_ecosistema',
    titulo: 'Campaña 2 — Ecosistema',
    narrativa: 'ecosistema',
    target: 'Directores de semilleros, comunidades académicas y alianzas institucionales.',
    objetivo: 'Presentar a Agora como plataforma cooperativa y ecosistema de investigación a escala.',
    pools: {
      sin_ia: {
        publicacion: [
          candidate('n3_l5_post_semillero', 'Post sobre comunidad de semilleros.', 4),
          candidate('n3_l5_post_futuro', 'Post sobre futuro académico cooperativo.', 4),
          candidate('post_micelio', 'Post orgánico sobre red viva de conocimiento.', 2),
          candidate('post_geek_rizoma', 'Post rizomático sobre conexiones múltiples.', 2),
          candidate('post_geek_logo_hero', 'Post marca / comunidad ampliada.', 1),
        ],
        flyer: [
          candidate('n3_l5_post_cooperar', 'Flyer sobre investigación cooperativa.', 4),
          candidate('post_glass', 'Flyer limpio para ecosistema integrado.', 2),
          candidate('lote1_estandar', 'Flyer editorial sobrio para adopción.', 2),
          candidate('post_geek_fib_nature', 'Flyer orgánico sobre crecimiento gradual.', 1),
        ],
        reel: [
          candidate('n3_l5_reel_vision', 'Reel de visión de ecosistema.', 4),
          candidate('reel_simbolo', 'Reel símbolo / invitación a pertenecer.', 2),
          candidate('reel_geek_quantum', 'Reel de conexión y potencial compartido.', 1),
          candidate('reel_geek_dialectic', 'Reel de síntesis institucional.', 1),
        ],
        story: [
          candidate('n3_l5_story_unete', 'Story de invitación a sumarse.', 4),
          candidate('reel_manifiesto', 'Story manifiesto breve de pertenencia.', 2),
          candidate('reel_geek_matrix', 'Story experimental de red emergente.', 1),
        ],
        banner: [
          candidate('n3_l5_banner_ecosistema', 'Banner sobre red cooperativa.', 4),
          candidate('n3_l5_banner_cta', 'Banner de CTA comunitario.', 4),
          candidate('banner_minimal', 'Banner institucional limpio.', 2),
          candidate('banner_geek_dialectic', 'Banner dialéctico de síntesis académica.', 1),
          candidate('banner_geek_quantum', 'Banner de red viva / partículas conectadas.', 1),
        ],
      },
      con_ia: {
        publicacion: [
          candidate('hybrid_arbol_tesis', 'Post AI de conocimiento conectado.', 3),
          candidate('n3_l5_hybrid_comunidad', 'Post AI de comunidad académica viva.', 4),
          candidate('n3_l5_hybrid_agora', 'Post AI de agora futura.', 4),
        ],
        flyer: [
          candidate('hybrid_respuesta', 'Flyer AI de síntesis y convergencia.', 2),
          candidate('n3_l5_hybrid_red', 'Flyer AI de red cooperativa.', 4),
          candidate('hybrid_diferenciador', 'Flyer AI de múltiples caminos convergentes.', 2),
        ],
        reel: [candidate('hybrid_reel_manifiesto', 'Reel AI para visión narrativa del ecosistema.', 1)],
        story: [candidate('hybrid_story_teaser', 'Story AI de onboarding / invitación.', 1)],
        banner: [
          candidate('hybrid_banner_og', 'Banner AI para sharing y portada.', 3),
          candidate('hybrid_banner_linkedin', 'Banner AI editorial para alianzas.', 2),
          candidate('hybrid_banner_yt', 'Banner AI panorámico de visión.', 1),
        ],
      },
    },
  },
];

const CAMPAIGN_NAMES: Record<string, string> = {
  dolor: 'n1-dolor-caos-digital',
  solucion: 'n2-solucion-flujo-unificado',
  ecosistema: 'n3-ecosistema-comunidad',
};

const LOTE_NAMES: Record<number, string> = {
  1: 'l1-caos-digital',
  2: 'l2-fragmentacion',
  3: 'l3-flujo-unificado',
  4: 'l4-rigor-formal',
  5: 'l5-comunidad',
};

const NEGATIVE_AI_PROMPT = [
  'ugly',
  'blurry',
  'low quality',
  'distorted',
  'deformed',
  'watermark',
  'text artifacts',
  'oversaturated',
  'amateur',
  'poorly rendered',
  'low resolution',
  'jpeg artifacts',
  'duplicate subjects',
  'cropped heads',
  'visible interface chrome',
  'readable letters',
].join(', ');

const BRAND_PROMPT_SIGNATURE = [
  'Agora / Elenxos brand system',
  'Princess Mononoke inspired logical mysticism',
  'deep forest green #0F2519',
  'bioluminescent teal #A3E4D7',
  'iron-grey structures #3A3F41',
  'subtle dark red #8B0000 accents',
  'painterly digital art',
  'cinematic lighting',
  'high detail',
].join(', ');

const CAMERA_VARIATIONS = [
  'cinematic wide shot',
  'editorial poster framing',
  'dramatic low-angle composition',
  'top-down structural composition',
  'center-weighted hero composition',
];

const ATMOSPHERE_VARIATIONS = [
  'volumetric lighting and atmospheric fog',
  'soft bioluminescent haze and floating spores',
  'moody twilight atmosphere with layered depth',
  'high-contrast dusk light with calm shadows',
  'luminous mist with cinematic depth separation',
];

const SLOT_PROMPT_HINTS: Record<DeliverySlot, string[]> = {
  publicacion: [
    'square composition with center-focused subject and generous headline safe area',
    'square editorial composition with a strong focal point and clear text-safe margins',
  ],
  flyer: [
    'square poster composition with bold focal point and strong call-to-action negative space',
    'editorial square flyer composition with layered depth and clean overlay zones',
  ],
  reel: [
    'vertical hero composition with strong iconic centerpiece and top-bottom safe areas',
    'vertical cover composition for reel thumbnail, punchy silhouette, clean title space',
  ],
  story: [
    'immersive vertical composition with a clean central lane for text overlays',
    'vertical narrative teaser with upward motion and safe space for story copy',
  ],
  banner: [
    'ultra-wide panoramic composition with asymmetric negative space for title and logo',
    'panoramic banner layout with long horizon depth and safe left-right branding areas',
  ],
};

const NARRATIVE_PROMPT_KITS: Record<Narrative, {
  scenes: string[];
  structures: string[];
  motion: string[];
  emotions: string[];
}> = {
  dolor: {
    scenes: [
      'fragmented academic workstation swallowed by roots and loose papers',
      'dark archive corridor with disconnected notes floating in the air',
      'foggy research labyrinth with too many windows and broken citations',
      'collapsed bridge between isolated towers of knowledge in an ancient forest',
      'storm of scattered manuscripts around a moss-covered stone desk',
    ],
    structures: [
      'broken logical runes and severed root networks',
      'fractured interface panels embedded in old stone',
      'tangled branches wrapping notebooks, terminals and marginal notes',
      'disconnected luminous nodes that fail to complete the circuit',
    ],
    motion: [
      'friction, interruption and recursive rewriting',
      'loss of continuity and stalled progress',
      'knowledge dispersion across too many tools',
      'a workflow that never fully closes its loop',
    ],
    emotions: [
      'tense and unresolved',
      'claustrophobic but elegant',
      'frustrated yet still intelligent',
      'beautifully broken and high-stakes',
    ],
  },
  solucion: {
    scenes: [
      'luminous editor carved into living wood inside an ancient forest library',
      'four research pathways converging into one radiant tree of knowledge',
      'cooperative desk built from stone and roots with precise floating panels',
      'clear green trail connecting writing, formalization, verification and collaboration',
      'restored archive space where fragmented knowledge now flows in one direction',
    ],
    structures: [
      'formal proof chains glowing in teal light',
      'precise iron-grey geometry integrated with living moss',
      'floating knowledge panels aligned in a coherent sequence',
      'structured mycelium network acting as one single workflow',
    ],
    motion: [
      'clarity, synthesis and verification',
      'collaboration becoming operational',
      'confusion resolving into method',
      'precision emerging from living complexity',
    ],
    emotions: [
      'hopeful and rigorous',
      'calm, trustworthy and luminous',
      'confident without losing warmth',
      'measured, grounded and precise',
    ],
  },
  ecosistema: {
    scenes: [
      'ancient forest agora with a collaborative academic circle',
      'living map of institutions connected by bioluminescent threads',
      'canopy cathedral with scholars, kodamas and shared archives',
      'wide root network joining many houses of knowledge across the valley',
      'community gathering around a luminous central archive under the trees',
    ],
    structures: [
      'distributed nodes and cooperative pathways',
      'ceremonial stone rings connected by shared dashboards of knowledge',
      'constellation-like links between many academic communities',
      'networked roots that turn isolated effort into collective infrastructure',
    ],
    motion: [
      'expansion, invitation and belonging',
      'alignment across many actors',
      'shared growth and community-level adoption',
      'from individual work toward institutional cooperation',
    ],
    emotions: [
      'collective and welcoming',
      'visionary but grounded',
      'expansive and trustworthy',
      'alive, connective and generous',
    ],
  },
};

const TEMPLATE_PROMPT_HINTS: Record<string, string[]> = {
  hybrid_arbol_tesis: [
    'centered ancient tree whose roots form an intricate knowledge network',
    'living thesis tree with luminous roots connecting multiple ideas',
  ],
  hybrid_problema: [
    'chaotic overgrown forest with broken tablets and disconnected research fragments',
    'scattered documents, fractured paths and warning glow around the workspace',
  ],
  hybrid_respuesta: [
    'healed forest scene where separated streams now converge into one living system',
    'restored landscape with luminous pathways stitching previous fragmentation together',
  ],
  hybrid_diferenciador: [
    'four luminous pathways representing writing, formalization, verification and collaboration converging into one tree',
    'multiple research disciplines joining into one structured ecosystem of work',
  ],
  hybrid_madurez: [
    'forest library holding structured knowledge panels and scroll-like proofs',
    'mature archive environment where logic and nature coexist in balance',
  ],
  hybrid_reel_manifiesto: [
    'iconic guardian spirit at the center of a vertical cinematic composition',
    'heroic luminous emblem emerging from the forest with poster-like impact',
  ],
  hybrid_story_teaser: [
    'immersive upward look through the canopy with floating spores and idea-like particles',
    'vertical teaser scene that invites curiosity and continuation',
  ],
  hybrid_banner_linkedin: [
    'panoramic forest canopy with clean brand-safe area and scattered luminous spirits',
    'wide editorial landscape designed for profile/banner context',
  ],
  hybrid_banner_og: [
    'central knowledge tree in a balanced social-share composition',
    'wide social preview landscape with flanking stone structures and clear title space',
  ],
  hybrid_banner_x: [
    'ancient stone tablet transforming from chaos into structured notation',
    'wide transition scene from fragmented matter into coherent symbolic order',
  ],
  hybrid_banner_yt: [
    'dramatic forest gateway opening into a luminous portal',
    'high-contrast panoramic threshold scene with strong teaser energy',
  ],
};

const TEMPLATE_TOKEN_HINTS: Array<{ token: string; hints: string[] }> = [
  { token: 'caos', hints: ['fragmented desk, broken windows and red warning glow', 'storm of research fragments around one impossible task'] },
  { token: 'escritorio', hints: ['overloaded academic desk with notes, tabs and devices layered in tension', 'research workspace collapsing under too many parallel tools'] },
  { token: 'antes', hints: ['split-before-state scene where disorder dominates most of the frame', 'unfinished transition between chaos and a possible path forward'] },
  { token: 'red', hints: ['network of nodes trying to reconnect through fog and roots', 'fragmented graph of knowledge suspended over a dark valley'] },
  { token: 'nodos', hints: ['scattered luminous nodes searching for a stable structure', 'islands of thought that almost connect but still fail'] },
  { token: 'puente', hints: ['bridge of knowledge emerging across a ravine', 'partial connection between isolated communities of work'] },
  { token: 'flujo', hints: ['single luminous path replacing fragmentation', 'clear green channel that unifies the whole research process'] },
  { token: 'editor', hints: ['editor-like panels carved into wood and stone', 'coherent writing interface translated into a mystical forest environment'] },
  { token: 'equipo', hints: ['small collaborative team gathered around one shared luminous surface', 'cooperative researchers aligned around a common workflow'] },
  { token: 'rigor', hints: ['formal runes, measured geometry and proof-like structures', 'ritual precision rendered as luminous logical architecture'] },
  { token: 'pensar', hints: ['meditative scholar atmosphere inside a precise archive landscape', 'slow deliberate thought supported by structure instead of noise'] },
  { token: 'cta', hints: ['inviting path or portal opening toward the viewer', 'clear threshold that signals readiness to join or request a demo'] },
  { token: 'comunidad', hints: ['community circle under ancient trees and living lights', 'shared academic ritual inside a connected forest commons'] },
  { token: 'agora', hints: ['living agora plaza integrated with roots, ruins and knowledge symbols', 'future-facing civic-academic square inside the forest'] },
];

function normalizeSeed(value: number): number {
  const normalized = (Math.floor(value) >>> 0);
  return normalized === 0 ? 1 : normalized;
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRng(seed: number): () => number {
  let value = normalizeSeed(seed);
  return () => {
    value = (value + 0x6D2B79F5) >>> 0;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickFromArray<T>(items: T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

function pickWeightedCandidate(items: CandidateTemplate[], rng: () => number): CandidateTemplate {
  const totalWeight = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let cursor = rng() * totalWeight;

  for (const item of items) {
    cursor -= item.weight ?? 1;
    if (cursor <= 0) return item;
  }

  return items[items.length - 1];
}

function resolveTemplateHints(templateId: string): string[] {
  if (TEMPLATE_PROMPT_HINTS[templateId]) {
    return TEMPLATE_PROMPT_HINTS[templateId];
  }

  for (const entry of TEMPLATE_TOKEN_HINTS) {
    if (templateId.includes(entry.token)) {
      return entry.hints;
    }
  }

  return [
    'mystical research scene with a strong editorial focal point',
    'brand-consistent forest logic composition with clean overlay space',
  ];
}

function buildAIPrompt(campaign: DeliveryCampaign, item: DeliveryItem, seed: number): string {
  const promptRng = createRng(normalizeSeed(seed ^ hashString(`${campaign.folderName}:${item.templateId}:prompt`)));
  const kit = NARRATIVE_PROMPT_KITS[campaign.narrativa];

  return [
    pickFromArray(kit.scenes, promptRng),
    pickFromArray(resolveTemplateHints(item.templateId), promptRng),
    pickFromArray(kit.structures, promptRng),
    `Narrative motion: ${pickFromArray(kit.motion, promptRng)}`,
    `Emotional tone: ${pickFromArray(kit.emotions, promptRng)}`,
    pickFromArray(SLOT_PROMPT_HINTS[item.slot], promptRng),
    pickFromArray(CAMERA_VARIATIONS, promptRng),
    pickFromArray(ATMOSPHERE_VARIATIONS, promptRng),
    BRAND_PROMPT_SIGNATURE,
    'clean negative space for editorial overlay, no readable text inside the environment',
  ].join(', ');
}

function materializeDeliveryCampaign(blueprint: DeliveryCampaignBlueprint, runSeed: number): DeliveryCampaign {
  const rng = createRng(normalizeSeed(runSeed ^ hashString(blueprint.folderName)));
  const usedTemplateIds = new Set<string>();
  const items: DeliveryItem[] = [];

  for (const variant of ['sin_ia', 'con_ia'] as const) {
    for (const slot of SLOT_ORDER) {
      const pool = blueprint.pools[variant][slot];
      const available = pool.filter(candidate => !usedTemplateIds.has(candidate.templateId));

      if (available.length === 0) {
        throw new Error(`Sin candidatos disponibles para ${blueprint.folderName} / ${variant} / ${slot}.`);
      }

      const picked = pickWeightedCandidate(available, rng);
      usedTemplateIds.add(picked.templateId);

      items.push({
        slot,
        kind: SLOT_TO_KIND[slot],
        variant,
        templateId: picked.templateId,
        description: picked.description,
      });
    }
  }

  return {
    folderName: blueprint.folderName,
    titulo: blueprint.titulo,
    narrativa: blueprint.narrativa,
    target: blueprint.target,
    objetivo: blueprint.objetivo,
    items,
  };
}

function buildDeliveryCampaigns(seedBase: number): DeliveryCampaign[] {
  return DELIVERY_BLUEPRINTS.map((blueprint, index) =>
    materializeDeliveryCampaign(blueprint, normalizeSeed(seedBase + (index + 1) * 977)),
  );
}

function buildAIGenerationBundle(campaign: DeliveryCampaign, args: Args, runSeed: number): AIGenerationBundle {
  const seedBase = normalizeSeed(runSeed ^ hashString(`${campaign.folderName}:ai`));

  const items = campaign.items
    .filter(item => item.variant === 'con_ia')
    .map((item, index) => {
      const template = getTemplateById(item.templateId);
      const publicPath = AI_IMAGE_PATHS[item.templateId];

      if (!template) {
        throw new Error(`Template IA no encontrado: ${item.templateId}`);
      }

      if (!publicPath) {
        throw new Error(`No existe publicPath esperado para template IA: ${item.templateId}`);
      }

      const seed = normalizeSeed(seedBase + hashString(`${item.templateId}:${index}`));

      return {
        templateId: item.templateId,
        slot: item.slot,
        kind: item.kind,
        variant: item.variant,
        narrativa: campaign.narrativa,
        description: item.description,
        width: template.width,
        height: template.height,
        seed,
        prompt: buildAIPrompt(campaign, item, seed),
        negativePrompt: NEGATIVE_AI_PROMPT,
        publicPath,
        outputPath: join(ROOT, 'public', publicPath),
      } satisfies AIGenerationItem;
    });

  return {
    campaignFolder: campaign.folderName,
    campaignTitle: campaign.titulo,
    narrativa: campaign.narrativa,
    seedBase,
    steps: args.aiSteps,
    guidance: args.aiGuidance,
    items,
  };
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  let narrativa: string | null = null;
  let lotes: number[] | null = null;
  let tipo: string | null = null;
  let outputBase: string | null = null;
  let skipVideo = false;
  let videoDuration = 8;
  let legacy = false;
  let aiMode: AiMode = 'auto';
  let seed: number | null = null;
  let aiSteps = 50;
  let aiGuidance = 3.0;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--narrativa':
        narrativa = args[++i];
        break;
      case '--lote':
        lotes = args[++i].split(',').map(Number);
        break;
      case '--tipo':
        tipo = args[++i];
        break;
      case '--output':
        outputBase = args[++i];
        break;
      case '--skip-video':
        skipVideo = true;
        break;
      case '--video-duration':
        videoDuration = Number(args[++i]);
        break;
      case '--legacy':
        legacy = true;
        break;
      case '--fresh-ai':
        aiMode = 'fresh';
        break;
      case '--reuse-ai':
      case '--skip-ai-generation':
        aiMode = 'reuse';
        break;
      case '--seed':
        seed = Number(args[++i]);
        break;
      case '--ai-steps':
        aiSteps = Number(args[++i]);
        break;
      case '--ai-guidance':
        aiGuidance = Number(args[++i]);
        break;
    }
  }

  if (!Number.isFinite(videoDuration) || videoDuration <= 0) {
    console.error('❌ --video-duration debe ser un número mayor que 0.');
    process.exit(1);
  }

  if (seed !== null && (!Number.isFinite(seed) || seed < 0)) {
    console.error('❌ --seed debe ser un número mayor o igual a 0.');
    process.exit(1);
  }

  if (!Number.isFinite(aiSteps) || aiSteps <= 0) {
    console.error('❌ --ai-steps debe ser un número mayor que 0.');
    process.exit(1);
  }

  if (!Number.isFinite(aiGuidance) || aiGuidance <= 0) {
    console.error('❌ --ai-guidance debe ser un número mayor que 0.');
    process.exit(1);
  }

  return {
    narrativa,
    lotes,
    tipo,
    outputBase,
    skipVideo,
    videoDuration,
    legacy,
    aiMode,
    seed,
    aiSteps,
    aiGuidance,
  };
}

function isLegacyMode(args: Args): boolean {
  return Boolean(args.legacy || args.narrativa || args.lotes || args.tipo);
}

function ensureDeliveryCampaignShape(campaign: DeliveryCampaign) {
  const total = campaign.items.length;
  const conIA = campaign.items.filter(item => item.variant === 'con_ia').length;
  const sinIA = campaign.items.filter(item => item.variant === 'sin_ia').length;

  if (total !== 10 || conIA !== 5 || sinIA !== 5) {
    throw new Error(
      `${campaign.folderName} está mal configurada: esperaba 10 items (5 con IA / 5 sin IA) y encontré ${total} (${conIA} con IA / ${sinIA} sin IA).`,
    );
  }
}

function copyDirectoryFiles(sourceDir: string, targetDir: string): number {
  if (!existsSync(sourceDir)) return 0;

  mkdirSync(targetDir, { recursive: true });
  let copied = 0;

  for (const entry of readdirSync(sourceDir)) {
    const sourcePath = join(sourceDir, entry);
    if (!statSync(sourcePath).isFile()) continue;

    copyFileSync(sourcePath, join(targetDir, entry));
    copied++;
  }

  return copied;
}

function syncAIAssetLibrary() {
  let copied = 0;
  const maxQualityRoot = join(WORKSPACE_ROOT, 'assets', 'ai-images', 'maxcalidad');
  const sdxlRoot = join(WORKSPACE_ROOT, 'assets', 'ai-images', 'sdxl-backgrounds');

  for (const dir of MAX_QUALITY_SYNC_DIRS) {
    copied += copyDirectoryFiles(join(maxQualityRoot, dir), join(ROOT, 'public', 'ai-images', dir));
  }

  const campaignTargetDir = join(ROOT, 'public', 'ai-images', 'campaign');
  mkdirSync(campaignTargetDir, { recursive: true });

  for (const alias of CAMPAIGN_AI_ALIASES) {
    const sourcePath = join(sdxlRoot, alias.source);
    const targetPath = join(campaignTargetDir, alias.target);

    if (!existsSync(sourcePath)) continue;

    copyFileSync(sourcePath, targetPath);
    copied++;
  }

  console.log(`  🔁 ${copied} assets AI sincronizados hacia public/ai-images/`);
}

function validateAIImagesByTemplateIds(templateIds: string[]): { ok: string[]; missing: string[] } {
  const ok: string[] = [];
  const missing: string[] = [];

  for (const templateId of templateIds) {
    const expectedPath = AI_IMAGE_PATHS[templateId];
    if (!expectedPath) continue;

    const fullPath = join(ROOT, 'public', expectedPath);
    if (existsSync(fullPath)) {
      ok.push(templateId);
    } else {
      missing.push(`${templateId} → public${expectedPath}`);
    }
  }

  return { ok, missing };
}

function validateAIImages(selected: CampaignMeta[]): { ok: string[]; missing: string[] } {
  return validateAIImagesByTemplateIds(selected.filter(t => t.tipo === 'hybrid').map(t => t.id));
}

function getCampaignFolderName(narrativa: string | null, lotes: number[] | null): string {
  const today = new Date().toISOString().slice(0, 10);

  if (narrativa && !lotes) {
    return `${today}_campaign_${CAMPAIGN_NAMES[narrativa] ?? narrativa}`;
  }
  if (lotes && lotes.length === 1) {
    return `${today}_campaign_${LOTE_NAMES[lotes[0]] ?? `lote-${lotes[0]}`}`;
  }
  if (narrativa && lotes) {
    return `${today}_campaign_${CAMPAIGN_NAMES[narrativa]}_lotes-${lotes.join('-')}`;
  }

  return `${today}_campaign_full`;
}

function shouldGenerateFreshAI(args: Args): boolean {
  return args.aiMode === 'fresh' || (args.aiMode === 'auto' && !isLegacyMode(args));
}

function renderFreshAIAssets(bundle: AIGenerationBundle, packDir: string): boolean {
  const stagingDir = join(packDir, '_staging');
  const bundlePath = join(stagingDir, 'ai_bundle.json');
  const scriptPath = join(WORKSPACE_ROOT, 'assets', 'scripts', 'generar_bundle_campana.py');

  mkdirSync(stagingDir, { recursive: true });
  writeFileSync(bundlePath, `${JSON.stringify({
    campaign: bundle.campaignFolder,
    title: bundle.campaignTitle,
    narrativa: bundle.narrativa,
    seedBase: bundle.seedBase,
    items: bundle.items,
  }, null, 2)}\n`);

  try {
    execSync('python3 --version', { stdio: 'ignore' });
  } catch {
    console.error('❌ No se encontró python3 para generar imágenes AI frescas.');
    return false;
  }

  const cmd = `python3 "${scriptPath}" --bundle "${bundlePath}" --steps ${bundle.steps} --guidance ${bundle.guidance}`;
  console.log(`[CMD] ${cmd}\n`);

  try {
    execSync(cmd, { cwd: WORKSPACE_ROOT, stdio: 'inherit' });
    return true;
  } catch {
    console.error('❌ Error generando los fondos AI frescos para la campaña.');
    return false;
  }
}

function writeAIBundleArtifacts(bundle: AIGenerationBundle, packDir: string) {
  const sourcesDir = join(packDir, 'con_ia', 'fuentes_ai');
  mkdirSync(sourcesDir, { recursive: true });

  const items = bundle.items.map((item) => {
    const copiedSource = `con_ia/fuentes_ai/${item.slot}__${item.templateId}.png`;

    if (existsSync(item.outputPath)) {
      copyFileSync(item.outputPath, join(packDir, copiedSource));
    }

    return {
      templateId: item.templateId,
      slot: item.slot,
      kind: item.kind,
      narrative: item.narrativa,
      seed: item.seed,
      prompt: item.prompt,
      negativePrompt: item.negativePrompt,
      publicPath: `public${item.publicPath}`,
      copiedSource,
      width: item.width,
      height: item.height,
      description: item.description,
    };
  });

  writeFileSync(join(packDir, 'prompts_ai.json'), `${JSON.stringify({
    campaign: bundle.campaignFolder,
    title: bundle.campaignTitle,
    narrativa: bundle.narrativa,
    seedBase: bundle.seedBase,
    steps: bundle.steps,
    guidance: bundle.guidance,
    generatedAt: new Date().toISOString(),
    items,
  }, null, 2)}\n`);
}

function renderImages(templateIds: string[], outputDir: string): boolean {
  const ids = templateIds.join(',');
  const cmd = `npx tsx scripts/render-images.ts --template ${ids} --output "${outputDir}"`;
  console.log(`[CMD] ${cmd}\n`);

  try {
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
    return true;
  } catch {
    console.error('❌ Error generando imágenes');
    return false;
  }
}

function renderVideos(templateIds: string[], outputDir: string, duration: number): boolean {
  if (templateIds.length === 0) return true;

  const ids = templateIds.join(',');
  const cmd = `npx tsx scripts/render-video.ts --template ${ids} --output "${outputDir}" --duration ${duration}`;
  console.log(`[CMD] ${cmd}\n`);

  try {
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
    return true;
  } catch {
    console.error('❌ Error generando videos');
    return false;
  }
}

function resetGeneratedPackDir(packDir: string) {
  mkdirSync(packDir, { recursive: true });
  for (const child of ['sin_ia', 'con_ia', 'README.md', 'manifest.json', '_staging']) {
    rmSync(join(packDir, child), { recursive: true, force: true });
  }
}

function copyPackOutputs(
  campaign: DeliveryCampaign,
  packDir: string,
  stagingImageDir: string,
  stagingVideoDir: string,
  skipVideo: boolean,
): boolean {
  let ok = true;

  for (const item of campaign.items) {
    const template = getTemplateById(item.templateId);
    if (!template) {
      console.error(`❌ Template no encontrado en registry: ${item.templateId}`);
      ok = false;
      continue;
    }

    const destDir = join(packDir, item.variant, item.kind);
    mkdirSync(destDir, { recursive: true });

    const pngSource = join(stagingImageDir, template.category, `${item.templateId}.png`);
    const baseName = `${item.slot}__${item.templateId}`;
    const pngTarget = join(destDir, `${baseName}.png`);

    if (!existsSync(pngSource)) {
      console.error(`❌ PNG faltante para ${item.templateId}: ${pngSource}`);
      ok = false;
    } else {
      copyFileSync(pngSource, pngTarget);
    }

    const needsVideo = !skipVideo && (item.kind === 'reels' || item.kind === 'stories');
    if (!needsVideo) continue;

    const mp4Source = join(stagingVideoDir, template.category, `${item.templateId}.mp4`);
    const mp4Target = join(destDir, `${baseName}.mp4`);

    if (!existsSync(mp4Source)) {
      console.error(`❌ MP4 faltante para ${item.templateId}: ${mp4Source}`);
      ok = false;
    } else {
      copyFileSync(mp4Source, mp4Target);
    }
  }

  return ok;
}

function writePackManifest(
  campaign: DeliveryCampaign,
  packDir: string,
  skipVideo: boolean,
  videoDuration: number,
  bundle: AIGenerationBundle | null,
  runSeed: number,
  aiModeLabel: 'fresh' | 'cached',
) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    titulo: campaign.titulo,
    narrativa: campaign.narrativa,
    target: campaign.target,
    objetivo: campaign.objetivo,
    run: {
      seedBase: runSeed,
      aiMode: aiModeLabel,
      aiSteps: bundle?.steps ?? null,
      aiGuidance: bundle?.guidance ?? null,
    },
    totalItems: campaign.items.length,
    counts: {
      con_ia: campaign.items.filter(item => item.variant === 'con_ia').length,
      sin_ia: campaign.items.filter(item => item.variant === 'sin_ia').length,
    },
    ai: bundle
      ? {
          promptFile: 'prompts_ai.json',
          sourcesDir: 'con_ia/fuentes_ai/',
          generatedTemplates: bundle.items.map(item => ({
            templateId: item.templateId,
            slot: item.slot,
            seed: item.seed,
            publicPath: `public${item.publicPath}`,
          })),
        }
      : {
          promptFile: null,
          sourcesDir: null,
          generatedTemplates: [],
        },
    notes: {
      flyer: 'El sistema no tiene layout flyer dedicado; se usa el layout post 1080×1080 como flyer operativo.',
      video: skipVideo
        ? 'No se generaron MP4 porque se usó --skip-video.'
        : `Reels y stories se exportaron también como MP4 de ${videoDuration}s.`,
      ai: bundle
        ? 'Se generaron fondos AI nuevos para esta corrida y se dejaron trazas en prompts_ai.json + con_ia/fuentes_ai/.'
        : 'Se reutilizó la librería AI sincronizada en public/ai-images/.',
    },
    items: campaign.items.map((item) => ({
      slot: item.slot,
      kind: item.kind,
      variant: item.variant,
      templateId: item.templateId,
      description: item.description,
      png: `${item.variant}/${item.kind}/${item.slot}__${item.templateId}.png`,
      mp4: !skipVideo && (item.kind === 'reels' || item.kind === 'stories')
        ? `${item.variant}/${item.kind}/${item.slot}__${item.templateId}.mp4`
        : null,
    })),
  };

  writeFileSync(join(packDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  const tableRows = campaign.items
    .map((item) => `| ${item.variant} | ${item.kind} | \`${item.templateId}\` | ${item.description} |`)
    .join('\n');

  const variationNotes = bundle
    ? '- fondos AI frescos guardados en `con_ia/fuentes_ai/`\n- prompts y seeds de IA guardados en `prompts_ai.json`'
    : '- se reutilizó la librería AI sincronizada en `public/ai-images/`';

  const readme = `# ${campaign.titulo}

## Target

${campaign.target}

## Objetivo

${campaign.objetivo}

## Regla del pack

- 10 piezas totales
- 5 piezas \`sin_ia\`
- 5 piezas \`con_ia\`
- tipos cubiertos: publicaciones, flyers, reels, stories, banners
- nota: \`flyers/\` usa layout cuadrado de post (1080×1080) porque hoy no existe un layout flyer dedicado en el renderer

## Estructura

- \`sin_ia/publicaciones/\`
- \`sin_ia/flyers/\`
- \`sin_ia/reels/\`
- \`sin_ia/stories/\`
- \`sin_ia/banners/\`
- \`con_ia/publicaciones/\`
- \`con_ia/flyers/\`
- \`con_ia/reels/\`
- \`con_ia/stories/\`
- \`con_ia/banners/\`

## Variación de esta corrida

- seed base: \`${runSeed}\`
- modo IA: \`${aiModeLabel}\`
${variationNotes}

## Mapping de templates

| Variante | Tipo | Template | Descripción |
| :--- | :--- | :--- | :--- |
${tableRows}

## Video

${skipVideo ? 'Se omitió la exportación MP4 con `--skip-video`.' : `Reels y stories incluyen PNG preview y MP4 de ${videoDuration}s.`}
`;

  writeFileSync(join(packDir, 'README.md'), `${readme}\n`);
}

function runDeliveryCampaigns(args: Args) {
  const freshAI = shouldGenerateFreshAI(args);
  const aiModeLabel: 'fresh' | 'cached' = freshAI ? 'fresh' : 'cached';
  const runSeed = normalizeSeed(args.seed ?? Date.now());
  const deliveryCampaigns = buildDeliveryCampaigns(runSeed);

  for (const campaign of deliveryCampaigns) {
    ensureDeliveryCampaignShape(campaign);
  }

  const baseOutputDir = resolve(args.outputBase ?? DEFAULT_ASSET_OUTPUT);
  let hadFailure = false;
  const aiHeaderValue = aiModeLabel === 'fresh'
    ? `fresca (${args.aiSteps} steps / g=${args.aiGuidance})`
    : 'librería cacheada';

  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log(`║  AGORA Assets Campaign Pack                             ║`);
  console.log(`╠══════════════════════════════════════════════════════════╣`);
  console.log(`║  Base output: ${baseOutputDir}`.padEnd(57) + `║`);
  console.log(`║  Campañas:   ${String(deliveryCampaigns.length).padEnd(43)}║`);
  console.log(`║  Seed base:  ${String(runSeed).padEnd(43)}║`);
  console.log(`║  IA:         ${aiHeaderValue}`.padEnd(57) + `║`);
  console.log(`║  Regla:      10 items por campaña (5 IA / 5 no IA)`.padEnd(57) + `║`);
  console.log(`╚══════════════════════════════════════════════════════════╝\n`);

  for (const [index, campaign] of deliveryCampaigns.entries()) {
    const packDir = join(baseOutputDir, campaign.folderName);
    const stagingDir = join(packDir, '_staging');
    const stagingImageDir = join(stagingDir, 'images');
    const stagingVideoDir = join(stagingDir, 'video');
    const templateIds = [...new Set(campaign.items.map(item => item.templateId))];
    const videoTemplateIds = [...new Set(
      campaign.items
        .filter(item => item.kind === 'reels' || item.kind === 'stories')
        .map(item => item.templateId),
    )];
    const aiBundle = freshAI
      ? buildAIGenerationBundle(campaign, args, normalizeSeed(runSeed + (index + 1) * 4099))
      : null;

    console.log(`\n── CAMPAÑA ${index}: ${campaign.folderName} ──\n`);
    console.log(`  Target: ${campaign.target}`);
    console.log(`  Objetivo: ${campaign.objetivo}`);
    console.log(`  Output: ${packDir}`);
    console.log(`  Templates elegidos:`);
    for (const item of campaign.items) {
      console.log(`    · [${item.variant}/${item.slot}] ${item.templateId}`);
    }

    resetGeneratedPackDir(packDir);

    if (aiBundle) {
      console.log(`\n  · Generar AI fresca (${aiBundle.items.length} fondos / seed ${aiBundle.seedBase})`);
      if (!renderFreshAIAssets(aiBundle, packDir)) {
        hadFailure = true;
        continue;
      }
    }

    const { ok: aiOk, missing: aiMissing } = validateAIImagesByTemplateIds(
      campaign.items
        .filter(item => item.variant === 'con_ia')
        .map(item => item.templateId),
    );

    console.log(`\n  · Validación AI:`);
    console.log(`    ✓ ${aiOk.length} templates IA con fondo disponible`);
    if (aiMissing.length > 0) {
      hadFailure = true;
      console.log(`    ✗ ${aiMissing.length} templates IA sin fondo disponible:`);
      for (const missing of aiMissing) {
        console.log(`      → ${missing}`);
      }
      continue;
    }

    console.log(`\n  · Render PNG (${templateIds.length} templates)`);
    if (!renderImages(templateIds, stagingImageDir)) {
      hadFailure = true;
      continue;
    }

    if (!args.skipVideo) {
      console.log(`\n  · Render MP4 (${videoTemplateIds.length} templates / ${args.videoDuration}s)`);
      if (!renderVideos(videoTemplateIds, stagingVideoDir, args.videoDuration)) {
        hadFailure = true;
        continue;
      }
    }

    console.log(`\n  · Reorganizar entregables en carpetas semánticas`);
    if (!copyPackOutputs(campaign, packDir, stagingImageDir, stagingVideoDir, args.skipVideo)) {
      hadFailure = true;
      continue;
    }

    if (aiBundle) {
      writeAIBundleArtifacts(aiBundle, packDir);
    }

    writePackManifest(campaign, packDir, args.skipVideo, args.videoDuration, aiBundle, runSeed, aiModeLabel);
    rmSync(stagingDir, { recursive: true, force: true });

    console.log(`  ✓ Campaña lista en ${packDir}`);
  }

  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log(`║  ENTREGABLES EN ASSETS                                  ║`);
  console.log(`╠══════════════════════════════════════════════════════════╣`);
  console.log(`║  📁 ${baseOutputDir}`.padEnd(57) + `║`);
  console.log(`║     campana_0_dolor / campana_1_solucion / campana_2...`.padEnd(57) + `║`);
  console.log(`║     Cada una: con_ia/, sin_ia/, README.md, manifest.json`.padEnd(57) + `║`);
  console.log(`╚══════════════════════════════════════════════════════════╝\n`);

  if (hadFailure) {
    process.exit(1);
  }
}

function runLegacySelection(args: Args) {
  let selected: CampaignMeta[] = [...CAMPAIGN_META];

  if (args.narrativa) {
    selected = selected.filter(t => t.narrativa === args.narrativa);
    if (selected.length === 0) {
      console.error(`❌ Narrativa "${args.narrativa}" no encontrada.`);
      console.error('   Opciones: dolor, solucion, ecosistema');
      process.exit(1);
    }
  }

  if (args.lotes) {
    selected = selected.filter(t => args.lotes!.includes(t.lote));
    if (selected.length === 0) {
      console.error(`❌ Lote(s) ${args.lotes.join(',')} no encontrado(s).`);
      console.error('   Opciones: 1, 2, 3, 4, 5');
      process.exit(1);
    }
  }

  if (args.tipo) {
    selected = selected.filter(t => t.tipo === args.tipo);
    if (selected.length === 0) {
      console.error(`❌ Tipo "${args.tipo}" no encontrado.`);
      console.error('   Opciones: post, reel, story, banner, hybrid');
      process.exit(1);
    }
  }

  const folderName = getCampaignFolderName(args.narrativa, args.lotes);
  const outputBase = resolve(args.outputBase ?? join(DEFAULT_ASSET_OUTPUT, 'selecciones'));
  const outputDir = join(outputBase, folderName);

  const posts = selected.filter(t => t.tipo === 'post').length;
  const reels = selected.filter(t => t.tipo === 'reel').length;
  const stories = selected.filter(t => t.tipo === 'story').length;
  const banners = selected.filter(t => t.tipo === 'banner').length;
  const hybrids = selected.filter(t => t.tipo === 'hybrid').length;
  const videoTemplates = selected.filter(t => t.tipo === 'reel' || t.tipo === 'story');

  let hadFailure = false;

  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log(`║  AGORA Campaign Production Pipeline                     ║`);
  console.log(`╠══════════════════════════════════════════════════════════╣`);
  if (args.narrativa) console.log(`║  Narrativa: ${args.narrativa.padEnd(43)}║`);
  if (args.lotes) console.log(`║  Lote(s):   ${args.lotes.join(', ').padEnd(43)}║`);
  if (args.tipo) console.log(`║  Tipo:      ${args.tipo.padEnd(43)}║`);
  console.log(`║  Templates: ${String(selected.length).padEnd(43)}║`);
  console.log(`║  → ${posts} posts, ${reels} reels, ${stories} stories, ${banners} banners, ${hybrids} hybrids`.padEnd(57) + `║`);
  console.log('║                                                         ║');
  console.log('║  Pipeline:                                              ║');
  console.log('║    1. Validar AI images para hybrids                    ║');
  console.log(`║    2. Generar imágenes PNG  → ${folderName}/images/`.padEnd(57) + `║`);
  if (!args.skipVideo && videoTemplates.length > 0) {
    console.log(`║    3. Generar videos MP4   → ${folderName}/video/`.padEnd(57) + `║`);
  }
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  console.log('\n── PASO 1: Validar imágenes AI para hybrids ──\n');
  const { ok: aiOk, missing: aiMissing } = validateAIImages(selected);

  if (aiOk.length > 0) {
    console.log(`  ✅ ${aiOk.length} imágenes AI encontradas`);
  }
  if (aiMissing.length > 0) {
    console.log(`  ⚠️  ${aiMissing.length} imágenes AI FALTAN:`);
    for (const missing of aiMissing) {
      console.log(`     → ${missing}`);
    }
    console.log('\n  Los hybrids sin imagen AI se renderizarán con fondo vacío.');
  }
  if (hybrids === 0) {
    console.log('  (sin templates híbridos en esta selección)');
  }

  console.log('\n── PASO 2: Generar imágenes PNG ──\n');
  const allIds = selected.map(t => t.id);
  const imageDir = join(outputDir, 'images');
  if (!renderImages(allIds, imageDir)) {
    hadFailure = true;
  }

  if (!args.skipVideo && videoTemplates.length > 0) {
    console.log(`\n── PASO 3: Generar videos MP4 (${args.videoDuration}s cada uno) ──\n`);
    const videoIds = videoTemplates.map(t => t.id);
    const videoDir = join(outputDir, 'video');
    if (!renderVideos(videoIds, videoDir, args.videoDuration)) {
      hadFailure = true;
    }
  }

  console.log(`\n╔══════════════════════════════════════════════════════════╗`);
  console.log('║  PRODUCCIÓN COMPLETA                                    ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  📁 ${outputDir}`.padEnd(57) + `║`);
  console.log(`║     images/   → PNGs y previews de todos los templates`.padEnd(57) + `║`);
  if (!args.skipVideo && videoTemplates.length > 0) {
    console.log(`║     video/    → MP4s (reels, stories animados)`.padEnd(57) + `║`);
  }
  console.log(`║  Base default: assets/entregables/campanas/selecciones`.padEnd(57) + `║`);
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (hadFailure) {
    process.exit(1);
  }
}

function main() {
  const args = parseArgs();
  syncAIAssetLibrary();

  if (isLegacyMode(args)) {
    if (args.aiMode === 'fresh') {
      console.log('ℹ️  --fresh-ai hoy aplica al modo oficial de 3 campañas. En modo legacy se usará la librería AI sincronizada.');
    }
    runLegacySelection(args);
    return;
  }

  runDeliveryCampaigns(args);
}

main();
