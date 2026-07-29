import React from 'react';
import { BookOpen, Layers, Target, RotateCcw, Lightbulb, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'Smart Summary',
      description: 'Generate concise, well-structured multi-paragraph academic summaries.',
    },
    {
      icon: Layers,
      title: '3D Flashcards',
      description: 'Memorize concepts using 3D flip animation cards with audio reading.',
    },
    {
      icon: Target,
      title: 'Adaptive Quiz',
      description: 'Practice with scenario-based multiple choice questions & confidence selectors.',
    },
    {
      icon: RotateCcw,
      title: 'Revision Notes',
      description: 'Targeted revision queue focusing strictly on missed questions.',
    },
    {
      icon: Lightbulb,
      title: 'Memory Tricks',
      description: 'Creative mnemonics & acronym models to remember complex topics.',
    },
    {
      icon: Mic,
      title: 'Interview Questions',
      description: 'Prepare for technical engineering interviews with senior level breakdown answers.',
    },
  ];

  return (
    <section id="features" className="py-12 max-w-6xl mx-auto px-4 space-y-8 font-sans">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 font-display">
          Everything You Need to Master Any Subject
        </h2>
        <p className="text-sm text-slate-400">Six specialized study modules built for maximum memory retention.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 font-display">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
