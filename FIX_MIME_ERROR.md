# Fix: MIME Type Error - Loading main.jsx Instead of Bundle

## Root Cause

The browser is trying to load `/src/main.jsx` (source file) instead of `/assets/index-XXXXX.js` (built bundle).

This means the browser is receiving HTML that references `/src/main.jsx`, which suggests:
- Either Cloudflare is serving the source `index.html` from repo root
- Or the build output directory is misconfigured

## Verification Steps

### 1. Check Cloudflare Build Settings

Go to: **Cloudflare Dashboard → Pages → Your Project → Settings → Builds & deployments**

Verify:
- ✅ **Build output directory:** Must be exactly `dist` (case-sensitive, no leading slash)
- ✅ **Root directory:** Should be `/` or empty
- ✅ **Build command:** `npm run build`

### 2. Test What's Actually Deployed

Visit these URLs on your live site:

1. **Test if source files are accessible (they shouldn't be):**
   ```
   https://webheadbands.pages.dev/src/main.jsx
   ```
   - If this loads → **PROBLEM:** Source files are being served
   - If 404 → Good, source files not accessible

2. **Check the actual HTML being served:**
   - Open your site
   - Right-click → View Page Source
   - Look for the script tag:
     - ✅ Should see: `<script src="/assets/index-XXXXX.js">`
     - ❌ Should NOT see: `<script src="/src/main.jsx">`

3. **Check Network Tab:**
   - Open DevTools → Network tab
   - Reload page
   - Check what `index.html` file is loaded
   - Check its response - does it reference `/src/` or `/assets/`?

### 3. Clear All Caches

1. **Browser:**
   - DevTools → Application → Clear Storage → Clear site data
   - Unregister service worker
   - Hard refresh (Ctrl+Shift+R)

2. **Cloudflare:**
   - Go to your domain (if using custom domain)
   - Caching → Configuration → Purge Cache → Purge Everything

## The Fix

The build is correct (verified locally). The issue is likely:

1. **Cloudflare build output directory misconfigured**
   - Solution: Set it to exactly `dist` (not `/dist` or `./dist`)

2. **Source files being deployed**
   - Solution: Ensure only `dist/` folder contents are deployed

3. **Caching serving old HTML**
   - Solution: Clear all caches (browser + Cloudflare)

## What I've Fixed in Code

1. ✅ Explicit build output directory in `vite.config.js`
2. ✅ Service worker configured to never cache HTML
3. ✅ Cache-control headers to prevent HTML caching
4. ✅ Build verified locally - produces correct output

## Next Steps

1. **Verify Cloudflare settings** (most important!)
2. **Test if source files are accessible** on live site
3. **Clear all caches**
4. **Check what HTML is actually being served**

If source files are accessible, the build output directory is wrong in Cloudflare settings.

