// BabyLoveGrowth articles, read server-side and shown on /blog next to our hand-written guides.
// Needs BABYLOVEGROWTH_BLOG_API_KEY (server-only — never prefix it with NEXT_PUBLIC_).
// With no key set, these return empty results so the guides still render.
//
// The BLG API allows max 2 requests/second per key. A build renders every blog page in parallel,
// so requests are queued (one every ~600ms), retried on 429, and de-duplicated in memory.
// On a real API failure we THROW instead of returning "not found": during a build that keeps the
// previous deployment live, and during background revalidation Next keeps serving the old page.
import { BlogClient } from "babylovegrowth-next-js-blog";

export const BLG_REVALIDATE = 3600; // pick up newly published articles within an hour

const MIN_GAP_MS = 600;
const MAX_RETRIES = 5;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let queue = Promise.resolve();
let lastStart = 0;

// Serialises every request to the BLG API and retries rate-limited ones with backoff.
function throttledFetch(url, init) {
  const run = async () => {
    for (let attempt = 0; ; attempt++) {
      const wait = lastStart + MIN_GAP_MS - Date.now();
      if (wait > 0) await sleep(wait);
      lastStart = Date.now();
      const res = await fetch(url, init);
      if (res.status !== 429 || attempt >= MAX_RETRIES) return res;
      const retryAfter = Number(res.headers.get("retry-after"));
      await sleep(retryAfter > 0 ? retryAfter * 1000 : 1000 * (attempt + 1));
    }
  };
  const p = queue.then(run, run);
  queue = p.catch(() => {});
  return p;
}

let client = null;
function getClient() {
  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) return null;
  if (!client) {
    client = new BlogClient({
      apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
      baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL,
      revalidate: BLG_REVALIDATE,
      fetch: throttledFetch,
    });
  }
  return client;
}

// Short in-memory cache so one build/revalidation doesn't ask for the same thing twice.
const MEMO_MS = 60_000;
const memo = new Map();
function memoize(key, fn) {
  const hit = memo.get(key);
  if (hit && Date.now() - hit.at < MEMO_MS) return hit.p;
  const p = fn();
  memo.set(key, { at: Date.now(), p });
  p.catch(() => memo.delete(key)); // don't cache failures
  return p;
}

const toDate = (iso) => (iso ? String(iso).slice(0, 10) : "");

// Normalised to the same shape the blog index uses for guides.
function toCard(a) {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || a.meta_description || "",
    date: toDate(a.published_at || a.created_at),
    category: "Article",
    image: a.hero_image_url || null,
    source: "blg",
  };
}

function listAll(c) {
  return memoize("all", () => c.getAllArticles());
}

export async function getBlgArticles() {
  const c = getClient();
  if (!c) return [];
  const list = await listAll(c);
  return list.filter((a) => a.published !== false).map(toCard);
}

export async function getBlgArticle(slug) {
  const c = getClient();
  if (!c) return null;
  return memoize(`slug:${slug}`, async () => {
    let a = await c.getArticleBySlug(slug);
    // Fallback: if the by-slug lookup comes back empty but the article is in the list, fetch by id.
    if (!a) {
      const match = (await listAll(c)).find((x) => x.slug === slug);
      if (match) a = await c.getArticleById(match.id);
    }
    if (!a || a.published === false) return null;
    return a;
  });
}
