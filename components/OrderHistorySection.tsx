'use client';

import { PastPurchase } from '@/types';
import { History, Calendar, Package } from 'lucide-react';
import Image from 'next/image';

export function OrderHistorySection({ purchases }: { purchases: PastPurchase[] }) {
  if (purchases.length === 0) return null;

  return (
    <section className="mt-24 border-t border-slate-200 dark:border-slate-800 pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <History className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Order History</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Review your simulated past purchases.</p>
          </div>
        </div>

        <div className="space-y-6">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Order Placed</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {new Date(purchase.timestamp).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Total</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">${purchase.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 font-medium mb-1">Order #</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">{purchase.id.toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Package className="h-3.5 w-3.5" />
                  Simulated
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {purchase.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 sm:gap-6">
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 bg-white rounded-xl p-2 flex items-center justify-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-contain mix-blend-multiply dark:mix-blend-normal"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.product.title}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{item.product.description}</p>
                          <div className="pt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
