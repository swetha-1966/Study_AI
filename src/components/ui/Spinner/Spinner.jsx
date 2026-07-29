import React from 'react';

export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-3.5 h-3.5 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`inline-block rounded-full border-slate-700 border-t-indigo-500 animate-spin ${sizes[size] || sizes.md} ${className}`}
    />
  );
}
