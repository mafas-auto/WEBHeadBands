# Railway Setup - Final Configuration

## ✅ Current Status

- **Public URL:** `https://webheadbands-production.up.railway.app`
- **Port:** `8080` (Railway assigned)
- **Root Directory:** `server` ✅
- **Server:** Running ✅

## Next Steps

### 1. Update Port in Railway Networking

1. Go to Railway Dashboard → Your Service
2. **Settings** → **Networking**
3. In the port field, enter: `8080`
4. Click **"Update"**

### 2. Test Backend

After updating the port, test:
```bash
curl https://webheadbands-production.up.railway.app/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 3. Verify Environment Variables

In Railway → Variables tab, make sure you have:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
ALLOWED_ORIGIN=https://headbands.filipmateja.cz
NODE_ENV=production
```

### 4. Update Cloudflare Pages

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. **Settings** → **Environment Variables**
3. Add/Update:
   ```
   VITE_API_BASE_URL=https://webheadbands-production.up.railway.app
   ```
4. **Save** (will auto-redeploy frontend)

### 5. Test End-to-End

1. Wait for Cloudflare Pages to redeploy (~1-2 minutes)
2. Go to: https://headbands.filipmateja.cz
3. Click **"🤖 AI Create Deck"**
4. Enter a theme (e.g., "80s movies")
5. Click **"Generate Deck"**
6. Should work! 🎉

## Configuration Summary

**Railway Backend:**
- URL: `https://webheadbands-production.up.railway.app`
- Port: `8080`
- Root Directory: `server`

**Cloudflare Pages Frontend:**
- URL: `https://headbands.filipmateja.cz`
- Environment Variable: `VITE_API_BASE_URL=https://webheadbands-production.up.railway.app`

**Railway Environment Variables:**
- `OPENAI_API_KEY` (required)
- `ALLOWED_ORIGIN=https://headbands.filipmateja.cz` (required)
- `NODE_ENV=production` (recommended)
- `PORT=8080` (auto-assigned by Railway)

## Troubleshooting

### If health endpoint doesn't work:

1. **Check Railway logs** - Make sure server is running
2. **Verify port** - Should be 8080 in Networking settings
3. **Check environment variables** - Make sure OPENAI_API_KEY is set

### If CORS errors:

- Check `ALLOWED_ORIGIN` matches frontend URL exactly
- Must be: `https://headbands.filipmateja.cz`
- No trailing slash

## ✅ Final Checklist

- [ ] Port set to 8080 in Railway Networking
- [ ] Health endpoint tested and working
- [ ] Railway environment variables set
- [ ] Cloudflare Pages `VITE_API_BASE_URL` updated
- [ ] Frontend redeployed
- [ ] AI deck generation tested
- [ ] Ready for monetization! 🚀

