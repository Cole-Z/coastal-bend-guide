import { describe, expect, it } from "vitest";
import { corpusChristiDay, eventWindows } from "@/lib/event-dates";
import { upcomingEvents, type LocalEvent } from "@/lib/events";

const first: LocalEvent = {
  id: "first",
  title: "First",
  date: "2026-12-04",
  time: "18:00",
  city: "Corpus Christi",
  venue: "Downtown",
  url: "https://example.com/",
  verified: "2026-11-22",
  state: "scheduled",
};

describe("upcoming events", () => {
  it("sorts by local date, then time, and puts unannounced times after known times", () => {
    const later = { ...first, id: "later", time: "20:00" };
    const unknown = { ...first, id: "unknown", time: undefined };
    const nextDay = { ...first, id: "next", date: "2026-12-05", time: "08:00" };
    expect(upcomingEvents([unknown, nextDay, later, first], new Date("2026-12-04T18:00:00Z")))
      .toEqual([first, later, unknown, nextDay]);
  });

  it("keeps events through the end of their Chicago calendar day", () => {
    const beforeMidnight = new Date("2026-12-05T05:59:59Z");
    const midnight = new Date("2026-12-05T06:00:00Z");
    expect(corpusChristiDay(beforeMidnight)).toBe("2026-12-04");
    expect(upcomingEvents([first], beforeMidnight)).toEqual([first]);
    expect(upcomingEvents([first], midnight)).toEqual([]);
  });

  it("uses daylight time in Chicago when appropriate", () => {
    expect(corpusChristiDay(new Date("2027-05-10T04:59:59Z"))).toBe("2027-05-09");
    expect(corpusChristiDay(new Date("2027-05-10T05:00:00Z"))).toBe("2027-05-10");
  });

  it("retains multi-day events in progress and excludes cancellations", () => {
    const festival = { ...first, endDate: "2026-12-05" };
    const cancelled = { ...first, id: "cancelled", state: "cancelled" as const };
    expect(upcomingEvents([festival, cancelled], new Date("2026-12-05T12:00:00Z"))).toEqual([festival]);
    expect(upcomingEvents([cancelled], new Date("2026-12-04T12:00:00Z"))).toEqual([]);
  });

  it("handles an empty snapshot", () => {
    expect(upcomingEvents([], new Date("2026-11-22T12:00:00Z"))).toEqual([]);
  });
});


describe("event windows", () => {
  it("keeps a festival through its last Chicago day and removes it at local midnight", () => {
    const festival = { ...first, date: "2027-04-29", endDate: "2027-05-09" };
    const lastDay = corpusChristiDay(new Date("2027-05-10T04:59:59Z"));
    const nextDay = corpusChristiDay(new Date("2027-05-10T05:00:00Z"));
    expect(eventWindows([festival], lastDay, "2027-05-05").soon).toEqual([festival]);
    expect(eventWindows([festival], nextDay, "2027-05-05").soon).toEqual([]);
  });

  it("splits the inclusive 30-day window and marks snapshots stale after seven calendar days", () => {
    const soon = { ...first, date: "2027-03-29" };
    const later = { ...first, date: "2027-03-30" };
    expect(eventWindows([soon, later], "2027-02-28", "2027-02-21")).toEqual({
      soon: [soon],
      later: [later],
      stale: false,
    });
    expect(eventWindows([soon], "2027-03-01", "2027-02-21").stale).toBe(true);
  });
});
