const WIDTHS = [640, 1024, 1600, 2048, 2560] as const;
const HERO_CAP_PX = 1760;

const avifSrcSet = WIDTHS.map((width) => `/images/lexington/sunrise-${width}.avif ${width}w`).join(", ");
const webpSrcSet = WIDTHS.map((width) => `/images/lexington/sunrise-${width}.webp ${width}w`).join(", ");
const sizes = `(min-width: ${HERO_CAP_PX}px) ${HERO_CAP_PX}px, 100vw`;

export function LexingtonHero() {
  return (
    <section className="relative isolate min-h-[34rem] overflow-hidden bg-sand text-ink sm:min-h-[40rem]">
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
        className="hero-blur absolute inset-0 bg-cover bg-[center_38%]"
        style={{ backgroundImage: "url(/images/lexington/sunrise-1024.webp)" }}
      />
      <div className="hero-photo-frame pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1760px] -translate-x-1/2">
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
      </div>
      <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-end px-4 py-14 sm:min-h-[40rem] sm:py-16">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">A local guide</p>
          <h1 className="mt-3 font-display text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-balance text-ink sm:text-6xl">
            Corpus Christi and the Coastal Bend.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-ink">
            Beaches, fishing, food, neighborhoods, and what to know if you are moving here.
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
      <p className="absolute bottom-4 right-4 rounded-full bg-sand px-3 py-1 text-xs font-medium text-gold sm:bottom-5 sm:right-5">
        Photo: Cole Zill
      </p>
    </section>
  );
}
