import React, { useState } from 'react';
import { HistoryFilter } from './HistoryFilter';
import { HistoryList } from './HistoryList';
import { X, History as HistoryIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HistoryView({ isOpen, onClose, history = [], onLoadSession, onDeleteSession }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');

  if (!isOpen) return null;

  let filtered = history.filter((s) => s.topic.toLowerCase().includes(query.toLowerCase()));

  if (sort === 'oldest') {
    filtered = [...filtered].reverse();
  } else if (sort === 'alphabetical') {
    filtered = [...filtered].sort((a, b) => a.topic.localeCompare(b.topic));
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm font-sans">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full p-6 space-y-6 overflow-y-auto z-10 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <HistoryIcon className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-100 font-display">Saved Study Sessions</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <HistoryFilter
            query={query}
            onChangeQuery={setQuery}
            sort={sort}
            onChangeSort={setSort}
          />

          <HistoryList
            sessions={filtered}
            onLoadSession={(session) => {
              onLoadSession(session);
              onClose();
            }}
            onDeleteSession={onDeleteSession}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
