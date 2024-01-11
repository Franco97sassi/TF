import React, { useEffect, useState } from 'react';

const CircleAnimation = () => {
  const [circleTop, setCircleTop] = useState(0);
  const [circleLeft, setCircleLeft] = useState('100%');

  useEffect(() => {
    const animationTime = 3000; // Duración total de la animación en milisegundos
    const animationSteps = 100; // Número de pasos para completar la animación
    const stepDuration = animationTime / animationSteps; // Duración de cada paso en milisegundos
    const stepSize = 100 / animationSteps; // Tamaño del paso para la posición superior

    let stepCount = 0;

    const interval = setInterval(() => {
      setCircleTop((prevTop) => {
        const newTop = prevTop + stepSize;
        if (newTop >= 50) {
          clearInterval(interval);
          return 50;
        }
        return newTop;
      });

      setCircleLeft((prevLeft) => {
        const newLeft = 100 - (stepCount * 2);
        if (newLeft <= 0) {
          clearInterval(interval);
          return '0%';
        }
        stepCount++;
        return `${newLeft}%`;
      });
    }, stepDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'gray',
          position: 'absolute',
          top: `${circleTop}%`,
          left: circleLeft,
          transform: 'translate(-50%, -50%)',
          transition: 'top 1s, left 1s',
        }}
      ></div>
    </div>
  );
};

export default CircleAnimation;