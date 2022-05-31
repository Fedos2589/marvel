import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './search.module.scss';

export interface SearchProps {
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  isDisabled?: boolean;
}

export const Search = ({ setSearch, setPage, isDisabled }: SearchProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(inputValue);
    setPage(1);
    router.push({ query: { search: inputValue, page: 1 } });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.search}
        name="search"
        onChange={handleChange}
        value={inputValue}
        placeholder='Search input'
        disabled={isDisabled}
      />
      <button type='submit' disabled={isDisabled}>Search</button>
    </form>
  )
}
