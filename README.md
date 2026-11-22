# CC Bay Life

A local guide to Corpus Christi and the Coastal Bend, at [ccbaylife.com](https://ccbaylife.com). The site is a Next.js static export: Markdown guides, no server, no analytics, and no ads. Draft guide URLs are available for direct preview. The homepage hero is Cole Zill’s photo of the USS Lexington at sunrise, served as responsive WebP and AVIF from `public/images/lexington/`.

## Local development

Requires Node 22. `.nvmrc`, `.node-version`, and `package.json` `engines` all pin that major. Workers Builds reads the version files, so the build does not need a `NODE_VERSION` variable. The Workers build image defaults to Node 24 without them.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Copy `.env.example` to `.env.local` if you want a different canonical origin while developing. The default is `https://ccbaylife.com`.

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

## Cloudflare Workers

The site is a static export. `wrangler.jsonc` serves `out/` as Workers static assets. There is no Worker script.

Workers Builds settings for this repo:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Build variables | none |

`NEXT_PUBLIC_SITE_URL` is optional. When it is unset, canonical URLs, the sitemap, Open Graph, and JSON-LD use `https://ccbaylife.com`. Set it only to publish a different origin.

`output: "export"` and `trailingSlash: true` write each route as `route/index.html`. `assets.html_handling` is `auto-trailing-slash`, so `/privacy/` serves `out/privacy/index.html` and `/privacy` redirects to `/privacy/`. `assets.not_found_handling` is `404-page`, so an unknown path returns `404.html` with status 404.

Check the package locally without publishing:

```bash
npm run build && npx wrangler deploy --dry-run
```

### Custom domain

After a deploy, attach the domain on the Worker:

1. In the Cloudflare dashboard, go to **Workers & Pages** and open the `coastal-bend-guide` Worker.
2. Open the **Domains** tab.
3. Add `ccbaylife.com` as a custom domain.

The zone for `ccbaylife.com` has to be on the same Cloudflare account. Cloudflare creates the DNS record and certificate. A custom domain on the apex does not also cover `www`. Add `www` separately if you want it.

`public/_headers` is copied into `out/` and applies the security headers. It also sends `noindex` on `*.workers.dev` hostnames. `ccbaylife.com` does not match that rule. The realtor contact is still a `mailto:` link. There is no server runtime.

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

3. Write the body in Markdown. The page title comes from `title`, so start body headings at `##`. Keep `draft: true` until every fact is checked. Drafts render on the site with a banner, send `noindex`, and are left out of `sitemap.xml`. They also stay out of `llms.txt` and do not get a public `.md` file. A published guide is written to `/guides/your-slug.md` during `npm run build`, and that URL is listed in `/llms.txt`. Every guide page has Copy for AI and Download .md controls for that same text.
4. Set `updated` to the day you changed the page. That date is `lastmod` once the guide is published.
5. Remove `draft: true` (or set it to `false`) when the page is ready. It then joins the sitemap and can be indexed.
6. For changes to homepage or topic copy, update `SITE_CONTENT_UPDATED` in `src/lib/site.ts`. Use `PRIVACY_UPDATED` for the privacy page. Guide dates come from front matter.

Images in a guide need explicit `width` and `height` so the page does not jump while they load. The sample guides have no content images.

## Events and relocation

Edit the curated events in `content/events.json`. See the [release handoff](docs/cc-bay-life-release.md) for the weekly publishing check and launch review.

The moving hub reads Kim Zill’s public profile and contact details from `src/config/realtor.ts`. Its contact links use native email and telephone handlers. **Owner and sponsoring broker review is required before rolling out the new presentation.** Add approved notice URLs through the config after that review.

## Project layout

- `content/guides/` — MDX guides
- `src/app/` — routes: `/`, `/topics/[section]`, `/guides/[slug]`, `/events`, `/privacy`, `sitemap.xml`, `robots.txt`, plus `/llms.txt` and published `/guides/[slug].md` written at the end of the build
- `src/config/realtor.ts` — realtor profile
- `src/lib/` — guide parsing, sitemap dates, structured data
- `public/_headers` — preview `noindex` and a few security headers

## What this version leaves out

Analytics, ads, accounts, and a contact form. The privacy page says the same thing.
