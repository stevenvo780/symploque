import React, { useEffect, useState } from 'react';
import styles from './Toast.module.scss';

export interface ToastProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

const iconMap = { info: '🔮', success: '✦', warning: '⚠', error: '✕' };

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, onClose]);

  const classes = [
    styles['elx-toast'],
    styles[`elx-toast--${type}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="alert">
      <span className={styles['elx-toast__icon']}>{iconMap[type]}</span>
      <div className={styles['elx-toast__content']}>
        {title && <div className={styles['elx-toast__title']}>{title}</div>}
        <div className={styles['elx-toast__message']}>{message}</div>
      </div>
      <button className={styles['elx-toast__close']} onClick={onClose} aria-label="Cerrar">
        ✕
      </button>
      <div
        className={styles['elx-toast__progress']}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Toast;
