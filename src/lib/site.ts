export const SITE_NAME = "CC Bay Life";

export const SITE_DESCRIPTION =
  "Plan a Corpus Christi weekend, pick a beach or restaurant, find local events, or compare neighborhoods before a move.";

/**
 * Sitemap lastmod for shared homepage and topic copy.
 */
export const SITE_CONTENT_UPDATED = "2026-11-22";
export const PRIVACY_UPDATED = "2026-11-14";

/** Canonical origin. No trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
export const PRODUCTION_SITE_URL = "https://ccbaylife.com";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_SITE_URL).replace(/\/$/, "");
