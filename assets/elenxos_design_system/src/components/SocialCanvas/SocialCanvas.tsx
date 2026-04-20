import React, { createContext, useContext, useMemo } from 'react';
import styles from './SocialCanvas.module.scss';

// Context to override scale for render/export mode (scale=1)
const ScaleOverrideContext = createContext<number | null>(null);

export const ScaleOverrideProvider: React.FC<{ scale: number; children: React.ReactNode }> = ({ scale, children }) => (
  <ScaleOverrideContext.Provider value={scale}>{children}</ScaleOverrideContext.Provider>
);

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
  const overrideScale = useContext(ScaleOverrideContext);
  const effectiveScale = overrideScale ?? scale;

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
      height: heightMap[format] * effectiveScale,
    };
  }, [format, effectiveScale]);

  return (
    <div style={wrapperStyle}>
      <div 
        className={classes} 
        style={{ transform: `scale(${effectiveScale})` }}
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
