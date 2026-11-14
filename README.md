# Coastal Bend Guide

A local guide to Corpus Christi and the Coastal Bend. The site is a Next.js static export: Markdown guides, no server, no analytics, and no ads. Sample guides are drafts.

## Local development

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` if you want a different canonical origin while developing. The default is `https://coastal-bend-guide.pages.dev`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static export into `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Vitest |

Preview the export the way Cloudflare will serve it:

```bash
npm run build
npx --yes serve out
```

## Cloudflare Pages

The project is set up for a git-connected Pages project, including preview deployments for pull requests.

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, then choose this repository.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `22` |

Set the environment variable `NODE_VERSION` to `22`. Cloudflare Pages reads that; it does not read `.nvmrc` by itself. Root directory stays `/`.

Also set `NEXT_PUBLIC_SITE_URL` to the production origin with no trailing slash, for example `https://example.com`. Sitemap URLs, canonical links, Open Graph, and JSON-LD use it. Change it when a custom domain is ready. The fallback in code is `https://coastal-bend-guide.pages.dev`.

Preview deployments are on for git-connected Pages projects: each pull request gets its own `*.pages.dev` URL. `public/_headers` sends `X-Robots-Tag: noindex, nofollow` on `:project.pages.dev` so previews stay out of search indexes. A custom production domain does not match that rule. If production itself is only a `pages.dev` hostname, delete that block or the live site will send `noindex`.

`output: "export"` in `next.config.ts` writes the site to `out/`. There is no Node server at runtime. The realtor contact is a `mailto:` link.

## Add a guide

1. Create `content/guides/your-slug.mdx`. The file name is the URL: `/guides/your-slug/`. Use lowercase words and hyphens.
2. Add frontmatter:

```mdx
---
title: "A specific, honest title"
description: "One or two sentences for search results and social cards."
section: beaches
date: "2026-11-14"
updated: "2026-11-14"
draft: true
---
```

`section` is one of: `things-to-do`, `beaches`, `fishing`, `family-and-kids`, `food`, `neighborhoods`, `moving`.

3. Write the body in Markdown. The page title comes from `title`, so start body headings at `##`. Keep `draft: true` until every fact is checked. Drafts render on the site with a banner, send `noindex`, and are left out of `sitemap.xml`.
4. Set `updated` to the day you changed the page. That date is `lastmod` once the guide is published.
5. Remove `draft: true` (or set it to `false`) when the page is ready. It then joins the sitemap and can be indexed.
6. If you change the homepage, a section intro, or the privacy page, bump `SITE_CONTENT_UPDATED` in `src/lib/site.ts`. Those pages use that date for `lastmod`. Guide dates do not use the build clock.

Images in a guide need explicit `width` and `height` so the page does not jump while they load. The sample guides have no content images.

## Realtor profile

The “Moving to Corpus Christi? Work with a local realtor” block reads `src/config/realtor.ts` only. Name, photo, brokerage, email, and phone are placeholders for a Coldwell Banker agent. Replace them there, and read the TODO in that file about brokerage advertising rules and required disclosures before treating the block as an ad.

The email button is `mailto:` plus the subject from that config. There is no contact form and no backend.

While `isPlaceholder` is true, the card says the profile is not real, and the page does not emit `RealEstateAgent` JSON-LD (no fake address, price, or review).

## Project layout

- `content/guides/` — MDX guides
- `src/app/` — routes: `/`, `/topics/[section]`, `/guides/[slug]`, `/privacy`, `sitemap.xml`, `robots.txt`
- `src/config/realtor.ts` — realtor profile
- `src/lib/` — guide parsing, sitemap dates, structured data
- `public/_headers` — preview `noindex` and a few security headers

## What this version leaves out

Analytics, ads, accounts, a contact form, and a real realtor profile. The privacy page says the same thing.
