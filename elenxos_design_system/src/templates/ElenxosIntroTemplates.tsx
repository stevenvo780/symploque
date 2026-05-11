/**
 * ElenxosIntroTemplates — Campaña introductoria "¿Qué es Elenxos?"
 * 
 * Arco narrativo:
 *   Fase 1: Origen — Etimología + Fundadores (3 piezas)
 *   Fase 2: Identidad — Misión + Dualidad (3 piezas)
 *   Fase 3: Visión — Principios + De Elenxos nace Agora (2 piezas)
 *   Fase 4: Invitación — Promesa + CTA (2 piezas)
 * 
 * = 10 piezas de introducción de marca
 * 
 * Posicionamiento clave:
 *   "Elenxos es una empresa de tecnología que estandariza
 *    métodos académicos para investigaciones y proyectos educativos."
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
import { IconSymbol } from '../components/IconSymbol/IconSymbol';
import { AuraBackground } from '../components/AuraBackground/AuraBackground';
import { LogicMesh } from '../components/LogicMesh/LogicMesh';
import { KodamaParticles } from '../components/KodamaParticles/KodamaParticles';
import { GradientWave } from '../components/GradientWave/GradientWave';
import { Badge } from '../components/Badge/Badge';
import { Text } from '../components/Typography/Typography';
import { FibonacciSpiral } from '../components/FibonacciSpiral/FibonacciSpiral';
import { PenrosePattern } from '../components/PenrosePattern/PenrosePattern';
import { DialecticFlow } from '../components/DialecticFlow/DialecticFlow';
import { FormulaDisplay } from '../components/FormulaDisplay/FormulaDisplay';
import { HexGrid } from '../components/HexGrid/HexGrid';
import { ElenxosLogo } from '../components/ElenxosLogo/ElenxosLogo';
import { ScanLines } from '../components/ScanLines/ScanLines';
import { QuantumParticle } from '../components/QuantumParticle/QuantumParticle';

const abs = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', zIndex: 5, ...extra,
});

// ═══════════════════════════════════════════════════════════════════
//  FASE 1: ORIGEN — "¿De dónde viene Elenxos?"
// ═══════════════════════════════════════════════════════════════════

/**
 * Post 1 — Etimología: ἔλεγχος
 * "Del griego antiguo: refutación, prueba, examen cruzado."
 */
export const Intro_Post_Etimologia = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060808' }} />
    <PenrosePattern density={10} color="kodama" animated />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={22} tagline="elenxos.com" />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <Text size="sm" color="kodama" style={{ fontSize: 22, letterSpacing: 8, textTransform: 'uppercase' }}>Del griego antiguo</Text>
      <CinematicText text="ἔλεγχος" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 96, letterSpacing: 8 }} />
      <Text size="md" color="muted" style={{ fontSize: 28, fontStyle: 'italic', marginTop: 8 }}>/é·lenk·hos/</Text>
      <div style={{ width: '50%', height: 1, background: 'rgba(163,228,215,0.25)', margin: '20px 0' }} />
      <Text size="md" style={{ fontSize: 28, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%', color: '#B8C4C0' }}>
        Refutación. Prueba. Examen cruzado.
      </Text>
      <Text size="md" color="muted" style={{ fontSize: 22, textAlign: 'center', lineHeight: 1.7, maxWidth: '80%', marginTop: 16 }}>
        El método socrático para llegar a la verdad.
      </Text>
    </div>
  </SocialCanvas>
);

/**
 * Post 2 — Historia fundadora
 * "Tres mentes. Una misión. Desde Medellín."
 */
export const Intro_Post_Fundadores = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/intro/intro_origen_udea.png" opacity={0.45} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,8,5,0.75) 0%, rgba(15,37,25,0.9) 100%)" />
    <GlowOrb color="kodama" size={400} x="50%" y="60%" blur={120} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-left" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <Badge variant="kodama" dot style={{ fontSize: 20, padding: '10px 24px' }}>Nuestro origen</Badge>
      <CinematicText text="Tres mentes." level="h2" delayStep={0.07} style={{ fontSize: 58 }} />
      <CinematicText text="Una misión." level="h2" color="kodama" delayStep={0.07} baseDelay={0.8} style={{ fontSize: 58 }} />
      <div style={{ height: 10 }} />
      <QuoteCard
        quote="No pedimos permiso. Las construimos."
        author=""
        fontSize={32}
      />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 22, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Un filósofo, un biólogo y un informático decidieron que la academia necesitaba dejar de improvisar.
      </Text>
    </div>
  </SocialCanvas>
);

/**
 * Story 1 — Pregunta interactiva sobre la etimología
 */
export const Intro_Story_Pregunta = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <HexGrid cols={6} rows={10} size={40} color="kodama" />
    <GlowOrb color="kodama" size={600} x="50%" y="40%" blur={180} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 40 })}>
      <IconSymbol symbol="ἔ" size={120} color="kodama" />
      <CinematicText text="¿Sabías que" level="h2" delayStep={0.06} style={{ fontSize: 52 }} />
      <CinematicText text="nuestro nombre" level="h2" delayStep={0.06} baseDelay={0.7} style={{ fontSize: 52 }} />
      <CinematicText text="viene del griego" level="h2" delayStep={0.06} baseDelay={1.3} style={{ fontSize: 52 }} />
      <CinematicText text="antiguo?" level="h2" color="kodama" delayStep={0.08} baseDelay={1.9} style={{ fontSize: 64 }} />
      <div style={{ height: 30 }} />
      <Text size="md" color="muted" style={{ fontSize: 28, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        ἔλεγχος: refutación, prueba, examen cruzado.
      </Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  FASE 2: IDENTIDAD — "¿Qué es Elenxos?"
// ═══════════════════════════════════════════════════════════════════

/**
 * Post 3 — Misión: empresa de tecnología + estandarizar métodos académicos
 */
export const Intro_Post_Mision = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <LogicMesh density={0.5} />
    <KodamaParticles count={30} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={22} tagline="elenxos.com" />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <ElenxosLogo size={80} color="kodama" animated glow />
      <div style={{ height: 10 }} />
      <Text size="sm" color="kodama" style={{ fontSize: 20, letterSpacing: 6, textTransform: 'uppercase' }}>Nuestra misión</Text>
      <CinematicText text="Estandarizar" level="h1" delayStep={0.08} style={{ fontSize: 72 }} />
      <CinematicText text="la investigación" level="h1" delayStep={0.08} baseDelay={0.8} style={{ fontSize: 72 }} />
      <CinematicText text="académica." level="h1" color="kodama" delayStep={0.1} baseDelay={1.6} style={{ fontSize: 72 }} />
      <Text size="md" color="muted" style={{ marginTop: 24, fontSize: 24, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Somos una empresa de tecnología que construye el estándar para métodos académicos en investigaciones y proyectos educativos.
      </Text>
    </div>
  </SocialCanvas>
);

/**
 * Post 4 — La Dualidad: Bosque Ancestral × Lógica Formal
 */
export const Intro_Post_Dualidad = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/intro/intro_dualidad_bosque.png" opacity={0.5} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.65) 0%, rgba(15,37,25,0.85) 100%)" />
    <GlowOrb color="kodama" size={400} x="70%" y="40%" blur={120} opacity={0.1} />
    <GlowOrb color="warm" size={300} x="30%" y="60%" blur={100} opacity={0.08} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="Tecnología para la academia" />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <ElenxosLogo size={60} color="kodama" animated glow />
      <CinematicText text="Naturaleza" level="h2" delayStep={0.07} style={{ fontSize: 56 }} />
      <CinematicText text="×" level="h2" color="muted" delayStep={0.1} baseDelay={0.7} style={{ fontSize: 40 }} />
      <CinematicText text="Lógica." level="h2" color="kodama" delayStep={0.07} baseDelay={1.2} style={{ fontSize: 56 }} />
      <div style={{ height: 10 }} />
      <DialecticFlow thesis="Bosque" antithesis="Lógica" synthesis="Elenxos" color="kodama" />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 22, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Donde la creatividad del pensamiento encuentra la estructura del rigor.
      </Text>
    </div>
  </SocialCanvas>
);

/**
 * Story 2 — Encuesta: ¿Creatividad o rigor?
 */
export const Intro_Story_Encuesta = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050808 0%, #050A07 100%)' }} />
    <AuraBackground cinematicZoom />
    <GlowOrb color="kodama" size={500} x="50%" y="30%" blur={150} opacity={0.1} />
    <GlowOrb color="warm" size={400} x="50%" y="70%" blur={120} opacity={0.08} />
    <FrameOverlay variant="minimal" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 40 })}>
      <Text size="sm" color="kodama" style={{ fontSize: 22, letterSpacing: 8, textTransform: 'uppercase' }}>Tu opinión importa</Text>
      <CinematicText text="¿Qué necesita" level="h2" delayStep={0.06} style={{ fontSize: 52 }} />
      <CinematicText text="más la academia?" level="h2" color="kodama" delayStep={0.06} baseDelay={0.8} style={{ fontSize: 52 }} />
      <div style={{ height: 30 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: '80%' }}>
        <div style={{ padding: '20px 32px', border: '1px solid rgba(163,228,215,0.2)', borderRadius: 12, background: 'rgba(163,228,215,0.05)' }}>
          <Text size="md" color="kodama" style={{ fontSize: 26 }}>A) Más creatividad</Text>
        </div>
        <div style={{ padding: '20px 32px', border: '1px solid rgba(163,228,215,0.2)', borderRadius: 12, background: 'rgba(163,228,215,0.05)' }}>
          <Text size="md" color="kodama" style={{ fontSize: 26 }}>B) Más rigor metodológico</Text>
        </div>
        <div style={{ padding: '20px 32px', border: '1px solid rgba(199,48,48,0.2)', borderRadius: 12, background: 'rgba(199,48,48,0.05)' }}>
          <Text size="md" style={{ fontSize: 26, color: '#E04848' }}>C) Ambos — y mejores herramientas</Text>
        </div>
      </div>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  FASE 3: VISIÓN — "¿A dónde vamos?"
// ═══════════════════════════════════════════════════════════════════

/**
 * Post 5 — Principios: "El pensamiento merece herramientas a su altura"
 */
export const Intro_Post_Principios = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#060808' }} />
    <FibonacciSpiral size={400} color="kodama" animated />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <GridPattern variant="dots" gap={40} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <Badge variant="kodama" dot pulse style={{ fontSize: 20, padding: '10px 24px' }}>Nuestros principios</Badge>
      <div style={{ height: 10 }} />
      <QuoteCard
        quote="El pensamiento merece herramientas a su altura."
        author="Elenxos"
        fontSize={38}
      />
      <div style={{ height: 10 }} />
      <FormulaDisplay formula="rigor ∧ acceso → estándar" label="Nuestra fórmula" size="md" color="kodama" />
      <Text size="md" color="muted" style={{ marginTop: 16, fontSize: 22, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Si una disciplina exige precisión, sus herramientas no pueden conformarse con ambigüedad.
      </Text>
    </div>
  </SocialCanvas>
);

/**
 * Post 6 — De Elenxos nace Agora
 */
export const Intro_Post_AgoraNace = () => (
  <SocialCanvas format="post" scale={0.38}>
    <div style={{ position: 'absolute', inset: 0, background: '#050A07' }} />
    <AuraBackground cinematicZoom />
    <KodamaParticles count={25} />
    <GlowOrb color="kodama" size={500} x="50%" y="50%" blur={150} opacity={0.12} />
    <FrameOverlay variant="double" />
    <BrandMark position="bottom-right" fontSize={22} tagline="agora.elenxos.com" />
    <div style={abs({ padding: '80px', gap: 20 })}>
      <ElenxosLogo size={70} color="kodama" animated glow />
      <Text size="sm" color="kodama" style={{ fontSize: 20, letterSpacing: 6, textTransform: 'uppercase' }}>De Elenxos nace</Text>
      <CinematicText text="Agora." level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 96, letterSpacing: 12 }} />
      <div style={{ height: 10 }} />
      <DialecticFlow thesis="Elenxos" antithesis="Tecnología" synthesis="Agora" color="kodama" />
      <Text size="md" color="muted" style={{ marginTop: 24, fontSize: 24, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Nuestra plataforma de investigación cooperativa. Donde escritura, verificación y colaboración viven en un solo flujo.
      </Text>
    </div>
  </SocialCanvas>
);

// ═══════════════════════════════════════════════════════════════════
//  FASE 4: INVITACIÓN — "Únete"
// ═══════════════════════════════════════════════════════════════════

/**
 * Post 7 — La promesa: "Del barro nace el rigor"
 */
export const Intro_Post_Promesa = () => (
  <SocialCanvas format="post" scale={0.38}>
    <AIImageBackground src="/ai-images/intro/intro_bosque_ancestral.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.7) 0%, rgba(15,37,25,0.9) 100%)" />
    <KodamaParticles count={20} />
    <GlowOrb color="kodama" size={400} x="50%" y="50%" blur={120} opacity={0.1} />
    <FrameOverlay variant="corners" />
    <BrandMark position="bottom-right" fontSize={22} tagline="elenxos.com" />
    <div style={abs({ padding: '80px', gap: 24 })}>
      <ElenxosLogo size={70} color="kodama" animated glow />
      <div style={{ height: 10 }} />
      <QuoteCard
        quote="Del barro nace el rigor."
        author=""
        fontSize={44}
      />
      <CinematicText text="Desde Medellín" level="h3" color="muted" delayStep={0.06} baseDelay={1} style={{ fontSize: 32 }} />
      <CinematicText text="para la academia global." level="h3" color="kodama" delayStep={0.06} baseDelay={1.6} style={{ fontSize: 32 }} />
      <Text size="md" color="muted" style={{ marginTop: 20, fontSize: 22, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Elenxos — Tecnología que estandariza métodos académicos para investigaciones y proyectos educativos.
      </Text>
    </div>
  </SocialCanvas>
);

/**
 * Story 3 — CTA: Síguenos
 */
export const Intro_Story_CTA = () => (
  <SocialCanvas format="reel" scale={0.38}>
    <AIImageBackground src="/ai-images/intro/intro_portal_conocimiento.png" opacity={0.4} blend="luminosity" overlay="linear-gradient(180deg, rgba(5,10,7,0.6) 0%, rgba(5,10,7,0.9) 100%)" />
    <KodamaParticles count={30} />
    <GlowOrb color="kodama" size={600} x="50%" y="40%" blur={180} opacity={0.12} />
    <FrameOverlay variant="corners" />
    <BrandMark position="center-bottom" fontSize={22} />
    <div style={abs({ padding: '160px 80px', gap: 36 })}>
      <ElenxosLogo size={100} color="kodama" animated glow />
      <CinematicText text="ELENXOS" level="h1" color="kodama" delayStep={0.12} style={{ fontSize: 86, letterSpacing: 16 }} />
      <Text size="md" color="muted" style={{ fontSize: 26, textAlign: 'center', lineHeight: 1.7, maxWidth: '85%' }}>
        Tecnología que estandariza métodos académicos
      </Text>
      <div style={{ height: 30 }} />
      <div style={{ padding: '18px 52px', border: '1px solid rgba(163,228,215,0.4)', borderRadius: 8 }}>
        <Text size="lg" color="kodama" style={{ fontSize: 28, letterSpacing: 4, textTransform: 'uppercase' }}>Síguenos</Text>
      </div>
      <Text size="sm" color="muted" style={{ fontSize: 20, marginTop: 16 }}>elenxos.com · agora.elenxos.com</Text>
    </div>
  </SocialCanvas>
);
