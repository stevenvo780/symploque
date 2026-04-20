import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  footer,
  children,
  className = '',
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className={styles['elx-modal__overlay']} onClick={onClose}>
      <div
        className={`${styles['elx-modal__container']} ${styles[`elx-modal__container--${size}`]} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles['elx-modal__glow-line']} />
        {title && (
          <div className={styles['elx-modal__header']}>
            <h2 className={styles['elx-modal__title']}>{title}</h2>
            <button className={styles['elx-modal__close']} onClick={onClose} aria-label="Cerrar">
              ✕
            </button>
          </div>
        )}
        <div className={styles['elx-modal__body']}>{children}</div>
        {footer && <div className={styles['elx-modal__footer']}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
