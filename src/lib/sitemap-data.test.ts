import { describe, expect, it } from "vitest";
import { getSitemapEntries, toSitemapEntries } from "@/lib/sitemap-data";
import { SITE_URL } from "@/lib/site";

describe("toSitemapEntries", () => {
  const entries = toSitemapEntries({
    siteUrl: "https://example.com",
    contentUpdated: "2026-11-14",
    guides: [
      { slug: "beach-draft", section: "beaches", updated: "2026-11-20", draft: true },
      { slug: "food-ready", section: "food", updated: "2026-11-01", draft: false },
    ],
  });

  it("uses content dates for lastmod and skips drafts", () => {
    const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
    expect(byUrl.get("https://example.com/")?.lastModified).toBe("2026-11-20");
    expect(byUrl.get("https://example.com/topics/beaches/")?.lastModified).toBe("2026-11-20");
    expect(byUrl.get("https://example.com/topics/food/")?.lastModified).toBe("2026-11-14");
    expect(byUrl.get("https://example.com/guides/food-ready/")?.lastModified).toBe("2026-11-01");
    expect(byUrl.has("https://example.com/guides/beach-draft/")).toBe(false);
    expect(byUrl.get("https://example.com/privacy/")?.lastModified).toBe("2026-11-14");
  });

  it("writes absolute trailing-slash URLs", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith("https://example.com/")).toBe(true);
      expect(entry.url.endsWith("/")).toBe(true);
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("getSitemapEntries", () => {
  it("lists the published guides and leaves the orientation drafts out", () => {
    const urls = getSitemapEntries().map((entry) => entry.url);
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/privacy/`);
    expect(urls).toContain(`${SITE_URL}/topics/moving/`);
    for (const slug of [
      "best-local-restaurants-corpus-christi",
      "boat-tours-fishing-charters-piers-corpus-christi",
      "corpus-christi-nightlife",
      "family-things-to-do-corpus-christi",
      "padre-island-national-seashore-day-trip",
      "selena-corpus-christi-mirador-de-la-flor",
      "uss-lexington-museum-visit",
    ]) {
      expect(urls).toContain(`${SITE_URL}/guides/${slug}/`);
    }
    for (const slug of [
      "beaches-orientation",
      "fishing-orientation",
      "neighborhoods-orientation",
      "things-to-do-orientation",
    ]) {
      expect(urls).not.toContain(`${SITE_URL}/guides/${slug}/`);
    }
  });
});
