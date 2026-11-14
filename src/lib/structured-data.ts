import type { RealtorProfile } from "@/config/realtor";
import type { Guide } from "@/lib/guides";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${siteUrl}/`,
    description: SITE_DESCRIPTION,
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function guideArticleJsonLd(
  guide: Pick<Guide, "title" | "description" | "date" | "updated" | "draft">,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated,
    creativeWorkStatus: guide.draft ? "Draft" : "Published",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: url,
  };
}

export function topicPageJsonLd(args: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: args.name,
    description: args.description,
    url: args.url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME },
  };
}

/**
 * Emitted only after the realtor config leaves placeholder mode.
 * Address, price, and review fields are intentionally absent.
 */
export function realtorAgentJsonLd(profile: RealtorProfile, pageUrl: string) {
  if (profile.isPlaceholder) return null;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: profile.name,
    description: profile.disclosure || `${profile.role} at ${profile.brokerage}`,
    url: pageUrl,
    ...(profile.email ? { email: profile.email } : {}),
    ...(profile.phone ? { telephone: profile.phone } : {}),
  };
}
