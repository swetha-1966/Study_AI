import React, { useState } from 'react';
import { Sparkles, Command, Bell, User, History, Layers, BarChart2, BookOpen, PlusCircle, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { useSession } from '../../context/SessionContext';

/**
 * Navbar Component with Brand Logo, Navigation Links, Search trigger, Command Palette trigger, Notifications, Theme toggle.
 */
export function Navbar({ activeRoute = 'dashboard', onNavigate, onOpenCommandPalette, onOpenHistory }) {
  const { isDark, toggleTheme } = useTheme();
  const { notifications } = useNotification();
  const { userStats } = useSession();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-100 dark:text-slate-100 tracking-tight font-display flex items-center gap-2">
              StudyForge
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Lvl {userStats.level}
              </span>
            </h1>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-slate-800/80 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('create')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'create'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Session</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('revision')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'revision'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Revision</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('analytics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Ctrl+K</kbd>
          </button>

          {/* Saved History Trigger */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
            title="Saved Sessions"
          >
            <History className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* User Profile */}
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="w-9 h-9 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs hover:scale-105 transition-transform"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
