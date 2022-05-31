import { useState, useCallback } from 'react';

import styles from './section.module.scss';

export interface SectionProps {
  title: string;
  list: string[];
}

export const Section = ({ title, list }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen)

  if (list?.length === 0) {
    return null;
  }

  return (
    <div className={styles.section}>
      <label className={styles.title}>
        {title}
        <input type='checkbox' checked={isOpen} onChange={handleClick} />
      </label>
      {isOpen && <ul className={styles.list}>{list?.map(item => <li key={item}>{item}</li>)}</ul>}
    </div>
  )
}