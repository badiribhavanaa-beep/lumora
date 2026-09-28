import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useStore();

  const featuredReviews = reviews.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-stone-100/50 dark:bg-stone-900/30 border-t border-stone-200/60 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-stone-400">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50 mt-1">
            Loved in Homes Worldwide
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Read what discerning homeowners, architects, and designers say about our collection.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote mark */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-stone-300 dark:text-stone-700" />
                </div>

                <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate mt-0.5">
                  Purchased: {rev.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
