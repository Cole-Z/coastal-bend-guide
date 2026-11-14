import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">That page is not on this guide.</h1>
      <p className="mt-4 text-lg leading-relaxed">The link may be old, or the guide has not been written yet.</p>
      <p className="mt-6">
        <Link href="/" className="font-semibold text-ocean underline underline-offset-4">
          Back to the homepage
        </Link>
      </p>
    </div>
  );
}
