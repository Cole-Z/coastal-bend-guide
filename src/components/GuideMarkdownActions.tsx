"use client";

import { useEffect, useState } from "react";

export const GUIDE_MARKDOWN_HINT =
  "Planning with ChatGPT, Claude, or another AI assistant? Paste this in.";

interface GuideMarkdownActionsProps {
  markdown: string;
  fileName: string;
  /** Public URL for a published guide. Drafts omit it so the file stays off the site. */
  downloadHref: string | null;
}

function downloadMarkdown(markdown: string, fileName: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function GuideMarkdownActions({ markdown, fileName, downloadHref }: GuideMarkdownActionsProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const linkClass =
    "inline-flex min-h-11 items-center text-sm font-semibold text-ocean underline underline-offset-4";

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <button type="button" className={linkClass} onClick={() => void copyMarkdown()}>
          {copied ? "Copied" : "Copy for AI"}
        </button>
        {downloadHref ? (
          <a
            href={downloadHref}
            download={fileName}
            className={linkClass}
            onClick={process.env.NODE_ENV === "development" ? (event) => {
              event.preventDefault();
              downloadMarkdown(markdown, fileName);
            } : undefined}
          >
            Download .md
          </a>
        ) : (
          <button type="button" className={linkClass} onClick={() => downloadMarkdown(markdown, fileName)}>
            Download .md
          </button>
        )}
      </div>
      <p className="text-sm text-muted">{GUIDE_MARKDOWN_HINT}</p>
    </div>
  );
}
