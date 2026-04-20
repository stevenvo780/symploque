import React from 'react';
import styles from './BrandMark.module.scss';

export interface BrandMarkProps {
  name?: string;
  tagline?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center-bottom';
  fontSize?: number;
  logoSize?: number;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  name = 'Elenxos', tagline, position = 'bottom-left', fontSize = 14, logoSize, className = '',
}) => {
  const classes = [styles['elx-brand'], styles[`elx-brand--${position}`], className].filter(Boolean).join(' ');
  const effectiveLogoSize = logoSize ?? Math.max(fontSize * 2.5, 36);
  return (
    <div className={classes}>
      <img
        src="/logo_elenxos_kodama.svg"
        alt=""
        style={{ width: effectiveLogoSize, height: effectiveLogoSize, display: 'block' }}
      />
      <div>
        <div className={styles['elx-brand__name']} style={{ fontSize }}>{name}</div>
        {tagline && <div className={styles['elx-brand__tagline']}>{tagline}</div>}
      </div>
    </div>
  );
};
export default BrandMark;
