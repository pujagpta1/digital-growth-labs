import Link from "next/link";

// Inline: **bold** and [text](url). Internal links use next/link.
function Inline({ text }) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k++} className="font-semibold text-black">{m[1]}</strong>);
    else {
      const href = m[3];
      const cls = "text-[#2D5BFF] underline underline-offset-2 hover:text-tomato";
      parts.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href} className={cls} data-cursor="link">{m[2]}</Link>
        ) : (
          <a key={k++} href={href} target="_blank" rel="noopener" className={cls} data-cursor="link">{m[2]}</a>
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function PostBody({ blocks }) {
  return (
    <div className="space-y-6 text-[1.05rem] leading-relaxed text-black/75">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} className="pt-6 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="pt-2 text-xl font-bold tracking-tight text-black">{b.text}</h3>;
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-3 pl-6 marker:text-[#2D5BFF]">
                {b.items.map((t, j) => <li key={j}><Inline text={t} /></li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-3 pl-6 marker:font-bold marker:text-[#2D5BFF]">
                {b.items.map((t, j) => <li key={j}><Inline text={t} /></li>)}
              </ol>
            );
          case "tip":
            return (
              <aside key={i} className="rounded-2xl border border-[#2D5BFF]/20 bg-[#E4EAFF]/60 p-5 text-base">
                <strong className="mb-1 block text-black">Good to know</strong>
                <Inline text={b.text} />
              </aside>
            );
          default:
            return <p key={i}><Inline text={b.text} /></p>;
        }
      })}
    </div>
  );
}
