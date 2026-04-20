import React from 'react';
import styles from './CinematicText.module.scss';
import { Heading, Text } from '../Typography/Typography';

export interface CinematicTextProps {
  text: string;
  type?: 'heading' | 'text';
  level?: 'hero' | 'h1' | 'h2' | 'h3';
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  delayStep?: number;
  baseDelay?: number;
  color?: 'primary' | 'kodama' | 'muted';
  className?: string;
}

export const CinematicText: React.FC<CinematicTextProps> = ({
  text,
  type = 'heading',
  level = 'h1',
  size = 'xl',
  delayStep = 0.05,
  baseDelay = 0,
  color = 'primary',
  className = '',
}) => {
  const characters = text.split('');

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

  const Wrapper = type === 'heading' ? Heading : Text;
  const wrapperProps = type === 'heading' ? { level, gradient: color === 'kodama' } : { size, color };

  return (
    <Wrapper className={`${styles['elx-cinematic-text']} ${className}`} {...wrapperProps}>
      {content}
    </Wrapper>
  );
};

export default CinematicText;
