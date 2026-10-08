import Link from "next/link";
import CTASection from "@/components/CTASection";
import { posts } from "@/lib/posts";
import { baseOpenGraph, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/lib/schema";

const title = "Local Marketing Guides for Vancouver Businesses | DGL Blog";
const description =
  "Practical guides on Google reviews, Google Business Profile, local SEO, delivery apps and online ordering for local businesses in Vancouver and across BC.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: { ...baseOpenGraph, title, description, url: "/blog" },
};

const fmt = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/blog` },
    ],
  };
  return (
    <main>
      <JsonLd data={crumbs} />
      <section className="relative overflow-hidden bg-gradient-to-b from-parchment to-[#E4EAFF]">
        <div className="hero-atmos" aria-hidden>
          <div className="hero-glow" />
          <div className="hero-grid" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-16 pt-36 sm:px-8 lg:pt-40">
          <p className="kicker mb-5">Guides</p>
          <h1 className="display-md max-w-[20ch] text-black">Local marketing guides for BC businesses</h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-black/70">
            Plain-language, sourced advice on Google reviews, local search, delivery apps and online ordering, from the team that does this work every day.
          </p>
        </div>
      </section>
      <section className="bg-parchment py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-5 sm:px-8 md:grid-cols-2">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              data-cursor="link"
              className="flex h-full flex-col rounded-3xl border border-black/10 bg-white/60 p-8 transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(45,91,255,0.12)]"
            >
              <span className="label mb-4 text-black/50">{p.category} · {p.readMinutes} min read</span>
              <h2 className="mb-3 text-xl font-bold tracking-tight text-black sm:text-2xl">{p.title}</h2>
              <p className="flex-1 text-sm leading-relaxed text-black/60">{p.excerpt}</p>
              <span className="mt-6 text-xs text-black/45">{fmt(p.date)}</span>
            </Link>
          ))}
        </div>
      </section>
      <CTASection />
    </main>
  );
}
