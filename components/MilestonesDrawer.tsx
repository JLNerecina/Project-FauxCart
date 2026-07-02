'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Star, Zap, Sparkles, Crown, Lock } from 'lucide-react';

interface MilestonesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  totalItemsPurchased: number;
}

const MILESTONES = [
  { id: 'first_hit', title: 'Window Shopper', description: 'Complete your first simulated purchase.', threshold: 1, Icon: Star, color: 'text-amber-500', bg: 'bg-amber-100' },
  { id: 'impulse_shopper', title: 'Impulse Buyer', description: 'Simulate the purchase of 5 items.', threshold: 5, Icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: 'retail_therapist', title: 'Retail Therapist', description: 'Reach 20 total items checked out.', threshold: 20, Icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  { id: 'guilt_free_guru', title: 'Guilt-Free Guru', description: 'Amass a total of 50 faux-purchases.', threshold: 50, Icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-100' },
  { id: 'dopamine_overload', title: 'Dopamine Overlord', description: 'An incredible 100 items purchased.', threshold: 100, Icon: Crown, color: 'text-rose-500', bg: 'bg-rose-100' },
];

export function MilestonesDrawer({
  isOpen,
  onClose,
  totalItemsPurchased
}: MilestonesDrawerProps) {
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
            id="milestones-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-slate-50 dark:bg-slate-950 shadow-2xl"
          >
            <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Shopping Milestones
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Close milestones"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Unlock badges based on your simulated purchases.</p>
            </div>

            <div className="p-6 bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
               <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">{totalItemsPurchased}</div>
               <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Items Purchased</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
               {MILESTONES.map((milestone) => {
                 const isUnlocked = totalItemsPurchased >= milestone.threshold;
                 const Icon = isUnlocked ? milestone.Icon : Lock;
                 const progress = Math.min((totalItemsPurchased / milestone.threshold) * 100, 100);

                 return (
                   <div key={milestone.id} className={`p-4 rounded-xl border ${isUnlocked ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm' : 'bg-slate-50 dark:bg-slate-950 opacity-70 border-slate-100 dark:border-slate-800'}`}>
                      <div className="flex items-start gap-4">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isUnlocked ? milestone.bg : 'bg-slate-200'}`}>
                            <Icon className={`w-6 h-6 ${isUnlocked ? milestone.color : 'text-slate-400'}`} />
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                               <h3 className={`font-bold tracking-tight ${isUnlocked ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>{milestone.title}</h3>
                               {!isUnlocked && (
                                  <span className="text-xs font-medium text-slate-400">{totalItemsPurchased} / {milestone.threshold}</span>
                               )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mb-3">
                               {milestone.description}
                            </p>
                            {!isUnlocked && (
                               <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                                 <div className="bg-slate-400 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                               </div>
                            )}
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
