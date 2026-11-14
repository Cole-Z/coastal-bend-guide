/** Latest `YYYY-MM-DD` string. Lexical order matches calendar order. */
export function latestDate(dates: readonly string[]): string {
  if (dates.length === 0) {
    throw new Error("latestDate requires at least one date");
  }
  return dates.reduce((max, date) => (date > max ? date : max));
}

/** Format a `YYYY-MM-DD` date in UTC so the calendar day does not shift. */
export function formatDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    throw new Error(`Invalid date ${isoDate}`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
