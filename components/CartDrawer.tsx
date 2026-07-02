'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  onCheckout
}: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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
            id="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white dark:bg-slate-900 shadow-2xl"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <ShoppingBag className="w-5 h-5" />
                  Impulse Cart
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Items here will never be shipped or billed.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-gray-500">
                  <ShoppingBag className="h-16 w-16 text-gray-200" />
                  <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                  <p className="max-w-[200px] text-sm">Satisfy your urge. Add some items, it&apos;s completely free.</p>
                  <button onClick={onClose} className="mt-4 font-medium text-black underline">Start Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-white flex items-center justify-center p-2">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-contain mix-blend-multiply dark:mix-blend-normal"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-1 flex-col min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {item.product.title}
                        </div>
                        <div className="mt-1 flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="text-slate-400 hover:text-slate-600 dark:text-slate-400 p-1"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs text-slate-400 font-medium">Qty: {item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="text-slate-400 hover:text-slate-600 dark:text-slate-400 p-1"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Subtotal (Simulated)</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Actual Cost</span>
                      <span className="text-sm font-bold text-emerald-600">$0.00</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-dashed border-slate-200 dark:border-slate-800 mt-2">
                      <span className="text-base font-bold text-slate-900 dark:text-slate-100">Dopamine High</span>
                      <span className="text-base font-bold text-indigo-600">100% Guaranteed</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={onCheckout}
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 flex flex-col items-center justify-center transition-transform active:scale-95 hover:bg-emerald-700"
                  >
                    <span>COMPLETE VIRTUAL PURCHASE</span>
                    <span className="text-[10px] opacity-80 uppercase tracking-widest mt-1">
                      Satisfy the urge & save ${subtotal.toFixed(2)}
                    </span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-4 px-2 uppercase tracking-tight">
                    This is a therapeutic tool. Your bank account remains untouched. Peace of mind is the true delivery.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
