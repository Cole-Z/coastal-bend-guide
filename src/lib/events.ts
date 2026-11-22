import { z } from "zod";
import data from "../../content/events.json";
import { corpusChristiDay, endsOnOrAfter } from "@/lib/event-dates";

const event = z.strictObject({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  date: z.iso.date(),
  endDate: z.iso.date().optional(),
  time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/).optional(),
  timeNote: z.literal("varies").optional(),
  venue: z.string().trim().min(1),
  city: z.string().trim().min(1),
  price: z.string().trim().min(1).optional(),
  url: z.url({ protocol: /^https$/ }),
  verified: z.iso.date(),
  state: z.enum(["scheduled", "cancelled"]).optional(),
}).refine(({ date, endDate }) => !endDate || endDate > date, {
  path: ["endDate"],
  message: "The end date must be after the start date.",
});

const eventSnapshot = z.strictObject({
  updated: z.iso.date(),
  events: z.array(event),
}).refine(({ events }) => new Set(events.map(({ id }) => id)).size === events.length, {
  path: ["events"],
  message: "Event IDs must be unique.",
});

export type LocalEvent = z.infer<typeof event>;
export const eventsSnapshot = eventSnapshot.parse(data);

export function upcomingEvents(events: readonly LocalEvent[], reference: Date): LocalEvent[] {
  const day = corpusChristiDay(reference);
  return events
    .filter((event) => event.state !== "cancelled" && endsOnOrAfter(event, day))
    .sort((a, b) =>
      a.date.localeCompare(b.date) ||
      (a.time ?? "24:00").localeCompare(b.time ?? "24:00") ||
      a.title.localeCompare(b.title),
    );
}
