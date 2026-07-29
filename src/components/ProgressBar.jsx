import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Progress Bar Component.
 *
 * @param {object} props
 * @param {number} props.current - Current step (1-indexed or 0-indexed count).
 * @param {number} props.total - Total steps count.
 * @param {string} [props.className] - Container CSS class overrides.
 */
export function ProgressBar({ current, total, className = '' }) {
  const percentage = total > 0 ? Math.min(100, Math.max(0, Math.round((current / total) * 100))) : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
