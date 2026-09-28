import React from 'react';
import { useStore } from '../context/StoreContext';
import { EDITORIAL_ARTICLES } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Clock, Calendar, BookOpen, Share2 } from 'lucide-react';

export const EditorialArticlePage: React.FC = () => {
  const { selectedArticleId, setCurrentView, products, showToast } = useStore();

  const article = EDITORIAL_ARTICLES.find(a => a.id === selectedArticleId) || EDITORIAL_ARTICLES[0];
  const curatedProducts = products.filter(p => article.curatedProductIds.includes(p.id));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Article link copied to clipboard.');
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
            <span className="uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
            <span>·</span>
            <span>{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial font-normal text-stone-900 dark:text-stone-50 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden mb-12 border border-stone-200/80 dark:border-stone-800 shadow-md">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Article Body Prose */}
        <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed space-y-6 font-light">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Share & Signoff */}
        <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400">
            Published by Lumora Journal Archive
          </div>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Essay</span>
          </button>
        </div>

        {/* Featured Objects from This Edit */}
        {curatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-12 border-t border-stone-200 dark:border-stone-800">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-stone-400">
                Curated Selection
              </span>
              <h3 className="text-2xl font-editorial text-stone-900 dark:text-stone-100 mt-1">
                Objects Featured in this Story
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {curatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
