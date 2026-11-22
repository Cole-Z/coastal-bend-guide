"use client";

import { useSyncExternalStore } from "react";
import { formatDate } from "@/lib/dates";
import { corpusChristiDay, eventWindows } from "@/lib/event-dates";
import type { LocalEvent } from "@/lib/events";

const localTimeLabel = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

function today() {
  return corpusChristiDay(new Date());
}

function EventCards({ events }: { events: LocalEvent[] }) {
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
      {events.map((event) => (
        <li key={event.id} className="rounded-2xl bg-foam p-5 ring-1 ring-line">
          <p className="font-semibold text-ocean">
            <time dateTime={event.date}>{formatDate(event.date)}</time>
            {event.endDate ? <> – <time dateTime={event.endDate}>{formatDate(event.endDate)}</time></> : null}
          </p>
          <h4 className="mt-2 font-display text-xl font-semibold">{event.title}</h4>
          <p className="mt-2">
            {event.time ? (
              <time dateTime={event.time}>{localTimeLabel.format(new Date(`2000-01-01T${event.time}:00Z`))}</time>
            ) : event.timeNote === "varies" ? "Times vary by attraction" : "Time to be announced"}
          </p>
          <p className="mt-1">{event.venue} · {event.city}, TX</p>
          {event.state === "scheduled" ? <p className="mt-1 text-muted">Scheduled</p> : null}
          <p className="mt-1">{event.price ?? "Price details from the organizer"}</p>
          <a className="inline-flex min-h-11 items-center font-semibold text-ocean underline underline-offset-4" href={event.url}>
            {event.price ? "Organizer details" : "Organizer and price details"}<span className="sr-only"> for {event.title}</span>
          </a>
          <p className="text-sm text-muted">Verified <time dateTime={event.verified}>{formatDate(event.verified)}</time></p>
        </li>
      ))}
    </ul>
  );
}


export function UpcomingEvents({
  events,
  buildDay,
  updated,
}: {
  events: LocalEvent[];
  buildDay: string;
  updated: string;
}) {
  const day = useSyncExternalStore(subscribe, today, () => buildDay);
  const { soon, later, stale } = eventWindows(events, day, updated);

  return (
    <>
      {stale ? (
        <p className="mt-4 rounded-xl bg-foam p-4 font-semibold ring-1 ring-line">
          These picks were last updated more than a week ago. Start with the official calendars for current listings.
        </p>
      ) : null}
      <section aria-labelledby="near-term-picks" className="mt-6">
        <h3 id="near-term-picks" className="font-display text-xl font-semibold">Next 30 days</h3>
        {soon.length ? <EventCards events={soon} /> : (
          <p className="mt-2 text-lg text-muted">No picks are listed for the next 30 days. Check the official calendars above.</p>
        )}
      </section>
      {later.length ? (
        <section aria-labelledby="later-picks" className="mt-8">
          <h3 id="later-picks" className="font-display text-xl font-semibold">Plan farther ahead</h3>
          <EventCards events={later} />
        </section>
      ) : null}
    </>
  );
}
