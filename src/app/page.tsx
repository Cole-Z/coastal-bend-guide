import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/GuideList";
import { LexingtonHero } from "@/components/LexingtonHero";
import { JsonLd } from "@/components/JsonLd";
import { RealtorCard } from "@/components/RealtorCard";
import { SectionIcon } from "@/components/SectionIcon";
import { getAllGuides } from "@/lib/guides";
import { SECTIONS, topicPath } from "@/lib/sections";
import { SITE_URL } from "@/lib/site";
import { websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  const guides = getAllGuides();

  return (
    <>
      <JsonLd data={websiteJsonLd(SITE_URL)} />
      <LexingtonHero />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="max-w-3xl text-lg leading-relaxed text-ink" role="note">
          Corpus Christi sits on a bay along the Texas Gulf Coast. The Coastal Bend is that curve of coast,
          the city included. Guides linked below are drafts: outlines for pages that are not written yet.
          They are not reviews, and they do not list prices, hours, or addresses.
        </p>

        <section id="sections" aria-labelledby="sections-heading" className="mt-12">
          <h2 id="sections-heading" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Start with a section
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((section) => (
              <li key={section.slug}>
                <Link
                  href={topicPath(section.slug)}
                  className="flex h-full flex-col rounded-3xl bg-foam p-5 ring-1 ring-line"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-ocean">
                    <SectionIcon slug={section.slug} />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                    {section.title}
                  </h3>
                  <span className="mt-2 leading-relaxed text-muted">{section.summary}</span>
                  <span className="mt-4 text-sm font-semibold text-ocean underline underline-offset-4">
                    Open section
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div id="moving" className="mt-16">
          <RealtorCard />
        </div>

        <section id="guides" aria-labelledby="guides-heading" className="mt-16">
          <h2 id="guides-heading" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Draft guides
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Four sample pages, marked draft so they stay out of the sitemap until the facts are checked.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
