import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, ArrowRight, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    viewProduct,
    toggleWishlist,
    isInWishlist
  } = useStore();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );

  const handleAdd = () => {
    addToCart(product, 1, selectedColor);
    setQuickViewProduct(null);
  };

  const handleFullDetails = () => {
    setQuickViewProduct(null);
    viewProduct(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square sm:aspect-auto sm:h-full bg-stone-100 dark:bg-stone-800">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-white/90 dark:bg-stone-900/90 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md text-stone-800 dark:text-stone-200">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                  <span className="uppercase tracking-wider font-semibold">{product.category}</span>
                  <span>·</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="ml-1 tabular-nums font-medium text-stone-700 dark:text-stone-300">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 font-editorial">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-stone-950 dark:text-white font-mono tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light line-clamp-3">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium text-stone-500 block mb-1.5">
                    Color: {selectedColor}
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          selectedColor === c.name ? 'border-stone-900 dark:border-stone-100 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border border-stone-200 dark:border-stone-700 transition-colors ${
                    isSaved ? 'bg-rose-50 text-rose-600 dark:bg-rose-950' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="Save"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleFullDetails}
                className="w-full text-center text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 py-1 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Full Specifications & Story</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
