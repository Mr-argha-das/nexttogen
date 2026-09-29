// Removes the stored `courses` array from .data/site.json so the app falls
// back to the courses defined in code (lib/data.ts). All other content in
// site.json (testimonials, blog posts, FAQs, settings) is preserved.
//
// Usage:  node scripts/reset-courses.mjs
import fs from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), ".data", "site.json");

try {
  const raw = await fs.readFile(file, "utf8");
  const data = JSON.parse(raw);
  const had = Array.isArray(data.courses) ? data.courses.length : 0;
  if (!("courses" in data)) {
    console.log("site.json has no stored courses — nothing to do. Code courses are already in use.");
  } else {
    delete data.courses;
    await fs.writeFile(file, JSON.stringify(data, null, 2));
    console.log(`Removed stored courses (was ${had}). The site will now use the ${"courses"} from lib/data.ts.`);
  }
} catch (e) {
  if (e && e.code === "ENOENT") {
    console.log("No .data/site.json yet — defaults from code will seed on first run. Nothing to do.");
  } else {
    console.error("Failed:", e);
    process.exit(1);
  }
}
