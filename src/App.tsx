import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { TrendingProducts } from './components/TrendingProducts';
import { FindYourPick } from './components/FindYourPick';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { WhyLumora } from './components/WhyLumora';
import { LumoraEdit } from './components/LumoraEdit';
import { CustomerReviews } from './components/CustomerReviews';
import { Newsletter } from './components/Newsletter';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistPage } from './components/WishlistPage';
import { AccountDashboard } from './components/AccountDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { EditorialArticlePage } from './components/EditorialArticlePage';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <CategoryShowcase />
            <TrendingProducts />
            <FindYourPick />
            <NewArrivalsCarousel />
            <WhyLumora />
            <LumoraEdit />
            <CustomerReviews />
            <Newsletter />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'account' && <AccountDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'editorial' && <EditorialArticlePage />}
      </main>

      <Footer />

      {/* Persistent Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
