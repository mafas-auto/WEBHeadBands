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

## Deployment to Cloudflare Pages

1. Build the project: `npm run build`
2. Upload the `dist` folder to Cloudflare Pages
3. Ensure HTTPS is enabled (required for Device Orientation API)

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
