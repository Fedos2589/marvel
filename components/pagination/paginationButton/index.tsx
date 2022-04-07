import styles from './paginationButton.module.scss';
import { useCallback, useMemo } from 'react';

export interface PaginationButtonProps {
  content: number | string;
  page: number;
  onClick: (page: number | string) => void;
}

export const PaginationButton = ({ content, page, onClick }: PaginationButtonProps) => {
  const classes = useMemo(() => `${styles.button} ${page === content ? styles.active : ''}`, [page, content]);
  const handleClick = useCallback(() => onClick(content),[])

  return <button className={classes} onClick={handleClick}>{content}</button>
}
