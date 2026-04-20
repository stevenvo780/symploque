import { SocialCanvas } from './components/SocialCanvas/SocialCanvas';
import { AuraBackground } from './components/AuraBackground/AuraBackground';
import { LogicMesh } from './components/LogicMesh/LogicMesh';
import { CinematicText } from './components/CinematicText/CinematicText';
import { KodamaParticles } from './components/KodamaParticles/KodamaParticles';
import { GlowOrb } from './components/GlowOrb/GlowOrb';
import { GridPattern } from './components/GridPattern/GridPattern';
import { GradientWave } from './components/GradientWave/GradientWave';
import { IconSymbol } from './components/IconSymbol/IconSymbol';
import { FrameOverlay } from './components/FrameOverlay/FrameOverlay';
import { QuoteCard } from './components/QuoteCard/QuoteCard';
import { StatsDisplay } from './components/StatsDisplay/StatsDisplay';
import { BrandMark } from './components/BrandMark/BrandMark';
import { ScanLines } from './components/ScanLines/ScanLines';
import { Heading, Text } from './components/Typography/Typography';
import { Divider } from './components/Divider/Divider';
import { Badge } from './components/Badge/Badge';

// ═══════════════════════════════════════════════════════════════
// Estilos inline reutilizables para el layout del studio
// ═══════════════════════════════════════════════════════════════
const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

const section: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
};

function App() {
  return (
    <div style={{ background: '#070F0A', minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 100 }}>

        {/* ── HEADER ── */}
        <header style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text size="xs" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase', marginBottom: 12 }}>
            Sistema de Diseño v2.0
          </Text>
          <Heading level="hero" gradient>Social Media Studio</Heading>
          <Text size="md" color="muted" style={{ marginTop: 16, maxWidth: 600, margin: '16px auto 0' }}>
            Herramientas composables para generar banners, posts, reels e historias animadas.
            Cada pieza se combina con las demás. Mezcle. Rompa. Reconstruya.
          </Text>
        </header>

        {/* ═══════════════════════════════════════════════════════
            1. BANNER — MANIFIESTO CORPORATIVO
        ═══════════════════════════════════════════════════════ */}
        <div style={section}>
          <Badge variant="ash" size="md">BANNER · LINKEDIN / X · 3:1</Badge>
          <SocialCanvas format="banner" scale={0.62}>
            <AuraBackground cinematicZoom />
            <GradientWave speed={25} />
            <GridPattern variant="dots" gap={50} />
            <LogicMesh density={60} />
            <FrameOverlay variant="corners" />
            <BrandMark position="bottom-right" tagline="elenxos.com" />

            <div style={abs({ padding: '0 120px', textAlign: 'center' })}>
              <Text size="xs" color="kodama" style={{ letterSpacing: 8, textTransform: 'uppercase', marginBottom: 16 }}>
                Software Académico · Sistemas Complejos · Filosofía Analítica
              </Text>
              <CinematicText text="Traducimos el caos" level="h2" delayStep={0.06} />
              <CinematicText text="en estructuras lógicas." level="h2" color="kodama" delayStep={0.06} baseDelay={1.2} />
            </div>
          </SocialCanvas>
        </div>

        <Divider variant="gradient" />

        {/* ═══════════════════════════════════════════════════════
            2. POST 1:1 — CITA FILOSÓFICA
        ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', gap: 60, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          <div style={section}>
            <Badge variant="kodama" size="md">POST · INSTAGRAM · 1:1</Badge>
            <SocialCanvas format="post" scale={0.38}>
              <AuraBackground />
              <GradientWave />
              <KodamaParticles count={20} relative />
              <FrameOverlay variant="double" />
              <ScanLines />
              <BrandMark position="bottom-left" fontSize={12} />

              <IconSymbol symbol="phi" size={200} color="muted" x="15%" y="20%" delay={0} />
              <IconSymbol symbol="therefore" size={80} color="muted" x="80%" y="75%" delay={2} />

              <div style={abs({ padding: '100px 80px' })}>
                <QuoteCard
                  quote="No existen hechos, solo interpretaciones. Nuestra tarea es construir el marco donde cada interpretación encuentre su estructura."
                  author="Principio Elenxos №7"
                  fontSize={38}
                />
              </div>
            </SocialCanvas>
          </div>

          {/* ═══════════════════════════════════════════════════════
              3. POST 1:1 — ANUNCIO DE PRODUCTO
          ═══════════════════════════════════════════════════════ */}
          <div style={section}>
            <Badge variant="mask" size="md">POST · ANUNCIO · 1:1</Badge>
            <SocialCanvas format="post" scale={0.38}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0F2519 0%, #1A0A0A 100%)' }} />
              <GlowOrb color="mask" size={400} x="70%" y="30%" blur={80} opacity={0.3} />
              <GlowOrb color="kodama" size={300} x="25%" y="70%" blur={70} opacity={0.2} delay={3} />
              <GridPattern variant="lines" gap={80} />
              <FrameOverlay variant="mask" />
              <BrandMark position="bottom-right" fontSize={12} />

              <div style={abs({ padding: '80px', gap: 30 })}>
                <Badge variant="mask" size="md" dot>Lanzamiento</Badge>
                <CinematicText text="Agora" level="hero" color="kodama" delayStep={0.15}
                  style={{ fontSize: 140, textShadow: '0 0 80px rgba(163,228,215,0.25)' }} />
                <Text size="md" color="primary" style={{ textAlign: 'center', maxWidth: '80%', lineHeight: 1.6, marginTop: 10 }}>
                  La plataforma que conecta investigadores, metodologías y datos en un solo ecosistema epistémico.
                </Text>
                <StatsDisplay delay={1.5} stats={[
                  { value: '12K', label: 'Nodos' },
                  { value: '47', label: 'Universidades' },
                  { value: '∞', label: 'Conexiones' },
                ]} fontSize={52} style={{ marginTop: 40 }} />
              </div>
            </SocialCanvas>
          </div>
        </div>

        <Divider variant="gradient" />

        {/* ═══════════════════════════════════════════════════════
            4. REEL 9:16 — HISTORIA CINEMÁTICA
        ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', gap: 60, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          <div style={section}>
            <Badge variant="forest" size="md">REEL · HISTORIA · 9:16</Badge>
            <SocialCanvas format="reel" scale={0.3}>
              <AuraBackground cinematicZoom />
              <KodamaParticles count={60} relative />
              <GlowOrb color="kodama" size={500} x="50%" y="35%" blur={100} opacity={0.25} speed={15} />
              <GlowOrb color="warm" size={300} x="30%" y="70%" blur={80} opacity={0.15} speed={18} delay={5} />
              <FrameOverlay variant="corners" />
              <ScanLines />
              <BrandMark position="center-bottom" fontSize={14} tagline="Software Académico" />

              <div style={abs({ padding: '100px 60px', gap: 0 })}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                  <Text size="sm" color="muted" style={{ letterSpacing: 6, textTransform: 'uppercase', marginBottom: 30 }}>
                    Desde la Universidad de Antioquia
                  </Text>
                  <CinematicText text="Del barro" level="h1" delayStep={0.1} style={{ fontSize: 85 }} />
                  <CinematicText text="nace el" level="h1" delayStep={0.1} baseDelay={0.8} style={{ fontSize: 85 }} />
                  <CinematicText text="rigor." level="h1" color="kodama" delayStep={0.15} baseDelay={1.8}
                    style={{ fontSize: 110, marginTop: 10 }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
                  <IconSymbol symbol="sigma" size={100} color="kodama" style={{ margin: '0 auto' }} />
                  <Text size="lg" color="primary" style={{ maxWidth: '90%', lineHeight: 1.7, margin: '0 auto' }}>
                    Tres parceros de Medellín construyendo herramientas para que la academia
                    deje de improvisar y empiece a pensar en serio.
                  </Text>
                </div>

                <div style={{ flex: 0.5 }} />
              </div>
            </SocialCanvas>
          </div>

          {/* ═══════════════════════════════════════════════════════
              5. REEL 9:16 — DATO / ESTADÍSTICA
          ═══════════════════════════════════════════════════════ */}
          <div style={section}>
            <Badge variant="warning" size="md">REEL · DATO · 9:16</Badge>
            <SocialCanvas format="reel" scale={0.3}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0F1A 0%, #0F2519 50%, #0A0F1A 100%)' }} />
              <GridPattern variant="perspective" gap={30} />
              <GlowOrb color="kodama" size={600} x="50%" y="45%" blur={120} opacity={0.2} speed={20} />
              <FrameOverlay variant="minimal" />
              <BrandMark position="bottom-left" fontSize={12} tagline="elenxos.com" />

              <div style={abs({ padding: '120px 60px', gap: 60 })}>
                <div style={{ textAlign: 'center' }}>
                  <Text size="xs" color="muted" style={{ letterSpacing: 8, textTransform: 'uppercase' }}>
                    ¿Sabías que...?
                  </Text>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <CinematicText text="87%" level="hero" color="kodama" delayStep={0.2}
                    style={{ fontSize: 200, lineHeight: 0.9 }} />
                  <Text size="xl" color="primary" style={{ marginTop: 30, lineHeight: 1.5 }}>
                    de las investigaciones académicas en Latinoamérica carecen de un marco
                    metodológico estandarizado.
                  </Text>
                </div>

                <div style={{ width: '80%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(163,228,215,0.4), transparent)' }} />

                <Text size="md" color="muted" style={{ textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
                  Elenxos nació en la UdeA para resolver esto. Construimos el estándar que
                  la academia global necesita, desde el Valle de Aburrá para el mundo.
                </Text>

                <IconSymbol symbol="implies" size={60} color="kodama" />
              </div>
            </SocialCanvas>
          </div>
        </div>

        <Divider variant="gradient" />

        {/* ═══════════════════════════════════════════════════════
            6. BANNER — EQUIPO / SOBRE NOSOTROS
        ═══════════════════════════════════════════════════════ */}
        <div style={section}>
          <Badge variant="kodama" size="md">BANNER · SOBRE NOSOTROS · 3:1</Badge>
          <SocialCanvas format="banner" scale={0.62}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0F2519, #0A1520)' }} />
            <GradientWave speed={30} />
            <GridPattern variant="cross" gap={60} />
            <FrameOverlay variant="corners" />
            <BrandMark position="top-left" fontSize={16} />

            <IconSymbol symbol="psi" size={120} color="muted" x="8%" y="50%" delay={0} />
            <IconSymbol symbol="lambda" size={80} color="muted" x="92%" y="40%" delay={1} />

            <div style={abs({ flexDirection: 'row', gap: 80, padding: '0 100px' })}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Text size="xs" color="kodama" style={{ letterSpacing: 6, textTransform: 'uppercase', marginBottom: 12 }}>
                  Quiénes Somos
                </Text>
                <CinematicText text="Un filósofo," level="h3" delayStep={0.05} style={{ fontSize: 42 }} />
                <CinematicText text="un biólogo," level="h3" delayStep={0.05} baseDelay={0.6} style={{ fontSize: 42 }} />
                <CinematicText text="un informático." level="h3" color="kodama" delayStep={0.05} baseDelay={1.2}
                  style={{ fontSize: 42 }} />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 40, borderLeft: '1px solid rgba(163,228,215,0.15)' }}>
                <Text size="base" color="secondary" style={{ lineHeight: 1.8, fontSize: 18 }}>
                  Desde la Universidad de Antioquia, entre montañas y tinto, decidimos que la
                  academia necesitaba mejores herramientas. No pedimos permiso. Las construimos.
                </Text>
              </div>
            </div>
          </SocialCanvas>
        </div>

        <Divider variant="gradient" />

        {/* ═══════════════════════════════════════════════════════
            7. POST 1:1 — MINIMALISTA / TIPOGRÁFICO
        ═══════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', gap: 60, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          <div style={section}>
            <Badge variant="ash" size="md">POST · TIPOGRÁFICO · 1:1</Badge>
            <SocialCanvas format="post" scale={0.38}>
              <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
              <FrameOverlay variant="minimal" />
              <BrandMark position="bottom-right" fontSize={11} />

              <div style={abs({ padding: '120px 100px', textAlign: 'left', alignItems: 'flex-start', justifyContent: 'flex-end' })}>
                <Text size="xs" color="kodama" style={{ letterSpacing: 10, textTransform: 'uppercase', marginBottom: 20 }}>
                  Definición
                </Text>
                <CinematicText text="ἔλεγχος" level="hero" color="kodama" delayStep={0.12}
                  style={{ fontSize: 110, fontStyle: 'italic' }} />
                <Text size="xs" color="muted" style={{ marginTop: 8, letterSpacing: 3 }}>/é·lenk·hos/</Text>
                <div style={{ width: 60, height: 2, background: 'rgba(163,228,215,0.3)', margin: '30px 0' }} />
                <Text size="md" color="secondary" style={{ lineHeight: 1.8, maxWidth: '100%' }}>
                  Del griego antiguo. Refutación, prueba, examen cruzado.
                  El método socrático para llegar a la verdad a través del cuestionamiento sistemático.
                </Text>
              </div>
            </SocialCanvas>
          </div>

          {/* ═══════════════════════════════════════════════════════
              8. POST 1:1 — EVENTO / CONVOCATORIA
          ═══════════════════════════════════════════════════════ */}
          <div style={section}>
            <Badge variant="success" size="md">POST · EVENTO · 1:1</Badge>
            <SocialCanvas format="post" scale={0.38}>
              <AuraBackground />
              <GlowOrb color="kodama" size={350} x="50%" y="30%" blur={90} opacity={0.3} />
              <GlowOrb color="forest" size={250} x="20%" y="80%" blur={70} opacity={0.2} delay={4} />
              <GridPattern variant="dots" gap={60} />
              <FrameOverlay variant="corners" />
              <BrandMark position="bottom-left" fontSize={12} />

              <div style={abs({ padding: '80px', gap: 24 })}>
                <Badge variant="kodama" dot pulse size="md" style={{ transform: 'scale(1.3)' }}>Convocatoria Abierta</Badge>

                <div style={{ textAlign: 'center', marginTop: 30 }}>
                  <CinematicText text="Simposio" level="h2" delayStep={0.08} style={{ fontSize: 72 }} />
                  <CinematicText text="de Sistemas" level="h2" delayStep={0.08} baseDelay={0.7} style={{ fontSize: 72 }} />
                  <CinematicText text="Complejos" level="h2" color="kodama" delayStep={0.08} baseDelay={1.4} style={{ fontSize: 72 }} />
                </div>

                <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, rgba(163,228,215,0.5), transparent)', margin: '20px 0' }} />

                <StatsDisplay delay={2} stats={[
                  { value: '24', label: 'Ponencias' },
                  { value: '3', label: 'Días' },
                  { value: '8', label: 'Países' },
                ]} fontSize={48} style={{ marginTop: 20 }} />

                <Text size="sm" color="muted" style={{ textAlign: 'center', marginTop: 20 }}>
                  UdeA · Medellín · Marzo 2027
                </Text>
              </div>
            </SocialCanvas>
          </div>
        </div>

        <Divider variant="glow" />

        {/* ═══════════════════════════════════════════════════════
            CATÁLOGO DE COMPONENTES
        ═══════════════════════════════════════════════════════ */}
        <section style={{ textAlign: 'center' }}>
          <Heading level="h3" gradient>Componentes Disponibles</Heading>
          <Text size="sm" color="muted" style={{ marginTop: 12, marginBottom: 40 }}>
            Combine estos bloques para crear infinitas variaciones.
          </Text>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
            {[
              'SocialCanvas', 'AuraBackground', 'LogicMesh', 'KodamaParticles',
              'GlowOrb', 'GridPattern', 'GradientWave', 'CinematicText',
              'IconSymbol', 'FrameOverlay', 'QuoteCard', 'StatsDisplay',
              'BrandMark', 'ScanLines', 'Badge', 'Divider',
              'Button', 'Card', 'Input', 'Modal',
              'Spinner', 'Toast', 'Tooltip', 'Typography',
            ].map((name) => (
              <div key={name} style={{
                padding: '16px 20px', background: '#1E2224', borderRadius: 8,
                border: '1px solid rgba(58, 63, 65, 0.5)', textAlign: 'left',
              }}>
                <Text size="sm" color="kodama" weight="semibold">{name}</Text>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}

export default App;
