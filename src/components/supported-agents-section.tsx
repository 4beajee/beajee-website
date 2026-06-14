"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const agents = [
  {
    name: "Codex",
    description: "OpenAI\u2019s agent for code.",
    url: "https://openai.com/codex",
    logo: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M16 22l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M32 22l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="24" y1="20" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "OpenClaw",
    description: "Your open-source personal AI.",
    url: "https://openclaw.ai",
    logo: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <path d="M12 20c0 0 6-6 14-4s12 6 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M12 28c0 0 6 6 14 4s12-6 12-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M8 24H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 24H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    name: "Hermes",
    description: "Self-improving open-source agent by Nous Research.",
    url: "https://hermes-agent.nousresearch.com",
    logo: (
      <img
        src="/images/agents/hermes.png"
        alt="Hermes"
        className="h-10 w-10 object-contain"
      />
    ),
  },
];

function AgentCard({ agent, index }: { agent: (typeof agents)[0]; index: number }) {
  return (
    <motion.a
      href={agent.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center text-white/60 transition-colors duration-200 group-hover:text-white/80">
        {agent.logo}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-white">{agent.name}</h3>
        <p className="mt-0.5 text-sm text-white/40">{agent.description}</p>
      </div>
    </motion.a>
  );
}

export function SupportedAgentsSection() {
  const t = useTranslations("landing");

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {t("supportedAgents.title", { fallback: "Supported Agents" })}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/40">
            {t("supportedAgents.subtitle", {
              fallback: "Beajee integrates with leading AI agents.",
            })}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {agents.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
