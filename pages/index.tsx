import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './home.module.scss';
import api from './api';
import { Character } from '../components/character';
import { mapCharacters } from './api/mappers';
import { ListCharacter } from './api/types';
import { Pagination } from '../components/pagination';
import { Skeleton } from '../components/skeleton';

export const charactersPerPage = 10;

export default function Home() {
  const [charactersList, setCharactersList] = useState<ListCharacter[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const getParameters = useMemo(() => {
    const baseParameters = {
      limit: charactersPerPage,
      offset: (pagination - 1) * charactersPerPage,
    }

    return search.length === 0 ? baseParameters : { ...baseParameters, nameStartsWith: search };
  }, [search, pagination]);

  useEffect(() => {
    setIsLoading(true);
    api.get('characters', { params: getParameters })
      .then(({ data }) => {
        setCharactersList(data.data.results.map(mapCharacters))
        setTotal(data.data.total)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
        setIsLoading(false)
      })
  }, [pagination, search])

  const handleClick = useCallback((page: number) => setPagination(page), [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    pagination !== 1 && setPagination(1)
  }, [pagination])

  return (
    <>
      <input className={styles.search} value={search} onChange={handleChange} placeholder='Search input' />
      <div className={styles.container}>
        {isLoading && Array(charactersPerPage).fill('').map((_item, index) => <Skeleton key={index} />)}
        {!isLoading && charactersList.map((character: ListCharacter) => <Character key={character.id} {...character} />)}
        {total > charactersPerPage && <Pagination total={total} page={pagination} onClick={handleClick} />}
      </div>
    </>
  )
}
