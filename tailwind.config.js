/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Style guide palette
        parchment: "#F6F6F2", // Paper — default light ground
        paper: "#F6F6F2",
        sunk: "#EFEFE9", // Sunk surface
        ink: "#0E1117", // Ink — primary dark
        tomato: "#2D5BFF", // legacy token name → Cobalt (everyday accent: links/labels/data)
        cobalt: "#2D5BFF",
        lime: "#C6F94E", // hero accent (CTAs / focal — ink text on lime)
        "lime-soft": "#EAFBC2",
        "cobalt-soft": "#E4EAFF",
        positive: "#18C964",
        warning: "#F5A623",
        danger: "#FF4D4D",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
        hand: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.02em",
        label: "0.15em",
      },
      fontSize: {
        display: ["clamp(3.25rem, 13vw, 13rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};
