import Reveal from "@/components/Reveal";

/* Long-form sections shared by /services/[slug] and /industries/[slug]. */

export function CardGrid({ kicker, title, items, tone = "bg-[#F6F6F2]" }) {
  if (!items?.length) return null;
  return (
    <section className={`${tone} border-t border-black/10 py-24 sm:py-28`}>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-3">{kicker}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-md mb-14 max-w-[22ch] text-black">{title}</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="rounded-3xl border border-black/10 bg-white/60 p-7">
              <h3 className="mb-2 text-lg font-bold tracking-tight text-black">{it.title}</h3>
              <p className="text-sm leading-relaxed text-black/65">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps({ kicker = "How it works", title, steps }) {
  if (!steps?.length) return null;
  return (
    <section className="border-t border-black/10 bg-[#EFEFE9] py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-3">{kicker}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-md mb-14 max-w-[22ch] text-black">{title}</h2>
        </Reveal>
        <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5">
              <span className="num shrink-0 pt-1 text-lg text-[#2D5BFF]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-black">{s.title}</h3>
                <p className="text-sm leading-relaxed text-black/65">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Prose({ kicker, title, paragraphs }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="border-t border-black/10 bg-parchment py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="kicker mb-3">{kicker}</p>
          <h2 className="display-md max-w-[16ch] text-black">{title}</h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-black/70 sm:text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faqs({ title = "Frequently asked questions", faqs }) {
  if (!faqs?.length) return null;
  return (
    <section className="border-t border-black/10 bg-[#F6F6F2] py-24 sm:py-28">
      <div className="mx-auto max-w-[960px] px-5 sm:px-8">
        <p className="kicker mb-3">FAQ</p>
        <h2 className="display-md mb-12 text-black">{title}</h2>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary
                data-cursor="link"
                className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-bold tracking-tight text-black [&::-webkit-details-marker]:hidden"
              >
                <h3 className="text-lg font-bold tracking-tight">{f.q}</h3>
                <span aria-hidden className="mt-1 text-2xl leading-none text-[#2D5BFF] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-[70ch] text-base leading-relaxed text-black/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
