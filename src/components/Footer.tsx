import React from 'react';
import { useStore } from '../context/StoreContext';
import { Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, filterByCategory } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F4F0] dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-stone-200 dark:border-stone-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-2xl font-editorial tracking-[0.2em] font-medium text-stone-900 dark:text-stone-50">
              LUMORA
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm leading-relaxed">
              Simple things. Better living. A design studio and lifestyle company crafting everyday essentials from raw stone, French flax linen, and Tuscan leather.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 pt-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Ships internationally to 42 countries</span>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100">
              Collection
            </h4>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <li>
                <button onClick={() => { filterByCategory('all'); setCurrentView('shop'); }} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory('home')} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Home & Living
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory('fashion')} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Fashion & Knitwear
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory('accessories')} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Leather & Carry
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory('tech')} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Tech Essentials
                </button>
              </li>
              <li>
                <button onClick={() => filterByCategory('beauty')} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Botanicals & Care
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('why-lumora-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('lumora-edit-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-stone-950 dark:hover:text-white transition-colors"
                >
                  The LUMORA Edit
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('account')} className="hover:text-stone-950 dark:hover:text-white transition-colors">
                  Customer Account
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:text-stone-950 dark:hover:text-white transition-colors font-mono">
                  Admin Demo Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100">
              Client Service
            </h4>
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <li>
                <span className="text-stone-700 dark:text-stone-300 font-medium">concierge@lumora.studio</span>
              </li>
              <li>
                <span>Mon–Fri 9am–6pm EST</span>
              </li>
              <li className="pt-2">
                <span className="block text-[11px] text-stone-400">30-Day In-Home Guarantee</span>
              </li>
              <li>
                <span className="block text-[11px] text-stone-400">Lifetime Craftsmanship Warranty</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} LUMORA Studio Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
