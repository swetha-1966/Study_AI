import React, { useState } from 'react';
import { ArrowRight, Trash2, Edit2, Play } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { Badge } from '../../../components/ui/Badge/Badge';

export function SessionCard({ session, onLoad, onDelete, onRename }) {
  const [isFav, setIsFav] = useState(session.isFavorite || false);

  return (
    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 font-sans hover:border-indigo-500/40 transition-all flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={session.status === 'Completed' ? 'success' : 'ai'}>
            {session.status || 'In Progress'}
          </Badge>
          <FavoriteButton isFavorite={isFav} onToggle={() => setIsFav(!isFav)} />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-100 font-display">{session.topic}</h3>
          <span className="text-xs text-slate-400 font-mono">
            {session.flashcards?.length || 0} Flashcards • {session.quiz?.length || 0} Quiz Questions
          </span>
        </div>

        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[72%]" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => onLoad(session)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Continue</span>
        </button>

        <div className="flex items-center gap-1">
          {onRename && (
            <button
              type="button"
              onClick={() => onRename(session)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Rename Session"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(session.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Delete Session"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
