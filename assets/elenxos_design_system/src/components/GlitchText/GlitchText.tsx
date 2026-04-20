import React from 'react';
import styles from './GlitchText.module.scss';

export interface GlitchTextProps {
  text: string;
  level?: 'h1' | 'h2' | 'h3' | 'display';
  intensity?: 'subtle' | 'medium' | 'heavy';
  color?: 'kodama' | 'mask' | 'white';
  className?: string;
  style?: React.CSSProperties;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text, level = 'h2', intensity = 'medium', color = 'kodama', className = '', style = {},
}) => {
  const classes = [
    styles['elx-glitch'],
    styles[`elx-glitch--${level}`],
    styles[`elx-glitch--${intensity}`],
    styles[`elx-glitch--${color}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} data-text={text}>
      <span className={styles['elx-glitch__main']}>{text}</span>
      <span className={styles['elx-glitch__before']} aria-hidden="true">{text}</span>
      <span className={styles['elx-glitch__after']} aria-hidden="true">{text}</span>
    </div>
  );
};
export default GlitchText;
