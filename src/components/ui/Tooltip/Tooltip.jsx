import React, { useState } from 'react';

export function Tooltip({ content, position = 'top', children }) {
  const [show, setShow] = useState(false);

  const posStyles = {
    top: '-top-8 left-1/2 -translate-x-1/2',
    bottom: '-bottom-8 left-1/2 -translate-x-1/2',
    left: 'top-1/2 -left-20 -translate-y-1/2',
    right: 'top-1/2 -right-20 -translate-y-1/2',
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && content && (
        <div className={`absolute z-50 px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] font-semibold rounded-lg whitespace-nowrap shadow-lg ${posStyles[position] || posStyles.top}`}>
          {content}
        </div>
      )}
    </div>
  );
}
