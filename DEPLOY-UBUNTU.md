# NextToGen — Ubuntu VPS Deployment Guide

Production-ready deployment on Ubuntu 22.04 / 24.04 (DigitalOcean, AWS EC2, Linode, Hetzner, Hostinger VPS, etc.).

## 1. Server par login

```bash
ssh root@YOUR_SERVER_IP
# ya non-root user ho to: ssh ubuntu@YOUR_SERVER_IP
```

## 2. System update + Node.js 20 install

```bash
apt update && apt upgrade -y
apt install -y git nginx curl certbot python3-certbot-nginx build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v  # v20.x dikhna chahiye
npm -v
```

## 3. App clone & build

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/Mr-argha-das/nexttogen.git
cd nexttogen
git checkout arena/01a0b04c-nexttogen

npm install
```

## 4. Environment variables

```bash
cat > /var/www/nexttogen/.env.local <<'EOF'
ADMIN_JWT_SECRET=YOUR_LONG_RANDOM_SECRET_HERE
ADMIN_EMAIL=aapka-email@example.com
ADMIN_PASSWORD=ApAstrongP@ss123!
NEXT_PUBLIC_SITE_URL=https://aapki-domain.com
EOF

# Generate strong random secret (replace karein):
echo "Use this for ADMIN_JWT_SECRET:"
openssl rand -base64 48
```

Upar command se jo string aaye usko `.env.local` me `ADMIN_JWT_SECRET` ke saamne daal dein. Password strong rakhein.

## 5. Build

```bash
cd /var/www/nexttogen
npm run build
```

Agar build successful ho jaye to (already verified ✅), proceed.

## 6. PM2 (process manager) install + start

```bash
npm i -g pm2
cd /var/www/nexttogen
pm2 start npm --name "nexttogen" -- start
pm2 save
pm2 startup
```

Last command ek line output dega — usko copy karke chala dein (server restart pe app auto-start hoga).

Check karo chal rahi hai:
```bash
pm2 status
curl -I http://localhost:3000   # 200 OK aana chahiye
```

## 7. Nginx reverse proxy

```bash
cat > /etc/nginx/sites-available/nexttogen <<'EOF'
server {
    server_name aapki-domain.com www.aapki-domain.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }

    # Static assets cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/nexttogen /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 8. DNS + SSL (https)

Apne domain ke DNS me A record server IP pe point karein:
```
A   @   YOUR_SERVER_IP
A   www YOUR_SERVER_IP
```

DNS propagate ho jaaye (2–30 min), phir SSL:
```bash
certbot --nginx -d aapki-domain.com -d www.aapki-domain.com
```

Certbot automatically HTTPS redirect laga dega.

## 9. Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

Port 3000 direct **mat** kholo — sirf Nginx (80/443) se serve hona chahiye.

## 10. Test

```bash
# Site
https://aapki-domain.com/
# Admin login
https://aapki-domain.com/admin/login
```

Email/password wahi daalein jo `.env.local` me set kiye. Admin dashboard ke through courses/posts/testimonials edit karne se `.data/site.json` me save ho jayega.

---

## Deploy ke baad useful commands

```bash
# Logs dekhna
pm2 logs nexttogen

# App restart
pm2 restart nexttogen

# New code deploy karna (update)
cd /var/www/nexttogen
git pull
npm install
npm run build
pm2 restart nexttogen

# Backup (data + env)
tar czf ~/nexttogen-backup-$(date +%F).tar.gz /var/www/nexttogen/.data /var/www/nexttogen/.env.local
```

## .data/ ka backup important hai

Admin dwara ki gayi edits `.data/site.json` me store hoti hain.
- Week me ek baar backup lete raho
- Upgrade/git pull se pehle backup lo
- `.env.local` bhi backup me shaamil karo

## Security tips

1. **Fail2ban** install karo brute-force ke liye: `apt install fail2ban`
2. SSH password auth disable karo, key-only use karo
3. `ADMIN_PASSWORD` har 3–6 mahine change karo
4. Server weekly update karte raho: `apt update && apt upgrade -y`

---
Push successful ho gaya: `arena/01a0b04c-nexttogen` branch GitHub pe aa gayi hai.
PR URL: https://github.com/Mr-argha-das/nexttogen/pull/new/arena/01a0b04c-nexttogen
