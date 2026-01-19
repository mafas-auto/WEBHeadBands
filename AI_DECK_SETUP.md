# AI Deck Creation Setup Guide

## Overview

The AI Deck Creation feature uses OpenAI's API to generate custom 25-card decks based on user prompts. Users simply describe a theme (e.g., "80s movies", "famous landmarks") and the AI creates a complete deck.

**🔒 SECURITY:** The API key is stored server-side only. The frontend calls a secure backend proxy.

## Architecture

```
Frontend (Browser) → Backend API → OpenAI API
                   (No API Key)    (API Key Here)
```

## Setup Instructions

### 1. Get an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (it starts with `sk-`)

### 2. Set Up Backend Server

**Install dependencies:**
```bash
cd server
npm install
```

**Create `.env` file:**
```bash
cp .env.example .env
```

**Edit `.env` and add:**
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
ALLOWED_ORIGIN=http://localhost:5173
```

**Start the server:**
```bash
npm start
# or for development:
npm run dev
```

### 3. Configure Frontend

**For Local Development:**

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001
```

**For Production:**

Set `VITE_API_BASE_URL` to your deployed backend URL (e.g., `https://api.yourdomain.com`)

**Important:** The `.env` files are already in `.gitignore` and won't be committed to Git.

### 3. Restart Development Server

After adding the `.env` file, restart your dev server:

```bash
npm run dev
```

## Usage

1. Click the **"🤖 AI Create Deck"** button on the home screen
2. Enter a theme or description (e.g., "Disney characters", "sports actions")
3. Click **"Generate Deck"**
4. Review the generated deck
5. Click **"Save Deck"** to add it to your custom decks

## Security Features

✅ **Secure Implementation:**
- API key stored **only** on backend server
- Frontend never sees or sends API key
- Rate limiting: 100 requests per 15 minutes per IP
- Input validation with Zod schemas
- CORS protection
- Error sanitization (no sensitive info leaked)

See `SECURITY.md` for detailed security documentation.

## Cost Considerations

- Using `gpt-4o-mini` (current): ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- Each deck generation uses ~500-1000 tokens
- Estimated cost: **~$0.001-0.002 per deck**

For production, consider:
- Rate limiting per user
- Daily/monthly limits
- Payment verification before allowing AI generation
- Caching popular themes

## Future: Monetization

The plan is to monetize AI deck creation:
- Keep 5 default decks free
- Charge $5 for "Party Pass" to create unlimited custom decks
- Implement payment verification before allowing AI generation

## Troubleshooting

**Error: "Unable to connect to server"**
- Make sure backend server is running (`npm start` in `server/` directory)
- Check that `VITE_API_BASE_URL` in frontend `.env` matches backend URL
- Verify backend is accessible (try `curl http://localhost:3001/health`)

**Error: "Too many requests"**
- Rate limit exceeded (100 requests per 15 minutes per IP)
- Wait 15 minutes or use a different IP

**Error: "Invalid input"**
- Prompt must be 3-200 characters
- Only alphanumeric + safe punctuation allowed
- Check error details for specific validation failure

**Error: "API error: 401" (from backend logs)**
- Invalid API key in backend `.env` file
- Check that key starts with `sk-`
- Restart backend server after updating `.env`

**Error: "API error: 429" (from backend logs)**
- OpenAI rate limit exceeded
- Check your OpenAI account usage limits
- Consider upgrading OpenAI plan

**Error: "Failed to parse AI response"**
- AI returned invalid JSON - try again
- Check backend logs for details

