import React from 'react';

export function Divider({ orientation = 'horizontal', className = '' }) {
  if (orientation === 'vertical') {
    return <div className={`w-[1px] h-full bg-slate-800/80 ${className}`} />;
  }
  return <div className={`w-full h-[1px] bg-slate-800/80 my-4 ${className}`} />;
}
