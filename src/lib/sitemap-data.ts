import { latestDate } from "@/lib/dates";
import { eventsSnapshot } from "@/lib/events";
import { getAllGuides } from "@/lib/guides";
import { guidePath, SECTIONS, topicPath, type SectionSlug } from "@/lib/sections";
import { PRIVACY_UPDATED, SITE_CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export interface SitemapGuide {
  slug: string;
  section: SectionSlug;
  updated?: string;
  date?: string;
  draft: boolean;
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: "monthly";
  priority: number;
}

function absolute(siteUrl: string, path: string): string {
  return `${siteUrl}${path}`;
}

/** Lastmod uses editorial dates. Guide cards on public pages link only to published content. */
export function toSitemapEntries(args: {
  siteUrl: string;
  contentUpdated: string;
  guides: readonly SitemapGuide[];
  privacyUpdated: string;
  eventsUpdated: string;
}): SitemapEntry[] {
  const { siteUrl, contentUpdated, privacyUpdated, eventsUpdated } = args;
  const guides = args.guides.filter((guide) => !guide.draft);
  const dated = guides.flatMap((guide) => guide.updated ?? guide.date ?? []);
  const homeLastModified = latestDate([contentUpdated, ...dated]);

  const entries: SitemapEntry[] = [
    {
      url: absolute(siteUrl, "/"),
      lastModified: homeLastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  for (const section of SECTIONS) {
    const sectionDates = [
      contentUpdated,
      ...guides.flatMap((guide) =>
        guide.section === section.slug ? guide.updated ?? guide.date ?? [] : [],
      ),
    ];
    entries.push({
      url: absolute(siteUrl, topicPath(section.slug)),
      lastModified: latestDate(sectionDates),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const guide of guides) {
    entries.push({
      url: absolute(siteUrl, guidePath(guide.slug)),
      lastModified: guide.updated ?? guide.date ?? contentUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  entries.push({
    url: absolute(siteUrl, "/privacy/"),
    lastModified: privacyUpdated,
    changeFrequency: "monthly",
    priority: 0.3,
  });

  entries.push({
    url: absolute(siteUrl, "/events/"),
    lastModified: eventsUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  return entries;
}

export function getSitemapEntries(): SitemapEntry[] {
  return toSitemapEntries({
    siteUrl: SITE_URL,
    contentUpdated: SITE_CONTENT_UPDATED,
    privacyUpdated: PRIVACY_UPDATED,
    eventsUpdated: eventsSnapshot.updated,
    guides: getAllGuides(),
  });
}
