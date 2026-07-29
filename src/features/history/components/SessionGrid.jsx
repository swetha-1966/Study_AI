import React from 'react';
import { SessionCard } from './SessionCard';

export function SessionGrid({ sessions = [], onLoadSession, onDeleteSession, onRenameSession }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400 font-sans">
        No study sessions found in your workspace history.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans">
      {sessions.map((s) => (
        <SessionCard
          key={s.id}
          session={s}
          onLoad={onLoadSession}
          onDelete={onDeleteSession}
          onRename={onRenameSession}
        />
      ))}
    </div>
  );
}
