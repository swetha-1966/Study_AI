import React from 'react';
import { ArrowRight, Trash2, BookOpen } from 'lucide-react';
import { formatDate } from '../../../utils/date';

export function HistoryList({ sessions = [], onLoadSession, onDeleteSession }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400 font-sans">
        No saved study sessions match your query.
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all shadow-xl"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-100 font-display">{session.topic}</h4>
            </div>
            <span className="text-xs text-slate-400 font-mono block">
              {session.flashcards?.length || 0} Flashcards • {session.quiz?.length || 0} Quiz Questions • {formatDate(session.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onLoadSession(session)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all"
            >
              <span>Load Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onDeleteSession(session.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Delete Session"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
