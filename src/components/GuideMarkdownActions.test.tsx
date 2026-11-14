import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GUIDE_MARKDOWN_HINT, GuideMarkdownActions } from "@/components/GuideMarkdownActions";

describe("GuideMarkdownActions", () => {
  it("shows the copy control, a download link, and the hint", () => {
    const html = renderToStaticMarkup(
      <GuideMarkdownActions
        markdown="# Guide"
        fileName="padre-island-day.md"
        downloadHref="/guides/padre-island-day.md"
      />,
    );
    expect(html).toContain("Copy for AI");
    expect(html).toContain('href="/guides/padre-island-day.md"');
    expect(html).toContain('download="padre-island-day.md"');
    expect(html).toContain("Download .md");
    expect(html).toContain(GUIDE_MARKDOWN_HINT);
  });

  it("keeps a draft download off a public URL", () => {
    const html = renderToStaticMarkup(
      <GuideMarkdownActions markdown="# Draft" fileName="still-checking.md" downloadHref={null} />,
    );
    expect(html).toContain("Download .md");
    expect(html).not.toContain('href="');
    expect(html).toContain(GUIDE_MARKDOWN_HINT);
  });
});
