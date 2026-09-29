import React from "react";
import { LogoMark } from "@/components/Logo";

export type Signatory = {
  name: string;
  title: string;
  signature?: string; // data URL of drawn/uploaded e-signature
};

export type SealCfg = {
  enabled: boolean;
  style: "violet" | "navy" | "gold";
  topText: string;
  bottomText: string;
  centerText: string;
  image?: string; // optional uploaded stamp image (data URL) — overrides built-in
};

export type CertTemplate = "classic" | "modern" | "elegant";
export type CertOrientation = "landscape" | "portrait";

export type CertData = {
  orgName: string;
  title: string;
  presentText: string;
  recipient: string;
  bodyText: string;
  program: string;
  dateText: string;
  certId: string;
  template: CertTemplate;
  accent: string;
  orientation: CertOrientation;
  signatories: Signatory[];
  seal: SealCfg;
};

export const defaultCert: CertData = {
  orgName: "NEXT GEN ACADEMY",
  title: "Certificate of Completion",
  presentText: "This certificate is proudly presented to",
  recipient: "Recipient Name",
  bodyText:
    "for successfully completing the program with dedication, skill and outstanding commitment to excellence.",
  program: "Full-Stack Development Bootcamp",
  dateText: new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }),
  certId: "NG-2026-000001",
  template: "classic",
  accent: "#7857e6",
  orientation: "landscape",
  signatories: [
    { name: "Dr. Ananya Roy", title: "Founder & CEO" },
    { name: "Prof. Kunal Sethi", title: "Chief Academic Officer" }
  ],
  seal: {
    enabled: true,
    style: "violet",
    topText: "NEXT GEN ACADEMY",
    bottomText: "OFFICIAL • CERTIFIED",
    centerText: "VERIFIED"
  }
};

const NAVY = "#141737";
const NAVY_SOFT = "#2e3480";

/* ---------------- Official Seal / e-stamp ---------------- */
export function Seal({
  cfg,
  size = 128,
  accent
}: {
  cfg: SealCfg;
  size?: number;
  accent: string;
}) {
  if (!cfg.enabled) return null;
  if (cfg.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={cfg.image}
        alt="Official stamp"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }
  const ringColor =
    cfg.style === "navy" ? NAVY : cfg.style === "gold" ? "#b8901f" : accent;
  const id = "sealpath";
  const r = 50;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: "block" }}>
      <defs>
        <path
          id={id}
          d={`M60,60 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`}
        />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke={ringColor} strokeWidth="2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke={ringColor} strokeWidth="4" />
      <circle cx="60" cy="60" r="30" fill="none" stroke={ringColor} strokeWidth="1.5" />
      {/* rotating text */}
      <text fill={ringColor} style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "1.5px" }}>
        <textPath href={`#${id}`} startOffset="0%">
          {`  ${cfg.topText}  •  ${cfg.bottomText}  •`}
        </textPath>
      </text>
      {/* star burst */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 60 + Math.cos(a) * 33;
        const y1 = 60 + Math.sin(a) * 33;
        const x2 = 60 + Math.cos(a) * 38;
        const y2 = 60 + Math.sin(a) * 38;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ringColor} strokeWidth="1.5" />;
      })}
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill={ringColor}
        style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1px" }}
      >
        {cfg.centerText}
      </text>
      <text x="60" y="72" textAnchor="middle" fill={ringColor} style={{ fontSize: 6.5, letterSpacing: "1px" }}>
        SINCE 2015
      </text>
    </svg>
  );
}

/* ---------------- Certificate ---------------- */
export default function Certificate({
  data,
  innerRef
}: {
  data: CertData;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const landscape = data.orientation === "landscape";
  const W = landscape ? 1000 : 707;
  const H = landscape ? 707 : 1000;
  const { accent, template } = data;

  const serif = '"Georgia", "Times New Roman", serif';
  const display = '"Space Grotesk", "Inter", sans-serif';

  const bg =
    template === "modern"
      ? "#ffffff"
      : template === "elegant"
      ? "#fbfaf7"
      : "#fcfbf8";

  return (
    <div
      ref={innerRef}
      style={{
        width: W,
        height: H,
        position: "relative",
        background: bg,
        color: NAVY,
        fontFamily: serif,
        overflow: "hidden",
        boxSizing: "border-box"
      }}
    >
      {/* subtle background tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(1000px 500px at 100% -20%, ${accent}14, transparent 60%), radial-gradient(800px 500px at -10% 120%, ${NAVY}0e, transparent 60%)`
        }}
      />

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.05,
          pointerEvents: "none"
        }}
      >
        <LogoMark style={{ width: 480, height: "auto" }} />
      </div>

      {/* Borders */}
      {template === "modern" ? (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 16, background: `linear-gradient(180deg, ${NAVY}, ${accent})` }} />
          <div style={{ position: "absolute", inset: 26, border: `1px solid ${accent}55` }} />
        </>
      ) : (
        <>
          <div style={{ position: "absolute", inset: 22, border: `3px solid ${NAVY}` }} />
          <div style={{ position: "absolute", inset: 30, border: `1px solid ${accent}` }} />
          {/* corner accents */}
          {[
            { top: 14, left: 14 },
            { top: 14, right: 14 },
            { bottom: 14, left: 14 },
            { bottom: 14, right: 14 }
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 34,
                height: 34,
                background: accent,
                transform: "rotate(45deg)",
                ...pos
              }}
            />
          ))}
        </>
      )}

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: landscape ? 54 : 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 2
        }}
      >
        {/* Logo + org */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <LogoMark style={{ height: 34, width: "auto" }} />
          <span style={{ fontFamily: display, fontWeight: 700, fontSize: 20, letterSpacing: "3px", color: NAVY }}>
            NEXT <span style={{ color: accent }}>GEN</span>
          </span>
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: display,
            fontSize: 10,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: NAVY_SOFT
          }}
        >
          {data.orgName}
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: landscape ? 18 : 26,
            fontFamily: serif,
            fontSize: landscape ? 46 : 40,
            fontWeight: 700,
            letterSpacing: "1px",
            color: NAVY,
            lineHeight: 1.05
          }}
        >
          {data.title}
        </div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ height: 2, width: 44, background: accent }} />
          <span style={{ width: 7, height: 7, background: accent, transform: "rotate(45deg)" }} />
          <span style={{ height: 2, width: 44, background: accent }} />
        </div>

        {/* Present text */}
        <div style={{ marginTop: landscape ? 20 : 30, fontSize: 15, fontStyle: "italic", color: NAVY_SOFT }}>
          {data.presentText}
        </div>

        {/* Recipient */}
        <div
          style={{
            marginTop: 8,
            fontFamily: serif,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: landscape ? 52 : 44,
            color: accent,
            lineHeight: 1.1,
            padding: "0 20px"
          }}
        >
          {data.recipient}
        </div>
        <div style={{ marginTop: 6, height: 1.5, width: landscape ? 460 : 380, background: `${NAVY}44` }} />

        {/* Body */}
        <div
          style={{
            marginTop: landscape ? 18 : 26,
            fontSize: 15.5,
            lineHeight: 1.6,
            color: NAVY_SOFT,
            maxWidth: landscape ? 660 : 520
          }}
        >
          {data.bodyText}
        </div>

        {/* Program */}
        <div
          style={{
            marginTop: 12,
            fontFamily: display,
            fontWeight: 700,
            fontSize: landscape ? 22 : 20,
            color: NAVY
          }}
        >
          {data.program}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer: signatures + seal */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20
          }}
        >
          {data.signatories.slice(0, 1).map((s, i) => (
            <SignatureBlock key={i} s={s} accent={accent} align="left" />
          ))}

          {/* Seal center */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 6 }}>
            <Seal cfg={data.seal} accent={accent} size={landscape ? 118 : 104} />
          </div>

          {data.signatories.slice(1, 2).map((s, i) => (
            <SignatureBlock key={i} s={s} accent={accent} align="right" />
          ))}
        </div>

        {/* Cert id + date */}
        <div
          style={{
            marginTop: 14,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: display,
            fontSize: 10,
            letterSpacing: "1px",
            color: NAVY_SOFT
          }}
        >
          <span>Certificate ID: {data.certId}</span>
          <span>Issued: {data.dateText}</span>
        </div>
      </div>
    </div>
  );
}

function SignatureBlock({
  s,
  accent,
  align
}: {
  s: Signatory;
  accent: string;
  align: "left" | "right";
}) {
  return (
    <div style={{ width: 200, textAlign: "center" }}>
      <div style={{ height: 46, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        {s.signature ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.signature} alt="signature" style={{ maxHeight: 46, maxWidth: 180, objectFit: "contain" }} />
        ) : (
          <span style={{ fontFamily: '"Segoe Script","Brush Script MT",cursive', fontSize: 24, color: "#1f2554" }}>
            {s.name}
          </span>
        )}
      </div>
      <div style={{ height: 1.5, width: "100%", background: "#141737", marginTop: 2 }} />
      <div style={{ marginTop: 6, fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: 13, color: "#141737" }}>
        {s.name}
      </div>
      <div style={{ fontSize: 11, color: "#2e3480", marginTop: 1 }}>{s.title}</div>
      <div style={{ marginTop: 3, height: 2, width: 26, background: accent, marginLeft: "auto", marginRight: "auto" }} />
    </div>
  );
}
