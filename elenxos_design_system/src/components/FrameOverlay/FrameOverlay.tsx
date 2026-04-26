import React from 'react';
import styles from './FrameOverlay.module.scss';

export interface FrameOverlayProps {
  variant?: 'minimal' | 'corners' | 'double' | 'mask' | 'vignette';
  className?: string;
}

export const FrameOverlay: React.FC<FrameOverlayProps> = ({ variant = 'corners', className = '' }) => {
  const classes = [styles['elx-frame-overlay'], styles[`elx-frame-overlay--${variant}`], className].filter(Boolean).join(' ');
  return (
    <div className={classes} aria-hidden="true">
      {variant === 'corners' && (
        <>
          <span className={styles['elx-frame-overlay__corner-tr']} />
          <span className={styles['elx-frame-overlay__corner-bl']} />
        </>
      )}
    </div>
  );
};
export default FrameOverlay;
