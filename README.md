# Forehead Charades

A web-based "Heads Up" style game where players place their phone on their forehead and tilt it to guess words. Built with React, Vite, and Tailwind CSS.

## Features

- 🎮 Multiple pre-built decks (Animals, Movies, Food, Actions, Objects)
- ✏️ Create and save custom decks
- 📱 Tilt detection using device orientation API
- ⏱️ 60-second timer with visual countdown
- 🎯 Manual controls for accessibility
- 📱 PWA support for offline play
- 🔄 Orientation lock detection
- 🎨 Smooth animations and feedback

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the local URL (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to Cloudflare Pages.

## Environment Variables

For local development, copy `.env.example` to `.env.local` and add your credentials.

For Cloudflare Pages deployment, set environment variables in:
**Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**

See `DEPLOYMENT.md` for detailed instructions.

**Important:** All client-side environment variables must be prefixed with `VITE_`

## Deployment to Cloudflare Pages

**📖 New to Vite?** See [VITE_DEPLOYMENT_GUIDE.md](./VITE_DEPLOYMENT_GUIDE.md) for a complete beginner-friendly guide.

### Option 1: Direct Upload (Quickest)

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project

3. Choose "Upload assets" 

4. Upload the entire `dist` folder contents

5. Your site will be live with HTTPS automatically enabled (required for Device Orientation API)

### Option 2: Git Integration (Recommended for updates)

1. Push your code to GitHub/GitLab/Bitbucket

2. In Cloudflare Dashboard → Pages → Create a project → Connect to Git

3. Select your repository

4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave empty)

5. Click "Save and Deploy"

6. Cloudflare will automatically deploy on every push to your main branch

### Option 3: Wrangler CLI

1. Install Wrangler (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build and deploy:
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=forehead-charades
   ```

**Note:** HTTPS is automatically enabled on Cloudflare Pages, which is required for the Device Orientation API to work on iOS devices.

## How to Play

1. Select a deck from the home screen
2. Place your phone on your forehead (landscape mode)
3. Tilt forward (down) for CORRECT
4. Tilt backward (up) for PASS
5. Or use the manual buttons at the bottom
6. Try to guess as many cards as possible in 60 seconds!

## Technical Details

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **PWA**: Vite PWA Plugin
- **Device API**: Device Orientation API (requires HTTPS)

## iOS 13+ Permission Handling

iOS 13+ requires user interaction to access motion sensors. The app will prompt for permission when starting a game.

## Browser Support

- Modern browsers with Device Orientation API support
- HTTPS required for motion sensors (works on localhost for development)
- Best experienced on mobile devices

## License

MIT
