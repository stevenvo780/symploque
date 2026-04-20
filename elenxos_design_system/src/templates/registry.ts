/**
 * registry.ts — Fuente única de verdad para TODOS los templates del design system.
 *
 * Tanto RenderPage.tsx (browser) como render-images.ts (Node/Playwright)
 * importan de aquí. Agregar un template = una sola línea.
 *
 * Convenciones de IDs:
 *   - Standalone:  {formato}_{nombre}          → post_tesis, banner_minimal
 *   - Hybrid:      hybrid_{nombre}             → hybrid_arbol_tesis
 *   - Campaña:     n{N}_l{L}_{tipo}_{nombre}   → n1_l1_post_caos
 */

// ── Tipos ────────────────────────────────────────────────────

export type Format = 'post' | 'reel' | 'banner';

export interface TemplateInfo {
  id: string;
  format: Format;
  width: number;
  height: number;
  category: string;
}

/** Metadatos extra solo para templates de campaña */
export interface CampaignMeta {
  id: string;
  narrativa: 'dolor' | 'solucion' | 'ecosistema';
  lote: number;
  /** Tipo semántico (story tiene format 'reel' a nivel render) */
  tipo: 'post' | 'reel' | 'story' | 'banner' | 'hybrid';
}

// ── Dimensiones por formato ──────────────────────────────────

export const FORMAT_SIZES: Record<Format, { width: number; height: number }> = {
  post:   { width: 1080, height: 1080 },
  reel:   { width: 1080, height: 1920 },
  banner: { width: 1500, height: 500  },
};

// ── Helper para reducir verbosidad ───────────────────────────

function post(id: string, category: string): TemplateInfo {
  return { id, format: 'post', ...FORMAT_SIZES.post, category };
}
function reel(id: string, category: string): TemplateInfo {
  return { id, format: 'reel', ...FORMAT_SIZES.reel, category };
}
function banner(id: string, category: string): TemplateInfo {
  return { id, format: 'banner', ...FORMAT_SIZES.banner, category };
}

// ══════════════════════════════════════════════════════════════
//  STANDALONE TEMPLATES
// ══════════════════════════════════════════════════════════════

const STANDALONE: TemplateInfo[] = [
  // Posts
  post('post_tesis',         'instagram'),
  post('post_micelio',       'instagram'),
  post('post_cita_roja',     'instagram'),
  post('post_perspectiva',   'instagram'),
  post('post_glass',         'instagram'),
  post('post_simbolo',       'instagram'),
  post('post_datos_split',   'instagram'),
  post('post_pregunta',      'instagram'),
  post('post_proximamente',  'instagram'),
  post('lote1_estandar',     'instagram'),
  post('lote1_flujo',        'instagram'),
  post('post_geek_wittgenstein', 'instagram'),
  post('post_geek_nietzsche',    'instagram'),
  post('post_geek_proof',        'instagram'),
  post('post_geek_caos',         'instagram'),
  post('post_geek_dashboard',    'instagram'),
  post('post_geek_rizoma',       'instagram'),
  post('post_geek_fib_nature',   'instagram'),
  post('post_geek_logo_hero',    'instagram'),
  post('post_geek_turing',       'instagram'),

  // Banners
  banner('banner_original',    'linkedin'),
  banner('banner_minimal',     'linkedin'),
  banner('banner_denso',       'linkedin'),
  banner('banner_conferencia', 'linkedin'),
  banner('banner_geek_glitch',    'linkedin'),
  banner('banner_geek_dialectic', 'linkedin'),
  banner('banner_geek_proof',     'linkedin'),
  banner('banner_geek_quantum',   'linkedin'),

  // Reels
  reel('reel_original',    'instagram'),
  reel('reel_manifiesto',  'instagram'),
  reel('reel_simbolo',     'instagram'),
  reel('reel_geek_matrix',     'instagram'),
  reel('reel_geek_proof',      'instagram'),
  reel('reel_geek_dialectic',  'instagram'),
  reel('reel_geek_quantum',    'instagram'),
  reel('reel_geek_chaos',      'instagram'),
];

// ══════════════════════════════════════════════════════════════
//  HYBRID TEMPLATES (AI image + React components)
// ══════════════════════════════════════════════════════════════

const HYBRID: TemplateInfo[] = [
  post('hybrid_arbol_tesis',      'hybrid'),
  post('hybrid_problema',         'hybrid'),
  post('hybrid_respuesta',        'hybrid'),
  post('hybrid_diferenciador',    'hybrid'),
  post('hybrid_madurez',          'hybrid'),
  reel('hybrid_reel_manifiesto',  'hybrid'),
  reel('hybrid_story_teaser',     'hybrid'),
  banner('hybrid_banner_linkedin','hybrid'),
  banner('hybrid_banner_og',      'hybrid'),
  banner('hybrid_banner_x',       'hybrid'),
  banner('hybrid_banner_yt',      'hybrid'),
];

// ══════════════════════════════════════════════════════════════
//  CAMPAIGN TEMPLATES — Por narrativa y lote
// ══════════════════════════════════════════════════════════════

/** Narrativa 1: Dolor — Lote 1: Caos digital (MatrixRain + GlitchText) */
const N1_L1: TemplateInfo[] = [
  post('n1_l1_post_caos',          'campaign/n1_dolor'),
  post('n1_l1_post_archivos',      'campaign/n1_dolor'),
  post('n1_l1_post_pregunta',      'campaign/n1_dolor'),
  reel('n1_l1_reel_dolor',         'campaign/n1_dolor'),
  reel('n1_l1_story_stat',         'campaign/n1_dolor'),
  banner('n1_l1_banner_linkedin',  'campaign/n1_dolor'),
  banner('n1_l1_banner_x',         'campaign/n1_dolor'),
  post('n1_l1_hybrid_caos',        'campaign/n1_dolor'),
  post('n1_l1_hybrid_escritorio',  'campaign/n1_dolor'),
  post('n1_l1_hybrid_antes',       'campaign/n1_dolor'),
];

/** Narrativa 1: Dolor — Lote 2: Fragmentación (HexGrid + ProofChain) */
const N1_L2: TemplateInfo[] = [
  post('n1_l2_post_fragmentos',    'campaign/n1_dolor'),
  post('n1_l2_post_ciclo',         'campaign/n1_dolor'),
  post('n1_l2_post_dato',          'campaign/n1_dolor'),
  reel('n1_l2_reel_flujo',         'campaign/n1_dolor'),
  reel('n1_l2_story_antes',        'campaign/n1_dolor'),
  banner('n1_l2_banner_contraste', 'campaign/n1_dolor'),
  banner('n1_l2_banner_pregunta',  'campaign/n1_dolor'),
  post('n1_l2_hybrid_red',         'campaign/n1_dolor'),
  post('n1_l2_hybrid_nodos',       'campaign/n1_dolor'),
  post('n1_l2_hybrid_puente',      'campaign/n1_dolor'),
];

/** Narrativa 2: Solución — Lote 3: Flujo unificado (LogicMesh + KodamaParticles) */
const N2_L3: TemplateInfo[] = [
  post('n2_l3_post_flujo',         'campaign/n2_solucion'),
  post('n2_l3_post_markdown',      'campaign/n2_solucion'),
  post('n2_l3_post_verificacion',  'campaign/n2_solucion'),
  reel('n2_l3_reel_demo',          'campaign/n2_solucion'),
  reel('n2_l3_story_feature',      'campaign/n2_solucion'),
  banner('n2_l3_banner_solucion',  'campaign/n2_solucion'),
  banner('n2_l3_banner_cta',       'campaign/n2_solucion'),
  post('n2_l3_hybrid_flujo',       'campaign/n2_solucion'),
  post('n2_l3_hybrid_editor',      'campaign/n2_solucion'),
  post('n2_l3_hybrid_equipo',      'campaign/n2_solucion'),
];

/** Narrativa 2: Solución — Lote 4: Rigor formal (Penrose + Fibonacci) */
const N2_L4: TemplateInfo[] = [
  post('n2_l4_post_rigor',         'campaign/n2_solucion'),
  post('n2_l4_post_logica',        'campaign/n2_solucion'),
  post('n2_l4_post_motor',         'campaign/n2_solucion'),
  reel('n2_l4_reel_rigor',         'campaign/n2_solucion'),
  reel('n2_l4_story_formal',       'campaign/n2_solucion'),
  banner('n2_l4_banner_formal',    'campaign/n2_solucion'),
  banner('n2_l4_banner_motor',     'campaign/n2_solucion'),
  post('n2_l4_hybrid_rigor',       'campaign/n2_solucion'),
  post('n2_l4_hybrid_pensar',      'campaign/n2_solucion'),
  post('n2_l4_hybrid_cta',         'campaign/n2_solucion'),
];

/** Narrativa 3: Ecosistema — Lote 5: Comunidad (Dialéctica + Red) */
const N3_L5: TemplateInfo[] = [
  post('n3_l5_post_semillero',     'campaign/n3_ecosistema'),
  post('n3_l5_post_cooperar',      'campaign/n3_ecosistema'),
  post('n3_l5_post_futuro',        'campaign/n3_ecosistema'),
  reel('n3_l5_reel_vision',        'campaign/n3_ecosistema'),
  reel('n3_l5_story_unete',        'campaign/n3_ecosistema'),
  banner('n3_l5_banner_ecosistema','campaign/n3_ecosistema'),
  banner('n3_l5_banner_cta',       'campaign/n3_ecosistema'),
  post('n3_l5_hybrid_comunidad',   'campaign/n3_ecosistema'),
  post('n3_l5_hybrid_red',         'campaign/n3_ecosistema'),
  post('n3_l5_hybrid_agora',       'campaign/n3_ecosistema'),
];

// ── Agrupaciones exportadas ──────────────────────────────────

export const CAMPAIGN_LOTES = { N1_L1, N1_L2, N2_L3, N2_L4, N3_L5 };

export const ALL_CAMPAIGN: TemplateInfo[] = [
  ...N1_L1, ...N1_L2, ...N2_L3, ...N2_L4, ...N3_L5,
];

/** Todos los templates del design system (90+) */
export const TEMPLATE_DATA: TemplateInfo[] = [
  ...STANDALONE,
  ...HYBRID,
  ...ALL_CAMPAIGN,
];

// ── Metadatos de campaña (para filtrar por narrativa/lote/tipo) ──

function inferCampaignMeta(t: TemplateInfo): CampaignMeta {
  // Extraer narrativa del category: 'campaign/n1_dolor' → 'dolor'
  const narrativaMap: Record<string, CampaignMeta['narrativa']> = {
    'campaign/n1_dolor': 'dolor',
    'campaign/n2_solucion': 'solucion',
    'campaign/n3_ecosistema': 'ecosistema',
  };

  // Extraer lote del id: 'n1_l1_post_caos' → 1
  const loteMatch = t.id.match(/^n\d+_l(\d+)_/);
  const lote = loteMatch ? Number(loteMatch[1]) : 0;

  // Inferir tipo semántico del id
  let tipo: CampaignMeta['tipo'] = 'post';
  if (t.id.includes('_hybrid_'))      tipo = 'hybrid';
  else if (t.id.includes('_story_'))  tipo = 'story';
  else if (t.id.includes('_reel_'))   tipo = 'reel';
  else if (t.id.includes('_banner_')) tipo = 'banner';

  return {
    id: t.id,
    narrativa: narrativaMap[t.category] ?? 'dolor',
    lote,
    tipo,
  };
}

export const CAMPAIGN_META: CampaignMeta[] = ALL_CAMPAIGN.map(inferCampaignMeta);

// ── Helpers ──────────────────────────────────────────────────

export function getTemplateById(id: string): TemplateInfo | undefined {
  return TEMPLATE_DATA.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): TemplateInfo[] {
  return TEMPLATE_DATA.filter(t => t.category === category);
}

export function getCampaignByNarrativa(narrativa: string): CampaignMeta[] {
  return CAMPAIGN_META.filter(t => t.narrativa === narrativa);
}

export function getCampaignByLote(lote: number): CampaignMeta[] {
  return CAMPAIGN_META.filter(t => t.lote === lote);
}
