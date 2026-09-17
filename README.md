# Institute Website + Admin Panel (Next.js 16)

Ek complete, SEO-friendly institute website — courses, blogs, testimonials, apply form, contact, support/donation, chatbot aur **full admin panel** ke saath. Sab kuch ek hi jagah se manage hota hai: SQLite database + admin panel.

---

## ⚡ Quick start (2 minute)

```bash
npm install          # dependencies (Node 22.5+ chahiye — node:sqlite built-in hai)
npm run dev          # http://localhost:3000
```

Pehli baar chalane par database **khud ban jaati hai** (`data/institute.db`) aur demo content se seed ho jaati hai — 8 courses, 6 blogs, 9 testimonials, 12 FAQs, demo applications aur messages.

### Admin panel

| | |
|---|---|
| URL | http://localhost:3000/admin/login |
| Email | `admin@nexttogen.in` |
| Password | `Admin@12345` |

> Production me `.env` me `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `AUTH_SECRET` badal kar `npm run db:reset` chala dijiye.

### Commands

| Command | Kaam |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run db:seed` | Database banana + demo content bharna |
| `npm run db:reset` | DB delete karke fresh seed (sab demo data hat jaata hai) |
| `npm run setup` | install + seed ek saath |

---

## 🗂️ Website pages

| Page | Route | Kya hai |
|---|---|---|
| Home | `/` | Hero, stats, featured courses, why-us, placement, testimonials, admission steps, blog preview, FAQ, CTA |
| Courses | `/courses` | Category/mode filter + sorting, saare courses |
| Course details | `/courses/[slug]` | Syllabus (expandable), fees + EMI, eligibility, certification, tools, apply form, related courses |
| Apply form | `/apply` | Full admission form (`?course=slug` se course preselected), documents checklist, process steps |
| Blogs | `/blog` | Search, category filter, tags, featured post, pagination |
| Blog detail | `/blog/[slug]` | Article (markdown), views counter, share buttons, author box, related posts |
| Testimonials | `/testimonials` | Placement stories, sabhi reviews, video/trust section |
| Contact us | `/contact` | Contact channels, enquiry form, departments, map embed, visit tips |
| Support us | `/support` | Donation tiers, UPI/bank details, support pledge form, CSR, fund utilisation |
| About us | `/about` | Story, mission/vision, faculty, infrastructure, campus info |
| FAQ | `/faq` | Category-wise accordion (FAQ schema ke saath) |
| Chatbot | floating widget (har page par) | Rule-based assistant — courses/fees/FAQ ka live jawab |
| Legal | `/privacy-policy`, `/terms` | Policy pages |
| 404 | `not-found.tsx` | Custom error page |

---

## 🛠️ Admin panel (`/admin`)

- **Dashboard** — nayi applications, messages, content counts, 12-mahine ka application graph, status breakdown, recent activity
- **Applications** — status filter (Naya / Contacted / Enrolled / Rejected), search, internal notes, one-click Call + WhatsApp, delete
- **Messages** — contact / support-donation / CSR-partner enquiries alag-alag, status update, reply links
- **Courses** — full CRUD: fees, discount, seats, batch date, syllabus modules (add/remove), highlights, tools, SEO fields, publish/featured toggle
- **Blogs** — markdown editor, tags, category, author, publish date, SEO title/description, featured toggle, view counts
- **Testimonials** — rating, course, company/role, city, featured toggle
- **FAQs** — category-wise; **chatbot inhi FAQs ke jawab deta hai**
- **Subscribers** — newsletter list, manual add, delete
- **Settings** — institute naam/tagline, contact & address, **brand colors (theme)**, stats numbers, chatbot naam/welcome, donation details, social links, Google Analytics ID
- **Password change** — apna admin password badalne ke liye

Login session signed JWT cookie (jose) + bcrypt password hash se secure hai. Saare admin routes server-side par protect hain.

---

## 🎨 Theme / PDF ke hisaab se customize karna

Aapne jo theme PDF diya hai, uske colors aur branding **2 jagah** se match kar sakte hain:

1. **Admin panel → Settings → Brand colours** (recommended, code chhune ki zaroorat nahi)
   - `brandPrimary` → buttons, links, badges, gradients ka main color
   - `brandAccent` → highlight buttons, chips, CTA ka color

2. **Code se default set karna:** `src/content/settings.ts` → `DEFAULT_SETTINGS` me `brandPrimary`, `brandAccent`, `siteName`, `siteTagline` badal dijiye.

Theme ke baaki elements:

| Kya badalna hai | File |
|---|---|
| Colors, fonts, buttons, card styles | `src/app/globals.css` (`--brand`, `--brand-accent`, `.btn-primary`, `.card`) |
| Fonts | `globals.css` → `--font-sans`, `--font-heading` |
| Home page sections | `src/app/page.tsx` |
| Header / Footer | `src/components/site/site-header.tsx`, `site-footer.tsx` |
| Marketing content (features, faculty, donation tiers, partners) | `src/content/settings.ts` → `SITE_CONTENT` |
| Demo courses / blogs / testimonials / FAQs | `src/content/*.ts` (ya admin panel se edit karein) |

> PDF milte hi: colors Settings me daal dijiye, naam/details update kar dijiye — baaki layout usi hisaab se adjust kar diya jayega.

---

## 🔍 SEO features (built-in)

- Har page par unique title, meta description, keywords aur **canonical URL**
- Open Graph + Twitter card metadata
- **Structured data (JSON-LD):** `EducationalOrganization`, `Course` (fees + batch ke saath), `FAQPage`, `BlogPosting`, `BreadcrumbList`, `ItemList`, `WebSite` search action
- `sitemap.xml` — static pages + saare published courses/blogs automatically (naya content publish karte hi add ho jaata hai)
- `robots.txt` — `admin` aur `api` disallow
- Semantic HTML, breadcrumbs, alt text, mobile-first responsive design
- Course/Blog URLs slug-based aur clean
- Google Analytics support (Settings me `G-XXXXXXX` daal dijiye)

---

## 🧱 Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first theme tokens) |
| Database | SQLite via Node 22 ka built-in `node:sqlite` — **koi native dependency nahi** |
| Auth | jose (JWT cookie) + bcryptjs |
| Validation | zod |
| Icons | lucide-react + custom brand SVGs |
| Markdown | chhota custom renderer (koi heavy dependency nahi) |

> `prisma/schema.prisma` reference ke liye rakha hai — agar aapko future me Postgres/Prisma par shift hona ho to model wahi hai.

### Folder structure

```
src/
├── app/                  # routes (public pages + /admin + /api)
│   ├── admin/(panel)/    # protected admin pages
│   └── api/              # applications, contact, subscribe, chatbot
├── components/
│   ├── site/             # public UI (header, footer, cards, forms, chatbot)
│   └── admin/            # admin UI (shell, forms, tables)
├── content/              # demo content + default settings + site content
└── lib/                  # db, data queries, auth, validation, chatbot, seo, utils
prisma/schema.prisma      # reference schema (future migration ke liye)
scripts/seed.ts           # CLI seeding
```

---

## 🌐 Deploy karne se pehle

1. `.env` set karein:
   ```env
   DATABASE_URL="file:./data/institute.db"
   ADMIN_EMAIL="aapka@email.com"
   ADMIN_PASSWORD="strong-password"
   AUTH_SECRET="32+ random characters"
   NEXT_PUBLIC_SITE_URL="https://aapkadomain.com"
   ```
2. `npm run db:reset` (fresh DB + aapka admin account)
3. `npm run build && npm start`

**Note (serverless deploy):** `node:sqlite` ephemeral filesystem wale platforms (Vercel) par data persist nahi karega. Options:
- Railway / Render / VPS jaise platforms use karein (persistent disk ke saath) — sabse simple
- Ya `src/lib/data.ts` ko Prisma/Postgres ya Supabase par port karein (`prisma/schema.prisma` ready hai; saari queries ek hi file me hain)

---

## 📋 Content checklist (launch se pehle)

- [ ] Institute ka asli naam, tagline, contact details (Settings)
- [ ] Brand colors PDF ke hisaab se (Settings → Brand colours)
- [ ] Courses ki asli fees, syllabus, batch dates
- [ ] Faculty profiles (`src/content/settings.ts`) aur real testimonials
- [ ] Placement partners list
- [ ] Donation UPI/bank details + 80G info
- [ ] Privacy policy & terms legal review
- [ ] Google Analytics ID
- [ ] Real campus map embed URL (Settings → `mapEmbedUrl`)
