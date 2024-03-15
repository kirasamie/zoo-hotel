import { useState } from 'react';
import styles from './Background.module.css';
import SvgParticles from './SvgParticles';
// import { LiveParticles } from 'live-particles';

export default function Background() {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const svgPaths = ['/bubble-dog.svg', '/bubble-cat.svg'];
  let loadedImagesCounter = 0;
  const svgImages = svgPaths.map((svgName) => {
    const image = new Image();
    image.src = svgName;
    image.onload = () => {
      loadedImagesCounter += 1;
    };
    return image;
  });
  const interval = setInterval(() => {
    if (loadedImagesCounter === svgPaths.length) {
      setIsImagesLoaded(true);
      clearInterval(interval);
    }
  }, 100);

  return (
    <>
      {/* <LiveParticles
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
      /> */}
      {/* <LiveParticles
        colors={['#faa', '#aaf', '#afa']}
        style={{ zIndex: '-100' }}
        sizeRange={true}
        size={[4, 10]}
        deltaX={0.1}
        deltaY={-0.1}
        deltaXrandomness={-2}
        deltaYrandomness={-0.5}
        particlesCount={2}
        parallaxDepth={1}
      /> */}
      {isImagesLoaded && (
        <SvgParticles
          mySvg={svgImages}
          // svg={['/bubble-dog.svg', '/bubble-cat.svg']}
          style={{ zIndex: '-100' }}
          sizeRange={true}
          size={[70, 100]}
          deltaX={0.02}
          deltaY={-0.01}
          deltaXrandomness={-2}
          deltaYrandomness={-0.5}
          particlesCount={1}
          parallaxDepth={1}
          config={''}
          colors={[]}
          roundness={0}
        />
      )}
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
