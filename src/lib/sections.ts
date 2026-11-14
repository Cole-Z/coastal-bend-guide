export const SECTIONS = [
  {
    slug: "things-to-do",
    title: "Things to Do",
    navLabel: "Things to do",
    summary: "Outings worth planning a day around, once each entry is checked.",
    intro:
      "This section is for day trips and afternoon ideas in Corpus Christi and along the nearby coast. The guides below are drafts, and each one stays marked draft until its facts are checked.",
  },
  {
    slug: "beaches",
    title: "Beaches",
    navLabel: "Beaches",
    summary: "Gulf front, bay access, and the barrier islands — as topics, not a parking map.",
    intro:
      "This section covers gulf-front beaches, bay access, and the barrier islands. The guides below are drafts. Parking rules and hours belong in a guide after they are checked.",
  },
  {
    slug: "fishing",
    title: "Fishing",
    navLabel: "Fishing",
    summary: "Bay, surf, and offshore, with regulations left to the state.",
    intro:
      "This section covers bay, surf, jetty, and offshore fishing in plain language. The guides below are drafts. License and limit details stay with Texas Parks & Wildlife until an editor checks the current page and links it.",
  },
  {
    slug: "family-and-kids",
    title: "Family & Kids",
    navLabel: "Family",
    summary: "Outings that work with children, still being checked.",
    intro:
      "This section is for outings that work with children. The guides below are drafts, listed here while ages, prices, and other details are still being checked.",
  },
  {
    slug: "food",
    title: "Food",
    navLabel: "Food",
    summary: "Where to eat, still being checked.",
    intro:
      "This section is where to eat around Corpus Christi. The guides below are drafts, listed here while hours, prices, and other details are still being checked.",
  },
  {
    slug: "neighborhoods",
    title: "Neighborhoods",
    navLabel: "Neighborhoods",
    summary: "How locals name parts of town. No rankings and no prices.",
    intro:
      "This section will define area names people use, without ranking them and without home prices or school ratings. The sample guide is a checklist for those entries, not a description of any neighborhood.",
  },
  {
    slug: "moving",
    title: "Moving to Corpus Christi",
    navLabel: "Moving",
    summary: "A starting point for relocating, and a place for a local realtor.",
    intro:
      "This section will eventually hold practical notes for people relocating — utilities, insurance, and how the areas differ. Those notes are not written yet, because outdated rules would be worse than a blank page. The realtor profile below is a placeholder, not an advertisement.",
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
