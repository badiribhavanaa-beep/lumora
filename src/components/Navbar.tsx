import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    filterByCategory,
    cart, 
    wishlist, 
    setIsSearchOpen, 
    setIsCartOpen,
    darkMode, 
    toggleDarkMode 
  } = useStore();

  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (view: 'home' | 'shop' | 'wishlist' | 'account' | 'admin') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: any) => {
    filterByCategory(catId);
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200">
      {/* Slim dismissible announcement banner */}
      {isBannerVisible && (
        <div className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-[11px] font-medium tracking-wide py-1.5 px-4 flex items-center justify-between transition-colors">
          <div className="mx-auto flex items-center gap-2">
            <span>Complimentary worldwide shipping on orders over $150</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="opacity-80">Consciously crafted materials</span>
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="text-stone-400 dark:text-stone-500 hover:text-white dark:hover:text-stone-900 p-0.5 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar: Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-2xl font-editorial tracking-[0.2em] font-medium text-stone-900 dark:text-stone-50 hover:opacity-80 transition-opacity focus-visible:outline-none"
        >
          LUMORA
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-stone-950 dark:hover:text-white transition-colors relative py-1 ${
              currentView === 'home' ? 'text-stone-950 dark:text-white font-semibold' : ''
            }`}
          >
            Home
            {currentView === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
            )}
          </button>
          
          <button
            onClick={() => handleNavClick('shop')}
            className={`hover:text-stone-950 dark:hover:text-white transition-colors relative py-1 ${
              currentView === 'shop' ? 'text-stone-950 dark:text-white font-semibold' : ''
            }`}
          >
            Shop
            {currentView === 'shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
            )}
          </button>

          {/* Quick Categories popover or links */}
          <div className="relative group">
            <button
              onClick={() => handleCategoryClick('all')}
              className="flex items-center gap-1 hover:text-stone-950 dark:hover:text-white transition-colors py-1"
            >
              <span>Categories</span>
              <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full -left-4 w-48 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-lg p-2 flex flex-col gap-1 text-xs">
                <button
                  onClick={() => handleCategoryClick('fashion')}
                  className="text-left px-3 py-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Fashion & Knitwear
                </button>
                <button
                  onClick={() => handleCategoryClick('home')}
                  className="text-left px-3 py-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Home & Living
                </button>
                <button
                  onClick={() => handleCategoryClick('beauty')}
                  className="text-left px-3 py-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Beauty & Wellness
                </button>
                <button
                  onClick={() => handleCategoryClick('accessories')}
                  className="text-left px-3 py-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Leather & Accessories
                </button>
                <button
                  onClick={() => handleCategoryClick('tech')}
                  className="text-left px-3 py-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Tech Essentials
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              filterByCategory('all');
              setCurrentView('shop');
            }}
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1"
          >
            New Arrivals
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('lumora-edit-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1"
          >
            The Edit
          </button>

          <button
            onClick={() => {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('why-lumora-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-stone-950 dark:hover:text-white transition-colors py-1"
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Cart, User/Admin, Dark Mode) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-full transition-colors"
            title="Search products"
            aria-label="Search products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark Mode Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-full transition-colors"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className={`p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-full transition-colors relative ${
              currentView === 'wishlist' ? 'bg-stone-100 dark:bg-stone-800' : ''
            }`}
            title="Saved wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[9px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-full transition-colors relative"
            title="Shopping bag"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[9px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Account / Admin Menu */}
          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className={`p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60 rounded-full transition-colors ${
                currentView === 'account' || currentView === 'admin' ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white' : ''
              }`}
              title="Account & Admin"
              aria-label="Account menu"
            >
              <User className="w-4 h-4" />
            </button>

            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800 mb-1">
                  <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">Signed in as</p>
                  <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">Bhavanaa Badiri</p>
                </div>
                <button
                  onClick={() => handleNavClick('account')}
                  className="w-full text-left px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Customer Dashboard</span>
                  <span className="text-[10px] text-stone-400">Orders & Profile</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full text-left px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors flex items-center justify-between font-medium"
                >
                  <span>Admin Portal</span>
                  <SlidersHorizontal className="w-3 h-3 text-stone-400" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium text-stone-700 dark:text-stone-200">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 border-b border-stone-100 dark:border-stone-800"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left py-2 border-b border-stone-100 dark:border-stone-800"
            >
              Shop All Products
            </button>
            <div className="py-2 border-b border-stone-100 dark:border-stone-800 space-y-2">
              <span className="text-xs uppercase tracking-wider text-stone-400">Categories</span>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <button onClick={() => handleCategoryClick('fashion')} className="text-left py-1 text-stone-600 dark:text-stone-400">Fashion</button>
                <button onClick={() => handleCategoryClick('home')} className="text-left py-1 text-stone-600 dark:text-stone-400">Home & Living</button>
                <button onClick={() => handleCategoryClick('beauty')} className="text-left py-1 text-stone-600 dark:text-stone-400">Beauty</button>
                <button onClick={() => handleCategoryClick('accessories')} className="text-left py-1 text-stone-600 dark:text-stone-400">Accessories</button>
                <button onClick={() => handleCategoryClick('tech')} className="text-left py-1 text-stone-600 dark:text-stone-400">Tech Essentials</button>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('wishlist')}
              className="text-left py-2 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between"
            >
              <span>Wishlist</span>
              <span className="text-xs font-mono">{wishlist.length}</span>
            </button>
            <button
              onClick={() => handleNavClick('account')}
              className="text-left py-2 border-b border-stone-100 dark:border-stone-800"
            >
              Customer Account
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 text-stone-500 dark:text-stone-400 font-mono text-xs"
            >
              Admin Dashboard Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
