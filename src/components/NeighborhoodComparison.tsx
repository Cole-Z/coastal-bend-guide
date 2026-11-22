import Link from "next/link";
import { topicPath } from "@/lib/sections";

const corpusChristiIsd = {
  label: "Corpus Christi ISD address locator",
  url: "https://www.schoolsitelocator.com/apps/corpuschristi/",
};
const flourBluffIsd = {
  label: "Flour Bluff ISD boundaries and enrollment",
  url: "https://flourbluffschools.net/district-resources/",
};
const plans = "https://www.corpuschristitx.gov/media";

const areas = [
  {
    name: "Downtown and the Bayfront",
    geography: "The downtown street grid meets Corpus Christi Bay at the seawall and marina. The city’s Downtown plan covers a broader area than the blocks around the marina.",
    roads: "Shoreline Boulevard and Water Street run along or near the waterfront. The Harbor Bridge crosses the ship channel toward North Beach.",
    landmarks: "Corpus Christi Marina and Mirador de la Flor.",
    check: "Check resident and guest parking for the building and try your usual route when downtown events are underway.",
    district: corpusChristiIsd,
    plan: `${plans}/ludbtmfu/downtown-adp.pdf`,
    planLabel: "City Downtown plan",
  },
  {
    name: "Bay Area",
    geography: "Use the city’s Bayside planning area to orient yourself along the mainland bayfront and toward Oso Bay. People may use “Bay Area” more narrowly.",
    roads: "Ocean Drive follows the bayfront. South Alameda Street runs through the area and South Padre Island Drive borders the planning area to the south.",
    landmarks: "Swantner Park and the public waterfront along Ocean Drive.",
    check: "Try the route from the address to Ocean Drive or South Padre Island Drive. Check sidewalks and crossings along the blocks you expect to walk.",
    district: corpusChristiIsd,
    plan: `${plans}/uhsbzrcx/bayside-adp.pdf`,
    planLabel: "City Bayside plan",
  },
  {
    name: "Southside",
    geography: "The City’s Southside plan covers mainland areas south of South Padre Island Drive and reaches toward Oso Bay and Oso Creek.",
    roads: "South Staples Street, Rodd Field Road, and Yorktown Boulevard are useful cross streets for locating an address.",
    landmarks: "Oso Bay Wetlands Preserve and Learning Center.",
    check: "Drive the route to South Padre Island Drive or your regular destinations. Confirm the school district and utility provider at the address, especially toward the city’s edges.",
    district: corpusChristiIsd,
    plan: `${plans}/d0tlcgwd/southside-adp.pdf`,
    planLabel: "City Southside plan",
  },
  {
    name: "Flour Bluff",
    geography: "The mainland area between Oso Bay and the Laguna Madre, west of North Padre and Mustang islands.",
    roads: "South Padre Island Drive crosses the area. Waldron Road runs through the Bluff, and the JFK Causeway connects to North Padre Island.",
    landmarks: "Parker Park and the Laguna Madre waterfront.",
    check: "Test the turns and access to South Padre Island Drive. Confirm which entity provides water, wastewater, and trash at the address.",
    district: flourBluffIsd,
    plan: `${plans}/qozmy20a/flour-bluff-adp.pdf`,
    planLabel: "City Flour Bluff plan",
  },
  {
    name: "North Padre Island",
    geography: "The barrier-island area across the JFK Causeway, between the Laguna Madre and the Gulf. The city plan also covers Mustang Island.",
    roads: "Park Road 22 continues from the causeway, and State Highway 361 heads toward Mustang Island.",
    landmarks: "Whitecap Beach and Packery Channel.",
    check: "Try the causeway trip at your commute hours. Check flood information, insurance questions, and internet installation for the exact address.",
    district: flourBluffIsd,
    plan: `${plans}/0qokvibl/padre-mustang-island-adp.pdf`,
    planLabel: "City Padre/Mustang Island plan",
  },
];

export function NeighborhoodComparison() {
  return (
    <div className="mt-6 space-y-6 text-lg leading-relaxed [&_a]:font-semibold [&_a]:text-ocean [&_a]:underline [&_a]:underline-offset-4">
      <p>
        Area names in listings and conversation can overlap. The linked city planning maps show planning boundaries. Use the <a href="https://tea.texas.gov/families-and-students/school-district-locator/school-district-locator">Texas Education Agency district map</a> for an initial check, then give the appropriate district the exact address and grade to confirm school assignment.
      </p>
      {areas.map(({ name, geography, roads, landmarks, check, district, plan, planLabel }) => (
        <section key={name} className="rounded-2xl bg-foam p-5 ring-1 ring-line sm:p-6">
          <h2 className="font-display text-2xl font-semibold">{name}</h2>
          <dl className="mt-3 space-y-3">
            <div><dt className="font-semibold">Geography</dt><dd>{geography}</dd></div>
            <div><dt className="font-semibold">Roads and crossings</dt><dd>{roads}</dd></div>
            <div><dt className="font-semibold">Public landmarks</dt><dd>{landmarks}</dd></div>
            <div><dt className="font-semibold">Check at the address</dt><dd>{check}</dd></div>
          </dl>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-base">
            <a className="inline-flex min-h-11 items-center" href={plan}>{planLabel} (PDF)</a>
            <a className="inline-flex min-h-11 items-center" href={district.url}>{district.label}</a>
          </p>
        </section>
      ))}
      <p className="text-sm text-muted">Planning and district links checked November 22, 2026.</p>
      <div className="flex flex-wrap gap-x-6">
        <Link href={topicPath("moving")} className="inline-flex min-h-11 items-center">Back to the relocation checklist</Link>
        <Link href={`${topicPath("moving")}#realtor-heading`} className="inline-flex min-h-11 items-center">Ask Kim about relocating</Link>
      </div>
    </div>
  );
}
