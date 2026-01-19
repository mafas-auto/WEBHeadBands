# Railway Quick Start Checklist

## ✅ Pre-Deployment Checklist

- [x] Server code ready (`server/server.js`)
- [x] Package.json configured (`server/package.json`)
- [x] Server listens on `0.0.0.0` (for Railway)
- [x] Environment variables documented
- [x] Railway config file created (`server/railway.json`)

## 🚀 Deployment Steps

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Deploy to Railway

1. **Go to:** https://railway.app
2. **Sign up** with GitHub (recommended)
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repository**

### 3. Configure Root Directory

**IMPORTANT:** Your server is in `server/` folder!

1. Click on your service
2. Go to **Settings** tab
3. Scroll to **"Source"** section
4. Set **"Root Directory"** to: `server`
5. **Save**

### 4. Set Environment Variables

Go to **Variables** tab and add:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
ALLOWED_ORIGIN=https://headbands.filipmateja.cz
NODE_ENV=production
```

**Note:** Railway auto-assigns `PORT`, don't set it.

### 5. Wait for Deployment

- Railway will automatically build and deploy
- Watch the **Logs** tab for progress
- Should see: `🚀 Secure API server running on port XXXX`

### 6. Get Your Public Backend URL

**IMPORTANT:** Railway shows an internal URL first. You need the **public URL**!

1. In Railway dashboard, go to your service
2. Click **Settings** tab
3. Scroll to **"Networking"** section
4. Look for **"Public Domain"** or click **"Generate Domain"**
5. You'll get a URL like: `https://webheadbands-production.up.railway.app`
6. Copy this **public URL** (not the internal one)
7. Test it: `curl https://your-public-url.railway.app/health`

### 7. Update Frontend

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. **Settings** → **Environment Variables**
3. Add/Update:
   ```
   VITE_API_BASE_URL=https://your-railway-url.railway.app
   ```
4. **Save** (will auto-redeploy)

### 8. Test End-to-End

1. Go to your app: https://headbands.filipmateja.cz
2. Click **"🤖 AI Create Deck"**
3. Enter a theme (e.g., "80s movies")
4. Click **"Generate Deck"**
5. Should work! 🎉

## 🔧 Troubleshooting

**Build fails?**
- Check root directory is set to `server`
- Check logs for errors

**Server won't start?**
- Check environment variables are set
- Check logs for specific errors

**CORS errors?**
- Make sure `ALLOWED_ORIGIN` matches your frontend URL exactly
- Include `https://` in the URL

**API not responding?**
- Test health endpoint: `curl https://your-url.railway.app/health`
- Check Railway logs

## 📝 What You'll Need

- ✅ GitHub account (for Railway integration)
- ✅ Railway account (free tier: $5/month credit)
- ✅ OpenAI API key
- ✅ Your frontend URL: `https://headbands.filipmateja.cz`

## 🎯 Expected Result

After deployment:
- ✅ Backend running on Railway
- ✅ Health endpoint working
- ✅ AI deck generation working from frontend
- ✅ Ready for monetization!

---

**Full guide:** See `RAILWAY_DEPLOYMENT.md` for detailed instructions.

