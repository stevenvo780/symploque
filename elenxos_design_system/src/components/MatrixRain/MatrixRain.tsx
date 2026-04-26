import React, { useMemo } from 'react';
import styles from './MatrixRain.module.scss';

export interface MatrixRainProps {
  columns?: number;
  charset?: 'greek' | 'logic' | 'math' | 'kanji' | 'binary';
  color?: 'kodama' | 'mask' | 'amber';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const charsets: Record<string, string[]> = {
  greek:  'αβγδεζηθικλμνξπρστυφχψω'.split(''),
  logic:  '∀∃∴∵¬∧∨⇒⇔∈⊂⊃∪∩⊢⊨⊤⊥'.split(''),
  math:   '∫∂∇∑∏√∝∞≈≡≠≤≥±×÷'.split(''),
  kanji:  '道德仁義理智信忠孝悌節'.split(''),
  binary: '01'.split(''),
};

export const MatrixRain: React.FC<MatrixRainProps> = ({
  columns = 30, charset = 'greek', color = 'kodama', speed = 'normal', className = '',
}) => {
  const chars = charsets[charset];
  const cols = useMemo(() => Array.from({ length: columns }, (_, i) => ({
    id: i,
    chars: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
    left: `${(i / columns) * 100}%`,
    delay: Math.random() * 8,
    duration: speed === 'fast' ? 4 + Math.random() * 3 : speed === 'slow' ? 10 + Math.random() * 6 : 6 + Math.random() * 4,
  })), [columns, charset, speed]);

  const classes = [styles['elx-matrix-rain'], styles[`elx-matrix-rain--${color}`], className].filter(Boolean).join(' ');

  return (
    <div className={classes} aria-hidden="true">
      {cols.map((col) => (
        <div key={col.id} className={styles['elx-matrix-rain__col']} style={{
          left: col.left, animationDelay: `${col.delay}s`, animationDuration: `${col.duration}s`,
        }}>
          {col.chars.map((c, j) => (
            <span key={j} className={styles['elx-matrix-rain__char']} style={{ animationDelay: `${j * 0.1}s` }}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
};
export default MatrixRain;
