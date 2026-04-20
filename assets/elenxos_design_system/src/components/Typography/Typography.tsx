import React from 'react';
import styles from './Typography.module.scss';

// ── Heading ──────────────────────────────────────────────────
type HeadingLevel = 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
const headingTagMap: Record<HeadingLevel, keyof JSX.IntrinsicElements> = {
  hero: 'h1', h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
};

export interface HeadingProps {
  level?: HeadingLevel;
  gradient?: boolean;
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  gradient = false,
  glow = false,
  children,
  className = '',
}) => {
  const Tag = headingTagMap[level];
  const classes = [
    styles['elx-heading'],
    styles[`elx-heading--${level}`],
    gradient && styles['elx-heading--gradient'],
    glow && styles['elx-heading--glow'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
};

// ── Text ─────────────────────────────────────────────────────
export interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'kodama' | 'mask';
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  size = 'base',
  weight = 'regular',
  color = 'secondary',
  as: Tag = 'p',
  children,
  className = '',
}) => {
  const classes = [
    styles['elx-text'],
    styles[`elx-text--${size}`],
    styles[`elx-text--${weight}`],
    styles[`elx-text--${color}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
};

// ── Label ────────────────────────────────────────────────────
export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <span className={`${styles['elx-label']} ${className}`}>{children}</span>;

// ── Code ─────────────────────────────────────────────────────
export const Code: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <code className={`${styles['elx-code']} ${className}`}>{children}</code>;

export default Heading;
