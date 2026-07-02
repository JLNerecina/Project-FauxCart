'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, Check, Plus, Tag, ShieldCheck, Box } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export function ProductDetailsModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 bg-slate-100 dark:bg-slate-800 flex items-center justify-center h-48 sm:h-64 md:h-auto md:min-h-full p-6 md:p-12 mix-blend-multiply shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 left-4 md:hidden p-2 bg-white dark:bg-slate-900/80 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white dark:bg-slate-900/80 backdrop-blur-sm text-slate-400 hover:text-rose-500 hover:bg-white dark:bg-slate-900 transition-all shadow-sm z-10"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                <div className="relative w-full h-full min-h-[150px] md:min-h-[400px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col">
                <div className="hidden md:flex justify-end mb-4">
                  <button
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        {product.rating.rate} ({product.rating.count} reviews)
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {product.title}
                    </h2>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-4">${product.price.toFixed(2)}</p>
                  </div>

                  <div className="prose prose-sm sm:prose-base prose-slate">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Mock Additional Specs */}
                  <div className="grid grid-cols-2 gap-4 py-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-3">
                      <div className="mt-1 flex-shrink-0 text-slate-400">
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Availability</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-500" /> In Stock
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 flex-shrink-0 text-slate-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Warranty</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Standard 1-Year</p>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Customer Reviews */}
                  <div className="py-6 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Simulated Reviews</h3>
                    <div className="space-y-4">
                      {/* Review 1 */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-amber-500">
                            {[...Array(Math.max(1, Math.round(product.rating.rate)))].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                            {[...Array(5 - Math.max(1, Math.round(product.rating.rate)))].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-slate-300" />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Verified Buyer</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          &quot;Absolutely love this! Exactly what I needed for my impulse buying simulation. Works like a charm.&quot;
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Alex D. - 2 days ago</p>
                      </div>
                      
                      {/* Review 2 */}
                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-amber-500">
                            {[...Array(Math.min(5, Math.max(1, Math.ceil(product.rating.rate))))].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                            {[...Array(5 - Math.min(5, Math.max(1, Math.ceil(product.rating.rate))))].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 text-slate-300" />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Verified Buyer</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          &quot;Good quality for the price. The shipping (even simulated) was incredibly fast. Highly recommended.&quot;
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Jordan P. - 1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="w-full py-3.5 sm:py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add to Impulse Cart - ${(product.price).toFixed(2)}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
