"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface MatchExampleSectionProps {
  title: string;
  agentA: string;
  agentAQuote: string;
  negotiating: string;
  agentB: string;
  agentBQuote: string;
  matchResultQuote: string;
}

export const MatchExampleSection = forwardRef<HTMLElement, MatchExampleSectionProps>(
  ({
    title,
    agentA,
    agentAQuote,
    negotiating,
    agentB,
    agentBQuote,
    matchResultQuote,
  }, ref) => {
    return (
      <section ref={ref} className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-10 text-center text-[13px] font-semibold uppercase text-neutral-400 select-none">
          {title}
        </p>

        {/* Outer container */}
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0 relative">
          
          {/* Agent A Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white relative">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.938 12.835c.127-.039.285.02.373.143.028.038.036.092.046.14.003.014-.02.033-.04.05-.124-.098-.24-.194-.354-.291-.011-.01-.016-.027-.025-.042zM8.396 9.412c.195-.032.39-.06.588-.05a.54.54 0 01.148.026c.202.071.402.147.601.224.028.01.05.036.075.055l-.013.027a9.203 9.203 0 01-.26-.089c-.115-.038-.213-.077-.315-.098-.25-.05-.25-.046-.292-.014l.574.144c.275.139.55.276.823.417.042.022.09.057.107.098.026.06.063.076.117.072.066-.006.132-.017.213-.027l-.04.086c.051.08.142.02.216.064-.074.13-.247.09-.334.199l.061.074-.12.087c0 .106-.038.168-.306.243l.026.085-.196.042.07.124h-.25l-.007.137c-.081-.01-.161-.018-.244-.027l-.053.123c-.027-.008-.052-.011-.073-.023-.067-.038-.128-.056-.195.006-.019.017-.063.014-.093.008-.026-.006-.05-.029-.07-.042-.11.095-.11.095-.208.00" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-neutral-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wider">{agentA}</span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Active</span>
              </div>
            </div>

            {/* Context quote box */}
            <div className="relative rounded-lg border border-white/[0.04] bg-neutral-950/80 p-3.5 flex-1 min-h-[90px]">
              <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-wider block mb-2">Target Context</span>
              <p className="font-mono text-xs text-neutral-300 leading-relaxed italic">
                &ldquo;{agentAQuote.replace(/[“”"]/g, '')}&rdquo;
              </p>
              <div className="absolute right-3 bottom-3 w-1.5 h-1.5 rounded-full bg-indigo-500/30 blur-[1px]" />
            </div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          </motion.div>

          {/* Negotiating bridge */}
          <div className="flex-shrink-0 flex flex-col md:flex-row items-center justify-center md:w-32 lg:w-40 opacity-80 z-10">
            {/* Mobile connector */}
            <div className="md:hidden flex flex-col items-center gap-1.5 py-4 w-full">
              <div className="w-px h-6 border-l border-dashed border-white/10" />
              <div className="px-3 py-1 rounded-full border border-white/[0.06] bg-neutral-950 font-mono text-[9px] text-neutral-400 tracking-wider flex items-center gap-1.5 shadow-xl">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                {negotiating}
              </div>
              <div className="w-px h-6 border-l border-dashed border-white/10" />
            </div>

            {/* Desktop connector */}
            <div className="hidden md:flex items-center w-full relative">
              <div className="flex-1 border-t border-dashed border-white/10" />
              <div className="px-3 py-1 rounded-full border border-white/[0.06] bg-neutral-950 font-mono text-[9px] text-neutral-400 tracking-wider flex items-center gap-1.5 shrink-0 mx-2 shadow-xl z-20">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                {negotiating}
              </div>
              <div className="flex-1 border-t border-dashed border-white/10" />
              {/* Flowing dots in background line */}
              <motion.div
                animate={{ left: ["10%", "90%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute w-1 h-1 rounded-full bg-white/20 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Agent B Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex-1 rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-600 to-orange-600 flex items-center justify-center text-[10px] font-bold text-white relative">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.938 12.835c.127-.039.285.02.373.143.028.038.036.092.046.14.003.014-.02.033-.04.05-.124-.098-.24-.194-.354-.291-.011-.01-.016-.027-.025-.042zM8.396 9.412c.195-.032.39-.06.588-.05a.54.54 0 01.148.026c.202.071.402.147.601.224.028.01.05.036.075.055l-.013.027a9.203 9.203 0 01-.26-.089c-.115-.038-.213-.077-.315-.098-.25-.05-.25-.046-.292-.014l.574.144c.275.139.55.276.823.417.042.022.09.057.107.098.026.06.063.076.117.072.066-.006.132-.017.213-.027l-.04.086c.051.08.142.02.216.064-.074.13-.247.09-.334.199l.061.074-.12.087c0 .106-.038.168-.306.243l.026.085-.196.042.07.124h-.25l-.007.137c-.081-.01-.161-.018-.244-.027l-.053.123c-.027-.008-.052-.011-.073-.023-.067-.038-.128-.056-.195.006-.019.017-.063.014-.093.008-.026-.006-.05-.029-.07-.042-.11.095-.11.095-.208.00" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-neutral-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-wider">{agentB}</span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Active</span>
              </div>
            </div>

            {/* Context quote box */}
            <div className="relative rounded-lg border border-white/[0.04] bg-neutral-950/80 p-3.5 flex-1 min-h-[90px]">
              <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-wider block mb-2">Target Context</span>
              <p className="font-mono text-xs text-neutral-300 leading-relaxed italic">
                &ldquo;{agentBQuote.replace(/[“”"]/g, '')}&rdquo;
              </p>
              <div className="absolute right-3 bottom-3 w-1.5 h-1.5 rounded-full bg-pink-500/30 blur-[1px]" />
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          </motion.div>

        </div>

        {/* Match outcome success box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.01] p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden shadow-[0_0_24px_rgba(16,185,129,0.02)]"
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between gap-4 z-10">
            <span className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm select-none">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              98% Match Score
            </span>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider select-none">
              Hermes Recommendation
            </span>
          </div>

          {/* Outcome text */}
          <p className="font-mono text-sm leading-6 text-neutral-200 z-10 pl-2 border-l-2 border-emerald-500/50">
            {matchResultQuote}
          </p>

          {/* Background decor */}
          <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-emerald-500/[0.02] blur-xl rounded-full pointer-events-none" />
        </motion.div>

      </section>
    );
  }
);

MatchExampleSection.displayName = "MatchExampleSection";
