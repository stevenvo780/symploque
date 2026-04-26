import React from 'react';
import styles from './Divider.module.scss';

export interface DividerProps {
  variant?: 'solid' | 'gradient' | 'glow' | 'mask' | 'dashed';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'gradient',
  spacing = 'md',
  className = '',
}) => {
  const classes = [
    styles['elx-divider'],
    styles[`elx-divider--${variant}`],
    styles[`elx-divider--${spacing}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <hr className={classes} />;
};

export default Divider;
