import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import AuditButton from "@/components/AuditButton";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";
import { services, getService } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service — Digital Growth Labs" };
  return {
    title: `${service.title} — Digital Growth Labs`,
    description: service.intro,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <main>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-parchment to-[#E4EAFF]">
        <div className="hero-atmos" aria-hidden>
          <div className="hero-glow" />
          <div className="hero-grid" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-40">
          <div>
            <Reveal>
              <Link
                href="/#services"
                data-cursor="link"
                className="label mb-8 inline-flex items-center gap-2 text-black/50 transition-colors hover:text-tomato"
              >
                <span aria-hidden>←</span> All services
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mb-5 flex items-baseline gap-3">
                <span className="num text-lg">({service.num})</span>
                <span className="kicker">Service</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-md text-black">{service.title}</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-black/70">
                {service.intro}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <AuditButton className="btn-red !px-8 !py-4 !text-sm">
                  <span>Book a free audit</span>
                </AuditButton>
                <Link href="/#services" data-cursor="link" className="btn-outline text-black">
                  <span>Explore all services</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Graphic */}
          <Reveal delay={0.15} className="will-change-transform">
            <div className="service-graphic">
              <div className="ring sr1" />
              <div className="ring sr2" />
              <div className="ring sr3" />
              <div className="glow" />
              <div className="core">
                <ServiceIcon name={service.icon} size={64} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── WHAT'S INCLUDED ───────── */}
      <section className="bg-parchment py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-3">What's included</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-md mb-14 max-w-[18ch] text-black">
              Exactly what you <span className="hand">get</span>.
            </h2>
          </Reveal>

          <div data-anim="stagger" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <div
                key={item.title}
                data-stagger
                className="flex h-full flex-col rounded-3xl border border-black/10 bg-white/60 p-7 transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(45,91,255,0.12)] will-change-transform"
                style={{ opacity: 0 }}
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#2D5BFF]/10 text-[#2D5BFF]">
                  <ServiceIcon name={service.icon} size={20} />
                </span>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-black">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── OTHER SERVICES ───────── */}
      <section className="border-t border-black/10 bg-[#F6F6F2] py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Reveal>
            <p className="kicker mb-8">Explore more</p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                data-cursor="link"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black/80 transition-colors hover:border-[#2D5BFF] hover:text-[#2D5BFF]"
              >
                <ServiceIcon name={o.icon} size={18} />
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection />
    </main>
  );
}
