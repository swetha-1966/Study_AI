import React from 'react';
import { Sparkles, ArrowRight, Play, BookOpen, Layers, HelpCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero({ onStart, onDemo }) {
  return (
    <section className="relative pt-12 pb-20 px-4 max-w-6xl mx-auto text-center space-y-8 font-sans overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold shadow-lg shadow-indigo-500/10"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Powered by Google Gemini 2.5 AI Engine</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-100 dark:text-slate-100 tracking-tight font-display leading-[1.1]"
      >
        Transform Any Topic Into <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Interactive Learning
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
      >
        Generate personalized summaries, 3D flashcards, adaptive quizzes, revision notes, memory tricks, and interview questions in seconds.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 pt-2"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 transition-all focus:outline-none"
        >
          <span>Start Learning Free</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <button
          type="button"
          onClick={onDemo}
          className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
        >
          <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          <span>Watch Sample Demo</span>
        </button>
      </motion.div>

      {/* Hero Interactive Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-8 max-w-4xl mx-auto"
      >
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-500 ml-2">studyforge-workspace.app</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
              Live Demo Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">1. Executive Summary</span>
              <p className="text-xs text-slate-300">Multi-paragraph deep topic overview & principles.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">2. 3D Flashcards</span>
              <p className="text-xs text-slate-300">Flip card, audio reader & bookmarks.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">3. Scenario Quiz</span>
              <p className="text-xs text-slate-300">Multiple choice & confidence selector.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
