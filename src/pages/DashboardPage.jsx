import React from 'react';
import { BookOpen, Layers, HelpCircle, Flame, Award, Clock, ArrowRight, PlusCircle, RotateCcw, BarChart2, Trash2, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from '../context/SessionContext';

export function DashboardPage({ onNavigate }) {
  const { history, userStats, loadSession, removeSession } = useSession();

  const xpProgress = Math.min(100, Math.round(((userStats.xp % 300) / 300) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-sans">
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Glow backdrop decorative gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Learning Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-display tracking-tight">
              Welcome back to StudyForge!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              Empower your study routine. You are currently maintaining a{' '}
              <span className="text-amber-400 font-bold font-mono">{userStats.streak}-day learning streak</span>.
            </p>
          </div>

          {/* XP & Level Badge Card */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 min-w-[260px] space-y-3 shadow-xl">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-indigo-400 flex items-center gap-1.5 font-display">
                <Award className="w-4 h-4 text-indigo-400" />
                Level {userStats.level} Scholar
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{userStats.xp} XP</span>
            </div>

            <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              />
            </div>
            <p className="text-[10px] text-slate-400 text-right font-mono">
              {300 - (userStats.xp % 300)} XP to Level {userStats.level + 1}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-100 font-mono block">
              {userStats.sessionsCompleted}
            </span>
            <span className="text-xs font-medium text-slate-400">Total Study Decks</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-slate-100 font-mono block">
              {userStats.cardsMastered}
            </span>
            <span className="text-xs font-medium text-slate-400">Cards Mastered</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block flex items-center gap-1">
              {userStats.quizAccuracy}%
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="text-xs font-medium text-slate-400">Quiz Accuracy</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Flame className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
              {userStats.streak} Days
            </span>
            <span className="text-xs font-medium text-slate-400">Active Streak</span>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <button
          type="button"
          onClick={() => onNavigate('create')}
          className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-left shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-between group cursor-pointer border border-indigo-500/30"
        >
          <div className="space-y-1">
            <h3 className="text-base font-bold font-display flex items-center gap-2">
              Create New Session
            </h3>
            <p className="text-xs text-indigo-100/80">Generate study decks & quizzes from text or notes</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('history')}
          className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-slate-200 text-left transition-all flex items-center justify-between group cursor-pointer shadow-lg"
        >
          <div className="space-y-1">
            <h3 className="text-base font-bold font-display text-slate-100">Saved Sessions</h3>
            <p className="text-xs text-slate-400">Access saved decks & past study history</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform text-indigo-400">
            <RotateCcw className="w-5 h-5" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('analytics')}
          className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 text-slate-200 text-left transition-all flex items-center justify-between group cursor-pointer shadow-lg"
        >
          <div className="space-y-1">
            <h3 className="text-base font-bold font-display text-slate-100">Learning Analytics</h3>
            <p className="text-xs text-slate-400">Track accuracy trends & performance</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform text-purple-400">
            <BarChart2 className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Recent Study Sessions Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 font-display">
              Recent Study Decks
            </h3>
            <p className="text-xs text-slate-400">Pick up right where you left off</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('history')}
            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-all"
          >
            View All ({history.length})
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-500 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-700 mx-auto" />
            <p>No study sessions saved yet. Click "Create New Session" to generate your first AI deck!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all group"
              >
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-200 font-display group-hover:text-indigo-300 transition-colors">
                    {session.topic}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400">
                      {session.flashcards?.length || 0} Flashcards
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-400">
                      {session.quiz?.length || 0} Questions
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      loadSession(session);
                      onNavigate('study');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                  >
                    <span>Open Deck</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSession(session.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete deck"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
