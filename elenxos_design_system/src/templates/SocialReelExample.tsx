import React from 'react';
import { SocialCanvas, AuraBackground, CinematicText, KodamaParticles } from '../index';

export const SocialReelExample: React.FC = () => {
  return (
    <SocialCanvas format="reel" scale={0.35}>
      <AuraBackground cinematicZoom />
      <KodamaParticles count={80} relative />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        textAlign: 'center'
      }}>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '40px' }}>
          <CinematicText 
            text="Del caos" 
            level="h1" 
            color="muted" 
            delayStep={0.1}
            style={{ fontSize: '90px' }}
          />
          <CinematicText 
            text="fenomenológico..." 
            level="h1" 
            color="muted" 
            baseDelay={1}
            delayStep={0.1}
            style={{ fontSize: '90px', fontStyle: 'italic' }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CinematicText 
            text="AL CANON" 
            level="hero" 
            color="kodama" 
            baseDelay={3}
            delayStep={0.15}
            style={{ fontSize: '130px', letterSpacing: '10px' }}
          />
          <CinematicText 
            text="ESTRUCTURAL" 
            level="hero" 
            color="kodama" 
            baseDelay={4}
            delayStep={0.15}
            style={{ fontSize: '130px', letterSpacing: '10px' }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '100px' }}>
          <CinematicText 
            text="elenxos.com" 
            type="text"
            size="2xl" 
            color="primary" 
            baseDelay={5.5}
            delayStep={0.05}
            style={{ opacity: 0.8 }}
          />
        </div>

      </div>
    </SocialCanvas>
  );
};
