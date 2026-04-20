import React from 'react';
import { SocialCanvas, AuraBackground, LogicMesh, CinematicText, KodamaParticles, Card, CardTitle, CardBody, Badge } from '../index';

export const SocialPostExample: React.FC = () => {
  return (
    <SocialCanvas format="post" scale={0.4}>
      <AuraBackground />
      <LogicMesh density={80} />
      <KodamaParticles count={30} relative />
      
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
        
        <Badge variant="kodama" dot pulse size="md" style={{ marginBottom: '40px', transform: 'scale(1.5)' }}>NUEVO MÓDULO</Badge>

        <CinematicText 
          text="Lexis 2.0" 
          level="hero" 
          color="kodama" 
          delayStep={0.15}
          style={{ fontSize: '120px', marginBottom: '20px', textShadow: '0 0 60px rgba(163, 228, 215, 0.3)' }}
        />

        <div style={{ marginTop: '20px', marginBottom: '80px', width: '80%' }}>
          <CinematicText 
            text="El traductor fenomenológico más avanzado." 
            type="text"
            size="3xl" 
            color="primary" 
            baseDelay={1.5}
            delayStep={0.03}
            style={{ lineHeight: 1.3 }}
          />
        </div>

        <Card variant="glass" animated style={{ transform: 'scale(1.3)', width: '80%', padding: '40px' }}>
          <CardTitle>Conexión Axiomática</CardTitle>
          <CardBody>
            Capacidad extendida para mapear hasta 100,000 nodos epistémicos simultáneos en tiempo real.
          </CardBody>
        </Card>

      </div>
    </SocialCanvas>
  );
};
