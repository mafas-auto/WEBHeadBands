# Stripe Integration Setup Guide

## Overview

This guide walks you through setting up Stripe Checkout for the Party Pass payment system.

## Prerequisites

1. Stripe account: https://stripe.com
2. Supabase account: https://supabase.com (for user management)
3. Backend server running (Railway or similar)

## Step 1: Set Up Stripe

### 1.1 Create Stripe Account

1. Go to https://stripe.com and sign up
2. Complete account verification
3. Go to Dashboard → Developers → API keys

### 1.2 Get Your API Keys

**For Testing (Development):**
- **Publishable key:** `pk_test_...` (use in frontend if needed)
- **Secret key:** `sk_test_...` (use in backend `.env`)

**For Production:**
- Switch to "Live mode" in Stripe Dashboard
- Get live keys: `pk_live_...` and `sk_live_...`

### 1.3 Set Up Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-backend-url.railway.app/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_...`)

## Step 2: Set Up Supabase

### 2.1 Create Supabase Project

1. Go to https://supabase.com and create a project
2. Wait for project to initialize (~2 minutes)

### 2.2 Create Database Schema

1. Go to SQL Editor in Supabase Dashboard
2. Run the SQL from `server/supabase-schema.sql`
3. This creates the `users` table with proper indexes

### 2.3 Get API Keys

1. Go to Project Settings → API
2. Copy:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **Service Role Key:** `eyJ...` (keep this secret!)

## Step 3: Configure Backend

### 3.1 Update Environment Variables

In Railway (or your backend hosting), add these variables:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Client URL (for Stripe redirects)
CLIENT_URL=https://headbands.filipmateja.cz
```

### 3.2 Test Webhook Locally (Optional)

For local testing, use Stripe CLI:

```bash
# Install Stripe CLI
# Then run:
stripe listen --forward-to localhost:3001/api/webhook
```

This gives you a webhook secret for local testing.

## Step 4: Test the Flow

### 4.1 Test Payment Flow

1. Go to your app → `/party-pass`
2. Enter email (optional)
3. Click "Purchase Party Pass"
4. You'll be redirected to Stripe Checkout
5. Use test card: `4242 4242 4242 4242`
6. Any future expiry date, any CVC
7. Complete payment
8. Should redirect to `/payment-success`
9. Party Pass should activate

### 4.2 Verify Webhook

1. Check Stripe Dashboard → Webhooks → Your endpoint
2. Should see successful webhook deliveries
3. Check Supabase → Table Editor → `users`
4. Should see user with `is_premium = true`

## Step 5: Production Checklist

### Before Going Live:

- [ ] Switch Stripe to "Live mode"
- [ ] Update `STRIPE_SECRET_KEY` to live key
- [ ] Update `STRIPE_WEBHOOK_SECRET` to live webhook secret
- [ ] Update `CLIENT_URL` to production URL
- [ ] Test payment flow with real card (small amount)
- [ ] Verify webhook receives events
- [ ] Verify database updates correctly
- [ ] Test premium status check
- [ ] Set up monitoring/alerts for failed payments

## Security Notes

### ⚠️ Important:

1. **Never expose secret keys** in frontend code
2. **Always verify webhook signatures** (already implemented)
3. **Never trust client-side payment status** - always verify on backend
4. **Use HTTPS** in production (Railway/Cloudflare provide this)
5. **Rotate keys** if compromised

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct in Stripe Dashboard
2. Verify endpoint is accessible (not behind firewall)
3. Check webhook secret matches
4. View webhook logs in Stripe Dashboard

### Payment Succeeds But User Not Activated

1. Check webhook logs in Stripe Dashboard
2. Check backend logs for errors
3. Verify Supabase connection
4. Check database permissions (RLS policies)

### "Stripe not configured" Error

- Check `STRIPE_SECRET_KEY` is set in environment variables
- Restart backend server after adding env vars

## API Endpoints

### `POST /api/create-checkout-session`
Creates Stripe Checkout session

**Request:**
```json
{
  "userEmail": "user@example.com"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_test_..."
}
```

### `GET /api/verify-payment?session_id=xxx`
Verifies payment completion

**Response:**
```json
{
  "paid": true,
  "email": "user@example.com",
  "expiresAt": "2025-01-19T..."
}
```

### `POST /api/check-premium-status`
Checks user's premium status

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "isPremium": true,
  "expiresAt": "2025-01-19T...",
  "daysRemaining": 365
}
```

### `POST /api/webhook`
Stripe webhook endpoint (called by Stripe)

## Cost Breakdown

**Stripe Fees:**
- 2.9% + $0.30 per successful payment
- For $4.99 payment: ~$0.44 fee
- You receive: ~$4.55

**No monthly fees** - only pay per transaction!

## Next Steps

1. Set up Stripe account
2. Set up Supabase project
3. Configure environment variables
4. Test payment flow
5. Deploy to production
6. Monitor webhook deliveries

