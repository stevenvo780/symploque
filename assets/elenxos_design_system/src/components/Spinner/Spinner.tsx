import React from 'react';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ring' | 'kodama';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'ring',
  className = '',
}) => {
  const classes = [
    styles['elx-spinner'],
    styles[`elx-spinner--${size}`],
    variant === 'kodama' && styles['elx-spinner--kodama'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'kodama') {
    return (
      <div className={classes} role="status" aria-label="Cargando">
        <span className={styles['elx-spinner__dot']} />
        <span className={styles['elx-spinner__dot']} />
        <span className={styles['elx-spinner__dot']} />
        <span className={styles['elx-spinner__dot']} />
      </div>
    );
  }

  return (
    <div className={classes} role="status" aria-label="Cargando">
      <div className={styles['elx-spinner__ring']} />
    </div>
  );
};

export default Spinner;
