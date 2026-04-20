import React from 'react';
import styles from './BrandMark.module.scss';

export interface BrandMarkProps {
  name?: string;
  tagline?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center-bottom';
  fontSize?: number;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  name = 'Elenxos', tagline, position = 'bottom-left', fontSize = 14, className = '',
}) => {
  const classes = [styles['elx-brand'], styles[`elx-brand--${position}`], className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <span className={styles['elx-brand__dot']} />
      <div>
        <div className={styles['elx-brand__name']} style={{ fontSize }}>{name}</div>
        {tagline && <div className={styles['elx-brand__tagline']}>{tagline}</div>}
      </div>
    </div>
  );
};
export default BrandMark;
