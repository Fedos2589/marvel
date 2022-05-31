import { MouseEvent, useMemo } from 'react';

import styles from './paginationButton.module.scss';

export interface PaginationButtonProps {
  content: number | string;
  page: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const PaginationButton = ({ content, page, onClick }: PaginationButtonProps) => {
  const classes = `${styles.button} ${page === content ? styles.active : ''}`

  return <button className={classes} onClick={onClick} id={String(content)}>{content}</button>;
}
