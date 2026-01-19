# Fix Cloudflare Pages Environment Variable

## Problem

Frontend is trying to connect to `http://localhost:3001` instead of Railway URL.

## Solution: Set Environment Variable in Cloudflare

### Step 1: Add Environment Variable

1. Go to **Cloudflare Dashboard**
2. **Pages** → Your Project (`headbands` or similar)
3. **Settings** tab (left sidebar)
4. Scroll down to **"Environment Variables"** section
5. Click **"Add variable"** or **"Edit variables"**

### Step 2: Add the Variable

**For Production:**
- **Variable name:** `VITE_API_BASE_URL`
- **Value:** `https://webheadbands-production.up.railway.app`
- **Environment:** Select **"Production"** (or "All environments")
- Click **"Save"**

### Step 3: Trigger Redeploy

After saving the environment variable:

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **"Retry deployment"** or **"Redeploy"**
4. Wait for rebuild (~1-2 minutes)

**OR** just push a new commit to trigger auto-deploy:
```bash
git commit --allow-empty -m "Trigger Cloudflare rebuild"
git push origin main
```

### Step 4: Clear Browser Cache

The service worker might be caching the old build:

1. **Hard refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Or clear site data:**
   - Open DevTools (F12)
   - Application tab → Storage
   - Click "Clear site data"
   - Refresh page

## Verify It's Working

1. After redeploy, open your site
2. Open DevTools (F12) → Network tab
3. Try generating an AI deck
4. Look for the request - it should go to:
   - ✅ `https://webheadbands-production.up.railway.app/api/generate-deck`
   - ❌ NOT `http://localhost:3001/api/generate-deck`

## Quick Checklist

- [ ] Environment variable `VITE_API_BASE_URL` added in Cloudflare Pages
- [ ] Value set to: `https://webheadbands-production.up.railway.app`
- [ ] Environment set to "Production" (or "All")
- [ ] Saved the variable
- [ ] Triggered redeploy (retry deployment or new commit)
- [ ] Waited for rebuild to complete
- [ ] Cleared browser cache/service worker
- [ ] Tested AI deck generation

## Alternative: Quick Test

If you want to test immediately without waiting for Cloudflare:

1. Build locally with the env var:
   ```bash
   # Create .env file in project root
   echo "VITE_API_BASE_URL=https://webheadbands-production.up.railway.app" > .env
   npm run build
   ```
2. Test locally with `npm run preview`
3. Or just wait for Cloudflare to rebuild

## Troubleshooting

**Still seeing localhost?**
- Make sure you cleared browser cache
- Check that Cloudflare actually rebuilt (check Deployments tab)
- Verify the env var is set correctly in Cloudflare dashboard

**Service worker caching?**
- Clear site data in browser
- Or unregister service worker in DevTools → Application → Service Workers

