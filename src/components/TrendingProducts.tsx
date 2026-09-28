import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const TrendingProducts: React.FC = () => {
  const { products, setCurrentView, filterByCategory } = useStore();

  // Show top trending / featured products
  const trendingList = products.slice(0, 8);

  return (
    <section className="py-12 sm:py-16 bg-stone-50/60 dark:bg-stone-900/30 border-y border-stone-200/50 dark:border-stone-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
              Selected Edition
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50 mt-1">
              Trending Products
            </h2>
          </div>

          <button
            onClick={() => {
              filterByCategory('all');
              setCurrentView('shop');
            }}
            className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors group cursor-pointer"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
