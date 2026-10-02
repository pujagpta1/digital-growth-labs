/**
 * ServiceIcon — line icon per service, inherits currentColor.
 */
const PATHS = {
  // Trophy — sports academies
  trophy: (
    <>
      <path d="M8 4.5h8v4a4 4 0 0 1-8 0v-4Z" />
      <path d="M8 6H5.5a2.5 2.5 0 0 0 2.6 3M16 6h2.5a2.5 2.5 0 0 1-2.6 3" />
      <path d="M12 12.5V16M8.5 19.5h7M9.5 19.5 10 16h4l.5 3.5" />
    </>
  ),
  // Sparkle — med spas
  sparkle: (
    <>
      <path d="M12 3.5 13.8 10 20 12l-6.2 2L12 20.5 10.2 14 4 12l6.2-2L12 3.5Z" />
    </>
  ),
  // Tooth — dental
  tooth: (
    <>
      <path d="M7.5 4.5c1.7 0 2.6 1 4.5 1s2.8-1 4.5-1c2.2 0 3.5 2 3 4.8-.4 2.2-1.3 3.4-1.7 5.6-.4 2.4-.8 5.6-2.3 5.6-1.6 0-1.6-4.5-3.5-4.5s-1.9 4.5-3.5 4.5c-1.5 0-1.9-3.2-2.3-5.6-.4-2.2-1.3-3.4-1.7-5.6-.5-2.8.8-4.8 3-4.8Z" />
    </>
  ),
  // Car — auto
  car: (
    <>
      <path d="M4 15.5v-3l2-4.5a2 2 0 0 1 1.8-1.2h8.4A2 2 0 0 1 18 8l2 4.5v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
      <path d="M4 12.5h16" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <circle cx="16.5" cy="16.5" r="1.5" />
    </>
  ),
  // House — home improvement
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9v10.5h12V9" />
      <path d="M10 19.5v-5h4v5" />
    </>
  ),
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
