'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import RevealText from '../ui/RevealText';
import MagneticButton from '../ui/MagneticButton';

const products = [
  {
    id: 'solarx',
    name: 'SolarX',
    color: 'from-amber-500',
    textColor: 'text-amber-400',
    desc: 'The intelligent marketplace for homeowners.',
  },
  {
    id: 'flowx',
    name: 'FlowX',
    color: 'from-blue-500',
    textColor: 'text-blue-400',
    desc: 'The operating system for modern EPCs.',
  },
  {
    id: 'fixx',
    name: 'FixX',
    color: 'from-purple-500',
    textColor: 'text-purple-400',
    desc: 'The execution layer for solar installers.',
  }
];

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pin the products container and crossfade background colors
    const panels = gsap.utils.toArray<HTMLElement>('.product-panel');

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => gsap.to(containerRef.current, { backgroundColor: getComputedStyle(panel).getPropertyValue('--bg-color') || '#030305', duration: 1 }),
        onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: getComputedStyle(panel).getPropertyValue('--bg-color') || '#030305', duration: 1 }),
      });
    });

  }, []);

  return (
    <div ref={containerRef} className="relative w-full transition-colors duration-1000 ease-out bg-void">
      {products.map((product, i) => (
        <section 
          key={product.id}
          className="product-panel relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ '--bg-color': i === 0 ? '#1a1005' : i === 1 ? '#0a101f' : '#140a1f' } as React.CSSProperties}
        >
          {/* Central Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-b ${product.color} to-transparent opacity-[0.05] blur-3xl`} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-b ${product.color} to-transparent opacity-10 blur-2xl`} />
          </div>

          <div className="relative z-10 text-center px-6">
            <RevealText as="h2" scrollDriven className="font-heading text-display-lg font-bold text-text-primary leading-none tracking-tighter mb-6">
              {product.name}
            </RevealText>
            <RevealText as="p" scrollDriven className={`text-xl md:text-2xl ${product.textColor} font-medium mb-12 max-w-2xl mx-auto`}>
              {product.desc}
            </RevealText>
            
            <div className="opacity-0 translate-y-4" style={{ animation: 'fade-up 1s ease-out 0.5s forwards' }}>
              <MagneticButton className={`group relative px-8 py-4 bg-gray-100 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 transition-colors`}>
                <span className={`relative z-10 text-sm tracking-widest uppercase font-semibold text-text-primary group-hover:${product.textColor} transition-colors`}>
                  Explore {product.name}
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
