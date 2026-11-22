import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import TopicPage from "@/app/topics/[section]/page";
import { generateMetadata, generateStaticParams } from "@/app/guides/[slug]/page";

describe("public guide visibility", () => {
  it("lists published guides on home and topic pages", async () => {
    const home = renderToStaticMarkup(<HomePage />);
    const topic = renderToStaticMarkup(await TopicPage({ params: Promise.resolve({ section: "beaches" }) }));
    expect(home).toMatch(/href="\/guides\/corpus-christi-weekend-itinerary\/?"/);
    expect(home).not.toMatch(/href="\/guides\/[^/]+-orientation\/?"/);
    expect(topic).toMatch(/href="\/guides\/padre-island-national-seashore-day-trip\/?"/);
    expect(topic).not.toMatch(/href="\/guides\/beaches-orientation\/?"/);
  });

  it("still exports the draft preview route with noindex,follow", async () => {
    const slug = "beaches-orientation";
    expect(generateStaticParams()).toContainEqual({ slug });
    const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
