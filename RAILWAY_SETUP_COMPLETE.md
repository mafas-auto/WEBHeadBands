# Railway Setup - Final Steps

## ✅ Your Railway Public URL

**Backend URL:** `https://webheadbands-production.up.railway.app`

## Next Steps

### 1. Test Backend Health

Test the health endpoint:
```bash
curl https://webheadbands-production.up.railway.app/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 2. Verify Railway Environment Variables

In Railway Dashboard → Variables tab, make sure you have:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
ALLOWED_ORIGIN=https://headbands.filipmateja.cz
NODE_ENV=production
```

**Important:** 
- `PORT` is auto-assigned by Railway (don't set it)
- `ALLOWED_ORIGIN` must match your frontend URL exactly

### 3. Update Cloudflare Pages

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. **Settings** → **Environment Variables**
3. Add/Update:
   ```
   VITE_API_BASE_URL=https://webheadbands-production.up.railway.app
   ```
4. **Save** (will trigger auto-redeploy)

### 4. Test End-to-End

1. Wait for Cloudflare Pages to redeploy (usually 1-2 minutes)
2. Go to: https://headbands.filipmateja.cz
3. Click **"🤖 AI Create Deck"**
4. Enter a theme (e.g., "80s movies")
5. Click **"Generate Deck"**
6. Should work! 🎉

## Troubleshooting

### Backend Not Responding

**Check Railway Logs:**
- Go to Railway → Deployments → View Logs
- Look for errors or startup messages
- Should see: `🚀 Secure API server running on port XXXX`

**Test Health Endpoint:**
```bash
curl https://webheadbands-production.up.railway.app/health
```

### CORS Errors

If you see CORS errors in browser console:
- Check `ALLOWED_ORIGIN` in Railway variables
- Must be exactly: `https://headbands.filipmateja.cz`
- Include `https://` and no trailing slash

### API Key Issues

**Error: "OpenAI API key not found"**
- Check Railway Variables tab
- Make sure `OPENAI_API_KEY` is set
- Restart the service if needed

### Frontend Can't Connect

**Error: "Unable to connect to server"**
- Check `VITE_API_BASE_URL` in Cloudflare Pages
- Must be: `https://webheadbands-production.up.railway.app`
- Wait for Cloudflare Pages to redeploy after updating

## Quick Test Commands

```bash
# Test health endpoint
curl https://webheadbands-production.up.railway.app/health

# Test API endpoint (should fail without proper CORS, but shows server is up)
curl -X POST https://webheadbands-production.up.railway.app/api/generate-deck \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}'
```

## Configuration Summary

**Railway:**
- Public URL: `https://webheadbands-production.up.railway.app`
- Internal URL: `webheadbands.railway.internal`
- Port: Auto-assigned by Railway

**Cloudflare Pages:**
- Frontend URL: `https://headbands.filipmateja.cz`
- Environment Variable: `VITE_API_BASE_URL=https://webheadbands-production.up.railway.app`

**Railway Environment Variables:**
- `OPENAI_API_KEY` (required)
- `ALLOWED_ORIGIN=https://headbands.filipmateja.cz` (required)
- `NODE_ENV=production` (recommended)
- `PORT` (auto-assigned, don't set)

## ✅ Checklist

- [ ] Railway public URL generated
- [ ] Health endpoint tested and working
- [ ] Railway environment variables set
- [ ] Cloudflare Pages `VITE_API_BASE_URL` updated
- [ ] Frontend redeployed
- [ ] AI deck generation tested from frontend
- [ ] Ready for monetization! 🚀

