// ═══════════════════════════════════════════════════════════════
// ELENXOS DESIGN SYSTEM — Barrel Export (index.ts)
//
// Importa todo el sistema de diseño desde un único punto:
//   import { Button, Card, Badge, ... } from '@elenxos/design-system';
// ═══════════════════════════════════════════════════════════════

// ── Components ───────────────────────────────────────────────
export { Button } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button';

export { Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter } from './components/Card/Card';
export type { CardProps } from './components/Card/Card';

export { Badge } from './components/Badge/Badge';
export type { BadgeProps } from './components/Badge/Badge';

export { Input } from './components/Input/Input';
export type { InputProps } from './components/Input/Input';

export { Modal } from './components/Modal/Modal';
export type { ModalProps } from './components/Modal/Modal';

export { Heading, Text, Label, Code } from './components/Typography/Typography';
export type { HeadingProps, TextProps } from './components/Typography/Typography';

export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps } from './components/Spinner/Spinner';

export { Toast } from './components/Toast/Toast';
export type { ToastProps } from './components/Toast/Toast';

export { Tooltip } from './components/Tooltip/Tooltip';
export type { TooltipProps } from './components/Tooltip/Tooltip';

export { Divider } from './components/Divider/Divider';
export type { DividerProps } from './components/Divider/Divider';

export { KodamaParticles } from './components/KodamaParticles/KodamaParticles';
export type { KodamaParticlesProps } from './components/KodamaParticles/KodamaParticles';

// ── Design Tokens (JS) ──────────────────────────────────────
export { tokens } from './utils/tokens';
