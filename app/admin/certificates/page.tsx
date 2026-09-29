"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  Award,
  Download,
  FileImage,
  FileText,
  RotateCcw,
  Upload,
  PenLine,
  X,
  Palette,
  Loader2,
  Sparkles
} from "lucide-react";
import { useSiteData } from "@/lib/siteData";
import Certificate, {
  CertData,
  defaultCert,
  Signatory
} from "@/components/Certificate";
import SignaturePad from "@/components/SignaturePad";

const ACCENTS = ["#7857e6", "#5c67cf", "#8b74ef", "#3b429e", "#b8901f", "#0ea5a3", "#e11d6b"];

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function genId() {
  const y = new Date().getFullYear();
  const n = Math.floor(100000 + Math.random() * 900000);
  return `NG-${y}-${n}`;
}

export default function CertificatesPage() {
  const { data: site } = useSiteData();
  const [cert, setCert] = useState<CertData>(defaultCert);
  const [busy, setBusy] = useState<"" | "png" | "pdf">("");
  const [scale, setScale] = useState(0.6);
  const [drawFor, setDrawFor] = useState<number | null>(null);

  const certRef = useRef<HTMLDivElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);

  const W = cert.orientation === "landscape" ? 1000 : 707;
  const H = cert.orientation === "landscape" ? 707 : 1000;

  // Fit preview to available width
  useEffect(() => {
    const el = previewWrapRef.current;
    if (!el) return;
    const update = () => {
      const avail = el.clientWidth - 4;
      setScale(Math.min(1, avail / W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [W]);

  const set = <K extends keyof CertData>(k: K, v: CertData[K]) =>
    setCert((c) => ({ ...c, [k]: v }));

  const setSig = (i: number, patch: Partial<Signatory>) =>
    setCert((c) => ({
      ...c,
      signatories: c.signatories.map((s, idx) => (idx === i ? { ...s, ...patch } : s))
    }));

  const filename = useMemo(
    () =>
      `${cert.recipient || "certificate"}-${cert.certId}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    [cert.recipient, cert.certId]
  );

  async function render(): Promise<string> {
    const node = certRef.current!;
    // give fonts a tick
    if ((document as any).fonts?.ready) {
      try {
        await (document as any).fonts.ready;
      } catch {}
    }
    return toPng(node, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
      width: W,
      height: H
    });
  }

  async function downloadPng() {
    try {
      setBusy("png");
      const url = await render();
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.png`;
      a.click();
    } catch (e) {
      alert("Could not export PNG. Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function downloadPdf() {
    try {
      setBusy("pdf");
      const url = await render();
      const landscape = cert.orientation === "landscape";
      const pdf = new jsPDF({ orientation: landscape ? "landscape" : "portrait", unit: "pt", format: "a4" });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      pdf.addImage(url, "PNG", 0, 0, pw, ph);
      pdf.save(`${filename}.pdf`);
    } catch (e) {
      alert("Could not export PDF. Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function uploadSig(i: number, file?: File) {
    if (!file) return;
    setSig(i, { signature: await readFileAsDataURL(file) });
  }
  async function uploadStamp(file?: File) {
    if (!file) return;
    set("seal", { ...cert.seal, image: await readFileAsDataURL(file) });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mono-label">Certificate Studio</p>
          <h2 className="heading text-3xl md:text-4xl mt-2">
            Design & issue <span className="heading-italic">certificates.</span>
          </h2>
          <p className="text-ink-600 mt-2 max-w-2xl">
            Create branded certificates, add an e-signature and official e-stamp, then export a
            print-ready PNG or PDF — all in the browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCert({ ...defaultCert, certId: genId() })} className="btn-outline">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button onClick={downloadPng} disabled={!!busy} className="btn-outline">
            {busy === "png" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileImage className="h-4 w-4" />} PNG
          </button>
          <button onClick={downloadPdf} disabled={!!busy} className="btn-primary">
            {busy === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />} Download PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* PREVIEW */}
        <div className="order-2 xl:order-1">
          <div className="rounded-2xl border border-white/[0.08] bg-ink-100/70 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="mono-label">Live preview</span>
              <span className="text-xs text-ink-500 font-mono">{W} × {H}px · A4</span>
            </div>
            <div ref={previewWrapRef} className="w-full overflow-hidden flex justify-center">
              <div style={{ width: W * scale, height: H * scale }}>
                <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: W, height: H }}>
                  <div className="shadow-2xl">
                    <Certificate data={cert} innerRef={certRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="order-1 xl:order-2 space-y-5">
          {/* Design */}
          <Section icon={<Palette className="h-4 w-4" />} title="Design">
            <Field label="Template">
              <select className="field text-sm" value={cert.template} onChange={(e) => set("template", e.target.value as CertData["template"])}>
                <option value="classic">Classic (bordered)</option>
                <option value="elegant">Elegant</option>
                <option value="modern">Modern (side bar)</option>
              </select>
            </Field>
            <Field label="Orientation">
              <div className="grid grid-cols-2 gap-2">
                {(["landscape", "portrait"] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => set("orientation", o)}
                    className={`rounded-xl border px-3 py-2 text-sm capitalize transition ${
                      cert.orientation === o
                        ? "border-gold-400/60 bg-gold-400/10 text-white"
                        : "border-white/10 text-ink-600 hover:text-white"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Accent color">
              <div className="flex items-center gap-2 flex-wrap">
                {ACCENTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => set("accent", a)}
                    className={`h-7 w-7 rounded-full border-2 transition ${cert.accent === a ? "border-white scale-110" : "border-white/20"}`}
                    style={{ background: a }}
                    aria-label={a}
                  />
                ))}
                <input type="color" value={cert.accent} onChange={(e) => set("accent", e.target.value)} className="h-7 w-9 rounded bg-transparent cursor-pointer" />
              </div>
            </Field>
          </Section>

          {/* Details */}
          <Section icon={<Sparkles className="h-4 w-4" />} title="Details">
            <Field label="Organization">
              <input className="field text-sm" value={cert.orgName} onChange={(e) => set("orgName", e.target.value)} />
            </Field>
            <Field label="Certificate title">
              <input className="field text-sm" value={cert.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Recipient name">
              <input className="field text-sm" value={cert.recipient} onChange={(e) => set("recipient", e.target.value)} placeholder="e.g. Aarav Sharma" />
            </Field>
            <Field label="Presented-to line">
              <input className="field text-sm" value={cert.presentText} onChange={(e) => set("presentText", e.target.value)} />
            </Field>
            <Field label="Body text">
              <textarea className="field text-sm" rows={3} value={cert.bodyText} onChange={(e) => set("bodyText", e.target.value)} />
            </Field>
            <Field label="Program / Course">
              <input className="field text-sm" list="course-list" value={cert.program} onChange={(e) => set("program", e.target.value)} />
              <datalist id="course-list">
                {site?.courses?.map((c: any) => <option key={c.slug} value={c.title} />)}
              </datalist>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Issue date">
                <input
                  type="date"
                  className="field text-sm"
                  onChange={(e) => {
                    const d = e.target.value ? new Date(e.target.value) : new Date();
                    set("dateText", d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }));
                  }}
                />
              </Field>
              <Field label="Certificate ID">
                <div className="flex gap-1.5">
                  <input className="field text-sm" value={cert.certId} onChange={(e) => set("certId", e.target.value)} />
                  <button onClick={() => set("certId", genId())} className="rounded-xl border border-white/10 px-2 text-xs text-ink-600 hover:text-white shrink-0" title="Generate ID">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </Field>
            </div>
          </Section>

          {/* Signatories */}
          <Section icon={<PenLine className="h-4 w-4" />} title="Signatories & e-signatures">
            {cert.signatories.map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input className="field text-sm" value={s.name} onChange={(e) => setSig(i, { name: e.target.value })} placeholder="Name" />
                  <input className="field text-sm" value={s.title} onChange={(e) => setSig(i, { title: e.target.value })} placeholder="Title" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                    {s.signature ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.signature} alt="signature" className="max-h-11 max-w-full object-contain bg-white rounded" />
                    ) : (
                      <span className="text-xs text-ink-500">No signature — auto script will be used</span>
                    )}
                  </div>
                  {s.signature && (
                    <button onClick={() => setSig(i, { signature: undefined })} className="text-ink-500 hover:text-red-300" title="Remove">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDrawFor(drawFor === i ? null : i)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-ink-700 hover:text-white hover:border-gold-400/50 transition"
                  >
                    <PenLine className="h-3.5 w-3.5" /> {drawFor === i ? "Close pad" : "Draw"}
                  </button>
                  <label className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-ink-700 hover:text-white hover:border-gold-400/50 transition cursor-pointer">
                    <Upload className="h-3.5 w-3.5" /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadSig(i, e.target.files?.[0])} />
                  </label>
                </div>

                {drawFor === i && (
                  <SignaturePad
                    onSave={(url) => {
                      setSig(i, { signature: url });
                      setDrawFor(null);
                    }}
                  />
                )}
              </div>
            ))}
          </Section>

          {/* Seal / e-stamp */}
          <Section icon={<Award className="h-4 w-4" />} title="Official e-stamp / seal">
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={cert.seal.enabled} onChange={(e) => set("seal", { ...cert.seal, enabled: e.target.checked })} className="accent-[#7857e6] h-4 w-4" />
              Show official seal
            </label>

            {cert.seal.enabled && (
              <>
                <Field label="Seal style">
                  <div className="grid grid-cols-3 gap-2">
                    {(["violet", "navy", "gold"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => set("seal", { ...cert.seal, style: st })}
                        className={`rounded-xl border px-3 py-2 text-sm capitalize transition ${
                          cert.seal.style === st ? "border-gold-400/60 bg-gold-400/10 text-white" : "border-white/10 text-ink-600 hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="grid grid-cols-1 gap-2">
                  <input className="field text-sm" value={cert.seal.topText} onChange={(e) => set("seal", { ...cert.seal, topText: e.target.value })} placeholder="Top text" />
                  <div className="grid grid-cols-2 gap-2">
                    <input className="field text-sm" value={cert.seal.centerText} onChange={(e) => set("seal", { ...cert.seal, centerText: e.target.value })} placeholder="Center" />
                    <input className="field text-sm" value={cert.seal.bottomText} onChange={(e) => set("seal", { ...cert.seal, bottomText: e.target.value })} placeholder="Bottom text" />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <label className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-ink-700 hover:text-white hover:border-gold-400/50 transition cursor-pointer">
                    <Upload className="h-3.5 w-3.5" /> Upload custom stamp
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadStamp(e.target.files?.[0])} />
                  </label>
                  {cert.seal.image && (
                    <button onClick={() => set("seal", { ...cert.seal, image: undefined })} className="text-xs text-ink-500 hover:text-red-300 inline-flex items-center gap-1">
                      <X className="h-3.5 w-3.5" /> Remove custom
                    </button>
                  )}
                </div>
              </>
            )}
          </Section>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-ink-500 leading-relaxed flex gap-2">
            <Download className="h-4 w-4 shrink-0 text-gold-300" />
            <span>
              Exports render at 2× resolution (print-ready). PDF is generated at true A4 size.
              Signatures &amp; stamps are embedded directly into the file.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-ink-100/70 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300">{icon}</span>
        <h3 className="font-display font-semibold text-ink-900">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mono-label mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
