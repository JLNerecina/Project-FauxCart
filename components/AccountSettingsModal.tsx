'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, User, Bell, Shield, Key, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl pointer-events-auto overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 dark:text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  Account Settings
                </h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-slate-600 dark:text-slate-300">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">Personal Information</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Update your simulated identity</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-slate-600 dark:text-slate-300">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">Notifications</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Configure your fake alerts</p>
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-slate-600 dark:text-slate-300">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">Privacy & Security</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Manage simulated permissions</p>
                    </div>
                  </div>
                </button>

                {mounted && (
                  <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-slate-600 dark:text-slate-300">
                        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">Appearance</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled'}
                        </p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-indigo-600 transition-colors">
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
