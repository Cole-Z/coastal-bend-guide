import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FoodShortlist } from "@/components/FoodShortlist";
import { MovingChecklist } from "@/components/MovingChecklist";
import { NeighborhoodComparison } from "@/components/NeighborhoodComparison";
import { GuideList } from "@/components/GuideList";
import { JsonLd } from "@/components/JsonLd";
import { RealtorCard } from "@/components/RealtorCard";
import { getGuidesBySection, publishedGuides } from "@/lib/guides";
import { getSection, isSectionSlug, SECTIONS, topicPath, WEEKEND_GUIDE_PATH } from "@/lib/sections";
import { SITE_URL } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
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
    title: section.searchTitle,
    description,
    alternates: { canonical: path },
    ...socialMetadata({ title: section.searchTitle, description, path }),
  };
}

function BeachOverview() {
  return (
    <section aria-labelledby="beach-options" className="mt-8 rounded-2xl bg-foam p-5 ring-1 ring-line">
      <h2 id="beach-options" className="font-display text-2xl font-semibold">Bay or Gulf?</h2>
      <ul className="mt-3 list-disc space-y-3 pl-5 text-lg leading-relaxed">
        <li><strong>Corpus Christi Bay.</strong> McGee Beach is by the downtown seawall. North Beach is across the Harbor Bridge beside the Lexington and aquarium. See the <a className="font-semibold text-ocean underline underline-offset-4" href="https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/bay-beaches/">City’s bay beach information</a>.</li>
        <li><strong>Gulf.</strong> Whitecap is a city beach, Mustang Island State Park is managed by Texas Parks and Wildlife, and Malaquite is part of Padre Island National Seashore. Each has its own parking or entry rules. See the <Link href={`${WEEKEND_GUIDE_PATH}#day-2-pick-one-gulf-beach`} className="font-semibold text-ocean underline underline-offset-4">three-way Gulf beach comparison</Link> for conditions and entry links.</li>
      </ul>
    </section>
  );
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { section: slug } = await params;
  if (!isSectionSlug(slug)) notFound();
  const section = getSection(slug);
  const guides = publishedGuides(getGuidesBySection(section.slug));
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
      {slug === "beaches" ? <BeachOverview /> : null}
      {slug === "food" ? <FoodShortlist /> : null}
      {slug === "neighborhoods" ? <NeighborhoodComparison /> : null}
      {slug === "moving" ? (
        <>
          <MovingChecklist />
          <div className="mt-10"><RealtorCard /></div>
        </>
      ) : null}
      {guides.length > 0 ? (
        <section aria-labelledby="topic-guides" className="mt-10">
          <h2 id="topic-guides" className="font-display text-2xl font-semibold text-ink">
            {slug === "food" ? "More places to eat and drink" : "Guides"}
          </h2>
          <div className="mt-4">
            <GuideList guides={guides} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
