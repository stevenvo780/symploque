import React from 'react';
import { SocialCanvas } from '../components/SocialCanvas/SocialCanvas';
import { GlowOrb } from '../components/GlowOrb/GlowOrb';
import { GridPattern } from '../components/GridPattern/GridPattern';
import { FrameOverlay } from '../components/FrameOverlay/FrameOverlay';
import { BrandMark } from '../components/BrandMark/BrandMark';
import { CinematicText } from '../components/CinematicText/CinematicText';
import { IconSymbol } from '../components/IconSymbol/IconSymbol';
import { ScanLines } from '../components/ScanLines/ScanLines';
import { AuraBackground } from '../components/AuraBackground/AuraBackground';
import { LogicMesh } from '../components/LogicMesh/LogicMesh';
import { KodamaParticles } from '../components/KodamaParticles/KodamaParticles';
import { GradientWave } from '../components/GradientWave/GradientWave';
import { StatsDisplay } from '../components/StatsDisplay/StatsDisplay';
import { Text } from '../components/Typography/Typography';

const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// B1. PANORÁMICO ULTRA-MINIMAL
export const B1_Minimal = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={18} />
    <div style={abs({ padding: '0 140px', textAlign: 'center', gap: 8 })}>
      <CinematicText text="ELENXOS" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 72, letterSpacing: 30 }} />
      <Text size="xs" color="muted" style={{ fontSize: 24, letterSpacing: 10, textTransform: 'uppercase' }}>
        Canon metodológico para la academia global
      </Text>
    </div>
  </SocialCanvas>
);

// B2. DENSO — Micelio + símbolos flotantes
export const B2_Denso = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <div style={{ position: 'absolute', inset: 0, background: '#080E0B' }} />
    <LogicMesh density={80} />
    <GlowOrb color="kodama" size={300} x="20%" y="50%" blur={80} opacity={0.2} />
    <GlowOrb color="mask" size={200} x="80%" y="40%" blur={70} opacity={0.15} delay={4} />
    <FrameOverlay variant="corners" />
    <IconSymbol symbol="forall" size={60} color="muted" x="10%" y="30%" />
    <IconSymbol symbol="implies" size={50} color="muted" x="88%" y="65%" delay={2} />
    <BrandMark position="bottom-left" fontSize={18} />
    <div style={abs({ padding: '0 120px', textAlign: 'center' })}>
      <CinematicText text="Donde el rigor" level="h2" delayStep={0.05} style={{ fontSize: 52 }} />
      <CinematicText text="se encuentra con la intuición." level="h2" color="kodama" delayStep={0.04} baseDelay={0.8} style={{ fontSize: 52 }} />
    </div>
  </SocialCanvas>
);

// B3. CONFERENCIA — Evento con datos
export const B3_Conferencia = () => (
  <SocialCanvas format="banner" scale={0.6}>
    <AuraBackground cinematicZoom={false} />
    <GridPattern variant="dots" gap={40} />
    <FrameOverlay variant="corners" />
    <BrandMark position="top-left" fontSize={20} />
    <div style={abs({ flexDirection: 'row', padding: '0 80px', gap: 60 })}>
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Text size="xs" color="kodama" style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 12 }}>Evento Internacional</Text>
        <CinematicText text="ElenxosCon" level="h1" color="kodama" delayStep={0.08} style={{ fontSize: 64 }} />
        <CinematicText text="2027" level="h1" delayStep={0.15} baseDelay={0.8} style={{ fontSize: 64, opacity: 0.6 }} />
      </div>
      <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(163,228,215,0.2), transparent)', alignSelf: 'stretch', margin: '40px 0' }} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <StatsDisplay stats={[
          { value: '3', label: 'Días' },
          { value: '50+', label: 'Charlas' },
          { value: '15', label: 'Países' },
        ]} fontSize={40} delay={1} />
      </div>
    </div>
  </SocialCanvas>
);

// R1. REEL MANIFIESTO — Texto secuencial dramático
export const R1_Manifiesto = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: '#040604' }} />
    <GlowOrb color="mask" size={500} x="50%" y="25%" blur={120} opacity={0.15} />
    <GlowOrb color="kodama" size={400} x="50%" y="75%" blur={100} opacity={0.12} delay={5} />
    <ScanLines />
    <FrameOverlay variant="double" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '120px 70px', gap: 60 })}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
        <CinematicText text="La academia" level="h2" color="muted" delayStep={0.08} style={{ fontSize: 60 }} />
        <CinematicText text="no necesita" level="h2" delayStep={0.08} baseDelay={1} style={{ fontSize: 60 }} />
        <CinematicText text="más papers." level="h2" color="mask" delayStep={0.08} baseDelay={2} style={{ fontSize: 60, color: '#E04848' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
        <CinematicText text="Necesita" level="h2" color="muted" delayStep={0.08} baseDelay={3.5} style={{ fontSize: 60 }} />
        <CinematicText text="mejores" level="h2" delayStep={0.08} baseDelay={4.2} style={{ fontSize: 60 }} />
        <CinematicText text="preguntas." level="h2" color="kodama" delayStep={0.1} baseDelay={5} style={{ fontSize: 80 }} />
      </div>
      <div style={{ flex: 0.3 }} />
    </div>
  </SocialCanvas>
);

// R2. REEL SÍMBOLO — Gran icono con explicación
export const R2_Simbolo = () => (
  <SocialCanvas format="reel" scale={0.28}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0F1A 0%, #0F2519 100%)' }} />
    <GradientWave speed={25} />
    <KodamaParticles count={30} relative />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={20} tagline="Serie: Símbolos" />
    <div style={abs({ padding: '100px 60px', gap: 20 })}>
      <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconSymbol symbol="∀" size={300} color="kodama" style={{ opacity: 0.8 }} />
      </div>
      <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        <CinematicText text="Para todo x" level="h2" color="kodama" delayStep={0.08} baseDelay={0.5} style={{ fontSize: 56 }} />
        <Text size="md" color="secondary" style={{ fontSize: 26, lineHeight: 1.8, maxWidth: '90%', margin: '0 auto' }}>
          El cuantificador universal. La promesa de que una proposición aplica sin excepción.
          En Elenxos, construimos herramientas que aspiran a eso.
        </Text>
      </div>
      <div style={{ flex: 0.5 }} />
    </div>
  </SocialCanvas>
);
