/**
 * SectionLabel — the small uppercase eyebrow. Emits a pulsing dot + a
 * clip-reveal text span for the central ScrollAnimations engine.
 */
export default function SectionLabel({ children, dark = false, className = "" }) {
  return (
    <div className={`flex justify-center py-16 sm:py-24 ${className}`}>
      <span
        data-anim="label"
        className="inline-flex items-center gap-3"
      >
        <span
          data-label-dot
          className="h-1.5 w-1.5 rounded-full bg-tomato"
          style={{ opacity: 0 }}
          aria-hidden
        />
        <span
          data-label-text
          className={`label ${dark ? "text-white/60" : "text-black/50"}`}
        >
          {children}
        </span>
      </span>
    </div>
  );
}
