import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/data";

export const alt = "Job-oriented computer courses with placement support";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social share card used by every page that does not define its own image. */
export default async function OpengraphImage() {
  const settings = getSettings();
  const trained = Number(String(settings.studentsTrained).replace(/[^0-9]/g, ""));
  const stats = [
    { value: `${Number.isFinite(trained) && trained ? trained.toLocaleString("en-IN") : settings.studentsTrained}+`, label: "Students trained" },
    { value: `${settings.placementRate}%`, label: "Placement rate" },
    { value: `${settings.averageRating}/5`, label: "Average rating" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #071a3a 0%, #0b2a5b 45%, #123f86 100%)",
          padding: 72,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#f5a623",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#0b2a5b",
            }}
          >
            NG
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{settings.siteName}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.65)" }}>
              {`${settings.city}, ${settings.state}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 30, color: "#f5a623", fontWeight: 700 }}>
            {settings.siteTagline}
          </div>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.1, maxWidth: 940 }}>
            Job-ready computer courses with placement support
          </div>
          <div style={{ fontSize: 25, color: "rgba(255,255,255,0.72)" }}>
            {"Full Stack Development - Python and Data Science - Digital Marketing - Tally with GST - Cyber Security"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 44 }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 40, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800 }}>{settings.phone}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>Free counselling</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
