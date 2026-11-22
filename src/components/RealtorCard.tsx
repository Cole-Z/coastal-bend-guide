import { realtor } from "@/config/realtor";
import { realtorMailto, realtorTel } from "@/lib/realtor-link";
import { JsonLd } from "@/components/JsonLd";
import { realtorAgentJsonLd } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site";
import { topicPath } from "@/lib/sections";

export function RealtorCard() {
  const headingId = "realtor-heading";
  const pageUrl = `${SITE_URL}${topicPath("moving")}`;
  return (
    <section aria-labelledby={headingId} className="rounded-[2rem] bg-foam p-6 ring-1 ring-line sm:p-8">
      <JsonLd data={realtorAgentJsonLd(realtor, pageUrl)} />
      <h2 id={headingId} tabIndex={-1} className="font-display text-3xl font-semibold tracking-tight text-ink">
        Ask Kim about relocating
      </h2>
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
          <p className="mt-4 leading-relaxed">
            In your email, share when you plan to move, whether you’re looking to rent or buy, and what you’d like to discuss.
          </p>
          {realtor.license ? <p className="mt-2 text-sm text-muted">{realtor.license}</p> : null}
          <div className="mt-5 flex flex-col items-start gap-3">
            <a
              href={realtorMailto(realtor)}
              className="inline-flex min-h-11 items-center rounded-full bg-ocean px-5 py-2.5 font-semibold text-ocean-ink"
            >
              Email Kim about moving
            </a>
            <a
              href={realtor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-ocean underline underline-offset-4"
            >
              {realtor.profileLinkLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="break-all text-sm text-muted">{realtor.email}</p>
            {realtor.phone ? (
              <a href={realtorTel(realtor.phone)} className="inline-flex min-h-11 items-center font-semibold text-ocean underline underline-offset-2">
                {realtor.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
