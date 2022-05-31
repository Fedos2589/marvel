import { useEffect, useMemo, useRef, useState } from 'react';
import { SingletonRouter, withRouter } from 'next/router'
import api from '../api';
import { mapCharacters } from '../api/mappers';
import { ListCharacter } from '../api/types';
import { Character } from '../components/character';
import { Pagination } from '../components/pagination';
import { Skeleton } from '../components/skeleton';
import { Search } from '../components/search';

import styles from './home.module.scss';

export const charactersPerPage = 10;

export interface HomeProps {
  router: SingletonRouter;
}

function Home({ router }: HomeProps) {
  const [charactersList, setCharactersList] = useState<ListCharacter[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const wasReady = useRef(false);
  const getParameters = useMemo(() => {
    const { isReady, query } = router;
    // синхронизация параметров с серч параметрами в урле при первой загрузке страницы
    const isInitialFetch = !wasReady.current && isReady;
    const currentPage = isInitialFetch ? Number(query?.page) : page;
    const currentSearch = isInitialFetch ? query.search : search;
  
    const baseParameters = {
      limit: charactersPerPage,
      offset: (currentPage - 1) * charactersPerPage,
    }

    return currentSearch?.length === 0
      ? baseParameters
      : { ...baseParameters, nameStartsWith: currentSearch };
  }, [page, search, router.isReady, wasReady]);

  useEffect(() => {
    const { isReady, query } = router;

    if (isReady && !wasReady.current) {
      query?.page && setPage(Number(query.page))
      query?.search && setSearch(query.search as string)
    }
  }, [router.query])

  useEffect(() => {
    if (!wasReady.current) {
      wasReady.current = router.isReady;
    }

    if (router.isReady) {
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
    }
  }, [router.query])

  return (
    <>
      <Search isDisabled={isLoading} setSearch={setSearch} setPage={setPage} />
      <div className={styles.container}>
        {isLoading && Array(charactersPerPage).fill('').map((_item, index) => <Skeleton key={index} />)}
        {!isLoading && charactersList.map((character: ListCharacter) => <Character key={character.id} {...character} />)}
        {total > charactersPerPage && <Pagination total={total} page={page} onClick={setPage} />}
      </div>
    </>
  )
}

export default withRouter(Home);
