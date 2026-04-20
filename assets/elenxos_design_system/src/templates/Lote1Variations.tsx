import React from 'react';
import { SocialCanvas } from '../components/SocialCanvas/SocialCanvas';
import { GlowOrb } from '../components/GlowOrb/GlowOrb';
import { FrameOverlay } from '../components/FrameOverlay/FrameOverlay';
import { BrandMark } from '../components/BrandMark/BrandMark';
import { CinematicText } from '../components/CinematicText/CinematicText';
import { Text } from '../components/Typography/Typography';
import { AuraBackground } from '../components/AuraBackground/AuraBackground';
import { GridPattern } from '../components/GridPattern/GridPattern';

const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// 1. EL NUEVO ESTÁNDAR
export const Lote1_Estandar = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AuraBackground />
    <GridPattern variant="dots" gap={40} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={120} opacity={0.2} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    
    <div style={abs({ padding: '80px', textAlign: 'center' })}>
      <Text size="xs" color="kodama" style={{ fontSize: 24, letterSpacing: 8, textTransform: 'uppercase', marginBottom: 40 }}>
        Investigación Académica
      </Text>
      <CinematicText text="El nuevo" level="h1" delayStep={0.06} style={{ fontSize: 90 }} />
      <CinematicText text="estándar para" level="h1" color="muted" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 90 }} />
      <CinematicText text="investigación" level="h1" delayStep={0.06} baseDelay={1.6} style={{ fontSize: 90 }} />
      <CinematicText text="rigurosa." level="h1" color="kodama" delayStep={0.06} baseDelay={2.4} style={{ fontSize: 90 }} />
      <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, transparent, rgba(163,228,215,0.8), transparent)', margin: '60px auto 0' }} />
    </div>
  </SocialCanvas>
);

// 2. FLUJO: Escribe -> Formaliza -> Verifica -> Colabora
export const Lote1_Flujo = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #070F0A 0%, #0F2519 100%)' }} />
    <GridPattern variant="lines" gap={60} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-left" fontSize={20} tagline="Flujo de Trabajo" />
    
    <div style={abs({ padding: '100px', alignItems: 'flex-start' })}>
      <CinematicText text="De la idea" level="h2" color="muted" style={{ fontSize: 48, marginBottom: 10 }} />
      <CinematicText text="a la demostración" level="h2" color="kodama" style={{ fontSize: 48, marginBottom: 80 }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%' }}>
        <Step number="1" text="Escribe con libertad" subtext="Markdown académico + Interfaz sin distracciones" delay={0.5} />
        <Step number="2" text="Formaliza" subtext="Traduce ideas a Lógica ST" delay={1.2} />
        <Step number="3" text="Verifica con rigor" subtext="Derivaciones, tablas de verdad, grafos lógicos" delay={1.9} />
        <Step number="4" text="Colabora y Publica" subtext="Workspaces en la nube + Control de versiones" delay={2.6} />
      </div>
    </div>
  </SocialCanvas>
);

const Step = ({ number, text, subtext, delay }: { number: string, text: string, subtext: string, delay: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 30, opacity: 0, animation: `fadeIn 1s forwards ${delay}s` }}>
    <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
    <div style={{ 
      width: 60, height: 60, borderRadius: '50%', background: 'rgba(163,228,215,0.1)', 
      border: '1px solid rgba(163,228,215,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#A3E4D7', fontSize: 24, fontWeight: 'bold'
    }}>
      {number}
    </div>
    <div style={{ flex: 1 }}>
      <Text size="xl" weight="semibold" style={{ color: '#fff', fontSize: 32 }}>{text}</Text>
      <Text size="sm" color="secondary" style={{ fontSize: 24, marginTop: 8 }}>{subtext}</Text>
    </div>
  </div>
);
