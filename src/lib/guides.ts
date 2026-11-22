import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { SECTIONS, type SectionSlug } from "@/lib/sections";

const SECTION_SLUGS = SECTIONS.map((section) => section.slug) as [
  SectionSlug,
  ...SectionSlug[],
];

const guideSource = z.strictObject({
  label: z.string().trim().min(1).regex(/^[^\r\n]+$/),
  url: z.url({ protocol: /^https$/ }).refine((url) => /^https:\/\/[^\s<>]+$/.test(url), {
    message: "Use an absolute HTTPS URL.",
  }),
  checked: z.iso.date(),
  caveat: z.string().trim().min(1).regex(/^[^\r\n]+$/).optional(),
});

export type GuideSource = z.infer<typeof guideSource>;

const guideFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  section: z.enum(SECTION_SLUGS),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  draft: z.boolean(),
  sources: z.array(guideSource).default([]),
});

export interface Guide {
  slug: string;
  title: string;
  description: string;
  section: SectionSlug;
  date?: string;
  updated?: string;
  draft: boolean;
  content: string;
  sources: readonly GuideSource[];
}

const GUIDES_DIR = path.join(process.cwd(), "content/guides");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function asDateString(value: unknown): unknown {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, "0");
    const day = String(value.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return value;
}

/** Pure frontmatter parsing. Throws when a guide cannot be published safely. */
export function parseGuide(fileName: string, raw: string): Guide {
  if (!fileName.endsWith(".mdx")) {
    throw new Error(`Guide ${fileName} must use a .mdx extension`);
  }
  const slug = fileName.slice(0, -".mdx".length);
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Guide ${fileName} needs a lowercase hyphenated file name`);
  }

  const { data, content } = matter(raw);
  const parsed = guideFrontmatter.safeParse({
    ...data,
    date: asDateString(data.date),
    updated: asDateString(data.updated),
  });
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Guide ${fileName} has invalid frontmatter: ${message}`);
  }

  return { slug, ...parsed.data, content: content.trim() };
}

export function publishedGuides(guides: readonly Guide[]): Guide[] {
  return guides.filter((guide) => !guide.draft);
}

export function getAllGuides(): Guide[] {
  let files: string[];
  try {
    files = readdirSync(GUIDES_DIR).filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }
  const guides = files.map((file) => parseGuide(file, readFileSync(path.join(GUIDES_DIR, file), "utf8")));
  const order = new Map(SECTIONS.map((section, index) => [section.slug, index]));
  guides.sort((a, b) => {
    const sectionDelta = (order.get(a.section) ?? 0) - (order.get(b.section) ?? 0);
    if (sectionDelta !== 0) return sectionDelta;
    return a.title.localeCompare(b.title);
  });
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getAllGuides().find((guide) => guide.slug === slug);
}

export function getGuidesBySection(section: SectionSlug): Guide[] {
  return getAllGuides().filter((guide) => guide.section === section);
}
