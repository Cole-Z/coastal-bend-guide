import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { realtor } from "@/config/realtor";
import { RealtorCard } from "@/components/RealtorCard";
import { realtorMailto, realtorTel } from "@/lib/realtor-link";
import { realtorAgentJsonLd, serializeJsonLd } from "@/lib/structured-data";

const PROFILE_URL =
  "https://www.coldwellbanker.com/tx/corpus-christi/agents/kim-zill/aid-P00200000Fm5LJUpvQy2Hq5Q7cd2u1JDbDzMYO63";

describe("realtor profile", () => {
  it("uses Kim Zill's public Coldwell Banker facts and a local portrait", () => {
    expect(realtor.isPlaceholder).toBe(false);
    expect(realtor.name).toBe("Kim Zill");
    expect(realtor.role).toBe("Real Estate Salesperson");
    expect(realtor.brokerage).toBe("Coldwell Banker Pacesetter Steel");
    expect(realtor.officeCity).toBe("Corpus Christi, TX");
    expect(realtor.email).toBe("mytexasdreamhome@gmail.com");
    expect(realtor.phone).toBe("(361) 558-5577");
    expect(realtor.license).toBe("License # 769283-SA");
    expect(realtor.profileUrl).toBe(PROFILE_URL);
    expect(realtor.photo.src.startsWith("/")).toBe(true);
    expect(realtor.photo.src).not.toContain("realogyprod.com");
    expect(realtor.photo.width).toBe(160);
    expect(realtor.photo.height).toBe(160);
    expect(realtor.disclosure).toContain("Coldwell Banker Pacesetter Steel");
  });

  it("builds a mailto link and a tel link from the config", () => {
    expect(realtorMailto(realtor)).toBe(
      "mailto:mytexasdreamhome@gmail.com?subject=Moving%20to%20Corpus%20Christi",
    );
    expect(realtorTel("(361) 558-5577")).toBe("tel:3615585577");
  });

  it("emits RealEstateAgent JSON-LD without an address, price, or review", () => {
    const data = realtorAgentJsonLd(realtor, "https://ccbaylife.com/topics/moving/");
    expect(data).toMatchObject({
      "@type": "RealEstateAgent",
      name: "Kim Zill",
      email: "mytexasdreamhome@gmail.com",
      telephone: "(361) 558-5577",
      url: PROFILE_URL,
    });
    expect(data && "address" in data).toBe(false);
    expect(data && "image" in data).toBe(false);
    expect(JSON.stringify(data)).not.toMatch(/streetAddress|priceRange|aggregateRating|review/);
    expect(realtorAgentJsonLd({ ...realtor, isPlaceholder: true }, "https://ccbaylife.com/topics/moving/")).toBeNull();
  });

  it("escapes angle brackets in JSON-LD", () => {
    expect(serializeJsonLd({ name: "</script>" })).toBe('{"name":"\\u003c/script>"}');
  });
});

describe("RealtorCard", () => {
  it("shows her profile link, disclosure, and a fixed-size local portrait", () => {
    const html = renderToStaticMarkup(<RealtorCard />);
    expect(html).toContain("Moving to Corpus Christi?");
    expect(html).toContain("Work with a local realtor");
    expect(html).toContain("Kim Zill");
    expect(html).toContain("Coldwell Banker Pacesetter Steel");
    expect(html).toContain("Kim Zill is a real estate agent affiliated with Coldwell Banker Pacesetter Steel");
    expect(html).toContain(PROFILE_URL);
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain("mailto:mytexasdreamhome@gmail.com?subject=Moving%20to%20Corpus%20Christi");
    expect(html).toContain('width="160"');
    expect(html).toContain('height="160"');
    expect(html).not.toContain("realogyprod.com");
    expect(html).not.toContain("not a real profile");
  });
});
