import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { MagicalParticles } from '../engines/particlesEngine';

const BackgroundParticles = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      engineRef.current = new MagicalParticles(canvasRef.current);
    }
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    burstSparks: (x, y, count, colorType) => {
      if (engineRef.current) {
        engineRef.current.burstSparks(x, y, count, colorType);
      }
    },
    burstConfetti: (x, y, count) => {
      if (engineRef.current) {
        engineRef.current.burstConfetti(x, y, count);
      }
    }
  }));

  return <canvas ref={canvasRef} id="particles-canvas" aria-hidden="true" />;
});

export default BackgroundParticles;
