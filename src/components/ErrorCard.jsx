import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { RetryButton } from './RetryButton';

/**
 * Beautiful Error Card Component with Retry functionality.
 *
 * @param {object} props
 * @param {string} props.message - Descriptive error message.
 * @param {function} props.onRetry - Function called when user clicks Retry.
 * @param {boolean} [props.loading] - Retry loading state.
 */
export function ErrorCard({ message, onRetry, loading = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-red-500/30 shadow-2xl backdrop-blur-xl"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        {/* Error Icon */}
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-7 h-7" />
        </div>

        {/* Details & Action */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-red-400 font-display">
              Generation Failed
            </h3>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              {message || 'An unexpected error occurred while processing your study notes.'}
            </p>
          </div>

          <p className="text-xs text-slate-400">
            Please verify your input notes or check your network connection and try again.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {onRetry && <RetryButton onClick={onRetry} loading={loading} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
