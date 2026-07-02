'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, Package, Clock, Star, Settings, User, LogOut, ChevronRight, History, Plus } from 'lucide-react';
import Image from 'next/image';

import { PastPurchase } from '@/types';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHistory: (tab?: 'all' | 'to_pay' | 'to_ship' | 'to_receive' | 'to_rate') => void;
  walletBalance: number;
  onTopUp: (amount: number) => void;
  purchases: PastPurchase[];
  onOpenSettings: () => void;
  onOpenBrowsingHistory: () => void;
}

export function UserProfileDrawer({
  isOpen,
  onClose,
  onOpenHistory,
  walletBalance,
  onTopUp,
  purchases,
  onOpenSettings,
  onOpenBrowsingHistory
}: UserProfileDrawerProps) {
  const [isToppingUp, setIsToppingUp] = useState(false);
  const topUpAmounts = [50, 100, 500, 1000];

  const handleTopUp = (amount: number) => {
    onTopUp(amount);
    setIsToppingUp(false);
  };

  const toPayCount = purchases.filter(p => p.status === 'to_pay').length;
  const toShipCount = purchases.filter(p => p.status === 'to_ship').length;
  const toReceiveCount = purchases.filter(p => p.status === 'to_receive').length;
  const toRateCount = purchases.filter(p => p.status === 'to_rate').length;
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
            id="user-profile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-slate-50 shadow-2xl overflow-hidden"
          >
            {/* Header / Profile Info */}
            <div className="bg-white p-6 border-b border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-slate-900">Me</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl shrink-0">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Simulated User</h3>
                  <p className="text-sm text-slate-500">simulated@example.com</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* My Wallet */}
              <div className="bg-white mt-2 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-indigo-600" />
                    My Wallet
                  </h4>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-indigo-600 font-medium">Available Balance</p>
                    <p className="text-2xl font-bold text-indigo-900">
                      ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsToppingUp(!isToppingUp)}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Top Up
                  </button>
                </div>
                
                <AnimatePresence>
                  {isToppingUp && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 grid grid-cols-2 gap-2">
                        {topUpAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => handleTopUp(amount)}
                            className="flex items-center justify-center gap-1 py-2 border border-indigo-200 bg-white rounded-lg text-indigo-700 font-medium hover:bg-indigo-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" /> ${amount}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* My Purchases */}
              <div className="bg-white mt-2 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900">My Purchases</h4>
                  <button 
                    onClick={() => {
                      onClose();
                      onOpenHistory();
                    }}
                    className="text-xs text-slate-500 hover:text-indigo-600 flex items-center"
                  >
                    View History <ChevronRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <button 
                    onClick={() => { onClose(); onOpenHistory('to_pay'); }}
                    className="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <Wallet className="h-6 w-6 text-slate-600" />
                      {toPayCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{toPayCount}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-600 text-center">To Pay</span>
                  </button>
                  <button 
                    onClick={() => { onClose(); onOpenHistory('to_ship'); }}
                    className="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <Package className="h-6 w-6 text-slate-600" />
                      {toShipCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{toShipCount}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-600 text-center">To Ship</span>
                  </button>
                  <button 
                    onClick={() => { onClose(); onOpenHistory('to_receive'); }}
                    className="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <Clock className="h-6 w-6 text-slate-600" />
                      {toReceiveCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{toReceiveCount}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-600 text-center">To Receive</span>
                  </button>
                  <button 
                    onClick={() => { onClose(); onOpenHistory('to_rate'); }}
                    className="flex flex-col items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <Star className="h-6 w-6 text-slate-600" />
                      {toRateCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{toRateCount}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-600 text-center">To Rate</span>
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white mt-2 p-2">
                <div className="p-2">
                  <h4 className="font-bold text-slate-900 mb-2 px-2 text-sm">Settings</h4>
                  <div className="space-y-1">
                    <button 
                      onClick={() => { onClose(); onOpenSettings(); }}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3 text-slate-700 group-hover:text-indigo-600">
                        <Settings className="h-5 w-5" />
                        <span className="font-medium text-sm">Account Settings</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                    </button>
                    <button 
                      onClick={() => { onClose(); onOpenBrowsingHistory(); }}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3 text-slate-700 group-hover:text-indigo-600">
                        <History className="h-5 w-5" />
                        <span className="font-medium text-sm">Browsing History</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group">
                      <div className="flex items-center gap-3 text-rose-600">
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium text-sm">Log Out</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
