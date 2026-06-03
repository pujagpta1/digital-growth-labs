/**
 * ServiceIcon — line icon per service, inherits currentColor.
 */
const PATHS = {
  // Map pin — Google Business Profile
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  // Magnifier + bars — SEO
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
      <path d="M8.5 12.5v-1M11 12.5v-3M13.5 12.5v-2" />
    </>
  ),
  // Bullseye — Ads
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  // Browser window — Web
  browser: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9h17" />
      <path d="M6.5 6.7h.01M9 6.7h.01" />
    </>
  ),
  // Chat bubbles — Social
  social: (
    <>
      <path d="M4 11.5a6.5 6.5 0 0 1 6.5-6.5h1A6.5 6.5 0 0 1 18 11.5 6.5 6.5 0 0 1 11.5 18H7l-3 2.5v-4.2A6.5 6.5 0 0 1 4 11.5Z" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
    </>
  ),
  // Shopping bag — Delivery
  bag: (
    <>
      <path d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4L5.5 8Z" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
    </>
  ),
};

export default function ServiceIcon({ name, className = "", size = 22 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[name] || PATHS.target}
    </svg>
  );
}
