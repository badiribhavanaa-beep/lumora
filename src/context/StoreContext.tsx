import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Review, 
  CategoryId, 
  ViewMode, 
  ShippingAddress 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  orders: Order[];
  reviews: Review[];
  currentView: ViewMode;
  selectedProductId: string | null;
  selectedArticleId: string | null;
  selectedCategory: CategoryId;
  searchQuery: string;
  isSearchOpen: boolean;
  isCartOpen: boolean;
  quickViewProduct: Product | null;
  darkMode: boolean;
  appliedCoupon: { code: string; discountPct: number } | null;
  toasts: Toast[];

  // Navigation
  setCurrentView: (view: ViewMode) => void;
  viewProduct: (productId: string) => void;
  viewArticle: (articleId: string) => void;
  filterByCategory: (category: CategoryId) => void;
  setSearchQuery: (query: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  toggleDarkMode: () => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;

  // Checkout & Orders
  placeOrder: (address: ShippingAddress, paymentMethod: string, deliveryType: 'standard' | 'express') => Order;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Admin
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Feedback
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage loaders
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_wishlist');
      return saved ? JSON.parse(saved) : ['lumora-lamp-travertine'];
    } catch {
      return ['lumora-lamp-travertine'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_recent');
      return saved ? JSON.parse(saved) : ['lumora-lamp-travertine', 'lumora-leather-tote'];
    } catch {
      return ['lumora-lamp-travertine', 'lumora-leather-tote'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('lumora_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lumora_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPct: number } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('lumora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lumora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumora_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('lumora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lumora_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('lumora_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // View Navigation
  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const viewArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentView('editorial');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterByCategory = (category: CategoryId) => {
    setSelectedCategory(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    quantity = 1, 
    color?: string, 
    size?: string
  ) => {
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    const cartItemId = `${product.id}-${chosenColor || 'def'}-${chosenSize || 'def'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
        },
      ];
    });

    showToast(`Added "${product.name}" to your bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LUMORA10') {
      setAppliedCoupon({ code: cleanCode, discountPct: 10 });
      showToast('Promo code applied: 10% off your order');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'WELCOME15') {
      setAppliedCoupon({ code: cleanCode, discountPct: 15 });
      showToast('Promo code applied: 15% off your order');
      return { success: true, message: '15% welcome discount applied!' };
    }
    return { success: false, message: 'Invalid code. Try "LUMORA10" or "WELCOME15".' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartDiscount = appliedCoupon
    ? Math.round(cartSubtotal * (appliedCoupon.discountPct / 100))
    : 0;
  const freeShippingThreshold = 150;
  const cartShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(prod ? `Removed "${prod.name}" from wishlist` : 'Removed from wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(prod ? `Saved "${prod.name}" to wishlist` : 'Saved to wishlist');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      addToCart(prod, 1);
      setWishlist(prev => prev.filter(id => id !== productId));
    }
  };

  // Orders
  const placeOrder = (
    address: ShippingAddress,
    paymentMethod: string,
    deliveryType: 'standard' | 'express'
  ): Order => {
    const shippingCost = deliveryType === 'express' ? 25 : cartShipping;
    const finalTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost);
    const orderId = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
    const tracking = `TRK-${Math.floor(100000000 + Math.random() * 900000000)}US`;
    
    const deliveryDays = deliveryType === 'express' ? 2 : 4;
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + deliveryDays);
    const estDelivery = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: shippingCost,
      total: finalTotal,
      status: 'Processing',
      shippingAddress: address,
      paymentMethod,
      trackingNumber: tracking,
      estimatedDelivery: `Estimated delivery by ${estDelivery}`,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${orderId} placed successfully!`, 'success');
    return newOrder;
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id === reviewData.productId) {
          const updatedCount = p.reviewsCount + 1;
          const updatedRating = Number(
            ((p.rating * p.reviewsCount + reviewData.rating) / updatedCount).toFixed(1)
          );
          return {
            ...p,
            rating: updatedRating,
            reviewsCount: updatedCount,
          };
        }
        return p;
      })
    );

    showToast('Thank you! Your verified review was published.');
  };

  // Admin Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `lumora-${Date.now()}`,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to catalog.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated.`);
  };

  const deleteProduct = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(prod ? `Product "${prod.name}" removed.` : 'Product removed.', 'info');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} updated to ${status}.`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        orders,
        reviews,
        currentView,
        selectedProductId,
        selectedArticleId,
        selectedCategory,
        searchQuery,
        isSearchOpen,
        isCartOpen,
        quickViewProduct,
        darkMode,
        appliedCoupon,
        toasts,
        setCurrentView,
        viewProduct,
        viewArticle,
        filterByCategory,
        setSearchQuery,
        setIsSearchOpen,
        setIsCartOpen,
        setQuickViewProduct,
        toggleDarkMode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        freeShippingThreshold,
        freeShippingRemaining,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        placeOrder,
        addReview,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
