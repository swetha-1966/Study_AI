import React from 'react';

export function Avatar({ src, initials = 'VR', status = 'online', size = 'md', className = '' }) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-xs font-bold',
    lg: 'w-14 h-14 text-base font-extrabold',
  };

  return (
    <div className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg ${sizeStyles[size] || sizeStyles.md} ${className}`}>
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
      ) : (
        <span>{initials}</span>
      )}
      {status && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
            status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'
          }`}
        />
      )}
    </div>
  );
}
