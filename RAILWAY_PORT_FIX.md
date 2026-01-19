# Railway Port Configuration Fix

## Problem

Port **5173** is incorrect - that's your **frontend Vite dev server** port, not the backend!

## Solution

Railway auto-assigns a port via the `PORT` environment variable. We need to find what port Railway assigned.

### Option 1: Check Railway Logs (Recommended)

1. Go to Railway Dashboard → Your Service
2. **Deployments** tab → Latest deployment
3. **Logs** tab
4. Look for: `🚀 Secure API server running on port XXXX`
5. That's your port! (Usually 3000, 3001, or a random port)

### Option 2: Let Railway Auto-Detect

1. In the Networking settings you're looking at
2. **Clear the port field** (delete "5173")
3. Click **"Update"**
4. Railway will auto-detect the port from your server

### Option 3: Check Environment Variables

1. Railway Dashboard → Variables tab
2. Look for `PORT` - Railway auto-assigns this
3. Use that port number

## Quick Fix Steps

1. **In the Networking screen you're on:**
   - Delete "5173" from the port field
   - Leave it empty OR enter the port from logs
   - Click **"Update"**

2. **Or better yet:**
   - Check Railway logs first to see what port the server is actually using
   - Then enter that port number

## Expected Port

Your backend server code uses:
```javascript
const PORT = process.env.PORT || 3001
```

So Railway will assign a port (could be 3000, 3001, or any available port). Check the logs to see what it actually got!

## After Fixing

Once the port is correct:
1. Test: `curl https://webheadbands-production.up.railway.app/health`
2. Should return: `{"status":"ok","timestamp":"..."}`

