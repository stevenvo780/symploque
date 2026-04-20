import React from 'react';
import styles from './GradientWave.module.scss';

export interface GradientWaveProps { speed?: number; className?: string; }

export const GradientWave: React.FC<GradientWaveProps> = ({ speed = 20, className = '' }) => (
  <div className={`${styles['elx-gradient-wave']} ${className}`} aria-hidden="true"
    style={{ '--speed': `${speed}s` } as React.CSSProperties}>
    <div className={styles['elx-gradient-wave__layer']} />
    <div className={styles['elx-gradient-wave__layer']} />
    <div className={styles['elx-gradient-wave__layer']} />
  </div>
);
export default GradientWave;
