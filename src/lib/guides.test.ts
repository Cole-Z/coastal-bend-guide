import { describe, expect, it } from "vitest";
import { formatDate, guideUpdatedLabel } from "@/lib/dates";
import { getAllGuides, parseGuide, publishedGuides } from "@/lib/guides";

const RAW = `---
title: "Hello coast"
description: "A sample outline"
section: beaches
date: 2026-11-14
updated: 2026-11-20
draft: true
---

Draft placeholder body.
`;

describe("parseGuide", () => {
  it("parses frontmatter, including YAML dates", () => {
    const guide = parseGuide("hello-coast.mdx", RAW);
    expect(guide.slug).toBe("hello-coast");
    expect(guide.section).toBe("beaches");
    expect(guide.date).toBe("2026-11-14");
    expect(guide.updated).toBe("2026-11-20");
    expect(guide.draft).toBe(true);
    expect(guide.content).toContain("Draft placeholder");
  });

  it("accepts older source-free guides and validates nested source entries", () => {
    expect(parseGuide("old-guide.mdx", RAW).sources).toEqual([]);
    const sources = (url: string, checked: string, note = "") =>
      RAW.replace(/draft: true/, `draft: true
sources:
  - label: "Park conditions"
    url: "${url}"
    checked: "${checked}"${note}`);

    expect(parseGuide("park.mdx", sources("https://www.nps.gov/", "2026-11-22")).sources)
      .toEqual([{ label: "Park conditions", url: "https://www.nps.gov/", checked: "2026-11-22" }]);
    expect(() => parseGuide("park.mdx", sources("/relative", "2026-11-22"))).toThrow(/sources.0.url/);
    expect(() => parseGuide("park.mdx", sources("http://www.nps.gov/", "2026-11-22"))).toThrow(/sources.0.url/);
    expect(() => parseGuide("park.mdx", sources("https://www.nps.gov/", "2026-02-30"))).toThrow(/sources.0.checked/);
    expect(() => parseGuide("park.mdx", sources("https://www.nps.gov/", "2026-11-22", "\n    confidence: internal")))
      .toThrow(/confidence/);
  });

  it("rejects a guide that is missing a title or uses an unknown section", () => {
    expect(() => parseGuide("bad.mdx", "---\nsection: beaches\n---\n")).toThrow(/invalid frontmatter/);
    expect(() =>
      parseGuide(
        "bad.mdx",
        RAW.replace("section: beaches", "section: downtown"),
      ),
    ).toThrow(/invalid frontmatter/);
  });
});

describe("publishedGuides", () => {
  it("drops drafts", () => {
    const draft = parseGuide("hello-coast.mdx", RAW);
    const published = parseGuide("hello-coast.mdx", RAW.replace("draft: true", "draft: false"));
    expect(publishedGuides([draft, published]).map((guide) => guide.draft)).toEqual([false]);
  });
});

describe("sample guides", () => {
  it("publishes the guide inventory and keeps the orientation outlines as drafts", () => {
    const guides = getAllGuides();
    expect(guides.map((guide) => guide.slug).sort()).toEqual([
      "beaches-orientation",
      "best-local-restaurants-corpus-christi",
      "boat-tours-fishing-charters-piers-corpus-christi",
      "corpus-christi-nightlife",
      "corpus-christi-weekend-itinerary",
      "family-things-to-do-corpus-christi",
      "fishing-orientation",
      "neighborhoods-orientation",
      "padre-island-national-seashore-day-trip",
      "selena-corpus-christi-mirador-de-la-flor",
      "things-to-do-orientation",
      "uss-lexington-museum-visit",
    ]);
    const published = new Set([
      "best-local-restaurants-corpus-christi",
      "boat-tours-fishing-charters-piers-corpus-christi",
      "corpus-christi-nightlife",
      "corpus-christi-weekend-itinerary",
      "family-things-to-do-corpus-christi",
      "padre-island-national-seashore-day-trip",
      "selena-corpus-christi-mirador-de-la-flor",
      "uss-lexington-museum-visit",
    ]);
    for (const guide of guides) {
      expect(guide.draft).toBe(!published.has(guide.slug));
      if (!guide.draft) expect(guide.sources.length).toBeGreaterThan(0);
      expect(guide.content).not.toMatch(/Draft placeholder/);
    }
    const outlines = guides.filter((guide) => guide.slug.endsWith("-orientation"));
    for (const guide of outlines) {
      expect(guide.draft).toBe(true);
      expect(guide.title.toLowerCase()).toContain("draft");
      expect(guide.content).not.toMatch(/\$\d/);
    }
  });
});

describe("formatDate", () => {
  it("prints the UTC calendar day", () => {
    expect(formatDate("2026-11-14")).toBe("November 14, 2026");
  });
});

describe("guideUpdatedLabel", () => {
  it("uses the updated date and skips a guide with no date", () => {
    expect(guideUpdatedLabel({ date: "2026-11-01", updated: "2026-11-14" })).toBe("Updated November 14, 2026");
    expect(guideUpdatedLabel({ date: "2026-11-14" })).toBe("Updated November 14, 2026");
    expect(guideUpdatedLabel({})).toBeNull();
  });
});
