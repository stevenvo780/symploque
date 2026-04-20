import React from 'react';
import styles from './IconSymbol.module.scss';

const symbolMap: Record<string, string> = {
  infinity: '∞', sigma: 'Σ', phi: 'φ', omega: 'Ω', pi: 'π',
  delta: 'Δ', lambda: 'λ', psi: 'Ψ', theta: 'θ', mu: 'μ',
  epsilon: 'ε', alpha: 'α', beta: 'β', gamma: 'γ', zeta: 'ζ',
  forall: '∀', exists: '∃', therefore: '∴', because: '∵',
  not: '¬', and: '∧', or: '∨', implies: '⇒', iff: '⇔',
  element: '∈', subset: '⊂', union: '∪', intersect: '∩',
  star: '✦', diamond: '◆', circle: '●', ring: '◎',
  arrow: '→', darrow: '⇒', cross: '✕', check: '✓',
  tree: '🌿', spirit: '✧', flame: '🔥', moon: '☽', sun: '☀',
};

export interface IconSymbolProps {
  symbol: keyof typeof symbolMap | string;
  size?: number;
  color?: 'kodama' | 'mask' | 'muted' | 'white' | 'warm';
  x?: string; y?: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({
  symbol, size = 48, color = 'kodama',
  x, y, delay = 0, className = '', style = {},
}) => {
  const char = symbolMap[symbol] || symbol;
  const classes = [styles['elx-icon-symbol'], styles[`elx-icon-symbol--${color}`], className].filter(Boolean).join(' ');
  const posStyle: React.CSSProperties = {
    fontSize: size, animationDelay: `${delay}s`, ...style,
    ...(x !== undefined && y !== undefined ? { position: 'absolute', left: x, top: y } : {}),
  };
  return <span className={classes} style={posStyle} aria-hidden="true">{char}</span>;
};
export default IconSymbol;
