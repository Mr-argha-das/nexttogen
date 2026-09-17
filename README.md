# NextGen Institute — Website + Admin Panel (Next.js 16)

A complete, SEO-friendly institute website with courses, blog, testimonials, an apply form, contact and support pages, a chatbot, and a **full admin panel**. Everything is managed from one place: a SQLite database plus the admin panel.

---

## ⚡ Quick start (2 minutes)

```bash
npm install          # dependencies (requires Node 22.5+ — node:sqlite is built in)
npm run dev          # http://localhost:3000
```

On the first run the database is **created automatically** (`data/institute.db`) and seeded with demo content: 8 courses, 6 blog posts, 9 testimonials, 12 FAQs, plus sample applications and messages.

### Admin panel

| | |
|---|---|
| URL | http://localhost:3000/admin/login |
| Email | `admin@nexttogen.in` |
| Password | `Admin@12345` |

> For production, change `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `AUTH_SECRET` in `.env`, then run `npm run db:reset`.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run db:seed` | Create the database and insert demo content |
| `npm run db:reset` | Delete the DB and seed it fresh (removes all demo data) |
| `npm run setup` | install + seed in one step |

---

## 🗂️ Website pages

| Page | Route | What it contains |
|---|---|---|
| Home | `/` | Hero, stats, featured courses, why-us, placement, testimonials, admission steps, blog preview, FAQ, CTA |
| Courses | `/courses` | Category and mode filters plus sorting, all courses |
| Course details | `/courses/[slug]` | Expandable syllabus, fees and EMI, eligibility, certification, tools, apply form, related courses |
| Apply form | `/apply` | Full admission form (`?course=slug` preselects a course), documents checklist, process steps |
| Blog | `/blog` | Search, category filter, tags, featured post, pagination |
| Blog detail | `/blog/[slug]` | Article (markdown), view counter, share buttons, author box, related posts |
| Testimonials | `/testimonials` | Placement stories, all reviews, video/trust section |
| Contact us | `/contact` | Contact channels, enquiry form, departments, map embed, visit tips |
| Support us | `/support` | Donation tiers, UPI/bank details, support pledge form, CSR, fund utilisation |
| About us | `/about` | Story, mission and vision, faculty, infrastructure, campus information |
| FAQ | `/faq` | Category-wise accordion with FAQ schema |
| Chatbot | floating widget on every page | Rule-based assistant answering from live course, fee and FAQ data |
| Legal | `/privacy-policy`, `/terms` | Policy pages |
| 404 | `not-found.tsx` | Custom error page |

---

## 🛠️ Admin panel (`/admin`)

- **Dashboard** — new applications, messages, content counts, a 12-month application graph, status breakdown and recent activity
- **Applications** — status filter (New / Contacted / Enrolled / Rejected), search, internal notes, one-click Call and WhatsApp, delete
- **Messages** — contact, support/donation and CSR-partner enquiries separated, status updates, reply links
- **Courses** — full CRUD: fees, discount, seats, batch date, syllabus modules (add/remove), highlights, tools, SEO fields, publish and featured toggles
- **Blog** — markdown editor, tags, category, author, publish date, SEO title/description, featured toggle, view counts
- **Testimonials** — rating, course, company/role, city, featured toggle
- **FAQs** — grouped by category; **the chatbot answers using these FAQs**
- **Subscribers** — newsletter list, manual add, delete
- **Settings** — institute name and tagline, contact and address, **brand colors (theme)**, statistics, chatbot name and welcome message, donation details, social links, Google Analytics ID
- **Password change** — update your own admin password

Login sessions are secured with a signed JWT cookie (jose) and bcrypt password hashes. Every admin route is protected on the server side.

---

## 🎨 Customising the theme / branding

The theme colors and branding can be matched in **two places**:

1. **Admin panel → Settings → Brand colors** (recommended, no code changes needed)
   - `brandPrimary` → the main color for buttons, links, badges and gradients
   - `brandAccent` → highlight buttons, chips and CTAs

2. **Defaults in code:** open `src/content/settings.ts` → `DEFAULT_SETTINGS` and change `brandPrimary`, `brandAccent`, `siteName` and `siteTagline`.

Other theme elements:

| What you want to change | File |
|---|---|
| Colors, fonts, buttons, card styles | `src/app/globals.css` (`--brand`, `--brand-accent`, `.btn-primary`, `.card`) |
| Fonts | `globals.css` → `--font-sans`, `--font-heading` |
| Home page sections | `src/app/page.tsx` |
| Header / footer | `src/components/site/site-header.tsx`, `site-footer.tsx` |
| Marketing content (features, faculty, donation tiers, partners) | `src/content/settings.ts` → `SITE_CONTENT` |
| Demo courses / blog posts / testimonials / FAQs | `src/content/*.ts` (or edit them from the admin panel) |

> Current brand values are placeholders (navy `#0b2a5b` with amber `#f5a623`). Drop the final values into Settings and everything — buttons, badges, gradients and chips — updates instantly.

---

## 🔍 SEO features (built in)

- A unique title, meta description, keywords and **canonical URL** on every page
- Open Graph and Twitter card metadata
- **Structured data (JSON-LD):** `EducationalOrganization`, `Course` (with fees and batch date), `FAQPage`, `BlogPosting`, `BreadcrumbList`, `ItemList` and a `WebSite` search action
- `sitemap.xml` — static pages plus every published course and blog post, added automatically as soon as you publish
- `robots.txt` — disallows `admin` and `api`
- Semantic HTML, breadcrumbs, alt text and a mobile-first responsive design
- Clean, slug-based course and blog URLs
- Google Analytics support (add your `G-XXXXXXX` ID in Settings)

---

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first theme tokens) |
| Database | SQLite through Node 22's built-in `node:sqlite` — **no native dependency** |
| Auth | jose (JWT cookie) + bcryptjs |
| Validation | zod |
| Icons | lucide-react plus custom brand SVGs |
| Markdown | a small custom renderer (no heavy dependency) |

> `prisma/schema.prisma` is kept as a reference — the same models can be used if you later move to Postgres/Prisma.

### Folder structure

```
src/
├── app/                  # routes (public pages + /admin + /api)
│   ├── admin/(panel)/    # protected admin pages
│   └── api/              # applications, contact, subscribe, chatbot
├── components/
│   ├── site/             # public UI (header, footer, cards, forms, chatbot)
│   └── admin/            # admin UI (shell, forms, tables)
├── content/              # demo content, default settings and site content
└── lib/                  # db, data queries, auth, validation, chatbot, seo, utils
prisma/schema.prisma      # reference schema (for a future migration)
scripts/seed.ts           # CLI seeding
```

---

## 🌐 Before you deploy

1. Set up `.env`:
   ```env
   DATABASE_URL="file:./data/institute.db"
   ADMIN_EMAIL="you@yourdomain.com"
   ADMIN_PASSWORD="strong-password"
   AUTH_SECRET="32+ random characters"
   NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
   ```
2. Run `npm run db:reset` (fresh database plus your admin account)
3. Run `npm run build && npm start`

**Note on serverless deploys:** `node:sqlite` will not persist data on platforms with an ephemeral filesystem such as Vercel. Options:
- Use a platform with a persistent disk — Railway, Render or a VPS — which is the simplest route
- Or port `src/lib/data.ts` to Prisma/Postgres or Supabase (`prisma/schema.prisma` is ready; every query lives in that one file)

---

## 📋 Content checklist (before launch)

- [ ] Real institute name, tagline and contact details (Settings)
- [ ] Brand colors matching the official visiting card / brand guide (Settings → Brand colors)
- [ ] Real course fees, syllabus and batch dates
- [ ] Faculty profiles (`src/content/settings.ts`) and genuine testimonials
- [ ] Placement partner list
- [ ] Donation UPI/bank details and 80G information
- [ ] Legal review of the privacy policy and terms
- [ ] Google Analytics ID
- [ ] The real campus map embed URL (Settings → `mapEmbedUrl`)
