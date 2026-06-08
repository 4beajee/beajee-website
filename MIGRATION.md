# Beajee Domain Migration

## Target Architecture

- `https://beajee.com` and `https://www.beajee.com`: Vercel landing.
- `https://app.beajee.com`: DigitalOcean application.
- `https://api.beajee.com`: DigitalOcean MCP/API endpoint.
- `https://api.beajee.com/mcp`: canonical Beajee MCP URL.

## DNS Records

Required records:

```text
beajee.com      A      76.76.21.21
www.beajee.com  CNAME  cname.vercel-dns.com
app.beajee.com  A      104.236.119.88
api.beajee.com  A      104.236.119.88
```

Use the exact apex and `www` values shown by Vercel if Vercel changes its
recommended records.

Legacy records for `gennety.com`, `www.gennety.com`, `app.gennety.com`, and
`api.gennety.com` should remain during the agent migration window. Remove them
only after installed agents, MCP clients, OAuth providers, webhooks, and email
links no longer use the legacy URLs.

## Vercel

Set these environment variables on the landing project:

```text
NEXT_PUBLIC_APP_URL=https://app.beajee.com
NEXT_PUBLIC_LANDING_URL=https://beajee.com
```

Attach `beajee.com` and `www.beajee.com` to the project, deploy the updated
landing, and verify:

```bash
curl -I https://beajee.com
curl -I https://www.beajee.com
curl -I https://beajee.com/skill.md
curl -I https://beajee.com/tools/beajee-openclaw-bridge.mjs
```

## Application Server

The production runtime must use:

```text
NEXTAUTH_URL=https://app.beajee.com
NEXTAUTH_COOKIE_DOMAIN=.beajee.com
NEXT_PUBLIC_APP_URL=https://app.beajee.com
NEXT_PUBLIC_LANDING_URL=https://beajee.com
```

Build with the production env explicitly. Docker Compose otherwise reads build
arguments from `.env`, even though the container runtime uses
`.env.production`.

```bash
docker compose --env-file .env.production \
  -f docker-compose.prod.yml up -d --build --remove-orphans
```

The nginx configuration must terminate TLS for `app.beajee.com` and
`api.beajee.com`, then proxy both hosts to `http://localhost:3000`.

## External Integrations

Update these provider-side settings:

- Google OAuth: add `https://app.beajee.com/api/auth/callback/google`.
- Resend: verify `beajee.com` and authorize the configured Beajee sender.
- Telegram BotFather: change the Web App and Mini App URLs to
  `https://app.beajee.com/telegram`.
- Slack: rename slash commands to `/beajee-search` and `/beajee-task`; update
  request URLs and webhook headers to the Beajee names used by the code.
- Jira, Confluence, GitHub, Notion, and Linear: update webhook URLs to
  `https://api.beajee.com` or `https://app.beajee.com` and use the new
  `x-beajee-*` headers.
- OpenClaw and other agents: replace the MCP entry with the `beajee` server,
  fetch `https://beajee.com/skill.md`, and install the Beajee bridge.

## Verification

```bash
curl -I https://app.beajee.com/login
curl -s https://api.beajee.com/mcp
curl -I https://beajee.com/skill.md
```

An MCP `initialize` request must return `serverInfo.name` as `beajee`. The MCP
health response must return `name` as `beajee-mcp`.
