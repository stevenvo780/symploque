import React from 'react';
import styles from './FibonacciSpiral.module.scss';

export interface FibonacciSpiralProps {
  size?: number;
  color?: 'kodama' | 'mask' | 'gold';
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const FibonacciSpiral: React.FC<FibonacciSpiralProps> = ({
  size = 400, color = 'kodama', animated = true, className = '', style = {},
}) => {
  const classes = [styles['elx-fibonacci'], styles[`elx-fibonacci--${color}`], animated ? styles['elx-fibonacci--animated'] : '', className].filter(Boolean).join(' ');

  // Golden ratio boxes
  const fib = [1, 1, 2, 3, 5, 8, 13, 21];
  const total = fib.reduce((a, b) => a + b, 0);
  
  return (
    <div className={classes} style={{ width: size, height: size, ...style }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className={styles['elx-fibonacci__svg']}>
        {/* Golden spiral approximation */}
        <path
          d="M50,50 C50,30 65,15 85,15 C85,35 70,50 50,50 C30,50 15,35 15,15 C35,15 50,30 50,50 C50,70 35,85 15,85 C15,65 30,50 50,50 C70,50 85,65 85,85 C65,85 50,70 50,50"
          fill="none"
          strokeWidth="0.5"
          className={styles['elx-fibonacci__path']}
        />
        {/* Golden ratio rectangles */}
        <rect x="10" y="10" width="80" height="80" fill="none" strokeWidth="0.3" className={styles['elx-fibonacci__rect']} />
        <rect x="10" y="10" width="49.4" height="80" fill="none" strokeWidth="0.3" className={styles['elx-fibonacci__rect']} />
        <rect x="10" y="10" width="49.4" height="49.4" fill="none" strokeWidth="0.3" className={styles['elx-fibonacci__rect']} />
        {/* φ symbol */}
        <text x="50" y="54" textAnchor="middle" className={styles['elx-fibonacci__phi']}>φ</text>
      </svg>
    </div>
  );
};
export default FibonacciSpiral;
