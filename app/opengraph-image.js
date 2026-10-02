import { ImageResponse } from "next/og";

export const alt = "Digital Growth Labs — local SEO and digital marketing agency in Vancouver, BC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const sq = (left, top, color) => (
    <div style={{ position: "absolute", left, top, width: 52, height: 52, borderRadius: 12, background: color }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative", width: 168, height: 168, display: "flex" }}>
            {sq(12, 104, "#FFFFFF")}
            {sq(64, 52, "#FFFFFF")}
            {sq(116, 0, "#C6F94E")}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>Digital Growth Labs</div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Vancouver · BC</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
            Local SEO, Google Business Profile, ads, websites & delivery apps for local businesses.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#C6F94E" }}>digitalgrowthlabs.ca · Free business audit</div>
        </div>
      </div>
    ),
    size
  );
}
