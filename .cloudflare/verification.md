# Cloudflare Pages Configuration Verification

## Critical Settings to Check:

1. **Build output directory:** Must be exactly `dist` (not `/dist` or `./dist`)
2. **Root directory:** Should be `/` or empty
3. **Build command:** `npm run build`

## What Should Be Deployed:

ONLY files from `dist/` folder:
- ✅ `dist/index.html`
- ✅ `dist/assets/*.js`
- ✅ `dist/assets/*.css`
- ✅ `dist/_redirects`
- ✅ `dist/_headers`
- ✅ Other files in `dist/`

## What Should NOT Be Deployed:

- ❌ `src/` directory (source files)
- ❌ `index.html` from root (source file)
- ❌ `node_modules/`
- ❌ Any files outside `dist/`

## Test Your Deployment:

1. Visit: `https://webheadbands.pages.dev/src/main.jsx`
   - If this loads → SOURCE FILES ARE BEING SERVED (BAD - fix build output directory)
   - If 404 → Good, source files not accessible

2. Check Network tab:
   - What HTML file is loaded?
   - Does it reference `/assets/` or `/src/`?

3. View page source:
   - Should see: `<script src="/assets/index-XXXXX.js">`
   - Should NOT see: `<script src="/src/main.jsx">`

