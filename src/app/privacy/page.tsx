import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { SITE_CONTENT_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/dates";

const title = "Privacy";
const description = `What ${SITE_NAME} collects. This version has no analytics, no ads, and no contact form.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy/" },
  openGraph: {
    title,
    description,
    url: "/privacy/",
  },
};

export default function PrivacyPage() {
  const url = `${SITE_URL}/privacy/`;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Privacy", url },
        ])}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="font-semibold text-tide underline underline-offset-4">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Privacy</span>
      </nav>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gulf sm:text-5xl">Privacy</h1>
      <p className="mt-3 text-muted">Last updated {formatDate(SITE_CONTENT_UPDATED)}.</p>

      <div className="mt-8 space-y-8 text-lg leading-relaxed">
        <section aria-labelledby="privacy-what">
          <h2 id="privacy-what" className="font-display text-2xl font-semibold text-gulf">
            What this site is
          </h2>
          <p className="mt-3">
            {SITE_NAME} is a static local guide to Corpus Christi and the Coastal Bend. You can read it
            without an account. This version does not take comments, newsletter signups, or form submissions.
          </p>
        </section>

        <section aria-labelledby="privacy-tracking">
          <h2 id="privacy-tracking" className="font-display text-2xl font-semibold text-gulf">
            Analytics and advertising
          </h2>
          <p className="mt-3">
            This version loads no analytics scripts and no advertising scripts. It does not set cookies.
            If that changes, this page will say so before those scripts ship.
          </p>
        </section>

        <section aria-labelledby="privacy-email">
          <h2 id="privacy-email" className="font-display text-2xl font-semibold text-gulf">
            Email
          </h2>
          <p className="mt-3">
            The “Moving to Corpus Christi” card uses a mailto link to the email address on Kim Zill’s
            public Coldwell Banker profile. That opens your own email app. The message does not pass
            through this website, and the site has no inbox of its own.
          </p>
        </section>

        <section aria-labelledby="privacy-drafts">
          <h2 id="privacy-drafts" className="font-display text-2xl font-semibold text-gulf">
            Draft guides
          </h2>
          <p className="mt-3">
            Pages marked Draft are outlines. They are not finished local advice. They ask search engines
            not to index them.
          </p>
        </section>

        <section aria-labelledby="privacy-host">
          <h2 id="privacy-host" className="font-display text-2xl font-semibold text-gulf">
            Hosting
          </h2>
          <p className="mt-3">
            When the site is deployed, the host (planned: Cloudflare Pages) may keep standard technical
            logs, such as IP address, browser, and the URL requested, in order to run the service. This
            project does not add its own analytics on top of those logs.
          </p>
        </section>
      </div>
    </article>
  );
}
