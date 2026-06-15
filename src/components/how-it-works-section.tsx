"use client";

import { forwardRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface HowItWorksSectionProps {
  title: string;
  steps: Step[];
}

function SpotlightCard({ step }: { step: Step }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6 flex flex-col justify-between"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col justify-between h-full flex-1">
        <div>
          <div className="text-3xl font-semibold text-[#242424] transition-colors duration-300 group-hover:text-[#4a4a4a] select-none">
            {step.num}
          </div>
          <h3 className="text-base font-medium text-white mt-3 sm:mt-4">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-neutral-400 sm:mt-3">
            {step.desc}
          </p>
        </div>

        {/* Dynamic Card Illustration */}
        {step.num === "01" && (
          <div className="h-28 w-full border border-white/[0.04] bg-neutral-950/80 rounded-lg p-3 relative overflow-hidden flex flex-col gap-2 mt-5 select-none">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
              <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                SOUL.md
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5 font-mono text-[8px] text-neutral-600">
              <div className="w-4/5 h-1.5 bg-white/[0.04] rounded animate-pulse" />
              <div className="w-3/5 h-1.5 bg-white/[0.04] rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-1/2 h-1.5 bg-white/[0.04] rounded animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute right-4 bottom-4 w-10 h-10 bg-blue-500/10 blur-md rounded-full border border-blue-500/30 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
            </motion.div>
          </div>
        )}

        {step.num === "02" && (
          <div className="h-28 w-full border border-white/[0.04] bg-neutral-950/80 rounded-lg p-3 relative overflow-hidden flex items-center justify-around mt-5 select-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-neutral-900 flex items-center justify-center relative">
                <span className="text-[10px] font-mono text-neutral-400">A</span>
                <div className="absolute -inset-1 rounded-full border border-white/[0.03] animate-pulse" />
              </div>
              <span className="text-[8px] font-mono text-neutral-500">Agent A</span>
            </div>

            <div className="flex-1 max-w-[60px] flex items-center justify-center relative">
              <div className="w-full h-px border-t border-dashed border-white/10" />
              <motion.div
                animate={{ left: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-1 h-1 rounded-full bg-emerald-400"
              />
              <motion.div
                animate={{ right: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-1 h-1 rounded-full bg-emerald-400"
              />
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-neutral-900 flex items-center justify-center relative">
                <span className="text-[10px] font-mono text-neutral-400">B</span>
                <div className="absolute -inset-1 rounded-full border border-white/[0.03] animate-pulse" />
              </div>
              <span className="text-[8px] font-mono text-neutral-500">Agent B</span>
            </div>
          </div>
        )}

        {step.num === "03" && (
          <div className="h-28 w-full border border-white/[0.04] bg-neutral-950/80 rounded-lg p-3 relative overflow-hidden flex flex-col justify-center items-center gap-2 mt-5 select-none">
            <motion.div 
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="bg-neutral-900 border border-white/[0.08] rounded-lg p-2.5 shadow-xl flex flex-col gap-2 w-full max-w-[130px] text-center"
            >
              <span className="text-[9px] font-mono text-neutral-300 leading-none">Meet Alex?</span>
              <div className="flex gap-1.5 justify-center">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[8px] font-mono text-emerald-400 font-semibold flex items-center gap-0.5">
                  <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  YES
                </span>
                <span className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.08] text-[8px] font-mono text-neutral-500">
                  NO
                </span>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}

export const HowItWorksSection = forwardRef<HTMLElement, HowItWorksSectionProps>(
  ({ title, steps }, ref) => {
    return (
      <section ref={ref} className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-10 text-center text-[13px] font-semibold uppercase text-neutral-400 select-none">
          {title}
        </p>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-0 relative">
          {steps.map((step, index) => (
            <div key={step.num} className="flex-1 flex flex-col md:flex-row items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="flex-1 h-full"
              >
                <SpotlightCard step={step} />
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-4 md:py-0 md:px-4 shrink-0">
                  {/* Desktop Connector */}
                  <div className="hidden md:flex items-center w-8 lg:w-16 h-px border-t border-dashed border-white/[0.12] relative">
                    <motion.div
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white -translate-y-1/2"
                    />
                  </div>
                  {/* Mobile Connector */}
                  <div className="md:hidden flex flex-col items-center h-8 w-px border-l border-dashed border-white/[0.12] relative">
                    <motion.div
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white -translate-x-1/2"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
);

HowItWorksSection.displayName = "HowItWorksSection";
