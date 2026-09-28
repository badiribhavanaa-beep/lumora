import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Check, Mail } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to Lumora. Enjoy 15% off with code "WELCOME15"');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-900 dark:bg-stone-950 text-white border-t border-stone-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-4">
          <Mail className="w-5 h-5 text-stone-200" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-white">
          A little inspiration, straight to your inbox.
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-light">
          Seasonal collection drops, architectural photo essays, and subscriber-only private editions.
        </p>

        {isSubscribed ? (
          <div className="mt-8 p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl max-w-md mx-auto text-emerald-200 text-xs flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Thank you for subscribing! Your 15% promo code is <strong>WELCOME15</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-xs text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 shadow-md cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-stone-400">
          We respect your inbox. Unsubscribe at any time with a single click.
        </p>

      </div>
    </section>
  );
};
