import Link from "next/link";
import AuditButton from "@/components/AuditButton";
import Logo from "@/components/Logo";
import { brand, home } from "@/lib/content";

export default function CTASection() {
  const { cta, footer } = home;

  return (
    <>
      {/* ───────── CTA ───────── */}
      <section id="contact" className="bg-parchment py-28 sm:py-36">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div
            data-anim="reveal"
            className="relative overflow-hidden rounded-[28px] border border-black/10 bg-ink px-6 py-20 text-center text-white sm:px-16 sm:py-28"
            style={{ opacity: 0 }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,68,42,0.35), transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden
            />
            <span className="kicker relative z-10">{cta.eyebrow}</span>
            <h2
              data-anim="cta-scale"
              className="display-md relative z-10 mx-auto mt-6 max-w-[16ch] text-white will-change-transform"
              style={{ opacity: 0 }}
            >
              {cta.titlePre} <span className="hand">{cta.titleAccent}</span>
            </h2>
            <p className="relative z-10 mx-auto mt-6 max-w-[44ch] text-base leading-relaxed text-white/70">
              {cta.body}
            </p>
            <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-4">
              <AuditButton className="btn-red pulse-cta">
                <span>{cta.primary.label}</span>
              </AuditButton>
              <a href={cta.secondary.href} data-cursor="link" className="btn-outline text-white">
                <span>{cta.secondary.label}</span>
              </a>
            </div>
            {cta.callNote && (
              <p className="relative z-10 mt-6 text-sm text-white/55">
                {cta.callNote.split("778-323-1804")[0]}
                <a href={brand.phoneHref} data-cursor="link" className="text-tomato hover:underline">
                  778-323-1804
                </a>
                {cta.callNote.split("778-323-1804")[1]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="border-t border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
          <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Logo className="h-9 w-9 shrink-0 text-white" />
                <span>
                  <b className="font-semibold">{brand.name}</b>
                  <span className="label mt-0.5 block text-white/40">{brand.location}</span>
                </span>
              </div>
              <p className="max-w-[34ch] text-sm leading-relaxed text-white/50">
                {footer.blurb}
              </p>
            </div>

            {footer.columns.map((col) => (
              <div key={col.heading}>
                <h4 className="label mb-5 text-white/50">{col.heading}</h4>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    data-cursor="link"
                    className="block py-1.5 text-sm text-white/70 transition-colors hover:text-tomato"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <span className="label text-white/40">
              © {brand.name} · {brand.location}
            </span>
            <div className="flex gap-6">
              {brand.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="label text-white/40 transition-colors hover:text-tomato"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
