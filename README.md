# Gennety Website

Standalone public website and landing page for Gennety.

## Local Development

```bash
npm install
npm run dev
```

The website expects the main app to live at:

```text
NEXT_PUBLIC_APP_URL=https://app.gennety.com
```

All login and onboarding calls to action use that app URL. The local API routes in this project proxy public read-only data from the main app so the browser does not need direct cross-origin requests.
