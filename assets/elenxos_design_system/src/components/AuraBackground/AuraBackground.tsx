import React from 'react';
import styles from './AuraBackground.module.scss';

export interface AuraBackgroundProps {
  cinematicZoom?: boolean;
  className?: string;
}

export const AuraBackground: React.FC<AuraBackgroundProps> = ({
  cinematicZoom = true,
  className = '',
}) => {
  const classes = [
    styles['elx-aura-bg'],
    cinematicZoom && styles['elx-aura-bg--zoom'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} aria-hidden="true" />;
};

export default AuraBackground;
