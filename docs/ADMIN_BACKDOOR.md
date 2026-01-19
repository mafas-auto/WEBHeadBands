# Admin Backdoor Access

## Overview

This document explains how to enable admin bypass for testing purposes. This allows you to test the app with unlimited AI deck generation without paying.

## ⚠️ Security Note

**This is for development/testing only.** The admin bypass should be:
- Only enabled in development
- Removed or disabled in production
- Not shared publicly

## How to Enable

### Method 1: Set Your Email (Recommended)

1. **Update admin email in code:**
   - Frontend: `src/utils/paymentStatus.js` - Change `ADMIN_EMAIL`
   - Backend: `server/server.js` - Change `ADMIN_EMAIL` or set `ADMIN_EMAIL` env var

2. **Use your email when prompted:**
   - When purchasing Party Pass, enter your admin email
   - The system will automatically enable bypass for your email

### Method 2: Browser Console (Quick Test)

Open browser console and run:

```javascript
// Enable bypass
localStorage.setItem('admin_bypass_enabled', 'true')

// Disable bypass
localStorage.removeItem('admin_bypass_enabled')

// Check status
localStorage.getItem('admin_bypass_enabled')
```

### Method 3: Set Email in localStorage

```javascript
// Set your admin email
localStorage.setItem('party_pass_email', 'your-email@example.com')

// Enable bypass
localStorage.setItem('admin_bypass_enabled', 'true')
```

## How It Works

### Frontend
- Checks if email matches `ADMIN_EMAIL` in `paymentStatus.js`
- Checks if `admin_bypass_enabled` flag is set in localStorage
- If either is true, `hasPartyPass()` returns `true`

### Backend
- Checks if `userEmail` matches `ADMIN_EMAIL` in `server.js`
- If match, skips premium check and rate limiting
- Allows unlimited AI deck generation

## Testing Checklist

- [ ] Enable bypass using one of the methods above
- [ ] Verify unlimited AI deck generation works
- [ ] Check that no payment is required
- [ ] Test that session limits are bypassed
- [ ] Verify bypass works across page refreshes
- [ ] Disable bypass and verify normal behavior

## Disabling for Production

Before deploying to production:

1. **Remove or comment out admin bypass code**
2. **Or set admin email to empty string**
3. **Or add environment check:**
   ```javascript
   const ADMIN_EMAIL = process.env.NODE_ENV === 'production' ? '' : 'your-email@example.com'
   ```

## Current Admin Email

**Frontend:** `src/utils/paymentStatus.js`
```javascript
const ADMIN_EMAIL = 'filipmateja@example.com' // TODO: Change to your actual email
```

**Backend:** `server/server.js`
```javascript
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'filipmateja@example.com'
```

**Update these to your actual email address!**

