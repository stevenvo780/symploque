import { Heading, Text } from './components/Typography/Typography';
import { Divider } from './components/Divider/Divider';
import { Badge } from './components/Badge/Badge';

// Original templates
import { SocialBannerExample } from './templates/SocialBannerExample';
import { SocialPostExample } from './templates/SocialPostExample';
import { SocialReelExample } from './templates/SocialReelExample';

// Post variations
import { V1_Micelio, V2_CitaRoja, V3_Perspectiva, V4_Glass, V5_Simbolo, V6_DatosSplit, V7_Pregunta, V8_Proximamente } from './templates/PostVariations';

// Banner & Reel variations
import { B1_Minimal, B2_Denso, B3_Conferencia, R1_Manifiesto, R2_Simbolo } from './templates/MoreVariations';

// Geek expanded posts
import {
  P01_Socrates, P02_Wittgenstein, P03_Heidegger, P04_Deleuze,
  P05_Nietzsche, P06_Foucault, P07_Fibonacci, P08_Godel,
  P09_Euler, P10_Penrose, P11_Cantor, P12_Turing,
  P13_ProofVisual, P14_Venn, P15_SetTheory,
  P16_Entropia, P17_Cuantica, P18_Caos,
  P19_LogoHero, P20_Launch, P21_MatrixPure,
  P22_DialecticVisual, P23_FibNature, P24_PenroseDeep,
  P25_Spinoza, P26_Dashboard,
} from './templates/GeekPostsExpanded';

// Geek expanded banners & reels
import {
  B04_MatrixBanner, B05_FibBanner, B06_GlitchBanner,
  B07_HexNetwork, B08_PenroseBanner, B09_DialecticBanner,
  B10_ProofBanner, B11_QuantumBanner,
  R03_GodelReel, R04_FibReel, R05_MatrixReel, R06_ProofReel,
  R07_DialecticReel, R08_QuantumReel, R09_NietzscheReel,
  R10_ChaosReel, R11_SpinozaReel,
} from './templates/GeekBannersReelsExpanded';

const section: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 };

// Grids
const bannerGrid: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(650px, 1fr))', 
  gap: 40, 
  width: '100%',
  justifyItems: 'center'
};

const postGrid: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', 
  gap: 40, 
  width: '100%',
  justifyItems: 'center'
};

const reelGrid: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
  gap: 40, 
  width: '100%',
  justifyItems: 'center'
};

function App() {
  return (
    <div style={{ background: '#070F0A', minHeight: '100vh', padding: '60px 40px', overflowX: 'hidden' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 80 }}>

        <header style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text size="xs" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase', marginBottom: 12 }}>Elenxos Design System</Text>
          <Heading level="hero" gradient>Social Media Studio</Heading>
          <Text size="md" color="muted" style={{ marginTop: 16, maxWidth: 700, margin: '16px auto 0' }}>
            62 plantillas generadas combinando los mismos componentes composables.
            Filosofía, matemáticas, lógica, caos, cuántica. Mismos bloques. Infinitas variaciones.
          </Text>
        </header>

        {/* ── BANNERS ── */}
        <Divider variant="glow" />
        <Heading level="h3" gradient style={{ textAlign: 'center' }}>Banners (3:1)</Heading>

        <div style={bannerGrid}>
          <div style={section}><Badge variant="ash">Original — Manifiesto</Badge><SocialBannerExample /></div>
          <div style={section}><Badge variant="ash">Ultra-Minimal</Badge><B1_Minimal /></div>
          <div style={section}><Badge variant="ash">Micelio + Símbolos</Badge><B2_Denso /></div>
          <div style={section}><Badge variant="ash">Conferencia</Badge><B3_Conferencia /></div>
          <div style={section}><Badge variant="kodama">Matrix Rain</Badge><B04_MatrixBanner /></div>
          <div style={section}><Badge variant="kodama">Fibonacci Áureo</Badge><B05_FibBanner /></div>
          <div style={section}><Badge variant="mask">Glitch Error</Badge><B06_GlitchBanner /></div>
          <div style={section}><Badge variant="kodama">Red Hexagonal</Badge><B07_HexNetwork /></div>
          <div style={section}><Badge variant="kodama">Penrose Teselas</Badge><B08_PenroseBanner /></div>
          <div style={section}><Badge variant="forest">Dialéctica</Badge><B09_DialecticBanner /></div>
          <div style={section}><Badge variant="kodama">Prueba Formal</Badge><B10_ProofBanner /></div>
          <div style={section}><Badge variant="kodama">Cuántica</Badge><B11_QuantumBanner /></div>
        </div>

        {/* ── POSTS ── */}
        <Divider variant="glow" />
        <Heading level="h3" gradient style={{ textAlign: 'center' }}>Posts (1:1)</Heading>

        <div style={postGrid}>
          <div style={section}><Badge variant="kodama">Cita Filosófica</Badge><SocialPostExample /></div>
          <div style={section}><Badge variant="mask">Cita Roja</Badge><V2_CitaRoja /></div>
          <div style={section}><Badge variant="forest">Perspectiva 3D</Badge><V3_Perspectiva /></div>
          <div style={section}><Badge variant="kodama">Glassmorphism</Badge><V4_Glass /></div>
          <div style={section}><Badge variant="ash">Símbolo Psi</Badge><V5_Simbolo /></div>
          <div style={section}><Badge variant="ash">Datos Split</Badge><V6_DatosSplit /></div>
          <div style={section}><Badge variant="warning">Pregunta</Badge><V7_Pregunta /></div>
          <div style={section}><Badge variant="ash">Próximamente</Badge><V8_Proximamente /></div>
          <div style={section}><Badge variant="forest">Micelio Puro</Badge><V1_Micelio /></div>

          {/* Filosofía */}
          <div style={section}><Badge variant="kodama">Sócrates — Mayéutica</Badge><P01_Socrates /></div>
          <div style={section}><Badge variant="warning">Wittgenstein — Lenguaje</Badge><P02_Wittgenstein /></div>
          <div style={section}><Badge variant="kodama">Heidegger — Aletheia</Badge><P03_Heidegger /></div>
          <div style={section}><Badge variant="forest">Deleuze — Rizoma</Badge><P04_Deleuze /></div>
          <div style={section}><Badge variant="mask">Nietzsche — Retorno</Badge><P05_Nietzsche /></div>
          <div style={section}><Badge variant="mask">Foucault — Panóptico</Badge><P06_Foucault /></div>
          <div style={section}><Badge variant="kodama">Spinoza — Sustancia</Badge><P25_Spinoza /></div>
          <div style={section}><Badge variant="forest">Hegel — Aufhebung</Badge><P22_DialecticVisual /></div>

          {/* Matemáticas */}
          <div style={section}><Badge variant="kodama">Fibonacci — φ Áureo</Badge><P07_Fibonacci /></div>
          <div style={section}><Badge variant="mask">Gödel — Incompletitud</Badge><P08_Godel /></div>
          <div style={section}><Badge variant="kodama">Euler — Identidad</Badge><P09_Euler /></div>
          <div style={section}><Badge variant="kodama">Penrose — Aperiódico</Badge><P10_Penrose /></div>
          <div style={section}><Badge variant="kodama">Cantor — Infinitos</Badge><P11_Cantor /></div>
          <div style={section}><Badge variant="forest">Turing — Computable</Badge><P12_Turing /></div>
          <div style={section}><Badge variant="kodama">Fibonacci — Naturaleza</Badge><P23_FibNature /></div>
          <div style={section}><Badge variant="mask">Penrose — Cita</Badge><P24_PenroseDeep /></div>

          {/* Lógica */}
          <div style={section}><Badge variant="kodama">Prueba Formal</Badge><P13_ProofVisual /></div>
          <div style={section}><Badge variant="kodama">Intersecciones ∩</Badge><P14_Venn /></div>
          <div style={section}><Badge variant="mask">Axioma de Elección</Badge><P15_SetTheory /></div>

          {/* Ciencia & Complejidad */}
          <div style={section}><Badge variant="mask">Entropía</Badge><P16_Entropia /></div>
          <div style={section}><Badge variant="kodama">Cuántica — Superposición</Badge><P17_Cuantica /></div>
          <div style={section}><Badge variant="mask">Caos — Lorenz</Badge><P18_Caos /></div>

          {/* Marca */}
          <div style={section}><Badge variant="kodama">Logo Hero</Badge><P19_LogoHero /></div>
          <div style={section}><Badge variant="kodama" dot pulse>Product Launch</Badge><P20_Launch /></div>
          <div style={section}><Badge variant="forest">Matrix Puro</Badge><P21_MatrixPure /></div>
          <div style={section}><Badge variant="kodama">Dashboard Métricas</Badge><P26_Dashboard /></div>
        </div>

        {/* ── REELS ── */}
        <Divider variant="glow" />
        <Heading level="h3" gradient style={{ textAlign: 'center' }}>Reels / Historias (9:16)</Heading>

        <div style={reelGrid}>
          <div style={section}><Badge variant="forest">Del barro</Badge><SocialReelExample /></div>
          <div style={section}><Badge variant="mask">Manifiesto</Badge><R1_Manifiesto /></div>
          <div style={section}><Badge variant="kodama">Símbolo ∀</Badge><R2_Simbolo /></div>
          <div style={section}><Badge variant="mask">Gödel — Incompletitud</Badge><R03_GodelReel /></div>
          <div style={section}><Badge variant="kodama">Fibonacci Vertical</Badge><R04_FibReel /></div>
          <div style={section}><Badge variant="forest">Matrix Caída</Badge><R05_MatrixReel /></div>
          <div style={section}><Badge variant="kodama">Prueba Paso a Paso</Badge><R06_ProofReel /></div>
          <div style={section}><Badge variant="forest">Dialéctica Visual</Badge><R07_DialecticReel /></div>
          <div style={section}><Badge variant="kodama">Cuántica — Colapso</Badge><R08_QuantumReel /></div>
          <div style={section}><Badge variant="mask">Nietzsche — Retorno</Badge><R09_NietzscheReel /></div>
          <div style={section}><Badge variant="mask">Caos → Orden</Badge><R10_ChaosReel /></div>
          <div style={section}><Badge variant="kodama">Spinoza — Deus</Badge><R11_SpinozaReel /></div>
        </div>

        {/* ── CATÁLOGO ── */}
        <Divider variant="glow" />
        <section style={{ textAlign: 'center', paddingBottom: 80 }}>
          <Heading level="h3" gradient>Componentes Composables</Heading>
          <Text size="sm" color="muted" style={{ marginTop: 8, marginBottom: 30 }}>
            Cada plantilla usa combinaciones distintas de estos mismos bloques.
          </Text>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, maxWidth: 900, margin: '0 auto' }}>
            {[
              'SocialCanvas', 'AuraBackground', 'LogicMesh', 'KodamaParticles',
              'GlowOrb', 'GridPattern', 'GradientWave', 'CinematicText',
              'IconSymbol', 'FrameOverlay', 'QuoteCard', 'StatsDisplay',
              'BrandMark', 'ScanLines', 'Badge', 'Divider',
              'MatrixRain', 'FibonacciSpiral', 'PenrosePattern', 'ElenxosLogo',
              'DialecticFlow', 'GlitchText', 'TopologyMorph', 'FormulaDisplay',
              'OuroborosLoader', 'HexGrid', 'QuantumParticle', 'ProofChain',
            ].map((name) => (
              <div key={name} style={{ padding: '12px 16px', background: '#1E2224', borderRadius: 6, border: '1px solid rgba(58,63,65,0.5)' }}>
                <Text size="sm" color="kodama" weight="semibold">{name}</Text>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
