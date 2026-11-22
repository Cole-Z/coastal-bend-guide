import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { formatDate } from "@/lib/dates";
import { corpusChristiDay } from "@/lib/event-dates";
import { eventsSnapshot, upcomingEvents } from "@/lib/events";
import { SITE_URL } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const title = "Corpus Christi events";
const description = "Find upcoming events around Corpus Christi, from downtown ArtWalk to island boat parades. Check dates, venues, and official organizer calendars.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/events/" },
  ...socialMetadata({ title, description, path: "/events/" }),
};

export default function EventsPage() {
  const reference = new Date();
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: `${SITE_URL}/` }, { name: "Events", url: `${SITE_URL}/events/` }])} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="font-semibold text-ocean underline underline-offset-4">Home</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Events</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">{description}</p>
      <section aria-labelledby="calendars" className="mt-7 rounded-2xl bg-foam p-5 ring-1 ring-line">
        <h2 id="calendars" className="font-display text-2xl font-semibold">Official calendars</h2>
        <p className="mt-2 text-muted">Start here for this weekend’s listings and schedule changes.</p>
        <ul className="mt-2 flex flex-wrap gap-x-6 font-semibold text-ocean underline underline-offset-4">
          <li><a className="inline-flex min-h-11 items-center" href="https://www.visitcorpuschristi.com/events/">Visit Corpus Christi events</a></li>
          <li><a className="inline-flex min-h-11 items-center" href="https://downtowncorpuschristi.org/events/calendar">Downtown Corpus Christi calendar</a></li>
          <li><a className="inline-flex min-h-11 items-center" href="https://stxbot.org/">South Texas Botanical Gardens events</a></li>
        </ul>
      </section>
      <section aria-labelledby="picks" className="mt-8">
        <h2 id="picks" className="font-display text-2xl font-semibold">Upcoming picks</h2>
        <p className="mt-2 text-muted">
          Picks last updated <time dateTime={eventsSnapshot.updated}>{formatDate(eventsSnapshot.updated)}</time>. Times are local. Confirm plans with the organizer before heading out.
        </p>
        <noscript>
          <p className="mt-3 text-muted">You’re viewing a saved event list. Use the official calendars above for current dates and cancellations.</p>
        </noscript>
        <UpcomingEvents
          events={upcomingEvents(eventsSnapshot.events, reference)}
          buildDay={corpusChristiDay(reference)}
          updated={eventsSnapshot.updated}
        />
      </section>
    </article>
  );
}
