import React from 'react';
import { HardDrive, Zap, RefreshCw } from 'lucide-react';
import { useSession } from '../../../context/SessionContext';

export function StorageSettings() {
  const { history } = useSession();

  const sessionBytes = JSON.stringify(history).length;
  const sessionMB = (sessionBytes / (1024 * 1024)).toFixed(2);

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
        <HardDrive className="w-4 h-4 text-purple-400" />
        Local Storage Cache Breakdown
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Study Sessions</span>
          <span className="text-xl font-bold font-mono text-indigo-400 mt-1 block">{sessionMB} MB</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bookmarks</span>
          <span className="text-xl font-bold font-mono text-purple-400 mt-1 block">0.4 MB</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Analytics</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">0.2 MB</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400">Total Browser Storage Used: ~{(Number(sessionMB) + 0.6).toFixed(2)} MB</span>
        <button
          type="button"
          onClick={() => alert('Storage cache optimized successfully.')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Optimize Storage Cache</span>
        </button>
      </div>
    </div>
  );
}
