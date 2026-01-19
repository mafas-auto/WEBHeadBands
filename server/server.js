import express from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import { z } from 'zod'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia'
})

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true
}))

// Stripe webhook needs raw body for signature verification
app.use('/api/webhook', express.raw({ type: 'application/json' }))
app.use(express.json())

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/api/generate-deck', limiter)

// Input validation schema for AI deck generation
const deckPromptSchema = z.object({
  prompt: z.string()
    .min(3, 'Prompt must be at least 3 characters')
    .max(200, 'Prompt must be less than 200 characters')
    .regex(/^[a-zA-Z0-9\s\-_.,!?']+$/, 'Prompt contains invalid characters')
    .refine(
      (val) => {
        // Block common injection patterns
        const blocked = ['<script', 'javascript:', 'onerror=', 'onload=', 'eval(', 'function(']
        return !blocked.some(pattern => val.toLowerCase().includes(pattern))
      },
      { message: 'Prompt contains potentially dangerous content' }
    ),
  userEmail: z.string().email().optional() // Optional email for premium status check
})

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY not found in environment variables!')
  process.exit(1)
}

const SYSTEM_PROMPT = `You are a card deck generator for a charades-style game called "Forehead Charades". 
Your task is to create a deck of exactly 25 cards based on a user's theme or description.

Requirements:
- Generate exactly 25 cards
- Each card should be a single word or short phrase (2-3 words max)
- Cards should be appropriate for charades/acting out
- Cards should be diverse and interesting
- Return ONLY a valid JSON object with this exact structure:
{
  "title": "Deck Title",
  "icon": "🎯",
  "cards": ["Card 1", "Card 2", ... "Card 25"]
}

Choose an appropriate emoji icon for the theme. Common icons: 🎯 🎨 🎭 🎪 🎬 🎮 🎲 🎸 🎺 🎤 🎧 🏀 ⚽ 🎾 🏈 ⚾ 🏐 🏉 🎱 🎯 🎲 🎰 🎴 🃏 🎮 🎯

IMPORTANT: Return ONLY the JSON object, no other text, no markdown formatting, no code blocks.`

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Admin email for backdoor access (change this to your email)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'filipmateja@example.com' // TODO: Change to your actual email

// AI Deck Generation endpoint
app.post('/api/generate-deck', async (req, res) => {
  try {
    // Validate input
    const validationResult = deckPromptSchema.safeParse(req.body)
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid input',
        details: validationResult.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      })
    }

    const { prompt, userEmail } = validationResult.data

    // Admin bypass check (for testing)
    if (userEmail === ADMIN_EMAIL) {
      console.log('🔓 Admin bypass - unlimited access for:', userEmail)
      // Skip premium check and rate limiting for admin
      // Continue to AI generation
    } else {
      // Check premium status if email provided
      if (userEmail && supabase) {
        const { data: user } = await supabase
          .from('users')
          .select('is_premium, premium_expires_at')
          .eq('email', userEmail)
          .single()

        if (user && user.is_premium) {
          const expiresAt = user.premium_expires_at ? new Date(user.premium_expires_at) : null
          const isExpired = expiresAt && expiresAt < new Date()

          if (isExpired) {
            // Expired - treat as free user
            // Continue with rate limiting below
          } else {
            // Premium user - skip rate limiting, allow unlimited
            // Continue to AI generation
          }
        } else {
          // Not premium - apply rate limiting (already applied via middleware)
          // Continue to AI generation
        }
      }
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Create a deck of 25 cards for this theme: ${prompt.trim()}`
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      console.error('OpenAI API Error:', errorData)
      
      // Don't expose internal API errors to client
      return res.status(500).json({
        error: 'Failed to generate deck. Please try again later.'
      })
    }

    const data = await openaiResponse.json()
    const content = data.choices[0]?.message?.content?.trim()

    if (!content) {
      return res.status(500).json({
        error: 'No response from AI. Please try again.'
      })
    }

    // Parse JSON response (handle potential markdown code blocks)
    let jsonString = content
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/```\n?/g, '')
    }

    let deck
    try {
      deck = JSON.parse(jsonString)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      return res.status(500).json({
        error: 'Failed to parse AI response. Please try again.'
      })
    }

    // Validate deck structure
    const deckSchema = z.object({
      title: z.string().min(1).max(100),
      icon: z.string().max(10),
      cards: z.array(z.string().min(1).max(50)).length(25)
    })

    const deckValidation = deckSchema.safeParse(deck)
    if (!deckValidation.success) {
      console.error('Deck Validation Error:', deckValidation.error)
      return res.status(500).json({
        error: 'Invalid deck format received. Please try again.'
      })
    }

    // Ensure exactly 25 cards
    if (deck.cards.length !== 25) {
      if (deck.cards.length < 25) {
        return res.status(500).json({
          error: `AI only generated ${deck.cards.length} cards, need exactly 25. Please try again.`
        })
      } else {
        deck.cards = deck.cards.slice(0, 25)
      }
    }

    // Add default icon if missing
    if (!deck.icon) {
      deck.icon = '🎯'
    }

    // Generate unique ID (server-side for security)
    deck.id = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    res.json({ deck })
  } catch (error) {
    console.error('Server Error:', error)
    res.status(500).json({
      error: 'Internal server error. Please try again later.'
    })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Secure API server running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔒 Rate limit: 100 requests per 15 minutes per IP`)
  console.log(`🌐 Listening on 0.0.0.0:${PORT}`)
})

