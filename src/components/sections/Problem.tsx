'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const text4Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !chaosRef.current) return;

    // Create chaotic floating elements
    const elements = chaosRef.current.children;
    gsap.set(elements, { 
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      opacity: 0.1,
      scale: () => Math.random() * 0.5 + 0.5
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // Very long scroll for pacing
        pin: true,
        scrub: 1,
      }
    });

    // Move chaos elements randomly during scroll
    Array.from(elements).forEach((el) => {
      tl.to(el, {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        rotation: () => Math.random() * 360,
        opacity: () => Math.random() * 0.3,
        ease: 'none',
      }, 0);
    });

    // Freeze chaos elements near the end
    tl.to(elements, { opacity: 0.02, duration: 0.5 }, 0.8);

    // Initial state for text
    gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });
    gsap.set(text4Ref.current, { opacity: 0, scale: 0.9 });

    // Text reveal sequence
    tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
      .to(text1Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.3)
      
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.35)
      .to(text2Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.55)
      
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 0.1 }, 0.6)
      .to(text3Ref.current, { opacity: 0, y: -50, duration: 0.1 }, 0.8)
      
      .to(text4Ref.current, { opacity: 1, scale: 1, duration: 0.2 }, 0.85);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-void overflow-hidden flex items-center justify-center">
      
      {/* Background Chaos Elements */}
      <div ref={chaosRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ transformOrigin: 'center' }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`dot-${i}`} 
            className="absolute w-2 h-2 rounded-full bg-white/20 blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 h-full flex items-center justify-center">
        {/* We use absolute positioning for text so they overlap perfectly in the center */}
        <h3 ref={text1Ref} className="absolute font-heading text-display-sm text-text-secondary text-center w-full px-6">
          Spreadsheets replacing systems.
        </h3>
        
        <h3 ref={text2Ref} className="absolute font-heading text-display-sm text-text-secondary text-center w-full px-6">
          WhatsApp replacing workflows.
        </h3>

        <h3 ref={text3Ref} className="absolute font-heading text-display-sm text-text-secondary text-center w-full px-6">
          Guesswork replacing intelligence.
        </h3>

        <h2 ref={text4Ref} className="absolute font-heading text-display-md text-text-primary text-center w-full px-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          Until now.
        </h2>
      </div>
    </section>
  );
}
