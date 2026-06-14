"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const agents = [
  {
    name: "Codex",
    description: "OpenAI\u2019s agent for code.",
    url: "https://openai.com/codex",
    logo: (
      <svg
        style={{ flex: "none", lineHeight: 1 }}
        viewBox="0 0 24 24"
        className="h-10 w-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Codex</title>
        <path
          d="M19.503 0H4.496A4.496 4.496 0 000 4.496v15.007A4.496 4.496 0 004.496 24h15.007A4.496 4.496 0 0024 19.503V4.496A4.496 4.496 0 0019.503 0z"
          fill="#fff"
        />
        <path
          d="M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z"
          fill="url(#lobe-icons-codex-_R_0_)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="lobe-icons-codex-_R_0_"
            x1="12"
            x2="12"
            y1="3"
            y2="21"
          >
            <stop stopColor="#B1A7FF" />
            <stop offset=".5" stopColor="#7A9DFF" />
            <stop offset="1" stopColor="#3941FF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "OpenClaw",
    description: "Your open-source personal AI.",
    url: "https://openclaw.ai",
    logo: (
      <img
        src="/images/agents/openclaw.png"
        alt="OpenClaw"
        className="h-10 w-10 object-contain"
      />
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
