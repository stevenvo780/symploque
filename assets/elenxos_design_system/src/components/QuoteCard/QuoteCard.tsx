import React from 'react';
import styles from './QuoteCard.module.scss';

export interface QuoteCardProps {
  quote: string;
  author?: string;
  fontSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author, fontSize = 32, className = '', style = {} }) => (
  <div className={`${styles['elx-quote-card']} ${className}`} style={style}>
    <span className={styles['elx-quote-card__mark']}>"</span>
    <p className={styles['elx-quote-card__text']} style={{ fontSize }}>{quote}</p>
    <div className={styles['elx-quote-card__rule']} />
    {author && <p className={styles['elx-quote-card__author']}>{author}</p>}
  </div>
);
export default QuoteCard;
