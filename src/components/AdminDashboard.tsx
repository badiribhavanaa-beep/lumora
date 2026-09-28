import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Search,
  ArrowLeft
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    setCurrentView 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [productSearch, setProductSearch] = useState('');
  
  // Product Modal (Add or Edit)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState<number>(95);
  const [formCategory, setFormCategory] = useState<Product['category']>('home');
  const [formStock, setFormStock] = useState<number>(20);
  const [formImage, setFormImage] = useState('/src/assets/images/product_ceramic_lamp_1790581832022.jpg');
  const [formDesc, setFormDesc] = useState('');

  // Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockItems = products.filter(p => p.stock <= 15);
  const totalCustomers = 48; // demo

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormTagline('');
    setFormPrice(95);
    setFormCategory('home');
    setFormStock(20);
    setFormImage('/src/assets/images/product_ceramic_lamp_1790581832022.jpg');
    setFormDesc('Crafted with architectural intention and raw materials.');
    setIsAddModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormTagline(p.tagline);
    setFormPrice(p.price);
    setFormCategory(p.category);
    setFormStock(p.stock);
    setFormImage(p.image);
    setFormDesc(p.description);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        tagline: formTagline,
        price: Number(formPrice),
        category: formCategory,
        stock: Number(formStock),
        image: formImage,
        description: formDesc,
      });
    } else {
      addProduct({
        name: formName,
        tagline: formTagline,
        price: Number(formPrice),
        category: formCategory,
        rating: 5.0,
        reviewsCount: 1,
        image: formImage,
        description: formDesc,
        specifications: { 'Origin': 'Studio Direct', 'Craft': 'Handmade' },
        stock: Number(formStock),
        viewsToday: 12,
        styleTags: ['Minimalist'],
        inStock: true,
        badge: 'New',
      });
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 gap-4 mb-8">
          <div>
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit Admin to Storefront</span>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100 font-editorial">
                Studio Management Portal
              </h1>
              <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm">
                Demo Admin
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Live inventory tracking, simulated orders ledger, and catalog controls.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-stone-800 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-4 border-b border-stone-200 dark:border-stone-800 mb-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'overview' ? 'text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <span>Overview & Metrics</span>
            {activeTab === 'overview' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'products' ? 'text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <span>Catalog Inventory ({products.length})</span>
            {activeTab === 'products' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'orders' ? 'text-stone-900 dark:text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <span>Orders Ledger ({orders.length})</span>
            {activeTab === 'orders' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 dark:bg-stone-100" />}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold font-mono text-stone-950 dark:text-white">
                  ${totalSales.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-600 font-medium">+18.4% this quarter</span>
              </div>

              <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                  <Package className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="text-2xl font-bold font-mono text-stone-950 dark:text-white">
                  {orders.length}
                </div>
                <span className="text-[11px] text-stone-400">All channels combined</span>
              </div>

              <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Products</span>
                  <BarChart3 className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                </div>
                <div className="text-2xl font-bold font-mono text-stone-950 dark:text-white">
                  {products.length}
                </div>
                <span className="text-[11px] text-stone-400">Across 5 disciplines</span>
              </div>

              <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Low Stock Watch</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-amber-600">
                  {lowStockItems.length}
                </div>
                <span className="text-[11px] text-amber-600 font-medium">Require studio reorder</span>
              </div>
            </div>

            {/* Low Stock Warning List */}
            {lowStockItems.length > 0 && (
              <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4 text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-sm font-semibold">Low Stock Inventory Notice</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-amber-100 dark:border-amber-900/40 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-xs font-medium text-stone-900 dark:text-stone-100 truncate max-w-[150px]">{item.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-sm">
                        {item.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sales Chart Mockup */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Weekly Revenue Velocity
              </h3>
              <div className="h-44 flex items-end gap-3 pt-6 px-2">
                {[
                  { day: 'Mon', height: '45%', val: '$1,200' },
                  { day: 'Tue', height: '60%', val: '$1,850' },
                  { day: 'Wed', height: '35%', val: '$980' },
                  { day: 'Thu', height: '80%', val: '$2,450' },
                  { day: 'Fri', height: '95%', val: '$3,100' },
                  { day: 'Sat', height: '70%', val: '$2,150' },
                  { day: 'Sun', height: '55%', val: '$1,600' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.val}</span>
                    <div 
                      className="w-full bg-stone-900 dark:bg-stone-100 rounded-t-lg transition-all duration-300 hover:opacity-80"
                      style={{ height: bar.height }}
                    />
                    <span className="text-[11px] font-mono text-stone-500">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xs">
            {/* Table Search */}
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter by product name..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs"
                />
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {products.length} Products Live
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {products
                    .filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()))
                    .map(p => (
                      <tr key={p.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0" />
                          <div>
                            <span className="font-semibold text-stone-900 dark:text-stone-100 block">{p.name}</span>
                            <span className="text-[11px] text-stone-400 truncate max-w-xs block">{p.tagline}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-stone-500">{p.category}</td>
                        <td className="py-3 px-4 font-mono font-medium text-stone-900 dark:text-stone-100">${p.price}</td>
                        <td className="py-3 px-4 font-mono">
                          <span className={`px-2 py-0.5 rounded-sm text-[11px] ${p.stock <= 15 ? 'bg-amber-100 text-amber-800 font-bold' : 'text-stone-600 dark:text-stone-300'}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-600 dark:text-stone-300 font-mono">
                          ★ {p.rating} ({p.reviewsCount})
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40">
                      <td className="py-3.5 px-4 font-mono font-semibold text-stone-900 dark:text-stone-100">
                        #{order.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold block">{order.shippingAddress.fullName}</span>
                        <span className="text-[11px] text-stone-400">{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-500">{order.date}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-stone-900 dark:text-stone-100">${order.total}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : order.status === 'Shipped'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e: any) => updateOrderStatus(order.id, e.target.value)}
                          className="px-2 py-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 font-editorial">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Product Title</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Sculptural Ceramic Vessel"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Short Tagline</label>
                  <input
                    type="text"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="e.g. Hand-turned Portuguese stoneware"
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      required
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Stock</label>
                    <input
                      type="number"
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      required
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e: any) => setFormCategory(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl capitalize"
                    >
                      <option value="home">Home</option>
                      <option value="fashion">Fashion</option>
                      <option value="accessories">Accessories</option>
                      <option value="tech">Tech</option>
                      <option value="beauty">Beauty</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Image Asset Path</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-stone-200 dark:border-stone-700 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-semibold"
                  >
                    Save to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
