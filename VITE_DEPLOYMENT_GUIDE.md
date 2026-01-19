# Complete Guide: Deploying Vite App to Cloudflare Pages

## Understanding Vite (Quick Overview)

**Vite** is a build tool that:
- **Development:** Runs a fast dev server (`npm run dev`)
- **Production:** Bundles your code into optimized files (`npm run build`)
- **Output:** Creates a `dist` folder with static files ready to deploy

### Key Commands

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production → creates `dist/` folder
npm run preview  # Preview the production build locally
```

---

## Deployment Methods

### Method 1: Direct Upload (Easiest - No Git Required) ⭐ Recommended for First Time

**Best for:** Quick deployment, testing, or if you don't use Git

#### Steps:

1. **Build your app:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with all your production files.

2. **Go to Cloudflare Dashboard:**
   - Visit: https://dash.cloudflare.com/
   - Click **"Pages"** in the sidebar
   - Click **"Create a project"**

3. **Upload your files:**
   - Choose **"Upload assets"** (not "Connect to Git")
   - Drag and drop the **entire contents** of your `dist` folder
     - Or click "Browse" and select all files inside `dist/`
   - Give your project a name (e.g., "forehead-charades")
   - Click **"Deploy site"**

4. **Wait for deployment:**
   - Cloudflare will process your files (takes ~30 seconds)
   - You'll get a URL like: `https://forehead-charades.pages.dev`

5. **Done!** Your app is live with HTTPS automatically enabled.

#### To Update:
- Make changes to your code
- Run `npm run build` again
- Go to Cloudflare Pages → Your Project → **"Upload new version"**
- Upload the new `dist` folder contents

---

### Method 2: Git Integration (Best for Ongoing Development) ⭐ Recommended for Production

**Best for:** Automatic deployments, version control, team collaboration

#### Prerequisites:
- Your code pushed to GitHub, GitLab, or Bitbucket

#### Steps:

1. **Push your code to Git:**
   ```bash
   git init                    # If not already a git repo
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **In Cloudflare Dashboard:**
   - Go to **Pages** → **Create a project**
   - Choose **"Connect to Git"**
   - Authorize Cloudflare to access your repository
   - Select your repository

3. **Configure Build Settings:**
   - **Project name:** `forehead-charades` (or your choice)
   - **Production branch:** `main` (or `master`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty)

4. **Environment Variables (Optional):**
   - Click **"Save and Deploy"**
   - After first deployment, go to **Settings** → **Environment Variables**
   - Add any `VITE_*` variables you need

5. **Automatic Deployments:**
   - Every time you push to `main` branch → automatic deployment
   - Preview deployments for pull requests
   - Build logs available in Cloudflare dashboard

---

### Method 3: Wrangler CLI (For Advanced Users)

**Best for:** CI/CD pipelines, automation, command-line workflows

#### Setup:

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```
   This opens your browser to authorize.

3. **Create a Pages project (first time only):**
   ```bash
   wrangler pages project create forehead-charades
   ```

4. **Build and Deploy:**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=forehead-charades
   ```

5. **For automatic deployments, add to your CI/CD:**
   ```yaml
   # Example GitHub Actions
   - name: Deploy to Cloudflare Pages
     run: |
       npm install -g wrangler
       npm run build
       wrangler pages deploy dist --project-name=forehead-charades
   ```

---

## Understanding the Build Process

### What Happens When You Run `npm run build`?

1. **Vite processes your code:**
   - Compiles React components
   - Bundles JavaScript files
   - Processes CSS (Tailwind, etc.)
   - Optimizes images and assets
   - Generates service worker for PWA

2. **Output in `dist/` folder:**
   ```
   dist/
   ├── index.html              # Main HTML file
   ├── assets/
   │   ├── index-XXXXX.js      # Your bundled JavaScript
   │   └── index-XXXXX.css     # Your bundled CSS
   ├── _redirects              # SPA routing rules
   ├── sw.js                   # Service worker (PWA)
   └── ... (other assets)
   ```

3. **This `dist` folder is what you deploy** - it's a static site!

---

## Important Configuration Files

### `vite.config.js`
- Configures how Vite builds your app
- Already set up correctly for your project

### `public/_redirects`
- Handles client-side routing (React Router)
- Ensures all routes go to `index.html`
- Already configured: `/*    /index.html   200`

### `package.json`
- Contains build scripts
- `"build": "vite build"` is what Cloudflare runs

---

## Troubleshooting

### Build Fails in Cloudflare

**Check:**
1. **Node version:** Cloudflare uses Node 18 by default (should work)
2. **Build command:** Must be `npm run build`
3. **Output directory:** Must be `dist`
4. **Dependencies:** Make sure `package.json` has all dependencies

**Fix:** Add `package.json` engines if needed:
```json
"engines": {
  "node": ">=18.0.0"
}
```

### Routes Don't Work (404 errors)

**Solution:** Make sure `public/_redirects` exists with:
```
/*    /index.html   200
```

### Environment Variables Not Working

**Remember:**
- Client-side variables must start with `VITE_`
- Access with: `import.meta.env.VITE_YOUR_VAR`
- Set in Cloudflare: Pages → Settings → Environment Variables

---

## Recommended Workflow

### For Development:
```bash
npm run dev          # Work on your app locally
```

### For Testing Production Build:
```bash
npm run build        # Build production version
npm run preview      # Test it locally before deploying
```

### For Deployment:
```bash
npm run build        # Build
# Then use Method 1, 2, or 3 above
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Deploy (Direct Upload) | Upload `dist/` folder |
| Deploy (Git) | Push to `main` branch |
| Deploy (CLI) | `wrangler pages deploy dist` |

---

## Next Steps After Deployment

1. ✅ Your app is live with HTTPS (required for iOS permissions)
2. ✅ Test on your iPhone - permission popup should work
3. ✅ Share the URL with others
4. ✅ Set up custom domain (optional) in Cloudflare Pages settings

---

## Need Help?

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Vite Docs:** https://vitejs.dev/
- **Build Logs:** Check in Cloudflare Dashboard → Pages → Your Project → Deployments

