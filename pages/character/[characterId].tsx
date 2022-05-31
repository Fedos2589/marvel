import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Accordion } from '../../components/accordion';
import api from '../../api';
import { mapCharacter } from '../../api/mappers';
import { SingleCharacter } from '../../api/types';
import styles from './character.module.scss';

export default function Character() {
  const [character, setCharacter] = useState<SingleCharacter>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { name, imageUrl, description, events, comics, series, stories } = character || {};
  const accordionSections = useMemo(() => ({
    events,
    comics,
    series,
    stories
  }), [character])

  useEffect(() => {
    setIsLoading(true)
    api.get(`characters/${router.query.characterId}`)
      .then(({ data }) => {
        setCharacter(mapCharacter(data.data.results[0]))
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
        setIsLoading(false)
      })
  }, [router.query.characterId])

  if (isLoading) {
    return 'Loading in progress...'
  }

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <img src={imageUrl} className={styles.image} alt='Character image' />
      <div className={styles.description}>{description}</div>
      <Accordion sections={accordionSections} />
    </div>
  )
}