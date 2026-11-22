import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { realtor } from "@/config/realtor";
import { DraftBanner } from "@/components/DraftBanner";
import { DraftBadge } from "@/components/DraftBadge";
import { GuideMarkdownActions } from "@/components/GuideMarkdownActions";
import { JsonLd } from "@/components/JsonLd";
import { guideMdxComponents } from "@/components/mdx-components";
import { guideUpdatedLabel } from "@/lib/dates";
import { renderGuideMarkdown } from "@/lib/guide-markdown";
import { getAllGuides, getGuideBySlug, publishedGuides } from "@/lib/guides";
import { getSection, guideMarkdownPath, guidePath, topicPath } from "@/lib/sections";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, guideArticleJsonLd } from "@/lib/structured-data";

const relatedSlugs: Record<string, readonly string[]> = {
  "corpus-christi-weekend-itinerary": ["uss-lexington-museum-visit", "family-things-to-do-corpus-christi", "best-local-restaurants-corpus-christi"],
  "uss-lexington-museum-visit": ["family-things-to-do-corpus-christi", "corpus-christi-weekend-itinerary"],
  "padre-island-national-seashore-day-trip": ["corpus-christi-weekend-itinerary", "family-things-to-do-corpus-christi"],
  "family-things-to-do-corpus-christi": ["uss-lexington-museum-visit", "corpus-christi-weekend-itinerary"],
  "best-local-restaurants-corpus-christi": ["corpus-christi-weekend-itinerary", "corpus-christi-nightlife"],
  "corpus-christi-nightlife": ["best-local-restaurants-corpus-christi", "corpus-christi-weekend-itinerary"],
  "boat-tours-fishing-charters-piers-corpus-christi": ["padre-island-national-seashore-day-trip", "corpus-christi-weekend-itinerary"],
  "selena-corpus-christi-mirador-de-la-flor": ["corpus-christi-weekend-itinerary", "best-local-restaurants-corpus-christi"],
};

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };
  const path = guidePath(guide.slug);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: path },
    robots: guide.draft ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: path,
      publishedTime: guide.date,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const section = getSection(guide.section);
  const url = `${SITE_URL}${guidePath(guide.slug)}`;
  const dateLabel = guideUpdatedLabel(guide);
  const published = publishedGuides(getAllGuides());
  const related = (relatedSlugs[slug] ?? []).flatMap((relatedSlug) =>
    published.filter((candidate) => candidate.slug === relatedSlug),
  );
  const markdown = renderGuideMarkdown(
    guide,
    { siteUrl: SITE_URL, siteName: SITE_NAME, siteDescription: SITE_DESCRIPTION },
    realtor,
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: section.title, url: `${SITE_URL}${topicPath(section.slug)}` },
          { name: guide.title, url },
        ])}
      />
      <JsonLd data={guideArticleJsonLd(guide, url)} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="font-semibold text-ocean underline underline-offset-4">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={topicPath(section.slug)} className="font-semibold text-ocean underline underline-offset-4">
          {section.title}
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{guide.title}</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed">{guide.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
        {guide.draft ? <DraftBadge /> : null}
        {dateLabel ? <p>{dateLabel}</p> : null}
      </div>
      {guide.draft ? (
        <div className="mt-6">
          <DraftBanner />
        </div>
      ) : null}
      <div className="mt-2">
        <MDXRemote source={guide.content} components={guideMdxComponents} />
      </div>
      {!guide.draft ? (
        <nav aria-label="Related reading" className="mt-10 rounded-2xl bg-foam p-5 ring-1 ring-line">
          <h2 className="font-display text-xl font-semibold">Keep planning</h2>
          <ul className="mt-2 space-y-2 font-semibold text-ocean underline underline-offset-4">
            {related.map((item) => (
              <li key={item.slug}><Link className="inline-flex min-h-11 items-center" href={guidePath(item.slug)}>{item.title}</Link></li>
            ))}
            <li>
              <Link className="inline-flex min-h-11 items-center" href={topicPath(section.slug)}>
                {section.slug === "beaches" ? "Compare Corpus Christi beaches" : `More in ${section.title}`}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
      <aside aria-label="Markdown tools" className="mt-8 border-t border-line">
        <GuideMarkdownActions
          markdown={markdown}
          fileName={`${guide.slug}.md`}
          downloadHref={guide.draft ? null : guideMarkdownPath(guide.slug)}
        />
      </aside>
    </article>
  );
}
