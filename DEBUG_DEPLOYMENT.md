# Debugging Cloudflare Pages Deployment Issue

## The Problem
Browser is trying to load `/src/main.jsx` instead of `/assets/index-XXXXX.js`

## Root Cause Analysis

### What Should Happen:
1. Vite builds → creates `dist/index.html` with correct bundle reference
2. Cloudflare deploys `dist/` folder only
3. Browser loads `dist/index.html` → references `/assets/index-XXXXX.js`

### What's Actually Happening:
Browser is loading HTML that references `/src/main.jsx`

## Possible Causes:

1. **Cloudflare serving wrong directory**
   - Build output directory not set to `dist`
   - Serving entire repo instead of just `dist/`

2. **Source files accessible**
   - `/src/` directory is being served (shouldn't be)
   - Only `dist/` should be accessible

3. **Caching issue**
   - Old HTML cached (but we've tried fixing this)

4. **Service worker serving wrong file**
   - SW intercepting and serving source files

## What to Check in Cloudflare:

1. **Build Settings:**
   - Build output directory: Must be `dist` (not `/dist` or empty)
   - Root directory: Should be `/` or empty

2. **What's Actually Deployed:**
   - Check if `/src/` directory is accessible on live site
   - Try: `https://webheadbands.pages.dev/src/main.jsx`
   - If it loads → source files are being deployed (BAD)

3. **Network Tab:**
   - Check what HTML file is actually being loaded
   - Check response headers
   - Check if it's coming from cache or network

## Test Commands:

```bash
# Check what's in dist (should NOT have src/)
ls dist/

# Check built HTML (should reference assets/, not src/)
cat dist/index.html | grep -E "(src|assets)"

# Test locally
npm run build
npm run preview
# Open http://localhost:4173
# Check if it works locally
```

