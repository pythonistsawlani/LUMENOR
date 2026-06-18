'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import NetworkGraph from '../three/NetworkGraph';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text1Ref.current || !text2Ref.current || !ctaRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into lines for animation
      const lines1 = Array.from(text1Ref.current!.children);
      const lines2 = Array.from(text2Ref.current!.children);

      // Set initial state for lines2
      gsap.set(lines2, { y: 100, opacity: 0 });

      // Initial load animation for lines1 (delayed to wait for loading screen)
      gsap.fromTo(lines1,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 3.5 }
      );

      // Pin the hero section while user scrolls to read text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Scroll for 1.5x screen height
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      // Fade out first block. Use fromTo so it doesn't read the initial opacity: 0 as the starting point.
      tl.fromTo(lines1, { opacity: 1, y: 0 }, { y: -50, opacity: 0, stagger: 0.1, ease: 'power2.inOut' });

      // Fade in second block
      tl.to(lines2, { y: 0, opacity: 1, stagger: 0.2, ease: 'power2.out' }, '+=0.2');

      // Fade in CTA
      tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'power2.out' }, '-=0.2');
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      {/* 3D Living Network Background/Right Side */}
      <div className="absolute inset-0 md:left-1/3 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <NetworkGraph nodeCount={150} connectionDistance={3.5} />
        </Canvas>

        {/* Radial fade to blend the 3D scene into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/50 to-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent hidden md:block w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 h-full items-center">
        <div className="md:col-span-8 flex flex-col justify-center h-full pt-20">

          <div className="relative h-48 md:h-64 mb-8">
            {/* First block */}
            <div ref={text1Ref} className="absolute inset-0 flex flex-col justify-center">
              <div className="overflow-hidden"><h1 className="font-heading text-display-md leading-[1.1] text-white opacity-0">The solar industry</h1></div>
              <div className="overflow-hidden"><h1 className="font-heading text-display-md leading-[1.1] text-text-secondary opacity-0">runs on chaos.</h1></div>
            </div>

            {/* Second block */}
            <div ref={text2Ref} className="absolute inset-0 flex flex-col justify-center pointer-events-none">
              <div className="overflow-hidden"><h2 className="font-heading text-display-sm leading-[1.1] text-white">We built</h2></div>
              <div className="overflow-hidden"><h2 className="font-heading text-display-sm leading-[1.1] text-amber-400">the intelligence layer.</h2></div>
            </div>
          </div>

          <div ref={ctaRef} className="opacity-0">
            <MagneticButton className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 transition-colors cursor-pointer">
              <span className="relative z-10 text-sm tracking-widest uppercase font-semibold text-white group-hover:text-amber-400 transition-colors pointer-events-none">
                See the future
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
