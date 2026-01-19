# Monetization Feature - Beta Branch

## ⚠️ This is a Beta Feature

This branch contains monetization features that are **NOT** merged to main. It's kept separate for testing and development.

## What's Implemented

### 1. Stripe Checkout Integration ✅

**Price:** $4.99 USD (one-time payment)  
**Duration:** 365 days (1 year)  
**Benefits:**
- ✅ Unlimited AI deck generations (no session limits)
- ✅ Create as many custom decks as you want
- ✅ All decks saved in your account
- ✅ Access to all premium features

**Payment Flow:**
- Stripe Checkout (hosted payment page)
- Supports Apple Pay, Google Pay, Credit Cards
- Secure payment processing
- Webhook verification

### 2. Supabase Database Integration ✅

**File:** `server/supabase-schema.sql`

- User management database
- Stores payment status server-side
- Tracks premium expiry dates
- Row Level Security (RLS) enabled

### 3. Backend Payment Verification ✅

**Endpoints:**
- `POST /api/create-checkout-session` - Creates Stripe Checkout
- `GET /api/verify-payment` - Verifies payment completion
- `POST /api/check-premium-status` - Checks user's premium status
- `POST /api/webhook` - Stripe webhook handler

### 4. Payment Status Management

**File:** `src/utils/paymentStatus.js`

- Caches Party Pass status in `localStorage` (for performance)
- Verifies with backend (Supabase) when email available
- Tracks expiry date
- Calculates days remaining

**Note:** Backend (Supabase) is the source of truth. localStorage is just a cache.

### 3. Session Limit Integration

**File:** `src/utils/sessionLimiter.js`

- Party Pass users bypass the 5-prompt session limit
- Returns `Infinity` for remaining prompts when pass is active
- Free users still limited to 5 prompts per session

### 4. UI Components

**Party Pass Purchase Screen** (`src/screens/PartyPassScreen.jsx`)
- Beautiful purchase flow
- Shows benefits and pricing
- Mock payment processing (ready for real payment integration)

**Updated AI Deck Screen**
- Shows Party Pass status badge when active
- Shows upgrade prompt when limit reached
- Displays days remaining

**Updated Home Screen**
- Shows upgrade button when viewing AI decks
- Party Pass status indicators

## Current Implementation Status

### ✅ Completed

- [x] Party Pass purchase screen
- [x] Payment status management (localStorage)
- [x] Session limit bypass for paid users
- [x] UI indicators for Party Pass status
- [x] Upgrade prompts when limit reached
- [x] Days remaining display

### ⚠️ Beta / Mock Implementation

- [ ] **Payment Processing:** Currently uses mock payment (2-second delay, always succeeds)
- [ ] **Payment Verification:** Client-side only (should be server-side)
- [ ] **Payment Provider:** Not integrated (ready for Stripe/PayPal)
- [ ] **Backend Verification:** No server-side payment verification yet

## How to Test

### Test Free User Flow

1. Clear localStorage: `localStorage.clear()` in browser console
2. Go to AI Deck Creator
3. Generate 5 decks (should hit limit)
4. See upgrade prompt

### Test Party Pass User Flow

1. In browser console: 
   ```javascript
   localStorage.setItem('party_pass_status', 'active')
   const expiry = new Date()
   expiry.setDate(expiry.getDate() + 365)
   localStorage.setItem('party_pass_expiry', expiry.toISOString())
   ```
2. Refresh page
3. Go to AI Deck Creator
4. Should see "Party Pass Active - Unlimited generations"
5. Generate unlimited decks (no limit)

### Test Purchase Flow

1. Go to `/party-pass` route
2. Click "Purchase Party Pass"
3. Wait 2 seconds (mock payment)
4. Should activate Party Pass
5. Redirect to home with unlimited access

## Next Steps for Production

### 1. Integrate Real Payment Provider

**Option A: Stripe**
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

**Option B: PayPal**
```bash
npm install @paypal/react-paypal-js
```

### 2. Backend Payment Verification

Create endpoints:
- `POST /api/create-payment-intent` - Create payment session
- `POST /api/verify-payment` - Verify payment completion
- `GET /api/payment-status` - Check user's payment status

### 3. Server-Side Payment Status

- Store payment status in database (not localStorage)
- Verify payment on backend before allowing unlimited generations
- Handle payment webhooks for subscription management

### 4. Security Enhancements

- Never trust client-side payment status
- Always verify on backend
- Use secure payment provider APIs
- Implement proper authentication

## Files Changed

### New Files
- `src/utils/paymentStatus.js` - Payment status management
- `src/screens/PartyPassScreen.jsx` - Purchase screen
- `MONETIZATION_BETA.md` - This file

### Modified Files
- `src/utils/sessionLimiter.js` - Added Party Pass check
- `src/screens/AIDeckScreen.jsx` - Added Party Pass UI
- `src/screens/HomeScreen.jsx` - Added upgrade buttons
- `src/App.jsx` - Added Party Pass route

## Branch Information

**Branch:** `feature/monetization`  
**Status:** Beta - Not merged to main  
**Purpose:** Testing and development of monetization features

## Testing Checklist

- [ ] Free user sees 5-prompt limit
- [ ] Free user sees upgrade prompt when limit reached
- [ ] Party Pass user sees unlimited badge
- [ ] Party Pass user can generate unlimited decks
- [ ] Purchase flow works (mock)
- [ ] Payment status persists after refresh
- [ ] Expired pass is detected and cleared
- [ ] Days remaining displays correctly

## Notes

- Payment is currently **mock only** - no real charges
- Payment status stored in `localStorage` (client-side)
- In production, must verify payments server-side
- Ready for Stripe/PayPal integration

