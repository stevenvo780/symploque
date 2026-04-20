import React from 'react';
import styles from './FormulaDisplay.module.scss';

export interface FormulaDisplayProps {
  formula: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'kodama' | 'mask' | 'white' | 'gold';
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({
  formula, label, size = 'md', color = 'kodama', animated = true, className = '', style = {},
}) => {
  const classes = [
    styles['elx-formula'],
    styles[`elx-formula--${size}`],
    styles[`elx-formula--${color}`],
    animated ? styles['elx-formula--animated'] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <div className={styles['elx-formula__text']}>{formula}</div>
      {label && <div className={styles['elx-formula__label']}>{label}</div>}
    </div>
  );
};
export default FormulaDisplay;
