export const SECTIONS = [
  {
    slug: "things-to-do",
    title: "Things to Do",
    searchTitle: "Things to Do in Corpus Christi",
    navLabel: "Things to do",
    summary: "Plan a day around North Beach, the downtown bayfront, or a Gulf beach.",
    intro:
      "Start with a North Beach attraction and a downtown bayfront stop. Add a Gulf beach day if you have a full weekend.",
  },
  {
    slug: "beaches",
    title: "Beaches",
    searchTitle: "Corpus Christi Beaches and Gulf Day Trips",
    navLabel: "Beaches",
    summary: "Find the right stretch of sand on the bay or the Gulf.",
    intro:
      "North Beach and McGee Beach face Corpus Christi Bay. For Gulf surf, cross the JFK Causeway and pick a city beach, a state park, or the national seashore.",
  },
  {
    slug: "fishing",
    title: "Fishing",
    searchTitle: "Corpus Christi Fishing, Piers, and Charters",
    navLabel: "Fishing",
    summary: "Find a fishing pier, book a bay trip, or compare offshore charters.",
    intro:
      "Decide whether you want to fish from shore, book a bay guide, or head offshore. Start with the guide below for launch points, piers, and state fishing rules.",
  },
  {
    slug: "family-and-kids",
    title: "Family & Kids",
    searchTitle: "Family Things to Do in Corpus Christi",
    navLabel: "Family",
    summary: "Aquarium time, playground breaks, and outings for little legs.",
    intro:
      "Pick one main outing, then leave room for a playground or a short beach stop. The family guide covers indoor options, stroller logistics, and days with younger children.",
  },
  {
    slug: "food",
    title: "Food",
    searchTitle: "Where to Eat in Corpus Christi",
    navLabel: "Food",
    summary: "Seafood downtown, breakfast on Alameda, and stops on the way to the island.",
    intro:
      "Pick a meal near the part of town you’re already visiting, from downtown seafood to a stop by the JFK Causeway.",
  },
  {
    slug: "neighborhoods",
    title: "Neighborhoods",
    searchTitle: "Corpus Christi Neighborhoods Compared",
    navLabel: "Neighborhoods",
    summary: "Compare five parts of Corpus Christi by geography, roads, and landmarks.",
    intro:
      "Compare Downtown and the Bayfront, the Bay Area, Southside, Flour Bluff, and North Padre Island. Use the city’s planning maps for orientation and verify services and travel routes for each address.",
  },
  {
    slug: "moving",
    title: "Moving to Corpus Christi",
    searchTitle: "Moving to Corpus Christi Checklist",
    navLabel: "Moving",
    summary: "Check utilities, flood maps, insurance questions, and your daily route before a move.",
    intro:
      "Use this relocation checklist to compare addresses, ask the right questions before signing a lease or purchase contract, and get services ready for move-in.",
  },
] as const;

export type Section = (typeof SECTIONS)[number];
export type SectionSlug = Section["slug"];

export function isSectionSlug(value: string): value is SectionSlug {
  return SECTIONS.some((section) => section.slug === value);
}

export function getSection(slug: SectionSlug): Section {
  const section = SECTIONS.find((item) => item.slug === slug);
  if (!section) {
    throw new Error(`Missing section config for ${slug}`);
  }
  return section;
}

export function topicPath(slug: SectionSlug): string {
  return `/topics/${slug}/`;
}

export function guidePath(slug: string): string {
  return `/guides/${slug}/`;
}

/** Static Markdown copy of a published guide. Drafts do not get this file. */
export function guideMarkdownPath(slug: string): string {
  return `/guides/${slug}.md`;
}

export const WEEKEND_GUIDE_PATH = guidePath("corpus-christi-weekend-itinerary");
