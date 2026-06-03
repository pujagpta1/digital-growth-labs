/**
 * Marquee — infinite horizontal scroll of items with a star separator.
 * Pure CSS animation (paused under prefers-reduced-motion via globals.css).
 */
const Star = () => (
  <svg
    className="text-tomato"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2l2.6 6.3L21 9l-5 4.3L17.5 21 12 17.2 6.5 21 8 13.3 3 9l6.4-.7z" />
  </svg>
);

export default function Marquee({ items }) {
  return (
    <div className="marquee">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy} aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="mx-8 inline-flex items-center gap-3 text-sm font-medium tracking-wide text-white/60"
              >
                <Star />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
