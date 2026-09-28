export type CategoryId = 'all' | 'fashion' | 'home' | 'beauty' | 'accessories' | 'tech';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'fashion' | 'home' | 'beauty' | 'accessories' | 'tech';
  rating: number;
  reviewsCount: number;
  badge?: 'New' | 'Curated' | 'Limited' | 'Bestseller';
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  description: string;
  specifications: Record<string, string>;
  stock: number;
  viewsToday: number;
  styleTags: string[];
  inStock: boolean;
  featured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string; // unique item entry id (productId + color + size)
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: string[];
  curatedProductIds: string[];
}

export type ViewMode = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'wishlist' 
  | 'account' 
  | 'admin' 
  | 'editorial';
