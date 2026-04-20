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

const section: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 };
const grid2: React.CSSProperties = { display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' };

function App() {
  return (
    <div style={{ background: '#070F0A', minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 80 }}>

        <header style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text size="xs" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase', marginBottom: 12 }}>Elenxos Design System</Text>
          <Heading level="hero" gradient>Social Media Studio</Heading>
          <Text size="md" color="muted" style={{ marginTop: 16, maxWidth: 700, margin: '16px auto 0' }}>
            21 plantillas generadas combinando los mismos componentes composables.
            Mismos bloques. Infinitas variaciones.
          </Text>
        </header>

        {/* ── BANNERS ── */}
        <Divider variant="glow" />
        <Heading level="h3" gradient style={{ textAlign: 'center' }}>Banners (3:1)</Heading>

        <div style={section}><Badge variant="ash">Original — Manifiesto</Badge><SocialBannerExample /></div>
        <div style={section}><Badge variant="ash">Ultra-Minimal</Badge><B1_Minimal /></div>
        <div style={section}><Badge variant="ash">Micelio + Símbolos</Badge><B2_Denso /></div>
        <div style={section}><Badge variant="ash">Conferencia</Badge><B3_Conferencia /></div>

        {/* ── POSTS ── */}
        <Divider variant="glow" />
        <Heading level="h3" gradient style={{ textAlign: 'center' }}>Posts (1:1)</Heading>

        <div style={grid2}>
          <div style={section}><Badge variant="kodama">Cita Filosófica</Badge><SocialPostExample /></div>
          <div style={section}><Badge variant="mask">Cita Roja</Badge><V2_CitaRoja /></div>
        </div>

        <div style={grid2}>
          <div style={section}><Badge variant="forest">Perspectiva 3D</Badge><V3_Perspectiva /></div>
          <div style={section}><Badge variant="kodama">Glassmorphism</Badge><V4_Glass /></div>
        </div>

        <div style={grid2}>
          <div style={section}><Badge variant="ash">Símbolo Psi</Badge><V5_Simbolo /></div>
          <div style={section}><Badge variant="ash">Datos Split</Badge><V6_DatosSplit /></div>
        </div>

        <div style={grid2}>
          <div style={section}><Badge variant="warning">Pregunta</Badge><V7_Pregunta /></div>
          <div style={section}><Badge variant="ash">Próximamente</Badge><V8_Proximamente /></div>
        </div>

        <div style={grid2}>
          <div style={section}><Badge variant="forest">Micelio Puro</Badge><V1_Micelio /></div>
        </div>

        {/* ── REELS ── */}
        <Divider variant="glow" />
        <Heading level="h3" gradient style={{ textAlign: 'center' }}>Reels / Historias (9:16)</Heading>

        <div style={grid2}>
          <div style={section}><Badge variant="forest">Del barro</Badge><SocialReelExample /></div>
          <div style={section}><Badge variant="mask">Manifiesto</Badge><R1_Manifiesto /></div>
          <div style={section}><Badge variant="kodama">Símbolo ∀</Badge><R2_Simbolo /></div>
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
