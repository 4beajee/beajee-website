"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface HowItWorksSectionProps {
  title: string;
  steps: Step[];
}

export const HowItWorksSection = forwardRef<HTMLElement, HowItWorksSectionProps>(
  ({ title, steps }, ref) => {
    return (
      <section ref={ref} className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-16 text-center text-[13px] font-semibold uppercase tracking-widest text-neutral-500">
          {title}
        </p>

        <div className="relative mx-auto max-w-2xl">
          {/* Vertical subtle track line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.05] sm:left-10" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.6, ease: "easeOut" } 
                  }
                }}
                className="relative flex items-start gap-8 sm:gap-12 group"
              >
                {/* Glowing thread section connecting to the next node (except for last) */}
                {index !== steps.length - 1 && (
                  <motion.div 
                    variants={{
                      hidden: { scaleY: 0 },
                      visible: { scaleY: 1, transition: { duration: 0.8, delay: 0.2, ease: "circOut" } }
                    }}
                    className="absolute left-6 top-10 bottom-[-3rem] sm:bottom-[-4rem] w-px bg-gradient-to-b from-white/30 to-transparent origin-top sm:left-10"
                  />
                )}

                {/* Node */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] shadow-[0_0_15px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.03] sm:h-20 sm:w-20">
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.5 } }
                    }}
                    className="absolute inset-0 rounded-full bg-white/[0.04] blur-md transition-opacity duration-500 group-hover:opacity-100" 
                  />
                  <span className="relative z-10 text-xs font-medium text-neutral-400 transition-colors duration-500 group-hover:text-white sm:text-base font-mono">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col pt-1 sm:pt-4">
                  <h3 className="text-lg font-medium text-neutral-200 transition-colors duration-500 group-hover:text-white sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400 transition-colors duration-500 group-hover:text-neutral-300 sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

HowItWorksSection.displayName = "HowItWorksSection";
