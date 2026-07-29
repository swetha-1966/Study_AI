import React from 'react';

export function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 font-sans"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="alphabetical">Alphabetical</option>
      <option value="most_completed">Most Completed</option>
    </select>
  );
}
