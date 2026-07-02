# Essential Technical Documentation

## Quick Reference

### Architecture
- **Frontend**: React + Vite → Cloudflare Pages
- **Backend**: Express.js → Railway
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Checkout
- **AI**: OpenAI (gpt-4o-mini)

### Key Files
- `src/App.jsx` - Main app router
- `src/components/GameEngine.jsx` - Core game logic
- `src/hooks/useTiltDetection.js` - Tilt detection
- `server/server.js` - Backend API
- `vite.config.js` - Build configuration

### Environment Variables

**Frontend (.env.local)**
```env
VITE_API_BASE_URL=https://your-backend.railway.app
```

**Backend (Railway)**
```env
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk-...
STRIPE_WEBHOOK_SECRET=whsec-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ALLOWED_ORIGIN=https://your-frontend.com
CLIENT_URL=https://your-frontend.com
PORT=8080
```

## Deployment Checklist

### Frontend (Cloudflare Pages)
1. Push code to GitHub
2. Connect repo in Cloudflare Dashboard
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add env var: `VITE_API_BASE_URL`

### Backend (Railway)
1. Deploy from GitHub
2. Set root directory: `server`
3. Add all environment variables
4. Get public URL
5. Update frontend `VITE_API_BASE_URL`

### Database (Supabase)
1. Create project
2. Run `server/supabase-schema.sql`
3. Get API keys
4. Add to Railway env vars

### Payments (Stripe)
1. Create account
2. Get API keys
3. Set up webhook endpoint
4. Add keys to Railway
5. Test with test cards

## API Endpoints

### Public
- `GET /health` - Health check
- `POST /api/create-checkout-session` - Create Stripe session
- `GET /api/verify-payment` - Verify payment
- `POST /api/check-premium-status` - Check premium status

### Protected (Rate Limited)
- `POST /api/generate-deck` - Generate AI deck (100 req/15min)

### Webhook
- `POST /api/webhook` - Stripe webhook handler

## Common Issues

### Tilt Detection Not Working
- Requires HTTPS (or localhost)
- iOS needs permission prompt
- Check browser console for errors

### Backend Connection Failed
- Verify `VITE_API_BASE_URL` is set
- Check CORS settings
- Verify backend is running

### Payment Not Working
- Check Stripe keys are set
- Verify webhook endpoint configured
- Check Supabase connection

See full docs:
- `RAILWAY_DEPLOYMENT.md` - Backend deployment
- `DEPLOYMENT_GUIDE.md` - Full deployment guide
- `STRIPE_SETUP_GUIDE.md` - Payment setup
- `TILT_DETECTION_EXPLAINED.md` - Tilt detection details


