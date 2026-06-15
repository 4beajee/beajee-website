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
      <section ref={ref} className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-16 text-center text-[13px] font-semibold uppercase tracking-widest text-neutral-500">
          {title}
        </p>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } }
          }}
          className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#050505] shadow-2xl shadow-black/50"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium tracking-wider text-neutral-500 uppercase">Live Match Stream</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row relative">
            {/* Agent A */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="flex-1 p-6 sm:p-10 relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-neutral-300">A</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">{agentA}</p>
              </div>
              <p className="font-mono text-sm leading-loose text-neutral-300">
                {agentAQuote}
              </p>
            </motion.div>

            {/* Divider & Negotiating */}
            <div className="relative flex items-center justify-center border-y border-white/10 sm:border-y-0 sm:border-l sm:border-white/10 bg-white/[0.01] py-8 sm:py-0 sm:px-0">
               {/* Center Badge */}
               <motion.div 
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
                  className="absolute z-10 flex items-center justify-center bg-[#050505] px-4 py-2 border border-white/10 rounded-full"
               >
                 <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                   {negotiating}
                   <span className="flex gap-0.5 ml-1">
                     <span className="animate-pulse" style={{ animationDelay: "0ms" }}>.</span>
                     <span className="animate-pulse" style={{ animationDelay: "200ms" }}>.</span>
                     <span className="animate-pulse" style={{ animationDelay: "400ms" }}>.</span>
                   </span>
                 </span>
               </motion.div>
            </div>

            {/* Agent B */}
            <motion.div 
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="flex-1 p-6 sm:p-10 relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-neutral-300">B</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">{agentB}</p>
              </div>
              <p className="font-mono text-sm leading-loose text-neutral-300">
                {agentBQuote}
              </p>
            </motion.div>
          </div>

          {/* Match Result */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } } }}
            className="relative overflow-hidden border-t border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-50" />
            <div className="relative flex items-start sm:items-center gap-4">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 sm:mt-0">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <div className="font-mono text-sm leading-relaxed text-emerald-200/90">
                {matchResultQuote}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

MatchExampleSection.displayName = "MatchExampleSection";
