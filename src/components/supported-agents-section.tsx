"use client";

import { forwardRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface Agent {
  name: string;
  description: string;
  url: string;
  logo: React.ReactNode;
}

const agents: Agent[] = [
  {
    name: "Codex",
    description: "OpenAI coding agent with native MCP support — build, debug, and deploy with AI.",
    url: "https://openai.com/codex",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        <rect x="5" y="3" width="30" height="34" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-white/30" />
        <path d="M12 14h16M12 20h12M12 26h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-white/50" />
      </svg>
    ),
  },
  {
    name: "OpenClaw",
    description: "Our own AI agent platform — OpenClaw works with Beajee out of the box, managing your networking context autonomously.",
    url: "https://openclaw.ai",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        {/* Stylized claw / lobster icon */}
        <path
          d="M20 6c-2 0-6 2-8 6s-3 8-2 12c1 4 4 8 8 10s8 2 10 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="text-white/50"
        />
        <path
          d="M14 16c2-2 5-3 6-1s0 5-2 7-5 2-6 0 0-4 2-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white/40"
        />
        <circle cx="22" cy="12" r="2" fill="currentColor" className="text-white/60" />
        <path
          d="M26 8l4-2M28 12l4 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white/30"
        />
      </svg>
    ),
  },
  {
    name: "Claude Code",
    description: "Anthropic's terminal-native coding agent — full MCP support for autonomous software development.",
    url: "https://claude.ai/code",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        {/* Terminal icon */}
        <rect x="5" y="8" width="30" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" className="text-white/30" />
        <path d="M12 16l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50" />
        <path d="M20 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-white/40" />
      </svg>
    ),
  },
  {
    name: "Cursor",
    description: "AI-native IDE with deep MCP integration — code generation, refactoring, and agentic workflows.",
    url: "https://cursor.com",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        {/* Cursor arrow icon */}
        <path
          d="M10 8l20 12-9 3-3 9L10 8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="text-white/50"
        />
        <path
          d="M21 20l6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white/30"
        />
      </svg>
    ),
  },
  {
    name: "Cline",
    description: "Open-source VS Code and JetBrains extension with full MCP support — autonomous coding in your editor.",
    url: "https://github.com/nicepkg/cline",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        {/* Wrench / tool icon */}
        <path
          d="M12 30l-4-4c-2-2-2-5 0-7l6 6 4-4-6-6c2-2 5-2 7 0l8 8c1 1 1 3 0 4l-6 6c-1 1-3 1-4 0l-4-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="text-white/50"
        />
        <circle cx="27" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" className="text-white/30" />
      </svg>
    ),
  },
  {
    name: "OpenCode",
    description: "Open-source coding agent with 172k stars — MCP-native, extensible, and built for agentic workflows.",
    url: "https://github.com/sst/opencode",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-10 w-10">
        {/* Code brackets icon */}
        <path
          d="M14 10l-8 10 8 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50"
        />
        <path
          d="M26 10l8 10-8 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50"
        />
        <path
          d="M21 8l-4 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white/30"
        />
      </svg>
    ),
  },
];

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <a
        href={agent.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <div
          onMouseMove={handleMouseMove}
          className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-white/[0.14]"
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
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3">
              <div className="shrink-0">{agent.logo}</div>
              <h3 className="text-base font-medium text-white">{agent.name}</h3>
            </div>
            <p className="mt-3 flex-1 text-sm leading-6 text-neutral-400">
              {agent.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-neutral-500 transition-colors group-hover:text-neutral-300">
              <span>Visit site</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M3.5 8h8m0 0-3-3m3 3-3 3"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export const SupportedAgentsSection = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section
      ref={ref}
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
    >
      <p className="mb-2 text-center text-[13px] font-semibold uppercase text-neutral-400">
        Supported Agents
      </p>
      <p className="mb-10 text-center text-sm text-neutral-500">
        AI agents compatible with Beajee — MCP-native tools that work with your personal agent.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {agents.map((agent, index) => (
          <AgentCard key={agent.name} agent={agent} index={index} />
        ))}
      </div>
    </section>
  );
});

SupportedAgentsSection.displayName = "SupportedAgentsSection";
