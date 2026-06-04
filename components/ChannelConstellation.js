import ServiceIcon from "@/components/ServiceIcon";

/**
 * ChannelConstellation — the "360° online presence" graphic: a lime hub with
 * the six service channels orbiting on cobalt rings. Pure SVG, on-palette.
 */
const C = 180; // centre
const R = 138; // orbit radius

const NODES = [
  { name: "pin", angle: -90 }, // Google Business Profile
  { name: "search", angle: -30 }, // SEO
  { name: "target", angle: 30 }, // Ads
  { name: "browser", angle: 90 }, // Web
  { name: "social", angle: 150 }, // Social
  { name: "bag", angle: 210 }, // Delivery
];

const pos = (deg) => {
  const r = (deg * Math.PI) / 180;
  return { x: C + R * Math.cos(r), y: C + R * Math.sin(r) };
};

export default function ChannelConstellation() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* concentric rings */}
      <circle cx={C} cy={C} r="170" fill="none" stroke="#2D5BFF" strokeOpacity="0.16" />
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="#2D5BFF"
        strokeOpacity="0.16"
        strokeDasharray="2 7"
      />
      <circle cx={C} cy={C} r="92" fill="none" stroke="#2D5BFF" strokeOpacity="0.1" />

      {/* spokes */}
      {NODES.map((n, i) => {
        const p = pos(n.angle);
        return (
          <line
            key={`spoke-${i}`}
            x1={C}
            y1={C}
            x2={p.x}
            y2={p.y}
            stroke="#2D5BFF"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
        );
      })}

      {/* orbiting channel nodes */}
      {NODES.map((n, i) => {
        const p = pos(n.angle);
        return (
          <g key={`node-${i}`} transform={`translate(${p.x}, ${p.y})`}>
            <circle r="28" fill="#12161d" stroke="#2D5BFF" strokeOpacity="0.4" />
            <g transform="translate(-12, -12)" style={{ color: "#2D5BFF" }}>
              <ServiceIcon name={n.name} size={24} />
            </g>
          </g>
        );
      })}

      {/* lime hub */}
      <circle cx={C} cy={C} r="74" fill="#C6F94E" opacity="0.12" />
      <g className="constellation-hub">
        <circle cx={C} cy={C} r="46" fill="#C6F94E" />
        <circle
          cx={C}
          cy={C}
          r="30"
          fill="none"
          stroke="#0E1117"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <circle cx={C} cy={C} r="6" fill="#0E1117" />
      </g>
    </svg>
  );
}
