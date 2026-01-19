# Fix Required Deploy Command for Cloudflare Pages

## The Issue
Cloudflare Pages is requiring a deploy command, but `npx wrangler deploy` is for Workers, not Pages.

## Solution

### Option 1: Use Pages Deploy Command (Recommended)

If the deploy command field is required, use:

```
npx wrangler pages deploy dist --project-name=forehead-charades
```

**Replace `forehead-charades` with your actual project name from Cloudflare.**

### Option 2: Use a No-Op Command

If you want Pages to handle deployment automatically, you can use:

```
echo "Deployment handled by Cloudflare Pages"
```

This satisfies the required field but doesn't actually run anything.

### Option 3: Check Build Output Directory

Make sure:
- **Build output directory:** `dist` (this is what Pages deploys automatically)
- If deploy command is required, use Option 1 above

## Recommended Settings

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler pages deploy dist --project-name=YOUR_PROJECT_NAME`
- **Non-production branch deploy command:** (can leave empty or use same as above)
- **Build output directory:** `dist`
- **Path:** `/`

