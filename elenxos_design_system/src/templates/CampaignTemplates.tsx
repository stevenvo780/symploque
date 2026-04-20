/**
 * CampaignTemplates — Generador de templates por narrativa
 * 
 * Cada narrativa genera un lote completo:
 *   - 3 posts (1080×1080) con estilos visuales distintos
 *   - 2 reels/stories (1080×1920)
 *   - 2 banners (1500×500)
 *   - 3 híbridos con AI image (1080×1080)
 * 
 * = 10 piezas por lote × 5 lotes = 50 imágenes por campaña
 */
import React from 'react';
import { SocialCanvas } from '../components/SocialCanvas/SocialCanvas';
import { AIImageBackground } from '../components/AIImageBackground/AIImageBackground';
import { GlowOrb } from '../components/GlowOrb/GlowOrb';
import { GridPattern } from '../components/GridPattern/GridPattern';
import { FrameOverlay } from '../components/FrameOverlay/FrameOverlay';
import { BrandMark } from '../components/BrandMark/BrandMark';
import { CinematicText } from '../components/CinematicText/CinematicText';
import { QuoteCard } from '../components/QuoteCard/QuoteCard';
import { StatsDisplay } from '../components/StatsDisplay/StatsDisplay';
import { IconSymbol } from '../components/IconSymbol/IconSymbol';
import { ScanLines } from '../components/ScanLines/ScanLines';
import { AuraBackground } from '../components/AuraBackground/AuraBackground';
import { LogicMesh } from '../components/LogicMesh/LogicMesh';
import { KodamaParticles } from '../components/KodamaParticles/KodamaParticles';
import { GradientWave } from '../components/GradientWave/GradientWave';
import { Badge } from '../components/Badge/Badge';
import { Text } from '../components/Typography/Typography';
import { MatrixRain } from '../components/MatrixRain/MatrixRain';
import { FibonacciSpiral } from '../components/FibonacciSpiral/FibonacciSpiral';
import { PenrosePattern } from '../components/PenrosePattern/PenrosePattern';
import { DialecticFlow } from '../components/DialecticFlow/DialecticFlow';
import { GlitchText } from '../components/GlitchText/GlitchText';
import { TopologyMorph } from '../components/TopologyMorph/TopologyMorph';
import { FormulaDisplay } from '../components/FormulaDisplay/FormulaDisplay';
import { OuroborosLoader } from '../components/OuroborosLoader/OuroborosLoader';
import { HexGrid } from '../components/HexGrid/HexGrid';
import { QuantumParticle } from '../components/QuantumParticle/QuantumParticle';
import { ProofChain } from '../components/ProofChain/ProofChain';
import { Card } from '../components/Card/Card';
import { ElenxosLogo } from '../components/ElenxosLogo/ElenxosLogo';

const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// ═══════════════════════════════════════════════════════════════════
//  NARRATIVA 1: DOLOR — "Tu tesis vive dispersa"
//  Escalón: Cercanía — El problema que todos reconocen
// ═══════════════════════════════════════════════════════════════════

// ── LOTE 1: Caos digital — MatrixRain + GlitchText ──────────
export const N1_L1_Post_Caos = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080404' }} />
    <MatrixRain columns={10} charset="logic" color="amber" speed="normal" />
    <GlowOrb color="mask" size={500} x="50%" y="60%" blur={150} opacity={0.15} />
    <ScanLines heavy />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 30 })}>
      <GlitchText text="ERROR_404" level="h3" color="mask" intensity="heavy" />
      <CinematicText text="Tu tesis vive" level="h2" delayStep={0.06} style={{ fontSize: 62 }} />
      <CinematicText text="en 14 archivos." level="h2" color="kodama" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 62 }} />
      <Text size="md" color="muted" style={{ marginTop: 30, fontSize: 24, maxWidth: '85%', textAlign: 'center', lineHeight: 1.7 }}>
        3 herramientas. 7 versiones. Ningún contexto. Eso no es investigar.
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L1_Post_Archivos = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0808' }} />
    <HexGrid cols={6} rows={6} size={45} color="mask" />
    <GlowOrb color="mask" size={400} x="30%" y="70%" blur={100} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <StatsDisplay stats={[
        { value: '14', label: 'Archivos' },
        { value: '3', label: 'Herramientas' },
        { value: '0', label: 'Contexto' },
      ]} fontSize={64} />
      <Text size="md" color="muted" style={{ marginTop: 30, fontSize: 26, letterSpacing: 4, textTransform: 'uppercase' }}>
        Así se ve tu investigación hoy
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L1_Post_Pregunta = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #080505 0%, #0F0808 100%)' }} />
    <PenrosePattern density={8} color="mask" animated />
    <GlowOrb color="warm" size={350} x="70%" y="30%" blur={100} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '90px', gap: 20 })}>
      <QuoteCard
        quote="¿Cuántas veces reescribiste lo que ya habías escrito?"
        author=""
        fontSize={44}
      />
      <FormulaDisplay formula="contexto → 0" label="Resultado actual" size="lg" color="mask" />
    </div>
  </SocialCanvas>
);

export const N1_L1_Reel_Dolor = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060303' }} />
    <MatrixRain columns={8} charset="binary" color="mask" speed="fast" />
    <GlowOrb color="mask" size={600} x="50%" y="30%" blur={180} opacity={0.12} />
    <ScanLines />
    <FrameOverlay variant="mask" />
    <BrandMark position="center-bottom" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '120px 80px', gap: 40 })}>
      <GlitchText text="SISTEMA_ROTO" level="h3" color="mask" intensity="medium" />
      <CinematicText text="Tu proceso" level="h1" delayStep={0.06} style={{ fontSize: 72 }} />
      <CinematicText text="de investigación" level="h1" color="muted" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 72 }} />
      <CinematicText text="está roto." level="h1" color="muted" delayStep={0.08} baseDelay={1.6} style={{ fontSize: 86 }} />
      <div style={{ height: 60 }} />
      <ProofChain steps={[
        { text: 'Escribes', symbol: '✎' },
        { text: 'Pierdes contexto', symbol: '⚠' },
        { text: 'Reescribes', symbol: '↻' },
        { text: 'Repites', symbol: '∞' },
      ]} color="mask" />
      <Text size="md" color="muted" style={{ marginTop: 40, fontSize: 24, textAlign: 'center', lineHeight: 1.7 }}>
        Un ciclo que no termina. Hasta que cambias la herramienta.
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L1_Story_Stat = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080505' }} />
    <LogicMesh density={0.4} />
    <GlowOrb color="mask" size={500} x="50%" y="50%" blur={150} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 40 })}>
      <Badge variant="mask" style={{ fontSize: 22, padding: '10px 28px' }}>El dato incómodo</Badge>
      <StatsDisplay stats={[{ value: '73%', label: 'del tiempo' }]} fontSize={96} />
      <Text size="lg" color="muted" style={{ fontSize: 32, textAlign: 'center', maxWidth: '80%', lineHeight: 1.6 }}>
        de tu investigación se va en buscar lo que ya escribiste
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L1_Banner_Linkedin = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#080404' }} />
    <MatrixRain columns={20} charset="logic" color="mask" speed="normal" />
    <GlowOrb color="mask" size={300} x="20%" y="50%" blur={80} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={18} />
    <div style={abs({ padding: '0 120px', flexDirection: 'row', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <CinematicText text="14 archivos." level="h2" delayStep={0.06} style={{ fontSize: 44 }} />
        <CinematicText text="0 contexto." level="h2" color="muted" delayStep={0.08} baseDelay={0.6} style={{ fontSize: 44 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ElenxosLogo size={60} color="kodama" animated glow />
        <Text size="sm" color="kodama" style={{ fontSize: 18, letterSpacing: 6, marginTop: 12 }}>AGORA RESUELVE ESTO</Text>
      </div>
    </div>
  </SocialCanvas>
);

export const N1_L1_Banner_X = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #0A0505 0%, #080808 50%, #050A07 100%)' }} />
    <ScanLines heavy />
    <GlowOrb color="mask" size={250} x="15%" y="50%" blur={80} opacity={0.15} />
    <GlowOrb color="kodama" size={250} x="85%" y="50%" blur={80} opacity={0.1} />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={18} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '0 100px', textAlign: 'center', gap: 6 })}>
      <CinematicText text="Antes: dispersión." level="h3" color="muted" delayStep={0.06} style={{ fontSize: 36 }} />
      <CinematicText text="Después: flujo." level="h3" color="kodama" delayStep={0.06} baseDelay={0.6} style={{ fontSize: 36 }} />
    </div>
  </SocialCanvas>
);

// ── Híbridos con AI image (requieren imágenes en public/ai-images/campaign/) ──
export const N1_L1_Hybrid_Caos = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n1_caos_digital.png" opacity={0.5} blend="luminosity" overlay="linear-gradient(180deg, rgba(10,5,5,0.7) 0%, rgba(5,10,7,0.9) 100%)" />
    <GlowOrb color="mask" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <Badge variant="mask" style={{ fontSize: 22, padding: '10px 28px' }}>La realidad</Badge>
      <CinematicText text="3 carpetas." level="h2" delayStep={0.06} style={{ fontSize: 58 }} />
      <CinematicText text="7 versiones." level="h2" delayStep={0.06} baseDelay={0.7} style={{ fontSize: 58 }} />
      <CinematicText text="0 contexto." level="h2" color="kodama" delayStep={0.08} baseDelay={1.3} style={{ fontSize: 58 }} />
    </div>
  </SocialCanvas>
);

export const N1_L1_Hybrid_Escritorio = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n1_escritorio_caos.png" opacity={0.45} blend="luminosity" overlay="linear-gradient(180deg, rgba(8,4,4,0.8) 0%, rgba(5,10,7,0.85) 100%)" />
    <ScanLines />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <QuoteCard
        quote="¿Cuántas horas perdiste buscando lo que ya habías escrito?"
        author=""
        fontSize={40}
      />
      <FormulaDisplay formula="dispersión → frustración → abandono" label="" size="md" color="mask" />
    </div>
  </SocialCanvas>
);

export const N1_L1_Hybrid_Antes = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n1_antes_despues.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(10,5,5,0.75) 0%, rgba(5,10,7,0.9) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="70%" blur={120} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <DialecticFlow thesis="Caos" antithesis="Agora" synthesis="Flujo" color="kodama" />
      <CinematicText text="Antes: 14 archivos." level="h2" delayStep={0.06} style={{ fontSize: 48 }} />
      <CinematicText text="Después: 1 flujo." level="h2" color="kodama" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 48 }} />
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  NARRATIVA 1: DOLOR — LOTE 2: Fragmentación — HexGrid + ProofChain
// ═══════════════════════════════════════════════════════════════════

export const N1_L2_Post_Fragmentos = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060608' }} />
    <HexGrid cols={8} rows={8} size={35} color="kodama" />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.08} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <IconSymbol symbol="⬡" size={80} color="kodama" />
      <CinematicText text="Fragmentos" level="h1" delayStep={0.08} style={{ fontSize: 72 }} />
      <CinematicText text="sin conexión." level="h1" color="kodama" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 72 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Cada herramienta tiene un pedazo de tu investigación. Ninguna tiene el todo.
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L2_Post_Ciclo = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
    <TopologyMorph size={500} color="mask" />
    <GlowOrb color="mask" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 30 })}>
      <OuroborosLoader size={120} color="mask" speed="slow" />
      <CinematicText text="El ciclo" level="h2" delayStep={0.07} style={{ fontSize: 56 }} />
      <CinematicText text="del reescribir." level="h2" color="muted" delayStep={0.07} baseDelay={0.8} style={{ fontSize: 56 }} />
      <ProofChain steps={[
        { text: 'Escribes', symbol: '✎' },
        { text: 'Pierdes', symbol: '✗' },
        { text: 'Buscas', symbol: '⌕' },
        { text: 'Repites', symbol: '↻' },
      ]} color="mask" />
    </div>
  </SocialCanvas>
);

export const N1_L2_Post_Dato = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050508' }} />
    <GridPattern variant="dots" gap={30} />
    <FibonacciSpiral size={400} color="kodama" animated />
    <GlowOrb color="kodama" size={300} x="30%" y="70%" blur={100} opacity={0.08} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <Badge variant="kodama" dot style={{ fontSize: 22, padding: '10px 28px' }}>Dato real</Badge>
      <StatsDisplay stats={[
        { value: '5h', label: 'Semanales' },
        { value: '→', label: '' },
        { value: '0', label: 'Avance' },
      ]} fontSize={64} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        5 horas a la semana buscando lo que ya escribiste. Eso se llama dispersión.
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L2_Reel_Flujo = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #060308 0%, #050A07 100%)' }} />
    <LogicMesh density={0.3} />
    <KodamaParticles count={25} />
    <GlowOrb color="kodama" size={500} x="50%" y="40%" blur={150} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '120px 80px', gap: 36 })}>
      <IconSymbol symbol="∴" size={100} color="kodama" />
      <CinematicText text="¿Y si todo" level="h1" delayStep={0.06} style={{ fontSize: 68 }} />
      <CinematicText text="estuviera" level="h1" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 68 }} />
      <CinematicText text="conectado?" level="h1" color="kodama" delayStep={0.08} baseDelay={1.6} style={{ fontSize: 86 }} />
      <div style={{ height: 40 }} />
      <DialecticFlow thesis="Notas" antithesis="Argumento" synthesis="Tesis" color="kodama" />
      <Text size="md" color="muted" style={{ marginTop: 30, fontSize: 24, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Escritura. Lógica. Verificación. Colaboración. Un solo flujo.
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L2_Story_Antes = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080505' }} />
    <AuraBackground cinematicZoom />
    <GlowOrb color="mask" size={400} x="50%" y="30%" blur={120} opacity={0.12} />
    <GlowOrb color="kodama" size={400} x="50%" y="70%" blur={120} opacity={0.08} />
    <FrameOverlay variant="mask" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 50 })}>
      <div style={{ textAlign: 'center' }}>
        <Badge variant="mask" style={{ fontSize: 20, padding: '8px 24px', marginBottom: 16 }}>ANTES</Badge>
        <CinematicText text="Dispersión." level="h2" color="muted" delayStep={0.08} style={{ fontSize: 52 }} />
      </div>
      <div style={{ width: '60%', height: 1, background: 'rgba(163,228,215,0.2)' }} />
      <div style={{ textAlign: 'center' }}>
        <Badge variant="kodama" style={{ fontSize: 20, padding: '8px 24px', marginBottom: 16 }}>DESPUÉS</Badge>
        <CinematicText text="Flujo." level="h2" color="kodama" delayStep={0.08} baseDelay={1} style={{ fontSize: 52 }} />
      </div>
    </div>
  </SocialCanvas>
);

export const N1_L2_Banner_Contraste = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #0A0505 0%, #050A07 100%)' }} />
    <HexGrid cols={12} rows={4} size={30} color="kodama" />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={18} />
    <div style={abs({ padding: '0 120px', flexDirection: 'row', gap: 60 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <StatsDisplay stats={[{ value: '14', label: 'Archivos' }]} fontSize={52} />
      </div>
      <div style={{ width: 1, background: 'rgba(163,228,215,0.2)', alignSelf: 'stretch', margin: '40px 0' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <StatsDisplay stats={[{ value: '1', label: 'Flujo' }]} fontSize={52} />
      </div>
    </div>
  </SocialCanvas>
);

export const N1_L2_Banner_Pregunta = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
    <PenrosePattern density={5} color="kodama" animated />
    <GlowOrb color="kodama" size={300} x="80%" y="50%" blur={100} opacity={0.08} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={18} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '0 100px', textAlign: 'center', gap: 8 })}>
      <CinematicText text="¿Cuántas veces reescribiste lo que ya habías escrito?" level="h3" delayStep={0.04} style={{ fontSize: 34 }} />
      <Text size="sm" color="kodama" style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase' }}>
        Hay una solución → agora.elenxos.com
      </Text>
    </div>
  </SocialCanvas>
);

// ── Híbridos Lote 2 ──────────────────────────────────────────
export const N1_L2_Hybrid_Red = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n1_red_fragmentada.png" opacity={0.45} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,5,8,0.8) 0%, rgba(5,10,7,0.85) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.08} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <CinematicText text="Tu red de" level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="conocimiento" level="h2" delayStep={0.06} baseDelay={0.7} style={{ fontSize: 56 }} />
      <CinematicText text="está rota." level="h2" color="kodama" delayStep={0.08} baseDelay={1.3} style={{ fontSize: 56 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center' }}>
        Agora la reconecta.
      </Text>
    </div>
  </SocialCanvas>
);

export const N1_L2_Hybrid_Nodos = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n1_nodos_conectados.png" opacity={0.5} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,8,5,0.7) 0%, rgba(5,10,7,0.9) 100%)" />
    <KodamaParticles count={15} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <IconSymbol symbol="⊛" size={80} color="kodama" />
      <CinematicText text="Un solo flujo" level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="para todo." level="h2" color="kodama" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 56 }} />
      <FormulaDisplay formula="notas ∧ lógica ∧ tesis → Agora" label="Todo conectado" size="md" color="kodama" />
    </div>
  </SocialCanvas>
);

export const N1_L2_Hybrid_Puente = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n1_puente_conocimiento.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,5,10,0.75) 0%, rgba(5,10,7,0.9) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="60%" blur={120} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <Badge variant="kodama" dot pulse style={{ fontSize: 22, padding: '10px 28px' }}>Agora</Badge>
      <CinematicText text="Escribe." level="h1" delayStep={0.08} style={{ fontSize: 72 }} />
      <CinematicText text="Formaliza." level="h1" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 72 }} />
      <CinematicText text="Verifica." level="h1" color="kodama" delayStep={0.08} baseDelay={1.6} style={{ fontSize: 72 }} />
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  NARRATIVA 2: SOLUCIÓN — "Escribe. Formaliza. Verifica."
//  Escalón: Utilidad — Cómo Agora te resuelve el problema
// ═══════════════════════════════════════════════════════════════════

// ── LOTE 3: Flujo unificado — LogicMesh + KodamaParticles ───
export const N2_L3_Post_Flujo = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <LogicMesh density={0.5} />
    <KodamaParticles count={30} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ElenxosLogo size={80} color="kodama" animated glow />
      <CinematicText text="Escribe." level="h1" delayStep={0.08} style={{ fontSize: 72 }} />
      <CinematicText text="Formaliza." level="h1" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 72 }} />
      <CinematicText text="Verifica." level="h1" color="kodama" delayStep={0.08} baseDelay={1.6} style={{ fontSize: 72 }} />
      <Text size="md" color="muted" style={{ marginTop: 30, fontSize: 24, textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Markdown académico + lógica formal + verificación. Todo en el navegador.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L3_Post_Markdown = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#040608' }} />
    <GridPattern variant="lines" gap={50} />
    <GlowOrb color="kodama" size={300} x="70%" y="30%" blur={100} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <Badge variant="kodama" dot style={{ fontSize: 22, padding: '10px 28px' }}>Markdown académico</Badge>
      <FormulaDisplay formula="# Tu tesis → ∀x(P(x) → Q(x))" label="Escritura + Lógica formal" size="lg" color="kodama" />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Escribe en Markdown. Agora entiende la estructura. Formaliza tus argumentos.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L3_Post_Verificacion = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050808' }} />
    <AuraBackground cinematicZoom />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ProofChain steps={[
        { text: 'Premisa', symbol: 'P' },
        { text: 'Argumento', symbol: '→' },
        { text: 'Conclusión', symbol: 'Q' },
        { text: 'Verificado', symbol: '✓' },
      ]} color="kodama" />
      <CinematicText text="Verificación" level="h2" delayStep={0.07} style={{ fontSize: 56 }} />
      <CinematicText text="integrada." level="h2" color="kodama" delayStep={0.07} baseDelay={0.8} style={{ fontSize: 56 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Tu argumento pasa por lógica formal antes de ser tesis. Sin atajos.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L3_Reel_Demo = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#040608' }} />
    <LogicMesh density={0.4} />
    <KodamaParticles count={20} />
    <GlowOrb color="kodama" size={600} x="50%" y="40%" blur={180} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '120px 80px', gap: 36 })}>
      <ElenxosLogo size={100} color="kodama" animated glow />
      <CinematicText text="Agora" level="h1" color="kodama" delayStep={0.1} style={{ fontSize: 86 }} />
      <div style={{ height: 20 }} />
      <StatsDisplay stats={[
        { value: '1', label: 'Flujo' },
        { value: '∞', label: 'Contexto' },
        { value: '0', label: 'Dispersión' },
      ]} fontSize={56} />
      <div style={{ height: 30 }} />
      <div style={{ padding: '16px 48px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
        <Text size="lg" color="kodama" style={{ fontSize: 28, letterSpacing: 4, textTransform: 'uppercase' }}>Agenda una demo</Text>
      </div>
    </div>
  </SocialCanvas>
);

export const N2_L3_Story_Feature = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <GradientWave speed={15} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 40 })}>
      <Text size="sm" color="kodama" style={{ fontSize: 22, letterSpacing: 8, textTransform: 'uppercase' }}>Lo que incluye Agora</Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
        <Card style={{ background: 'rgba(163,228,215,0.08)', border: '1px solid rgba(163,228,215,0.15)', borderRadius: 12, padding: '20px 28px' }}>
          <Text size="md" color="kodama" style={{ fontSize: 24 }}>✎ Editor Markdown académico</Text>
        </Card>
        <Card style={{ background: 'rgba(163,228,215,0.08)', border: '1px solid rgba(163,228,215,0.15)', borderRadius: 12, padding: '20px 28px' }}>
          <Text size="md" color="kodama" style={{ fontSize: 24 }}>∀ Motor de lógica formal</Text>
        </Card>
        <Card style={{ background: 'rgba(163,228,215,0.08)', border: '1px solid rgba(163,228,215,0.15)', borderRadius: 12, padding: '20px 28px' }}>
          <Text size="md" color="kodama" style={{ fontSize: 24 }}>✓ Verificación de argumentos</Text>
        </Card>
        <Card style={{ background: 'rgba(163,228,215,0.08)', border: '1px solid rgba(163,228,215,0.15)', borderRadius: 12, padding: '20px 28px' }}>
          <Text size="md" color="kodama" style={{ fontSize: 24 }}>⊛ Colaboración en tiempo real</Text>
        </Card>
      </div>
    </div>
  </SocialCanvas>
);

export const N2_L3_Banner_Solucion = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <LogicMesh density={0.3} />
    <KodamaParticles count={15} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={18} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '0 120px', flexDirection: 'row', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <CinematicText text="Escribe. Formaliza." level="h3" delayStep={0.05} style={{ fontSize: 34 }} />
        <CinematicText text="Verifica." level="h3" color="kodama" delayStep={0.05} baseDelay={0.6} style={{ fontSize: 34 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <StatsDisplay stats={[
          { value: '1', label: 'Flujo' },
          { value: '∞', label: 'Contexto' },
        ]} fontSize={44} />
      </div>
    </div>
  </SocialCanvas>
);

export const N2_L3_Banner_CTA = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #050A07 0%, #040608 100%)' }} />
    <GradientWave speed={20} />
    <GlowOrb color="kodama" size={300} x="75%" y="50%" blur={100} opacity={0.12} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-left" fontSize={18} />
    <div style={abs({ padding: '0 100px', flexDirection: 'row', gap: 40 })}>
      <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CinematicText text="¿10 min para cambiar" level="h3" delayStep={0.04} style={{ fontSize: 30 }} />
        <CinematicText text="cómo investigas?" level="h3" color="kodama" delayStep={0.04} baseDelay={0.5} style={{ fontSize: 30 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '14px 40px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
          <Text size="md" color="kodama" style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' }}>Agenda demo</Text>
        </div>
      </div>
    </div>
  </SocialCanvas>
);

// ── Híbridos Lote 3 ──────────────────────────────────────────
export const N2_L3_Hybrid_Flujo = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n2_flujo_verde.png" opacity={0.45} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.7) 0%, rgba(4,6,8,0.9) 100%)" />
    <KodamaParticles count={15} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ElenxosLogo size={60} color="kodama" animated glow />
      <CinematicText text="Un solo flujo." level="h2" color="kodama" delayStep={0.06} style={{ fontSize: 58 }} />
      <Text size="md" color="muted" style={{ marginTop: 16, fontSize: 24, textAlign: 'center', lineHeight: 1.7 }}>
        Markdown académico + lógica formal + verificación + colaboración.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L3_Hybrid_Editor = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n2_editor_agora.png" opacity={0.5} blend="luminosity" overlay="linear-gradient(180deg, rgba(4,6,8,0.7) 0%, rgba(5,10,7,0.85) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="60%" blur={120} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <Badge variant="kodama" dot style={{ fontSize: 22, padding: '10px 28px' }}>Agora Editor</Badge>
      <CinematicText text="Escribe como" level="h2" delayStep={0.06} style={{ fontSize: 54 }} />
      <CinematicText text="piensas." level="h1" color="kodama" delayStep={0.1} baseDelay={0.9} style={{ fontSize: 78 }} />
    </div>
  </SocialCanvas>
);

export const N2_L3_Hybrid_Equipo = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n2_equipo_semillero.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,8,5,0.75) 0%, rgba(5,10,7,0.9) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <Text size="sm" color="kodama" style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase' }}>Para semilleros</Text>
      <CinematicText text="Tu equipo." level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="Un flujo." level="h2" color="kodama" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 56 }} />
      <CinematicText text="Sin friccón." level="h2" delayStep={0.06} baseDelay={1.6} style={{ fontSize: 56 }} />
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  NARRATIVA 2: SOLUCIÓN — LOTE 4: Rigor formal — Penrose + Fibonacci
// ═══════════════════════════════════════════════════════════════════

export const N2_L4_Post_Rigor = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060808' }} />
    <PenrosePattern density={10} color="kodama" animated />
    <FibonacciSpiral size={350} color="gold" animated />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <FormulaDisplay formula="∀x(P(x) → Q(x))" label="Tu argumento, formalizado" size="lg" color="kodama" />
      <CinematicText text="Rigor" level="h1" delayStep={0.1} style={{ fontSize: 72 }} />
      <CinematicText text="integrado." level="h1" color="kodama" delayStep={0.1} baseDelay={0.8} style={{ fontSize: 72 }} />
    </div>
  </SocialCanvas>
);

export const N2_L4_Post_Logica = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050508' }} />
    <TopologyMorph size={500} color="kodama" />
    <GlowOrb color="kodama" size={350} x="50%" y="50%" blur={100} opacity={0.08} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <IconSymbol symbol="∀" size={100} color="kodama" />
      <CinematicText text="Lógica formal" level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="en cada línea." level="h2" color="kodama" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 56 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        No es corrector. Es un motor de verificación lógica para tu argumento académico.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L4_Post_Motor = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#040608' }} />
    <GradientWave speed={15} />
    <QuantumParticle count={40} color="kodama" />
    <GlowOrb color="kodama" size={400} x="30%" y="40%" blur={120} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <Badge variant="kodama" dot pulse style={{ fontSize: 22, padding: '10px 28px' }}>Motor lógico</Badge>
      <CinematicText text="P → Q" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 96, letterSpacing: 12 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Tu argumento pasa por verificación formal. Si la lógica no sostiene, no es tesis.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L4_Reel_Rigor = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050808' }} />
    <PenrosePattern density={12} color="kodama" animated />
    <FibonacciSpiral size={400} color="kodama" animated />
    <GlowOrb color="kodama" size={600} x="50%" y="40%" blur={180} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '120px 80px', gap: 36 })}>
      <IconSymbol symbol="φ" size={100} color="warm" style={{ opacity: 0.8 }} />
      <CinematicText text="La academia" level="h1" delayStep={0.06} style={{ fontSize: 68 }} />
      <CinematicText text="necesita" level="h1" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 68 }} />
      <CinematicText text="rigor real." level="h1" color="kodama" delayStep={0.08} baseDelay={1.6} style={{ fontSize: 86 }} />
      <div style={{ height: 30 }} />
      <FormulaDisplay formula="∀x∃y(R(x,y) → V(y))" label="Cada argumento merece verificación" size="lg" color="kodama" />
    </div>
  </SocialCanvas>
);

export const N2_L4_Story_Formal = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060808' }} />
    <AuraBackground cinematicZoom />
    <GlowOrb color="kodama" size={500} x="50%" y="40%" blur={150} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 40 })}>
      <Text size="sm" color="kodama" style={{ fontSize: 22, letterSpacing: 8, textTransform: 'uppercase' }}>Agora verifica</Text>
      <ProofChain steps={[
        { text: 'Hipótesis', symbol: 'H' },
        { text: 'Premisas', symbol: 'P₁..Pₙ' },
        { text: 'Derivación', symbol: '⊢' },
        { text: 'Conclusión', symbol: '∴ Q' },
      ]} color="kodama" />
      <Text size="lg" color="muted" style={{ fontSize: 28, textAlign: 'center', maxWidth: '80%', lineHeight: 1.6, marginTop: 20 }}>
        Cada paso de tu argumento, formalizado y verificado.
      </Text>
    </div>
  </SocialCanvas>
);

export const N2_L4_Banner_Formal = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#060808' }} />
    <PenrosePattern density={6} color="kodama" animated />
    <GlowOrb color="kodama" size={300} x="50%" y="50%" blur={100} opacity={0.08} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={18} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '0 120px', flexDirection: 'row', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <FormulaDisplay formula="∀x(P(x) → Q(x))" label="" size="lg" color="kodama" />
      </div>
      <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <CinematicText text="Tu argumento," level="h3" delayStep={0.05} style={{ fontSize: 32 }} />
        <CinematicText text="verificado formalmente." level="h3" color="kodama" delayStep={0.05} baseDelay={0.5} style={{ fontSize: 32 }} />
      </div>
    </div>
  </SocialCanvas>
);

export const N2_L4_Banner_Motor = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #050808 0%, #040608 100%)' }} />
    <QuantumParticle count={30} color="kodama" />
    <GlowOrb color="kodama" size={300} x="80%" y="50%" blur={100} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={18} />
    <div style={abs({ padding: '0 100px', textAlign: 'center', gap: 8 })}>
      <CinematicText text="Motor de verificación lógica para la academia." level="h3" delayStep={0.04} style={{ fontSize: 32 }} />
      <Text size="sm" color="kodama" style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase' }}>
        Escribe. Formaliza. Verifica. → agora.elenxos.com
      </Text>
    </div>
  </SocialCanvas>
);

// ── Híbridos Lote 4 ──────────────────────────────────────────
export const N2_L4_Hybrid_Rigor = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n2_rigor_formal.png" opacity={0.45} blend="luminosity" overlay="linear-gradient(180deg, rgba(6,8,8,0.7) 0%, rgba(5,10,7,0.9) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.08} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <CinematicText text="Rigor que" level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="se demuestra." level="h2" color="kodama" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 56 }} />
      <FormulaDisplay formula="∀x(P(x) → Q(x))" label="Verificación formal" size="md" color="kodama" />
    </div>
  </SocialCanvas>
);

export const N2_L4_Hybrid_Pensar = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n2_pensar_profundo.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,5,8,0.75) 0%, rgba(5,10,7,0.9) 100%)" />
    <FibonacciSpiral size={300} color="kodama" animated />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <IconSymbol symbol="∴" size={80} color="kodama" />
      <CinematicText text="No organizamos" level="h2" delayStep={0.06} style={{ fontSize: 54 }} />
      <CinematicText text="archivos." level="h2" delayStep={0.06} baseDelay={0.7} style={{ fontSize: 54 }} />
      <CinematicText text="Organizamos" level="h2" color="kodama" delayStep={0.06} baseDelay={1.3} style={{ fontSize: 54 }} />
      <CinematicText text="pensamiento." level="h1" color="kodama" delayStep={0.08} baseDelay={2} style={{ fontSize: 72 }} />
    </div>
  </SocialCanvas>
);

export const N2_L4_Hybrid_CTA = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n2_cta_demo.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.7) 0%, rgba(4,6,8,0.9) 100%)" />
    <KodamaParticles count={20} />
    <GlowOrb color="kodama" size={400} x="50%" y="60%" blur={120} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ElenxosLogo size={60} color="kodama" animated glow />
      <CinematicText text="¿10 minutos" level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="para cambiar" level="h2" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 56 }} />
      <CinematicText text="cómo investigas?" level="h2" color="kodama" delayStep={0.06} baseDelay={1.6} style={{ fontSize: 56 }} />
      <div style={{ marginTop: 40, padding: '16px 48px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
        <Text size="lg" color="kodama" style={{ fontSize: 26, letterSpacing: 4, textTransform: 'uppercase' }}>Agenda una demo</Text>
      </div>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  NARRATIVA 3: ECOSISTEMA — "Tu semillero en Agora"
//  Escalón: Ecosistema — El futuro cooperativo
// ═══════════════════════════════════════════════════════════════════

// ── LOTE 5: Comunidad — QuantumParticle + GradientWave ──────
export const N3_L5_Post_Semillero = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <QuantumParticle count={60} color="kodama" />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <IconSymbol symbol="⊛" size={80} color="kodama" />
      <CinematicText text="Tu semillero" level="h1" delayStep={0.08} style={{ fontSize: 72 }} />
      <CinematicText text="en Agora." level="h1" color="kodama" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 72 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Todos escriben. Todos verifican. Todos construyen sobre lo anterior.
      </Text>
    </div>
  </SocialCanvas>
);

export const N3_L5_Post_Cooperar = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#040608' }} />
    <LogicMesh density={0.5} />
    <GradientWave speed={12} />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <CinematicText text="Investigación" level="h2" delayStep={0.07} style={{ fontSize: 56 }} />
      <CinematicText text="cooperativa." level="h2" color="kodama" delayStep={0.07} baseDelay={0.8} style={{ fontSize: 56 }} />
      <DialecticFlow thesis="Tú" antithesis="Tu equipo" synthesis="Conocimiento" color="kodama" />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 24, textAlign: 'center', lineHeight: 1.7 }}>
        No es solo tu tesis. Es el conocimiento que construyen juntos.
      </Text>
    </div>
  </SocialCanvas>
);

export const N3_L5_Post_Futuro = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050808' }} />
    <AuraBackground cinematicZoom />
    <KodamaParticles count={40} />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ElenxosLogo size={80} color="kodama" animated glow />
      <CinematicText text="El futuro" level="h2" delayStep={0.07} style={{ fontSize: 56 }} />
      <CinematicText text="de la academia" level="h2" delayStep={0.07} baseDelay={0.8} style={{ fontSize: 56 }} />
      <CinematicText text="es cooperativo." level="h2" color="kodama" delayStep={0.07} baseDelay={1.6} style={{ fontSize: 56 }} />
    </div>
  </SocialCanvas>
);

export const N3_L5_Reel_Vision = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <QuantumParticle count={50} color="kodama" />
    <GradientWave speed={10} />
    <GlowOrb color="kodama" size={600} x="50%" y="40%" blur={180} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '120px 80px', gap: 36 })}>
      <ElenxosLogo size={100} color="kodama" animated glow />
      <CinematicText text="Una plataforma." level="h1" delayStep={0.06} style={{ fontSize: 68 }} />
      <CinematicText text="Todos los" level="h1" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 68 }} />
      <CinematicText text="semilleros." level="h1" color="kodama" delayStep={0.08} baseDelay={1.6} style={{ fontSize: 86 }} />
      <div style={{ height: 30 }} />
      <StatsDisplay stats={[
        { value: '∀', label: 'Universidades' },
        { value: '∞', label: 'Conexiones' },
      ]} fontSize={56} />
    </div>
  </SocialCanvas>
);

export const N3_L5_Story_Unete = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <AuraBackground cinematicZoom />
    <KodamaParticles count={30} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 40 })}>
      <CinematicText text="Únete al" level="h1" delayStep={0.08} style={{ fontSize: 72 }} />
      <CinematicText text="ágora." level="h1" color="kodama" delayStep={0.1} baseDelay={0.8} style={{ fontSize: 96 }} />
      <div style={{ marginTop: 40, padding: '18px 52px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
        <Text size="lg" color="kodama" style={{ fontSize: 28, letterSpacing: 4, textTransform: 'uppercase' }}>agora.elenxos.com</Text>
      </div>
    </div>
  </SocialCanvas>
);

export const N3_L5_Banner_Ecosistema = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <QuantumParticle count={40} color="kodama" />
    <GlowOrb color="kodama" size={300} x="50%" y="50%" blur={100} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={18} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '0 120px', textAlign: 'center', gap: 8 })}>
      <CinematicText text="Investigación cooperativa para toda la academia." level="h3" delayStep={0.04} style={{ fontSize: 32 }} />
      <Text size="sm" color="kodama" style={{ fontSize: 18, letterSpacing: 6, textTransform: 'uppercase' }}>
        Tu semillero. Tu universidad. Tu ecosistema.
      </Text>
    </div>
  </SocialCanvas>
);

export const N3_L5_Banner_CTA = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #050A07 0%, #040608 50%, #050A07 100%)' }} />
    <GradientWave speed={15} />
    <KodamaParticles count={15} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-left" fontSize={18} />
    <div style={abs({ padding: '0 100px', flexDirection: 'row', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ElenxosLogo size={50} color="kodama" animated glow />
        <CinematicText text="AGORA" level="h2" color="kodama" delayStep={0.1} style={{ fontSize: 40, letterSpacing: 12 }} />
      </div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 8 }}>
        <Text size="md" color="muted" style={{ fontSize: 22 }}>Plataforma de investigación cooperativa</Text>
        <div style={{ padding: '10px 32px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
          <Text size="sm" color="kodama" style={{ fontSize: 18, letterSpacing: 4, textTransform: 'uppercase' }}>Conoce más</Text>
        </div>
      </div>
    </div>
  </SocialCanvas>
);

// ── Híbridos Lote 5 ──────────────────────────────────────────
export const N3_L5_Hybrid_Comunidad = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n3_comunidad_academica.png" opacity={0.45} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.7) 0%, rgba(4,6,8,0.9) 100%)" />
    <KodamaParticles count={15} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Plataforma de investigación cooperativa" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <CinematicText text="Tu conocimiento" level="h2" delayStep={0.06} style={{ fontSize: 54 }} />
      <CinematicText text="amplifica el" level="h2" delayStep={0.06} baseDelay={0.7} style={{ fontSize: 54 }} />
      <CinematicText text="de todos." level="h2" color="kodama" delayStep={0.08} baseDelay={1.3} style={{ fontSize: 54 }} />
    </div>
  </SocialCanvas>
);

export const N3_L5_Hybrid_Red = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n3_red_cooperativa.png" opacity={0.5} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,8,5,0.7) 0%, rgba(5,10,7,0.85) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.08} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <IconSymbol symbol="⊛" size={80} color="kodama" />
      <CinematicText text="Red de" level="h2" delayStep={0.06} style={{ fontSize: 56 }} />
      <CinematicText text="conocimiento." level="h2" color="kodama" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 56 }} />
      <Text size="md" color="muted" style={{ marginTop: 16, fontSize: 24, textAlign: 'center' }}>
        Cada semillero conectado. Cada investigación enriquecida.
      </Text>
    </div>
  </SocialCanvas>
);

export const N3_L5_Hybrid_Agora = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/campaign/n3_agora_futuro.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.7) 0%, rgba(5,10,7,0.9) 100%)" />
    <KodamaParticles count={20} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ElenxosLogo size={80} color="kodama" animated glow />
      <CinematicText text="AGORA" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 96, letterSpacing: 20 }} />
      <Text size="md" color="muted" style={{ marginTop: 16, fontSize: 26, letterSpacing: 6, textTransform: 'uppercase' }}>
        Plataforma de investigación cooperativa
      </Text>
    </div>
  </SocialCanvas>
);
