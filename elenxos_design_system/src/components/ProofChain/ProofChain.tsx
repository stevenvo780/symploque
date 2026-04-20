import React from 'react';
import styles from './ProofChain.module.scss';

export interface ProofStep {
  symbol?: string;
  text: string;
}

export interface ProofChainProps {
  steps: ProofStep[];
  color?: 'kodama' | 'mask' | 'gold';
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_SYMBOLS = ['∵', '∴', '⇒', '∧', '∨', '≡', '⊢', '□'];

export const ProofChain: React.FC<ProofChainProps> = ({
  steps, color = 'kodama', animated = true, className = '', style = {},
}) => {
  const classes = [
    styles['elx-proof'],
    styles[`elx-proof--${color}`],
    animated ? styles['elx-proof--animated'] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {steps.map((step, i) => (
        <div
          key={i}
          className={styles['elx-proof__step']}
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <span className={styles['elx-proof__symbol']}>
            {step.symbol || DEFAULT_SYMBOLS[i % DEFAULT_SYMBOLS.length]}
          </span>
          <span className={styles['elx-proof__text']}>{step.text}</span>
          {i < steps.length - 1 && <div className={styles['elx-proof__connector']} />}
        </div>
      ))}
    </div>
  );
};
export default ProofChain;
