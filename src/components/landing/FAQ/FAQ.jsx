import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: 'What AI model powers StudyForge?', a: 'StudyForge uses Google Gemini 2.5 Flash as its primary AI engine, with a resilient dynamic topic fallback engine.' },
    { q: 'Can I save and reload my study sessions?', a: 'Yes! All created study decks are automatically saved to browser LocalStorage and accessible via the Saved Sessions history drawer.' },
    { q: 'Can I export study sessions as printable PDF or JSON?', a: 'Yes! You can export any generated deck into printable PDF HTML or formatted JSON with one click.' },
    { q: 'Is StudyForge fully responsive on mobile devices?', a: 'Yes! The interface adapts seamlessly across mobile, tablet, and desktop viewports.' },
    { q: 'Where is my study data stored?', a: 'Your data remains completely private and stored locally in your browser session storage.' },
  ];

  return (
    <section id="faq" className="py-12 max-w-4xl mx-auto px-4 space-y-8 font-sans">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-100 font-display">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-400">Everything you need to know about StudyForge AI.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left font-semibold text-xs sm:text-sm text-slate-100 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
