'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, History } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface BrowsingHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

export function BrowsingHistoryDrawer({
  isOpen,
  onClose,
  history,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  wishlist
}: BrowsingHistoryDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            id="browsing-history-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-slate-50 dark:bg-slate-950 shadow-2xl"
          >
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <History className="w-5 h-5 text-indigo-600" />
                  Browsing History
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {history.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-slate-500 dark:text-slate-400">
                  <History className="h-16 w-16 text-slate-300" />
                  <p className="text-lg font-medium text-slate-900 dark:text-slate-100">No browsing history</p>
                  <p className="max-w-[250px] text-sm">Items you view will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {history.map((product, idx) => (
                    <ProductCard
                      key={`${product.id}-${idx}`}
                      product={product}
                      onAddToCart={() => onAddToCart(product)}
                      onImageClick={() => {
                        onClose();
                        onProductClick(product);
                      }}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlist.some(item => item.id === product.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
