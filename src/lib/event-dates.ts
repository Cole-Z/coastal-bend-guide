const localDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function corpusChristiDay(reference: Date): string {
  const parts = localDate.formatToParts(reference);
  const date = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${date.year}-${date.month}-${date.day}`;
}

export function endsOnOrAfter(event: { date: string; endDate?: string }, day: string): boolean {
  return (event.endDate ?? event.date) >= day;
}

/** Add calendar days to a Chicago date label without crossing a DST offset. */
function addCalendarDays(day: string, days: number): string {
  const date = new Date(`${day}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function eventWindows<T extends { date: string; endDate?: string }>(
  events: readonly T[],
  day: string,
  updated: string,
) {
  const endOfWindow = addCalendarDays(day, 29);
  const soon: T[] = [];
  const later: T[] = [];
  for (const event of events) {
    if (!endsOnOrAfter(event, day)) continue;
    (event.date <= endOfWindow ? soon : later).push(event);
  }
  return { soon, later, stale: day > addCalendarDays(updated, 7) };
}
