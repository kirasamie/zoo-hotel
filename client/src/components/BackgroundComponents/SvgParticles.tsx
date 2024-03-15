import React, { useEffect, useRef, useState } from 'react';

interface particlesConfigType {
  colors: string[];
  sizeRange: boolean;
  size: number[];
  particlesCount: number;
  deltaX: number;
  deltaY: number;
  deltaXrandomness: number;
  deltaYrandomness: number;
  parallaxDepth: number;
  roundness: number;
  svg?: string[];
}

interface propsType extends particlesConfigType {
  config: string;
  style: object;
}

interface particlesConfigEnumType {
  [key: string]: particlesConfigType;
}

const particlesConfigEnum: particlesConfigEnumType = {
  snow: {
    colors: ['#fff', '#ccc', '#aaa'],
    sizeRange: true,
    size: [0.2, 4],
    particlesCount: 30,
    deltaX: 1,
    deltaY: 1,
    deltaXrandomness: 1,
    deltaYrandomness: 1,
    parallaxDepth: 1,
    roundness: 1,
  },
  sandstorm: {
    colors: ['#ffd43b', '#f08c00', '#fd7e14', '#e8590c'],
    sizeRange: true,
    size: [0.2, 1],
    particlesCount: 100,
    deltaX: 20,
    deltaY: 1,
    deltaXrandomness: 2,
    deltaYrandomness: 1,
    parallaxDepth: 2,
    roundness: 0.5,
  },
  bubbles: {
    colors: ['#3b89d1', '#6057e7', '#172ead', '#1a84b6'],
    sizeRange: true,
    size: [1, 5],
    particlesCount: 50,
    deltaX: 0.5,
    deltaY: -1,
    deltaXrandomness: -1,
    deltaYrandomness: 1,
    parallaxDepth: 0.5,
    roundness: 1,
  },
  space: {
    colors: ['#fff'],
    sizeRange: true,
    size: [0.1, 1],
    particlesCount: 70,
    deltaX: -0.01,
    deltaY: 0,
    deltaXrandomness: 0,
    deltaYrandomness: 0,
    parallaxDepth: 100,
    roundness: 1,
  },
};

export default function LiveParticles({ ...props }: propsType): JSX.Element {
  const particlesConfig: particlesConfigType = particlesConfigEnum[props.config] || particlesConfigEnum['snow'];
  props.colors !== undefined && (particlesConfig.colors = props.colors);
  props.sizeRange !== undefined ? (particlesConfig.sizeRange = props.sizeRange) : (particlesConfig.sizeRange = false);
  props.size !== undefined && (particlesConfig.size = props.size);
  props.particlesCount !== undefined && (particlesConfig.particlesCount = props.particlesCount);
  props.deltaX !== undefined && (particlesConfig.deltaX = props.deltaX);
  props.deltaY !== undefined && (particlesConfig.deltaY = props.deltaY);
  props.deltaXrandomness !== undefined && (particlesConfig.deltaXrandomness = props.deltaXrandomness);
  props.deltaYrandomness !== undefined && (particlesConfig.deltaYrandomness = props.deltaYrandomness);
  props.parallaxDepth !== undefined && (particlesConfig.parallaxDepth = props.parallaxDepth);
  props.roundness !== undefined && (particlesConfig.roundness = props.roundness);
  props.svg !== undefined && (particlesConfig.svg = props.svg);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const rnd = (min: number, max: number) => Math.round(Math.random() * (max - min + 1)) + min; // целочисленный рандомайзер
    const frnd = (min: number, max: number) => Math.random() * (max - min + 1) + min; // плавоточечный рандомайзер
    const selectRandom = <T,>(items: Array<T>): T => items[rnd(0, items.length - 1)]; // рандовыбор из массива

    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      let animationFrameId: number;

      const W: number = window.innerWidth;
      const H: number = window.innerHeight;
      canvas.width = W;
      canvas.height = H;

      const roundness = 2 * Math.PI * particlesConfig.roundness;
      const particlesCount = Math.round((particlesConfig.particlesCount * W * H) / 100_000);
      const deltaXrandomness = 1 + particlesConfig.deltaXrandomness;
      const deltaYrandomness = 1 + particlesConfig.deltaYrandomness;

      const particles = Array.from({ length: particlesCount }, () => {
        const size = particlesConfig.sizeRange ? frnd(particlesConfig.size[0], particlesConfig.size[1]) : selectRandom(particlesConfig.size);

        console.log(props.mySvg);
        return {
          x: rnd(0, W),
          y: rnd(0, H),
          color: selectRandom(particlesConfig.colors),
          size: size,
          deltaX: ((1 + particlesConfig.parallaxDepth * size ** 0.1) / 10) * particlesConfig.deltaX * frnd(size, size * deltaXrandomness),
          deltaY: ((1 + particlesConfig.parallaxDepth * size ** 0.1) / 10) * particlesConfig.deltaY * frnd(size, size * deltaYrandomness),
          svg: selectRandom(props.mySvg),
        };
      });

      const draw = () => {
        context.clearRect(0, 0, W, H);

        particles.forEach((particle) => {
          if (props.mySvg?.length) {
            if (particle.svg) {
              context.drawImage(particle.svg, particle.x, particle.y, particle.size, particle.size);
            }
          } else {
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.size, 0, roundness);
          }

          context.fill();

          // приращение координат
          particle.x += particle.deltaX;
          particle.y += particle.deltaY;

          // проверки выхода за границы экрана
          if (particle.x > W) {
            particle.x = -particle.size;
            particle.deltaX = ((1 + particlesConfig.parallaxDepth * particle.size ** 0.1) / 10) * particlesConfig.deltaX * frnd(particle.size, particle.size * deltaXrandomness);
          } else if (particle.x < -particle.size) {
            particle.x = W;
            particle.deltaX = ((1 + particlesConfig.parallaxDepth * particle.size ** 0.1) / 10) * particlesConfig.deltaX * frnd(particle.size, particle.size * deltaXrandomness);
          }
          if (particle.y < -particle.size) {
            particle.y = H;
            particle.deltaY = ((1 + particlesConfig.parallaxDepth * particle.size ** 0.1) / 10) * particlesConfig.deltaY * frnd(particle.size, particle.size * deltaYrandomness);
          } else if (particle.y > H) {
            particle.y = -particle.size;
            particle.deltaY = ((1 + particlesConfig.parallaxDepth * particle.size ** 0.1) / 10) * particlesConfig.deltaY * frnd(particle.size, particle.size * deltaYrandomness);
          }
        });
        animationFrameId = requestAnimationFrame(draw);
      };

      draw();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: '0', left: '0', ...props.style }}></canvas>;
}
