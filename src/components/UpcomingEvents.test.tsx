import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import type { LocalEvent } from "@/lib/events";

const festival: LocalEvent = {
  id: "buc-days",
  title: "Buc Days",
  date: "2027-04-29",
  endDate: "2027-05-09",
  venue: "Festival Grounds",
  city: "Corpus Christi",
  url: "https://bucdays.com/faqs/",
  verified: "2026-11-22",
};

describe("upcoming picks", () => {
  it("steers a stale snapshot with only a future festival to the official calendars", () => {
    const html = renderToStaticMarkup(
      <UpcomingEvents events={[festival]} buildDay="2027-01-17" updated="2026-11-22" />,
    );
    expect(html).toContain("more than a week ago");
    expect(html).toContain("No picks are listed for the next 30 days. Check the official calendars above.");
    expect(html).toContain("Plan farther ahead");
    expect(html).toContain("Buc Days");
    expect(html).toContain("Time to be announced");
  });

  it("shows an official-calendar fallback in a fresh empty window", () => {
    const html = renderToStaticMarkup(
      <UpcomingEvents events={[]} buildDay="2026-11-29" updated="2026-11-22" />,
    );
    expect(html).not.toContain("more than a week ago");
    expect(html).toContain("No picks are listed for the next 30 days.");
    expect(html).not.toContain("Plan farther ahead");
  });
});
