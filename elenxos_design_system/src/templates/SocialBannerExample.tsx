import React from 'react';
import { SocialCanvas, AuraBackground, LogicMesh, CinematicText, KodamaParticles } from '../index';

export const SocialBannerExample: React.FC = () => {
  return (
    <SocialCanvas format="banner" scale={0.6}>
      <AuraBackground cinematicZoom={false} />
      <LogicMesh density={100} />
      <KodamaParticles count={40} relative />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px'
      }}>
        <CinematicText 
          text="ELENXOS" 
          level="hero" 
          color="kodama" 
          delayStep={0.1}
          style={{ fontSize: '100px', letterSpacing: '20px', marginLeft: '20px', textShadow: '0 0 40px rgba(163, 228, 215, 0.4)' }}
        />
        <div style={{ marginTop: '20px' }}>
          <CinematicText 
            text="SISTEMAS COMPLEJOS Y SOFTWARE ACADÉMICO" 
            type="text"
            size="2xl" 
            color="muted" 
            baseDelay={1}
            delayStep={0.03}
            style={{ letterSpacing: '6px', fontWeight: 600 }}
          />
        </div>
      </div>
    </SocialCanvas>
  );
};
