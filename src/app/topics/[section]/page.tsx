import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideList } from "@/components/GuideList";
import { JsonLd } from "@/components/JsonLd";
import { RealtorCard } from "@/components/RealtorCard";
import { getGuidesBySection } from "@/lib/guides";
import { getSection, isSectionSlug, SECTIONS, topicPath } from "@/lib/sections";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { breadcrumbJsonLd, topicPageJsonLd } from "@/lib/structured-data";

interface TopicPageProps {
  params: Promise<{ section: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { section: slug } = await params;
  if (!isSectionSlug(slug)) return { title: "Section not found" };
  const section = getSection(slug);
  const description = section.intro;
  const path = topicPath(section.slug);
  return {
    title: section.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: section.title,
      description,
      url: path,
    },
  };
}

function TopicExtra({ section }: { section: ReturnType<typeof getSection>["slug"] }) {
  switch (section) {
    case "moving":
      return (
        <div className="mt-10">
          <RealtorCard variant="embedded" />
        </div>
      );
    case "things-to-do":
    case "beaches":
    case "fishing":
    case "family-and-kids":
    case "food":
    case "neighborhoods":
      return null;
    default: {
      const exhaustive: never = section;
      return exhaustive;
    }
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { section: slug } = await params;
  if (!isSectionSlug(slug)) notFound();
  const section = getSection(slug);
  const guides = getGuidesBySection(section.slug);
  const url = `${SITE_URL}${topicPath(section.slug)}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: section.title, url },
        ])}
      />
      <JsonLd data={topicPageJsonLd({ name: section.title, description: section.intro, url })} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="font-semibold text-ocean underline underline-offset-4">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{section.title}</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {section.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed">{section.intro}</p>
      <section aria-labelledby="topic-guides" className="mt-10">
        <h2 id="topic-guides" className="font-display text-2xl font-semibold text-ink">
          Guides
        </h2>
        <div className="mt-4">
          <GuideList guides={guides} />
        </div>
      </section>
      <TopicExtra section={section.slug} />
      <p className="mt-10 text-sm text-muted">
        Part of {SITE_NAME}. Draft guides stay out of the sitemap until their facts are checked.
      </p>
    </article>
  );
}
