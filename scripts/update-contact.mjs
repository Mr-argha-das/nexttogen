// Updates the stored contact email + phone + address in .data/site.json so the LIVE
// site shows the real details (stored settings override the code defaults).
// Everything else in site.json is preserved.
//
// Usage:  node scripts/update-contact.mjs
import fs from "node:fs/promises";
import path from "node:path";

const EMAIL = "info@nexttogen.com";
const PHONE = "+91 87409 04944";
const ADDRESS = "28-C Nagar Parishad Colony, Kanwar Nagar, Jaipur, Rajasthan 302002, India";

const file = path.join(process.cwd(), ".data", "site.json");

try {
  const raw = await fs.readFile(file, "utf8");
  const data = JSON.parse(raw);
  const before = { email: data.contactEmail, phone: data.contactPhone, address: data.contactAddress };
  data.contactEmail = EMAIL;
  data.contactPhone = PHONE;
  data.contactAddress = ADDRESS;
  await fs.writeFile(file, JSON.stringify(data, null, 2));
  console.log("Updated contact details in .data/site.json");
  console.log("  email:  ", before.email, "->", EMAIL);
  console.log("  phone:  ", before.phone, "->", PHONE);
  console.log("  address:", before.address, "->", ADDRESS);
} catch (e) {
  if (e && e.code === "ENOENT") {
    console.log("No .data/site.json yet — defaults from code will seed on first run. Nothing to do.");
  } else {
    console.error("Failed:", e);
    process.exit(1);
  }
}
