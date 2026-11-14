import type { RealtorProfile } from "@/config/realtor";
import { guideUpdatedLabel } from "@/lib/dates";
import type { Guide } from "@/lib/guides";
import { publishedGuides } from "@/lib/guides";
import { guideMarkdownPath, guidePath, SECTIONS } from "@/lib/sections";

export interface GuideMarkdownSite {
  siteUrl: string;
  siteName: string;
  siteDescription: string;
}

type GuideMarkdownContact = Pick<
  RealtorProfile,
  | "name"
  | "role"
  | "brokerage"
  | "officeCity"
  | "officeAddress"
  | "phone"
  | "email"
  | "license"
  | "profileUrl"
  | "profileLinkLabel"
  | "disclosure"
>;

function canonicalGuideUrl(siteUrl: string, slug: string): string {
  return `${siteUrl}${guidePath(slug)}`;
}

function contactLines(contact: GuideMarkdownContact): string[] {
  const lines = [
    `${contact.name}, ${contact.role}`,
    contact.brokerage,
    contact.officeCity,
    contact.officeAddress,
    contact.phone,
    contact.email,
    contact.profileUrl ? `${contact.profileLinkLabel}: ${contact.profileUrl}` : "",
    contact.disclosure,
    contact.license,
  ];
  return lines.filter((line) => line.trim().length > 0);
}

/** Plain Markdown for one guide: title, date, canonical URL, body, and the site contact footer. */
export function renderGuideMarkdown(
  guide: Guide,
  site: GuideMarkdownSite,
  contact: GuideMarkdownContact,
): string {
  const dateLabel = guideUpdatedLabel(guide);
  const parts = [`# ${guide.title}`, ""];
  if (dateLabel) {
    parts.push(dateLabel, "");
  }
  parts.push(`Canonical page: ${canonicalGuideUrl(site.siteUrl, guide.slug)}`, "");
  if (guide.draft) {
    parts.push("Draft: this page is still being checked.", "");
  }
  if (guide.description.trim()) {
    parts.push(guide.description.trim(), "");
  }
  if (guide.content.trim()) {
    parts.push(guide.content.trim(), "");
  }
  parts.push(
    "---",
    "",
    `${site.siteName} — ${site.siteDescription}`,
    site.siteUrl,
    "",
    ...contactLines(contact),
    "",
  );
  return `${parts.join("\n").trim()}\n`;
}

/** llms.txt lists the site and published guides only. Drafts stay off the list. */
export function renderLlmsTxt(guides: readonly Guide[], site: GuideMarkdownSite): string {
  const published = publishedGuides(guides);
  const lines = [
    `# ${site.siteName}`,
    "",
    `> ${site.siteDescription}`,
    "",
    site.siteUrl,
    "",
    "Published guides are listed here with a Markdown copy. Draft guides stay off this list.",
    "",
  ];

  for (const section of SECTIONS) {
    const inSection = published.filter((guide) => guide.section === section.slug);
    if (inSection.length === 0) continue;
    lines.push(`## ${section.title}`, "");
    for (const guide of inSection) {
      const href = `${site.siteUrl}${guideMarkdownPath(guide.slug)}`;
      lines.push(`- [${guide.title}](${href}): ${guide.description}`);
    }
    lines.push("");
  }

  return `${lines.join("\n").trim()}\n`;
}

export interface GuideExportFile {
  /** Path relative to the static export root, no leading slash. */
  relativePath: string;
  body: string;
}

/** Files to write after the static build. Draft guides produce no .md file. */
export function guideExportFiles(
  guides: readonly Guide[],
  site: GuideMarkdownSite,
  contact: GuideMarkdownContact,
): GuideExportFile[] {
  const files: GuideExportFile[] = [
    { relativePath: "llms.txt", body: renderLlmsTxt(guides, site) },
  ];
  for (const guide of publishedGuides(guides)) {
    files.push({
      relativePath: guideMarkdownPath(guide.slug).slice(1),
      body: renderGuideMarkdown(guide, site, contact),
    });
  }
  return files;
}
