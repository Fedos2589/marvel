import { useCallback, useMemo } from 'react';
import { charactersPerPage } from '../../pages';
import styles from './pagination.module.scss';
import { PaginationButton } from './paginationButton';

export interface PaginationProps {
  total: number;
  page: number;
  onClick: (page: number) => void;
}

const firstPage = '<<';
const lastPage = '>>';
// я понимаю, что логику пагинации лучше вынусти в хук,
// но на моем опыте хорошая кастомизируемая пагинация это много времени,
// поэтому вот такая небольшая собрана прямо в компоненте
export const Pagination = ({ total, page, onClick }: PaginationProps) => {
  const lastPageNumber = useMemo(() => Math.ceil(total / charactersPerPage), [total]);
  const buttons = useMemo(() => {
    if (total < (charactersPerPage * 2) + 1) {
      return [1, 2]
    }
    if ([1, 2].includes(page)) {
      return [1, 2, 3, lastPage]
    }
    if ([lastPageNumber, lastPageNumber - 1].includes(page)) {
      return [firstPage, lastPageNumber - 2, lastPageNumber - 1, lastPageNumber]
    }

    return [firstPage, page - 1, page, page + 1, lastPage]
  }, [page, lastPageNumber])

  const handleClick = useCallback((page: number | string) => {
    if (page === firstPage) {
      return onClick(1)
    }
    if (page === lastPage) {
      return onClick(lastPageNumber)
    }

    return onClick(Number(page))
  }, [lastPageNumber, total])

  return (
    <div className={styles.container}>
      {buttons.map(item => <PaginationButton key={item} content={item} page={page} onClick={handleClick} />)}
    </div>
  )
}