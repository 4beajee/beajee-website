# Landing Split Migration

## Current Target Architecture

- `https://gennety.com` and `https://www.gennety.com` serve this standalone website from Vercel.
- `https://app.gennety.com` serves the main Gennety application from the DigitalOcean Docker deployment.
- `https://api.gennety.com` stays on the main Gennety application server.
- Website CTA links (`Login`, `Get Started`, `Dashboard`-style destinations) point to `https://app.gennety.com`.

## Vercel Setup

1. Create a GitHub repository for this folder, for example `Gennety/gennety-website`.
2. Push `/Users/pro/Desktop/Gennety website` to that repository.
3. Import the repository into Vercel.
4. Add environment variables:

```text
NEXT_PUBLIC_APP_URL=https://app.gennety.com
NEXT_PUBLIC_LANDING_URL=https://gennety.com
```

5. Deploy a preview first and check:
   - `/` renders the landing page.
   - `/privacy`, `/terms`, `/cookie-policy` render.
   - `/skill.md`, `/llms.txt`, `/skills/RULES.md`, `/tools/gennety-openclaw-bridge.md` return `200`.
   - `Login` and `Get Started` open `https://app.gennety.com/login`.
   - `/feed` redirects to `https://app.gennety.com/feed`.

## DNS Change

Do this only after the Vercel preview looks correct.

In your DNS provider:

1. Point `gennety.com` to the DNS record Vercel shows for the apex domain.
2. Point `www.gennety.com` to the DNS record Vercel shows for `www`.
3. Keep these records on the DigitalOcean droplet:

```text
app.gennety.com -> 104.236.119.88
api.gennety.com -> 104.236.119.88
```

4. Remove or replace any old `gennety.com` / `www.gennety.com` records that point to `104.236.119.88`.

Verification after DNS propagation:

```bash
curl -I https://gennety.com
curl -I https://www.gennety.com
curl -I https://gennety.com/skill.md
curl -I https://app.gennety.com/login
curl -I https://api.gennety.com/mcp
```

Expected:

- `gennety.com` and `www.gennety.com` are served by Vercel.
- `app.gennety.com` and `api.gennety.com` are still served by the DigitalOcean/nginx app server.

## DigitalOcean Nginx Cleanup

Run this only after `gennety.com` and `www.gennety.com` are live on Vercel.

Current server file:

```text
/etc/nginx/sites-available/gennety
```

Backup first:

```bash
ssh -i ~/.ssh/id_rsa root@104.236.119.88
cp /etc/nginx/sites-available/gennety /etc/nginx/sites-available/gennety.bak.$(date +%Y%m%d%H%M%S)
```

Edit the nginx config:

```bash
nano /etc/nginx/sites-available/gennety
```

Delete these two server blocks:

- the `listen 443 ssl;` block with `server_name gennety.com www.gennety.com;`
- the `listen 80;` block with `server_name gennety.com www.gennety.com;`

Keep these blocks:

- `server_name app.gennety.com;`
- `server_name api.gennety.com;`

Validate and reload nginx:

```bash
nginx -t
systemctl reload nginx
systemctl status nginx --no-pager
```

Optional later cleanup after several days of stable Vercel serving:

```bash
certbot certificates
certbot delete --cert-name gennety.com
```

Do not delete the `app.gennety.com` or `api.gennety.com` certificates.

## Main App Deployment Timing

The main repository has been adjusted so `/` is no longer the landing page. Deploy that cleanup to the DigitalOcean app only after the Vercel landing is ready, otherwise `https://gennety.com` could temporarily stop showing the marketing site before DNS has moved.

After the domain switch:

```bash
cd /Users/pro/Desktop/Gennety
npm run lint
npm run build
rsync -az --delete \
  -e "ssh -i ~/.ssh/id_rsa" \
  --exclude ".git/" \
  --exclude "node_modules/" \
  --exclude ".next/" \
  --exclude ".env" \
  --exclude ".env.production" \
  --exclude ".env*.bak*" \
  --exclude ".vercel/" \
  --exclude ".DS_Store" \
  --exclude "tsconfig.tsbuildinfo" \
  /Users/pro/Desktop/Gennety/ \
  root@104.236.119.88:/opt/gennety/
ssh -i ~/.ssh/id_rsa root@104.236.119.88 "cd /opt/gennety && docker compose -f docker-compose.prod.yml up -d --build --remove-orphans"
```

Final smoke checks:

```bash
curl -I https://gennety.com
curl -I https://app.gennety.com/login
curl -I https://app.gennety.com/home
curl -I https://api.gennety.com/mcp
```
