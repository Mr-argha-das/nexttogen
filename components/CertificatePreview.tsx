"use client";

import { useEffect, useRef, useState } from "react";
import Certificate, { CertData, defaultCert } from "@/components/Certificate";

/**
 * Responsive, non-interactive certificate preview that auto-scales to its
 * container width. Used for public marketing showcases.
 */
export default function CertificatePreview({
  data,
  className,
  maxWidth = 1000
}: {
  data?: Partial<CertData>;
  className?: string;
  maxWidth?: number;
}) {
  const cert: CertData = { ...defaultCert, ...data } as CertData;
  const W = cert.orientation === "landscape" ? 1000 : 707;
  const H = cert.orientation === "landscape" ? 707 : 1000;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(maxWidth, el.clientWidth) / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [W, maxWidth]);

  return (
    <div ref={wrapRef} className={className}>
      <div style={{ width: "100%", height: H * scale }}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: W,
            height: H
          }}
          className="rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10"
        >
          <Certificate data={cert} />
        </div>
      </div>
    </div>
  );
}
