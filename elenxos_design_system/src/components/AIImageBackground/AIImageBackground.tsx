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
function resolveRuntimeSrc(src: string): string {
  if (typeof window === 'undefined') return src;

  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('aiBg') || src;
  } catch {
    return src;
  }
}

export const AIImageBackground: React.FC<AIImageBackgroundProps> = ({
  src,
  opacity = 1,
  blend = 'normal',
  overlay,
}) => {
  const resolvedSrc = resolveRuntimeSrc(src);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <img
        src={resolvedSrc}
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
};
