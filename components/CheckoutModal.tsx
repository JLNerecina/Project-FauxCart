'use client';

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
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
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
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center justify-center gap-2 mb-2">
                    Guilt-Free Checkout <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-[300px]">
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
                  <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Virtual Checkout Review</h2>
                    <button
                      onClick={onClose}
                      disabled={checkoutState === 'processing'}
                      className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto flex-1">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-start text-sm">
                          <div className="flex items-start gap-3">
                            <span className="font-medium text-slate-500">{item.quantity}x</span>
                            <span className="text-slate-700 font-medium line-clamp-1 flex-1 pr-4">{item.product.title}</span>
                          </div>
                          <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 space-y-2">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Original Total</span>
                        <span className="line-through">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-emerald-600 font-bold">
                        <span>Simulated Discount</span>
                        <span>-${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-slate-900 border-t border-dashed border-slate-200 pt-3 mt-2">
                        <span>Amount Due</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 border-t border-slate-100">
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
