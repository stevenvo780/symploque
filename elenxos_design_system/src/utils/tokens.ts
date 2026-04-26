// ═══════════════════════════════════════════════════════════════
// ELENXOS DESIGN SYSTEM — Design Tokens (JavaScript Export)
//
// Usa este archivo para acceder a tokens desde JS/TS:
//   import { tokens } from '@elenxos/design-system';
//   tokens.colors.kodama → '#A3E4D7'
// ═══════════════════════════════════════════════════════════════

export const tokens = {
  colors: {
    forestDeep:     '#0F2519',
    forestMid:      '#1A3A2A',
    forestLight:    '#254D3A',
    kodama:         '#A3E4D7',
    kodamaBright:   '#7FFFD4',
    kodamaDim:      '#5FBFAA',
    kodamaGlow:     'rgba(163, 228, 215, 0.35)',
    maskDeep:       '#8B0000',
    mask:           '#C73030',
    maskLight:      '#E04848',
    maskGlow:       'rgba(199, 48, 48, 0.3)',
    ash:            '#3A3F41',
    ashLight:       '#5A6264',
    ashDark:        '#2A2E30',
    iron:           '#1E2224',
    textPrimary:    '#FFFFFF',
    textSecondary:  '#B8C4C0',
    textMuted:      '#7A8A85',
    textInverse:    '#0F2519',
    success:        '#4ADE80',
    warning:        '#FBBF24',
    error:          '#C73030',
    info:           '#A3E4D7',
  },

  typography: {
    families: {
      serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
      sans:  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono:  "'JetBrains Mono', 'Fira Code', monospace",
    },
    sizes: {
      xs:   '0.64rem',
      sm:   '0.8rem',
      base: '1rem',
      md:   '1.25rem',
      lg:   '1.563rem',
      xl:   '1.953rem',
      '2xl': '2.441rem',
      '3xl': '3.052rem',
      '4xl': '3.815rem',
      hero:  '4.768rem',
    },
    weights: {
      light:     300,
      regular:   400,
      medium:    500,
      semibold:  600,
      bold:      700,
      extrabold: 800,
      black:     900,
    },
    lineHeights: {
      tight:   1.15,
      snug:    1.3,
      normal:  1.5,
      relaxed: 1.75,
      loose:   2,
    },
  },

  spacing: {
    0:  '0',
    1:  '0.25rem',
    2:  '0.5rem',
    3:  '0.75rem',
    4:  '1rem',
    5:  '1.25rem',
    6:  '1.5rem',
    8:  '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  radii: {
    none: '0',
    sm:   '0.25rem',
    md:   '0.5rem',
    lg:   '0.75rem',
    xl:   '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm:     '0 1px 3px rgba(0, 0, 0, 0.3)',
    md:     '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg:     '0 8px 32px rgba(0, 0, 0, 0.5)',
    xl:     '0 16px 48px rgba(0, 0, 0, 0.6)',
    kodama: '0 0 20px rgba(163, 228, 215, 0.25), 0 0 60px rgba(163, 228, 215, 0.1)',
    mask:   '0 0 20px rgba(199, 48, 48, 0.25), 0 0 60px rgba(199, 48, 48, 0.1)',
  },

  transitions: {
    fast:     '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal:   '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow:     '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    glacial:  '700ms cubic-bezier(0.16, 1, 0.3, 1)',
    ethereal: '1200ms cubic-bezier(0.22, 1, 0.36, 1)',
  },

  zIndex: {
    base:     0,
    dropdown: 100,
    sticky:   200,
    overlay:  300,
    modal:    400,
    toast:    500,
    tooltip:  600,
  },

  breakpoints: {
    sm:   '480px',
    md:   '768px',
    lg:   '1024px',
    xl:   '1280px',
    '2xl': '1536px',
  },
} as const;

export type ElenxosTokens = typeof tokens;
export default tokens;
