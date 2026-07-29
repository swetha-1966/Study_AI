import React from 'react';
import { Navbar } from '../components/Common/Navbar';

export function AppLayout({ children, activeRoute, onNavigate, onOpenCommand, onOpenHistory }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      <Navbar
        activeRoute={activeRoute}
        onNavigate={onNavigate}
        onOpenCommandPalette={onOpenCommand}
        onOpenHistory={onOpenHistory}
      />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-slate-800/60 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} StudyForge. Built with React 19, Vite, Tailwind CSS & Framer Motion.</p>
          <span className="text-slate-400">Production Sprint 1 Foundations</span>
        </div>
      </footer>
    </div>
  );
}
