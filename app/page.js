import Link from "next/link";
import Marquee from "@/components/Marquee";
import CTASection from "@/components/CTASection";
import AuditButton from "@/components/AuditButton";
import ServiceIcon from "@/components/ServiceIcon";
import StackedTestimonials from "@/components/StackedTestimonials";
import { home } from "@/lib/content";
import { services } from "@/lib/services";

/* ---------- small helpers ---------- */

function HeroWord({ children, className = "" }) {
  return (
    <span
      data-anim="hero-word"
      className={`inline-block ${className}`}
      style={{ marginRight: "0.22em", opacity: 0 }}
    >
      {children}
    </span>
  );
}

function Count({ value, prefix = "", suffix = "", decimals = 0, className = "" }) {
  return (
    <span
      className={className}
      data-anim="count"
      data-count={value}
      data-prefix={prefix}
      data-suffix={suffix}
      data-decimals={decimals}
    >
      {prefix}
      {Number(value).toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SecHead({ num, label, titlePre, accent, lead }) {
  return (
    <div className="mb-16 max-w-3xl sm:mb-20">
      <div data-anim="reveal" className="flex items-baseline gap-3" style={{ opacity: 0 }}>
        <span className="num">{num}</span>
        <span className="kicker">{label}</span>
      </div>
      <h2
        data-anim="reveal"
        data-anim-delay="0.08"
        className="display-md mt-5 text-black"
        style={{ opacity: 0 }}
      >
        {titlePre} <span className="hand">{accent}</span>
      </h2>
      <p
        data-anim="reveal"
        data-anim-delay="0.12"
        className="mt-6 max-w-[46ch] text-base leading-relaxed text-black/60"
        style={{ opacity: 0 }}
      >
        {lead}
      </p>
    </div>
  );
}

/* ---------- page ---------- */

export default function HomePage() {
  const h = home;

  return (
    <main>
      {/* ───────── HERO ───────── */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-parchment via-parchment to-[#EFEFE9]"
      >
        <div className="hero-atmos" aria-hidden>
          <div className="hero-glow" />
          <div className="hero-glow g2" />
          <div className="hero-grid" />
        </div>
        <div
          data-anim="hero-bg"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-tomato/40"
          style={{ opacity: 0 }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-8">
          <span data-anim="hero-sub" className="kicker" style={{ opacity: 0 }}>
            {h.hero.eyebrow}
          </span>

          <div data-anim="hero-parallax" className="mt-6">
            <h1 className="hero-h1 text-black">
              <HeroWord>{h.hero.line1}</HeroWord>
            </h1>
            <h1 className="hero-h1 text-black">
              <HeroWord>{h.hero.line2Pre}</HeroWord>
              <HeroWord className="hand text-[1.05em]">{h.hero.line2Accent}</HeroWord>
            </h1>
            <h1 className="hero-h1 text-black">
              <HeroWord>{h.hero.line3}</HeroWord>
            </h1>
          </div>

          <p
            data-anim="hero-sub"
            className="mt-8 max-w-[52ch] text-base leading-relaxed text-black/70 sm:text-lg"
            style={{ opacity: 0 }}
          >
            {h.hero.tagline}
          </p>

          <div
            data-anim="hero-sub"
            className="mt-9 flex flex-wrap items-center gap-4"
            style={{ opacity: 0 }}
          >
            <AuditButton className="btn-red !px-8 !py-4 !text-sm">
              <span>{h.hero.primary.label}</span>
            </AuditButton>
            <Link href={h.hero.secondary.href} data-cursor="link" className="btn-outline text-black">
              <span>{h.hero.secondary.label}</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-10 sm:px-8">
          <div className="flex flex-wrap gap-10 sm:gap-14">
            {h.hero.stats.map((s, i) => (
              <div key={i} data-anim="hero-sub" style={{ opacity: 0 }}>
                <div className="text-3xl font-extrabold tracking-tightest text-black sm:text-4xl">
                  <Count value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-2 max-w-[18ch] text-xs leading-snug text-black/55">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CLIENTS MARQUEE ───────── */}
      <div className="bg-ink py-7 text-white">
        <Marquee items={h.clients} />
      </div>

      {/* ───────── SERVICES (01) ───────── */}
<section id="services" className="py-24 bg-[#F6F6F2]">
  <div className="max-w-6xl mx-auto px-4">
    {/* Section header */}
    <p className="kicker text-center mb-2" style={{color:'#2D5BFF'}}>What We Do</p>
    <h2 className="text-4xl font-bold text-center mb-12 text-ink">
      Services That Drive Results
    </h2>
  </div>

  <div className="svc-hscroll" data-anim="hscroll">
    <div className="svc-hscroll-track" data-hscroll-track>
      {services.map((s) => (
        <div key={s.slug} className="svc-card">
          <div className="svc-card-top" style={{ background: s.cardColor }}>
            <span className="svc-card-icon">
              <ServiceIcon name={s.icon} />
            </span>
            <span className="svc-card-num">{s.num}</span>
          </div>
          <div className="svc-card-body">
            <div className="svc-card-title">{s.title}</div>
            <div className="svc-card-desc">{s.short}</div>
            <ul className="svc-card-tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Link
              href={`/services/${s.slug}`}
              data-cursor="link"
              className="svc-card-btn"
            >
              Learn More
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ───────── APPROACH (02) ───────── */}
      <section id="approach" className="border-y border-black/10 bg-[#EFEFE9] py-28 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <SecHead
            num={h.approach.num}
            label={h.approach.label}
            titlePre={h.approach.titlePre}
            accent={h.approach.titleAccent}
            lead={h.approach.lead}
          />
          <div data-anim="stagger" className="grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {h.approach.steps.map((s) => (
              <div
                key={s.n}
                data-stagger
                className="relative bg-parchment p-9 transition-colors duration-500 hover:bg-[#E7E8E2]"
                style={{ opacity: 0 }}
              >
                <span className="absolute right-7 top-9 h-1.5 w-1.5 rounded-full bg-tomato" aria-hidden />
                <div className="font-extrabold italic leading-none text-tomato/40" style={{ fontSize: "54px" }}>
                  {s.n}
                </div>
                <h3 className="mb-3 mt-5 text-xl font-bold uppercase tracking-tightest text-black">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/60">{s.body}</p>
              </div>
            ))}
          </div>
          <div data-anim="reveal" data-anim-delay="0.1" style={{ opacity: 0 }}>
            <Link href={h.approach.link.href} data-cursor="link" className="btn-outline mt-12 text-black">
              <span>{h.approach.link.label}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── RESULTS (03) ───────── */}
      <section id="results" className="bg-ink py-28 text-white sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="mb-16 max-w-3xl sm:mb-20">
            <div data-anim="reveal" className="flex items-baseline gap-3" style={{ opacity: 0 }}>
              <span className="num">{h.results.num}</span>
              <span className="kicker">{h.results.label}</span>
            </div>
            <h2 data-anim="reveal" data-anim-delay="0.08" className="display-md mt-5 text-white" style={{ opacity: 0 }}>
              {h.results.titlePre} <span className="hand">{h.results.titleAccent}</span>
            </h2>
            <p data-anim="reveal" data-anim-delay="0.12" className="mt-6 max-w-[46ch] text-base leading-relaxed text-white/60" style={{ opacity: 0 }}>
              {h.results.lead}
            </p>
          </div>

          <div data-anim="stagger" className="grid gap-6 lg:grid-cols-3">
            {h.results.items.map((s, i) => (
              <div key={i} data-stagger className="stat-card" style={{ opacity: 0 }}>
                <Count
                  className="big"
                  value={s.value}
                  prefix={s.prefix || ""}
                  suffix={s.suffix || ""}
                  decimals={s.decimals || 0}
                />
                <div className="sc-label">{s.label}</div>
                <div className="glow" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FULL SERVICE (04) ───────── */}
      <section id="full-service" className="border-t border-black/10 bg-parchment py-28 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div data-anim="reveal" data-anim-x="left" className="feature-visual" style={{ opacity: 0 }}>
              <div className="ring fr1" />
              <div className="ring fr2" />
              <div className="ring fr3" />
              <div className="core" />
              <div className="v-metric">
                <b>{h.fullService.visual.metric}</b>
                <small>{h.fullService.visual.metricLabel}</small>
              </div>
              <div className="v-caption">{h.fullService.visual.caption}</div>
            </div>

            <div>
              <div data-anim="reveal" className="flex items-baseline gap-3" style={{ opacity: 0 }}>
                <span className="num">{h.fullService.num}</span>
                <span className="kicker">{h.fullService.label}</span>
              </div>
              <h2 data-anim="reveal" data-anim-delay="0.08" className="display-md mb-6 mt-5 text-black" style={{ opacity: 0 }}>
                {h.fullService.titlePre} <span className="hand">{h.fullService.titleAccent}</span>
              </h2>
              <p data-anim="reveal" data-anim-delay="0.12" className="mb-2 max-w-[46ch] text-base leading-relaxed text-black/70" style={{ opacity: 0 }}>
                {h.fullService.body}
              </p>
              <ul data-anim="stagger" className="feat-list">
                {h.fullService.points.map((p) => (
                  <li key={p} data-stagger style={{ opacity: 0 }}>
                    <span className="ic" aria-hidden>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div data-anim="reveal" data-anim-delay="0.1" style={{ opacity: 0 }}>
                <AuditButton className="btn-outline text-black">
                  <span>{h.fullService.cta.label}</span>
                </AuditButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS (scroll-stacked) ───────── */}
      <StackedTestimonials />

      {/* ───────── CTA / FOOTER ───────── */}
      <CTASection />
    </main>
  );
}
