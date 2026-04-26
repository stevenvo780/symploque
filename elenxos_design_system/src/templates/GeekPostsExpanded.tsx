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

// Nuevos componentes geek
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
//  SERIES: FILOSOFÍA — Posts 1:1
// ═══════════════════════════════════════════════════════════════

// P01. SÓCRATES — Dialéctica y mayéutica
export const P01_Socrates = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <HexGrid cols={5} rows={5} size={50} color="muted" />
    <GlowOrb color="kodama" size={400} x="50%" y="40%" blur={120} opacity={0.15} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <IconSymbol symbol="Σ" size={120} color="kodama" style={{ opacity: 0.7 }} />
      <QuoteCard
        quote="Solo sé que no sé nada."
        author="Sócrates"
        fontSize={44}
      />
      <DialecticFlow thesis="Ignorancia" antithesis="Pregunta" synthesis="Sabiduría" color="kodama" />
    </div>
  </SocialCanvas>
);

// P02. WITTGENSTEIN — Límites del lenguaje
export const P02_Wittgenstein = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0505 0%, #0F0F1A 100%)' }} />
    <MatrixRain columns={12} charset="logic" color="amber" speed={1.5} />
    <FrameOverlay variant="mask" />
    <ScanLines />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '100px 80px', gap: 20 })}>
      <QuoteCard
        quote="Los límites de mi lenguaje son los límites de mi mundo."
        author="Ludwig Wittgenstein"
        fontSize={38}
      />
      <FormulaDisplay formula="P ∧ ¬P → ⊥" label="Principio de no contradicción" size="lg" color="white" />
    </div>
  </SocialCanvas>
);

// P03. HEIDEGGER — Aletheia (desocultamiento)
export const P03_Heidegger = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <AuraBackground />
    <TopologyMorph count={7} size={70} color="kodama" />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={12} tagline="Serie: Aletheia" />
    <div style={abs({ padding: '90px 70px', gap: 30 })}>
      <CinematicText text="ἀλήθεια" level="h1" color="kodama" delayStep={0.15} style={{ fontSize: 72, fontStyle: 'italic' }} />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', lineHeight: 1.8, maxWidth: '80%' }}>
        El desocultamiento del Ser. La verdad no como correspondencia sino como revelación.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 6 }}>MARTIN HEIDEGGER</Text>
    </div>
  </SocialCanvas>
);

// P04. DELEUZE — Rizoma y multiplicidad
export const P04_Deleuze = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <LogicMesh density={150} />
    <KodamaParticles count={60} relative />
    <GlowOrb color="kodama" size={300} x="30%" y="60%" blur={80} opacity={0.2} />
    <GlowOrb color="mask" size={200} x="70%" y="30%" blur={70} opacity={0.15} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 16 })}>
      <CinematicText text="RIZOMA" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 80, letterSpacing: 12 }} />
      <Text size="xl" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        No hay estructura, solo multiplicidades. No hay raíz, solo conexiones.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 4 }}>DELEUZE & GUATTARI</Text>
    </div>
  </SocialCanvas>
);

// P05. NIETZSCHE — Eterno retorno
export const P05_Nietzsche = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0505' }} />
    <GlowOrb color="mask" size={500} x="50%" y="50%" blur={140} opacity={0.2} />
    <ScanLines heavy />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <OuroborosLoader size={120} color="mask" speed="slow" />
      <QuoteCard
        quote="Y si un día o una noche un demonio te siguiera... ¿te arrojarías al suelo y maldecirías, o le responderías: 'eres un dios'?"
        author="Friedrich Nietzsche"
        fontSize={42}
      />
    </div>
  </SocialCanvas>
);

// P06. FOUCAULT — Panóptico digital
export const P06_Foucault = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
    <MatrixRain columns={12} charset="binary" color="kodama" speed={2} />
    <GridPattern variant="perspective" gap={30} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <GlitchText text="VIGILAR" level="h1" intensity="medium" color="mask" />
      <Text size="xl" color="muted" style={{ letterSpacing: 8 }}>Y CASTIGAR</Text>
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '80%', lineHeight: 1.7, marginTop: 20 }}>
        El poder no se posee, se ejerce. La vigilancia como tecnología del saber.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 4 }}>MICHEL FOUCAULT</Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
//  SERIES: MATEMÁTICAS — Posts 1:1
// ═══════════════════════════════════════════════════════════════

// P07. FIBONACCI — Proporción áurea
export const P07_Fibonacci = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <FibonacciSpiral size={450} color="kodama" animated />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 16, justifyContent: 'flex-end', paddingBottom: 140 })}>
      <FormulaDisplay formula="φ = (1 + √5) / 2" label="Número áureo" size="xl" color="gold" />
      <Text size="md" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase' }}>Serie: Belleza Matemática</Text>
    </div>
  </SocialCanvas>
);

// P08. GÖDEL — Teorema de incompletitud
export const P08_Godel = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A12' }} />
    <GlowOrb color="mask" size={400} x="50%" y="50%" blur={100} opacity={0.12} />
    <FrameOverlay variant="mask" />
    <ScanLines />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <GlitchText text="INCOMPLETITUD" level="h2" intensity="subtle" color="mask" />
      <FormulaDisplay formula="∃G : F ⊬ G ∧ F ⊬ ¬G" label="Primer teorema de Gödel" size="lg" color="mask" />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', lineHeight: 1.7, marginTop: 10 }}>
        Todo sistema formal suficientemente expresivo contiene proposiciones verdaderas que no puede demostrar.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 4 }}>KURT GÖDEL, 1931</Text>
    </div>
  </SocialCanvas>
);

// P09. EULER — La identidad más bella
export const P09_Euler = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #060B08, #0F2519)' }} />
    <HexGrid cols={4} rows={4} size={60} color="kodama" />
    <GlowOrb color="kodama" size={350} x="50%" y="45%" blur={100} opacity={0.18} />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={12} />
    <div style={abs({ padding: '80px', gap: 30 })}>
      <FormulaDisplay formula="e^(iπ) + 1 = 0" label="Identidad de Euler" size="xl" color="kodama" />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '80%', lineHeight: 1.7 }}>
        Cinco constantes fundamentales. Una sola ecuación. La fórmula más bella de las matemáticas.
      </Text>
    </div>
  </SocialCanvas>
);

// P10. PENROSE — Teselas aperiódicas
export const P10_Penrose = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <PenrosePattern density={30} color="kodama" animated />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <CinematicText text="APERIÓDICO" level="h1" delayStep={0.1} style={{ fontSize: 68, letterSpacing: 8 }} />
      <Text size="xl" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Orden sin repetición. Patrones que cubren el plano infinito sin jamás repetirse.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 4 }}>ROGER PENROSE</Text>
    </div>
  </SocialCanvas>
);

// P11. CANTOR — Infinitos dentro de infinitos
export const P11_Cantor = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
    <GlowOrb color="kodama" size={200} x="50%" y="30%" blur={60} opacity={0.1} />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={100} opacity={0.08} />
    <GlowOrb color="kodama" size={600} x="50%" y="50%" blur={140} opacity={0.06} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <IconSymbol symbol="∞" size={180} color="kodama" style={{ opacity: 0.8 }} />
      <FormulaDisplay formula="ℵ₀ < ℵ₁ < ℵ₂ < ..." label="Jerarquía de cardinales" size="lg" color="kodama" />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Hay infinitos más grandes que otros. El paraíso que Cantor creó para nosotros.
      </Text>
    </div>
  </SocialCanvas>
);

// P12. TURING — Máquina universal
export const P12_Turing = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#040804' }} />
    <MatrixRain columns={10} charset="binary" color="kodama" speed={1} />
    <GridPattern variant="lines" gap={50} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <FormulaDisplay formula="λf.(λx.f(x x))(λx.f(x x))" label="Combinador Y" size="lg" color="kodama" />
      <CinematicText text="COMPUTABLE" level="h2" color="kodama" delayStep={0.08} style={{ fontSize: 56, letterSpacing: 6 }} />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '80%' }}>
        ¿Puede una máquina pensar? La pregunta que fundó la era digital.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 4 }}>ALAN TURING, 1936</Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
//  SERIES: LÓGICA & TEORÍA DE CONJUNTOS — Posts 1:1
// ═══════════════════════════════════════════════════════════════

// P13. CADENA DE PRUEBA — Lógica formal visual
export const P13_ProofVisual = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <GlowOrb color="kodama" size={300} x="20%" y="50%" blur={80} opacity={0.12} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px 60px', gap: 20, alignItems: 'flex-start' })}>
      <Text size="md" color="kodama" style={{ letterSpacing: 6, textTransform: 'uppercase' }}>Demostración Formal</Text>
      <ProofChain
        color="kodama"
        steps={[
          { symbol: '∵', text: 'Todo ser racional busca la verdad' },
          { symbol: '∧', text: 'La verdad requiere método' },
          { symbol: '⇒', text: 'Todo ser racional necesita método' },
          { symbol: '∴', text: 'Elenxos es necesario ∎' },
        ]}
      />
    </div>
  </SocialCanvas>
);

// P14. VENN — Intersecciones de saber
export const P14_Venn = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <TopologyMorph count={3} size={200} color="mixed" />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <CinematicText text="∩" level="hero" color="kodama" delayStep={0.3} style={{ fontSize: 200, opacity: 0.6 }} />
      <CinematicText text="Intersecciones" level="h2" delayStep={0.08} style={{ fontSize: 48 }} />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%' }}>
        Donde la filosofía, las matemáticas y la tecnología convergen.
      </Text>
    </div>
  </SocialCanvas>
);

// P15. SET THEORY — Axioma de elección
export const P15_SetTheory = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#0A0A12' }} />
    <HexGrid cols={6} rows={6} size={35} color="mixed" />
    <GlowOrb color="mask" size={300} x="50%" y="50%" blur={100} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="top-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <FormulaDisplay formula="∀𝒳 [∅ ∉ 𝒳 → ∃f: 𝒳 → ⋃𝒳]" label="Axioma de Elección" size="lg" color="mask" />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        De cada colección de conjuntos no vacíos, podemos elegir exactamente un elemento. ¿Obvio? Depende de a quién preguntes.
      </Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
//  SERIES: CIENCIA & COMPLEJIDAD — Posts 1:1
// ═══════════════════════════════════════════════════════════════

// P16. ENTROPÍA — Termodinámica del conocimiento
export const P16_Entropia = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050505' }} />
    <QuantumParticle count={12} color="mixed" entangled />
    <GlowOrb color="mask" size={500} x="50%" y="50%" blur={150} opacity={0.1} />
    <ScanLines />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <FormulaDisplay formula="S = k_B ln Ω" label="Entropía de Boltzmann" size="lg" color="mask" />
      <CinematicText text="ENTROPÍA" level="h2" color="mask" delayStep={0.1} style={{ fontSize: 56 }} />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%' }}>
        El desorden crece. Solo el pensamiento riguroso puede revertirlo localmente.
      </Text>
    </div>
  </SocialCanvas>
);

// P17. CUÁNTICA — Superposición
export const P17_Cuantica = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B10' }} />
    <QuantumParticle count={14} color="kodama" entangled />
    <GlowOrb color="kodama" size={300} x="40%" y="40%" blur={80} opacity={0.15} />
    <GlowOrb color="mask" size={200} x="60%" y="60%" blur={70} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <FormulaDisplay formula="|ψ⟩ = α|0⟩ + β|1⟩" label="Superposición cuántica" size="lg" color="kodama" />
      <Text size="md" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', lineHeight: 1.7 }}>
        Ni esto ni aquello. Ambos a la vez. Hasta que observas.
      </Text>
    </div>
  </SocialCanvas>
);

// P18. CAOS — Efecto mariposa
export const P18_Caos = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080808' }} />
    <GradientWave speed={20} />
    <TopologyMorph count={5} size={50} color="mixed" />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <FormulaDisplay formula="dx/dt = σ(y − x)" label="Atractor de Lorenz" size="lg" color="gold" />
      <CinematicText text="CAOS" level="h1" color="mask" delayStep={0.15} style={{ fontSize: 90, letterSpacing: 16 }} />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%' }}>
        Determinismo sensible a condiciones iniciales. El orden oculto en el desorden.
      </Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════
//  SERIES: PRODUCTO & MARCA — Posts 1:1
// ═══════════════════════════════════════════════════════════════

// P19. LOGO HERO — Logo animado central
export const P19_LogoHero = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <HexGrid cols={4} rows={4} size={70} color="kodama" />
    <GlowOrb color="kodama" size={400} x="50%" y="45%" blur={120} opacity={0.15} />
    <FrameOverlay variant="double" />
    <div style={abs({ padding: '80px', gap: 30 })}>
      <ElenxosLogo size={200} color="kodama" animated glow />
      <CinematicText text="ELENXOS" level="h1" color="kodama" delayStep={0.15} style={{ fontSize: 72, letterSpacing: 20 }} />
      <Text size="md" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase' }}>
        Sistemas complejos · Software académico
      </Text>
    </div>
  </SocialCanvas>
);

// P20. PRODUCT LAUNCH — Lanzamiento con glitch
export const P20_Launch = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AuraBackground />
    <MatrixRain columns={10} charset="greek" color="kodama" speed={1} />
    <KodamaParticles count={40} relative />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <Badge variant="kodama" dot pulse style={{ marginBottom: 10 }}>Nuevo Release</Badge>
      <GlitchText text="LEXIS v4" level="h1" intensity="subtle" color="kodama" />
      <Text size="md" color="secondary" style={{ textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Motor fenomenológico de cuarta generación. Procesamiento de 500K nodos epistémicos.
      </Text>
      <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
        <StatsDisplay stats={[{ value: '4x', label: 'Más rápido' }]} fontSize={48} />
        <StatsDisplay stats={[{ value: '99.7%', label: 'Precisión' }]} fontSize={48} delay={0.5} />
      </div>
    </div>
  </SocialCanvas>
);

// P21. MATRIX RAIN — Pure aesthetic
export const P21_MatrixPure = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#020402' }} />
    <MatrixRain columns={15} charset="kanji" color="kodama" speed={2} />
    <GlowOrb color="kodama" size={300} x="50%" y="50%" blur={100} opacity={0.08} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={14} tagline="Despierta" />
    <div style={abs({ padding: '80px' })}>
      <ElenxosLogo size={160} color="kodama" animated glow />
    </div>
  </SocialCanvas>
);

// P22. DIALECTIC PROCESS — Tesis/Antítesis visual
export const P22_DialecticVisual = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0505 0%, #050A0F 100%)' }} />
    <GlowOrb color="mask" size={300} x="25%" y="40%" blur={80} opacity={0.15} />
    <GlowOrb color="kodama" size={300} x="75%" y="60%" blur={80} opacity={0.15} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '80px', gap: 30 })}>
      <CinematicText text="AUFHEBUNG" level="h1" delayStep={0.12} style={{ fontSize: 64, letterSpacing: 6 }} />
      <DialecticFlow
        thesis="Ser"
        antithesis="Nada"
        synthesis="Devenir"
        color="kodama"
      />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%', marginTop: 10 }}>
        La superación dialéctica: negar, conservar y elevar en un solo movimiento.
      </Text>
      <Text size="md" color="muted" style={{ letterSpacing: 4 }}>G.W.F. HEGEL</Text>
    </div>
  </SocialCanvas>
);

// P23. FIBONACCI NATURE — Espiral + stats
export const P23_FibNature = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <FibonacciSpiral size={500} color="gold" animated />
    <GlowOrb color="warm" size={400} x="40%" y="40%" blur={100} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-right" fontSize={11} />
    <div style={abs({ padding: '80px', justifyContent: 'flex-end', paddingBottom: 120, gap: 16 })}>
      <CinematicText text="1, 1, 2, 3, 5, 8, 13, 21..." level="h3" color="kodama" delayStep={0.04} style={{ fontSize: 32, fontFamily: 'JetBrains Mono, monospace' }} />
      <Text size="lg" color="secondary" style={{ textAlign: 'center', maxWidth: '85%' }}>
        La secuencia que la naturaleza usa como plano arquitectónico.
      </Text>
    </div>
  </SocialCanvas>
);

// P24. PENROSE DEEP — Teselas con cita
export const P24_PenroseDeep = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050505' }} />
    <PenrosePattern density={25} color="mask" animated />
    <GlowOrb color="mask" size={300} x="50%" y="50%" blur={80} opacity={0.1} />
    <FrameOverlay variant="mask" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '100px 80px', gap: 16 })}>
      <QuoteCard
        quote="La mente no es algorítmica. La conciencia requiere algo más que computación."
        author="Roger Penrose"
        fontSize={42}
      />
    </div>
  </SocialCanvas>
);

// P25. SPINOZA — Sustancia y modos
export const P25_Spinoza = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <GradientWave speed={30} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.1} />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={12} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <IconSymbol symbol="◎" size={100} color="kodama" style={{ opacity: 0.6 }} />
      <QuoteCard
        quote="Deus sive Natura — Dios, es decir, la Naturaleza."
        author="Baruch Spinoza"
        fontSize={42}
      />
      <ProofChain
        color="gold"
        steps={[
          { symbol: 'D1', text: 'La sustancia es causa de sí' },
          { symbol: 'P1', text: 'Solo existe una sustancia' },
          { symbol: '∴', text: 'Dios = Naturaleza ∎' },
        ]}
      />
    </div>
  </SocialCanvas>
);

// P26. STATS DASHBOARD — Métricas con quantum
export const P26_Dashboard = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <HexGrid cols={5} rows={5} size={45} color="muted" />
    <QuantumParticle count={10} color="kodama" />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-left" fontSize={11} />
    <div style={abs({ padding: '60px', gap: 30 })}>
      <Text size="md" color="kodama" style={{ letterSpacing: 6, textTransform: 'uppercase' }}>Elenxos Analytics Q4</Text>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, width: '100%' }}>
        <StatsDisplay stats={[{ value: '2.4M', label: 'Nodos procesados' }]} fontSize={56} />
        <StatsDisplay stats={[{ value: '847', label: 'Instituciones' }]} fontSize={56} delay={0.3} />
        <StatsDisplay stats={[{ value: '99.2%', label: 'Uptime' }]} fontSize={56} delay={0.6} />
        <StatsDisplay stats={[{ value: '23ms', label: 'Latencia' }]} fontSize={56} delay={0.9} />
      </div>
    </div>
  </SocialCanvas>
);
