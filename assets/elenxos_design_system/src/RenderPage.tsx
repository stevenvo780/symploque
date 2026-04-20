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
