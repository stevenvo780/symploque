import React from 'react';
import styles from './HexGrid.module.scss';

export interface HexGridProps {
  cols?: number;
  rows?: number;
  size?: number;
  color?: 'kodama' | 'mask' | 'mixed' | 'muted';
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const HexGrid: React.FC<HexGridProps> = ({
  cols = 6, rows = 4, size = 40, color = 'kodama', animated = true, className = '', style = {},
}) => {
  const classes = [
    styles['elx-hexgrid'],
    styles[`elx-hexgrid--${color}`],
    animated ? styles['elx-hexgrid--animated'] : '',
    className,
  ].filter(Boolean).join(' ');

  const hexes: { x: number; y: number; idx: number }[] = [];
  const w = size * 1.73;
  const h = size * 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      hexes.push({
        x: c * w + (r % 2 === 1 ? w / 2 : 0),
        y: r * h * 0.75,
        idx: r * cols + c,
      });
    }
  }

  const hexPath = (cx: number, cy: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + size * 0.9 * Math.cos(angle)},${cy + size * 0.9 * Math.sin(angle)}`;
    });
    return `M${pts.join('L')}Z`;
  };

  return (
    <div className={classes} style={style} aria-hidden="true">
      <svg
        viewBox={`-${size} -${size} ${cols * w + w} ${rows * h * 0.75 + size}`}
        className={styles['elx-hexgrid__svg']}
      >
        {hexes.map((hex) => (
          <path
            key={hex.idx}
            d={hexPath(hex.x, hex.y)}
            className={styles['elx-hexgrid__hex']}
            style={{ animationDelay: `${hex.idx * 0.08}s` }}
          />
        ))}
      </svg>
    </div>
  );
};
export default HexGrid;
