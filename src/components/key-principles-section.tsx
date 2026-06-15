"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useState } from "react";

export interface Principle {
  title: string;
  desc: string;
}

export interface KeyPrinciplesSectionProps {
  title: string;
  principles: Principle[];
}

function getPrincipleIcon(index: number, isActive: boolean) {
  const colorClasses = [
    isActive ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" : "text-neutral-500 group-hover:text-neutral-400",
    isActive ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "text-neutral-500 group-hover:text-neutral-400",
    isActive ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]" : "text-neutral-500 group-hover:text-neutral-400",
    isActive ? "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "text-neutral-500 group-hover:text-neutral-400",
  ];

  const classString = `w-5 h-5 transition-all duration-300 ${colorClasses[index] || ""}`;

  switch (index) {
    case 0: // Quality > Volume
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classString}>
          <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      );
    case 1: // Mutual Match
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classString}>
          <circle cx="9" cy="12" r="6" strokeDasharray="2 2" />
          <circle cx="15" cy="12" r="6" />
          <path d="M12 8v8" strokeWidth="1.5" />
        </svg>
      );
    case 2: // Context-Driven
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classString}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" strokeWidth="1.5" />
          <line x1="16" y1="17" x2="8" y2="17" strokeWidth="1.5" />
          <line x1="10" y1="9" x2="8" y2="9" strokeWidth="1.5" />
        </svg>
      );
    case 3: // Privacy-First
      default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={classString}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
          <path d="M12 14v4" />
        </svg>
      );
  }
}

export const KeyPrinciplesSection = forwardRef<HTMLElement, KeyPrinciplesSectionProps>(
  ({ title, principles }, ref) => {
    const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <p className="mb-10 text-center text-[13px] font-semibold uppercase text-neutral-400 select-none">
          {title}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
          {principles.map((principle, index) => {
            const isActive = activePrinciple === index;

            return (
              <motion.button
                key={principle.title}
                type="button"
                layout
                onClick={() => setActivePrinciple((current) => (current === index ? null : index))}
                aria-expanded={isActive}
                className={`group h-full rounded-xl border p-5 text-left transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-1 sm:p-6 relative overflow-hidden ${
                  isActive 
                    ? "border-white/15 bg-white/[0.03] shadow-[0_0_30px_rgba(255,255,255,0.04)]" 
                    : "border-white/[0.08] bg-[#0a0a0a] hover:border-white/[0.14]"
                }`}
              >
                {/* Active Top Gradient Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${
                      index === 0 ? "from-transparent via-amber-500/80 to-transparent" :
                      index === 1 ? "from-transparent via-emerald-500/80 to-transparent" :
                      index === 2 ? "from-transparent via-blue-500/80 to-transparent" :
                      "from-transparent via-rose-500/80 to-transparent"
                    }`}
                  />
                )}

                <div className="flex items-start justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Visual Icon */}
                    {getPrincipleIcon(index, isActive)}
                    
                    <h3 className={`text-base font-semibold leading-snug sm:text-lg transition-colors duration-300 ${
                      isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                    }`}>
                      {principle.title}
                    </h3>
                  </div>
                  <span
                    className={`mt-0.5 text-xs font-mono transition-transform duration-300 ${
                      isActive ? "rotate-45 text-white/80" : "text-neutral-500 group-hover:text-neutral-400"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 14 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden relative z-10 pl-8"
                    >
                      <p className="text-sm text-neutral-400 leading-relaxed">{principle.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.section>
    );
  }
);

KeyPrinciplesSection.displayName = "KeyPrinciplesSection";
