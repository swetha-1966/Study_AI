import React from 'react';
import { OnePageNotes } from './OnePageNotes';
import { KeyTakeaways } from './KeyTakeaways';

export function RevisionSheet({ topic = 'Operating Systems' }) {
  return (
    <div className="space-y-6 font-sans">
      <OnePageNotes topic={topic} />
      <KeyTakeaways />
    </div>
  );
}
