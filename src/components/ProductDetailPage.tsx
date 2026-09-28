import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  Minus, 
  Plus, 
  ArrowLeft,
  Check,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    setCurrentView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    reviews,
    addReview
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review Form state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revRating, setRevRating] = useState<number>(5);

  const isSaved = isInWishlist(product.id);

  // Gallery images array
  const galleryImages = [
    product.image,
    ...(product.secondaryImage ? [product.secondaryImage] : []),
    ...(product.gallery || [])
  ].filter((v, i, a) => a.indexOf(v) === i); // unique

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor || !revComment) return;

    addReview({
      productId: product.id,
      author: revAuthor,
      rating: revRating,
      title: revTitle || 'Verified Experience',
      comment: revComment,
      verified: true,
      productName: product.name,
    });

    setRevAuthor('');
    setRevTitle('');
    setRevComment('');
    setShowReviewModal(false);
  };

  // Related products from same category or style
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.styleTags.some(t => product.styleTags.includes(t))))
    .slice(0, 3);

  // Product reviews
  const productReviews = reviews.filter(r => r.productId === product.id);

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb back navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6 sm:mb-8">
          <button 
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </button>
          <span aria-hidden="true">/</span>
          <span className="capitalize">{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-stone-900 dark:text-stone-100 truncate max-w-xs">{product.name}</span>
        </div>

        {/* PDP Main Grid: Gallery Left + Sticky Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Gallery Module (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-4/3 sm:aspect-1/1 w-full bg-stone-100 dark:bg-stone-800 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-md">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-lg text-stone-800 dark:text-stone-200 border border-stone-200/50 shadow-xs">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
                    : 'bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
                title={isSaved ? "Saved in wishlist" : "Add to wishlist"}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery Switcher */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === img
                        ? 'border-stone-900 dark:border-stone-100 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Live Social Proof Viewing Tag */}
            <div className="hidden sm:flex items-center gap-2 p-3 bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span><strong>{product.viewsToday} people</strong> viewed this piece in the last 24 hours</span>
            </div>
          </div>

          {/* Contiguous Purchase Module (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="uppercase tracking-widest font-semibold">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold tabular-nums">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50 leading-tight">
                  {product.name}
                </h1>

                <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  {product.tagline}
                </p>

                {/* Price Lockup */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-stone-950 dark:text-white tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-stone-400 line-through tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Save ${(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Variant Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Color: <span className="font-normal text-stone-500">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map(col => {
                      const isChosen = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`group relative p-1 rounded-full border-2 transition-all ${
                            isChosen ? 'border-stone-900 dark:border-stone-100 scale-110' : 'border-transparent hover:scale-105'
                          }`}
                          title={col.name}
                        >
                          <span
                            className="block w-6 h-6 rounded-full border border-stone-300 dark:border-stone-700 shadow-xs"
                            style={{ backgroundColor: col.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Variant Selector (If fashion/wearable) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Select Size: <span className="font-normal text-stone-500">{selectedSize}</span>
                    </span>
                    <button className="text-[11px] underline text-stone-500 hover:text-stone-900">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sizes.map(size => {
                      const isChosen = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-10 rounded-xl text-xs font-medium border transition-colors ${
                            isChosen
                              ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100'
                              : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Stock Status */}
              <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Quantity
                  </label>
                  <div className="inline-flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>In Stock · Ready to dispatch</span>
                  </span>
                  <p className="text-[11px] text-stone-400 mt-0.5">{product.stock} units remaining in studio inventory</p>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag — ${(product.price * quantity)}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
                >
                  Buy It Now with 1-Click
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-500 dark:text-stone-400">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/50">
                  <Truck className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/50">
                  <RotateCcw className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  <span>30-Day Free Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/50">
                  <ShieldCheck className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  <span>2-Year Warranty</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabbed Info Section: Description, Specifications, Verified Reviews */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-stone-200 dark:border-stone-800">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-8 border-b border-stone-200 dark:border-stone-800 pb-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                activeTab === 'details'
                  ? 'text-stone-950 dark:text-white'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              Description & Craft
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 -mb-3.5" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                activeTab === 'specs'
                  ? 'text-stone-950 dark:text-white'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 -mb-3.5" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                activeTab === 'reviews'
                  ? 'text-stone-950 dark:text-white'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              Reviews ({product.reviewsCount})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100 -mb-3.5" />
              )}
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'details' && (
            <div className="py-8 max-w-3xl space-y-4 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              <p>{product.description}</p>
              <p>
                Each piece in the LUMORA collection is created in limited production batches to ensure uncompromising tactile tolerances and finish quality.
              </p>
            </div>
          )}

          {/* Tab 2: Specifications */}
          {activeTab === 'specs' && (
            <div className="py-8 max-w-2xl">
              <dl className="divide-y divide-stone-200 dark:divide-stone-800">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="py-3 flex justify-between text-xs sm:text-sm">
                    <dt className="font-semibold text-stone-900 dark:text-stone-100">{key}</dt>
                    <dd className="text-stone-600 dark:text-stone-400 font-mono text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-8 max-w-3xl space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                      {product.rating}
                    </span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">Based on {product.reviewsCount} customer reviews</p>
                </div>

                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Write a Review
                </button>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {productReviews.length > 0 ? (
                  productReviews.map(r => (
                    <div key={r.id} className="p-5 bg-stone-50 dark:bg-stone-900/40 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">{r.author}</span>
                        <span className="text-[11px] text-stone-400">{r.date}</span>
                      </div>
                      <div className="flex text-amber-500 mb-2">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">{r.title}</h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 font-light leading-relaxed">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500">Be the first to share your thoughts on this design.</p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-xl sm:text-2xl font-editorial font-normal text-stone-900 dark:text-stone-100 mb-8">
              You May Also Appreciate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Add to Cart Bar (Max 15% viewport height per Skill rules) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[11px] text-stone-500 truncate block max-w-[120px]">{product.name}</span>
          <span className="text-sm font-semibold tabular-nums text-stone-900 dark:text-stone-100">${product.price}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Write a Review</h3>
            <p className="text-xs text-stone-500">Share your tactile experience with the {product.name}</p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRevRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= revRating ? 'fill-current' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={revAuthor}
                  onChange={(e) => setRevAuthor(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Review Headline</label>
                <input
                  type="text"
                  value={revTitle}
                  onChange={(e) => setRevTitle(e.target.value)}
                  placeholder="e.g. Gorgeous craftsmanship"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Detailed Review</label>
                <textarea
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  placeholder="Tell us about the weight, material, and how you use it..."
                  rows={3}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-800"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
