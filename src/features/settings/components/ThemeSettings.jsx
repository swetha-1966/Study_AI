import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display">Theme Preference</h3>
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => toggleTheme('light')}
          className={`p-4 rounded-2xl border text-center font-semibold text-xs transition-all space-y-2 ${
            theme === 'light'
              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sun className="w-5 h-5 mx-auto text-amber-400" />
          <span>Light Theme</span>
        </button>

        <button
          type="button"
          onClick={() => toggleTheme('dark')}
          className={`p-4 rounded-2xl border text-center font-semibold text-xs transition-all space-y-2 ${
            theme === 'dark'
              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Moon className="w-5 h-5 mx-auto text-purple-400" />
          <span>Dark Theme</span>
        </button>

        <button
          type="button"
          onClick={() => toggleTheme('system')}
          className={`p-4 rounded-2xl border text-center font-semibold text-xs transition-all space-y-2 ${
            theme === 'system'
              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-5 h-5 mx-auto text-indigo-400" />
          <span>System Default</span>
        </button>
      </div>
    </div>
  );
}
