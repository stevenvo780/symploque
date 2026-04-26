import React from 'react';
import styles from './PenrosePattern.module.scss';

export interface PenrosePatternProps {
  density?: number;
  color?: 'kodama' | 'mask' | 'muted';
  animated?: boolean;
  className?: string;
}

export const PenrosePattern: React.FC<PenrosePatternProps> = ({
  density = 6, color = 'kodama', animated = true, className = '',
}) => {
  const classes = [styles['elx-penrose'], styles[`elx-penrose--${color}`], animated ? styles['elx-penrose--animated'] : '', className].filter(Boolean).join(' ');

  const tiles = Array.from({ length: density * density }, (_, i) => {
    const row = Math.floor(i / density);
    const col = i % density;
    const offset = row % 2 === 0 ? 0 : 50 / density;
    return {
      id: i,
      x: (col / density) * 100 + offset,
      y: (row / density) * 100,
      size: 100 / density,
      delay: (row + col) * 0.1,
      type: (row + col) % 3,
    };
  });

  return (
    <div className={classes} aria-hidden="true">
      <svg viewBox="0 0 100 100" className={styles['elx-penrose__svg']}>
        {tiles.map((t) => (
          <g key={t.id} style={{ animationDelay: `${t.delay}s` }} className={styles['elx-penrose__tile']}>
            {t.type === 0 && (
              <polygon
                points={`${t.x + t.size / 2},${t.y} ${t.x + t.size},${t.y + t.size} ${t.x},${t.y + t.size}`}
                className={styles['elx-penrose__shape']}
              />
            )}
            {t.type === 1 && (
              <polygon
                points={`${t.x},${t.y} ${t.x + t.size},${t.y} ${t.x + t.size / 2},${t.y + t.size}`}
                className={styles['elx-penrose__shape']}
              />
            )}
            {t.type === 2 && (
              <polygon
                points={`${t.x + t.size * 0.2},${t.y + t.size * 0.2} ${t.x + t.size * 0.8},${t.y + t.size * 0.3} ${t.x + t.size * 0.7},${t.y + t.size * 0.8} ${t.x + t.size * 0.1},${t.y + t.size * 0.7}`}
                className={styles['elx-penrose__shape']}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
export default PenrosePattern;
