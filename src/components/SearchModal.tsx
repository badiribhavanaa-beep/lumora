import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    viewProduct, 
    filterByCategory,
    setCurrentView 
  } = useStore();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.styleTags.some(t => t.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  const trendingTags = ['Travertine Lamp', 'Leather Tote', 'Merino Wool', 'Hinoki Diffuser', 'Titanium Pen'];

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    viewProduct(id);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsSearchOpen(false);
    filterByCategory('all');
    setCurrentView('shop');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-200"
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="p-4 sm:p-5 flex items-center gap-3 border-b border-stone-100 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our catalog by material, object, or space..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 px-2 py-1"
          >
            Esc
          </button>
        </form>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                Matching Objects ({results.length})
              </span>
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {results.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.id)}
                    className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-stone-200"
                      />
                      <div>
                        <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 block">
                          {prod.name}
                        </span>
                        <span className="text-[11px] text-stone-500 capitalize">{prod.category} · ${prod.price}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-stone-500">
              No matching pieces found for "{query}". Try checking the spelling or browse categories.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
