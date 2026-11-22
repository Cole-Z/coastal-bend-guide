import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const out = path.resolve("out");
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ccbaylife.com").origin;
const imageUrl = "https://ccbaylife.com/images/cc-bay-life-share.png";
const read = (file) => readFileSync(path.join(out, file), "utf8");
const htmlFile = (pathname) => path.join(pathname, "index.html");

function attributes(html, tagName) {
  return Array.from(html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi")), ([tag]) =>
    Object.fromEntries(Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g), ([, name, value]) => [name, value])),
  );
}

function metaTags(html) {
  return new Map(attributes(html, "meta").map(({ name, property, content }) => [name ?? property, content]));
}

const sitemap = Array.from(read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => url);
const guides = readdirSync("content/guides").filter((file) => file.endsWith(".mdx")).map((file) => ({
  slug: path.basename(file, ".mdx"),
  draft: matter(readFileSync(path.join("content/guides", file), "utf8")).data.draft,
}));
const drafts = new Set(guides.filter(({ draft }) => draft).map(({ slug }) => `/guides/${slug}/`));
const llms = read("llms.txt");

assert(sitemap.includes(`${origin}/`), "Homepage missing from sitemap");
const internalTargets = new Set();
for (const canonical of sitemap) {
  const url = new URL(canonical);
  assert.equal(url.origin, origin);
  assert(url.pathname.endsWith("/"), canonical);
  assert(!drafts.has(url.pathname), `Draft in sitemap: ${canonical}`);

  const html = read(htmlFile(url.pathname));
  const metadata = metaTags(html);
  assert.equal(attributes(html, "link").find(({ rel }) => rel === "canonical")?.href, canonical);
  assert(!metadata.get("robots")?.includes("noindex"), `Public noindex: ${canonical}`);
  assert(html.match(/<title>[^<]+<\/title>/), `Missing title: ${canonical}`);
  assert(metadata.get("og:title")?.trim(), `Missing social title: ${canonical}`);
  assert.equal(metadata.get("twitter:title"), metadata.get("og:title"), canonical);
  assert(metadata.get("description")?.trim(), `Missing description: ${canonical}`);
  assert.equal(metadata.get("og:description"), metadata.get("description"), canonical);
  assert.equal(metadata.get("twitter:description"), metadata.get("description"), canonical);
  assert.equal(metadata.get("og:url"), canonical);
  assert.equal(metadata.get("og:image"), imageUrl);
  assert.equal(metadata.get("og:image:type"), "image/png");
  assert.equal(metadata.get("og:image:width"), "1200");
  assert.equal(metadata.get("og:image:height"), "630");
  assert(metadata.get("og:image:alt")?.trim(), `Missing image alt text: ${canonical}`);
  assert.equal(metadata.get("twitter:card"), "summary_large_image");
  assert.equal(metadata.get("twitter:image"), imageUrl);
  assert.equal(metadata.get("twitter:image:alt"), metadata.get("og:image:alt"));

  for (const { href } of attributes(html, "a")) {
    if (!href) continue;
    const target = new URL(href, canonical);
    if (![origin, "https://ccbaylife.com"].includes(target.origin)) continue;
    assert(!drafts.has(target.pathname), `Public link to draft: ${href}`);
    internalTargets.add(target.pathname + target.hash);
  }
}

for (const target of internalTargets) {
  const { pathname, hash } = new URL(target, origin);
  const file = path.extname(pathname) ? pathname : htmlFile(pathname);
  assert(existsSync(path.join(out, file)), `Broken internal link: ${target}`);
  if (hash) {
    assert(read(file).includes(`id="${decodeURIComponent(hash.slice(1))}"`), `Missing fragment: ${target}`);
  }
}

for (const { slug, draft } of guides) {
  const route = `/guides/${slug}/`;
  const markdown = `/guides/${slug}.md`;
  if (draft) {
    assert.equal(metaTags(read(htmlFile(route))).get("robots"), "noindex, follow");
    assert(!existsSync(path.join(out, markdown)), `Public draft Markdown: ${slug}`);
    assert(!llms.includes(markdown), `Draft in llms.txt: ${slug}`);
  } else {
    assert(sitemap.includes(origin + route), `Published guide missing from sitemap: ${slug}`);
    assert(llms.includes(origin + markdown), `Published guide missing from llms.txt: ${slug}`);
    const { data, content } = matter(read(markdown));
    assert.equal(data.canonical_url, origin + route);
    assert.equal(data.source, "CC Bay Life");
    if (matter(readFileSync(path.join("content/guides", slug + ".mdx"), "utf8")).data.sources?.length) {
      assert(content.includes("\n## Sources and verification\n"), `Missing Markdown sources: ${slug}`);
      assert(read(htmlFile(route)).includes('id="guide-sources"'), `Missing HTML sources: ${slug}`);
    }
  }
}

const image = readFileSync(path.join(out, new URL(imageUrl).pathname));
assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
assert(read("robots.txt").includes(`Sitemap: ${origin}/sitemap.xml`));
assert(read("_headers").includes("X-Content-Type-Options: nosniff"));
assert(read("_redirects").includes("/opengraph-image /images/cc-bay-life-share.png 301"));

console.log(`Checked ${sitemap.length} canonicals, ${internalTargets.size} internal targets, social images, and guide exports.`);
