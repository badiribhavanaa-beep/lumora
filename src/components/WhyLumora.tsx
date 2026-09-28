import React from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Lock } from 'lucide-react';

export const WhyLumora: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Carefully Curated',
      description: 'We reject 98% of candidate objects. Every piece undergoes rigorous living trials for tactile feel and longevity.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality First',
      description: 'Authentic stone, full-grain Italian leathers, and pure plant botanicals. No synthetic shortcuts or planned obsolescence.',
    },
    {
      icon: RefreshCw,
      title: 'Easy 30-Day Returns',
      description: 'Experience items in your home. If an object does not harmonize with your rituals, enjoy effortless prepaid returns.',
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      description: 'Bank-grade 256-bit encrypted checkout with modern payment options and rapid international dispatch.',
    },
  ];

  return (
    <section id="why-lumora-section" className="py-16 sm:py-20 bg-stone-50 dark:bg-stone-900/40 border-y border-stone-200/60 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
            Brand Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50 mt-1">
            Why Choose LUMORA
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Simple things. Better living. A deliberate stand against disposable consumer culture.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-start p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 mb-4">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
