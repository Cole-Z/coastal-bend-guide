import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DraftBanner } from "@/components/DraftBanner";
import { DraftBadge } from "@/components/DraftBadge";
import { JsonLd } from "@/components/JsonLd";
import { guideMdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/dates";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { getSection, guidePath, topicPath } from "@/lib/sections";
import { SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, guideArticleJsonLd } from "@/lib/structured-data";

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
        <Link href="/" className="font-semibold text-tide underline underline-offset-4">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={topicPath(section.slug)} className="font-semibold text-tide underline underline-offset-4">
          {section.title}
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{guide.title}</span>
      </nav>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {guide.draft ? <DraftBadge /> : null}
        <p className="text-sm font-semibold text-tide">{section.title}</p>
      </div>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-gulf sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-muted">
        {guide.date === guide.updated
          ? `Outlined ${formatDate(guide.date)}`
          : `Outlined ${formatDate(guide.date)} · Updated ${formatDate(guide.updated)}`}
      </p>
      <p className="mt-4 text-lg leading-relaxed">{guide.description}</p>
      {guide.draft ? (
        <div className="mt-6">
          <DraftBanner />
        </div>
      ) : null}
      <div className="mt-2">
        <MDXRemote source={guide.content} components={guideMdxComponents} />
      </div>
      <p className="mt-12">
        <Link href={topicPath(section.slug)} className="font-semibold text-tide underline underline-offset-4">
          More in {section.title}
        </Link>
      </p>
    </article>
  );
}
