import Link from "next/link";
import CTASection from "@/components/CTASection";
import ServiceIcon from "@/components/ServiceIcon";
import { industries } from "@/lib/industries";
import { baseOpenGraph, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/lib/schema";

const title = "Industries We Grow — High-Ticket Local Businesses | DGL";
const description =
  "Digital marketing for high-ticket local businesses in Vancouver: sports academies, med spas, dental, auto detailing and PPF, and renovators and custom builders.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/industries" },
  openGraph: { ...baseOpenGraph, title, description, url: "/industries" },
};

export default function IndustriesPage() {
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
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
          <p className="kicker mb-5">Industries</p>
          <h1 className="display-md max-w-[20ch] text-black">
            Marketing for high-ticket local businesses
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-black/70">
            When one customer is worth hundreds or thousands of dollars, the businesses that win are the ones buyers can find, trust and book easily. We build that for academies, clinics, auto studios and builders across Metro Vancouver.
          </p>
        </div>
      </section>

      <section className="bg-parchment py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              data-cursor="link"
              className="group flex h-full flex-col rounded-3xl border border-black/10 bg-white/60 p-7 transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(45,91,255,0.12)]"
            >
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#2D5BFF]/10 text-[#2D5BFF]">
                <ServiceIcon name={i.icon} size={20} />
              </span>
              <h2 className="mb-2 text-lg font-bold tracking-tight text-black">{i.name}</h2>
              <p className="flex-1 text-sm leading-relaxed text-black/60">{i.short}</p>
              <span className="mt-6 text-sm font-semibold text-[#2D5BFF]">
                See the plan<span className="sr-only"> for {i.name}</span> →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
