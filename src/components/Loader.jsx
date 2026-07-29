import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';

/**
 * Animated Loading Component with Skeleton Cards.
 */
export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-4xl mx-auto py-8 space-y-8"
    >
      {/* Loading Status Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Brain className="w-7 h-7 animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-100 flex items-center justify-center gap-2">
            <span>Analyzing Notes & Generating Materials</span>
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Extracting core concepts into flashcards & multiple-choice questions...
          </p>
        </div>
      </div>

      {/* Skeleton Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skeleton Flashcard */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-slate-800 rounded-md" />
            <div className="h-4 w-12 bg-slate-800 rounded-md" />
          </div>
          <div className="h-6 w-3/4 bg-slate-800 rounded-md mt-4" />
          <div className="h-4 w-5/6 bg-slate-800/60 rounded-md" />
          <div className="h-4 w-2/3 bg-slate-800/60 rounded-md" />
          <div className="pt-6 border-t border-slate-800/80 flex justify-between items-center">
            <div className="h-8 w-24 bg-slate-800 rounded-lg" />
            <div className="h-8 w-24 bg-slate-800 rounded-lg" />
          </div>
        </div>

        {/* Skeleton Quiz Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-4 w-28 bg-slate-800 rounded-md" />
            <div className="h-4 w-16 bg-slate-800 rounded-md" />
          </div>
          <div className="h-6 w-4/5 bg-slate-800 rounded-md mt-4" />
          <div className="space-y-2.5 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-full bg-slate-800/50 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
