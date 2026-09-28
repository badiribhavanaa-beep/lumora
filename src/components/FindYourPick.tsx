import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Compass, RotateCcw, Check } from 'lucide-react';

export const FindYourPick: React.FC = () => {
  const { products } = useStore();

  const [selectedStyle, setSelectedStyle] = useState<string>('Minimalist');
  const [selectedBudget, setSelectedBudget] = useState<string>('any');
  const [selectedNeed, setSelectedNeed] = useState<string>('home');

  const styleOptions = [
    { id: 'Minimalist', label: 'Pure Minimalist', desc: 'Uncluttered, monolithic, quiet tones' },
    { id: 'Warm Contemporary', label: 'Warm Contemporary', desc: 'Textured stone, linen, soft light' },
    { id: 'Urban Functional', label: 'Urban Functional', desc: 'Durable leather, precision metals' },
    { id: 'Self-Care', label: 'Restorative Botanicals', desc: 'Apothecary scents, holistic oils' },
  ];

  const budgetOptions = [
    { id: 'any', label: 'Any Budget', desc: 'All curated price tiers' },
    { id: 'under-75', label: 'Under $75', desc: 'Thoughtful accessible essentials' },
    { id: '75-180', label: '$75 – $180', desc: 'Core daily upgrades' },
    { id: 'above-180', label: '$180+', desc: 'Heirloom statement pieces' },
  ];

  const needOptions = [
    { id: 'home', label: 'Home & Living', desc: 'Atmospheric living spaces' },
    { id: 'tech', label: 'Tech & Desk', desc: 'Acoustic focus and tools' },
    { id: 'fashion', label: 'Wardrobe & Knitwear', desc: 'Natural breathable textiles' },
    { id: 'accessories', label: 'Leather & Travel', desc: 'Everyday carry and wallets' },
    { id: 'beauty', label: 'Self-Care & Grooming', desc: 'Organic oils and diffusers' },
  ];

  // Smart dynamic recommendation scoring
  const recommendations = useMemo(() => {
    return products
      .map(product => {
        let score = 0;
        // Category match
        if (product.category === selectedNeed) score += 40;
        // Style tag match
        if (product.styleTags.includes(selectedStyle)) score += 30;
        // Budget match
        if (selectedBudget === 'under-75' && product.price < 75) score += 30;
        else if (selectedBudget === '75-180' && product.price >= 75 && product.price <= 180) score += 30;
        else if (selectedBudget === 'above-180' && product.price > 180) score += 30;
        else if (selectedBudget === 'any') score += 15;

        return { product, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.product);
  }, [products, selectedStyle, selectedBudget, selectedNeed]);

  const handleReset = () => {
    setSelectedStyle('Minimalist');
    setSelectedBudget('any');
    setSelectedNeed('home');
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-100/70 dark:bg-stone-900/60 border-b border-stone-200/60 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium tracking-wide mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />
            <span>Interactive Shopping Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-950 dark:text-stone-50">
            Find Your Pick
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Answer three quick questions to reveal objects meticulously tailored to your living rituals.
          </p>
        </div>

        {/* Step Cards Control Panel */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto mb-12">
          
          <div className="space-y-8">
            {/* Question 1: Style */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                  Question 01
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  What is your design aesthetic?
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {styleOptions.map(opt => {
                  const active = selectedStyle === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedStyle(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                        active
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-md'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{opt.label}</span>
                        {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                      <p className={`text-[10px] mt-1 line-clamp-1 ${active ? 'text-stone-300 dark:text-stone-600' : 'text-stone-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Need */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                  Question 02
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  What are you curating today?
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {needOptions.map(opt => {
                  const active = selectedNeed === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedNeed(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                        active
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-md'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{opt.label}</span>
                        {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 3: Budget */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                  Question 03
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  What is your target budget?
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {budgetOptions.map(opt => {
                  const active = selectedBudget === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedBudget(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                        active
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-md'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{opt.label}</span>
                        {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                      <p className={`text-[10px] mt-0.5 line-clamp-1 ${active ? 'text-stone-300 dark:text-stone-600' : 'text-stone-400'}`}>
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reset Action */}
          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-500">Live matching based on your criteria</span>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          </div>
        </div>

        {/* Live Matching Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
              Recommended For Your Aesthetic
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              {recommendations.length} Matches Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
