import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { realtor } from "@/config/realtor";
import { RealtorCard } from "@/components/RealtorCard";
import { realtorMailto, realtorTel } from "@/lib/realtor-link";
import { realtorAgentJsonLd, serializeJsonLd } from "@/lib/structured-data";

describe("realtor profile", () => {
  it("stays a placeholder in the single config file", () => {
    expect(realtor.isPlaceholder).toBe(true);
    expect(realtor.brokerage).toBe("Coldwell Banker");
    expect(realtor.email).toContain("example.com");
    expect(realtor.phone).toBe("");
    expect(realtor.photo.width).toBe(160);
    expect(realtor.photo.height).toBe(160);
    expect(realtor.disclosure).toBe("");
  });

  it("builds a mailto link and a tel link from the config", () => {
    expect(realtorMailto(realtor)).toBe("mailto:realtor@example.com?subject=Moving%20to%20Corpus%20Christi");
    expect(realtorTel("+1 (555) 010-0000")).toBe("tel:+15550100000");
  });

  it("omits RealEstateAgent JSON-LD until the placeholder flag is cleared", () => {
    expect(realtorAgentJsonLd(realtor, "https://example.com/topics/moving/")).toBeNull();
    const ready = realtorAgentJsonLd(
      { ...realtor, isPlaceholder: false, disclosure: "Equal Housing Opportunity. License pending." },
      "https://example.com/topics/moving/",
    );
    expect(ready).toMatchObject({ "@type": "RealEstateAgent", name: "Realtor Name" });
    expect(ready && "address" in ready).toBe(false);
    expect(ready && "aggregateRating" in ready).toBe(false);
    expect(JSON.stringify(ready)).not.toMatch(/streetAddress|priceRange|review/);
  });

  it("escapes angle brackets in JSON-LD", () => {
    expect(serializeJsonLd({ name: "</script>" })).toBe('{"name":"\\u003c/script>"}');
  });
});

describe("RealtorCard", () => {
  it("shows the moving prompt, a fixed-size portrait, and the mailto from config", () => {
    const html = renderToStaticMarkup(<RealtorCard />);
    expect(html).toContain("Moving to Corpus Christi?");
    expect(html).toContain("Work with a local realtor");
    expect(html).toContain("Coldwell Banker");
    expect(html).toContain("Placeholder");
    expect(html).toContain("mailto:realtor@example.com?subject=Moving%20to%20Corpus%20Christi");
    expect(html).toContain('width="160"');
    expect(html).toContain('height="160"');
    expect(html).toContain('alt="Placeholder portrait. A photo of the agent has not been added."');
    expect(html).not.toContain("RealEstateAgent");
  });
});
