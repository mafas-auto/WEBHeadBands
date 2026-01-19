# Railway Deployment Guide

## Quick Start

Railway auto-detects Node.js and deploys your Express server. No Docker needed!

## Step-by-Step Instructions

### 1. Prepare Your Code

✅ **Already done!** Your server is ready:
- `server/package.json` has start script
- `server/server.js` is the entry point
- Environment variables documented

### 2. Push to GitHub

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 3. Deploy to Railway

1. **Sign up/Login:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub (recommended)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service:**
   - Railway will auto-detect it's a Node.js project
   - It will look for `package.json` in the root
   - **IMPORTANT:** Set the root directory to `server/`
     - Click on your service
     - Go to Settings → Source
     - Set "Root Directory" to `server`
     - Or use the `railway.json` config file (already created)

4. **Set Environment Variables:**
   - Go to Variables tab
   - Add these variables:
     ```
     OPENAI_API_KEY=sk-your-actual-api-key-here
     ALLOWED_ORIGIN=https://headbands.filipmateja.cz
     NODE_ENV=production
     ```
   - **Note:** Railway will auto-assign `PORT`, you don't need to set it

5. **Deploy:**
   - Railway will automatically start building
   - Watch the logs to see progress
   - Once deployed, Railway will give you a URL like: `https://your-app.railway.app`

### 4. Get Your Backend URL

After deployment:
- Railway provides a public URL (e.g., `https://webheadbands-api.railway.app`)
- Copy this URL

### 5. Update Frontend

Update your Cloudflare Pages environment variable:

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Settings → Environment Variables
3. Add/Update:
   ```
   VITE_API_BASE_URL=https://your-railway-url.railway.app
   ```
4. Redeploy your frontend (or wait for auto-deploy)

### 6. Test It

1. **Test backend health:**
   ```bash
   curl https://your-railway-url.railway.app/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Test from frontend:**
   - Go to your app
   - Click "🤖 AI Create Deck"
   - Enter a theme
   - Click "Generate Deck"
   - Should work!

## Railway Configuration

### Root Directory Issue

Railway looks for `package.json` in the root by default. Since your server is in `server/` folder, you have two options:

**Option 1: Use railway.json (Recommended)**
- Already created `server/railway.json`
- Railway will use this config
- Make sure it's in the `server/` directory

**Option 2: Set in Railway Dashboard**
- Go to Service Settings → Source
- Set "Root Directory" to `server`

### Environment Variables

Railway automatically provides:
- `PORT` - Railway assigns this automatically
- `RAILWAY_ENVIRONMENT` - Environment name

You need to set:
- `OPENAI_API_KEY` - Your OpenAI API key
- `ALLOWED_ORIGIN` - Your frontend URL
- `NODE_ENV` - Set to `production`

### Custom Domain (Optional)

1. Go to Settings → Networking
2. Click "Generate Domain" or add custom domain
3. Update `ALLOWED_ORIGIN` to match your custom domain

## Troubleshooting

### Build Fails

**Error: "Cannot find package.json"**
- Make sure root directory is set to `server/` in Railway settings
- Or ensure `railway.json` is in `server/` directory
- Check that `server/package.json` exists

**Error: "Module not found"**
- Check that all dependencies are in `server/package.json`
- Railway runs `npm install` automatically
- Verify `node_modules` is not in `.gitignore` (it shouldn't be)

**Error: "Build failed"**
- Check Railway logs for specific error messages
- Verify Node.js version (18+) in `package.json` engines
- Ensure all required files are committed to Git

### Server Won't Start

**Error: "Port already in use"**
- Railway assigns `PORT` automatically
- Make sure your code uses `process.env.PORT || 8080`
- Don't hardcode port numbers

**Error: "OPENAI_API_KEY not found"**
- Check environment variables in Railway dashboard
- Make sure variable name is exactly `OPENAI_API_KEY`
- Verify variable is set for the correct environment (Production/Preview)

**Error: "Application failed to respond"**
- Check that server is listening on `0.0.0.0` (not `localhost`)
- Verify `PORT` environment variable is being used
- Check Railway logs for startup errors

### CORS Errors

**Error: "CORS policy blocked"**
- Check `ALLOWED_ORIGIN` environment variable
- Make sure it matches your frontend URL exactly (including `https://`)
- Verify CORS middleware is configured in `server.js`

### API Not Responding

1. **Check logs:**
   - Go to Railway dashboard → Deployments → View Logs
   - Look for errors or warnings
   - Check if server started successfully

2. **Test health endpoint:**
   ```bash
   curl https://your-url.railway.app/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

3. **Check environment variables:**
   - Make sure all required variables are set
   - Check for typos in variable names
   - Verify values are correct (no extra spaces)

4. **Check public URL:**
   - Go to Settings → Networking → Domains
   - Copy the public domain URL
   - Use this URL in `VITE_API_BASE_URL`

### Getting Public URL

- Railway provides public URL automatically
- Find it in: **Settings → Networking → Domains → Public Domain**
- Format: `your-project.up.railway.app`
- Update `VITE_API_BASE_URL` in Cloudflare Pages with this URL

## Railway Features

### Auto-Deploy

- Railway auto-deploys on every push to your main branch
- No manual deployment needed

### Logs

- View real-time logs in Railway dashboard
- Useful for debugging

### Metrics

- Railway shows CPU, memory, and network usage
- Monitor your API usage

### Free Tier

- $5 credit per month
- Enough for low to moderate traffic
- Pay-as-you-go after that

## Cost Estimate

For AI deck generation:
- Each request: ~$0.001-0.002 (OpenAI cost)
- Railway hosting: Free tier covers most use cases
- Estimated: **$0-5/month** for moderate usage

## Next Steps

After Railway deployment:
1. ✅ Test the API
2. ✅ Update frontend environment variable
3. ✅ Test end-to-end
4. 🚀 Ready for monetization!

## Quick Reference

**Railway Dashboard:** https://railway.app
**Your Service URL:** Check Railway dashboard after deployment
**Environment Variables:**
- `OPENAI_API_KEY` (required)
- `ALLOWED_ORIGIN` (required)
- `NODE_ENV=production` (optional but recommended)
- `PORT` (auto-assigned by Railway)

