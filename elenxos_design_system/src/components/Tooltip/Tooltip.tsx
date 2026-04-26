import React, { useState } from 'react';
import styles from './Tooltip.module.scss';

export interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  className = '',
}) => {
  const [visible, setVisible] = useState(false);

  const contentClasses = [
    styles['elx-tooltip__content'],
    styles[`elx-tooltip__content--${position}`],
    visible && styles['elx-tooltip__content--visible'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles['elx-tooltip']} ${className}`}>
      <div
        className={styles['elx-tooltip__trigger']}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
      </div>
      <div className={contentClasses} role="tooltip">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
