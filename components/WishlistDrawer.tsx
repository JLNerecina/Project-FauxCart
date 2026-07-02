'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onMoveToCart
}: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            id="wishlist-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white dark:bg-slate-900 shadow-2xl"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  Saved for Later
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Close wishlist"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Items you&apos;re considering for a dopamine hit later.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {wishlist.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-slate-500 dark:text-slate-400">
                   <Heart className="h-16 w-16 text-slate-200" />
                  <p className="text-lg font-medium text-slate-900 dark:text-slate-100">Your wishlist is empty</p>
                  <p className="max-w-[200px] text-sm">Save items you like by tapping the heart icon on any product.</p>
                  <button onClick={onClose} className="mt-4 font-medium text-indigo-600 underline">Start Browsing</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-white flex items-center justify-center p-2">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain mix-blend-multiply dark:mix-blend-normal"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-1 flex-col min-w-0">
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                          {product.title}
                        </div>
                        <div className="text-sm font-bold text-indigo-600 mt-1">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => onMoveToCart(product)}
                            className="flex-1 flex items-center justify-center gap-2 rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                          >
                            <ShoppingBag className="h-3 w-3" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => onRemove(product)}
                            className="rounded border border-slate-200 dark:border-slate-800 p-1.5 text-slate-400 hover:bg-slate-50 dark:bg-slate-950 hover:text-rose-500 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
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
