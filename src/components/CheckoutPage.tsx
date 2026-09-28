import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, Order } from '../types';
import { 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Package, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    placeOrder, 
    setCurrentView 
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Bhavanaa Badiri',
    email: 'badiribhavanaa@gmail.com',
    phone: '+1 (555) 234-8901',
    street: '450 Minimalist Boulevard',
    apartment: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
  });

  // Delivery options
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');

  // Payment simulated options
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Submitting state
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty and no order completed yet
  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center">
        <h2 className="text-2xl font-editorial">No items in your bag</h2>
        <p className="text-xs text-stone-500 mt-2">Please add items to proceed with checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-6 px-6 py-2.5 bg-stone-900 text-white rounded-full text-xs font-semibold"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.street || !address.city || !address.postalCode) {
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const paymentName = paymentMethod === 'card' 
        ? 'Credit Card (•••• 4242)' 
        : paymentMethod === 'applepay' 
        ? 'Apple Pay' 
        : 'Cash on Delivery (Safe Verification)';

      const createdOrder = placeOrder(address, paymentName, deliveryType);
      setCompletedOrder(createdOrder);
      setIsProcessing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // If order was placed successfully, display receipt confirmation
  if (completedOrder) {
    return (
      <div className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-12 shadow-xl text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 dark:text-emerald-400">
                Order Confirmed
              </span>
              <h1 className="text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50 mt-1">
                Thank you for your order
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-stone-500">
                We're carefully preparing your curated items at the Lumora studio.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 dark:bg-stone-800/40 rounded-2xl p-5 border border-stone-200/60 dark:border-stone-800 text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200/80 dark:border-stone-700 text-xs">
                <div>
                  <span className="text-stone-400 block">Order Number</span>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{completedOrder.id}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Tracking Reference</span>
                  <span className="font-mono text-stone-700 dark:text-stone-300">{completedOrder.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Delivery Estimate</span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">{completedOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Items in receipt */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Items Ordered</span>
                {completedOrder.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-stone-200 dark:bg-stone-700"
                      />
                      <div>
                        <span className="font-medium text-stone-900 dark:text-stone-100 block">{item.product.name}</span>
                        <span className="text-[11px] text-stone-400">Qty: {item.quantity} · {item.selectedColor || 'Default'}</span>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total breakdown */}
              <div className="pt-4 border-t border-stone-200/80 dark:border-stone-700 flex justify-between items-center text-sm font-semibold text-stone-900 dark:text-stone-100">
                <span>Total Paid</span>
                <span className="font-mono text-base">${completedOrder.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentView('account')}
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
              >
                View in Account Orders
              </button>
              <button
                onClick={() => setCurrentView('shop')}
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const shippingCost = deliveryType === 'express' ? 25 : cartShipping;
  const currentTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost);

  return (
    <div className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Distraction-Free Header */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 mb-2">
            <Lock className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
          <h1 className="text-3xl font-editorial font-normal text-stone-900 dark:text-stone-50">
            Checkout
          </h1>

          {/* 3-Step Progress Indicators */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-medium">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-stone-900 dark:text-stone-100 font-semibold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-stone-200 text-stone-500'}`}>1</span>
              <span>Address</span>
            </div>
            <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-stone-900 dark:text-stone-100 font-semibold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-stone-200 text-stone-500'}`}>2</span>
              <span>Delivery</span>
            </div>
            <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />
            <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-stone-900 dark:text-stone-100 font-semibold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-stone-200 text-stone-500'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Form (Left) + Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Main Step Form Area (Cols 1-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs">
              
              {/* STEP 1: Address */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 pb-2 border-b border-stone-100 dark:border-stone-800">
                    1. Shipping & Contact Information
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={address.email}
                        onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                      placeholder="e.g. 450 Minimalist Blvd"
                      className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Apt / Suite (Optional)</label>
                      <input
                        type="text"
                        value={address.apartment || ''}
                        onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">City</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-3.5 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 2: Delivery */}
              {step === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                      2. Delivery Speed
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-stone-500 hover:underline"
                    >
                      Edit Address
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label
                      onClick={() => setDeliveryType('standard')}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliveryType === 'standard'
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800/80 shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'standard'}
                          onChange={() => setDeliveryType('standard')}
                          className="accent-stone-900"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">Standard Insured Shipping</span>
                            {cartShipping === 0 && (
                              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-sm">Free</span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Delivered within 3–5 business days via carbon-neutral courier</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">
                        {cartShipping === 0 ? '$0' : `$${cartShipping}`}
                      </span>
                    </label>

                    <label
                      onClick={() => setDeliveryType('express')}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                        deliveryType === 'express'
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800/80 shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'express'}
                          onChange={() => setDeliveryType('express')}
                          className="accent-stone-900"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">Express Priority Air</span>
                            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-sm">Fast</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">Delivered within 1–2 business days with signature required</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">
                        $25
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-xl hover:bg-stone-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Payment */}
              {step === 3 && (
                <form onSubmit={handleFinalOrderSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                    <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                      3. Simulated Safe Payment
                    </h2>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-stone-500 hover:underline"
                    >
                      Change Delivery
                    </button>
                  </div>

                  {/* Payment selector tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'applepay'
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Pay on Arrival</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/60 dark:border-stone-700">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Card Number (Simulated Demo)</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Expiration</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">Security Code</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/60 dark:border-stone-700 text-center text-xs text-stone-600 dark:text-stone-400">
                      Instant biometric authorization will be simulated upon clicking Complete Order.
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200/60 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400 space-y-1">
                      <p className="font-semibold text-stone-800 dark:text-stone-200">Cash on Delivery Verification</p>
                      <p>You can inspect the sealed package before settling the balance with the courier.</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-xl hover:bg-stone-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <span>Processing Order...</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Complete Order · ${currentTotal}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Sticky Order Summary Sidebar (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-5 sticky top-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100 pb-2 border-b border-stone-100 dark:border-stone-800">
                Order Summary ({cart.length})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-stone-100 dark:divide-stone-800">
                {cart.map(item => (
                  <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">{item.product.name}</h4>
                        <span className="text-[11px] text-stone-400">Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}</span>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-stone-900 dark:text-stone-100 tabular-nums">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-stone-900 dark:text-stone-100">${cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Promo Discount</span>
                    <span className="font-mono font-medium">-${cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono font-medium text-stone-900 dark:text-stone-100">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 flex justify-between text-base font-semibold text-stone-950 dark:text-white">
                  <span>Total</span>
                  <span className="font-mono">${currentTotal}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl text-[11px] text-stone-500 space-y-1">
                <p>✓ 30-day in-home inspection trial</p>
                <p>✓ Complimentary prepaid return slip included</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
