import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import AuditButton from "@/components/AuditButton";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";
import { CardGrid, Steps, Prose, Faqs } from "@/components/DetailSections";
import { industries, getIndustry } from "@/lib/industries";
import { getService } from "@/lib/services";
import { baseOpenGraph } from "@/lib/site";
import { JsonLd, industrySchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return { title: "Industries — Digital Growth Labs" };
  const url = `/industries/${ind.slug}`;
  return {
    title: ind.seoTitle,
    description: ind.metaDescription,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, title: ind.seoTitle, description: ind.metaDescription, url },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const others = industries.filter((i) => i.slug !== slug);
  const svc = ind.services.map(getService).filter(Boolean);

  return (
    <main>
      <JsonLd data={industrySchema(ind)} />
      <JsonLd data={faqSchema(ind.faqs)} />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-parchment to-[#E4EAFF]">
        <div className="hero-atmos" aria-hidden>
          <div className="hero-glow" />
          <div className="hero-grid" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-40">
          <div>
            <Link
              href="/industries"
              data-cursor="link"
              className="label mb-8 inline-flex items-center gap-2 text-black/50 transition-colors hover:text-tomato"
            >
              <span aria-hidden>←</span> All industries
            </Link>
            <p className="kicker mb-5">Industry</p>
            <h1 className="display-md text-black">
              {ind.h1}{" "}
              <span className="mt-3 block text-lg font-semibold normal-case tracking-normal text-black/55 sm:text-2xl">
                {ind.h1Suffix}
              </span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-black/70">{ind.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <AuditButton className="btn-red !px-8 !py-4 !text-sm">
                <span>Book a free audit</span>
              </AuditButton>
              <Link href="/industries" data-cursor="link" className="btn-outline text-black">
                <span>Other industries</span>
              </Link>
            </div>
          </div>
          <div className="service-graphic">
            <div className="ring sr1" />
            <div className="ring sr2" />
            <div className="ring sr3" />
            <div className="glow" />
            <div className="core">
              <ServiceIcon name={ind.icon} size={64} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHO WE WORK WITH ───────── */}
      <section className="border-t border-black/10 bg-parchment py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="kicker mb-6">Who we work with</h2>
          <ul className="flex flex-wrap gap-3">
            {ind.examples.map((e) => (
              <li key={e} className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-black/80">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CardGrid kicker="The challenge" title="What gets in the way of growth" items={ind.challenges} />
      <Steps kicker="The plan" title={`How we grow ${ind.name.toLowerCase()}`} steps={ind.plan} />

      <Prose kicker="Why it works" title="Built around how your customers buy." paragraphs={ind.why} />

      {/* ───────── SERVICES USED ───────── */}
      <section className="border-t border-black/10 bg-parchment py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="kicker mb-8">Services in this plan</h2>
          <div className="flex flex-wrap gap-3">
            {svc.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-cursor="link"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black/80 transition-colors hover:border-[#2D5BFF] hover:text-[#2D5BFF]"
              >
                <ServiceIcon name={s.icon} size={18} />
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faqs title={`Marketing for ${ind.name.toLowerCase()}: common questions`} faqs={ind.faqs} />

      {/* ───────── OTHER INDUSTRIES ───────── */}
      <section className="border-t border-black/10 bg-[#EFEFE9] py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <h2 className="kicker mb-8">Other industries we grow</h2>
          <div className="flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                data-cursor="link"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black/80 transition-colors hover:border-[#2D5BFF] hover:text-[#2D5BFF]"
              >
                <ServiceIcon name={o.icon} size={18} />
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
