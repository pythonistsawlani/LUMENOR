'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ParticleField from '../three/ParticleField';
import RevealText from '../ui/RevealText';

export default function Transformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // Map scroll progress (0-1) to particle morph progress (0-1)
        // Add a slight curve so the snap to text happens a bit faster at the end
        const p = Math.pow(self.progress, 1.5);
        setProgress(p);
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-void overflow-hidden">
      
      {/* 3D Morphing Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <ParticleField progress={progress} particleCount={3000} />
        </Canvas>
      </div>

      {/* Narrative Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none">
        <div className="opacity-0" style={{ opacity: progress > 0.8 ? (progress - 0.8) * 5 : 0 }}>
          <p className="text-amber-400 uppercase tracking-[0.4em] text-sm font-semibold mb-4 text-center">
            The Operating Layer
          </p>
          <RevealText className="text-text-primary text-xl max-w-lg text-center leading-relaxed mx-auto">
            Transforming chaotic operations into a singular, intelligent ecosystem for the solar industry.
          </RevealText>
        </div>
      </div>
    </section>
  );
}
