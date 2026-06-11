'use client';

import { useState } from 'react';
import { ShoppingBag, Flame, Heart, Search } from 'lucide-react';
import { Product, CartItem } from '@/types';
import { ProductCard } from './ProductCard';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { CheckoutModal } from './CheckoutModal';
import { motion } from 'motion/react';

export function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
    if (checkoutState === 'success') {
       setCheckoutState('idle');
    }
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const moveFromWishlistToCart = (product: Product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    setCheckoutState('processing');
    // Simulate network API call
    setTimeout(() => {
      setCheckoutState('success');
      // Clear the cart behind the scenes slightly after so the user doesn't see it abruptly empty
      setTimeout(() => {
        setCart([]);
      }, 500);
    }, 1500);
  };

  const handleOpenCheckoutModal = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    if (checkoutState === 'success') {
      setTimeout(() => setCheckoutState('idle'), 300);
    }
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = ['All Categories', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <header id="main-nav" className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Flame className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 font-display">
              FAUX<span className="text-indigo-600 uppercase text-xs ml-1 font-semibold">Cart</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
              SIMULATED SAVINGS: ${cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
            </div>
            
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="group relative flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 w-10 h-10 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              aria-label="Open wishlist"
            >
              <Heart className={`h-4 w-4 transition-colors ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow ring-2 ring-white transform scale-100 transition-transform">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-2 rounded-full border border-slate-200 bg-white p-2 px-4 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4 text-slate-700" />
              <span className="font-medium text-slate-900 text-sm">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow ring-2 ring-white transform scale-100 transition-transform">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between mt-4">
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-slate-800"
            >
              Flash Impulse Deals
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0"
            >
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search impulse items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-sm"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto py-2 pl-3 pr-8 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent cursor-pointer shadow-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          <div id="product-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>

          {products.length > 0 && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
              <Search className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-900">No items found</p>
              <p className="text-sm mt-1">Try adapting your search or category filter.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}
                className="mt-4 text-sm font-medium text-indigo-600 underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 mb-4"></div>
              Loading incredible fake products...
            </div>
          )}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cart={cart}
        updateQuantity={updateQuantity}
        onCheckout={handleOpenCheckoutModal}
      />
      
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={toggleWishlist}
        onMoveToCart={moveFromWishlistToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCloseCheckoutModal}
        cart={cart}
        onConfirm={handleCheckout}
        checkoutState={checkoutState}
      />
    </div>
  );
}
