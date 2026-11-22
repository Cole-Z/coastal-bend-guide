import Link from "next/link";
import { topicPath } from "@/lib/sections";

const city = "https://www.corpuschristitx.gov";
const utilityService = `${city}/department-directory/corpus-christi-water/pay-your-bill-new-service/`;
const emergencyManagement = `${city}/department-directory/office-of-emergency-management-oem/`;

export function MovingChecklist() {
  return (
    <div className="mt-6 space-y-8 text-lg leading-relaxed [&_a]:font-semibold [&_a]:text-ocean [&_a]:underline [&_a]:underline-offset-4">
      <p className="rounded-2xl bg-foam p-4 ring-1 ring-line">
        <Link href={topicPath("neighborhoods")} className="inline-flex min-h-11 items-center">
          Compare Corpus Christi neighborhoods
        </Link>
        <span className="block text-muted">Start with five areas, their main roads, and the crossings you might use every day.</span>
      </p>
      <nav aria-label="Relocation checklist" className="flex flex-wrap gap-x-5">
        <a className="inline-flex min-h-11 items-center" href="#before-touring">Before touring</a>
        <a className="inline-flex min-h-11 items-center" href="#before-signing">Before signing</a>
        <a className="inline-flex min-h-11 items-center" href="#before-move-in">Before move-in</a>
        <a className="inline-flex min-h-11 items-center" href="#realtor-heading">Ask Kim about relocating</a>
      </nav>
      <section aria-labelledby="before-touring">
        <h2 id="before-touring" className="font-display text-2xl font-semibold">Before touring</h2>
        <ul className="mt-3 list-disc space-y-3 pl-6">
          <li><strong>Try your daily drive.</strong> Use the actual address and travel at the hours you expect to commute. Include any bridge or causeway and the stops you make on a typical day.</li>
          <li><strong>Check service at the address.</strong> Ask who serves the property for water, sewer, trash, electricity, and gas if applicable. Check the exact house or unit on the <a href="https://help.bdc.fcc.gov/hc/en-us/articles/10467446103579-How-to-Use-the-FCC-s-National-Broadband-Map">FCC Broadband Map and address lookup instructions</a>, then confirm availability and installation with the provider.</li>
          <li><strong>Look up school assignment if relevant.</strong> Confirm the district and campus for the street address and grade with the district. The <Link href={topicPath("neighborhoods")}>neighborhood comparison</Link> links to district resources.</li>
        </ul>
      </section>
      <section aria-labelledby="before-signing">
        <h2 id="before-signing" className="font-display text-2xl font-semibold">Before signing</h2>
        <ul className="mt-3 list-disc space-y-3 pl-6">
          <li><strong>Look up flood information.</strong> Check the address with <a href={`${city}/department-directory/development-services/flood-information/`}>City Floodplain Management</a> and the <a href="https://msc.fema.gov/portal/home">FEMA Flood Map Service Center</a>. Ask about past water intrusion, the parking area and access roads, and any available elevation certificate.</li>
          <li><strong>Buyers.</strong> Ask an insurance agent about flood and wind/hail coverage, deductibles, and exclusions for that address. Ask the seller about roof work or additions and check <a href="https://www.tdi.texas.gov/wind/generalquestio.html">TDI’s windstorm questions</a> and <a href="https://appscenter.tdi.texas.gov/windstorm/p/searchForAppl">certificate lookup</a>. Confirm lender requirements and use the <a href="https://nuecescad.net/">Nueces Central Appraisal District</a> for property records if the parcel is in Nueces County. Confirm the county first and use its appraisal district if it differs.</li>
          <li><strong>Renters.</strong> Ask which utilities and fees the lease assigns to you, who handles storm repairs, and what the owner requires for renters insurance. Ask an insurance agent how a policy treats belongings, wind, and flood at that unit.</li>
        </ul>
      </section>
      <section aria-labelledby="before-move-in">
        <h2 id="before-move-in" className="font-display text-2xl font-semibold">Before move-in</h2>
        <ul className="mt-3 list-disc space-y-3 pl-6">
          <li>Arrange start dates for utilities and internet. Use <a href={utilityService}>Corpus Christi Water’s new service page</a> for City-served accounts and confirm the move-in date with each provider.</li>
          <li>Confirm insurance start dates. If renting, document the unit’s condition and confirm where to send maintenance requests.</li>
          <li>Sign up for <a href={`${city}/reversealert`}>Reverse Alert</a> and review the City’s <a href={emergencyManagement}>emergency information</a>. Save your household’s plan and check official instructions if a storm approaches.</li>
        </ul>
      </section>
    </div>
  );
}
