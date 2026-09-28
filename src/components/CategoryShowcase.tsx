import React from 'react';
import { useStore } from '../context/StoreContext';
import { CategoryId } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  count: number;
  image: string;
}

export const CategoryShowcase: React.FC = () => {
  const { filterByCategory, products } = useStore();

  const categories: CategoryCardInfo[] = [
    {
      id: 'fashion',
      name: 'Fashion & Knitwear',
      tagline: 'Heavy flax, extrafine merino, relaxed silhouettes',
      count: products.filter(p => p.category === 'fashion').length,
      image: '/src/assets/images/lumora_hero_lifestyle_1790581813844.jpg',
    },
    {
      id: 'home',
      name: 'Home & Living',
      tagline: 'Honed travertine, artisanal stoneware, waffled linen',
      count: products.filter(p => p.category === 'home').length,
      image: '/src/assets/images/product_ceramic_lamp_1790581832022.jpg',
    },
    {
      id: 'accessories',
      name: 'Leather & Accessories',
      tagline: 'Tuscan vegetable-tanned leather, solid brass accents',
      count: products.filter(p => p.category === 'accessories').length,
      image: '/src/assets/images/product_leather_bag_1790581845178.jpg',
    },
    {
      id: 'tech',
      name: 'Tech Essentials',
      tagline: 'Acoustic studio monitors, wool desk mats, milled titanium',
      count: products.filter(p => p.category === 'tech').length,
      image: '/src/assets/images/product_audio_headphones_1790581867250.jpg',
    },
    {
      id: 'beauty',
      name: 'Beauty & Wellness',
      tagline: 'Apothecary botanicals, hinoki cypress, active squalane',
      count: products.filter(p => p.category === 'beauty').length,
      image: '/src/assets/images/product_amber_diffuser_1790581882531.jpg',
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
              Curated Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50 mt-1">
              Shop by Category
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Every category represents honest materials, tactile durability, and calm design.
          </p>
        </div>

        {/* 5-Card Layout: Bento / Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => filterByCategory(cat.id)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-end min-h-[260px] sm:min-h-[300px]"
            >
              {/* Category Photography with Scrim */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-transparent transition-opacity duration-300" />

              {/* Text Card Content */}
              <div className="relative z-10 p-5 text-white">
                <span className="text-[11px] font-mono tracking-wider opacity-75">
                  {cat.count} Items
                </span>
                <h3 className="text-base font-medium tracking-tight mt-0.5 text-white flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                </h3>
                <p className="text-[11px] text-stone-300 line-clamp-1 mt-1 opacity-90 font-light">
                  {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
