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
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  gradient = false,
  glow = false,
  children,
  className = '',
  style,
  ...rest
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

  return <Tag className={classes} style={style} {...rest}>{children}</Tag>;
};

// ── Text ─────────────────────────────────────────────────────
export interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'kodama' | 'mask';
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const Text: React.FC<TextProps> = ({
  size = 'base',
  weight = 'regular',
  color = 'secondary',
  as: Tag = 'p',
  children,
  className = '',
  style,
  ...rest
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

  return <Tag className={classes} style={style} {...rest}>{children}</Tag>;
};

// ── Label ────────────────────────────────────────────────────
export const Label: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children, className = '', style,
}) => <span className={`${styles['elx-label']} ${className}`} style={style}>{children}</span>;

// ── Code ─────────────────────────────────────────────────────
export const Code: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children, className = '',
}) => <code className={`${styles['elx-code']} ${className}`}>{children}</code>;

export default Heading;
