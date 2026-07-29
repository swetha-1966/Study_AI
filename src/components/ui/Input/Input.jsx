import React from 'react';

export function Input({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  icon,
  className = '',
}) {
  return (
    <div className="space-y-1.5 w-full font-sans">
      {label && <label className="text-xs font-semibold text-slate-300 block">{label}</label>}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-slate-400 w-4 h-4 flex items-center justify-center">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-slate-950 border text-slate-100 placeholder-slate-500 rounded-xl py-2.5 text-xs focus:outline-none transition-all ${
            icon ? 'pl-9 pr-3' : 'px-3'
          } ${error ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'} ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${className}`}
        />
      </div>
      {error && <span className="text-[11px] text-red-400 block font-medium">{error}</span>}
    </div>
  );
}
