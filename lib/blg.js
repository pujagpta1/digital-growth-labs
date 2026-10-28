// BabyLoveGrowth articles, read server-side and shown on /blog next to our hand-written guides.
// Needs BABYLOVEGROWTH_BLOG_API_KEY (server-only — never prefix it with NEXT_PUBLIC_).
// If the key is missing or the API is down, these return empty results so the guides still render.
import { BlogClient } from "babylovegrowth-next-js-blog";

export const BLG_REVALIDATE = 3600; // pick up newly published articles within an hour

let client = null;
function getClient() {
  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) return null;
  if (!client) {
    client = new BlogClient({
      apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
      baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL,
      revalidate: BLG_REVALIDATE,
    });
  }
  return client;
}

const toDate = (iso) => (iso ? String(iso).slice(0, 10) : "");

// Normalised to the same shape the blog index uses for guides.
function toCard(a) {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || a.meta_description || "",
    date: toDate(a.published_at || a.created_at),
    category: "Article",
    image: a.hero_image_url || null,
    source: "blg",
  };
}

export async function getBlgArticles() {
  const c = getClient();
  if (!c) return [];
  try {
    const list = await c.getAllArticles();
    return list.filter((a) => a.published !== false).map(toCard);
  } catch (err) {
    console.error("[blog] BabyLoveGrowth list failed:", err?.message);
    return [];
  }
}

export async function getBlgArticle(slug) {
  const c = getClient();
  if (!c) return null;
  try {
    const a = await c.getArticleBySlug(slug);
    if (!a || a.published === false) return null;
    return a;
  } catch (err) {
    console.error("[blog] BabyLoveGrowth article failed:", err?.message);
    return null;
  }
}
