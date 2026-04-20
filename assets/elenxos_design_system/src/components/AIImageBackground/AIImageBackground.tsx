import React from 'react';

export interface AIImageBackgroundProps {
  src: string;
  opacity?: number;
  blend?: React.CSSProperties['mixBlendMode'];
  overlay?: string;
}

/**
 * Full-bleed image background layer for SocialCanvas.
 * Place as a direct child of SocialCanvas, before other content layers.
 */
export const AIImageBackground: React.FC<AIImageBackgroundProps> = ({
  src,
  opacity = 1,
  blend = 'normal',
  overlay,
}) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <img
      src={src}
      alt=""
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity,
        mixBlendMode: blend,
        display: 'block',
      }}
    />
    {overlay && (
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    )}
  </div>
);
