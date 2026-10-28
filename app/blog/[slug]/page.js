import Link from "next/link";
import { notFound } from "next/navigation";
import AuditButton from "@/components/AuditButton";
import CTASection from "@/components/CTASection";
import PostBody from "@/components/PostBody";
import { Faqs } from "@/components/DetailSections";
import { posts, getPost } from "@/lib/posts";
import { getBlgArticles, getBlgArticle } from "@/lib/blg";
import { getService } from "@/lib/services";
import { baseOpenGraph, SITE_URL } from "@/lib/site";
import { JsonLd, faqSchema, postSchema } from "@/lib/schema";

export const revalidate = 3600;

export async function generateStaticParams() {
  const guideSlugs = posts.map((p) => p.slug);
  const articleSlugs = (await getBlgArticles()).map((a) => a.slug).filter((s) => !guideSlugs.includes(s));
  return [...guideSlugs, ...articleSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) {
    const a = await getBlgArticle(slug);
    if (!a) return { title: "Blog — Digital Growth Labs" };
    const url = `/blog/${a.slug}`;
    return {
      title: a.title,
      description: a.meta_description,
      alternates: { canonical: url },
      openGraph: {
        ...baseOpenGraph,
        type: "article",
        title: a.title,
        description: a.meta_description,
        url,
        ...(a.hero_image_url ? { images: [{ url: a.hero_image_url }] } : {}),
        publishedTime: a.published_at,
        modifiedTime: a.updated_at,
      },
    };
  }
  const url = `/blog/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      title: p.seoTitle,
      description: p.description,
      url,
      publishedTime: p.date,
      modifiedTime: p.updated || p.date,
    },
  };
}

const fmtIso = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }) : "";

const fmt = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default async function PostPage({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) {
    const a = await getBlgArticle(slug);
    if (!a) notFound();
    return <ArticlePage a={a} />;
  }
  const svc = getService(p.service);
  const others = posts.filter((o) => o.slug !== slug);

  return (
    <main>
      <JsonLd data={postSchema(p)} />
      <JsonLd data={faqSchema(p.faqs)} />

      <article>
        <header className="relative overflow-hidden bg-gradient-to-b from-parchment to-[#E4EAFF]">
          <div className="hero-atmos" aria-hidden>
            <div className="hero-glow" />
            <div className="hero-grid" />
          </div>
          <div className="relative z-10 mx-auto max-w-[860px] px-5 pb-14 pt-36 sm:px-8 lg:pt-40">
            <Link href="/blog" data-cursor="link" className="label mb-8 inline-flex items-center gap-2 text-black/50 hover:text-tomato">
              <span aria-hidden>←</span> All articles
            </Link>
            <p className="kicker mb-5">{p.category}</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl">{p.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-black/70">{p.description}</p>
            <p className="mt-6 text-sm text-black/50">
              By Digital Growth Labs · <time dateTime={p.date}>{fmt(p.date)}</time> · {p.readMinutes} min read
            </p>
          </div>
        </header>

        <div className="bg-parchment py-16 sm:py-20">
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <PostBody blocks={p.blocks} />

            {svc && (
              <div className="mt-14 rounded-3xl border border-black/10 bg-white/70 p-7">
                <p className="kicker mb-2">Want it done for you?</p>
                <p className="mb-5 text-base leading-relaxed text-black/70">
                  We handle this for local businesses across Metro Vancouver and Vancouver Island as part of our{" "}
                  <Link href={`/services/${svc.slug}`} className="text-[#2D5BFF] underline underline-offset-2">{svc.title}</Link> service.
                </p>
                <AuditButton className="btn-red !px-7 !py-3.5 !text-sm">
                  <span>Book a free audit</span>
                </AuditButton>
              </div>
            )}

            {p.sources?.length > 0 && (
              <div className="mt-14 border-t border-black/10 pt-8">
                <h2 className="label mb-4 text-black/50">Sources</h2>
                <ul className="space-y-2 text-sm">
                  {p.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener" className="text-black/65 underline underline-offset-2 hover:text-[#2D5BFF]">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>

      <Faqs title="Quick answers" faqs={p.faqs} />

      {others.length > 0 && (
        <section className="border-t border-black/10 bg-[#EFEFE9] py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="kicker mb-8">More from the blog</h2>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/blog/${o.slug}`} data-cursor="link"
                  className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black/80 hover:border-[#2D5BFF] hover:text-[#2D5BFF]">
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </main>
  );
}

// Articles published from BabyLoveGrowth (HTML body), styled to match the guides.
async function ArticlePage({ a }) {
  const url = `${SITE_URL}/blog/${a.slug}`;
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: a.title, item: url },
    ],
  };
  const others = [...posts.map((o) => ({ slug: o.slug, title: o.title })), ...(await getBlgArticles())]
    .filter((o) => o.slug !== a.slug)
    .slice(0, 8);

  return (
    <main>
      {a.jsonLd && <JsonLd data={a.jsonLd} />}
      {a.faqJsonLd && <JsonLd data={a.faqJsonLd} />}
      <JsonLd data={crumbs} />

      <article>
        <header className="relative overflow-hidden bg-gradient-to-b from-parchment to-[#E4EAFF]">
          <div className="hero-atmos" aria-hidden>
            <div className="hero-glow" />
            <div className="hero-grid" />
          </div>
          <div className="relative z-10 mx-auto max-w-[860px] px-5 pb-14 pt-36 sm:px-8 lg:pt-40">
            <Link href="/blog" data-cursor="link" className="label mb-8 inline-flex items-center gap-2 text-black/50 hover:text-tomato">
              <span aria-hidden>←</span> All articles
            </Link>
            <p className="kicker mb-5">Article</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl">{a.title}</h1>
            {a.meta_description && <p className="mt-6 text-lg leading-relaxed text-black/70">{a.meta_description}</p>}
            <p className="mt-6 text-sm text-black/50">
              By Digital Growth Labs · <time dateTime={a.published_at}>{fmtIso(a.published_at)}</time>
            </p>
          </div>
        </header>

        <div className="bg-parchment py-16 sm:py-20">
          <div className="mx-auto max-w-[760px] px-5 sm:px-8">
            <div className="blg-content" dangerouslySetInnerHTML={{ __html: a.content_html }} />

            <div className="mt-14 rounded-3xl border border-black/10 bg-white/70 p-7">
              <p className="kicker mb-2">Want it done for you?</p>
              <p className="mb-5 text-base leading-relaxed text-black/70">
                We handle local marketing for businesses across Metro Vancouver and Vancouver Island. Start with a free audit of your online presence.
              </p>
              <AuditButton className="btn-red !px-7 !py-3.5 !text-sm">
                <span>Book a free audit</span>
              </AuditButton>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-black/10 bg-[#EFEFE9] py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="kicker mb-8">More from the blog</h2>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/blog/${o.slug}`} data-cursor="link"
                  className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black/80 hover:border-[#2D5BFF] hover:text-[#2D5BFF]">
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </main>
  );
}
