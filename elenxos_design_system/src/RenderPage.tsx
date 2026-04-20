/**
 * RenderPage — Renderiza templates a resolución completa (scale=1)
 * para que Playwright los capture como PNG pixel-perfect.
 *
 * URL params:
 *   ?template=V1_Micelio
 *   ?template=all        (todos en secuencia)
 */
import React, { useEffect, useState } from 'react';
import { ScaleOverrideProvider } from './components/SocialCanvas/SocialCanvas';

// Templates
import { SocialBannerExample } from './templates/SocialBannerExample';
import { SocialPostExample } from './templates/SocialPostExample';
import { SocialReelExample } from './templates/SocialReelExample';
import {
  V1_Micelio, V2_CitaRoja, V3_Perspectiva, V4_Glass,
  V5_Simbolo, V6_DatosSplit, V7_Pregunta, V8_Proximamente,
} from './templates/PostVariations';
import {
  B1_Minimal, B2_Denso, B3_Conferencia,
  R1_Manifiesto, R2_Simbolo,
} from './templates/MoreVariations';
import { Lote1_Estandar, Lote1_Flujo } from './templates/Lote1Variations';
import {
  H1_ArbolTesis, H2_Problema, H3_Respuesta, H4_Diferenciador, H5_Madurez,
  H6_ReelManifiesto, H7_StoryTeaser,
  H8_BannerLinkedin, H9_BannerOG, H10_BannerX, H11_BannerYT,
} from './templates/HybridVariations';

// Campaign templates — narrativas completas
import {
  // Narrativa 1 Lote 1: Caos digital
  N1_L1_Post_Caos, N1_L1_Post_Archivos, N1_L1_Post_Pregunta,
  N1_L1_Reel_Dolor, N1_L1_Story_Stat,
  N1_L1_Banner_Linkedin, N1_L1_Banner_X,
  N1_L1_Hybrid_Caos, N1_L1_Hybrid_Escritorio, N1_L1_Hybrid_Antes,
  // Narrativa 1 Lote 2: Fragmentación
  N1_L2_Post_Fragmentos, N1_L2_Post_Ciclo, N1_L2_Post_Dato,
  N1_L2_Reel_Flujo, N1_L2_Story_Antes,
  N1_L2_Banner_Contraste, N1_L2_Banner_Pregunta,
  N1_L2_Hybrid_Red, N1_L2_Hybrid_Nodos, N1_L2_Hybrid_Puente,
  // Narrativa 2 Lote 3: Flujo unificado
  N2_L3_Post_Flujo, N2_L3_Post_Markdown, N2_L3_Post_Verificacion,
  N2_L3_Reel_Demo, N2_L3_Story_Feature,
  N2_L3_Banner_Solucion, N2_L3_Banner_CTA,
  N2_L3_Hybrid_Flujo, N2_L3_Hybrid_Editor, N2_L3_Hybrid_Equipo,
  // Narrativa 2 Lote 4: Rigor formal
  N2_L4_Post_Rigor, N2_L4_Post_Logica, N2_L4_Post_Motor,
  N2_L4_Reel_Rigor, N2_L4_Story_Formal,
  N2_L4_Banner_Formal, N2_L4_Banner_Motor,
  N2_L4_Hybrid_Rigor, N2_L4_Hybrid_Pensar, N2_L4_Hybrid_CTA,
  // Narrativa 3 Lote 5: Comunidad
  N3_L5_Post_Semillero, N3_L5_Post_Cooperar, N3_L5_Post_Futuro,
  N3_L5_Reel_Vision, N3_L5_Story_Unete,
  N3_L5_Banner_Ecosistema, N3_L5_Banner_CTA,
  N3_L5_Hybrid_Comunidad, N3_L5_Hybrid_Red, N3_L5_Hybrid_Agora,
} from './templates/CampaignTemplates';

// ── Registry ─────────────────────────────────────────────────
export interface TemplateEntry {
  id: string;
  component: React.FC;
  format: 'post' | 'reel' | 'banner';
  width: number;
  height: number;
  category: string;
}

export const TEMPLATE_REGISTRY: TemplateEntry[] = [
  // Posts 1080×1080
  { id: 'post_tesis',         component: SocialPostExample, format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_micelio',      component: V1_Micelio,        format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_cita_roja',    component: V2_CitaRoja,       format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_perspectiva',  component: V3_Perspectiva,    format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_glass',        component: V4_Glass,          format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_simbolo',      component: V5_Simbolo,        format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_datos_split',  component: V6_DatosSplit,     format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_pregunta',     component: V7_Pregunta,       format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_proximamente', component: V8_Proximamente,   format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'lote1_estandar',    component: Lote1_Estandar,    format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'lote1_flujo',       component: Lote1_Flujo,       format: 'post',   width: 1080, height: 1080, category: 'instagram' },

  // Banners 1500×500
  { id: 'banner_original',   component: SocialBannerExample, format: 'banner', width: 1500, height: 500, category: 'linkedin' },
  { id: 'banner_minimal',    component: B1_Minimal,          format: 'banner', width: 1500, height: 500, category: 'linkedin' },
  { id: 'banner_denso',      component: B2_Denso,            format: 'banner', width: 1500, height: 500, category: 'linkedin' },
  { id: 'banner_conferencia',component: B3_Conferencia,      format: 'banner', width: 1500, height: 500, category: 'linkedin' },

  // Reels 1080×1920
  { id: 'reel_original',     component: SocialReelExample, format: 'reel',   width: 1080, height: 1920, category: 'instagram' },
  { id: 'reel_manifiesto',   component: R1_Manifiesto,     format: 'reel',   width: 1080, height: 1920, category: 'instagram' },
  { id: 'reel_simbolo',      component: R2_Simbolo,        format: 'reel',   width: 1080, height: 1920, category: 'instagram' },

  // ── Hybrid: AI image + React components ────────────────────
  // Posts 1080×1080
  { id: 'hybrid_arbol_tesis',    component: H1_ArbolTesis,     format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_problema',       component: H2_Problema,       format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_respuesta',      component: H3_Respuesta,      format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_diferenciador',  component: H4_Diferenciador,  format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_madurez',        component: H5_Madurez,        format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  // Reels 1080×1920
  { id: 'hybrid_reel_manifiesto', component: H6_ReelManifiesto, format: 'reel',  width: 1080, height: 1920, category: 'hybrid' },
  { id: 'hybrid_story_teaser',    component: H7_StoryTeaser,    format: 'reel',  width: 1080, height: 1920, category: 'hybrid' },
  // Banners 1500×500
  { id: 'hybrid_banner_linkedin', component: H8_BannerLinkedin, format: 'banner', width: 1500, height: 500, category: 'hybrid' },
  { id: 'hybrid_banner_og',       component: H9_BannerOG,       format: 'banner', width: 1500, height: 500, category: 'hybrid' },
  { id: 'hybrid_banner_x',        component: H10_BannerX,       format: 'banner', width: 1500, height: 500, category: 'hybrid' },
  { id: 'hybrid_banner_yt',       component: H11_BannerYT,      format: 'banner', width: 1500, height: 500, category: 'hybrid' },

  // ══════════════════════════════════════════════════════════════
  //  CAMPAIGN TEMPLATES — Narrativa 1: Dolor (Lote 1 + Lote 2)
  // ══════════════════════════════════════════════════════════════
  // L1: Caos digital — MatrixRain + GlitchText
  { id: 'n1_l1_post_caos',          component: N1_L1_Post_Caos,         format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_post_archivos',      component: N1_L1_Post_Archivos,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_post_pregunta',      component: N1_L1_Post_Pregunta,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_reel_dolor',         component: N1_L1_Reel_Dolor,        format: 'reel',   width: 1080, height: 1920, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_story_stat',         component: N1_L1_Story_Stat,        format: 'reel',   width: 1080, height: 1920, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_banner_linkedin',    component: N1_L1_Banner_Linkedin,   format: 'banner', width: 1500, height: 500,  category: 'campaign/n1_dolor' },
  { id: 'n1_l1_banner_x',           component: N1_L1_Banner_X,          format: 'banner', width: 1500, height: 500,  category: 'campaign/n1_dolor' },
  { id: 'n1_l1_hybrid_caos',        component: N1_L1_Hybrid_Caos,       format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_hybrid_escritorio',  component: N1_L1_Hybrid_Escritorio, format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l1_hybrid_antes',       component: N1_L1_Hybrid_Antes,      format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  // L2: Fragmentación — HexGrid + ProofChain
  { id: 'n1_l2_post_fragmentos',    component: N1_L2_Post_Fragmentos,   format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_post_ciclo',         component: N1_L2_Post_Ciclo,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_post_dato',          component: N1_L2_Post_Dato,         format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_reel_flujo',         component: N1_L2_Reel_Flujo,        format: 'reel',   width: 1080, height: 1920, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_story_antes',        component: N1_L2_Story_Antes,       format: 'reel',   width: 1080, height: 1920, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_banner_contraste',   component: N1_L2_Banner_Contraste,  format: 'banner', width: 1500, height: 500,  category: 'campaign/n1_dolor' },
  { id: 'n1_l2_banner_pregunta',    component: N1_L2_Banner_Pregunta,   format: 'banner', width: 1500, height: 500,  category: 'campaign/n1_dolor' },
  { id: 'n1_l2_hybrid_red',         component: N1_L2_Hybrid_Red,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_hybrid_nodos',       component: N1_L2_Hybrid_Nodos,      format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },
  { id: 'n1_l2_hybrid_puente',      component: N1_L2_Hybrid_Puente,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n1_dolor' },

  // ══════════════════════════════════════════════════════════════
  //  CAMPAIGN TEMPLATES — Narrativa 2: Solución (Lote 3 + Lote 4)
  // ══════════════════════════════════════════════════════════════
  // L3: Flujo unificado — LogicMesh + KodamaParticles
  { id: 'n2_l3_post_flujo',         component: N2_L3_Post_Flujo,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_post_markdown',      component: N2_L3_Post_Markdown,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_post_verificacion',  component: N2_L3_Post_Verificacion, format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_reel_demo',          component: N2_L3_Reel_Demo,         format: 'reel',   width: 1080, height: 1920, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_story_feature',      component: N2_L3_Story_Feature,     format: 'reel',   width: 1080, height: 1920, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_banner_solucion',    component: N2_L3_Banner_Solucion,   format: 'banner', width: 1500, height: 500,  category: 'campaign/n2_solucion' },
  { id: 'n2_l3_banner_cta',         component: N2_L3_Banner_CTA,        format: 'banner', width: 1500, height: 500,  category: 'campaign/n2_solucion' },
  { id: 'n2_l3_hybrid_flujo',       component: N2_L3_Hybrid_Flujo,      format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_hybrid_editor',      component: N2_L3_Hybrid_Editor,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l3_hybrid_equipo',      component: N2_L3_Hybrid_Equipo,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  // L4: Rigor formal — Penrose + Fibonacci
  { id: 'n2_l4_post_rigor',         component: N2_L4_Post_Rigor,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_post_logica',        component: N2_L4_Post_Logica,       format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_post_motor',         component: N2_L4_Post_Motor,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_reel_rigor',         component: N2_L4_Reel_Rigor,        format: 'reel',   width: 1080, height: 1920, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_story_formal',       component: N2_L4_Story_Formal,      format: 'reel',   width: 1080, height: 1920, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_banner_formal',      component: N2_L4_Banner_Formal,     format: 'banner', width: 1500, height: 500,  category: 'campaign/n2_solucion' },
  { id: 'n2_l4_banner_motor',       component: N2_L4_Banner_Motor,      format: 'banner', width: 1500, height: 500,  category: 'campaign/n2_solucion' },
  { id: 'n2_l4_hybrid_rigor',       component: N2_L4_Hybrid_Rigor,      format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_hybrid_pensar',      component: N2_L4_Hybrid_Pensar,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },
  { id: 'n2_l4_hybrid_cta',         component: N2_L4_Hybrid_CTA,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n2_solucion' },

  // ══════════════════════════════════════════════════════════════
  //  CAMPAIGN TEMPLATES — Narrativa 3: Ecosistema (Lote 5)
  // ══════════════════════════════════════════════════════════════
  { id: 'n3_l5_post_semillero',     component: N3_L5_Post_Semillero,    format: 'post',   width: 1080, height: 1080, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_post_cooperar',      component: N3_L5_Post_Cooperar,     format: 'post',   width: 1080, height: 1080, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_post_futuro',        component: N3_L5_Post_Futuro,       format: 'post',   width: 1080, height: 1080, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_reel_vision',        component: N3_L5_Reel_Vision,       format: 'reel',   width: 1080, height: 1920, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_story_unete',        component: N3_L5_Story_Unete,       format: 'reel',   width: 1080, height: 1920, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_banner_ecosistema',  component: N3_L5_Banner_Ecosistema, format: 'banner', width: 1500, height: 500,  category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_banner_cta',         component: N3_L5_Banner_CTA,        format: 'banner', width: 1500, height: 500,  category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_hybrid_comunidad',   component: N3_L5_Hybrid_Comunidad,  format: 'post',   width: 1080, height: 1080, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_hybrid_red',         component: N3_L5_Hybrid_Red,        format: 'post',   width: 1080, height: 1080, category: 'campaign/n3_ecosistema' },
  { id: 'n3_l5_hybrid_agora',       component: N3_L5_Hybrid_Agora,      format: 'post',   width: 1080, height: 1080, category: 'campaign/n3_ecosistema' },
];

// ── Render wrapper: scale=1, exact pixel size ────────────────
const FullSizeTemplate: React.FC<{ entry: TemplateEntry }> = ({ entry }) => {
  const Comp = entry.component;

  return (
    <div
      data-template-id={entry.id}
      data-width={entry.width}
      data-height={entry.height}
      style={{
        width: entry.width,
        height: entry.height,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/*
        Override SocialCanvas scale: render children inside a container
        that matches the exact native size. We clone the component and
        the SocialCanvas inside will be at its native dimensions.
      */}
      <div style={{ 
        transform: 'none',
        width: entry.width,
        height: entry.height,
        overflow: 'hidden',
      }}>
        <Comp />
      </div>
    </div>
  );
};

// ── Main render page ─────────────────────────────────────────
const RenderPage: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateEntry[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get('template') || 'all';

    if (templateId === 'all') {
      setTemplates(TEMPLATE_REGISTRY);
    } else {
      const found = TEMPLATE_REGISTRY.filter(t => t.id === templateId);
      setTemplates(found.length ? found : TEMPLATE_REGISTRY);
    }
  }, []);

  return (
    <ScaleOverrideProvider scale={1}>
      <div
        id="render-root"
        style={{
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0,
          padding: 0,
          margin: 0,
        }}
      >
        {templates.map((entry) => (
          <FullSizeTemplate key={entry.id} entry={entry} />
        ))}
      </div>
    </ScaleOverrideProvider>
  );
};

export default RenderPage;
