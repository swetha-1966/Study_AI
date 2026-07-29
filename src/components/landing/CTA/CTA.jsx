import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTA({ onStart }) {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4 font-sans">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white text-center space-y-6 shadow-2xl shadow-indigo-500/20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ready to Study Smarter?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
          Transform Your Notes into Study Material Today
        </h2>

        <p className="text-sm text-indigo-100/90 max-w-xl mx-auto leading-relaxed">
          Create personalized summaries, flashcards, and scenario quizzes in seconds.
        </p>

        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm bg-slate-950 text-white hover:bg-slate-900 shadow-xl transition-all"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
