"use client";

import Link from "next/link";
import { useState } from "react";
import { SECTIONS, topicPath } from "@/lib/sections";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-gulf text-sand">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
            <rect width="32" height="32" rx="8" fill="#1f6f74" />
            <path
              d="M4 21c3.2-4 6-4 9.2 0s6 4 9.2 0 5.2-4 5.6-4"
              stroke="#f3ecdf"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="23" cy="10" r="2.5" fill="#e7b48a" />
          </svg>
          {SITE_NAME}
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-x-5 lg:flex">
          {SECTIONS.map((section) => (
            <Link
              key={section.slug}
              href={topicPath(section.slug)}
              className="whitespace-nowrap text-sm font-semibold text-sand/90 underline-offset-4 hover:underline"
            >
              {section.navLabel}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-full border border-sand/70 px-4 text-sm font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-menu" aria-label="Sections" className="border-t border-white/10 px-4 py-2 lg:hidden">
          <ul className="mx-auto max-w-6xl">
            {SECTIONS.map((section) => (
              <li key={section.slug}>
                <Link
                  href={topicPath(section.slug)}
                  className="block rounded-xl px-2 py-3 text-base font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
