# Forehead Charades

A web-based "Heads Up" style game where players place their phone on their forehead and tilt it to guess words. Built with React, Vite, and Tailwind CSS.

## 🎮 Features

- **5 Free Decks**: Pre-built decks (Animals, Movies, Food, Actions, Objects)
- **AI Deck Generation**: Create custom decks using AI (limited for free users)
- **Custom Decks**: Manually create and save your own decks
- **Tilt Detection**: Use device orientation API for hands-free gameplay
- **60-Second Timer**: Visual countdown with score tracking
- **Manual Controls**: Button controls for accessibility
- **PWA Support**: Install as app, works offline
- **Party Pass**: Premium feature for unlimited AI deck generation ($4.99/year)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Webheadbands
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
Webheadbands/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── screens/           # Screen components
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   └── hooks/             # Custom React hooks
├── server/                # Backend API server
│   ├── server.js          # Express server
│   └── supabase-schema.sql # Database schema
├── public/                # Static assets
└── dist/                  # Build output
```

## 🔧 Configuration

### Frontend Environment Variables

Create `.env.local` in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001
```

For production, set in Cloudflare Pages:
- **Settings → Environment Variables → Production**

### Backend Environment Variables

Create `server/.env`:

```env
# OpenAI API Key (required for AI deck generation)
OPENAI_API_KEY=sk-your-key-here

# Server Configuration
PORT=3001
ALLOWED_ORIGIN=http://localhost:5173
CLIENT_URL=http://localhost:5173

# Stripe (required for payments)
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Supabase (required for user management)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important:** Never commit `.env` files to Git!

## 🚢 Deployment

### Frontend (Cloudflare Pages)

1. Push code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
3. Create project → Connect to Git
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Add environment variable: `VITE_API_BASE_URL` (your backend URL)
6. Deploy!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Backend (Railway)

1. Go to [Railway](https://railway.app) → New Project
2. Deploy from GitHub → Select repository
3. Set Root Directory to `server`
4. Add environment variables (see above)
5. Deploy!

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.

## 🎯 How to Play

1. Select a deck from the home screen
2. Place your phone on your forehead (landscape mode)
3. Tilt forward (down) for **CORRECT** ✅
4. Tilt backward (up) for **PASS** ⏭️
5. Or use the manual buttons at the bottom
6. Try to guess as many cards as possible in 60 seconds!

## 💰 Monetization (Beta)

The app includes a **Party Pass** feature for unlimited AI deck generation:

- **Price:** $4.99 USD (one-time payment)
- **Duration:** 365 days (1 year)
- **Benefits:** Unlimited AI deck generations

Currently on `feature/monetization` branch. See [MONETIZATION_BETA.md](./MONETIZATION_BETA.md) and [STRIPE_SETUP_GUIDE.md](./STRIPE_SETUP_GUIDE.md) for details.

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - Vite
  - Tailwind CSS
  - React Router v6
  - Vite PWA Plugin

- **Backend:**
  - Express.js
  - OpenAI API (gpt-4o-mini)
  - Stripe (payments)
  - Supabase (database)

- **APIs:**
  - Device Orientation API (tilt detection)
  - Screen Orientation API (lock)
  - Fullscreen API

## 📱 Browser Support

- Modern browsers with Device Orientation API support
- **HTTPS required** for motion sensors (works on localhost for development)
- Best experienced on mobile devices
- iOS 13+ requires permission prompt for motion sensors

## 📚 Documentation

- [APPLICATION_DOCUMENTATION.md](./APPLICATION_DOCUMENTATION.md) - Complete application documentation
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Backend deployment guide
- [STRIPE_SETUP_GUIDE.md](./STRIPE_SETUP_GUIDE.md) - Payment setup guide
- [TILT_DETECTION_EXPLAINED.md](./TILT_DETECTION_EXPLAINED.md) - How tilt detection works
- [SECURITY.md](./SECURITY.md) - Security measures
- [AI_DECK_SETUP.md](./AI_DECK_SETUP.md) - AI deck generation setup
- [MONETIZATION_BETA.md](./MONETIZATION_BETA.md) - Monetization features (beta)

## 🔒 Security

- API keys stored server-side only
- Rate limiting on API endpoints
- Input validation with Zod
- Webhook signature verification
- CORS protection
- XSS protection

See [SECURITY.md](./SECURITY.md) for details.

## 🐛 Troubleshooting

### Tilt Detection Not Working

- Ensure HTTPS (required for Device Orientation API)
- On iOS, grant motion sensor permission
- Check browser console for errors
- See [TILT_DETECTION_EXPLAINED.md](./TILT_DETECTION_EXPLAINED.md)

### Backend Connection Issues

- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running and accessible
- Verify CORS settings in backend
- Check browser console for errors

### Payment Issues

- Verify Stripe keys are set correctly
- Check webhook endpoint is configured
- Verify Supabase connection
- See [STRIPE_SETUP_GUIDE.md](./STRIPE_SETUP_GUIDE.md)

## 📄 License

MIT

## 🙏 Credits

Built with React, Vite, Tailwind CSS, OpenAI, Stripe, and Supabase.
