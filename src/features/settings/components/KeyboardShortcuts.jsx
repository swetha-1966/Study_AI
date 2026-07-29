import React from 'react';
import { Command, Download } from 'lucide-react';

export function KeyboardShortcuts() {
  const shortcuts = [
    { key: 'Space / Enter', action: 'Flip active 3D flashcard between Question and Answer' },
    { key: '→ (Right Arrow)', action: 'Navigate to next flashcard or quiz question' },
    { key: '← (Left Arrow)', action: 'Navigate to previous flashcard or quiz question' },
    { key: 'Ctrl + K / Cmd + K', action: 'Open global search and Command Palette modal' },
    { key: 'Ctrl + Enter', action: 'Submit study notes form to generate deck' },
    { key: 'Esc', action: 'Close open modal, drawer, or command palette' },
  ];

  const handlePrintShortcuts = () => {
    window.print();
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 font-sans">
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Command className="w-4 h-4 text-indigo-400" />
          Global Keyboard Hotkeys Reference
        </h3>

        <button
          type="button"
          onClick={handlePrintShortcuts}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Print Reference</span>
        </button>
      </div>

      <div className="space-y-2">
        {shortcuts.map((sc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-300 font-medium">{sc.action}</span>
            <kbd className="px-2.5 py-1 rounded-lg bg-slate-800 text-indigo-300 border border-slate-700 font-mono text-xs shadow-inner">
              {sc.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
