import Link from "next/link";
import { SECTIONS, topicPath } from "@/lib/sections";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-night text-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-semibold">{SITE_NAME}</p>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            Corpus Christi and the Coastal Bend. Guides marked Draft are outlines, not finished local advice.
          </p>
          <p className="mt-4 text-sm text-muted">No analytics and no ads in this version.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <nav aria-label="Footer sections">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">Sections</p>
            <ul className="mt-3 space-y-2">
              {SECTIONS.map((section) => (
                <li key={section.slug}>
                  <Link href={topicPath(section.slug)} className="underline-offset-4 hover:underline">
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="About the site">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">Site</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="underline-offset-4 hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
