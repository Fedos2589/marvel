import Link from 'next/link';
import { useEffect } from 'react';
import styles from './home.module.scss';
import api from './api';

export default function Home() {
  useEffect(() => {
    api.get('characters').then(res => console.log(res))
  },[])
  return (
    <div className={styles.container}>
      <Link href='/character'><a>character</a></Link>
    </div>
  )
}
