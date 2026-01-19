# Railway 502 Error - Troubleshooting

## Current Status

✅ Public URL generated: `https://webheadbands-production.up.railway.app`
❌ Server returning 502: "Application failed to respond"

## What This Means

The domain is working, but the server isn't running or crashed. Let's fix it!

## Step 1: Check Railway Logs

1. Go to Railway Dashboard
2. Click on your service
3. Go to **"Deployments"** tab
4. Click on the latest deployment
5. Check the **"Logs"** tab

**Look for:**
- ✅ Success: `🚀 Secure API server running on port XXXX`
- ❌ Error: Any error messages (red text)

## Common Issues & Fixes

### Issue 1: Server Not Starting

**Symptoms:**
- Logs show "Cannot find module" or "Error starting"

**Fix:**
- Check that **Root Directory** is set to `server` in Settings
- Make sure `server/package.json` exists
- Check that all dependencies are listed

### Issue 2: Missing Environment Variables

**Symptoms:**
- Logs show "OPENAI_API_KEY not found"
- Server exits immediately

**Fix:**
1. Go to Railway → Variables tab
2. Add:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ALLOWED_ORIGIN=https://headbands.filipmateja.cz
   NODE_ENV=production
   ```
3. Railway will auto-restart

### Issue 3: Port Configuration

**Symptoms:**
- Server starts but Railway can't connect

**Fix:**
- Railway auto-assigns PORT
- Make sure your code uses: `process.env.PORT || 3001`
- Don't hardcode the port
- In "Generate Domain", you can leave port as default or check logs for assigned port

### Issue 4: Build Failed

**Symptoms:**
- Deployment shows "Build failed"
- No server logs

**Fix:**
- Check build logs
- Make sure `server/package.json` has all dependencies
- Check that Node.js version is compatible (18+)

## Quick Fixes to Try

### Fix 1: Restart Service

1. Railway Dashboard → Your Service
2. Click **"Redeploy"** button
3. Watch logs for errors

### Fix 2: Check Root Directory

1. Settings → Source
2. Make sure **Root Directory** is: `server`
3. Save and redeploy

### Fix 3: Verify Environment Variables

1. Variables tab
2. Make sure these are set:
   - `OPENAI_API_KEY` (required!)
   - `ALLOWED_ORIGIN` (required!)
   - `NODE_ENV=production` (optional)

### Fix 4: Check Server Code

Make sure `server/server.js`:
- Uses `process.env.PORT || 3001`
- Listens on `0.0.0.0` (already done ✅)
- Has proper error handling

## What to Share

When checking logs, look for:
1. **Build logs** - Did npm install succeed?
2. **Startup logs** - Did server start?
3. **Error messages** - Any red text?

Share the relevant log lines and I'll help debug!

## Expected Logs (Success)

When working correctly, you should see:
```
> webheadbands-api@1.0.0 start
> node server.js

🚀 Secure API server running on port 3001
📝 Environment: production
🔒 Rate limit: 100 requests per 15 minutes per IP
🌐 Listening on 0.0.0.0:3001
```

## Next Steps

1. Check Railway logs (most important!)
2. Share any error messages you see
3. Verify environment variables are set
4. Try redeploying if needed

