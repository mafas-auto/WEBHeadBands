# Deployment Guide - Cloudflare Pages

## Environment Variables Setup

### For Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your local credentials (this file is gitignored)

3. Access variables in code:
   ```javascript
   const apiKey = import.meta.env.VITE_API_KEY
   ```

### For Cloudflare Pages Deployment

#### Option 1: Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to: **Pages** → **Your Project** → **Settings** → **Environment Variables**
3. Add your environment variables:
   - **Variable name:** `VITE_API_KEY` (or your variable name)
   - **Value:** Your actual credential value
   - **Environment:** Select Production, Preview, or both
4. Click **Save**
5. Redeploy your site for changes to take effect

#### Option 2: Via Wrangler CLI

1. Create a `.dev.vars` file (for local development):
   ```
   VITE_API_KEY=your_key_here
   ```

2. Set production variables via CLI:
   ```bash
   wrangler pages secret put VITE_API_KEY --project-name=forehead-charades
   ```

### Important Notes

- **All client-side environment variables must be prefixed with `VITE_`**
- Variables without `VITE_` prefix are only available server-side (Workers)
- Environment variables are embedded at build time
- After changing env vars in Cloudflare, you need to trigger a new deployment
- Never commit `.env.local` or files with actual credentials

### Example Usage in Code

```javascript
// In your React component or utility file
const apiKey = import.meta.env.VITE_API_KEY
const isProduction = import.meta.env.MODE === 'production'
const apiUrl = import.meta.env.VITE_API_URL || 'https://api.example.com'
```

### Security Best Practices

1. ✅ Use `.env.example` as a template (committed to git)
2. ✅ Add `.env.local` to `.gitignore` (not committed)
3. ✅ Use Cloudflare Pages environment variables for production
4. ✅ Never hardcode credentials in source code
5. ✅ Use different credentials for dev/staging/production

