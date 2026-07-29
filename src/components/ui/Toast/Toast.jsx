import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export function Toast({ type = 'info', message }) {
  const styles = {
    success: 'bg-emerald-950 border-emerald-500/50 text-emerald-100',
    error: 'bg-red-950 border-red-500/50 text-red-100',
    warning: 'bg-amber-950 border-amber-500/50 text-amber-100',
    info: 'bg-slate-900 border-slate-700 text-slate-100',
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type] || Info;

  return (
    <div className={`p-3.5 rounded-2xl border shadow-xl flex items-center gap-3 text-xs font-semibold ${styles[type] || styles.info}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
