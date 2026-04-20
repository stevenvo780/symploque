import React from 'react';
import styles from './ScanLines.module.scss';

export interface ScanLinesProps { heavy?: boolean; className?: string; }

export const ScanLines: React.FC<ScanLinesProps> = ({ heavy = false, className = '' }) => {
  const classes = [styles['elx-scan-lines'], heavy && styles['elx-scan-lines--heavy'], className].filter(Boolean).join(' ');
  return <div className={classes} aria-hidden="true" />;
};
export default ScanLines;
