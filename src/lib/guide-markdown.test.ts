import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { realtor } from "@/config/realtor";
import { guideExportFiles, renderGuideMarkdown, renderLlmsTxt } from "@/lib/guide-markdown";
import { getAllGuides, type Guide } from "@/lib/guides";
import { guidePath } from "@/lib/sections";

const site = {
  siteUrl: "https://ccbaylife.com",
  siteName: "CC Bay Life",
  siteDescription: "A local guide to Corpus Christi and the Coastal Bend.",
};

function sampleGuide(overrides: Partial<Guide> = {}): Guide {
  return {
    slug: "padre-island-day",
    title: "A day at Padre Island",
    description: "How to plan the drive and what to bring.",
    section: "beaches",
    date: "2026-11-01",
    updated: "2026-11-14",
    draft: false,
    content: "## The drive\n\nLeave early.",
    ...overrides,
  };
}

describe("renderGuideMarkdown", () => {
  it("includes the title, updated line, canonical URL, body, and realtor contact", () => {
    const markdown = renderGuideMarkdown(sampleGuide(), site, realtor);
    expect(markdown).toContain("# A day at Padre Island");
    expect(markdown).toContain("Updated November 14, 2026");
    expect(markdown).toContain("Canonical page: https://ccbaylife.com/guides/padre-island-day/");
    expect(markdown).toContain("How to plan the drive and what to bring.");
    expect(markdown).toContain("## The drive");
    expect(markdown).toContain("Leave early.");
    expect(markdown).toContain("CC Bay Life");
    expect(markdown).toContain("Kim Zill, Real Estate Salesperson");
    expect(markdown).toContain("Coldwell Banker Pacesetter Steel");
    expect(markdown).toContain("(361) 558-5577");
    expect(markdown).toContain("mytexasdreamhome@gmail.com");
    expect(markdown).toContain(realtor.profileUrl);
    expect(markdown).toContain(realtor.disclosure);
    expect(markdown).not.toContain("Draft:");
  });

  it("omits the date line when the guide has no date and marks drafts", () => {
    const markdown = renderGuideMarkdown(
      sampleGuide({ date: undefined, updated: undefined, draft: true }),
      site,
      realtor,
    );
    expect(markdown).not.toContain("Updated ");
    expect(markdown).not.toContain("last_updated:");
    expect(markdown).toContain("Draft: this page is still being checked.");
  });

  it("quotes titles that contain colons, quotes, and backslashes", () => {
    const markdown = renderGuideMarkdown(
      sampleGuide({ title: 'A "local" guide: bay \\ bridge' }),
      site,
      realtor,
    );
    const parsed = matter(markdown);
    expect(parsed.data.title).toBe('A "local" guide: bay \\ bridge');
    expect(markdown.startsWith("---\n")).toBe(true);
  });

  it("parses front matter that matches every guide", () => {
    const guides = getAllGuides();
    expect(guides.length).toBeGreaterThan(0);
    for (const guide of guides) {
      const markdown = renderGuideMarkdown(guide, site, realtor);
      const parsed = matter(markdown);
      expect(parsed.data).toEqual({
        title: guide.title,
        source: "CC Bay Life",
        canonical_url: `${site.siteUrl}${guidePath(guide.slug)}`,
        last_updated: guide.updated || guide.date,
        content_type: "local-guide",
        location: "Corpus Christi, Texas",
      });
      expect(parsed.content).toContain(`# ${guide.title}`);
      expect(parsed.content).toContain(guide.content.trim());
      expect(parsed.content).toContain("Kim Zill, Real Estate Salesperson");
      expect(markdown.endsWith("\n")).toBe(true);
    }
  });
});

describe("guide exports", () => {
  it("lists published guides in llms.txt and skips draft Markdown files", () => {
    const published = sampleGuide();
    const draft = sampleGuide({
      slug: "still-checking",
      title: "Still checking",
      draft: true,
      section: "food",
    });
    const files = guideExportFiles([published, draft], site, realtor);
    const paths = files.map((file) => file.relativePath);
    expect(paths).toContain("llms.txt");
    expect(paths).toContain("guides/padre-island-day.md");
    expect(paths).not.toContain("guides/still-checking.md");

    const llms = files.find((file) => file.relativePath === "llms.txt")?.body ?? "";
    expect(llms).toContain("# CC Bay Life");
    expect(llms).toContain("https://ccbaylife.com/guides/padre-island-day.md");
    expect(llms).not.toContain("still-checking");
    expect(renderLlmsTxt([draft], site)).not.toContain(".md");
  });
});
