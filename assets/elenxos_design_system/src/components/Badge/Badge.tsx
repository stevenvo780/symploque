import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
  variant?: 'kodama' | 'mask' | 'forest' | 'ash' | 'success' | 'warning';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'kodama',
  size = 'sm',
  dot = false,
  pulse = false,
  children,
  className = '',
}) => {
  const classes = [
    styles['elx-badge'],
    styles[`elx-badge--${variant}`],
    styles[`elx-badge--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {dot && (
        <span
          className={`${styles['elx-badge__dot']} ${pulse ? styles['elx-badge__dot--pulse'] : ''}`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
