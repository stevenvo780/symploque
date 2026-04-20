/**
 * HybridVariations — Templates que combinan imágenes AI generadas
 * con componentes React del design system Elenxos.
 *
 * Usa URLs de /public/ai-images/ para evitar problemas de import ES.
 */
import React from 'react';
import { SocialCanvas } from '../components/SocialCanvas/SocialCanvas';
import { AIImageBackground } from '../components/AIImageBackground/AIImageBackground';
import { FrameOverlay } from '../components/FrameOverlay/FrameOverlay';
import { BrandMark } from '../components/BrandMark/BrandMark';
import { CinematicText } from '../components/CinematicText/CinematicText';
import { GlowOrb } from '../components/GlowOrb/GlowOrb';
import { KodamaParticles } from '../components/KodamaParticles/KodamaParticles';
import { Badge } from '../components/Badge/Badge';
import { Text } from '../components/Typography/Typography';
import { IconSymbol } from '../components/IconSymbol/IconSymbol';
import { ScanLines } from '../components/ScanLines/ScanLines';

// ── Image URLs from public/ ──────────────────────────────────
const IMG = {
  postTesis:            '/ai-images/instagram/ig_post_tesis.png',
  carruselProblema1:    '/ai-images/instagram/ig_carrusel_problema_1.png',
  carruselProblema3:    '/ai-images/instagram/ig_carrusel_problema_3.png',
  reelCover:            '/ai-images/instagram/ig_reel_cover.png',
  storyTeaser:          '/ai-images/instagram/ig_story_teaser.png',
  linkedinBanner:       '/ai-images/linkedin/linkedin_banner.png',
  linkedinDiferenciador:'/ai-images/linkedin/linkedin_post_diferenciador.png',
  linkedinMadurez:      '/ai-images/linkedin/linkedin_post_madurez.png',
  ogGeneral:            '/ai-images/web/og_general.png',
  xPrincipal:           '/ai-images/x/x_post_principal.png',
  ytThumbnail:          '/ai-images/youtube/yt_thumbnail.png',
};

// ── Helper ───────────────────────────────────────────────────
const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// ═══════════════════════════════════════════════════════════════
// POSTS 1080×1080
// ═══════════════════════════════════════════════════════════════

export const H1_ArbolTesis = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground
      src={IMG.postTesis}
      opacity={0.85}
      overlay="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)"
    />
    <KodamaParticles count={15} relative />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={22} />
    <div style={abs({ padding: '100px 80px', justifyContent: 'flex-end', paddingBottom: 140 })}>
      <CinematicText text="El conocimiento" level="h2" delayStep={0.06} style={{ fontSize: 62 }} />
      <CinematicText text="tiene raíces." level="h2" color="kodama" delayStep={0.08} baseDelay={0.9} style={{ fontSize: 62 }} />
      <Text size="md" color="muted" style={{ marginTop: 24, fontSize: 24, letterSpacing: 3, textTransform: 'uppercase' }}>
        Traducción académica con profundidad
      </Text>
    </div>
  </SocialCanvas>
);

export const H2_Problema = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground
      src={IMG.carruselProblema1}
      opacity={0.7}
      overlay="linear-gradient(180deg, rgba(5,10,7,0.6) 0%, rgba(5,10,7,0.85) 100%)"
    />
    <GlowOrb color="mask" size={400} x="50%" y="40%" blur={120} opacity={0.15} />
    <ScanLines />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-left" fontSize={20} />
    <div style={abs({ padding: '100px 80px', textAlign: 'center' })}>
      <Badge variant="mask" style={{ marginBottom: 30, fontSize: 22, padding: '10px 28px' }}>El problema</Badge>
      <CinematicText text="El 73% del" level="h2" delayStep={0.06} style={{ fontSize: 58 }} />
      <CinematicText text="conocimiento" level="h2" delayStep={0.06} baseDelay={0.7} style={{ fontSize: 58 }} />
      <CinematicText text="se pierde" level="h2" color="kodama" delayStep={0.08} baseDelay={1.3} style={{ fontSize: 58 }} />
      <CinematicText text="en la traducción." level="h2" color="kodama" delayStep={0.06} baseDelay={1.9} style={{ fontSize: 58 }} />
    </div>
  </SocialCanvas>
);

export const H3_Respuesta = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground
      src={IMG.carruselProblema3}
      opacity={0.65}
      overlay="radial-gradient(ellipse at center, rgba(5,10,7,0.4) 0%, rgba(5,10,7,0.9) 70%)"
    />
    <GlowOrb color="kodama" size={350} x="50%" y="50%" blur={100} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} tagline="elenxos.com" />
    <div style={abs({ padding: '100px 70px', textAlign: 'center' })}>
      <IconSymbol symbol="φ" size={120} color="kodama" style={{ marginBottom: 30, opacity: 0.8 }} />
      <CinematicText text="Nosotros no" level="h2" delayStep={0.07} style={{ fontSize: 56 }} />
      <CinematicText text="traducimos." level="h2" delayStep={0.07} baseDelay={0.8} style={{ fontSize: 56 }} />
      <CinematicText text="Transmutamos." level="h1" color="kodama" delayStep={0.1} baseDelay={1.6} style={{ fontSize: 72 }} />
    </div>
  </SocialCanvas>
);

export const H4_Diferenciador = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground
      src={IMG.linkedinDiferenciador}
      opacity={0.6}
      overlay="linear-gradient(160deg, rgba(10,15,26,0.7) 0%, rgba(15,37,25,0.8) 100%)"
    />
    <GlowOrb color="forest" size={500} x="30%" y="60%" blur={100} opacity={0.2} />
    <FrameOverlay variant="double" />
    <BrandMark position="top-left" fontSize={20} />
    <div style={abs({ padding: '90px 70px', gap: 20 })}>
      <Text size="sm" color="kodama" style={{ fontSize: 24, letterSpacing: 6, textTransform: 'uppercase' }}>Lo que nos distingue</Text>
      <CinematicText text="No es solo" level="h2" delayStep={0.07} style={{ fontSize: 58 }} />
      <CinematicText text="lenguaje." level="h2" delayStep={0.07} baseDelay={0.7} style={{ fontSize: 58 }} />
      <CinematicText text="Es epistemología" level="h2" color="kodama" delayStep={0.06} baseDelay={1.3} style={{ fontSize: 58 }} />
      <CinematicText text="aplicada." level="h2" color="kodama" delayStep={0.1} baseDelay={2.0} style={{ fontSize: 58 }} />
    </div>
  </SocialCanvas>
);

export const H5_Madurez = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground
      src={IMG.linkedinMadurez}
      opacity={0.6}
      overlay="linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(15,37,25,0.85) 100%)"
    />
    <KodamaParticles count={20} relative />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={20} tagline="elenxos.com" />
    <div style={abs({ padding: '80px', justifyContent: 'flex-start', paddingTop: 120 })}>
      <Badge variant="kodama" dot style={{ marginBottom: 24, fontSize: 22, padding: '10px 28px' }}>Investigación</Badge>
      <CinematicText text="Tu tesis merece" level="h2" delayStep={0.06} style={{ fontSize: 54 }} />
      <CinematicText text="madurez" level="h1" color="kodama" delayStep={0.1} baseDelay={0.9} style={{ fontSize: 78 }} />
      <CinematicText text="epistémica." level="h1" color="kodama" delayStep={0.1} baseDelay={1.6} style={{ fontSize: 78 }} />
      <Text size="md" color="muted" style={{ marginTop: 30, fontSize: 26, maxWidth: '80%', textAlign: 'center', lineHeight: 1.7 }}>
        Transformamos documentos académicos en obras de rigor intelectual.
      </Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
// REELS 1080×1920
// ═══════════════════════════════════════════════════════════════

export const H6_ReelManifiesto = () => (
  <SocialCanvas format="reel" scale={0.22}>
    <AIImageBackground
      src={IMG.reelCover}
      opacity={0.7}
      overlay="linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(5,10,7,0.6) 40%, rgba(5,10,7,0.9) 100%)"
    />
    <GlowOrb color="kodama" size={400} x="50%" y="30%" blur={120} opacity={0.12} />
    <KodamaParticles count={25} relative />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={24} tagline="Ágora Digital del Pensamiento" />
    <div style={abs({ padding: '120px 70px', justifyContent: 'flex-end', paddingBottom: 220 })}>
      <CinematicText text="No somos" level="h2" delayStep={0.08} style={{ fontSize: 58 }} />
      <CinematicText text="una agencia." level="h2" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 58 }} />
      <div style={{ height: 40 }} />
      <CinematicText text="Somos el" level="h2" delayStep={0.08} baseDelay={1.8} style={{ fontSize: 58 }} />
      <CinematicText text="puente entre" level="h2" color="kodama" delayStep={0.06} baseDelay={2.5} style={{ fontSize: 58 }} />
      <CinematicText text="el pensamiento" level="h2" color="kodama" delayStep={0.06} baseDelay={3.2} style={{ fontSize: 58 }} />
      <CinematicText text="y el mundo." level="h1" color="kodama" delayStep={0.1} baseDelay={4.0} style={{ fontSize: 72 }} />
    </div>
  </SocialCanvas>
);

export const H7_StoryTeaser = () => (
  <SocialCanvas format="reel" scale={0.22}>
    <AIImageBackground
      src={IMG.storyTeaser}
      opacity={0.75}
      overlay="linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 50%, rgba(5,10,7,0.85) 100%)"
    />
    <ScanLines />
    <FrameOverlay variant="double" />
    <BrandMark position="top-left" fontSize={22} />
    <div style={abs({ padding: '120px 70px', justifyContent: 'center' })}>
      <IconSymbol symbol="Ξ" size={180} color="kodama" style={{ marginBottom: 50, opacity: 0.7 }} />
      <CinematicText text="¿Listo para" level="h2" delayStep={0.07} style={{ fontSize: 62 }} />
      <CinematicText text="pensar" level="h1" color="kodama" delayStep={0.12} baseDelay={0.9} style={{ fontSize: 86 }} />
      <CinematicText text="diferente?" level="h1" color="kodama" delayStep={0.1} baseDelay={1.6} style={{ fontSize: 86 }} />
      <div style={{ marginTop: 60, padding: '20px 56px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
        <Text size="lg" color="kodama" style={{ fontSize: 30, letterSpacing: 4, textTransform: 'uppercase' }}>Desliza ↑</Text>
      </div>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
// BANNERS 1500×500
// ═══════════════════════════════════════════════════════════════

export const H8_BannerLinkedin = () => (
  <SocialCanvas format="banner" scale={0.38}>
    <AIImageBackground
      src={IMG.linkedinBanner}
      opacity={0.65}
      overlay="linear-gradient(90deg, rgba(5,10,7,0.85) 0%, rgba(5,10,7,0.3) 40%, rgba(5,10,7,0.3) 60%, rgba(5,10,7,0.85) 100%)"
    />
    <GlowOrb color="kodama" size={300} x="25%" y="50%" blur={100} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={18} />
    <div style={abs({ flexDirection: 'row', padding: '0 100px', justifyContent: 'flex-start', gap: 60 })}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CinematicText text="ELENXOS" level="h2" color="kodama" delayStep={0.1} style={{ fontSize: 72, letterSpacing: 12 }} />
        <Text size="lg" color="muted" style={{ fontSize: 28, letterSpacing: 6 }}>
          Ágora Digital del Pensamiento
        </Text>
      </div>
    </div>
  </SocialCanvas>
);

export const H9_BannerOG = () => (
  <SocialCanvas format="banner" scale={0.38}>
    <AIImageBackground
      src={IMG.ogGeneral}
      opacity={0.6}
      overlay="linear-gradient(180deg, rgba(5,10,7,0.7) 0%, rgba(5,10,7,0.5) 50%, rgba(5,10,7,0.8) 100%)"
    />
    <KodamaParticles count={12} relative />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={18} tagline="elenxos.com" />
    <div style={abs({ padding: '0 120px', textAlign: 'center' })}>
      <CinematicText text="Traducción. Rigor. Impacto." level="h3" color="kodama" delayStep={0.05} style={{ fontSize: 52, letterSpacing: 3 }} />
    </div>
  </SocialCanvas>
);

export const H10_BannerX = () => (
  <SocialCanvas format="banner" scale={0.38}>
    <AIImageBackground
      src={IMG.xPrincipal}
      opacity={0.55}
      overlay="linear-gradient(90deg, rgba(5,10,7,0.9) 0%, rgba(5,10,7,0.4) 50%, rgba(5,10,7,0.9) 100%)"
    />
    <ScanLines />
    <FrameOverlay variant="double" />
    <BrandMark position="top-left" fontSize={18} />
    <div style={abs({ flexDirection: 'row', padding: '0 80px', justifyContent: 'space-between', alignItems: 'center' })}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '55%' }}>
        <CinematicText text="Pensamiento" level="h3" delayStep={0.06} style={{ fontSize: 48 }} />
        <CinematicText text="sin fronteras." level="h3" color="kodama" delayStep={0.08} baseDelay={0.7} style={{ fontSize: 48 }} />
      </div>
      <IconSymbol symbol="∞" size={140} color="kodama" style={{ opacity: 0.4 }} />
    </div>
  </SocialCanvas>
);

export const H11_BannerYT = () => (
  <SocialCanvas format="banner" scale={0.38}>
    <AIImageBackground
      src={IMG.ytThumbnail}
      opacity={0.5}
      overlay="linear-gradient(180deg, rgba(5,10,7,0.6) 0%, rgba(5,10,7,0.8) 100%)"
    />
    <GlowOrb color="warm" size={250} x="75%" y="50%" blur={80} opacity={0.15} />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-left" fontSize={18} />
    <div style={abs({ padding: '0 100px', alignItems: 'flex-start' })}>
      <Badge variant="mask" style={{ marginBottom: 20, fontSize: 22, padding: '10px 28px' }}>YouTube</Badge>
      <CinematicText text="El canal de la" level="h3" delayStep={0.05} style={{ fontSize: 46 }} />
      <CinematicText text="resistencia intelectual." level="h3" color="kodama" delayStep={0.05} baseDelay={0.7} style={{ fontSize: 46 }} />
    </div>
  </SocialCanvas>
);
