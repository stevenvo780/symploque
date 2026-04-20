import React from 'react';
import styles from './CinematicText.module.scss';

export interface CinematicTextProps {
  text: string;
  /** 'heading' uses Playfair Display serif, 'text' uses Inter sans */
  type?: 'heading' | 'text';
  level?: 'hero' | 'h1' | 'h2' | 'h3';
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Seconds between each letter animation start */
  delayStep?: number;
  /** Base delay in seconds before the animation starts */
  baseDelay?: number;
  color?: 'primary' | 'kodama' | 'muted';
  className?: string;
  style?: React.CSSProperties;
}

const colorMap: Record<string, string> = {
  primary: '#FFFFFF',
  kodama: '#A3E4D7',
  muted: '#7A8A85',
};

const sizeMap: Record<string, string> = {
  md: '1.25rem', lg: '1.563rem', xl: '1.953rem', '2xl': '2.441rem', '3xl': '3.052rem',
};

export const CinematicText: React.FC<CinematicTextProps> = ({
  text,
  type = 'heading',
  level = 'h1',
  size = 'xl',
  delayStep = 0.05,
  baseDelay = 0,
  color = 'primary',
  className = '',
  style = {},
}) => {
  const characters = text.split('');

  const fontFamily = type === 'heading'
    ? "'Playfair Display', Georgia, serif"
    : "'Inter', sans-serif";

  const defaultFontSize = type === 'heading'
    ? { hero: '4.768rem', h1: '3.815rem', h2: '3.052rem', h3: '2.441rem' }[level] || '3rem'
    : sizeMap[size] || '1.25rem';

  const wrapperStyle: React.CSSProperties = {
    fontFamily,
    fontSize: defaultFontSize,
    fontWeight: type === 'heading' ? 700 : 400,
    lineHeight: 1.15,
    color: colorMap[color] || colorMap.primary,
    margin: 0,
    display: 'block',
    ...style,
  };

  const content = characters.map((char, index) => {
    if (char === ' ') return <span key={index}>&nbsp;</span>;
    return (
      <span
        key={index}
        className={styles['elx-cinematic-text__char']}
        style={{ animationDelay: `${baseDelay + index * delayStep}s` }}
      >
        {char}
      </span>
    );
  });

  // Use a simple div so we have full control — no dependency on Typography component styles
  return (
    <div className={`${styles['elx-cinematic-text']} ${className}`} style={wrapperStyle}>
      {content}
    </div>
  );
};

export default CinematicText;
