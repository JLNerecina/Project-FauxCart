'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Flame, Heart, Search, History, Trophy, User } from 'lucide-react';
import { Product, CartItem, PastPurchase } from '@/types';
import { ProductCard } from './ProductCard';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';
import { CheckoutModal } from './CheckoutModal';
import { PurchaseHistoryDrawer } from './PurchaseHistoryDrawer';
import { MilestonesDrawer } from './MilestonesDrawer';
import { OrderHistorySection } from './OrderHistorySection';
import { ProductDetailsModal } from './ProductDetailsModal';
import { PromoBanner } from './PromoBanner';
import { UserProfileDrawer } from './UserProfileDrawer';
import { AccountSettingsModal } from './AccountSettingsModal';
import { BrowsingHistoryDrawer } from './BrowsingHistoryDrawer';
import { OrderDetailsModal } from './OrderDetailsModal';
import { motion } from 'motion/react';

export function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [pastPurchases, setPastPurchases] = useState<PastPurchase[]>([]);
  const [browsingHistory, setBrowsingHistory] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBrowsingHistoryOpen, setIsBrowsingHistoryOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PastPurchase | null>(null);
  const [historyTab, setHistoryTab] = useState<'all' | 'to_pay' | 'to_ship' | 'to_receive' | 'to_rate'>('all');
  const [walletBalance, setWalletBalance] = useState(1250.00);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sim_cart');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('sim_wishlist');
       
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedPurchases = localStorage.getItem('sim_purchases');
       
      if (savedPurchases) setPastPurchases(JSON.parse(savedPurchases));

      const savedBrowsing = localStorage.getItem('sim_browsing');
      if (savedBrowsing) setBrowsingHistory(JSON.parse(savedBrowsing));
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPastPurchases(prev => {
        let changed = false;
        const updated = prev.map(p => {
          if (p.status === 'to_ship' && p.paidAt) {
            const paidTime = new Date(p.paidAt).getTime();
            if (Date.now() - paidTime > 15 * 60 * 1000) {
              changed = true;
              return { ...p, status: 'to_receive' as const };
            }
          }
          return p;
        });
        return changed ? updated : prev;
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sim_cart', JSON.stringify(cart));
      localStorage.setItem('sim_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('sim_purchases', JSON.stringify(pastPurchases));
      localStorage.setItem('sim_browsing', JSON.stringify(browsingHistory));
    }
  }, [cart, wishlist, pastPurchases, browsingHistory, isLoaded]);

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setBrowsingHistory(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 20); // keep last 20
    });
  };

  const handleCheckout = () => {
    setCheckoutState('processing');
    // Simulate network API call
    setTimeout(() => {
      const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const newPurchase: PastPurchase = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        items: [...cart],
        total: subtotal,
        status: 'to_pay'
      };
      
      setPastPurchases((prev) => [newPurchase, ...prev]);
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

  const updatePurchase = (id: string, updates: Partial<PastPurchase>) => {
    setPastPurchases((prev) => 
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [sortBy, setSortBy] = useState('Recommended');

  const categories = ['All Categories', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (selectedPriceRange === 'Under $50') matchesPrice = product.price < 50;
    else if (selectedPriceRange === '$50 - $100') matchesPrice = product.price >= 50 && product.price <= 100;
    else if (selectedPriceRange === '$100 - $500') matchesPrice = product.price > 100 && product.price <= 500;
    else if (selectedPriceRange === 'Over $500') matchesPrice = product.price > 500;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Rating: High to Low') return b.rating.rate - a.rating.rate;
    return 0; // Recommended
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
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

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
              SIMULATED SAVINGS: ${cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
            </div>
            
            <button
              onClick={() => setIsMilestonesOpen(true)}
              className="relative flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 w-10 h-10 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              aria-label="Open milestones"
            >
              <Trophy className="h-4 w-4 text-slate-700" />
            </button>

            <button
              onClick={() => setIsHistoryOpen(true)}
              className="relative flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 w-10 h-10 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              aria-label="Open purchase history"
            >
              <History className="h-4 w-4 text-slate-700" />
            </button>

            <button
              onClick={() => setIsProfileOpen(true)}
              className="relative flex items-center justify-center sm:justify-start gap-2 rounded-full border border-slate-200 bg-white p-2 w-10 h-10 sm:w-auto sm:px-4 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              aria-label="Open user profile"
            >
              <User className="h-4 w-4 text-slate-700" />
              <span className="hidden sm:inline font-medium text-slate-900 text-sm">Me</span>
            </button>

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
              className="group relative flex items-center justify-center sm:justify-start gap-2 rounded-full border border-slate-200 bg-white p-2 w-10 h-10 sm:w-auto sm:px-4 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4 text-slate-700" />
              <span className="hidden sm:inline font-medium text-slate-900 text-sm">Cart</span>
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
          <div className="mb-6 sm:mb-8 flex flex-col xl:flex-row xl:items-center justify-between mt-2 sm:mt-4 gap-3 sm:gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg sm:text-2xl font-bold text-slate-800 shrink-0"
            >
              Flash Impulse Deals
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 w-full xl:w-auto"
            >
              <div className="relative w-full sm:w-auto sm:min-w-[200px] flex-1">
                <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-md sm:rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-sm"
                />
              </div>
              <div className="grid grid-cols-3 sm:flex sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto py-1.5 sm:py-2 pl-2 sm:pl-3 pr-6 sm:pr-8 bg-white border border-slate-200 rounded-md sm:rounded-lg text-[10px] sm:text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent cursor-pointer shadow-sm text-ellipsis"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full sm:w-auto py-1.5 sm:py-2 pl-2 sm:pl-3 pr-6 sm:pr-8 bg-white border border-slate-200 rounded-md sm:rounded-lg text-[10px] sm:text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent cursor-pointer shadow-sm text-ellipsis"
                >
                  <option value="All Prices">All Prices</option>
                  <option value="Under $50">Under $50</option>
                  <option value="$50 - $100">$50 - $100</option>
                  <option value="$100 - $500">$100 - $500</option>
                  <option value="Over $500">Over $500</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto py-1.5 sm:py-2 pl-2 sm:pl-3 pr-6 sm:pr-8 bg-white border border-slate-200 rounded-md sm:rounded-lg text-[10px] sm:text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent cursor-pointer shadow-sm text-ellipsis"
                >
                  <option value="Recommended">Recommended</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Rating: High to Low">Rating: High to Low</option>
                </select>
              </div>
            </motion.div>
          </div>

          <div id="product-grid" className="grid grid-cols-3 gap-2 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedFilteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={toggleWishlist}
                onImageClick={handleProductClick}
              />
            ))}
          </div>

          {products.length > 0 && sortedFilteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
              <Search className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-900">No items found</p>
              <p className="text-sm mt-1">Try adapting your search, or relaxing your category/price filters.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setSelectedPriceRange('All Prices');
                  setSortBy('Recommended');
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

        <OrderHistorySection purchases={pastPurchases} />
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

      <PurchaseHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        purchases={pastPurchases}
        activeTab={historyTab}
        onTabChange={setHistoryTab}
        walletBalance={walletBalance}
        onPay={(id, amount) => {
          setWalletBalance(prev => prev - amount);
          updatePurchase(id, { status: 'to_ship', paidAt: new Date().toISOString() });
        }}
        onPurchaseClick={setSelectedOrder}
      />

      <MilestonesDrawer
        isOpen={isMilestonesOpen}
        onClose={() => setIsMilestonesOpen(false)}
        totalItemsPurchased={pastPurchases.reduce((sum, purchase) => sum + purchase.items.reduce((acc, item) => acc + item.quantity, 0), 0)}
      />

      <UserProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenHistory={(tab) => {
          if (tab) setHistoryTab(tab);
          setIsHistoryOpen(true);
        }}
        walletBalance={walletBalance}
        onTopUp={(amount) => setWalletBalance(prev => prev + amount)}
        purchases={pastPurchases}
        onOpenSettings={() => setIsAccountSettingsOpen(true)}
        onOpenBrowsingHistory={() => setIsBrowsingHistoryOpen(true)}
      />

      <BrowsingHistoryDrawer
        isOpen={isBrowsingHistoryOpen}
        onClose={() => setIsBrowsingHistoryOpen(false)}
        history={browsingHistory}
        onProductClick={handleProductClick}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />

      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
      />

      <ProductDetailsModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onAddToCart={addToCart}
        isWishlisted={selectedProduct ? wishlist.some(item => item.id === selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <OrderDetailsModal
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
}
