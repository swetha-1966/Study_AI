import React from 'react';
import { Navbar } from '../components/Common/Navbar';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export function AppLayout({ children, activeRoute, onNavigate, onOpenCommand, onOpenHistory }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-80 h-80 bg-pink-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Floating Glass Navbar */}
      <Navbar
        activeRoute={activeRoute}
        onNavigate={onNavigate}
        onOpenCommandPalette={onOpenCommand}
        onOpenHistory={onOpenHistory}
      />

      {/* Primary Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
              ⚡
            </div>
            <div>
              <p className="font-bold text-slate-300 font-display">StudyForge AI Engine</p>
              <p>© {new Date().getFullYear()} StudyForge. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI System Operational
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              v2.5 Enterprise
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
