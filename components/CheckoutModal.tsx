'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { CartItem } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onConfirm: () => void;
  checkoutState: 'idle' | 'processing' | 'success';
}

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onConfirm,
  checkoutState
}: CheckoutModalProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const [deliveryDates, setDeliveryDates] = useState({ start: '', end: '' });

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeliveryDates({
        start: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={checkoutState !== 'processing' ? onClose : undefined}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              {checkoutState === 'success' ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="rounded-full bg-emerald-100 p-4 text-emerald-600 mb-6"
                  >
                    <Sparkles className="h-12 w-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 mb-2">
                    Guilt-Free Checkout <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-[300px]">
                    The dopamine has been delivered. Your wallet is safe! Zero dollars spent.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full rounded-xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus:ring-4 focus:ring-slate-200"
                  >
                    Return to Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Virtual Checkout Review</h2>
                    <button
                      onClick={onClose}
                      disabled={checkoutState === 'processing'}
                      className="text-slate-400 hover:text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 p-2 rounded-full transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto flex-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-start text-sm gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <span className="font-medium text-slate-500 dark:text-slate-400 shrink-0">{item.quantity}x</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium truncate flex-1">{item.product.title}</span>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-slate-100 shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
                      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>Simulated Taxes (8%)</span>
                        <span>${(subtotal * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-emerald-600 font-bold">
                        <span>Simulated Discount</span>
                        <span>-${(subtotal * 1.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-slate-100 border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 mt-2">
                        <span>Amount Due</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm text-indigo-800 font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Estimated Delivery: {deliveryDates.start} - {deliveryDates.end}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={onConfirm}
                      disabled={checkoutState === 'processing' || cart.length === 0}
                      className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-80 transition-transform active:scale-95 hover:bg-emerald-700"
                    >
                      {checkoutState === 'processing' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Simulation...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Confirm Virtual Purchase
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4 px-2 uppercase tracking-tight">
                      This action will clear your cart. No actual payment details required.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
