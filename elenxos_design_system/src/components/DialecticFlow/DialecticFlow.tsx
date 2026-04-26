import React, { useMemo } from 'react';
import styles from './DialecticFlow.module.scss';

export interface DialecticFlowProps {
  thesis?: string;
  antithesis?: string;
  synthesis?: string;
  showLabels?: boolean;
  color?: 'kodama' | 'mask' | 'gold';
  className?: string;
  style?: React.CSSProperties;
}

export const DialecticFlow: React.FC<DialecticFlowProps> = ({
  thesis = 'Tesis', antithesis = 'Antítesis', synthesis = 'Síntesis',
  showLabels = true, color = 'kodama', className = '', style = {},
}) => {
  const classes = [styles['elx-dialectic'], styles[`elx-dialectic--${color}`], className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} aria-hidden="true">
      <div className={styles['elx-dialectic__node'] + ' ' + styles['elx-dialectic__thesis']}>
        <div className={styles['elx-dialectic__circle']} />
        {showLabels && <span className={styles['elx-dialectic__label']}>{thesis}</span>}
      </div>
      <div className={styles['elx-dialectic__arrow']} />
      <div className={styles['elx-dialectic__node'] + ' ' + styles['elx-dialectic__antithesis']}>
        <div className={styles['elx-dialectic__circle']} />
        {showLabels && <span className={styles['elx-dialectic__label']}>{antithesis}</span>}
      </div>
      <div className={styles['elx-dialectic__arrow']} />
      <div className={styles['elx-dialectic__node'] + ' ' + styles['elx-dialectic__synthesis']}>
        <div className={styles['elx-dialectic__circle']} />
        {showLabels && <span className={styles['elx-dialectic__label']}>{synthesis}</span>}
      </div>
    </div>
  );
};
export default DialecticFlow;
