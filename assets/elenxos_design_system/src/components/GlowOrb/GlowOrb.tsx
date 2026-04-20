import React from 'react';
import styles from './GlowOrb.module.scss';

export interface GlowOrbProps {
  color?: 'kodama' | 'mask' | 'forest' | 'white' | 'warm';
  size?: number;
  x?: string; y?: string;
  blur?: number;
  opacity?: number;
  speed?: number;
  delay?: number;
  className?: string;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  color = 'kodama', size = 200, x = '50%', y = '50%',
  blur = 60, opacity = 0.4, speed = 12, delay = 0, className = '',
}) => {
  const classes = [styles['elx-glow-orb'], styles[`elx-glow-orb--${color}`], className].filter(Boolean).join(' ');
  return (
    <div className={classes} aria-hidden="true" style={{
      width: size, height: size, left: x, top: y,
      '--blur': `${blur}px`, '--opacity': opacity, '--speed': `${speed}s`,
      animationDelay: `${delay}s`, transform: 'translate(-50%, -50%)',
    } as React.CSSProperties} />
  );
};
export default GlowOrb;
