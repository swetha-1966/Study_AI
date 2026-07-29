import React from 'react';
import { BookOpen, Layers, HelpCircle, Flame, Award, Clock, ArrowRight, PlusCircle, RotateCcw, BarChart2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from '../context/SessionContext';

/**
 * Enterprise Dashboard Page Component.
 */
export function DashboardPage({ onNavigate }) {
  const { history, userStats, loadSession, removeSession } = useSession();

  const xpProgress = Math.min(100, Math.round(((userStats.xp % 300) / 300) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-sans">
      {/* Top Greeting & Level Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">👋</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
              Welcome back, Avinash!
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Ready to continue your learning streak? You're on a <span className="text-amber-400 font-bold">{userStats.streak}-day streak</span>!
          </p>
        </div>

        {/* Level & XP Badge */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 min-w-[240px] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-indigo-400 flex items-center gap-1">
              <Award className="w-4 h-4" />
              Level {userStats.level} Scholar
            </span>
            <span className="text-slate-400 font-mono">{userStats.xp} XP</span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics StatCards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Study Sessions</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-2xl font-black text-slate-100 font-mono block">
            {userStats.sessionsCompleted}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Cards Mastered</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-slate-100 font-mono block">
            {userStats.cardsMastered}
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg Quiz Score</span>
            <HelpCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 font-mono block">
            {userStats.quizAccuracy}%
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 font-mono block">
            {userStats.streak} Days
          </span>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('create')}
          className="p-5 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-left shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold font-display">Create New Session</h3>
            <p className="text-xs text-indigo-100/80 mt-0.5">Generate study material from notes</p>
          </div>
          <PlusCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('history')}
          className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-left transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold font-display">Saved Sessions</h3>
            <p className="text-xs text-slate-400 mt-0.5">Browse history & saved decks</p>
          </div>
          <RotateCcw className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('analytics')}
          className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-left transition-all flex items-center justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold font-display">Learning Analytics</h3>
            <p className="text-xs text-slate-400 mt-0.5">View study heatmaps & trends</p>
          </div>
          <BarChart2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Recent Sessions Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-base font-bold text-slate-100 font-display">
            Recent Study Sessions
          </h3>
          <button
            type="button"
            onClick={() => onNavigate('history')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            View All ({history.length})
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500">
            No recent sessions yet. Click "Create New Session" to get started!
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                    {session.topic}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {session.flashcards?.length || 0} Cards • {session.quiz?.length || 0} Quiz Questions
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      loadSession(session);
                      onNavigate('study');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSession(session.id)}
                    className="p-1.5 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
