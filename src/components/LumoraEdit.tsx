import React from 'react';
import { useStore } from '../context/StoreContext';
import { EDITORIAL_ARTICLES } from '../data/products';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export const LumoraEdit: React.FC = () => {
  const { viewArticle } = useStore();

  return (
    <section id="lumora-edit-section" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Journal & Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-900 dark:text-stone-50">
              The LUMORA Edit
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md">
            Stories on architecture, tactile material culture, and intentional living.
          </p>
        </div>

        {/* Editorial Articles Grid (Magazine Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDITORIAL_ARTICLES.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => viewArticle(article.id)}
              className="group cursor-pointer flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Cover Photography */}
              <div className="relative aspect-16/10 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-stone-900/80 text-white backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[11px] text-stone-400 dark:text-stone-500 font-mono mb-2">
                    {article.readTime} · {article.date}
                  </div>
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-medium text-stone-800 dark:text-stone-200">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
