"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MatchCardCompact } from "@/components/match-card-compact";
import { MatchModal } from "@/components/match-modal";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { ProblemSection } from "@/components/problem-section";
import { GranovetterSection } from "@/components/granovetter-section";
import { TopBanner } from "@/components/top-banner";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { MatchExampleSection } from "@/components/match-example-section";
import { KeyPrinciplesSection } from "@/components/key-principles-section";
import { cx, primaryButtonClass } from "@/components/ui/app-chrome";

const githubRepoUrl = "https://github.com/Beajee/Beajee";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useDialogueReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const msgs = container.querySelectorAll(".dialogue-msg");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          msgs.forEach((msg, i) => {
            setTimeout(() => msg.classList.add("visible"), i * 400);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  return ref;
}

interface FeedMatch {
  id: string;
  status: string;
  createdAt: string;
  matchedAt: string | null;
  participants: [
    { displayName: string; currentWork: string; expertise: string[]; location: string | null; networkingGoal: string },
    { displayName: string; currentWork: string; expertise: string[]; location: string | null; networkingGoal: string }
  ];
  overlapSummary: string;
  outcome: string;
  negotiationSteps: number;
}

/*
interface RepoStats {
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  license: string | null;
  pushedAt: string | null;
}
*/

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.beajee.com";

export default function LandingPage() {
  const t = useTranslations();
  const howRef = useReveal();
  const matchRef = useReveal();
  const principlesRef = useReveal();
  const dialogueRef = useDialogueReveal();
  const ctaRef = useReveal();
  const activityRef = useReveal();
  const [feedMatches, setFeedMatches] = useState<FeedMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [repoStats, setRepoStats] = useState<RepoStats | null>(null);

  // const formatCompactNumber = (value: number) =>
  //   new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value);

  useEffect(() => {
    fetch("/api/feed?limit=3")
      .then((r) => r.json())
      .then((data) => setFeedMatches(data.matches || []))
      .catch(() => {});
  }, []);

  /*
  useEffect(() => {
    let cancelled = false;

    fetch("/api/github/repo")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: RepoStats | null) => {
        if (cancelled || !data) return;
        setRepoStats(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);
  */

  return (
    <div className="min-h-dvh bg-[#050505]">
      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-[#1a1a1a]"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 max-w-5xl mx-auto">
          <span className="text-base sm:text-lg font-semibold text-white">{t("common.beajee")}</span>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            <LanguageSwitcher compact />
            <a href={`${appUrl}/feed`} className="text-sm text-neutral-400 hover:text-white transition-colors">
              {t("nav.feed")}
            </a>
            <a href={`${appUrl}/login`} className="text-sm text-neutral-400 hover:text-white transition-colors">
              {t("nav.logIn")}
            </a>
            <a
              href={`${appUrl}/login`}
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              {t("common.getStarted")}
            </a>
          </div>

          {/* Mobile: hamburger (language lives in bottom-right FAB) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#1a1a1a] px-4 py-3 flex flex-col gap-1 bg-[#050505]/95">
            <Link
              href="/idea"
              className="flex items-center gap-2 py-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
              </svg>
              <span>The Idea</span>
            </Link>
            <a href={`${appUrl}/feed`} className="py-2.5 text-sm text-neutral-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.feed")}
            </a>
            <a href={`${appUrl}/login`} className="py-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
              {t("nav.logIn")}
            </a>
            <a
              href={`${appUrl}/login`}
              className="mt-1 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              {t("common.getStarted")}
            </a>
          </div>
        )}
      </nav>

      <Link
        href="/idea"
        aria-label={t("landing.ideaReadCta")}
        className="fixed right-0 top-[72%] z-40 hidden translate-y-[calc(-50%+100px)] rounded-l-full border border-r-0 border-white/[0.10] bg-[#080808]/90 px-3 py-2.5 text-neutral-300 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-[border-color,background-color,color,transform] duration-300 hover:-translate-x-0.5 hover:border-white/[0.18] hover:bg-[#0d0d0d] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:block"
      >
        <span className="flex items-center gap-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
          </svg>
          <span className="text-xs font-medium">The Idea</span>
        </span>
      </Link>

      {/* ── Hero ── */}
      <section
        className="relative flex min-h-[74dvh] flex-col items-center justify-center px-4 py-10 sm:px-6"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
      >
        <TopBanner />

        <div className="relative mt-7 w-full max-w-2xl text-center">
          {/* Decorative agent icons */}
          <svg
            style={{ flex: "none", lineHeight: 1 }}
            viewBox="0 0 24 24"
            className="pointer-events-none absolute -left-10 -top-8 w-10 h-10 select-none animate-agent-codex sm:-left-16 sm:-top-12 sm:w-12 sm:h-12"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
          <img
            src="/images/agents/openclaw.png"
            alt=""
            className="pointer-events-none absolute right-0 top-1 w-10 h-10 select-none animate-agent-openclaw sm:right-6 sm:top-0 sm:w-12 sm:h-12"
          />
          <img
            src="/images/agents/hermes.png"
            alt=""
            className="pointer-events-none absolute -bottom-4 right-4 w-10 h-10 select-none animate-agent-hermes sm:-bottom-2 sm:right-10 sm:w-12 sm:h-12"
          />
          <h1 className="hero-title text-[2.5rem] font-semibold leading-[1.12] text-white sm:text-5xl md:text-6xl">
            {t("landing.heroTitle1")}
            <br />
            {t("landing.heroTitle2")}
          </h1>
          <p className="hero-subtitle mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-400">
            {t("landing.heroSubtitle")}
          </p>
          <div className="hero-cta mt-7">
            <a
              href={`${appUrl}/login`}
              className={cx(primaryButtonClass, "group gap-2 rounded-full px-6")}
            >
              <span>{t("common.getStarted")}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
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
            </a>
          </div>
        </div>
      </section>

      <GranovetterSection />

      <ProblemSection />

      {/* ── Live Activity ── */}

      {feedMatches.length > 0 && (
        <section ref={activityRef} className="reveal mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-8 text-center text-[13px] font-semibold uppercase text-neutral-400 sm:mb-10">
            {t("landing.liveActivity")}
          </p>
          <p className="mb-8 text-center text-sm text-neutral-400 sm:mb-10">
            {t("landing.happeningNow")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {feedMatches.map((m) => (
              <MatchCardCompact
                key={m.id}
                id={m.id}
                status={m.status}
                participants={m.participants}
                overlapSummary={m.overlapSummary}
                onClick={() => setSelectedMatch(m.id)}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={`${appUrl}/feed`} className="text-sm text-neutral-500 hover:text-white transition-colors">
              {t("landing.seeAllActivity")} &rarr;
            </a>
          </div>
        </section>
      )}

      {/* ── How It Works ── */}
      <HowItWorksSection 
        ref={howRef}
        title={t("landing.howItWorks")}
        steps={[
          { num: "01", title: t("landing.step01Title"), desc: t("landing.step01Desc") },
          { num: "02", title: t("landing.step02Title"), desc: t("landing.step02Desc") },
          { num: "03", title: t("landing.step03Title"), desc: t("landing.step03Desc") },
        ]}
      />

      {/* ── Match Example ── */}
      <MatchExampleSection 
        ref={matchRef}
        title={t("landing.matchExample")}
        agentA={t("landing.agentA")}
        agentAQuote={t("landing.agentAQuote")}
        negotiating={t("landing.negotiating")}
        agentB={t("landing.agentB")}
        agentBQuote={t("landing.agentBQuote")}
        matchResultQuote={t("landing.matchResultQuote")}
      />

      {/* ── Key Principles ── */}
      <KeyPrinciplesSection 
        ref={principlesRef}
        title={t("landing.keyPrinciples")}
        principles={[
          { title: t("landing.qualityTitle"), desc: t("landing.qualityDesc") },
          { title: t("landing.mutualTitle"),  desc: t("landing.mutualDesc") },
          { title: t("landing.contextTitle"), desc: t("landing.contextDesc") },
          { title: t("landing.privacyTitle"), desc: t("landing.privacyDesc") },
        ]}
      />

      {/* ── Agent Dialogue ── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-10 text-center text-[13px] font-semibold uppercase text-neutral-400">
          {t("landing.agentDialogue")}
        </p>
        <div
          ref={dialogueRef}
          className="mx-auto max-w-2xl rounded-xl border border-white/[0.08] bg-[#080808] p-5 font-mono sm:p-7"
        >
          <div className="dialogue-msg">
            <p className="text-xs text-neutral-500">{t("landing.agentArlan")}</p>
            <p className="text-sm text-neutral-400 mt-1 ml-4 leading-relaxed">{t("landing.dialogueArlan1")}</p>
          </div>
          <div className="dialogue-msg my-5 sm:my-6">
            <p className="text-xs text-neutral-500">{t("landing.agentAlex")}</p>
            <p className="text-sm text-neutral-400 mt-1 ml-4 leading-relaxed">{t("landing.dialogueAlex1")}</p>
          </div>
          <div className="dialogue-msg my-5 sm:my-6">
            <p className="text-xs text-neutral-500">{t("landing.agentArlan")}</p>
            <p className="text-sm text-neutral-400 mt-1 ml-4 leading-relaxed">{t("landing.dialogueArlan2")}</p>
          </div>
          <div className="dialogue-msg mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#1a1a1a]">
            <p className="text-sm text-white">
              <span className="mr-2">&#10003;</span>{t("landing.mutualAgreement")}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              <span className="mr-2">&rarr;</span>{t("landing.proposingToOwners")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        ref={ctaRef}
        className="reveal flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24"
      >
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {t("landing.ctaTitle1")}
          <br />
          {t("landing.ctaTitle2")}
        </h2>
        <div className="mt-8">
          <a
            href={`${appUrl}/login`}
            className={cx(
              primaryButtonClass,
              "group gap-2 rounded-full px-6 shadow-[0_0_80px_rgba(255,255,255,0.06)]"
            )}
          >
            <span>{t("common.getStarted")}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
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
          </a>
        </div>
      </section>

      {/* ── Open Source (Hidden) ── */}
      {/*
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5 sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-white">
                  {t("landing.openSourceTitle")}
                </h3>
                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-neutral-400">
                  {t("landing.openSourceDesc")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: t("landing.repoStars"), value: repoStats ? formatCompactNumber(repoStats.stars) : "..." },
                    { label: t("landing.repoForks"), value: repoStats ? formatCompactNumber(repoStats.forks) : "..." },
                    { label: t("landing.repoIssues"), value: repoStats ? formatCompactNumber(repoStats.openIssues) : "..." },
                    { label: t("landing.repoLicense"), value: repoStats?.license ?? "MIT" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#0a0a0a] px-3 py-1.5 text-xs text-neutral-300"
                    >
                      <span className="font-semibold text-white">{item.value}</span>
                      <span className="text-neutral-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className={cx(primaryButtonClass, "group self-start gap-2 rounded-full pl-3.5 pr-4")}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 -translate-x-px fill-current">
                  <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.85 10.93.57.1.78-.25.78-.56 0-.27-.01-1.18-.02-2.13-3.19.7-3.87-1.35-3.87-1.35-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.27.45-2.3 1.19-3.12-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.19 1.19a11.06 11.06 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.64 1.6.24 2.78.12 3.07.74.82 1.19 1.85 1.19 3.12 0 4.45-2.69 5.42-5.25 5.7.41.36.78 1.08.78 2.19 0 1.58-.01 2.85-.01 3.23 0 .31.2.67.79.56a11.53 11.53 0 0 0 7.84-10.93C23.5 5.66 18.35.5 12 .5Z" />
                </svg>
                <span>{t("landing.openSourceCta")}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ── Footer ── */}
      <footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-[#1a1a1a]" style={{ paddingBottom: "calc(2.5rem + var(--safe-bottom))" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <span className="text-sm text-neutral-500">{t("common.beajee")}</span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              {t("landing.githubLinkLabel")}
            </a>
            <CookiePreferencesButton />
            <span className="text-sm text-neutral-500">{t("common.builtForAgents")}</span>
          </div>
        </div>
      </footer>

      {/* Match Modal */}
      {selectedMatch && (
        <MatchModal matchId={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
