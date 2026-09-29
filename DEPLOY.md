# Deploying NextToGen

NextToGen is a **Next.js 14** app that stores its content in JSON files under
`.data/` (courses, testimonials, blog posts, applications, messages, admin
credentials). Because of this it must run as a **long-running Node server with a
persistent, writable disk** — not a pure serverless platform.

## Environment variables

Set these on your hosting platform (never commit real values):

| Variable | Purpose | Example |
|---|---|---|
| `ADMIN_JWT_SECRET` | Signs admin session tokens. Use a long random string. | `openssl rand -base64 48` |
| `ADMIN_EMAIL` | Admin login email (seeds the DB on first run). | `you@youracademy.com` |
| `ADMIN_PASSWORD` | Admin login password. | a strong password |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used in metadata/OG tags. | `https://yourdomain.com` |

> After changing `ADMIN_EMAIL` / `ADMIN_PASSWORD`, delete `.data/auth.json` once so
> it re-seeds with the new credentials.

## Build & run

```bash
npm install
npm run build
npm run start   # respects the $PORT env var (defaults to 3000)
```

---

## Option A — Railway (recommended, easiest)

1. Push this repo to GitHub (already at `github.com/Mr-argha-das/nexttogen`).
2. On [railway.app](https://railway.app): **New Project → Deploy from GitHub repo**.
3. Build command: `npm run build` · Start command: `npm run start`.
4. **Variables** tab → add the 4 env vars above.
5. **Add a Volume** and mount it at `/app/.data` so content survives redeploys.
6. Generate a domain under **Settings → Networking**, then set
   `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

## Option B — Render

1. Push to GitHub.
2. On [render.com](https://render.com): **New → Blueprint** and pick this repo
   (it reads the included `render.yaml`), **or** create a **Web Service** manually:
   - Build: `npm install && npm run build`
   - Start: `npm run start`
   - Add a **Disk** mounted at `/opt/render/project/src/.data` (needs Starter plan+).
3. Set the env vars in the dashboard (`ADMIN_JWT_SECRET` can be auto-generated).

## Option C — Any VPS (DigitalOcean / Hetzner / EC2)

```bash
git clone https://github.com/Mr-argha-das/nexttogen.git
cd nexttogen
cp .env.example .env.local   # then edit real secrets
npm install
npm run build
# keep it alive with PM2
npm i -g pm2
PORT=3000 pm2 start "npm run start" --name nexttogen
pm2 save && pm2 startup
```
Put Nginx in front as a reverse proxy (port 80/443 → 3000) and add HTTPS with
Certbot. `.data/` persists on disk automatically.

## Option D — Docker (any container host)

A `Dockerfile` is included.

```bash
docker build -t nexttogen .
docker run -d -p 3000:3000 \
  -e ADMIN_JWT_SECRET="$(openssl rand -base64 48)" \
  -e ADMIN_EMAIL="you@youracademy.com" \
  -e ADMIN_PASSWORD="your-strong-password" \
  -e NEXT_PUBLIC_SITE_URL="https://yourdomain.com" \
  -v nexttogen_data:/app/.data \
  --name nexttogen nexttogen
```
The named volume `nexttogen_data` keeps your content across restarts.

---

## ⚠️ About Vercel / Netlify (serverless)

The **public site** works, but the **admin panel will not save changes** because
serverless filesystems are read-only/ephemeral — writes to `.data/*.json` are lost.
To use Vercel you must first migrate storage from files to a hosted database or
KV store (e.g. Vercel Postgres, Neon, Supabase, Upstash Redis) by rewriting
`lib/db.ts`. Ask and this can be done.
