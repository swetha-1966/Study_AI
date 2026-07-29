import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Compass } from 'lucide-react';

/**
 * NotFoundPage — 404 page shown for unknown routes.
 */
export function NotFoundPage({ onNavigateHome }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg mx-auto"
      >
        {/* 404 Display */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[160px] font-extrabold text-slate-900 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Compass className="w-12 h-12 text-indigo-400" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to studying.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => onNavigateHome?.('landing')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Go Home
          </motion.button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition-all w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
