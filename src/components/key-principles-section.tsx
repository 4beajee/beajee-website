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

export const KeyPrinciplesSection = forwardRef<HTMLElement, KeyPrinciplesSectionProps>(
  ({ title, principles }, ref) => {
    // Default to first principle active
    const [activeIdx, setActiveIdx] = useState<number>(0);

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <p className="mb-16 text-center text-[13px] font-semibold uppercase tracking-widest text-neutral-500">
          {title}
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Tabs (Left column) */}
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/3 overflow-x-auto pb-4 md:pb-0 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {principles.map((principle, index) => {
              const isActive = activeIdx === index;
              return (
                <button
                  key={principle.title}
                  onClick={() => setActiveIdx(index)}
                  className={`relative shrink-0 snap-start px-5 py-4 text-left transition-all duration-300 rounded-xl md:rounded-r-none md:rounded-l-2xl overflow-hidden ${
                    isActive 
                      ? "bg-white/[0.04] text-white" 
                      : "text-neutral-500 hover:bg-white/[0.02] hover:text-neutral-300"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/80 to-white/20 hidden md:block"
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicatorMobile"
                      className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-white/80 to-white/20 md:hidden"
                    />
                  )}
                  <span className="font-medium text-sm md:text-base whitespace-nowrap md:whitespace-normal">
                    {principle.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content (Right column) */}
          <div className="w-full md:w-2/3 min-h-[250px] relative mt-2 md:mt-0 p-6 sm:p-10 rounded-2xl border border-white/10 bg-[#050505] shadow-[0_0_40px_rgba(255,255,255,0.02)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col h-full justify-center"
              >
                <div className="mb-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-400 font-mono text-sm sm:text-lg">
                  {activeIdx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                  {principles[activeIdx].title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-neutral-400">
                  {principles[activeIdx].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    );
  }
);

KeyPrinciplesSection.displayName = "KeyPrinciplesSection";
