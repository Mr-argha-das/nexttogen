/**
 * Chhota, dependency-free markdown renderer.
 * Support: h2/h3, paragraphs, bold, italic, inline code, links, bullet & number lists,
 * blockquote and hr. Content comes from the trusted admin panel, so we still never inject raw HTML.
 */
import React from "react";

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" };

function parse(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      flushList();
      blocks.push({ type: "hr" });
      continue;
    }
    const heading = /^(#{2,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text: heading[2] });
      continue;
    }
    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: trimmed.slice(2) });
      continue;
    }
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "quote", text: trimmed.slice(2) });
      continue;
    }
    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    if (bullet) {
      flushParagraph();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }
    const ordered = /^\d+[.)]\s+(.*)$/.exec(trimmed);
    if (ordered) {
      flushParagraph();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(ordered[1]);
      continue;
    }
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return blocks;
}

/** Inline markdown: **bold**, *italic*, `code`, [text](url) */
export function renderInline(text: string, keyPrefix = "i"): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;

    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[0.88em] font-semibold text-brand-700"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      const href = linkMatch?.[2] ?? "#";
      const external = /^https?:/.test(href);
      nodes.push(
        <a
          key={key}
          href={href}
          className="font-semibold text-brand-700 underline decoration-accent-300 decoration-2 underline-offset-2 transition-colors hover:text-brand-900"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkMatch?.[1] ?? href}
        </a>,
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function Markdown({ content, className = "" }: { content: string; className?: string }) {
  const blocks = parse(content);
  return (
    <div className={`space-y-4 text-[15.5px] leading-[1.85] text-slate-700 ${className}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 flex scroll-mt-28 items-center gap-3 font-heading text-[1.3rem] font-extrabold text-ink sm:text-[1.45rem]"
              >
                <span className="h-6 w-1.5 shrink-0 rounded-full bg-[var(--grad-accent)]" />
                {renderInline(block.text, `h2-${i}`)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-7 font-heading text-[1.08rem] font-bold text-ink">
                {renderInline(block.text, `h3-${i}`)}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="relative rounded-2xl border border-line bg-canvas px-6 py-5 font-medium italic text-ink-soft before:absolute before:inset-y-4 before:left-0 before:w-1 before:rounded-full before:bg-[var(--grad-brand)]"
              >
                {renderInline(block.text, `q-${i}`)}
              </blockquote>
            );
          case "hr":
            return <hr key={i} className="my-8 border-line" />;
          case "ul":
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    <span>{renderInline(item, `ul-${i}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11.5px] font-extrabold text-brand-700">
                      {j + 1}
                    </span>
                    <span>{renderInline(item, `ol-${i}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          default:
            return <p key={i}>{renderInline(block.text, `p-${i}`)}</p>;
        }
      })}
    </div>
  );
}
