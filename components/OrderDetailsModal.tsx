'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Truck, Package, Clock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { PastPurchase } from '@/types';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PastPurchase | null;
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
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
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50 shrink-0">
                <div className="flex flex-col">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Order Details</h2>
                  <p className="text-xs text-slate-500">Order ID: {order.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 hover:bg-white p-2 rounded-full transition-colors"
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
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Shipping Information
                  </h3>
                  <div className="bg-slate-50 p-3 sm:p-4 rounded-xl text-sm border border-slate-100 space-y-1">
                    <p className="font-medium text-slate-800">John Doe (Simulated)</p>
                    <p className="text-slate-600">+1 (555) 012-3456</p>
                    <p className="text-slate-600">123 Fake Street, Apartment 4B</p>
                    <p className="text-slate-600">Imaginary City, IC 12345</p>
                  </div>
                </div>

                {/* Delivery info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-400" />
                    Delivery Information
                  </h3>
                  <div className="bg-slate-50 p-3 sm:p-4 rounded-xl text-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-slate-500">Shipping Method</span>
                      <span className="font-medium text-slate-800">Express Delivery</span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-slate-500">Tracking Number</span>
                      <span className="font-medium text-indigo-600">SIM-{order.id.toUpperCase()}</span>
                    </div>
                    {order.paidAt && (
                      <div className="flex justify-between items-start">
                        <span className="text-slate-500">Paid Time</span>
                        <span className="font-medium text-slate-800">
                          {new Date(order.paidAt).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Item info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-400" />
                    Item Information
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="p-3 sm:p-4 flex gap-3 sm:gap-4 items-start">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 bg-slate-50 rounded-lg p-2 shrink-0 border border-slate-100">
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            fill
                            className="object-contain mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-2">{item.product.title}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-500">Quantity: {item.quantity}</span>
                            <span className="text-sm font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center py-2 px-1">
                    <span className="text-sm font-bold text-slate-700">Order Total</span>
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
