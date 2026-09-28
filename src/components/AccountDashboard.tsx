import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Clock, 
  LogOut, 
  CheckCircle, 
  ExternalLink,
  Shield,
  Truck
} from 'lucide-react';

export const AccountDashboard: React.FC = () => {
  const { 
    orders, 
    products, 
    wishlist, 
    recentlyViewed, 
    setCurrentView,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'recent'>('orders');

  const recentProducts = products.filter(p => recentlyViewed.includes(p.id));

  const handleLogout = () => {
    showToast('Logged out of demo session.', 'info');
    setCurrentView('home');
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Lockup Header */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-editorial text-2xl flex items-center justify-center font-medium shadow-md">
              BB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  Bhavanaa Badiri
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  Member Since 2026
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono mt-0.5">badiribhavanaa@gmail.com · San Francisco, CA</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('admin')}
              className="px-4 py-2 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl text-xs font-mono text-stone-700 dark:text-stone-300 transition-colors"
            >
              Open Admin Portal
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 gap-8 mb-8 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders' ? 'text-stone-950 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 transition-colors relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'addresses' ? 'text-stone-950 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses</span>
            {activeTab === 'addresses' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`pb-3 transition-colors relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'recent' ? 'text-stone-950 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Recently Viewed ({recentProducts.length})</span>
            {activeTab === 'recent' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 transition-colors relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'profile' ? 'text-stone-950 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Settings & Preferences</span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />
            )}
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl">
                <Package className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold">No orders yet</h3>
                <p className="text-xs text-stone-500 mt-1">When you place an order, it will appear here with live tracking updates.</p>
              </div>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-stone-900 dark:text-stone-100">
                        #{order.id}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">·</span>
                      <span className="text-xs text-stone-500">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : order.status === 'Shipped'
                          ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                      }`}>
                        {order.status}
                      </span>
                      <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        ${order.total}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                        <img
                          src={item.product.image}
                          alt=""
                          className="w-14 h-14 rounded-xl object-cover bg-stone-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-stone-500">
                            Qty: {item.quantity} · ${item.product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Tracking info */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{order.estimatedDelivery}</span>
                      <span className="font-mono text-stone-400">({order.trackingNumber})</span>
                    </div>
                    <span>Paid via {order.paymentMethod}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                  Primary Residence
                </span>
                <span className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded font-mono">
                  Default
                </span>
              </div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Bhavanaa Badiri</h3>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                450 Minimalist Boulevard, Apt 4B<br />
                San Francisco, CA 94107<br />
                United States · +1 (555) 234-8901
              </p>
            </div>

            <div className="p-6 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl flex flex-col items-center justify-center text-center p-6 space-y-2">
              <MapPin className="w-6 h-6 text-stone-400" />
              <h4 className="text-xs font-semibold text-stone-700 dark:text-stone-300">Add New Address</h4>
              <p className="text-[11px] text-stone-400">Save secondary residential or office delivery locations</p>
            </div>
          </div>
        )}

        {/* Tab 3: Recently Viewed */}
        {activeTab === 'recent' && (
          <div>
            {recentProducts.length === 0 ? (
              <p className="text-xs text-stone-500">You haven't viewed any products in this session yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">First Name</label>
                <input type="text" defaultValue="Bhavanaa" className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl" />
              </div>
              <div>
                <label className="text-stone-400 block mb-1">Last Name</label>
                <input type="text" defaultValue="Badiri" className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl" />
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1">Email</label>
              <input type="email" defaultValue="badiribhavanaa@gmail.com" className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs" />
            </div>

            <button
              onClick={() => showToast('Profile settings saved.')}
              className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-xl"
            >
              Save Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
