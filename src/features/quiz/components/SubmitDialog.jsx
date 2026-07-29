import React from 'react';
import { Modal } from '../../../components/ui/Modal/Modal';
import { Button } from '../../../components/ui/Button/Button';

export function SubmitDialog({ isOpen, onClose, onSubmit, answeredCount, totalCount }) {
  const remaining = totalCount - answeredCount;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Quiz Assessment?"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Continue Quiz
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Submit Now
          </Button>
        </div>
      }
    >
      <div className="space-y-3 font-sans text-xs text-slate-300">
        <p>Are you sure you want to finish and submit your quiz answers?</p>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div>Answered Questions: <span className="font-bold text-emerald-400 font-mono">{answeredCount}</span></div>
          <div>Remaining Questions: <span className="font-bold text-amber-400 font-mono">{remaining}</span></div>
        </div>
      </div>
    </Modal>
  );
}
