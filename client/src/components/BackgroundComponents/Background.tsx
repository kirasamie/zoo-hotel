import styles from './Background.module.css';
import { LiveParticles } from 'live-particles';

export default function Background() {
  return (
    <>
      <LiveParticles
        svg={['/bubble-dog.svg', '/bubble-cat.svg']}
        style={{ zIndex: '-100' }}
        sizeRange={true}
        size={[70, 100]}
        deltaX={0.02}
        deltaY={-0.01}
        deltaXrandomness={-2}
        deltaYrandomness={-0.5}
        particlesCount={1}
        parallaxDepth={1}
      />
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
