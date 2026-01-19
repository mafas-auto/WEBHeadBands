# Quick Admin Setup

## Enable Unlimited Access for Testing

### Step 1: Set Your Email

Open browser console (F12) and run:

```javascript
// Set your email (use the email you'll use when testing)
localStorage.setItem('party_pass_email', 'your-email@example.com')

// Enable admin bypass
localStorage.setItem('admin_bypass_enabled', 'true')

// Refresh the page
location.reload()
```

### Step 2: Update Code (Optional but Recommended)

**Frontend:** Edit `src/utils/paymentStatus.js`
```javascript
const ADMIN_EMAIL = 'your-actual-email@example.com' // Change this
```

**Backend:** Edit `server/server.js` or set environment variable
```javascript
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'your-actual-email@example.com'
```

Or set in Railway:
```
ADMIN_EMAIL=your-actual-email@example.com
```

### Step 3: Test

1. Go to AI Deck Creator
2. You should see "Party Pass Active - Unlimited generations"
3. Generate as many decks as you want!

### Disable Bypass

```javascript
localStorage.removeItem('admin_bypass_enabled')
location.reload()
```

---

**That's it!** You now have unlimited access for testing. The bypass works both client-side (for UI) and server-side (for API rate limiting).

