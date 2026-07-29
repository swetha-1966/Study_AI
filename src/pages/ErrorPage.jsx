import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

/**
 * ErrorPage — Full-page error display for critical failures.
 * Used by ErrorBoundary when a React tree crashes.
 *
 * @param {{ error?: Error, onReset?: Function, onNavigateHome?: Function }} props
 */
export function ErrorPage({ error, onReset, onNavigateHome }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg mx-auto"
      >
        {/* Error Icon */}
        <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display mb-3">
          Something Went Wrong
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
          StudyForge encountered an unexpected error. Your study data is safe.
        </p>

        {/* Error Details (dev only) */}
        {import.meta.env.DEV && error?.message && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/30 border border-red-500/20 text-left">
            <p className="text-xs font-mono text-red-300 break-all">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onReset && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all w-full sm:w-auto justify-center"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>
          )}

          <button
            type="button"
            onClick={() => onNavigateHome?.('landing') || window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
