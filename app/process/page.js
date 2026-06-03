import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import { process } from "@/lib/content";

export const metadata = {
  title: "Our Process — Digital Growth Lab",
  description:
    "How we build compounding growth as a system: map, find the bottleneck, build the funnel, scale what works.",
};

export default function ProcessPage() {
  return (
    <main>
      {/* ───────── HERO ───────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-parchment via-parchment to-[#EFEFE9]">
        <div className="hero-atmos" aria-hidden>
          <div className="hero-glow" />
          <div className="hero-glow g2" />
          <div className="hero-grid" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 text-center sm:px-8">
          <Reveal>
            <h1 className="display text-black">
              <span className="hand text-[0.85em]">{process.hero.accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display text-black">{process.hero.main}</h1>
          </Reveal>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-[1600px] flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <p className="max-w-sm text-sm leading-relaxed text-black/70">
            {process.hero.tagline}
          </p>
          <span className="label text-black/60">{process.hero.scrollLabel}</span>
        </div>
      </section>

      {/* ───────── CONTRAST STATEMENT ───────── */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-[1500px] px-5 py-28 sm:px-8 sm:py-40">
          <Reveal>
            <p className="label mb-6 text-black/50">{process.contrast.line1}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-md text-black">
              {process.contrast.line2Pre}{" "}
              <span className="hand">{process.contrast.line2Accent}</span>.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ───────── SYSTEM / STEPS ───────── */}
      <section className="bg-ink text-white">
        <SectionLabel dark>{process.system.label}</SectionLabel>
        <div className="mx-auto max-w-[1300px] px-5 pb-24 sm:px-8 sm:pb-36">
          <div className="space-y-px">
            {process.system.steps.map((s, i) => (
              <Reveal key={s.title} y={40}>
                <div className="grid gap-6 border-t border-white/15 py-12 md:grid-cols-[auto,1fr] md:gap-16">
                  <span className="num text-2xl">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <div>
                    <h3 className="mb-5 text-2xl font-extrabold uppercase tracking-tightest sm:text-4xl">
                      {s.title}
                    </h3>
                    <p className="max-w-2xl text-base leading-relaxed text-white/70">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-white/15" />
          </div>
        </div>
      </section>

      {/* ───────── BENEFITS ───────── */}
      <section className="bg-parchment">
        <SectionLabel>{process.benefits.label}</SectionLabel>
        <div className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 sm:pb-36">
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {process.benefits.items.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.08}>
                <div>
                  <span className="num text-lg">{b.num}</span>
                  <h3 className="mb-4 mt-3 text-2xl font-extrabold uppercase tracking-tightest text-black sm:text-3xl">
                    {b.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-black/70">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── REALITY CHECK ───────── */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1300px] px-5 py-28 sm:px-8 sm:py-40">
          <Reveal>
            <p className="label mb-3 text-white/80">{process.reality.label}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mb-14 font-hand text-2xl text-white sm:text-3xl">
              {process.reality.note}
            </p>
          </Reveal>
          <div className="space-y-10">
            {process.reality.items.map((r, i) => (
              <Reveal key={r.num} delay={i * 0.08}>
                <div className="grid gap-4 border-t border-white/25 pt-8 md:grid-cols-[auto,1fr] md:gap-12">
                  <span className="text-2xl font-semibold italic text-white/80">
                    {r.num}
                  </span>
                  <p className="max-w-3xl text-xl font-medium leading-snug sm:text-2xl">
                    {r.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection />
    </main>
  );
}
