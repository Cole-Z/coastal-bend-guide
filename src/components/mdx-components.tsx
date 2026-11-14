import type { MDXComponents } from "mdx/types";

export const guideMdxComponents: MDXComponents = {
  h1: (props) => <h2 className="mt-10 font-display text-3xl font-semibold tracking-tight text-gulf" {...props} />,
  h2: (props) => <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight text-gulf" {...props} />,
  h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold text-gulf" {...props} />,
  p: (props) => <p className="mt-4 text-lg leading-relaxed text-ink" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed text-ink" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-lg leading-relaxed text-ink" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  a: (props) => (
    <a className="font-semibold text-tide underline decoration-tide/40 underline-offset-2 hover:decoration-tide" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-4 border-sunset bg-foam px-4 py-3 text-ink [&_p]:m-0 [&_p]:text-base" {...props} />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
};
