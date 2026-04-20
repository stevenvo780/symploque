import React, { useMemo } from 'react';
import styles from './SocialCanvas.module.scss';

export interface SocialCanvasProps {
  format?: 'post' | 'reel' | 'banner';
  scale?: number;
  children: React.ReactNode;
  className?: string;
}

export const SocialCanvas: React.FC<SocialCanvasProps> = ({
  format = 'post',
  scale = 0.5,
  children,
  className = '',
}) => {
  const classes = [
    styles['elx-social-canvas'],
    styles[`elx-social-canvas--${format}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Envolvemos el contenido en un contenedor escalado para que el usuario 
  // pueda verlo en su pantalla sin que mida 1920px de alto físicamente, 
  // pero el DOM interno se calcula sobre la resolución real.
  const wrapperStyle = useMemo(() => {
    const heightMap = { post: 1080, reel: 1920, banner: 500 };
    return {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: heightMap[format] * scale,
    };
  }, [format, scale]);

  return (
    <div style={wrapperStyle}>
      <div 
        className={classes} 
        style={{ transform: `scale(${scale})` }}
        aria-hidden="true" // Esencialmente es un lienzo decorativo
      >
        <div className={styles['elx-social-canvas__content']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SocialCanvas;
