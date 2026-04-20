import { useState } from 'react';
import {
  Button, Card, CardTitle, CardBody, CardFooter,
  Badge, Input, Modal, Heading, Text,
  Spinner, Toast, Tooltip, Divider,
  KodamaParticles
} from './index';

import { SocialPostExample } from './templates/SocialPostExample';
import { SocialReelExample } from './templates/SocialReelExample';
import { SocialBannerExample } from './templates/SocialBannerExample';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'info' | 'success' | 'warning' | 'error' }[]>([]);

  const addToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    setToasts((prev) => [...prev, { id: Date.now(), message: `Este es un mensaje de tipo ${type} inspirado en la Princesa Mononoke.`, type }]);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '40px' }}>
      {/* Fondo etéreo global */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <KodamaParticles count={30} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
        
        {/* Header Principal */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Heading level="h1" gradient>Elenxos Design System</Heading>
          <Text size="lg" color="kodama">Componentes Core & Social Media Studio</Text>
        </div>

        <Divider variant="glow" />

        {/* ── SOCIAL MEDIA STUDIO ── */}
        <section>
          <Heading level="h2" glow style={{ textAlign: 'center', marginBottom: '40px' }}>Social Media Studio</Heading>
          <Text align="center" style={{ marginBottom: '40px' }}>
            Plantillas generadas con código puro (HTML/CSS/React). Listas para grabar o capturar.
          </Text>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'center' }}>
            
            {/* Banner */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Heading level="h4" color="muted" style={{ marginBottom: '16px' }}>LinkedIn / X Banner (4:1)</Heading>
              <SocialBannerExample />
            </div>

            {/* Post & Reel lado a lado */}
            <div style={{ display: 'flex', gap: '80px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Heading level="h4" color="muted" style={{ marginBottom: '16px' }}>Instagram / FB Post (1:1)</Heading>
                <SocialPostExample />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Heading level="h4" color="muted" style={{ marginBottom: '16px' }}>Reel / Historia (9:16)</Heading>
                <SocialReelExample />
              </div>
            </div>

          </div>
        </section>

        <Divider variant="dashed" />

        {/* ── COMPONENTES CORE ── */}
        <section>
          <Heading level="h2" glow style={{ textAlign: 'center', marginBottom: '40px' }}>Componentes Base</Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Buttons */}
            <div>
              <Heading level="h4" color="muted">Botones</Heading>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
                <Button variant="primary">Explorar Agora</Button>
                <Button variant="secondary">Conectar Nodo</Button>
                <Button variant="danger">Destruir Canon</Button>
                <Button variant="ghost">Leer Documentación</Button>
                <Button variant="glow">Sincronizar</Button>
                <Button loading>Cargando</Button>
              </div>
            </div>

            {/* Badges & Spinners */}
            <div>
              <Heading level="h4" color="muted">Indicadores y Spinners</Heading>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '16px' }}>
                <Badge variant="kodama" dot pulse>Bioluminiscencia</Badge>
                <Badge variant="mask">Energía Vital</Badge>
                <Badge variant="forest">Bosque Profundo</Badge>
                <Badge variant="ash">Estructura</Badge>
                <Spinner variant="kodama" size="lg" />
                <Spinner variant="ring" size="md" />
              </div>
            </div>

            {/* Cards */}
            <div>
              <Heading level="h4" color="muted">Tarjetas</Heading>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginTop: '16px' }}>
                <Card variant="glass" animated>
                  <CardTitle>Agora</CardTitle>
                  <CardBody>Un ecosistema epistémico interconectado para la academia global.</CardBody>
                  <CardFooter>
                    <Button size="sm">Entrar</Button>
                    <Badge variant="kodama" dot pulse>Online</Badge>
                  </CardFooter>
                </Card>

                <Card variant="glow">
                  <CardTitle>Lexis</CardTitle>
                  <CardBody>El motor de traducción fenomenológica y estructura axiomática.</CardBody>
                  <CardFooter>
                    <Button size="sm" variant="secondary">Analizar</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated">
                  <CardTitle>Sintaxis</CardTitle>
                  <CardBody>Herramientas de estructuración de información densa.</CardBody>
                  <CardFooter>
                    <Button size="sm" variant="ghost">Detalles</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* Interacciones */}
            <div>
              <Heading level="h4" color="muted">Interacciones y Alertas</Heading>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Abrir Portal (Modal)</Button>
                
                <Tooltip content="El espíritu del bosque protege este elemento" position="top">
                  <Button variant="glow">Pasar el cursor (Tooltip)</Button>
                </Tooltip>

                <Button variant="ghost" onClick={() => addToast('info')}>Toast Info</Button>
                <Button variant="ghost" onClick={() => addToast('success')}>Toast Success</Button>
                <Button variant="danger" onClick={() => addToast('error')}>Toast Error</Button>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Renders absolutos */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Conexión Establecida" footer={<Button onClick={() => setIsModalOpen(false)}>Entendido</Button>}>
        <Text color="primary" size="lg">El canon metodológico ha sido inicializado.</Text>
        <Text>Las estructuras fenomenológicas se están traduciendo a matrices lógicas inexpugnables. Por favor, mantenga la conexión estable.</Text>
      </Modal>

      <div style={{ position: 'fixed', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 1000 }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} title="Notificación del Sistema" message={toast.message} onClose={() => setToasts(t => t.filter(x => x.id !== toast.id))} />
        ))}
      </div>
    </div>
  );
}

export default App;
