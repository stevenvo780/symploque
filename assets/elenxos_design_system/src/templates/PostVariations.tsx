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

const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// 1. MICELIO OSCURO — Red neuronal densa, sin texto, solo marca
export const V1_Micelio = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <LogicMesh density={120} />
    <GlowOrb color="kodama" size={300} x="50%" y="50%" blur={100} opacity={0.15} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={18} tagline="La red del conocimiento" />
  </SocialCanvas>
);

// 2. CITA ROJA — Tono mask, dramático
export const V2_CitaRoja = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0505 0%, #1A0A0A 100%)' }} />
    <GlowOrb color="mask" size={500} x="50%" y="40%" blur={120} opacity={0.25} />
    <FrameOverlay variant="mask" />
    <ScanLines />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '100px 80px' })}>
      <QuoteCard
        quote="Destruir un paradigma no es violencia. Es higiene epistémica."
        author="Manifiesto Elenxos"
        fontSize={36}
      />
    </div>
  </SocialCanvas>
);

// 3. PERSPECTIVA FUTURISTA — Grid 3D, datos
export const V3_Perspectiva = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #080E16 0%, #0F2519 100%)' }} />
    <GridPattern variant="perspective" gap={25} />
    <GlowOrb color="kodama" size={400} x="50%" y="65%" blur={100} opacity={0.2} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-left" fontSize={12} />
    <div style={abs({ padding: '80px', gap: 40 })}>
      <Text size="xs" color="muted" style={{ letterSpacing: 8, textTransform: 'uppercase' }}>Infraestructura Académica</Text>
      <CinematicText text="El futuro" level="h1" delayStep={0.08} style={{ fontSize: 80 }} />
      <CinematicText text="ya tiene" level="h1" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 80 }} />
      <CinematicText text="estructura." level="h1" color="kodama" delayStep={0.08} baseDelay={1.5} style={{ fontSize: 80 }} />
    </div>
  </SocialCanvas>
);

// 4. GLASSMORPHISM — Tarjeta flotante sobre partículas
export const V4_Glass = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AuraBackground />
    <KodamaParticles count={40} relative />
    <GlowOrb color="forest" size={400} x="30%" y="30%" blur={80} opacity={0.3} />
    <GlowOrb color="kodama" size={300} x="70%" y="70%" blur={90} opacity={0.2} delay={3} />
    <BrandMark position="bottom-left" fontSize={11} />
    <div style={abs({ padding: '80px' })}>
      <div style={{
        background: 'rgba(15, 37, 25, 0.6)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(163,228,215,0.15)', borderRadius: 16, padding: '60px 50px',
        textAlign: 'center', maxWidth: '85%',
      }}>
        <Badge variant="kodama" dot pulse style={{ marginBottom: 30 }}>Nuevo Release</Badge>
        <CinematicText text="Lexis v3" level="h2" color="kodama" delayStep={0.1} style={{ fontSize: 64, marginBottom: 16 }} />
        <Text size="md" color="secondary" style={{ lineHeight: 1.7 }}>
          Motor de traducción fenomenológica. 3x más rápido. 100% más preciso.
        </Text>
      </div>
    </div>
  </SocialCanvas>
);

// 5. SÍMBOLO GRANDE — Una sola letra griega dominante
export const V5_Simbolo = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060B08' }} />
    <GlowOrb color="kodama" size={500} x="50%" y="45%" blur={150} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={11} />
    <div style={abs({ padding: '80px' })}>
      <IconSymbol symbol="Ψ" size={280} color="kodama" style={{ marginBottom: 30, opacity: 0.9 }} />
      <CinematicText text="Psique" level="h2" delayStep={0.12} baseDelay={0.5} style={{ fontSize: 52, letterSpacing: 8 }} />
      <Text size="sm" color="muted" style={{ marginTop: 16, letterSpacing: 4, textTransform: 'uppercase' }}>
        La mente como sistema complejo
      </Text>
    </div>
  </SocialCanvas>
);

// 6. DATOS SPLIT — Mitad oscura mitad con datos
export const V6_DatosSplit = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <GridPattern variant="lines" gap={60} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-right" fontSize={11} />
    <div style={abs({ flexDirection: 'row', padding: 0 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px', borderRight: '1px solid rgba(163,228,215,0.1)' }}>
        <Text size="xs" color="kodama" style={{ letterSpacing: 6, textTransform: 'uppercase', marginBottom: 20 }}>Impacto 2026</Text>
        <CinematicText text="En números" level="h3" delayStep={0.08} style={{ fontSize: 48 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', gap: 40 }}>
        <StatsDisplay stats={[{ value: '340', label: 'Papers' }]} fontSize={72} />
        <StatsDisplay stats={[{ value: '12', label: 'Países' }]} fontSize={72} delay={0.5} />
        <StatsDisplay stats={[{ value: '98%', label: 'Precisión' }]} fontSize={72} delay={1} />
      </div>
    </div>
  </SocialCanvas>
);

// 7. PREGUNTA PROVOCADORA
export const V7_Pregunta = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0A0F1A, #0F2519)' }} />
    <GradientWave speed={30} />
    <GlowOrb color="warm" size={400} x="50%" y="50%" blur={100} opacity={0.15} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-left" fontSize={11} tagline="elenxos.com" />
    <div style={abs({ padding: '100px 80px', textAlign: 'center' })}>
      <CinematicText text="¿Qué pasaría" level="h2" delayStep={0.06} style={{ fontSize: 58 }} />
      <CinematicText text="si la academia" level="h2" color="muted" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 58 }} />
      <CinematicText text="pensara en serio?" level="h2" color="kodama" delayStep={0.06} baseDelay={1.6} style={{ fontSize: 58 }} />
      <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, rgba(163,228,215,0.5), transparent)', margin: '40px auto 0' }} />
    </div>
  </SocialCanvas>
);

// 8. PRÓXIMAMENTE — Teaser misterioso
export const V8_Proximamente = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#040604' }} />
    <GlowOrb color="kodama" size={200} x="50%" y="50%" blur={60} opacity={0.08} speed={20} />
    <ScanLines heavy />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={14} tagline="Algo se aproxima" />
    <div style={abs({ padding: '100px' })}>
      <CinematicText text="2027" level="hero" color="kodama" delayStep={0.3} style={{ fontSize: 180, letterSpacing: 20, opacity: 0.7 }} />
    </div>
  </SocialCanvas>
);
