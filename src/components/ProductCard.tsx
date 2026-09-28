import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, Plus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    viewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // Capitalize category for clean display
  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div 
      onClick={() => viewProduct(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col h-full bg-white dark:bg-stone-900/60 rounded-2xl border border-stone-200/70 dark:border-stone-800/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/3 w-full bg-stone-100 dark:bg-stone-800/50 overflow-hidden">
        
        {/* Primary and secondary image swap on hover */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle single tag (no pill cluster) */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md text-stone-800 dark:text-stone-200 border border-stone-200/50 dark:border-stone-700/50 shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist toggle action */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 backdrop-blur-md shadow-xs ${
            isSaved
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-white dark:hover:bg-stone-900'
          }`}
          title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-transform duration-200 ${isSaved ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Hover Action Overlay: Quick View & Quick Add */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-800 dark:text-stone-200 text-xs font-medium rounded-xl shadow-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
            title="Quick preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className={`py-2 px-3 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-medium ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white'
            }`}
            title="Add to bag"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill Metadata Discipline */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="uppercase tracking-wider font-medium">{categoryLabel}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <div className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-medium tabular-nums">{product.rating}</span>
              <span className="text-stone-400 dark:text-stone-500">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-1 font-normal">
            {product.tagline}
          </p>
        </div>

        {/* Pricing and Available Colors Preview */}
        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-stone-950 dark:text-white tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 dark:text-stone-500 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-stone-300 dark:border-stone-700 shadow-2xs"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-stone-400 font-mono">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
