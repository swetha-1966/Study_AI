import React from 'react';
import { Shield, Trash2, Download, RefreshCw } from 'lucide-react';
import { useSession } from '../../../context/SessionContext';

export function PrivacySettings() {
  const { history, removeSession } = useSession();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all saved study sessions? This action cannot be undone.')) {
      history.forEach(s => removeSession(s.id));
      alert('All local study sessions cleared.');
    }
  };

  const handleExportData = () => {
    const exportPayload = {
      timestamp: new Date().toISOString(),
      savedSessionsCount: history.length,
      sessions: history,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `studyforge_export_${Date.now()}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 font-sans">
      <h3 className="text-sm font-bold text-slate-100 font-display flex items-center gap-2">
        <Shield className="w-4 h-4 text-indigo-400" />
        Data Privacy & Local Storage Controls
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-slate-200">Export All Personal Data</h4>
            <p className="text-[11px] text-slate-400">Download a full JSON backup of your study decks and session history</p>
          </div>
          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-red-400">Delete All Saved Study Sessions</h4>
            <p className="text-[11px] text-slate-400">Permanently purge all saved session history from local storage</p>
          </div>
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-semibold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
