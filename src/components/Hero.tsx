import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

export const Hero: React.FC = () => {
  const { setCurrentView, filterByCategory, viewProduct, products } = useStore();

  const featuredProduct = products.find(p => p.id === 'lumora-lamp-travertine') || products[0];

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Container with High-Res Lifestyle Visual */}
        <div className="relative rounded-3xl overflow-hidden min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] flex items-end sm:items-center bg-stone-900 border border-stone-200/50 dark:border-stone-800 shadow-2xl">
          
          {/* Background Photography with Measured Contrast Scrim */}
          <img
            src={HERO_IMAGE}
            alt="Lumora modern architectural interior with handcrafted furniture and warm natural morning light"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out"
          />

          {/* Measured Dark Scrim to guarantee 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-stone-950/20 sm:to-transparent" />

          {/* Content Lockup */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-left">
            
            {/* Minimal Subhead Tag */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-widest uppercase text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Fall / Winter 2026 Collection</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-normal tracking-tight text-white leading-[1.08] text-balance">
              Designed for the way you live.
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-stone-200/90 font-light leading-relaxed max-w-lg">
              Thoughtfully selected products that make everyday life a little better. Crafted with natural stone, heavy flax, and timeless materials.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  filterByCategory('all');
                  setCurrentView('shop');
                }}
                className="px-6 py-3.5 bg-white text-stone-950 text-xs sm:text-sm font-medium tracking-wide rounded-full hover:bg-stone-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('new-arrivals-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs sm:text-sm font-medium tracking-wide rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                Explore New Arrivals
              </button>
            </div>
          </div>

          {/* Floating Subtle Highlight Card */}
          {featuredProduct && (
            <div className="hidden lg:block absolute bottom-10 right-10 z-10">
              <div 
                onClick={() => viewProduct(featuredProduct.id)}
                className="group cursor-pointer p-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-white/30 dark:border-stone-700/40 rounded-2xl shadow-2xl max-w-xs flex items-center gap-3.5 transition-all duration-300 hover:scale-103 hover:bg-white dark:hover:bg-stone-900"
              >
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200/60 dark:border-stone-800"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Trending Now</span>
                  </div>
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-stone-600 dark:group-hover:text-stone-300">
                    {featuredProduct.name}
                  </h4>
                  <div className="text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mt-0.5">
                    ${featuredProduct.price}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
