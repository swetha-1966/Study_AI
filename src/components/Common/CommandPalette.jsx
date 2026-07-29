import React, { useState, useEffect } from 'react';
import { Search, Command, X, BookOpen, Layers, HelpCircle, BarChart2, History, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Command Palette (Ctrl+K Modal).
 */
export function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'create', title: 'Create New Study Session', icon: BookOpen, page: 'create' },
    { id: 'dashboard', title: 'Go to Study Dashboard', icon: BarChart2, page: 'dashboard' },
    { id: 'analytics', title: 'View Learning Analytics', icon: Layers, page: 'analytics' },
    { id: 'history', title: 'Browse Session History', icon: History, page: 'history' },
    { id: 'settings', title: 'Open Settings & Preferences', icon: Settings, page: 'settings' },
  ];

  const filtered = actions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 font-sans"
        >
          {/* Search Bar Input */}
          <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-950/50">
            <Search className="w-5 h-5 text-indigo-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search page..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List */}
          <div className="p-3 max-h-80 overflow-y-auto space-y-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No matching commands found.
              </div>
            ) : (
              filtered.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => {
                      onNavigate(action.page);
                      onClose();
                    }}
                    className="w-full p-3 rounded-2xl flex items-center justify-between hover:bg-slate-800/80 text-left transition-all text-slate-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">{action.title}</span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300">
                      Jump to page →
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
