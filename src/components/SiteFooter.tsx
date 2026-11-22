import { realtor } from "@/config/realtor";
import Link from "next/link";
import { SECTIONS, topicPath } from "@/lib/sections";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-foam text-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-semibold">{SITE_NAME}</p>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">
            Cole Zill runs CC Bay Life and took the Lexington photo on the homepage. Kim Zill, the real estate salesperson featured in the moving guide, is his mother.
          </p>
          {realtor.iabsUrl || realtor.consumerProtectionNoticeUrl ? (
            <ul aria-label="Texas Real Estate Commission notices" className="mt-4 space-y-2 font-semibold text-ocean underline underline-offset-4">
              {realtor.iabsUrl ? (
                <li><a href={realtor.iabsUrl}>Texas Real Estate Commission Information About Brokerage Services</a></li>
              ) : null}
              {realtor.consumerProtectionNoticeUrl ? (
                <li><a href={realtor.consumerProtectionNoticeUrl}>Texas Real Estate Commission Consumer Protection Notice</a></li>
              ) : null}
            </ul>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <nav aria-label="Footer sections">
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean">Sections</p>
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
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean">Site</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events/" className="underline-offset-4 hover:underline">Events</Link>
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
