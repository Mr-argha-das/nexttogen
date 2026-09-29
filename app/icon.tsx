import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0b22 0%, #141737 100%)",
          borderRadius: 16,
          border: "2px solid rgba(139,116,239,0.5)"
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ color: "#c9cef0", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            N
          </span>
          <span style={{ color: "#8b74ef", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            G
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
