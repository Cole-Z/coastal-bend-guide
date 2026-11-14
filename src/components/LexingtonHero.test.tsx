import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LexingtonHero } from "@/components/LexingtonHero";

describe("LexingtonHero", () => {
  it("reserves the photo box, preloads AVIF, and credits Cole", () => {
    const html = renderToStaticMarkup(<LexingtonHero />);
    expect(html).toContain('alt="USS Lexington aircraft carrier at sunrise on Corpus Christi Bay"');
    expect(html).toContain('width="1024"');
    expect(html).toContain('height="768"');
    expect(html).toContain('rel="preload"');
    expect(html).toContain('type="image/avif"');
    expect(html).toContain("sunrise-1024.avif 1024w");
    expect(html).toContain("sunrise-480.webp 480w");
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain("Photo: Cole Zill");
  });
});
