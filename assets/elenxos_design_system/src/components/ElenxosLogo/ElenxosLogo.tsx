import React from 'react';
import styles from './ElenxosLogo.module.scss';

export interface ElenxosLogoProps {
  size?: number;
  color?: 'kodama' | 'cream' | 'white' | 'mask';
  animated?: boolean;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ElenxosLogo: React.FC<ElenxosLogoProps> = ({
  size = 80, color = 'cream', animated = true, glow = false, className = '', style = {},
}) => {
  const classes = [
    styles['elx-logo'], styles[`elx-logo--${color}`],
    animated ? styles['elx-logo--animated'] : '',
    glow ? styles['elx-logo--glow'] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={{ width: size, height: size, ...style }}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles['elx-logo__svg']}>
        {/* Hexágono */}
        <polygon
          points="20,2 35.6,11 35.6,29 20,38 4.4,29 4.4,11"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className={styles['elx-logo__hex']}
        />
        {/* Triángulo */}
        <polygon
          points="4.4,11 35.6,11 20,38"
          strokeWidth="1"
          strokeLinejoin="round"
          className={styles['elx-logo__tri']}
        />
        {/* Topología de red */}
        <path
          d="M20,20 L20,2 M20,20 L35.6,29 M20,20 L4.4,29"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={styles['elx-logo__net']}
        />
        {/* Nodos */}
        <circle cx="20" cy="20" r="3.5" className={styles['elx-logo__node-center']} />
        <circle cx="20" cy="11" r="1.5" className={styles['elx-logo__node']} />
        <circle cx="27.8" cy="24.5" r="1.5" className={styles['elx-logo__node']} />
        <circle cx="12.2" cy="24.5" r="1.5" className={styles['elx-logo__node']} />
      </svg>
    </div>
  );
};
export default ElenxosLogo;
