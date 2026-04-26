import React from 'react';
import styles from './TopologyMorph.module.scss';

export interface TopologyMorphProps {
  size?: number;
  count?: number;
  color?: 'kodama' | 'mask' | 'mixed';
  className?: string;
  style?: React.CSSProperties;
}

export const TopologyMorph: React.FC<TopologyMorphProps> = ({
  size = 60, count = 5, color = 'kodama', className = '', style = {},
}) => {
  const classes = [styles['elx-topology'], styles[`elx-topology--${color}`], className].filter(Boolean).join(' ');

  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: i * 0.6,
    left: `${10 + (i / count) * 80}%`,
    top: `${30 + Math.sin(i * 1.2) * 20}%`,
    s: size * (0.6 + Math.random() * 0.8),
  }));

  return (
    <div className={classes} style={style} aria-hidden="true">
      {shapes.map((sh) => (
        <div
          key={sh.id}
          className={styles['elx-topology__shape']}
          style={{
            width: sh.s,
            height: sh.s,
            left: sh.left,
            top: sh.top,
            animationDelay: `${sh.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
export default TopologyMorph;
