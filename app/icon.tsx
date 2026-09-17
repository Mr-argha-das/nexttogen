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
          background: "#1f2554",
          borderRadius: 14,
          border: "2px solid #e8b12a"
        }}
      >
        <div
          style={{
            color: "#e8b12a",
            fontSize: 36,
            fontWeight: 800,
            fontFamily: "serif"
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size }
  );
}
