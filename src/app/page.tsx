'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Transformation from '@/components/sections/Transformation';
import Intelligence from '@/components/sections/Intelligence';
import Products from '@/components/sections/Products';
import Vision from '@/components/sections/Vision';
import Waitlist from '@/components/sections/Waitlist';
import Footer from '@/components/sections/Footer';
import CustomCursor from '@/components/cursor/CustomCursor';
import LoadingExperience from '@/components/loading/LoadingExperience';
import SmoothScroll from '@/components/providers/SmoothScroll';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-void w-full overflow-hidden text-text-primary">
      {isLoading && <LoadingExperience onComplete={() => setIsLoading(false)} />}
      
      <SmoothScroll>
        <Header />
        <CustomCursor />
        <Hero />
        <Problem />
        <Transformation />
        <Intelligence />
        <Products />
        <Vision />
        <Waitlist />
        <Footer />
      </SmoothScroll>
    </main>
  );
}
