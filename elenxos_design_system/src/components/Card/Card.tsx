import React from 'react';
import styles from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glow' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  animated = false,
  clickable = false,
  children,
  className = '',
  ...rest
}) => {
  const classes = [
    styles['elx-card'],
    styles[`elx-card--${variant}`],
    styles[`elx-card--${size}`],
    animated && styles['elx-card--animated'],
    clickable && styles['elx-card--clickable'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <div className={styles['elx-card__glow-line']} />
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`${styles['elx-card__header']} ${className}`}>{children}</div>;

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <h3 className={`${styles['elx-card__title']} ${className}`}>{children}</h3>;

export const CardSubtitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <p className={`${styles['elx-card__subtitle']} ${className}`}>{children}</p>;

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`${styles['elx-card__body']} ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`${styles['elx-card__footer']} ${className}`}>{children}</div>;

export default Card;
