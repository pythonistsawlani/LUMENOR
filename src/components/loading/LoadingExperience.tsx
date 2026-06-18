'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from '@/lib/gsap';
import ParticleField from '../three/ParticleField';

interface LoadingExperienceProps {
  onComplete: () => void;
}

export default function LoadingExperience({ onComplete }: LoadingExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.to({ p: 0 }, {
      p: 1,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(this.targets()[0].p);
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <ParticleField progress={progress} particleCount={3000} />
        </Canvas>
      </div>
    </div>
  );
}
