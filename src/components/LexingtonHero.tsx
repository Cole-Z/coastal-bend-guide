const WIDTHS = [640, 1024, 1600, 2048, 2560] as const;
const HERO_CAP_PX = 1760;

const avifSrcSet = WIDTHS.map((width) => `/images/lexington/sunrise-${width}.avif ${width}w`).join(", ");
const webpSrcSet = WIDTHS.map((width) => `/images/lexington/sunrise-${width}.webp ${width}w`).join(", ");
const sizes = `(min-width: ${HERO_CAP_PX}px) ${HERO_CAP_PX}px, 100vw`;

export function LexingtonHero() {
  return (
    <section className="relative isolate overflow-hidden bg-sand text-ink sm:min-h-[40rem]">
      <link
        rel="preload"
        as="image"
        href="/images/lexington/sunrise-1600.avif"
        imageSrcSet={avifSrcSet}
        imageSizes={sizes}
        type="image/avif"
        fetchPriority="high"
      />
      <div
        aria-hidden="true"
        className="hero-blur absolute inset-0 hidden bg-cover bg-[center_38%] sm:block"
        style={{ backgroundImage: "url(/images/lexington/sunrise-1024.webp)" }}
      />
      <div className="hero-photo-frame relative aspect-[4/3] w-full sm:pointer-events-none sm:absolute sm:inset-y-0 sm:left-1/2 sm:aspect-auto sm:h-auto sm:w-full sm:max-w-[1760px] sm:-translate-x-1/2">
        <picture className="absolute inset-0">
          <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
          <img
            src="/images/lexington/sunrise-1600.webp"
            srcSet={webpSrcSet}
            sizes={sizes}
            alt="USS Lexington aircraft carrier at sunrise on Corpus Christi Bay"
            width={2560}
            height={1920}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[center_38%]"
          />
        </picture>
        <p className="absolute bottom-3 right-3 rounded-full bg-sand px-3 py-1 text-xs font-medium text-gold sm:hidden">
          Photo: Cole Zill
        </p>
      </div>
      <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0 hidden sm:block" />
      <div className="relative mx-auto flex max-w-6xl flex-col px-4 py-10 sm:min-h-[40rem] sm:justify-end sm:py-16">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">A local guide</p>
          <h1 className="mt-3 font-display text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-balance text-ink sm:text-6xl">
            Corpus Christi and the Coastal Bend.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-ink">
            Beaches, fishing, food, neighborhoods, and what to know if you are moving here. The frame of
            the guide is ready. The sample pages are drafts.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sections"
              className="inline-flex items-center justify-center rounded-full bg-ocean px-5 py-3 font-semibold text-ocean-ink"
            >
              Browse sections
            </a>
            <a
              href="#moving"
              className="inline-flex items-center justify-center rounded-full border border-ocean bg-sand px-5 py-3 font-semibold text-ocean"
            >
              Moving here
            </a>
          </div>
        </div>
      </div>
      <p className="absolute bottom-5 right-5 hidden rounded-full bg-sand px-3 py-1 text-xs font-medium text-gold sm:block">
        Photo: Cole Zill
      </p>
    </section>
  );
}
