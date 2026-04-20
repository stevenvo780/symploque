import React, { useMemo } from 'react';
import styles from './KodamaParticles.module.scss';

export interface KodamaParticlesProps {
  count?: number;
  relative?: boolean;
  className?: string;
}

/**
 * Partículas flotantes bioluminiscentes estilo Kodama.
 * Usa `relative` para contener dentro de un padre con position: relative.
 */
export const KodamaParticles: React.FC<KodamaParticlesProps> = ({
  count = 20,
  relative = false,
  className = '',
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 100;
      const duration = 8 + Math.random() * 16;
      const delay = Math.random() * duration;
      const dx = -50 + Math.random() * 100;
      const variants = ['', '--dim', '--bright', '--mask'];
      const variant = variants[Math.floor(Math.random() * (i % 5 === 0 ? 4 : 3))];

      return { id: i, x, duration, delay, dx, variant };
    });
  }, [count]);

  const rootClasses = [
    styles['elx-particles'],
    relative && styles['elx-particles--relative'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`${styles['elx-particles__particle']} ${
            p.variant ? styles[`elx-particles__particle${p.variant}`] : ''
          }`}
          style={
            {
              '--x': `${p.x}%`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--dx': `${p.dx}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default KodamaParticles;
