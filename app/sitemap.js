import { SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";

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
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
