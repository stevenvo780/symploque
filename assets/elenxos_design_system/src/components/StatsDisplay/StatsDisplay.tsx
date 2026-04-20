import React from 'react';
import styles from './StatsDisplay.module.scss';

export interface StatItem { value: string; label: string; }

export interface StatsDisplayProps {
  stats: StatItem[];
  fontSize?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, fontSize = 64, delay = 0, className = '', style = {} }) => (
  <div className={`${styles['elx-stats']} ${className}`} style={style}>
    {stats.map((stat, i) => (
      <React.Fragment key={i}>
        {i > 0 && <div className={styles['elx-stats__divider']} />}
        <div className={styles['elx-stats__item']} style={{ animationDelay: `${delay + i * 0.2}s` }}>
          <div className={styles['elx-stats__value']} style={{ fontSize }}>{stat.value}</div>
          <div className={styles['elx-stats__label']}>{stat.label}</div>
        </div>
      </React.Fragment>
    ))}
  </div>
);
export default StatsDisplay;
