import type { SectionSlug } from "@/lib/sections";

interface IconProps {
  slug: SectionSlug;
  className?: string;
}

export function SectionIcon({ slug, className }: IconProps) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": true as const,
    className,
  };

  switch (slug) {
    case "things-to-do":
      return (
        <svg {...common}>
          <circle cx="16" cy="13" r="5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M6 24c3.2-4 6.2-4 9.4 0s6.2 4 10.6 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "beaches":
      return (
        <svg {...common}>
          <path d="M4 12c2.4 2.2 4.2 2.2 6.6 0S15 9.8 17.4 12s4.2 2.2 6.6 0 4.2-2.2 4 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M4 18c2.4 2.2 4.2 2.2 6.6 0S15 15.8 17.4 18s4.2 2.2 6.6 0 4.2-2.2 4 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M4 24c2.4 2.2 4.2 2.2 6.6 0S15 21.8 17.4 24s4.2 2.2 6.6 0 4.2-2.2 4 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "fishing":
      return (
        <svg {...common}>
          <path d="M8 6v10c0 4 3 7 7 7h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="20" cy="23" r="3.25" stroke="currentColor" strokeWidth="1.75" />
          <path d="M23 23h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "family-and-kids":
      return (
        <svg {...common}>
          <circle cx="11" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="21" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M6 25c.6-3.2 2.6-5 5-5s4.2 1.6 5 4M16 24c.8-2.4 2.4-4 4.6-4 2.4 0 4.2 1.8 5.4 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "food":
      return (
        <svg {...common}>
          <path d="M7 14h18c-.6 5-3.4 8-9 8s-8.4-3-9-8z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M6 14h20M12 22v3M20 22v3M10 25h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "neighborhoods":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <rect x="18" y="6" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <rect x="6" y="18" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <rect x="18" y="18" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "moving":
      return (
        <svg {...common}>
          <path d="M6 15.5 16 7l10 8.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 14.5V25h14V14.5" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M14 25v-6h4v6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      );
    default: {
      const exhaustive: never = slug;
      return exhaustive;
    }
  }
}
