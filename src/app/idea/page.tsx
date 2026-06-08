import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("landing");

  return {
    title: `${t("ideaCardTitle")} — Beajee`,
    description: t("ideaCardDesc"),
  };
}

export default async function IdeaPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const ideaParagraphs = [
    t("landing.ideaParagraph1"),
    t("landing.ideaParagraph2"),
    t("landing.ideaParagraph3"),
    t("landing.ideaParagraph4"),
    t("landing.ideaParagraph5"),
  ];

  const ideaAbilities = [
    t("landing.ideaAbilitySelfReflection"),
    t("landing.ideaAbilitySelfImprovement"),
    t("landing.ideaAbilityCollaboration"),
    t("landing.ideaAbilitySelfDestruction"),
  ];

  return (
    <div className="min-h-dvh bg-[#050505]">
      <nav
        className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#050505]/80 backdrop-blur-xl"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link href="/" className="text-base font-semibold text-white sm:text-lg">
            {t("common.beajee")}
          </Link>
          <Link href="/" className="text-sm text-neutral-400 transition-colors hover:text-white">
            &larr; {t("common.back")}
          </Link>
        </div>
      </nav>

      <main lang={locale} className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <article>
          <header className="border-b border-[#1a1a1a] pb-8">
            <div className="mb-7 flex items-center gap-4">
              <div
                aria-hidden="true"
                className="relative h-20 w-14 shrink-0 rounded-md border border-white/[0.10] bg-[#0c0c0c] shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
              >
                <span className="absolute left-3 top-4 h-px w-8 bg-white/[0.18]" />
                <span className="absolute left-3 top-6 h-px w-6 bg-white/[0.12]" />
                <span className="absolute left-3 top-10 h-px w-8 bg-white/[0.10]" />
                <span className="absolute left-3 top-12 h-px w-7 bg-white/[0.08]" />
                <span className="absolute left-3 top-14 h-px w-5 bg-white/[0.08]" />
                <span className="absolute inset-y-2 left-1.5 w-px bg-white/[0.08]" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  {t("landing.ideaCardTitle")}
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                  {t("landing.ideaCardDesc")}
                </p>
              </div>
            </div>
          </header>

          <div className="mt-10 space-y-5 text-[15px] leading-7 text-neutral-300 sm:text-base sm:leading-8">
            <p>{ideaParagraphs[0]}</p>
            <p>{ideaParagraphs[1]}</p>
            <p>{ideaParagraphs[2]}</p>

            <ol className="my-8 space-y-3 border-l border-[#242424] pl-5 text-neutral-200">
              {ideaAbilities.map((ability, index) => (
                <li key={ability} className="flex gap-3">
                  <span className="mt-px font-mono text-xs text-neutral-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{ability}</span>
                </li>
              ))}
            </ol>

            <p>{ideaParagraphs[3]}</p>
            <p>{ideaParagraphs[4]}</p>
          </div>
        </article>
      </main>
    </div>
  );
}
