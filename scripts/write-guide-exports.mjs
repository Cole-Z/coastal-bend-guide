import path from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, {
  alias: { "@": path.join(root, "src") },
  tsconfigPaths: path.join(root, "tsconfig.json"),
});
const { writeGuideExports } = await jiti.import("../src/lib/write-guide-exports.ts");
const written = writeGuideExports();
console.log(`Wrote ${written.length} guide export file${written.length === 1 ? "" : "s"}.`);
