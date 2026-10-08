import { SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { posts } from "@/lib/posts";

export default function sitemap() {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/process", priority: 0.6, changeFrequency: "monthly" },
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.9,
      changeFrequency: "monthly",
    })),
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "monthly" })),
    ...industries.map((i) => ({
      path: `/industries/${i.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
    })),
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
