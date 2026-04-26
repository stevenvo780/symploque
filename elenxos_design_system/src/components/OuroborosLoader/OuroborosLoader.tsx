import React from 'react';
import styles from './OuroborosLoader.module.scss';

export interface OuroborosLoaderProps {
  size?: number;
  color?: 'kodama' | 'mask' | 'gold';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  style?: React.CSSProperties;
}

export const OuroborosLoader: React.FC<OuroborosLoaderProps> = ({
  size = 60, color = 'kodama', speed = 'normal', className = '', style = {},
}) => {
  const classes = [
    styles['elx-ouroboros'],
    styles[`elx-ouroboros--${color}`],
    styles[`elx-ouroboros--${speed}`],
    className,
  ].filter(Boolean).join(' ');

  const r = size * 0.38;
  const circumference = 2 * Math.PI * r;

  return (
    <div className={classes} style={{ width: size, height: size, ...style }}>
      <svg viewBox={`0 0 ${size} ${size}`} className={styles['elx-ouroboros__svg']}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          strokeWidth={size * 0.04}
          strokeDasharray={`${circumference * 0.7} ${circumference * 0.3}`}
          strokeLinecap="round"
          className={styles['elx-ouroboros__ring']}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r * 0.5}
          fill="none"
          strokeWidth={size * 0.025}
          strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
          strokeLinecap="round"
          className={styles['elx-ouroboros__inner']}
        />
        {/* Head marker */}
        <circle
          cx={size / 2 + r} cy={size / 2}
          r={size * 0.04}
          className={styles['elx-ouroboros__head']}
        />
      </svg>
      <div className={styles['elx-ouroboros__symbol']}>∞</div>
    </div>
  );
};
export default OuroborosLoader;
