'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import RevealText from '../ui/RevealText';

export default function Intelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.intelligence-panel');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.8,
            ease: 'power1.inOut'
          },
          end: () => "+=" + (wrapperRef.current?.offsetWidth || window.innerWidth) * 2
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full md:h-screen bg-void overflow-hidden flex flex-col md:flex-row">
      <div ref={sectionRef} className="flex flex-col md:flex-row w-full md:w-[300vw] h-full">
        
        {/* Panel 1: See Everything */}
        <div className="intelligence-panel relative w-full md:w-screen h-screen flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-amber-500/10 to-transparent opacity-50 pointer-events-none" />
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
            <div>
              <p className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-6">Pillar 01</p>
              <RevealText as="h2" className="font-heading text-display-sm text-text-primary mb-6">
                See Everything.
              </RevealText>
              <RevealText delay={0.2} className="text-xl text-text-secondary max-w-md mb-8">
                The era of fragmented spreadsheets is over. Our intelligence layer maps your entire solar operation into a unified, real-time command center.
              </RevealText>
              <ul className="space-y-4 text-text-muted text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Granular project visibility</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Automated milestone tracking</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Real-time financial forecasting</li>
              </ul>
            </div>
            
            <div className="relative aspect-square md:aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(245,166,35,0.15)] transform md:rotate-y-[-5deg] md:rotate-x-[2deg] transition-transform duration-700 hover:rotate-0">
              <Image src="/images/pillar_01.png" alt="Analytics Dashboard" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>

        {/* Panel 2: Connect Everyone */}
        <div className="intelligence-panel relative w-full md:w-screen h-screen flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-blue-500/10 to-transparent opacity-50 pointer-events-none" />
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
            <div>
              <p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-6">Pillar 02</p>
              <RevealText as="h2" className="font-heading text-display-sm text-text-primary mb-6">
                Connect Everyone.
              </RevealText>
              <RevealText delay={0.2} className="text-xl text-text-secondary max-w-md mb-8">
                Eliminate the friction between stakeholders. Customers, EPCs, and field installers are synchronized in a single digital ecosystem.
              </RevealText>
              <ul className="space-y-4 text-text-muted text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Installer mobile execution layer</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Customer transparency portals</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Instant vendor communication</li>
              </ul>
            </div>
            
            <div className="relative aspect-square md:aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] transform md:rotate-y-[5deg] md:rotate-x-[2deg] transition-transform duration-700 hover:rotate-0">
              <Image src="/images/pillar_02.png" alt="Network Connect UI" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>

        {/* Panel 3: Move Faster */}
        <div className="intelligence-panel relative w-full md:w-screen h-screen flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-radial-[at_50%_50%] from-purple-500/10 to-transparent opacity-50 pointer-events-none" />
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
            <div>
              <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-6">Pillar 03</p>
              <RevealText as="h2" className="font-heading text-display-sm text-text-primary mb-6">
                Move Faster.
              </RevealText>
              <RevealText delay={0.2} className="text-xl text-text-secondary max-w-md mb-8">
                Speed is the ultimate competitive advantage. Automated workflows slash operational delays from lead generation to final commissioning.
              </RevealText>
              <ul className="space-y-4 text-text-muted text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> AI-driven document approvals</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Predictive supply chain alerts</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> 3x faster project lifecycles</li>
              </ul>
            </div>
            
            <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] transform md:translate-y-8 transition-transform duration-700 hover:translate-y-0">
              <Image src="/images/pillar_03.png" alt="Workflow Pipeline" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
