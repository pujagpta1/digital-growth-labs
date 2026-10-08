import Link from "next/link";
import { notFound } from "next/navigation";
import AuditButton from "@/components/AuditButton";
import CTASection from "@/components/CTASection";
import PostBody from "@/components/PostBody";
import { Faqs } from "@/components/DetailSections";
import { posts, getPost } from "@/lib/posts";
import { getService } from "@/lib/services";
import { baseOpenGraph } from "@/lib/site";
import { JsonLd, faqSchema, postSchema } from "@/lib/schema";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Guides — Digital Growth Labs" };
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

const fmt = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default async function PostPage({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
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
              <span aria-hidden>←</span> All guides
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
            <h2 className="kicker mb-8">More guides</h2>
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
