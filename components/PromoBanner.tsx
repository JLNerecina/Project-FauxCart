'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Zap, Gift } from 'lucide-react';

const PROMOS = [
  { id: 1, message: "Flash Sale! Extra 20% off electronics - use code ZAP20", icon: Zap, color: 'text-amber-300' },
  { id: 2, message: "Free simulated shipping on all orders over $50!", icon: Gift, color: 'text-emerald-300' },
  { id: 3, message: "Weekend Special: Buy one, pretend to get one free!", icon: Tag, color: 'text-rose-300' }
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMOS.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-indigo-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm font-medium"
          >
            {(() => {
              const PromoIcon = PROMOS[currentIndex].icon;
              return <PromoIcon className={`w-4 h-4 ${PROMOS[currentIndex].color}`} />;
            })()}
            {PROMOS[currentIndex].message}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
