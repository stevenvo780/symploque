import React, { useRef, useCallback } from 'react';
import styles from './Button.module.scss';

/**
 * Elenxos Button
 *
 * Variantes: primary | secondary | danger | ghost | glow
 * Tamaños:   sm | md | lg
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconOnly?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconOnly = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Ripple effect
      const btn = btnRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const diameter = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
        ripple.className = styles['elx-btn__ripple'];
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      }
      onClick?.(e);
    },
    [onClick]
  );

  const classes = [
    styles['elx-btn'],
    styles[`elx-btn--${variant}`],
    styles[`elx-btn--${size}`],
    iconOnly && styles['elx-btn--icon-only'],
    fullWidth && styles['elx-btn--full'],
    loading && styles['elx-btn--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={btnRef} className={classes} onClick={handleClick} {...rest}>
      {loading && <span className={styles['elx-btn__loader']} />}
      <span className={styles['elx-btn__content']}>
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;
