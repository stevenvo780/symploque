import React from 'react';
import styles from './GridPattern.module.scss';

export interface GridPatternProps {
  variant?: 'dots' | 'lines' | 'cross' | 'perspective';
  gap?: number;
  className?: string;
}

export const GridPattern: React.FC<GridPatternProps> = ({ variant = 'dots', gap = 40, className = '' }) => {
  const classes = [styles['elx-grid-pattern'], styles[`elx-grid-pattern--${variant}`], className].filter(Boolean).join(' ');
  return <div className={classes} aria-hidden="true" style={{ '--gap': `${gap}px` } as React.CSSProperties} />;
};
export default GridPattern;
