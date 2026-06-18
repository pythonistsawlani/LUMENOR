'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-void/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-2xl tracking-tighter text-text-primary flex items-center gap-2">
          {/* Mock Logo Icon */}
          <div className="w-8 h-8 bg-text-primary rounded-br-lg rounded-tl-lg transform rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-void rounded-sm transform -rotate-45" />
          </div>
          Lumenor
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-text-secondary text-sm">
          <Link href="#problem" className="hover:text-text-primary transition-colors">The problem</Link>
          <Link href="#ecosystem" className="hover:text-text-primary transition-colors">Ecosystem</Link>
          <Link href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</Link>
          <Link href="#numbers" className="hover:text-text-primary transition-colors">The numbers</Link>
        </nav>
        
        <button className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm">
          Join the waitlist
        </button>
      </div>
    </header>
  );
}
