import type { Metadata } from "next";
import Link from "next/link";
import { GuideList } from "@/components/GuideList";
import { LexingtonHero } from "@/components/LexingtonHero";
import { JsonLd } from "@/components/JsonLd";
import { SectionIcon } from "@/components/SectionIcon";
import { getAllGuides, publishedGuides } from "@/lib/guides";
import { SECTIONS, topicPath, WEEKEND_GUIDE_PATH } from "@/lib/sections";
import { SITE_URL } from "@/lib/site";
import { websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const quickStarts = [
  { title: "Your first weekend", href: WEEKEND_GUIDE_PATH, detail: "One day on the bay, one on the Gulf." },
  { title: "Pick a beach", href: topicPath("beaches"), detail: "Bayfront sand or a Gulf beach day." },
  { title: "Find a family outing", href: topicPath("family-and-kids"), detail: "From the aquarium to a playground break." },
  { title: "Choose where to eat", href: topicPath("food"), detail: "Find a stop near your plans." },
  { title: "Relocation checklist", href: topicPath("moving"), detail: "What to check before touring, signing, and moving in." },
] as const;

export default function HomePage() {
  const guides = publishedGuides(getAllGuides());

  return (
    <>
      <JsonLd data={websiteJsonLd(SITE_URL)} />
      <LexingtonHero />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <section aria-labelledby="quick-start-heading">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6">
            <h2 id="quick-start-heading" className="font-display text-3xl font-semibold tracking-tight">
              What are you planning?
            </h2>
            <Link href="/events/" className="inline-flex min-h-11 items-center font-semibold text-ocean underline underline-offset-4">
              Upcoming events
            </Link>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {quickStarts.map(({ title, href, detail }) => (
              <li key={href} id={href === topicPath("moving") ? "moving" : undefined}>
                <Link href={href} className="block h-full rounded-2xl bg-foam p-4 ring-1 ring-line hover:ring-ocean">
                  <span className="block font-semibold text-ocean underline underline-offset-4">{title}</span>
                  <span className="mt-1 block text-muted">{detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="sections" aria-labelledby="sections-heading" className="mt-12">
          <h2 id="sections-heading" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Explore by topic
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
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="guides" aria-labelledby="guides-heading" className="mt-14">
          <h2 id="guides-heading" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Corpus Christi guides
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Get the details for a museum visit, a fishing trip, a meal out, or a day at the national seashore.
          </p>
          <div className="mt-6">
            <GuideList guides={guides} />
          </div>
        </section>
      </div>
    </>
  );
}
