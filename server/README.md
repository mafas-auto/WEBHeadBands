# Secure AI Deck Generation API

Backend proxy server for secure AI deck generation. Keeps OpenAI API keys server-side and implements rate limiting and input validation.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

Server runs on `http://localhost:3001` by default.

## Environment Variables

```env
OPENAI_API_KEY=sk-your-actual-api-key-here  # Required
PORT=3001                                    # Optional, defaults to 3001
ALLOWED_ORIGIN=http://localhost:5173        # Your frontend URL
NODE_ENV=production                          # Optional
```

## API Endpoints

### `POST /api/generate-deck`

Generate a 25-card deck based on a theme.

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

**Rate Limit:** 100 requests per 15 minutes per IP

**Validation:**
- Prompt: 3-200 characters
- Only alphanumeric + safe punctuation allowed
- Dangerous patterns blocked

## Security Features

- ✅ API key never exposed to client
- ✅ Rate limiting (100 req/15min per IP)
- ✅ Input validation with Zod
- ✅ CORS protection
- ✅ Error sanitization

## Deployment

### Option 1: Railway
1. Connect GitHub repo
2. Set environment variables
3. Deploy

### Option 2: Render
1. Create new Web Service
2. Connect repo
3. Set environment variables
4. Deploy

### Option 3: Fly.io
```bash
fly launch
fly secrets set OPENAI_API_KEY=sk-...
fly deploy
```

## Health Check

```bash
curl http://localhost:3001/health
```

Returns: `{"status":"ok","timestamp":"..."}`

