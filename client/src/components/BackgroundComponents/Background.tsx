import styles from './Background.module.css';

export default function Background() {
  return (
    <>
      <div className={styles.bodyBackground} />
      <div className={styles.track}>
        <div className={styles.cat} />
        <div className={styles.mouse} />
        <div className={styles.dog} />
      </div>
      <div className={styles.clouds}>
        <div className={styles.farClouds} />
        <div className={styles.nearClouds} />
      </div>
    </>
  );
}
