import React from 'react';

export function Select({ label, value, onChange, options = [], disabled = false, className = '' }) {
  return (
    <div className="space-y-1.5 w-full font-sans">
      {label && <label className="text-xs font-semibold text-slate-300 block">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 disabled:opacity-50 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
