import Link from "next/link";
import { PRODUCTION_SITE_URL } from "@/lib/site";
import type { MDXComponents } from "mdx/types";

export const guideMdxComponents: MDXComponents = {
  h1: (props) => <h2 className="mt-10 font-display text-3xl font-semibold tracking-tight text-ink" {...props} />,
  h2: ({ children, ...props }) => (
    <h2
      id={typeof children === "string" ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : undefined}
      className="mt-10 font-display text-2xl font-semibold tracking-tight text-ink"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold text-ink" {...props} />,
  p: (props) => <p className="mt-4 text-lg leading-relaxed text-ink" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-lg leading-relaxed text-ink" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  a: ({ href, ...props }) => {
    const className = "font-semibold text-ocean underline decoration-ocean/40 underline-offset-2 hover:decoration-ocean";
    if (href?.startsWith(`${PRODUCTION_SITE_URL}/`)) {
      return <Link href={href.slice(PRODUCTION_SITE_URL.length)} className={className} {...props} />;
    }
    return <a href={href} className={className} {...props} />;
  },
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-4 border-ocean bg-foam px-4 py-3 text-ink [&_p]:m-0 [&_p]:text-base" {...props} />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
};
