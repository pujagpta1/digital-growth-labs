import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const sq = (left, top, color) => (
    <div style={{ position: "absolute", left, top, width: 49, height: 49, borderRadius: 11, background: color }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#111111", position: "relative", display: "flex" }}>
        {sq(22, 109, "#FFFFFF")}
        {sq(71, 60, "#FFFFFF")}
        {sq(120, 11, "#C6F94E")}
      </div>
    ),
    size
  );
}
