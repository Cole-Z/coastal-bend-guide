import Link from "next/link";
import { DraftBadge } from "@/components/DraftBadge";
import { getSection, guidePath } from "@/lib/sections";
import type { Guide } from "@/lib/guides";

export function GuideList({ guides }: { guides: readonly Guide[] }) {
  if (guides.length === 0) {
    return <p className="text-lg leading-relaxed text-muted">A guide for this section has not been written yet.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {guides.map((guide) => (
        <li key={guide.slug}>
          <GuideCard guide={guide} />
        </li>
      ))}
    </ul>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  const section = getSection(guide.section);
  return (
    <Link
      href={guidePath(guide.slug)}
      className="flex h-full flex-col rounded-3xl bg-foam p-5 ring-1 ring-line"
    >
      <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-tide">
        {guide.draft ? <DraftBadge /> : null}
        <span>{section.title}</span>
      </span>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-gulf">{guide.title}</h3>
      <span className="mt-2 leading-relaxed text-muted">{guide.description}</span>
    </Link>
  );
}
