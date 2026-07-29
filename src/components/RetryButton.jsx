import React from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Reusable Retry Button Component.
 *
 * @param {object} props
 * @param {function} props.onClick - Function to invoke on click.
 * @param {boolean} [props.loading] - Is retry operation currently loading.
 * @param {string} [props.className] - Additional custom CSS classes.
 */
export function RetryButton({ onClick, loading = false, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg shadow-indigo-600/30 ${className}`}
      aria-label="Retry generating study materials"
    >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? 'Retrying...' : 'Try Again'}</span>
    </motion.button>
  );
}
