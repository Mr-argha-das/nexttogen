# NextToGen Academy — Production

A premium education platform built with **Next.js 14 (App Router)**, **TypeScript**,
**Tailwind CSS**, and a production-ready admin system.

## ✨ Features

- **Public site** — Home, Courses (catalog + detail), About, Blog (listing +
  post), Apply form, Contact (with FAQ), Support Us (donate, volunteer,
  partners)
- **Prices fully removed** — cohort-based, "Apply to Enroll" flow throughout
- **Premium typography** — Plus Jakarta Sans (body) + Fraunces (display serif)
  + Cormorant Garamond italics + JetBrains Mono (labels)
- **Persistent admin** — JWT httpOnly cookies, bcrypt-hashed password,
  file-based JSON data store in `.data/site.json`, protected by Next.js
  middleware
- **Admin CRUD** for courses, testimonials, blog posts, FAQs, and site
  settings (hero copy, contact info, branding)
- **SEO** — metadata, OG/Twitter tags, `sitemap.xml`, `robots.txt`, dynamic
  metadata for posts/courses
- **Accessibility & responsiveness** across all breakpoints

## 🚀 Quick start

```bash
npm install
cp .env.example .env.local   # edit secrets before deploy
npm run build
npm start
```

Open http://localhost:3000 for the public site.
Admin login is at **/admin/login**.

## 🔐 Production configuration

Set these environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `ADMIN_JWT_SECRET` | **Required in production.** Long random string (≥32 chars). Generate with: `openssl rand -base64 48` |
| `ADMIN_EMAIL` | Admin login email (default `admin@nexttogen.app`) |
| `ADMIN_PASSWORD` | Admin login password (default `admin123` — **change before deploy!**) |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL (used for metadata/OG) |

### Default admin login

```
Email:    admin@nexttogen.app
Password: admin123
```

**Change immediately** by editing `.env.local` and restarting the server.
The first time the server starts (or when `.data/auth.json` is missing), a
bcrypt-hashed credential record is created from the env vars.

### Data persistence

- Content edited through the admin dashboard is stored on disk at
  `.data/site.json` (created automatically).
- Auth is stored at `.data/auth.json` (bcrypt-hashed on first boot).
- Add `.data/` to your persistent volume / backups on your host. For
  multi-instance deployments, replace `lib/db.ts` with a real database
  (Postgres, MongoDB, etc.) — the API contract (`/api/admin/data`) stays
  the same.

### Deployment notes

- Run behind HTTPS in production (the auth cookie is `Secure: true` when
  `NODE_ENV=production`).
- Recommended: Vercel, Netlify, or a Node 20 server behind Nginx/Caddy.
- For Vercel, note that `.data/` won't persist across redeploys — swap
  `lib/db.ts` for a database or Vercel KV/Blob storage.

## 🧰 Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (verified passing ✅) |
| `npm start` | Run the built server |

## 📁 Project structure

```
app/
  (public routes)        Home, Courses, About, Blog, Apply, Contact, Support
  admin/                 Admin login + dashboard + CRUD pages
  api/admin/             Auth (login/logout/me) + data read/write
components/              Navbar, Footer, Chatbot, Cards, AdminProviders
lib/
  db.ts                  Server-only JSON-file persistence (auth + content)
  auth.ts                JWT signing/verification + server cookie helpers
  siteData.tsx           Client provider: fetches from API, cache, savePatch
  adminAuth.tsx          Client auth context (login/logout/session check)
  data.ts                Seed/default content & TypeScript types
  utils.ts               Client-safe helpers (slugify)
middleware.ts            Protects /admin routes and /api/admin/* POSTs
```

## ✅ Production build verified

```
✓ Compiled successfully
✓ All routes build (0 errors)
✓ Login/logout/me/data APIs work end-to-end
✓ Middleware redirects unauthenticated /admin/protected → /admin/login
✓ Unauthenticated POST to /api/admin/data returns 401
```
