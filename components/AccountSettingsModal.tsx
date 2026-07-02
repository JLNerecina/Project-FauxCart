'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, User, Bell, Shield, Key } from 'lucide-react';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
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
              className="w-full max-w-md bg-white rounded-2xl shadow-xl pointer-events-auto overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-600" />
                  Account Settings
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-indigo-600 text-slate-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Personal Information</p>
                      <p className="text-xs text-slate-500">Update your simulated identity</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-indigo-600 text-slate-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Notifications</p>
                      <p className="text-xs text-slate-500">Configure your fake alerts</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-indigo-600 text-slate-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Privacy & Security</p>
                      <p className="text-xs text-slate-500">Manage simulated permissions</p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
