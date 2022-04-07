import styles from './skeleton.module.scss';

export const Skeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image} />
      <div className={styles.textBlock}>
        <div className={styles.name} />
        <div className={styles.description} />
      </div>
    </div>
  )
}