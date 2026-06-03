/**
 * Reveal — a no-JS wrapper that just tags its children for the central
 * ScrollAnimations engine. Renders on the server; the engine animates it.
 *
 *   <Reveal>            fade up
 *   <Reveal x="left">   slide in from the left
 *   <Reveal y={40} delay={0.1}>
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 30,
  x,
  className = "",
}) {
  return (
    <Tag
      data-anim="reveal"
      data-anim-delay={delay || undefined}
      data-anim-y={y}
      data-anim-x={x || undefined}
      className={`will-change-transform ${className}`}
      style={{ opacity: 0 }}
    >
      {children}
    </Tag>
  );
}
