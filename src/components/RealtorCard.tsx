import { realtor } from "@/config/realtor";
import { realtorMailto, realtorTel } from "@/lib/realtor-link";
import { JsonLd } from "@/components/JsonLd";
import { realtorAgentJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import { topicPath } from "@/lib/sections";

type RealtorCardVariant = "feature" | "embedded";

function CardHeading({ variant, headingId }: { variant: RealtorCardVariant; headingId: string }) {
  switch (variant) {
    case "feature":
      return (
        <div>
          <h2 id={headingId} className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Moving to Corpus Christi?
          </h2>
          <p className="mt-2 font-display text-2xl text-ocean">Work with a local realtor</p>
        </div>
      );
    case "embedded":
      return (
        <h2 id={headingId} className="font-display text-3xl font-semibold tracking-tight text-ink">
          Work with a local realtor
        </h2>
      );
    default: {
      const exhaustive: never = variant;
      return exhaustive;
    }
  }
}

export function RealtorCard({
  variant = "feature",
  headingId = "realtor-heading",
}: {
  variant?: RealtorCardVariant;
  headingId?: string;
}) {
  const pageUrl = `${SITE_URL}${topicPath("moving")}`;
  return (
    <section aria-labelledby={headingId} className="rounded-[2rem] bg-foam p-6 ring-1 ring-line sm:p-8">
      <JsonLd data={realtorAgentJsonLd(realtor, pageUrl)} />
      <CardHeading variant={variant} headingId={headingId} />
      <div className="mt-6 grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
        {/* Fixed 160×160 box. The file is 480×480 so the circle stays sharp. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={realtor.photo.src}
          alt={realtor.photo.alt}
          width={realtor.photo.width}
          height={realtor.photo.height}
          loading="lazy"
          className="h-40 w-40 rounded-full bg-sand object-cover"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-ocean">{realtor.brokerage}</p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink">{realtor.name}</p>
          <p className="mt-1 text-muted">{realtor.role}</p>
          {realtor.officeCity ? <p className="mt-1 text-muted">{realtor.officeCity}</p> : null}
          {realtor.officeAddress ? <p className="text-muted">{realtor.officeAddress}</p> : null}
          {realtor.bio ? <p className="mt-4 leading-relaxed text-ink">{realtor.bio}</p> : null}
          {realtor.isPlaceholder ? (
            <p className="mt-4 leading-relaxed text-ink">
              Placeholder only. This name, photo, and email are not a real profile and this block is not an
              advertisement. Brokerage advertising rules and required disclosures are not applied yet.
            </p>
          ) : (
            <p className="mt-4 leading-relaxed text-ink">
              {realtor.disclosure ||
                "Add the brokerage’s required advertising disclosures in the realtor config before treating this as an ad."}
            </p>
          )}
          {realtor.license ? <p className="mt-2 text-sm text-muted">{realtor.license}</p> : null}
          <div className="mt-5 flex flex-col items-start gap-3">
            <a
              href={realtor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-ocean px-5 py-2.5 font-semibold text-ocean-ink"
            >
              {realtor.profileLinkLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={realtorMailto(realtor)}
              className="inline-flex rounded-full border border-ocean px-5 py-2.5 font-semibold text-ocean"
            >
              Email about moving
            </a>
            {realtor.isPlaceholder ? (
              <p className="text-sm text-muted">
                Placeholder address (not a monitored inbox): {realtor.email}
              </p>
            ) : (
              <p className="text-sm text-muted">{realtor.email}</p>
            )}
            {realtor.phone ? (
              <a href={realtorTel(realtor.phone)} className="font-semibold text-ocean underline underline-offset-2">
                {realtor.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
