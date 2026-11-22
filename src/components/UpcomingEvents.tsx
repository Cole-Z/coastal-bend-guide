"use client";

import { useSyncExternalStore } from "react";
import { formatDate } from "@/lib/dates";
import { corpusChristiDay, endsOnOrAfter } from "@/lib/event-dates";
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

export function UpcomingEvents({ events, buildDay }: { events: LocalEvent[]; buildDay: string }) {
  const day = useSyncExternalStore(subscribe, today, () => buildDay);
  const current = events.filter((event) => endsOnOrAfter(event, day));

  if (current.length === 0) {
    return <p className="mt-4 text-lg text-muted">Check the official calendars below for current listings.</p>;
  }

  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
      {current.map((event) => (
        <li key={event.id} className="rounded-2xl bg-foam p-5 ring-1 ring-line">
          <p className="font-semibold text-ocean">
            <time dateTime={event.date}>{formatDate(event.date)}</time>
            {event.endDate ? <> – <time dateTime={event.endDate}>{formatDate(event.endDate)}</time></> : null}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold">{event.title}</h3>
          <p className="mt-2">
            {event.time ? (
              <time dateTime={event.time}>{localTimeLabel.format(new Date(`2000-01-01T${event.time}:00Z`))}</time>
            ) : event.endDate ? "Times vary by day" : "Time to be announced"}
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
