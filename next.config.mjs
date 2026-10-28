/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The old BabyLoveGrowth-hosted blog lived on blog.digitalgrowthlabs.ca with the same /blog/<slug> paths.
  // Once that subdomain points at this Vercel project, send every old URL to the same article here.
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "blog.digitalgrowthlabs.ca" }],
        destination: "https://www.digitalgrowthlabs.ca/blog",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "blog.digitalgrowthlabs.ca" }],
        destination: "https://www.digitalgrowthlabs.ca/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
