import React from 'react';
import { SocialCanvas } from '../components/SocialCanvas/SocialCanvas';
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
import { ElenxosLogo } from '../components/ElenxosLogo/ElenxosLogo';
import { DialecticFlow } from '../components/DialecticFlow/DialecticFlow';
import { GlitchText } from '../components/GlitchText/GlitchText';
import { TopologyMorph } from '../components/TopologyMorph/TopologyMorph';
import { FormulaDisplay } from '../components/FormulaDisplay/FormulaDisplay';
import { OuroborosLoader } from '../components/OuroborosLoader/OuroborosLoader';
import { HexGrid } from '../components/HexGrid/HexGrid';
import { QuantumParticle } from '../components/QuantumParticle/QuantumParticle';
import { ProofChain } from '../components/ProofChain/ProofChain';

const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// ═══════════════════════════════════════════════════════════════
//  BANNERS EXPANDIDOS (3:1) — LinkedIn / Twitter headers
// ═══════════════════════════════════════════════════════════════

// B04. MATRIX BANNER — Lluvia de caracteres full width
export const B04_MatrixBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#020402' }} />
    <MatrixRain columns={18} charset="greek" color="kodama" speed={1.5} />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={12} />
    <div style={abs({ padding: '0 140px', textAlign: 'center', gap: 8 })}>
      <ElenxosLogo size={80} color="kodama" animated glow />
      <CinematicText text="ELENXOS" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 64, letterSpacing: 20 }} />
    </div>
  </SocialCanvas>
);

// B05. FIBONACCI BANNER — Espiral extendida horizontal
export const B05_FibBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <FibonacciSpiral size={400} color="gold" animated />
    <GlowOrb color="warm" size={300} x="30%" y="50%" blur={80} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} />
    <div style={abs({ padding: '0 100px', flexDirection: 'row', gap: 60 })}>
      <div style={{ flex: 1 }} />
      <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <FormulaDisplay formula="φ = 1.618033..." label="Proporción divina" size="lg" color="gold" />
        <Text size="md" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase', textAlign: 'center' }}>
          La matemática oculta en la belleza
        </Text>
      </div>
    </div>
  </SocialCanvas>
);

// B06. GLITCH BANNER — Error estético
export const B06_GlitchBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0505' }} />
    <ScanLines heavy />
    <GlowOrb color="mask" size={400} x="50%" y="50%" blur={100} opacity={0.12} />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={12} />
    <div style={abs({ padding: '0 100px', textAlign: 'center', gap: 8 })}>
      <GlitchText text="SISTEMA COMPROMETIDO" level="h2" intensity="subtle" color="mask" />
      <Text size="md" color="muted" style={{ letterSpacing: 6 }}>
        Actualización epistémica en progreso...
      </Text>
    </div>
  </SocialCanvas>
);

// B07. HEX NETWORK — Red hexagonal con topología
export const B07_HexNetwork = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <HexGrid cols={12} rows={3} size={35} color="kodama" />
    <QuantumParticle count={8} color="kodama" entangled />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} />
    <div style={abs({ padding: '0 120px', textAlign: 'center', gap: 8 })}>
      <CinematicText text="Red de Conocimiento" level="h2" color="kodama" delayStep={0.06} style={{ fontSize: 48 }} />
      <Text size="md" color="muted" style={{ letterSpacing: 8, textTransform: 'uppercase' }}>
        847 instituciones · 23 países · 2.4M nodos epistémicos
      </Text>
    </div>
  </SocialCanvas>
);

// B08. PENROSE BANNER — Teselas panorámicas
export const B08_PenroseBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#050505' }} />
    <PenrosePattern density={20} color="kodama" animated />
    <GlowOrb color="kodama" size={300} x="50%" y="50%" blur={80} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={12} />
    <div style={abs({ padding: '0 140px', textAlign: 'center', gap: 4 })}>
      <CinematicText text="ORDEN APERIÓDICO" level="h2" delayStep={0.08} style={{ fontSize: 44, letterSpacing: 8 }} />
      <Text size="md" color="kodama" style={{ letterSpacing: 6 }}>Estructura sin repetición</Text>
    </div>
  </SocialCanvas>
);

// B09. DIALECTIC BANNER — Flujo dialéctico horizontal
export const B09_DialecticBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #0A0505, #080E0B, #050A0F)' }} />
    <GlowOrb color="mask" size={300} x="15%" y="50%" blur={80} opacity={0.12} />
    <GlowOrb color="kodama" size={300} x="85%" y="50%" blur={80} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} />
    <div style={abs({ padding: '0 80px', gap: 16 })}>
      <DialecticFlow thesis="Problema" antithesis="Crítica" synthesis="Solución" color="kodama" />
      <Text size="md" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase' }}>
        El método Elenxos: pensamiento dialéctico aplicado
      </Text>
    </div>
  </SocialCanvas>
);

// B10. PROOF BANNER — Axiomas en panorámico
export const B10_ProofBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <LogicMesh density={60} />
    <GlowOrb color="kodama" size={200} x="50%" y="50%" blur={60} opacity={0.1} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="top-left" fontSize={12} />
    <div style={abs({ padding: '0 80px', flexDirection: 'row', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormulaDisplay formula="∀x(Px → Qx)" label="Modus Ponens" size="lg" color="kodama" />
      </div>
      <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(163,228,215,0.2), transparent)', alignSelf: 'stretch', margin: '30px 0' }} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormulaDisplay formula="Px ∴ Qx" label="Conclusión" size="lg" color="kodama" />
      </div>
    </div>
  </SocialCanvas>
);

// B11. QUANTUM BANNER — Partículas entrelazadas
export const B11_QuantumBanner = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B10' }} />
    <QuantumParticle count={15} color="mixed" entangled />
    <GlowOrb color="kodama" size={200} x="30%" y="50%" blur={60} opacity={0.1} />
    <GlowOrb color="mask" size={200} x="70%" y="50%" blur={60} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={12} />
    <div style={abs({ padding: '0 120px', textAlign: 'center', gap: 8 })}>
      <FormulaDisplay formula="|ψ⟩ = α|0⟩ + β|1⟩" label="Estado cuántico" size="lg" color="kodama" />
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
//  REELS EXPANDIDOS (9:16) — Instagram Reels / TikTok / Stories
// ═══════════════════════════════════════════════════════════════

// R03. GÖDEL REEL — Incompletitud dramática
export const R03_GodelReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A12' }} />
    <GlowOrb color="mask" size={500} x="50%" y="30%" blur={120} opacity={0.15} />
    <ScanLines />
    <FrameOverlay variant="mask" />
    <BrandMark position="center-bottom" fontSize={14} />
    <div style={abs({ padding: '120px 70px', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
        <CinematicText text="Todo sistema" level="h2" color="muted" delayStep={0.08} style={{ fontSize: 56 }} />
        <CinematicText text="tiene un" level="h2" delayStep={0.08} baseDelay={1} style={{ fontSize: 56 }} />
        <CinematicText text="LÍMITE." level="h2" color="mask" delayStep={0.12} baseDelay={2} style={{ fontSize: 72 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
        <FormulaDisplay formula="F ⊬ G" size="lg" color="mask" />
        <CinematicText text="Gödel, 1931" level="h3" color="muted" delayStep={0.06} baseDelay={4} style={{ fontSize: 36, letterSpacing: 4 }} />
      </div>
      <div style={{ flex: 0.3 }} />
    </div>
  </SocialCanvas>
);

// R04. FIBONACCI REEL — Espiral vertical
export const R04_FibReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <FibonacciSpiral size={600} color="kodama" animated />
    <GlowOrb color="kodama" size={400} x="50%" y="40%" blur={100} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} tagline="Serie: Matemáticas" />
    <div style={abs({ padding: '100px 60px', gap: 20, justifyContent: 'flex-end', paddingBottom: 180 })}>
      <CinematicText text="1" level="h2" color="muted" delayStep={0.1} baseDelay={0} style={{ fontSize: 48 }} />
      <CinematicText text="1, 2, 3" level="h2" color="muted" delayStep={0.06} baseDelay={0.5} style={{ fontSize: 48 }} />
      <CinematicText text="5, 8, 13" level="h2" delayStep={0.06} baseDelay={1.2} style={{ fontSize: 56 }} />
      <CinematicText text="21, 34, 55..." level="h2" color="kodama" delayStep={0.05} baseDelay={2} style={{ fontSize: 64 }} />
      <FormulaDisplay formula="φ" label="La proporción divina" size="xl" color="gold" />
    </div>
  </SocialCanvas>
);

// R05. MATRIX REEL — Caída dramática
export const R05_MatrixReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#020402' }} />
    <MatrixRain columns={10} charset="kanji" color="kodama" speed={2} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={14} />
    <div style={abs({ padding: '120px 70px', gap: 60 })}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ElenxosLogo size={180} color="kodama" animated glow />
      </div>
      <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
        <CinematicText text="¿Qué es" level="h2" color="muted" delayStep={0.1} baseDelay={1} style={{ fontSize: 52 }} />
        <CinematicText text="la realidad?" level="h2" color="kodama" delayStep={0.1} baseDelay={2} style={{ fontSize: 64 }} />
      </div>
      <div style={{ flex: 0.5 }} />
    </div>
  </SocialCanvas>
);

// R06. PROOF REEL — Demostración paso a paso
export const R06_ProofReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={100} opacity={0.1} />
    <LogicMesh density={40} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} tagline="Serie: Lógica" />
    <div style={abs({ padding: '120px 50px', gap: 20, alignItems: 'flex-start' })}>
      <Text size="md" color="kodama" style={{ letterSpacing: 6, textTransform: 'uppercase', alignSelf: 'center' }}>Demostración Formal</Text>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <ProofChain
          color="kodama"
          steps={[
            { symbol: 'H1', text: 'Toda verdad necesita fundamento' },
            { symbol: 'H2', text: 'Los fundamentos requieren método' },
            { symbol: 'L1', text: 'El método es iterativo (H1, H2)' },
            { symbol: 'L2', text: 'La iteración genera conocimiento' },
            { symbol: 'L3', text: 'El conocimiento transforma' },
            { symbol: '∴', text: 'El método transforma la verdad ∎' },
          ]}
        />
      </div>
    </div>
  </SocialCanvas>
);

// R07. DIALECTIC REEL — Proceso dialéctico visual
export const R07_DialecticReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0505, #050A07, #050A0F)' }} />
    <GlowOrb color="mask" size={400} x="50%" y="20%" blur={100} opacity={0.12} />
    <GlowOrb color="kodama" size={400} x="50%" y="80%" blur={100} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={14} />
    <div style={abs({ padding: '120px 60px', gap: 30 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
        <CinematicText text="TESIS" level="h1" color="mask" delayStep={0.15} style={{ fontSize: 72 }} />
        <Text size="lg" color="secondary">La academia es suficiente</Text>
      </div>
      <div style={{ width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', alignSelf: 'center' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
        <CinematicText text="ANTÍTESIS" level="h1" color="kodama" delayStep={0.1} baseDelay={2} style={{ fontSize: 72 }} />
        <Text size="lg" color="secondary">La academia necesita reinventarse</Text>
      </div>
      <div style={{ width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', alignSelf: 'center' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
        <GlitchText text="SÍNTESIS" level="h1" intensity="subtle" color="white" />
        <CinematicText text="Elenxos" level="h2" color="kodama" delayStep={0.15} baseDelay={5} style={{ fontSize: 56 }} />
      </div>
    </div>
  </SocialCanvas>
);

// R08. QUANTUM REEL — Partículas y superposición
export const R08_QuantumReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B10' }} />
    <QuantumParticle count={12} color="mixed" entangled />
    <GlowOrb color="kodama" size={300} x="40%" y="30%" blur={80} opacity={0.15} />
    <GlowOrb color="mask" size={300} x="60%" y="70%" blur={80} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} tagline="Serie: Cuántica" />
    <div style={abs({ padding: '120px 60px', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
        <CinematicText text="Observar" level="h1" color="muted" delayStep={0.1} style={{ fontSize: 64 }} />
        <CinematicText text="es" level="h2" color="muted" delayStep={0.15} baseDelay={1} style={{ fontSize: 48 }} />
        <CinematicText text="crear." level="h1" color="kodama" delayStep={0.15} baseDelay={2} style={{ fontSize: 80 }} />
      </div>
      <div style={{ flex: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormulaDisplay formula="|ψ⟩ → |0⟩ ∨ |1⟩" label="Colapso de función de onda" size="lg" color="kodama" />
      </div>
      <div style={{ flex: 0.5 }} />
    </div>
  </SocialCanvas>
);

// R09. NIETZSCHE REEL — Eterno retorno vertical
export const R09_NietzscheReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0505' }} />
    <GlowOrb color="mask" size={500} x="50%" y="50%" blur={140} opacity={0.15} />
    <ScanLines heavy />
    <FrameOverlay variant="mask" />
    <BrandMark position="center-bottom" fontSize={14} />
    <div style={abs({ padding: '120px 70px', gap: 40 })}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <OuroborosLoader size={200} color="mask" speed="slow" />
      </div>
      <div style={{ flex: 1.5, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
        <CinematicText text="¿Vivirías" level="h2" color="muted" delayStep={0.08} baseDelay={1} style={{ fontSize: 56 }} />
        <CinematicText text="esta vida" level="h2" delayStep={0.08} baseDelay={2} style={{ fontSize: 56 }} />
        <CinematicText text="una vez más?" level="h2" color="mask" delayStep={0.08} baseDelay={3} style={{ fontSize: 64 }} />
        <Text size="lg" color="muted" style={{ marginTop: 20, letterSpacing: 4 }}>ETERNO RETORNO</Text>
      </div>
      <div style={{ flex: 0.3 }} />
    </div>
  </SocialCanvas>
);

// R10. CHAOS REEL — Atractor visual
export const R10_ChaosReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
    <TopologyMorph count={6} size={60} color="mixed" />
    <GradientWave speed={15} />
    <QuantumParticle count={10} color="mixed" />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={12} />
    <div style={abs({ padding: '120px 60px', gap: 30 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
        <CinematicText text="Del" level="h2" color="muted" delayStep={0.1} style={{ fontSize: 48 }} />
        <CinematicText text="CAOS" level="hero" color="mask" delayStep={0.2} baseDelay={0.5} style={{ fontSize: 120, letterSpacing: 12 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 16 }}>
        <CinematicText text="al" level="h2" color="muted" delayStep={0.1} baseDelay={2.5} style={{ fontSize: 48 }} />
        <CinematicText text="ORDEN" level="hero" color="kodama" delayStep={0.2} baseDelay={3} style={{ fontSize: 120, letterSpacing: 12 }} />
      </div>
      <div style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormulaDisplay formula="dx/dt = σ(y−x)" label="Lorenz" size="lg" color="gold" />
      </div>
    </div>
  </SocialCanvas>
);

// R11. SPINOZA REEL — Deus sive Natura
export const R11_SpinozaReel = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <AuraBackground cinematicZoom />
    <KodamaParticles count={60} relative />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={14} />
    <div style={abs({ padding: '120px 60px', gap: 30 })}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconSymbol symbol="◎" size={200} color="kodama" style={{ opacity: 0.6 }} />
      </div>
      <div style={{ flex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
        <CinematicText text="Deus" level="h1" color="kodama" delayStep={0.15} baseDelay={0.5} style={{ fontSize: 72, fontStyle: 'italic' }} />
        <CinematicText text="sive" level="h2" color="muted" delayStep={0.1} baseDelay={1.5} style={{ fontSize: 42, letterSpacing: 8 }} />
        <CinematicText text="Natura" level="h1" color="kodama" delayStep={0.15} baseDelay={2.5} style={{ fontSize: 72, fontStyle: 'italic' }} />
        <Text size="lg" color="muted" style={{ marginTop: 30, letterSpacing: 4 }}>SPINOZA · ÉTICA</Text>
      </div>
      <div style={{ flex: 0.3 }} />
    </div>
  </SocialCanvas>
);
