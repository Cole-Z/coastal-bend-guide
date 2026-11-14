const WIDTHS = [480, 768, 1024] as const;

const avifSrcSet = WIDTHS.map((width) => `/images/lexington/sunrise-${width}.avif ${width}w`).join(", ");
const webpSrcSet = WIDTHS.map((width) => `/images/lexington/sunrise-${width}.webp ${width}w`).join(", ");
const sizes = "100vw";

export function LexingtonHero() {
  return (
    <section className="relative isolate min-h-[34rem] overflow-hidden bg-night text-ink sm:min-h-[40rem]">
      <link
        rel="preload"
        as="image"
        href="/images/lexington/sunrise-1024.avif"
        imageSrcSet={avifSrcSet}
        imageSizes={sizes}
        type="image/avif"
        fetchPriority="high"
      />
      <picture className="absolute inset-0">
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <img
          src="/images/lexington/sunrise-1024.webp"
          srcSet={webpSrcSet}
          sizes={sizes}
          alt="USS Lexington aircraft carrier at sunrise on Corpus Christi Bay"
          width={1024}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[center_38%]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/75 via-night/25 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-end px-4 py-14 sm:min-h-[40rem] sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold drop-shadow-[0_1px_8px_rgb(7_11_18)]">A local guide</p>
        <h1 className="mt-3 max-w-xl font-display text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-balance text-ink drop-shadow-[0_2px_18px_rgb(7_11_18)] sm:text-6xl">
          Corpus Christi and the Coastal Bend.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-ink drop-shadow-[0_2px_12px_rgb(7_11_18)]">
          Beaches, fishing, food, neighborhoods, and what to know if you are moving here. The frame of
          the guide is ready. The sample pages are drafts.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#sections"
            className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 font-semibold text-gold-ink"
          >
            Browse sections
          </a>
          <a
            href="#moving"
            className="inline-flex items-center justify-center rounded-full border border-ink px-5 py-3 font-semibold text-ink"
          >
            Moving here
          </a>
        </div>
      </div>
      <p className="absolute bottom-4 right-4 rounded-full bg-night/80 px-3 py-1 text-xs font-medium text-gold sm:bottom-5 sm:right-5">
        Photo: Cole Zill
      </p>
    </section>
  );
}
