import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 font-sans text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-3 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 font-bold text-slate-100 text-sm font-display">
            ⚡ StudyForge AI
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            AI-powered study engine converting raw lecture notes into interactive study materials.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-200">Product</h4>
          <ul className="space-y-1 text-slate-400">
            <li><a href="#features" className="hover:text-indigo-400">Features</a></li>
            <li><a href="#workflow" className="hover:text-indigo-400">How It Works</a></li>
            <li><a href="#faq" className="hover:text-indigo-400">FAQ</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-200">Resources</h4>
          <ul className="space-y-1 text-slate-400">
            <li><span>Documentation</span></li>
            <li><span>GitHub Repo</span></li>
            <li><span>API Health</span></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-200">Company</h4>
          <ul className="space-y-1 text-slate-400">
            <li><span>About</span></li>
            <li><span>Privacy Policy</span></li>
            <li><span>Terms of Service</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-slate-900 mt-8 text-center text-slate-500 text-[11px]">
        © {new Date().getFullYear()} StudyForge AI. Built with React 19, Vite, Tailwind CSS & Google Gemini.
      </div>
    </footer>
  );
}
