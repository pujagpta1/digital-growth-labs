/**
 * Logo — Digital Growth Labs staircase mark.
 * The two base squares use currentColor so the mark stays visible on both
 * light and dark backgrounds; the accent square keeps the brand lime.
 */
export default function Logo({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Digital Growth Labs"
    >
      <rect x="6" y="29" width="13" height="13" rx="3" fill="currentColor" />
      <rect x="19" y="16" width="13" height="13" rx="3" fill="currentColor" />
      <rect x="32" y="3" width="13" height="13" rx="3" fill="#C6F94E" />
    </svg>
  );
}
