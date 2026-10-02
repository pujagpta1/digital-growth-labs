// Canonical site origin — used for metadataBase, canonicals, sitemap and robots.
export const SITE_URL = "https://www.digitalgrowthlabs.ca";

// Shared Open Graph defaults. Next.js replaces (not merges) openGraph per page,
// so pages spread this in alongside their own title/description/url.
export const baseOpenGraph = {
  type: "website",
  locale: "en_CA",
  siteName: "Digital Growth Labs",
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Digital Growth Labs — local SEO and digital marketing agency in Vancouver, BC",
    },
  ],
};
