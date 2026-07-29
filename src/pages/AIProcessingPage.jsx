import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2, XCircle } from 'lucide-react';

const STEPS = [
  'Analyzing study notes & subject domain...',
  'Extracting core concepts & architectural principles...',
  'Generating 3D interactive flashcards...',
  'Building scenario-based multiple-choice quiz...',
  'Finalizing executive summary & mnemonics...',
];

const STUDY_TIPS = [
  'Tip: Active recall through flashcards increases memory retention by up to 150%.',
  'Tip: Spaced repetition is most effective when testing within 24 hours of learning.',
  'Tip: Use the Spacebar or Enter key to quickly flip flashcards during study sessions.',
];

export function AIProcessingPage({ onCancel }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);

    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % STUDY_TIPS.length);
    }, 2500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const progressPercent = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 font-sans space-y-8 text-center">
      {/* Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-2xl">
          <Brain className="w-10 h-10 animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
          </span>
        </div>
      </div>

      {/* Status Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display flex items-center justify-center gap-2">
          <span>Preparing Your Study Workspace</span>
          <Sparkles className="w-5 h-5 text-indigo-400 animate-spin" />
        </h2>
        <p className="text-sm text-slate-400 font-mono">
          Estimated remaining time: ~3 seconds
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 max-w-md mx-auto">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
          <span>Progress</span>
          <span className="font-mono text-indigo-400">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-left space-y-3">
        {STEPS.map((stepText, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs font-medium transition-all ${
                isDone
                  ? 'text-emerald-400'
                  : isCurrent
                  ? 'text-slate-100 font-semibold'
                  : 'text-slate-600'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-800" />
                )}
              </div>
              <span>{stepText}</span>
            </div>
          );
        })}
      </div>

      {/* Rotating Tip */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 max-w-md mx-auto text-xs text-slate-400 italic">
        {STUDY_TIPS[tipIndex]}
      </div>

      {/* Cancel Button */}
      {onCancel && (
        <div>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition-all"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel Request</span>
          </button>
        </div>
      )}
    </div>
  );
}
