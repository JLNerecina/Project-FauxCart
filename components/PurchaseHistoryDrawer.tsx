'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, History, ShoppingBag, Calendar } from 'lucide-react';
import Image from 'next/image';
import { PastPurchase } from '@/types';

interface PurchaseHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: PastPurchase[];
}

export function PurchaseHistoryDrawer({
  isOpen,
  onClose,
  purchases
}: PurchaseHistoryDrawerProps) {
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
            id="history-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-slate-50 shadow-2xl"
          >
            <div className="p-6 bg-white border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <History className="w-5 h-5 text-indigo-600" />
                  Simulated Order History
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  aria-label="Close history"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">Review the items you didn&apos;t buy.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {purchases.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-slate-500">
                  <History className="h-16 w-16 text-slate-300" />
                  <p className="text-lg font-medium text-slate-900">No purchase history</p>
                  <p className="max-w-[250px] text-sm">Your simulated purchase history will appear here after you check out.</p>
                  <button onClick={onClose} className="mt-4 font-medium text-indigo-600 underline hover:text-indigo-700">Start Shopping</button>
                </div>
              ) : (
                purchases.map((purchase) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(purchase.timestamp).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        ${purchase.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      {purchase.items.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-slate-50 border border-slate-100 p-1 flex items-center justify-center">
                            <Image
                              src={item.product.image}
                              alt={item.product.title}
                              fill
                              className="object-contain mix-blend-multiply"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{item.product.title}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                              <span className="text-xs font-semibold text-slate-700">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            {purchases.length > 0 && (
              <div className="bg-white p-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500 font-medium">Total Simulated Savings</span>
                  <span className="text-xl font-bold tracking-tight text-emerald-600">
                    ${purchases.reduce((sum, purchase) => sum + purchase.total, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
