import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryId } from '../types';
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  ChevronDown, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    filterByCategory,
    searchQuery,
    setSearchQuery 
  } = useStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedSort, setSelectedSort] = useState<'popularity' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'fashion', label: 'Fashion & Knitwear' },
    { id: 'home', label: 'Home & Living' },
    { id: 'accessories', label: 'Leather & Accessories' },
    { id: 'tech', label: 'Tech Essentials' },
    { id: 'beauty', label: 'Beauty & Wellness' },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (localSearch.trim()) {
          const q = localSearch.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchTags = product.styleTags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCategory && !matchTags) {
            return false;
          }
        }
        // Price filter
        if (product.price > maxPrice) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }
        // Stock filter
        if (onlyInStock && !product.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (selectedSort === 'price-asc') return a.price - b.price;
        if (selectedSort === 'price-desc') return b.price - a.price;
        if (selectedSort === 'rating') return b.rating - a.rating;
        // Default popularity
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, selectedCategory, localSearch, maxPrice, minRating, onlyInStock, selectedSort]);

  const resetAllFilters = () => {
    filterByCategory('all');
    setLocalSearch('');
    setSearchQuery('');
    setMaxPrice(350);
    setMinRating(0);
    setOnlyInStock(false);
    setSelectedSort('popularity');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    localSearch.trim() !== '' || 
    maxPrice < 350 || 
    minRating > 0 || 
    onlyInStock;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>Store</span>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{selectedCategory === 'all' ? 'All Products' : selectedCategory}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-900 dark:text-stone-50">
            {selectedCategory === 'all' ? 'The Complete Collection' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Edition`}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Carefully engineered daily objects made with pure materials and timeless proportions.
          </p>
        </div>

        {/* Top Control Bar: Search input, Sort Dropdown & Mobile Filter Button */}
        <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by name, material, or keyword..."
              className="w-full pl-10 pr-9 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-3.5 py-2.5 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-medium text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            {/* Sort Select */}
            <div className="relative flex items-center gap-2">
              <span className="text-xs text-stone-400 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e: any) => setSelectedSort(e.target.value)}
                  className="appearance-none bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium rounded-xl pl-3 pr-8 py-2.5 focus:outline-none cursor-pointer"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`md:block space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-5 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100">
                  Filter Catalog
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Category
                </label>
                <div className="flex flex-col gap-1">
                  {categories.map(cat => {
                    const active = selectedCategory === cat.id;
                    const count = cat.id === 'all' 
                      ? products.length 
                      : products.filter(p => p.category === cat.id).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => filterByCategory(cat.id)}
                        className={`text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          active
                            ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-medium'
                            : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`text-[10px] font-mono ${active ? 'opacity-80' : 'text-stone-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Max Price
                  </label>
                  <span className="text-xs font-mono font-medium text-stone-900 dark:text-stone-100">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="350"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-900 dark:accent-stone-100 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                  <span>$40</span>
                  <span>$350</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Minimum Rating
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[0, 4.8, 4.9].map((ratingVal) => (
                    <button
                      key={ratingVal}
                      onClick={() => setMinRating(ratingVal)}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-colors ${
                        minRating === ratingVal
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 font-medium'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                      }`}
                    >
                      {ratingVal === 0 ? 'All' : `${ratingVal}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Only Checkbox */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 dark:text-stone-300">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded-sm accent-stone-900 dark:accent-stone-100"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Products Grid View */}
          <main className="md:col-span-3">
            {/* Results count & active tags indicator */}
            <div className="flex items-center justify-between mb-4 text-xs text-stone-500">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              {hasActiveFilters && (
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                  Filters applied
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  No matching products found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-2">
                  Try adjusting your search criteria, clearing filters, or browsing other categories.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-6 px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-full hover:bg-stone-800 dark:hover:bg-white transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
