import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";
import { about } from "@/lib/content";

export const metadata = {
  title: "About — Digital Growth Lab",
  description:
    "A small, blunt growth team that treats your revenue like our own. Who we are, who we work with, and how we think.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ───────── TAGLINE (opens the page) ───────── */}
      <section data-nav-dark className="bg-ink text-white">
        <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-36 sm:px-8 sm:pb-40 sm:pt-52">
          <Reveal>
            <h2 className="display-md text-white">
              {about.tagline.pre}{" "}
              <span className="font-hand normal-case text-white underline decoration-2 underline-offset-8">
                {about.tagline.accent}
              </span>
              {about.tagline.post}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ───────── WE WORK WITH (red) ───────── */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1500px] px-5 pb-28 sm:px-8 sm:pb-40">
          <Reveal>
            <h2 className="display-md mb-8 text-white">{about.workWith.pre}</h2>
          </Reveal>
          <div className="space-y-4">
            {about.workWith.lines.map((line, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="font-hand text-4xl text-white underline decoration-white/70 decoration-2 underline-offset-8 sm:text-6xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── STATS (parchment) ───────── */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 sm:grid-cols-3">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="border-t border-black/15 pt-6">
                  <div className="text-6xl font-extrabold tracking-tightest text-black sm:text-7xl">
                    {s.value}
                  </div>
                  <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-black/60">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PERSONAL NOTE (parchment) ───────── */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-[1100px] px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="space-y-8">
            {about.note.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-2xl font-medium leading-snug text-black sm:text-3xl sm:leading-snug">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PHILOSOPHY (parchment) ───────── */}
      <section className="bg-parchment">
        <SectionLabel>{about.philosophy.label}</SectionLabel>
        <div className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 sm:pb-36">
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {about.philosophy.items.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <div className="border-t border-black/15 pt-6">
                  <span className="num text-lg">{p.num}</span>
                  <h3 className="mb-4 mt-3 text-2xl font-extrabold uppercase tracking-tightest text-black sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-black/70">
                    {p.body}
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
