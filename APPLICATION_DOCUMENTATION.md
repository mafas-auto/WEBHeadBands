# Forehead Charades - Complete Application Documentation

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [Development Guide](#development-guide)
8. [Game Mechanics](#game-mechanics)
9. [Tilt Detection System](#tilt-detection-system)
10. [AI Deck Generation](#ai-deck-generation)
11. [Security](#security)
12. [Deployment](#deployment)
13. [API Documentation](#api-documentation)
14. [Troubleshooting](#troubleshooting)
15. [Future Roadmap](#future-roadmap)

---

## Overview

**Forehead Charades** is a modern web-based party game inspired by "Heads Up!". Players place their phone on their forehead in landscape mode and tilt their head to guess words from a deck. The game uses device motion sensors to detect head tilts, making it an immersive, hands-free experience.

### Key Highlights

- 🎮 **5 Pre-built Decks**: Animals, Movies, Food, Actions, Objects
- ✏️ **Custom Deck Creation**: Manual editor and AI-powered generation
- 📱 **Tilt Detection**: Hybrid Gamma/Beta approach for accurate motion sensing
- ⏱️ **60-Second Rounds**: Fast-paced gameplay with timer
- 🎯 **Accessibility**: Manual controls for users who prefer buttons
- 📱 **PWA Support**: Installable, works offline
- 🔒 **Secure Backend**: Rate-limited, validated API proxy
- 🎨 **Modern UI**: Responsive design optimized for mobile

### Live Demo

- **Production URL**: https://headbands.filipmateja.cz
- **Status**: Active and deployed on Cloudflare Pages

---

## Features

### Core Gameplay

1. **Deck Selection**
   - Browse 5 pre-built decks
   - View custom decks created by user
   - See card count for each deck

2. **Gameplay**
   - 60-second timer
   - Tilt forward (down) = CORRECT
   - Tilt backward (up) = PASS
   - Manual buttons as alternative
   - Visual and audio feedback
   - Pause/resume functionality

3. **Results**
   - Score display (correct vs passed)
   - List of guessed cards
   - Option to play again or return home

### Deck Management

1. **Manual Deck Editor**
   - Create custom decks
   - Add/remove cards
   - Choose emoji icon
   - Save to localStorage

2. **AI Deck Generator** 🤖
   - Describe a theme (e.g., "80s movies")
   - AI generates 25-card deck
   - Preview before saving
   - Secure backend API

### Technical Features

1. **Tilt Detection**
   - Hybrid Gamma/Beta approach
   - Handles gimbal lock
   - Calibration on game start
   - Cooldown system (1 second)
   - Debug mode with `?debug=true`

2. **Progressive Web App (PWA)**
   - Installable on mobile devices
   - Offline support
   - Service worker caching
   - App manifest

3. **Mobile Optimization**
   - Responsive design
   - Touch-friendly controls (44px minimum)
   - Orientation locking
   - Fullscreen mode
   - Prevents pull-to-refresh

4. **iOS Compatibility**
   - Permission prompts for motion sensors
   - Tutorial for first-time users
   - Handles permission loss on orientation change
   - Re-prompt mechanism

---

## Architecture

### System Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React/Vite)  │
│                 │
│  - Home Screen  │
│  - Game Screen  │
│  - AI Creator   │
│  - Editor       │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│  Backend API    │
│  (Express.js)   │
│                 │
│  - Rate Limit   │
│  - Validation   │
│  - Proxy        │
└────────┬────────┘
         │
         │ OpenAI API
         │
┌────────▼────────┐
│   OpenAI API    │
│  (GPT-4o-mini)  │
└─────────────────┘
```

### Frontend Architecture

```
src/
├── components/          # Reusable UI components
│   ├── CardDisplay.jsx
│   ├── Controls.jsx
│   ├── DeckCard.jsx
│   ├── DeckList.jsx
│   ├── FeedbackOverlay.jsx
│   ├── GameEngine.jsx
│   ├── Layout.jsx
│   ├── OrientationLocker.jsx
│   ├── PermissionTutorial.jsx
│   ├── TiltDebug.jsx
│   └── Timer.jsx
├── screens/             # Page-level components
│   ├── HomeScreen.jsx
│   ├── GameScreen.jsx
│   ├── ResultsScreen.jsx
│   ├── EditorScreen.jsx
│   └── AIDeckScreen.jsx
├── context/             # React Context for state
│   └── GameContext.jsx
├── hooks/               # Custom React hooks
│   └── useTiltDetection.js
├── services/            # API services
│   └── aiDeckGenerator.js
├── data/                # Static data
│   └── decks.js
└── App.jsx              # Root component
```

### State Management

- **React Context API**: Global game state
- **useReducer**: Complex state logic
- **localStorage**: Persist custom decks

### Data Flow

1. **Game State**: `GameContext` → `useReducer` → Components
2. **Deck Storage**: `localStorage` → `decks.js` utilities
3. **Tilt Detection**: `DeviceOrientationEvent` → `useTiltDetection` → Game actions
4. **AI Generation**: User input → Backend API → OpenAI → Deck object

---

## Technology Stack

### Frontend

- **React 18.2.0**: UI framework
- **Vite 5.0.8**: Build tool and dev server
- **React Router 6.20.0**: Client-side routing
- **Tailwind CSS 3.3.6**: Utility-first CSS
- **Vite PWA Plugin 0.17.4**: Progressive Web App support

### Backend

- **Node.js**: Runtime
- **Express 4.18.2**: Web framework
- **express-rate-limit 7.1.5**: Rate limiting
- **Zod 3.22.4**: Schema validation
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 16.3.1**: Environment variable management

### APIs & Services

- **Device Orientation API**: Motion sensors
- **Screen Orientation API**: Lock orientation
- **Fullscreen API**: Immersive experience
- **OpenAI API**: AI deck generation
- **Web Audio API**: Sound effects

### Development Tools

- **TypeScript Types**: `@types/react`, `@types/react-dom`
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

---

## Project Structure

```
Webheadbands/
├── public/                  # Static assets
│   ├── _headers            # Cloudflare headers
│   ├── _redirects          # SPA routing
│   ├── pwa-192x192.png     # PWA icons
│   ├── pwa-512x512.png
│   └── vite.svg
├── server/                  # Backend API
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment template
│   ├── .gitignore
│   └── README.md
├── src/                     # Frontend source
│   ├── components/         # React components
│   ├── screens/            # Page components
│   ├── context/            # State management
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── data/               # Static data
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css            # Global styles
├── dist/                    # Build output (gitignored)
├── node_modules/            # Dependencies (gitignored)
├── .env                     # Environment variables (gitignored)
├── .gitignore
├── index.html               # HTML template
├── package.json            # Frontend dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── README.md                # Quick start guide
├── APPLICATION_DOCUMENTATION.md  # This file
├── SECURITY.md              # Security documentation
├── AI_DECK_SETUP.md         # AI setup guide
├── TILT_DETECTION_EXPLAINED.md   # Tilt system docs
└── AI_DECK_SETUP.md         # AI feature guide
```

---

## Installation & Setup

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm**: Comes with Node.js
- **Git**: For version control
- **OpenAI API Key**: For AI deck generation (optional)

### Frontend Setup

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd Webheadbands
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file in project root
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   - Local: http://localhost:5173
   - Network: http://<your-ip>:5173

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   # Edit .env and add:
   OPENAI_API_KEY=sk-your-actual-key-here
   PORT=3001
   ALLOWED_ORIGIN=http://localhost:5173
   ```

4. **Start server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Verify server:**
   ```bash
   curl http://localhost:3001/health
   # Should return: {"status":"ok","timestamp":"..."}
   ```

### Production Build

```bash
# Frontend
npm run build
# Output: dist/

# Backend
# Deploy server/ directory to hosting service
```

---

## Development Guide

### Running Locally

1. **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

3. **Access:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Development Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style

- **Components**: PascalCase (e.g., `GameEngine.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTiltDetection.js`)
- **Utilities**: camelCase (e.g., `decks.js`)
- **CSS**: Tailwind utility classes
- **Formatting**: No specific formatter (use editor defaults)

### Key Development Files

- **`vite.config.js`**: Build configuration, PWA settings
- **`tailwind.config.js`**: Tailwind customization
- **`src/context/GameContext.jsx`**: Game state management
- **`src/hooks/useTiltDetection.js`**: Tilt detection logic
- **`server/server.js`**: Backend API implementation

---

## Game Mechanics

### Game Flow

1. **Home Screen**
   - User selects a deck
   - Deck is loaded into game state

2. **Countdown**
   - 3-second countdown overlay
   - Calibrates tilt detection
   - Requests permissions (iOS)

3. **Gameplay**
   - 60-second timer starts
   - Cards displayed one at a time
   - Tilt or button press to guess
   - Visual/audio feedback
   - Can pause/resume

4. **Results**
   - Timer reaches 0 or all cards guessed
   - Score displayed
   - Option to play again

### Scoring

- **Correct**: Card guessed correctly (counted in score)
- **Pass**: Card skipped (not counted, but tracked)
- **Final Score**: Number of correct guesses

### Timer

- Starts at 60 seconds
- Decrements every second
- Game ends when timer reaches 0
- Visual countdown display

### Controls

1. **Tilt Controls** (Primary)
   - Forward tilt (chin down) = CORRECT
   - Backward tilt (chin up) = PASS
   - Requires motion sensor permission

2. **Manual Controls** (Accessibility)
   - "CORRECT" button
   - "PASS" button
   - "PAUSE" button (when playing)
   - "RESUME" button (when paused)

---

## Tilt Detection System

### Overview

The tilt detection system uses a **hybrid Gamma/Beta approach** to handle gimbal lock, a mathematical limitation when the phone is vertical on the forehead.

### The Problem: Gimbal Lock

When the phone is perfectly vertical in landscape mode:
- **Gamma (γ)** is clamped at **-90°** and cannot go lower
- When tilting down past vertical, **Beta (β)** flips to **~180°** instead
- This requires using both angles for accurate detection

### How It Works

**Neutral Position (Forehead):**
- γ ≈ -90° (clamped minimum)
- β ≈ 0° (vertical)

**PASS (Look Up):**
- γ moves from -90° towards 0° (screen faces ceiling)
- Threshold: `γ > -50°`

**CORRECT (Look Down):**
- γ stays at -90° (cannot go lower)
- β flips to ~180° (screen faces floor)
- Threshold: `|β| > 140°`

### Implementation

**File**: `src/hooks/useTiltDetection.js`

```javascript
// PASS: Gamma moves from -90 towards 0
if (gamma > -50 && gamma < 0) {
  onPass()
}

// CORRECT: Beta flips to ~180
if (Math.abs(beta) > 140) {
  onCorrect()
}
```

### Calibration

- First reading becomes "neutral" position
- Accounts for different head angles
- Stored in `neutralBeta` and `neutralGamma` refs

### Cooldown

- 1-second cooldown between triggers
- Prevents rapid-fire from sensor noise
- Uses `lastTiltTime` ref

### Debug Mode

Add `?debug=true` to URL to see:
- Current Beta and Gamma values
- Neutral positions
- Tilt differences
- Status (CORRECT/PASS/Neutral)

### Documentation

See `TILT_DETECTION_EXPLAINED.md` for detailed technical documentation.

---

## AI Deck Generation

### Overview

AI-powered deck creation allows users to generate custom 25-card decks by describing a theme. The system uses OpenAI's GPT-4o-mini model through a secure backend proxy.

### Architecture

```
User Input → Frontend → Backend API → OpenAI API → Deck Object
```

### User Flow

1. Click "🤖 AI Create Deck" on home screen
2. Enter theme description (e.g., "80s movies")
3. Click "Generate Deck"
4. Review generated deck
5. Save to custom decks

### Backend Security

- **API Key**: Stored server-side only
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Zod schema validation
- **Error Sanitization**: No sensitive info leaked

### System Prompt

The AI is instructed to:
- Generate exactly 25 cards
- Use single words or short phrases (2-3 words max)
- Make cards appropriate for charades
- Return valid JSON only

### Cost

- Model: `gpt-4o-mini`
- Tokens per generation: ~500-1000
- Estimated cost: **~$0.001-0.002 per deck**

### Setup

See `AI_DECK_SETUP.md` for detailed setup instructions.

### API Endpoint

**POST** `/api/generate-deck`

**Request:**
```json
{
  "prompt": "80s movies"
}
```

**Response:**
```json
{
  "deck": {
    "id": "ai_1234567890_abc123",
    "title": "80s Movies",
    "icon": "🎬",
    "cards": ["The Matrix", "Titanic", ...]
  }
}
```

---

## Security

### Security Measures

1. **API Key Protection**
   - ✅ Never exposed to client
   - ✅ Stored in server `.env` file
   - ✅ Backend proxy handles all API calls

2. **Rate Limiting**
   - ✅ 100 requests per 15 minutes per IP
   - ✅ Prevents DoS attacks
   - ✅ Protects against cost overruns

3. **Input Validation**
   - ✅ Zod schema validation
   - ✅ Length limits (3-200 characters)
   - ✅ Character whitelist
   - ✅ Blocks dangerous patterns

4. **CORS Protection**
   - ✅ Configured for specific origin
   - ✅ Prevents unauthorized access

5. **Error Handling**
   - ✅ Generic error messages to clients
   - ✅ Detailed errors logged server-side only
   - ✅ No sensitive info leaked

### Security Checklist

- [x] API key never in client code
- [x] Rate limiting implemented
- [x] Input validation with Zod
- [x] CORS configured
- [x] Error messages don't leak info
- [x] `.env` in `.gitignore`
- [x] HTTPS in production
- [x] Server-side validation
- [x] Logging for security events

### Documentation

See `SECURITY.md` for comprehensive security documentation.

---

## Deployment

### Frontend Deployment (Cloudflare Pages)

**✅ No Docker needed** - Cloudflare Pages hosts static files only.

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Deploy options:**
   - **Git Integration** (Recommended)
     - Connect GitHub repo
     - Auto-deploy on push
   - **Direct Upload**
     - Upload `dist/` folder
   - **Wrangler CLI**
     - `wrangler pages deploy dist`

3. **Environment Variables:**
   - Set `VITE_API_BASE_URL` in Cloudflare Dashboard

### Backend Deployment

**Important:** Cloudflare Pages only hosts static files. Your Express backend needs to be deployed separately.

**Option 1: Cloudflare Workers (Recommended - All in Cloudflare, No Docker)**

Convert your Express server to a Cloudflare Worker. This keeps everything in Cloudflare:
- ✅ No Docker needed
- ✅ Serverless (pay per request)
- ✅ Global edge network
- ✅ Free tier available

**Option 2: Railway/Render/Fly.io (Express Server, No Docker Required)**

These services run Node.js directly - Docker is optional:

1. **Railway** (Easiest)
   - Connect GitHub repo
   - Set environment variables
   - Auto-deploys (no Dockerfile needed)
   - Free tier available

2. **Render**
   - Create Web Service
   - Connect repo
   - Set environment variables
   - Runs Node.js directly

3. **Fly.io**
   ```bash
   fly launch
   fly secrets set OPENAI_API_KEY=sk-...
   fly deploy
   ```
   - Can use Docker, but not required for Node.js

**Option 3: Self-Hosted VPS**
   - Install Node.js directly
   - Clone repo
   - Set up `.env`
   - Use PM2 or systemd
   - No Docker needed unless you want containerization

### Docker (Optional)

Docker is **optional** for all deployment options. You only need it if:
- You want containerization
- Your hosting service requires it
- You prefer containerized deployments

**Most services (Railway, Render, Fly.io) can run Node.js directly without Docker.**

### Environment Variables

**Frontend:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

**Backend:**
```env
OPENAI_API_KEY=sk-...
PORT=3001
ALLOWED_ORIGIN=https://yourdomain.com
NODE_ENV=production
```

---

## API Documentation

### Backend API

#### Health Check

**GET** `/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-19T12:00:00.000Z"
}
```

#### Generate Deck

**POST** `/api/generate-deck`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "80s movies"
}
```

**Response (Success):**
```json
{
  "deck": {
    "id": "ai_1234567890_abc123",
    "title": "80s Movies",
    "icon": "🎬",
    "cards": ["The Matrix", "Titanic", ...]
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid input",
  "details": [
    {
      "field": "prompt",
      "message": "Prompt must be at least 3 characters"
    }
  ]
}
```

**Rate Limit:**
- 100 requests per 15 minutes per IP
- Returns `429 Too Many Requests` when exceeded

**Validation:**
- Prompt: 3-200 characters
- Alphanumeric + safe punctuation only
- Dangerous patterns blocked

---

## Troubleshooting

### Frontend Issues

**"Unable to connect to server"**
- Check backend is running
- Verify `VITE_API_BASE_URL` in `.env`
- Check CORS configuration

**Tilt detection not working**
- Check HTTPS (required for Device Orientation API)
- Verify permissions granted (iOS)
- Try debug mode: `?debug=true`
- Check browser console for errors

**PWA not installing**
- Check `manifest.webmanifest` exists
- Verify service worker registered
- Check HTTPS (required for PWA)

### Backend Issues

**"OpenAI API key not found"**
- Check `.env` file exists in `server/` directory
- Verify `OPENAI_API_KEY` is set
- Restart server after updating `.env`

**"Too many requests"**
- Rate limit exceeded
- Wait 15 minutes or use different IP
- Check rate limit configuration

**"Invalid input"**
- Check prompt length (3-200 characters)
- Verify no dangerous characters
- Check error details for specific issue

### iOS Issues

**Permission prompt not appearing**
- Must be triggered by user interaction
- Check tutorial button click
- Verify HTTPS connection

**Permission lost on orientation change**
- Known iOS behavior
- App automatically re-prompts
- Check tutorial appears again

### Build Issues

**Build fails**
- Check Node.js version (18+)
- Clear `node_modules` and reinstall
- Check for syntax errors
- Review build logs

---

## Future Roadmap

### Planned Features

1. **Monetization**
   - Keep 5 default decks free
   - $5 "Party Pass" for unlimited AI deck creation
   - Payment integration (Stripe/PayPal)
   - User accounts and subscription management

2. **Social Features**
   - Share decks with friends
   - Public deck marketplace
   - Deck ratings and reviews
   - User profiles

3. **Game Enhancements**
   - Multiple difficulty levels
   - Custom timer duration
   - Team mode (pass phone around)
   - Statistics and leaderboards

4. **AI Improvements**
   - Deck regeneration (try again with same prompt)
   - Edit AI-generated decks
   - Bulk deck generation
   - Theme suggestions

5. **Technical Improvements**
   - Backend caching for popular themes
   - Analytics integration
   - A/B testing framework
   - Performance optimizations

### Known Limitations

- Tilt detection requires motion sensors (not available on all devices)
- iOS requires user interaction for permissions
- Service worker caching may need manual refresh
- Rate limiting is per-IP (not per-user)

---

## Contributing

### Development Workflow

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

### Code Standards

- Follow existing code style
- Add comments for complex logic
- Update documentation
- Test on multiple devices
- Check security implications

---

## License

MIT License - See LICENSE file for details

---

## Support

For issues, questions, or contributions:
- GitHub Issues: [Repository URL]
- Email: [Contact Email]

---

## Acknowledgments

- Inspired by "Heads Up!" by Ellen DeGeneres
- Built with React, Vite, and Tailwind CSS
- AI powered by OpenAI
- Hosted on Cloudflare Pages

---

**Last Updated**: January 2024
**Version**: 1.0.0

