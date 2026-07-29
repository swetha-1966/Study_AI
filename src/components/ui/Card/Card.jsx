import React from 'react';

export function Card({
  variant = 'default', // 'default' | 'glass' | 'interactive' | 'analytics' | 'premium'
  header,
  footer,
  children,
  className = '',
  onClick,
}) {
  const variantStyles = {
    default: 'bg-slate-900 border border-slate-800 shadow-xl',
    glass: 'bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl',
    interactive: 'bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer hover:shadow-indigo-500/10 transition-all duration-200',
    analytics: 'bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 shadow-xl',
    premium: 'bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/30 shadow-2xl shadow-indigo-500/10',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-6 ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {header && <div className="border-b border-slate-800/80 pb-4 mb-4 font-bold text-slate-100">{header}</div>}
      <div className="space-y-4">{children}</div>
      {footer && <div className="border-t border-slate-800/80 pt-4 mt-4 text-xs text-slate-400">{footer}</div>}
    </div>
  );
}
