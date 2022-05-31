import Link from 'next/link';
import { ListCharacter } from '../../api/types';

import styles from './character.module.scss';

export const Character = ({ id, name, description, imageUrl }: ListCharacter) =>
  <Link href={`/character/${id}`}>
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} alt='Character image' />
      <div className={styles.textBlock}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  </Link>
