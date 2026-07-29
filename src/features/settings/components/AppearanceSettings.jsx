import React from 'react';
import { Sun, Moon, Monitor, Type, Maximize2, Sparkles } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export function AppearanceSettings({ settings, updateSettings }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Theme Options */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Sun className="w-4 h-4 text-indigo-400" />
          Color Theme
        </h3>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              updateSettings({ theme: 'dark' });
            }}
            className={`p-4 rounded-2xl border text-center font-medium text-xs flex flex-col items-center gap-2 transition-all ${
              theme === 'dark'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span>Dark Theme</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('light');
              updateSettings({ theme: 'light' });
            }}
            className={`p-4 rounded-2xl border text-center font-medium text-xs flex flex-col items-center gap-2 transition-all ${
              theme === 'light'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span>Light Theme</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              updateSettings({ theme: 'system' });
            }}
            className={`p-4 rounded-2xl border text-center font-medium text-xs flex flex-col items-center gap-2 transition-all ${
              settings.theme === 'system'
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-5 h-5" />
            <span>System Default</span>
          </button>
        </div>
      </div>

      {/* Font Size & Reading Width */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Type className="w-4 h-4 text-purple-400" />
          Typography & Layout Reading Width
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Font Size</label>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Small">Small (14px)</option>
              <option value="Medium">Medium Standard (16px)</option>
              <option value="Large">Large (18px)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Reading Container Width</label>
            <select
              value={settings.readingWidth}
              onChange={(e) => updateSettings({ readingWidth: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Narrow">Narrow (600px)</option>
              <option value="Medium">Medium Standard (800px)</option>
              <option value="Wide">Wide (1024px)</option>
            </select>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Live Typography Preview</span>
          <p className={`text-slate-200 font-sans ${settings.fontSize === 'Small' ? 'text-xs' : settings.fontSize === 'Large' ? 'text-lg' : 'text-sm'}`}>
            Operating Systems Scheduling regulates CPU time allocation across processes to maximize fairness and system throughput.
          </p>
        </div>
      </div>

      {/* 3D Animations & Reduce Motion */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Animations & Motion Effects
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-slate-200">Enable 3D Framer Motion Animations</h4>
            <p className="text-[11px] text-slate-400">Smooth 3D card flips, hover micro-interactions, and route transitions</p>
          </div>
          <button
            type="button"
            onClick={() => updateSettings({ animations: !settings.animations })}
            className={`w-11 h-6 rounded-full transition-colors p-1 ${
              settings.animations ? 'bg-indigo-600' : 'bg-slate-800'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              settings.animations ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}
