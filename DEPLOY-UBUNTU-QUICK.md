# Purane server par new NextToGen deploy karna (step-by-step copy-paste)

Ye wahi server hai jahan pehle se koi site chal rahi hai (Nginx + PM2 ya koi aur setup hoga).
Ye commands **seedha server me SSH se login karke chalaein** — har step comment ke saath diya hai.

---

## Step 0 — Server par login

Apne local terminal se:
```bash
ssh root@YOUR_SERVER_IP
# ya agar ubuntu user hai to:
ssh ubuntu@YOUR_SERVER_IP
```

## Step 1 — Purani site ko backup + stop (if needed)

Agar wahi domain pe naya site chahiye:
```bash
# PM2 chal rahi ho to list dekh lo
pm2 list

# Purani app ka naam jante ho to usko stop/delete kar do
pm2 stop old-app-name
pm2 delete old-app-name

# Ya agar sirf same port (3000) use kar raha ho to:
pm2 stop all
pm2 delete all
```

**Agar purani site port 3000 pe nahi hai** to ye step skip karke aage badho.

## Step 2 — Zaroori packages install

Phle se nahi hai to:
```bash
apt update && apt upgrade -y
apt install -y git curl nginx certbot python3-certbot-nginx build-essential

# Node 20 agar abhi nahi hai to:
node -v | grep -q v20 || (curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs)

node -v && npm -v   # v20.x dikhna chahiye
```

## Step 3 — Code clone / update

```bash
mkdir -p /var/www
cd /var/www

# Pehli baar to clone:
if [ ! -d nexttogen ]; then
  git clone https://github.com/Mr-argha-das/nexttogen.git
fi

cd /var/www/nexttogen
git fetch origin
git checkout arena/01a0b04c-nexttogen
git pull origin arena/01a0b04c-nexttogen
```

## Step 4 — Environment file setup

```bash
cd /var/www/nexttogen

# Pehli baar banayein, ya pehle se hai to skip karke step 5 me edit karein
if [ ! -f .env.local ]; then
SECRET=$(openssl rand -base64 48)
cat > .env.local <<EOF
ADMIN_JWT_SECRET=$SECRET
ADMIN_EMAIL=admin@nexttogen.app
ADMIN_PASSWORD=YOUR_STRONG_PASSWORD_HERE
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.com
EOF
echo ".env.local created. Edit karein: nano .env.local"
fi
```

**Important**: `nano .env.local` khol kar:
- `ADMIN_PASSWORD` — apna strong password likhein
- `NEXT_PUBLIC_SITE_URL` — apni actual domain
Save: `Ctrl+O`, enter, `Ctrl+X`

## Step 5 — Install dependencies & build

```bash
cd /var/www/nexttogen
npm install
npm run build
```

Build me 1–2 min lagenge. Akhir me "Route (app)" table aaye to success.

## Step 6 — PM2 se start

```bash
npm install -g pm2 2>/dev/null

# Purani nexttogen entry ho to hata do
pm2 delete nexttogen 2>/dev/null

pm2 start npm --name "nexttogen" -- start
pm2 save
pm2 startup | tail -1
```

Last line ek command output degi (sudo se shuru). Usko copy karke chala dein — reboot pe auto-start hoga.

Check:
```bash
pm2 list
curl -I http://localhost:3000   # HTTP/1.1 200 OK aana chahiye
```

## Step 7 — Nginx (purana config replace karein)

Apna domain replace karein, e.g. `example.com`:

```bash
DOMAIN=YOUR-DOMAIN.com

# Backup purana config
[ -f /etc/nginx/sites-enabled/default ] && mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak
cp /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-available/$DOMAIN.bak 2>/dev/null

cat > /etc/nginx/sites-available/nexttogen <<EOF
server {
    server_name $DOMAIN www.$DOMAIN;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 120s;
    }
}
EOF

ln -sf /etc/nginx/sites-available/nexttogen /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## Step 8 — DNS check + SSL (https)

DNS me A record server IP pe point ho jaye, phir:
```bash
certbot --nginx -d $DOMAIN -d www.$DOMAIN
```

Certbot automatic HTTPS redirect laga dega.

## Step 9 — Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status
```

⚠️ Port 3000 mat kholo — sirf Nginx (80/443) hi khula hona chahiye.

## Step 10 — Verify

Browser me kholo:
- Site: `https://YOUR-DOMAIN.com`
- Admin: `https://YOUR-DOMAIN.com/admin/login`
  - Email: `admin@nexttogen.app` (jo `.env.local` me set kiya)
  - Password: wahi jo set kiya

---

## Future me update karna ho to (naya code aaye to)

```bash
cd /var/www/nexttogen
git pull origin arena/01a0b04c-nexttogen
npm install
npm run build
pm2 restart nexttogen
```

## Sabse zaroori — `.data/` aur `.env.local` backup

Admin se edits karoge to `.data/site.json` me save honge. Kabhi bhi server reset/redeploy se pehle:
```bash
tar czf ~/nexttogen-backup-$(date +%F).tar.gz /var/www/nexttogen/.data /var/www/nexttogen/.env.local
```

---

## Agar koi step atke ya error aaye

1. `pm2 logs nexttogen --lines 100` — app ke logs
2. `systemctl status nginx` — nginx status
3. `nginx -t` — config syntax check
4. `curl -I http://localhost:3000` — app khud chal rahi ya nahi

Yahi exact steps Ubuntu 22.04/24.04 pe work karte hain. Har command copy-paste ready hai.
