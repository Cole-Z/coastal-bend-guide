import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { realtor } from "@/config/realtor";
import { guideExportFiles } from "@/lib/guide-markdown";
import { getAllGuides } from "@/lib/guides";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/** Write llms.txt and published guide Markdown into the static export. */
export function writeGuideExports(outDir = path.join(process.cwd(), "out")): string[] {
  const files = guideExportFiles(getAllGuides(), { siteUrl: SITE_URL, siteName: SITE_NAME, siteDescription: SITE_DESCRIPTION }, realtor);
  const written: string[] = [];
  for (const file of files) {
    const destination = path.join(outDir, file.relativePath);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, file.body);
    written.push(file.relativePath);
  }
  return written;
}
