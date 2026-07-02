'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Truck, Package, Clock, ShieldCheck, Map } from 'lucide-react';
import Image from 'next/image';
import { PastPurchase } from '@/types';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const DeliveryMap = dynamic(() => import('./DeliveryMap'), { ssr: false, loading: () => <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" /> });

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PastPurchase | null;
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowMap(false), 300); // wait for exit animation
    }
  }, [isOpen]);

  // Reset map state when modal closes or order changes
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shrink-0">
                <div className="flex flex-col">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">Order Details</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Order ID: {order.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:text-slate-400 hover:bg-white dark:bg-slate-900 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Status indicator */}
                <div className="flex flex-col gap-2 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold">
                    <Clock className="w-5 h-5" />
                    <span>
                      {order.status === 'to_pay' && 'Pending Payment'}
                      {order.status === 'to_ship' && 'Preparing to Ship'}
                      {order.status === 'to_receive' && 'Out for Delivery'}
                      {order.status === 'to_rate' && 'Delivered'}
                    </span>
                  </div>
                  {order.status === 'to_ship' && (
                    <p className="text-xs text-indigo-600 ml-7">Will be shipped within 15 minutes.</p>
                  )}
                  {order.status === 'to_receive' && (
                    <p className="text-xs text-indigo-600 ml-7">Your order is on the way to your shipping address.</p>
                  )}
                </div>

                {/* Shipping info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Shipping Information
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-950 p-3 sm:p-4 rounded-xl text-sm border border-slate-100 dark:border-slate-800 space-y-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200">John Doe (Simulated)</p>
                    <p className="text-slate-600 dark:text-slate-400">+1 (555) 012-3456</p>
                    <p className="text-slate-600 dark:text-slate-400">123 Fake Street, Apartment 4B</p>
                    <p className="text-slate-600 dark:text-slate-400">Imaginary City, IC 12345</p>
                  </div>
                </div>

                {/* Delivery info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      Delivery Information
                    </h3>
                    {order.status === 'to_receive' && (
                      <button 
                        onClick={() => setShowMap(!showMap)}
                        className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-indigo-100 transition-colors"
                      >
                        <Map className="w-3 h-3" />
                        {showMap ? 'Hide Map' : 'Track Order'}
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {showMap && order.status === 'to_receive' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <DeliveryMap />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3 sm:p-4 rounded-xl text-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-slate-500 dark:text-slate-400">Shipping Method</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Express Delivery</span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-slate-500 dark:text-slate-400">Tracking Number</span>
                      <span className="font-medium text-indigo-600">SIM-{order.id.toUpperCase()}</span>
                    </div>
                    {order.paidAt && (
                      <div className="flex justify-between items-start">
                        <span className="text-slate-500 dark:text-slate-400">Paid Time</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {new Date(order.paidAt).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Item info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-400" />
                    Item Information
                  </h3>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="p-3 sm:p-4 flex gap-3 sm:gap-4 items-start">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 bg-white rounded-lg p-2 shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            className="object-contain mix-blend-multiply dark:mix-blend-normal"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2">{item.product.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400">Quantity: {item.quantity}</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center py-2 px-1">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Order Total</span>
                    <span className="text-lg font-bold text-indigo-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
