# Getting Your Railway Public URL

## Internal vs Public URL

Railway provides two types of URLs:

1. **Internal URL** (e.g., `webheadbands.railway.internal`)
   - Only accessible within Railway's network
   - Used for service-to-service communication
   - ❌ Cannot be accessed from the internet

2. **Public URL** (e.g., `webheadbands-production.up.railway.app`)
   - Accessible from the internet
   - ✅ This is what you need for your frontend

## How to Get Your Public URL

### Method 1: Railway Dashboard

1. Go to your Railway project dashboard
2. Click on your service (the one you just deployed)
3. Go to the **"Settings"** tab
4. Scroll down to **"Networking"** section
5. You'll see:
   - **Public Domain**: `webheadbands-production.up.railway.app` (or similar)
   - This is your public URL!

### Method 2: Generate Public Domain

If you don't see a public domain:

1. In your service **Settings** → **Networking**
2. Click **"Generate Domain"** button
3. Railway will create a public URL like:
   - `webheadbands-production-XXXX.up.railway.app`
4. Copy this URL

### Method 3: Check Deployments Tab

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check the logs - Railway often prints the public URL
4. Look for: `Listening on https://...`

## Test Your Public URL

Once you have the public URL, test it:

```bash
curl https://your-public-url.railway.app/health
```

Should return:
```json
{"status":"ok","timestamp":"..."}
```

## Update Your Configuration

### 1. Update Railway Environment Variable

In Railway dashboard → Variables tab, make sure:

```
ALLOWED_ORIGIN=https://headbands.filipmateja.cz
```

### 2. Update Cloudflare Pages

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Settings → Environment Variables
3. Add/Update:
   ```
   VITE_API_BASE_URL=https://your-public-railway-url.railway.app
   ```
4. Save (will trigger redeploy)

## Custom Domain (Optional)

If you want a custom domain instead of `.railway.app`:

1. In Railway → Settings → Networking
2. Click **"Custom Domain"**
3. Add your domain (e.g., `api.headbands.filipmateja.cz`)
4. Follow Railway's DNS instructions
5. Update `ALLOWED_ORIGIN` to match

## Quick Checklist

- [ ] Found public URL in Railway Settings → Networking
- [ ] Tested health endpoint: `curl https://your-url.railway.app/health`
- [ ] Updated `ALLOWED_ORIGIN` in Railway variables
- [ ] Updated `VITE_API_BASE_URL` in Cloudflare Pages
- [ ] Tested AI deck generation from frontend

## Common Issues

**"No public domain shown"**
- Click "Generate Domain" button
- Railway will create one automatically

**"Can't access public URL"**
- Make sure service is deployed and running
- Check Railway logs for errors
- Verify environment variables are set

**"CORS errors"**
- Make sure `ALLOWED_ORIGIN` matches your frontend URL exactly
- Include `https://` in the URL
- No trailing slash

