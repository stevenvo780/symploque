import React from 'react';
import styles from './QuantumParticle.module.scss';

export interface QuantumParticleProps {
  count?: number;
  color?: 'kodama' | 'mask' | 'mixed';
  entangled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const QuantumParticle: React.FC<QuantumParticleProps> = ({
  count = 12, color = 'kodama', entangled = false, className = '', style = {},
}) => {
  const classes = [
    styles['elx-quantum'],
    styles[`elx-quantum--${color}`],
    entangled ? styles['elx-quantum--entangled'] : '',
    className,
  ].filter(Boolean).join(' ');

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className={classes} style={style} aria-hidden="true">
      {particles.map((p) => (
        <React.Fragment key={p.id}>
          <div
            className={styles['elx-quantum__particle']}
            style={{
              left: p.x, top: p.y,
              width: p.size, height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
          {entangled && p.id < count / 2 && (
            <div
              className={styles['elx-quantum__entangle-line']}
              style={{
                left: p.x, top: p.y,
                width: `${20 + Math.random() * 30}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${p.delay}s`,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default QuantumParticle;
