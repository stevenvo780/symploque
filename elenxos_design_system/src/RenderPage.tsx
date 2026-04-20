/**
 * RenderPage — Renderiza templates a resolución completa (scale=1)
 * para que Playwright los capture como PNG pixel-perfect.
 *
 * URL params:
 *   ?template=post_tesis
 *   ?template=all        (todos en secuencia)
 *
 * Los metadatos (id, format, width, height, category) vienen
 * de src/templates/registry.ts — fuente única de verdad.
 * Aquí solo se mapea id → componente React.
 */
import React, { useEffect, useState } from 'react';
import { ScaleOverrideProvider } from './components/SocialCanvas/SocialCanvas';
import { TEMPLATE_DATA, type TemplateInfo } from './templates/registry';

// ── Imports de componentes ───────────────────────────────────
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
import {
  N1_L1_Post_Caos, N1_L1_Post_Archivos, N1_L1_Post_Pregunta,
  N1_L1_Reel_Dolor, N1_L1_Story_Stat,
  N1_L1_Banner_Linkedin, N1_L1_Banner_X,
  N1_L1_Hybrid_Caos, N1_L1_Hybrid_Escritorio, N1_L1_Hybrid_Antes,
  N1_L2_Post_Fragmentos, N1_L2_Post_Ciclo, N1_L2_Post_Dato,
  N1_L2_Reel_Flujo, N1_L2_Story_Antes,
  N1_L2_Banner_Contraste, N1_L2_Banner_Pregunta,
  N1_L2_Hybrid_Red, N1_L2_Hybrid_Nodos, N1_L2_Hybrid_Puente,
  N2_L3_Post_Flujo, N2_L3_Post_Markdown, N2_L3_Post_Verificacion,
  N2_L3_Reel_Demo, N2_L3_Story_Feature,
  N2_L3_Banner_Solucion, N2_L3_Banner_CTA,
  N2_L3_Hybrid_Flujo, N2_L3_Hybrid_Editor, N2_L3_Hybrid_Equipo,
  N2_L4_Post_Rigor, N2_L4_Post_Logica, N2_L4_Post_Motor,
  N2_L4_Reel_Rigor, N2_L4_Story_Formal,
  N2_L4_Banner_Formal, N2_L4_Banner_Motor,
  N2_L4_Hybrid_Rigor, N2_L4_Hybrid_Pensar, N2_L4_Hybrid_CTA,
  N3_L5_Post_Semillero, N3_L5_Post_Cooperar, N3_L5_Post_Futuro,
  N3_L5_Reel_Vision, N3_L5_Story_Unete,
  N3_L5_Banner_Ecosistema, N3_L5_Banner_CTA,
  N3_L5_Hybrid_Comunidad, N3_L5_Hybrid_Red, N3_L5_Hybrid_Agora,
} from './templates/CampaignTemplates';

// ── Mapa id → componente React ───────────────────────────────
const COMPONENT_MAP: Record<string, React.FC> = {
  // Standalone
  post_tesis:         SocialPostExample,
  post_micelio:       V1_Micelio,
  post_cita_roja:     V2_CitaRoja,
  post_perspectiva:   V3_Perspectiva,
  post_glass:         V4_Glass,
  post_simbolo:       V5_Simbolo,
  post_datos_split:   V6_DatosSplit,
  post_pregunta:      V7_Pregunta,
  post_proximamente:  V8_Proximamente,
  lote1_estandar:     Lote1_Estandar,
  lote1_flujo:        Lote1_Flujo,
  banner_original:    SocialBannerExample,
  banner_minimal:     B1_Minimal,
  banner_denso:       B2_Denso,
  banner_conferencia: B3_Conferencia,
  reel_original:      SocialReelExample,
  reel_manifiesto:    R1_Manifiesto,
  reel_simbolo:       R2_Simbolo,
  // Hybrid
  hybrid_arbol_tesis:      H1_ArbolTesis,
  hybrid_problema:         H2_Problema,
  hybrid_respuesta:        H3_Respuesta,
  hybrid_diferenciador:    H4_Diferenciador,
  hybrid_madurez:          H5_Madurez,
  hybrid_reel_manifiesto:  H6_ReelManifiesto,
  hybrid_story_teaser:     H7_StoryTeaser,
  hybrid_banner_linkedin:  H8_BannerLinkedin,
  hybrid_banner_og:        H9_BannerOG,
  hybrid_banner_x:         H10_BannerX,
  hybrid_banner_yt:        H11_BannerYT,
  // Campaign N1
  n1_l1_post_caos:          N1_L1_Post_Caos,
  n1_l1_post_archivos:      N1_L1_Post_Archivos,
  n1_l1_post_pregunta:      N1_L1_Post_Pregunta,
  n1_l1_reel_dolor:         N1_L1_Reel_Dolor,
  n1_l1_story_stat:         N1_L1_Story_Stat,
  n1_l1_banner_linkedin:    N1_L1_Banner_Linkedin,
  n1_l1_banner_x:           N1_L1_Banner_X,
  n1_l1_hybrid_caos:        N1_L1_Hybrid_Caos,
  n1_l1_hybrid_escritorio:  N1_L1_Hybrid_Escritorio,
  n1_l1_hybrid_antes:       N1_L1_Hybrid_Antes,
  n1_l2_post_fragmentos:    N1_L2_Post_Fragmentos,
  n1_l2_post_ciclo:         N1_L2_Post_Ciclo,
  n1_l2_post_dato:          N1_L2_Post_Dato,
  n1_l2_reel_flujo:         N1_L2_Reel_Flujo,
  n1_l2_story_antes:        N1_L2_Story_Antes,
  n1_l2_banner_contraste:   N1_L2_Banner_Contraste,
  n1_l2_banner_pregunta:    N1_L2_Banner_Pregunta,
  n1_l2_hybrid_red:         N1_L2_Hybrid_Red,
  n1_l2_hybrid_nodos:       N1_L2_Hybrid_Nodos,
  n1_l2_hybrid_puente:      N1_L2_Hybrid_Puente,
  // Campaign N2
  n2_l3_post_flujo:         N2_L3_Post_Flujo,
  n2_l3_post_markdown:      N2_L3_Post_Markdown,
  n2_l3_post_verificacion:  N2_L3_Post_Verificacion,
  n2_l3_reel_demo:          N2_L3_Reel_Demo,
  n2_l3_story_feature:      N2_L3_Story_Feature,
  n2_l3_banner_solucion:    N2_L3_Banner_Solucion,
  n2_l3_banner_cta:         N2_L3_Banner_CTA,
  n2_l3_hybrid_flujo:       N2_L3_Hybrid_Flujo,
  n2_l3_hybrid_editor:      N2_L3_Hybrid_Editor,
  n2_l3_hybrid_equipo:      N2_L3_Hybrid_Equipo,
  n2_l4_post_rigor:         N2_L4_Post_Rigor,
  n2_l4_post_logica:        N2_L4_Post_Logica,
  n2_l4_post_motor:         N2_L4_Post_Motor,
  n2_l4_reel_rigor:         N2_L4_Reel_Rigor,
  n2_l4_story_formal:       N2_L4_Story_Formal,
  n2_l4_banner_formal:      N2_L4_Banner_Formal,
  n2_l4_banner_motor:       N2_L4_Banner_Motor,
  n2_l4_hybrid_rigor:       N2_L4_Hybrid_Rigor,
  n2_l4_hybrid_pensar:      N2_L4_Hybrid_Pensar,
  n2_l4_hybrid_cta:         N2_L4_Hybrid_CTA,
  // Campaign N3
  n3_l5_post_semillero:     N3_L5_Post_Semillero,
  n3_l5_post_cooperar:      N3_L5_Post_Cooperar,
  n3_l5_post_futuro:        N3_L5_Post_Futuro,
  n3_l5_reel_vision:        N3_L5_Reel_Vision,
  n3_l5_story_unete:        N3_L5_Story_Unete,
  n3_l5_banner_ecosistema:  N3_L5_Banner_Ecosistema,
  n3_l5_banner_cta:         N3_L5_Banner_CTA,
  n3_l5_hybrid_comunidad:   N3_L5_Hybrid_Comunidad,
  n3_l5_hybrid_red:         N3_L5_Hybrid_Red,
  n3_l5_hybrid_agora:       N3_L5_Hybrid_Agora,
};

// ── Tipos y registry construido ──────────────────────────────
export interface TemplateEntry extends TemplateInfo {
  component: React.FC;
}

export const TEMPLATE_REGISTRY: TemplateEntry[] = TEMPLATE_DATA
  .filter(t => COMPONENT_MAP[t.id])
  .map(t => ({ ...t, component: COMPONENT_MAP[t.id] }));

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
