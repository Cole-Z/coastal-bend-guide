import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LexingtonHero } from "@/components/LexingtonHero";

describe("LexingtonHero", () => {
  it("reserves the photo box, preloads AVIF, and credits Cole", () => {
    const html = renderToStaticMarkup(<LexingtonHero />);
    expect(html).toContain('alt="USS Lexington aircraft carrier at sunrise on Corpus Christi Bay"');
    expect(html.match(/alt="USS Lexington aircraft carrier at sunrise on Corpus Christi Bay"/g)).toHaveLength(1);
    expect(html).toContain('width="2560"');
    expect(html).toContain('height="1920"');
    expect(html).toContain('rel="preload"');
    expect(html).toContain('type="image/avif"');
    expect(html).toContain("sunrise-640.avif 640w");
    expect(html).toContain("sunrise-1024.avif 1024w");
    expect(html).toContain("sunrise-1600.avif 1600w");
    expect(html).toContain("sunrise-2048.avif 2048w");
    expect(html).toContain("sunrise-2560.avif 2560w");
    expect(html).toContain("sunrise-640.webp 640w");
    expect(html).toContain("(min-width: 1760px) 1760px, 100vw");
    expect(html).not.toContain("sunrise-480");
    expect(html).not.toContain("sunrise-768");
    expect(html).not.toContain("from-sand/95");
    expect(html).toContain("hero-scrim");
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain("Photo: Cole Zill");
  });
});
