/**
 * Parallax — no-JS wrapper that tags a depth block for the engine to drift
 * on scroll. `speed` is the px travel across the parent's scroll range.
 */
export default function Parallax({ children, speed = 120, className = "" }) {
  return (
    <div
      data-anim="parallax"
      data-anim-speed={speed}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
