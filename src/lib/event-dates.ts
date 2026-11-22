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
