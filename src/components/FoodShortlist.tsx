const stops = [
  { id: "downtown", area: "Downtown", name: "Water Street Oyster Bar", detail: "Seafood on North Water Street, near the downtown seawall.", url: "https://waterstreetoysterbar.com/hours-location/", label: "Hours and location" },
  { id: "alameda", area: "Six Points or Lamar Park", name: "Hester’s Café", detail: "Breakfast or lunch at either South Alameda location.", url: "https://hesterscafe.com/", label: "Menus and locations" },
  { id: "everhart", area: "Everhart Road", name: "Kiko’s", detail: "Tex-Mex on Everhart Road.", url: "https://kikosmexicanfood.com/menu", label: "Menu" },
  { id: "causeway", area: "JFK Causeway", name: "Doc’s Seafood & Steaks", detail: "A seafood stop by the causeway between Flour Bluff and North Padre Island.", url: "https://docsseafoodandsteaks.com/menu/", label: "Menu" },
];

export function FoodShortlist() {
  return (
    <section aria-labelledby="food-shortlist" className="mt-8">
      <h2 id="food-shortlist" className="font-display text-2xl font-semibold">Where are you headed?</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {stops.map(({ id, area, name, detail, url, label }) => (
          <li key={id} id={id} className="rounded-2xl bg-foam p-4 ring-1 ring-line">
            <p className="text-sm font-semibold text-ocean">{area}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{name}</h3>
            <p className="mt-2 text-muted">{detail}</p>
            <a href={url} className="inline-flex min-h-11 items-center font-semibold text-ocean underline underline-offset-4">
              {label}<span className="sr-only"> for {name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
