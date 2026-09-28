import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { 
    wishlist, 
    products, 
    moveToCartFromWishlist, 
    toggleWishlist, 
    viewProduct, 
    setCurrentView 
  } = useStore();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-500">
              Personal Collection
            </span>
            <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-900 dark:text-stone-50 mt-1">
              Saved Wishlist
            </h1>
          </div>
          <span className="text-xs font-mono text-stone-400 mt-2 sm:mt-0">
            {savedProducts.length} Saved {savedProducts.length === 1 ? 'Object' : 'Objects'}
          </span>
        </div>

        {/* Wishlist Grid */}
        {savedProducts.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
              <Heart className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-editorial text-stone-900 dark:text-stone-100">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs text-stone-500">
              Tap the heart icon on any design piece to save it to your private collection.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="mt-4 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-stone-800 transition-colors"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map(product => (
              <div
                key={product.id}
                className="group bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      onClick={() => viewProduct(product.id)}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-104 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-stone-900/90 rounded-full text-stone-400 hover:text-rose-600 transition-colors shadow-xs"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => viewProduct(product.id)}
                      className="text-sm font-semibold text-stone-900 dark:text-stone-100 cursor-pointer hover:underline mt-0.5 line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-light">
                      {product.tagline}
                    </p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-base font-semibold text-stone-950 dark:text-white font-mono tabular-nums">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => moveToCartFromWishlist(product.id)}
                    className="flex-1 py-2.5 px-4 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                  <button
                    onClick={() => viewProduct(product.id)}
                    className="p-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl transition-colors"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
