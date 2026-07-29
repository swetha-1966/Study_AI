import React from 'react';
import { Sparkles, Command, Bell, User, History, Layers, BarChart2, PlusCircle, RotateCcw, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { useSession } from '../../context/SessionContext';

export function Navbar({ activeRoute = 'dashboard', onNavigate, onOpenCommandPalette, onOpenHistory }) {
  const { isDark, toggleTheme } = useTheme();
  const { notifications } = useNotification();
  const { userStats } = useSession();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'create', label: 'Create Session', icon: PlusCircle },
    { id: 'revision', label: 'Revision', icon: RotateCcw, accent: 'text-amber-400' },
    { id: 'analytics', label: 'Analytics', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/80 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white font-black text-lg group-hover:scale-105 transition-all duration-300">
            ⚡
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-100 dark:text-slate-100 tracking-tight font-display flex items-center gap-2">
              StudyForge
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Lvl {userStats.level}
              </span>
            </h1>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-2xl shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.accent || ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition-all"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Saved History Trigger */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all hover:scale-105"
            title="Saved Decks & History"
          >
            <History className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Settings Trigger */}
          <button
            type="button"
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-xl border transition-all hover:scale-105 ${
              activeRoute === 'settings'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Settings & Personalization"
          >
            <Settings className="w-4 h-4 text-slate-300" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all hover:scale-105"
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* User Profile */}
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center font-bold text-xs hover:scale-105 transition-all ${
              activeRoute === 'profile'
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                : 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400 hover:border-indigo-400'
            }`}
            title="User Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
