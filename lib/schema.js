// Structured data (JSON-LD) for Google. Keep NAP here identical to the
// Google Business Profile and every directory listing.
import { SITE_URL } from "@/lib/site";
import { brand } from "@/lib/content";

const ORG_ID = `${SITE_URL}/#organization`;

export const areaServed = [
  "Vancouver", "Burnaby", "Richmond", "Surrey", "Langley", "Coquitlam",
  "North Vancouver", "New Westminster", "Delta", "Pitt Meadows", "Maple Ridge",
  "Abbotsford", "Nanaimo", "Duncan",
].map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: "British Columbia" } }));

export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": ORG_ID,
        name: brand.name,
        alternateName: "DGL",
        url: SITE_URL,
        logo: `${SITE_URL}/apple-icon`,
        image: `${SITE_URL}/opengraph-image`,
        description:
          "Vancouver digital marketing agency for local businesses: Google Business Profile management, local SEO, Google & Meta ads, web design, social media and delivery platform management.",
        telephone: "+1-778-323-1804",
        email: brand.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vancouver",
          addressRegion: "BC",
          addressCountry: "CA",
        },
        areaServed,
        knowsAbout: [
          "Local SEO", "Google Business Profile", "Google Ads", "Meta Ads",
          "Web design", "Social media marketing", "DoorDash", "Uber Eats",
          "SkipTheDishes", "Clover POS", "Online ordering",
        ],
        // Add Instagram / LinkedIn / Facebook / GBP URLs here when they go live.
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: brand.name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-CA",
      },
    ],
  };
}

export function serviceSchema(service) {
  const url = `${SITE_URL}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription || service.intro,
        url,
        provider: { "@id": ORG_ID },
        areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} — what's included`,
          itemListElement: (service.includes || []).map((i) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: i.title, description: i.desc },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
    ],
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function industrySchema(ind) {
  const url = `${SITE_URL}/industries/${ind.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: ind.h1,
        serviceType: "Digital marketing",
        description: ind.metaDescription,
        url,
        provider: { "@id": ORG_ID },
        areaServed,
        audience: { "@type": "BusinessAudience", name: ind.name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
          { "@type": "ListItem", position: 3, name: ind.name, item: url },
        ],
      },
    ],
  };
}
