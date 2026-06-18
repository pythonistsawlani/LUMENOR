'use client';

import RevealText from '../ui/RevealText';

export default function Vision() {
  return (
    <section className="relative w-full py-48 bg-void flex items-center justify-center">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <RevealText scrollDriven as="h2" className="font-heading text-display-md text-text-primary leading-[1.1] mb-12">
          More solar on more rooftops.
        </RevealText>
        
        <RevealText scrollDriven as="p" className="text-2xl text-text-secondary font-medium">
          That's not a product roadmap.
        </RevealText>
        <RevealText scrollDriven as="p" className="text-2xl text-text-secondary font-medium">
          That's the mission.
        </RevealText>
      </div>
    </section>
  );
}

