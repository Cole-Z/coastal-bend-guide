export const SITE_NAME = "Coastal Bend Guide";

export const SITE_DESCRIPTION =
  "A local guide to Corpus Christi and the Coastal Bend: beaches, fishing, food, neighborhoods, and moving here.";

/**
 * Floor for sitemap lastmod on pages that are not a single guide.
 * Bump this when static copy (home, privacy, section intros) changes.
 * Guide pages use their own frontmatter `updated` date.
 */
export const SITE_CONTENT_UPDATED = "2026-11-14";

/** Canonical origin. No trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://coastal-bend-guide.pages.dev"
).replace(/\/$/, "");
