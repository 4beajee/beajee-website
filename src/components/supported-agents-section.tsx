"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const agents = [
  {
    name: "Codex",
    description: "OpenAI's coding agent with native MCP support. Full code generation, debugging, and project-wide refactoring.",
    url: "https://openai.com/codex",
    logo: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Codex icon — minimalist open book with code brackets */}
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M16 20l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M32 20l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="24" y1="18" x2="22" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "OpenClaw",
    description: "Autonomous AI agent with persistent memory, multi-platform gateway, and an ecosystem of configurable skills.",
    url: "https://openclaw.ai",
    logo: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* OpenClaw icon — minimalist claw/pincer shape */}
        <path d="M10 18c0 0 6-4 14-2s14 6 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M10 30c0 0 6 4 14 2s14-6 14-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M12 24h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M42 24h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Hermes",
    description: "Self-improving open-source AI agent from Nous Research with persistent memory, automated skill creation, and multi-platform reach.",
    url: "https://hermes-agent.nousresearch.com",
    logo: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Hermes icon — minimalist caduceus/winged messenger symbol */}
        <path d="M24 8v32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 16c0 0 8-4 8-4s8 4 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M16 32c0 0 8 4 8 4s8-4 8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M8 16c4-2 12 0 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M8 32c4 2 12 0 16-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M40 16c-4-2-12 0-16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M40 32c-4 2-12 0-16-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="24" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
];

function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  return (
    <motion.a
      href={agent.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="group relative flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      {/* Spotlight effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/70 transition-colors duration-300 group-hover:border-white/[0.15] group-hover:text-white">
        {agent.logo}
      </div>

      <div className="relative">
        <h3 className="text-base font-medium text-white">{agent.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/50">{agent.description}</p>
      </div>
    </motion.a>
  );
}

export function SupportedAgentsSection() {
  const t = useTranslations("landing");

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {t("supportedAgents.title", { fallback: "Supported Agents" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/40">
            {t("supportedAgents.subtitle", {
              fallback: "Beajee integrates with leading AI agents via MCP protocol.",
            })}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
