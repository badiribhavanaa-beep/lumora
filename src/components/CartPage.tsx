import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  Truck,
  RotateCcw
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    freeShippingThreshold,
    freeShippingRemaining,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    viewProduct
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const shippingPercent = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="py-20 sm:py-28 max-w-xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50">
          Your Shopping Bag is Empty
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-stone-500">
          Explore our collection of minimal living essentials and timeless designs.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-8 px-6 py-3.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-full shadow-md hover:bg-stone-800 transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <button onClick={() => setCurrentView('shop')} className="hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-stone-900 dark:text-stone-50">
              Shopping Bag
            </h1>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected
          </span>
        </div>

        {/* Free shipping banner */}
        <div className="mb-8 p-4 bg-stone-100 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {freeShippingRemaining > 0 ? (
              <span className="text-stone-700 dark:text-stone-300">
                You are <strong className="font-mono text-stone-950 dark:text-white">${freeShippingRemaining}</strong> away from free standard shipping
              </span>
            ) : (
              <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>You qualify for complimentary worldwide shipping!</span>
              </span>
            )}
            <span className="font-mono text-xs text-stone-400">{shippingPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-stone-900 dark:bg-stone-100 transition-all duration-500 rounded-full"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Grid: Cart Items (Left) + Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden shadow-xs">
              {cart.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onClick={() => viewProduct(item.product.id)}
                      className="w-24 h-24 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-800 cursor-pointer hover:opacity-90 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                        {item.product.category}
                      </span>
                      <h3 
                        onClick={() => viewProduct(item.product.id)}
                        className="text-sm font-semibold text-stone-900 dark:text-stone-100 cursor-pointer hover:underline line-clamp-1"
                      >
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-stone-500 mt-1 space-x-2">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                      </div>
                      <div className="text-xs text-stone-900 dark:text-stone-100 font-medium mt-1 tabular-nums">
                        ${item.product.price} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="inline-flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-stone-950 dark:text-white tabular-nums min-w-[70px] text-right">
                      ${item.product.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Shopping Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
                <Truck className="w-4 h-4 text-stone-700 dark:text-stone-300 shrink-0" />
                <span>Complimentary insured shipping over $150</span>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
                <RotateCcw className="w-4 h-4 text-stone-700 dark:text-stone-300 shrink-0" />
                <span>30-Day in-home trial & easy returns</span>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-900/40 rounded-xl border border-stone-200/60 dark:border-stone-800 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
                <ShieldCheck className="w-4 h-4 text-stone-700 dark:text-stone-300 shrink-0" />
                <span>2-Year Lumora comprehensive care</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPct}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 dark:text-emerald-300 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code"
                      className="flex-1 px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs uppercase placeholder:normal-case focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl hover:bg-stone-800 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">${cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-${cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                    {cartShipping === 0 ? 'Free' : `$${cartShipping}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-semibold text-stone-950 dark:text-white">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">${cartTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <p className="text-[11px] text-stone-400">
                  Taxes and duties calculated during safe simulated checkout
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
