# Deployment Guide

Complete guide for deploying Forehead Charades to production.

## Overview

This app has two components:
- **Frontend**: React/Vite app deployed to Cloudflare Pages
- **Backend**: Express API server deployed to Railway (or similar)

Both must be deployed and configured for the app to work fully.

## Quick Answer

**You don't need Docker!** Both frontend and backend can be deployed without Docker.

---

## Frontend: Cloudflare Pages (No Docker)

### What Cloudflare Pages Does
- Hosts your static `dist/` folder
- Provides HTTPS automatically
- CDN distribution
- **No server, no Docker needed**

### Deployment Steps

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy via Git (Recommended):**
   - Push to GitHub
   - Connect repo in Cloudflare Dashboard
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Done! Auto-deploys on every push

3. **Set Environment Variable:**
   - In Cloudflare Dashboard → Pages → Your Project → Settings
   - Add: `VITE_API_BASE_URL=https://your-backend-url.com`

---

## Backend: Choose Your Option

### Option 1: Cloudflare Workers (Recommended)

**Why:** Keep everything in Cloudflare, serverless, no Docker.

**Steps:**
1. Convert Express server to Cloudflare Worker
2. Deploy with Wrangler CLI
3. Set secrets for API keys
4. Done!

**Pros:**
- ✅ All in Cloudflare ecosystem
- ✅ Serverless (pay per request)
- ✅ Global edge network
- ✅ Free tier: 100,000 requests/day
- ✅ No Docker, no servers to manage

**Cons:**
- ⚠️ Need to rewrite Express code to Worker format
- ⚠️ Some Express middleware may not work

---

### Option 2: Railway (Easiest, No Docker)

**Why:** Simplest deployment, runs Node.js directly.

**Steps:**
1. Sign up at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Railway auto-detects Node.js
5. Set environment variables:
   - `OPENAI_API_KEY=sk-...`
   - `PORT=3001` (or let Railway assign)
   - `ALLOWED_ORIGIN=https://your-frontend-url.com`
6. Deploy!

**Pros:**
- ✅ Zero configuration
- ✅ Auto-detects Node.js
- ✅ No Dockerfile needed
- ✅ Free tier: $5 credit/month
- ✅ Auto-deploys on Git push

**Cons:**
- ⚠️ Separate service from Cloudflare

---

### Option 3: Render (No Docker)

**Why:** Simple, reliable, runs Node.js directly.

**Steps:**
1. Sign up at [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment:** Node
5. Set environment variables
6. Deploy!

**Pros:**
- ✅ Simple interface
- ✅ Runs Node.js directly
- ✅ Free tier available
- ✅ Auto-deploys on Git push

**Cons:**
- ⚠️ Free tier spins down after inactivity
- ⚠️ Separate service from Cloudflare

---

### Option 4: Fly.io (No Docker Required)

**Why:** Global distribution, runs Node.js directly.

**Steps:**
```bash
cd server
fly launch
# Follow prompts
fly secrets set OPENAI_API_KEY=sk-...
fly deploy
```

**Pros:**
- ✅ Global edge network
- ✅ Can run Node.js directly
- ✅ Free tier: 3 shared VMs

**Cons:**
- ⚠️ CLI-based (less GUI)
- ⚠️ Separate service from Cloudflare

---

### Option 5: Self-Hosted VPS (No Docker)

**Why:** Full control, no Docker needed.

**Steps:**
1. Get a VPS (DigitalOcean, Linode, etc.)
2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Clone repo
4. Set up `.env` file
5. Install PM2:
   ```bash
   npm install -g pm2
   ```
6. Start server:
   ```bash
   cd server
   pm2 start server.js
   pm2 save
   pm2 startup
   ```

**Pros:**
- ✅ Full control
- ✅ No Docker needed
- ✅ Can use any Node.js version

**Cons:**
- ⚠️ You manage the server
- ⚠️ Need to set up SSL (Let's Encrypt)
- ⚠️ Need to configure firewall

---

## When Would You Need Docker?

You only need Docker if:

1. **You want containerization** (consistent environments)
2. **Your hosting service requires it** (some services do)
3. **You prefer containerized deployments** (team standard)
4. **You need specific system dependencies** (rare for Node.js)

**For this project, Docker is completely optional.**

---

## Recommended Setup

### For Simplicity:
1. **Frontend:** Cloudflare Pages (static files)
2. **Backend:** Railway (easiest Node.js deployment)

### For Everything in Cloudflare:
1. **Frontend:** Cloudflare Pages
2. **Backend:** Cloudflare Workers (need to convert Express code)

### For Free Tier:
1. **Frontend:** Cloudflare Pages (free)
2. **Backend:** Railway ($5/month credit) or Render (free with limitations)

---

## Environment Variables Summary

### Frontend (Cloudflare Pages)
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

### Backend (Any Service)
```env
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001  # or let service assign
ALLOWED_ORIGIN=https://your-frontend-url.com
NODE_ENV=production
```

---

## Quick Start Commands

### Railway (Recommended)
```bash
# Just push to GitHub, then:
# 1. Go to railway.app
# 2. New Project → Deploy from GitHub
# 3. Select repo
# 4. Add environment variables
# Done!
```

### Render
```bash
# Push to GitHub, then:
# 1. Go to render.com
# 2. New → Web Service
# 3. Connect GitHub
# 4. Set build/start commands
# 5. Add environment variables
# Done!
```

### Fly.io
```bash
cd server
fly launch
fly secrets set OPENAI_API_KEY=sk-...
fly deploy
```

---

## Summary

✅ **No Docker needed** for any deployment option
✅ **Frontend:** Cloudflare Pages (static files)
✅ **Backend:** Railway/Render/Fly.io (run Node.js directly)
✅ **Simplest:** Railway (auto-detects, zero config)

