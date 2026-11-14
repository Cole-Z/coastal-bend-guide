import { latestDate } from "@/lib/dates";
import { getAllGuides } from "@/lib/guides";
import { guidePath, SECTIONS, topicPath, type SectionSlug } from "@/lib/sections";
import { SITE_CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export interface SitemapGuide {
  slug: string;
  section: SectionSlug;
  updated?: string;
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

/**
 * Sitemap rows for the static export.
 * Draft guides are omitted. Their dates still move the homepage and
 * the topic page that links to them, because that copy did change.
 * lastmod is always a content date, never the build clock.
 */
export function toSitemapEntries(args: {
  siteUrl: string;
  contentUpdated: string;
  guides: readonly SitemapGuide[];
}): SitemapEntry[] {
  const { siteUrl, contentUpdated, guides } = args;
  const dated = guides.flatMap((guide) => (guide.updated ? [guide.updated] : []));
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
        guide.section === section.slug && guide.updated ? [guide.updated] : [],
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
    if (guide.draft) continue;
    entries.push({
      url: absolute(siteUrl, guidePath(guide.slug)),
      lastModified: guide.updated ?? contentUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  entries.push({
    url: absolute(siteUrl, "/privacy/"),
    lastModified: contentUpdated,
    changeFrequency: "monthly",
    priority: 0.3,
  });

  return entries;
}

export function getSitemapEntries(): SitemapEntry[] {
  return toSitemapEntries({
    siteUrl: SITE_URL,
    contentUpdated: SITE_CONTENT_UPDATED,
    guides: getAllGuides(),
  });
}
