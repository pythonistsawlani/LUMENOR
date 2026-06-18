'use client';

import { useState } from 'react';
import GlowCard from '../ui/GlowCard';
import RevealText from '../ui/RevealText';
import MagneticButton from '../ui/MagneticButton';

const roles = [
  { id: 'customer', title: 'Solar Customer', desc: 'Looking to go solar at home or business', tag: 'SolarX' },
  { id: 'epc', title: 'EPC Company', desc: 'Running solar installation operations', tag: 'FlowX' },
  { id: 'installer', title: 'Solar Installer', desc: 'Field technician doing installations', tag: 'FixX' },
];

export default function Waitlist() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedRole) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-32 bg-void overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <RevealText as="h2" scrollDriven className="font-heading text-display-sm text-text-primary mb-6">
          Be the first to know.
        </RevealText>
        <RevealText delay={0.2} scrollDriven className="text-xl text-text-secondary mb-16 max-w-2xl mx-auto">
          We&apos;re building three products for three different people. Tell us who you are.
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          {roles.map((role) => (
            <div key={role.id} onClick={() => setSelectedRole(role.id)} className="cursor-pointer">
              <GlowCard 
                className={`h-full p-6 transition-all duration-300 border ${
                  selectedRole === role.id 
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,166,35,0.15)]' 
                    : 'bg-gray-100 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
                glowColor={selectedRole === role.id ? 'rgba(245, 166, 35, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
              >
                <div className="flex flex-col h-full gap-4">
                  <div>
                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold ${
                      role.tag === 'SolarX' ? 'bg-amber-500/20 text-amber-400' :
                      role.tag === 'FlowX' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {role.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading text-text-primary">{role.title}</h3>
                  <p className="text-sm text-text-secondary mt-auto">{role.desc}</p>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto relative transition-opacity duration-500" style={{ opacity: submitted ? 0 : 1, pointerEvents: submitted ? 'none' : 'auto' }}>
          <div className="relative group">
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 border border-white/10 rounded-full px-6 py-4 text-text-primary placeholder:text-text-muted outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all peer"
              required
            />
            {/* Animated underline focus effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-amber-400 peer-focus:w-3/4 transition-all duration-500 ease-out" />
          </div>

          <div className="mt-8 flex justify-center">
            <MagneticButton as="button" className="px-8 py-4 bg-amber-500 text-void font-bold tracking-widest uppercase text-sm rounded-full hover:bg-amber-400 transition-colors">
              Request Access
            </MagneticButton>
          </div>
          
          <p className="text-xs text-text-muted mt-6 uppercase tracking-widest">
            No spam. One email when your product is ready.
          </p>
        </form>

        {submitted && (
          <div className="absolute bottom-0 left-0 right-0 py-12 flex justify-center items-center">
            <p className="text-amber-400 text-xl font-medium tracking-wide">You&apos;re on the list.</p>
          </div>
        )}
      </div>
    </section>
  );
}
