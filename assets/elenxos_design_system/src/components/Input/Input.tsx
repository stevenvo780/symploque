import React from 'react';
import styles from './Input.module.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  success?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textarea?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  size = 'md',
  error,
  success,
  helper,
  leftIcon,
  rightIcon,
  textarea = false,
  rows = 4,
  className = '',
  id,
  ...rest
}) => {
  const inputId = id || `elx-input-${Math.random().toString(36).slice(2, 8)}`;
  const state = error ? 'error' : success ? 'success' : '';
  const helperText = error || success || helper;

  const rootClasses = [
    styles['elx-input'],
    styles[`elx-input--${size}`],
    state && styles[`elx-input--${state}`],
    leftIcon && styles['elx-input--has-icon-left'],
    rightIcon && styles['elx-input--has-icon-right'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const fieldClasses = [
    styles['elx-input__field'],
    textarea && styles['elx-input__field--textarea'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {label && (
        <label htmlFor={inputId} className={styles['elx-input__label']}>
          {label}
        </label>
      )}
      <div className={styles['elx-input__wrapper']}>
        {textarea ? (
          <textarea
            id={inputId}
            className={fieldClasses}
            rows={rows}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input id={inputId} className={fieldClasses} {...rest} />
        )}
        {leftIcon && <span className={styles['elx-input__icon-left']}>{leftIcon}</span>}
        {rightIcon && <span className={styles['elx-input__icon-right']}>{rightIcon}</span>}
      </div>
      {helperText && <span className={styles['elx-input__helper']}>{helperText}</span>}
    </div>
  );
};

export default Input;
