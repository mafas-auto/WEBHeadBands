/**
 * AI Deck Generator Service
 * Calls secure backend API proxy (API key is never exposed to client)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export async function generateAIDeck(userPrompt) {
  if (!userPrompt || userPrompt.trim().length === 0) {
    throw new Error('Please provide a theme or description for your deck')
  }

  // Basic client-side validation (server does full validation)
  if (userPrompt.length < 3) {
    throw new Error('Prompt must be at least 3 characters')
  }

  if (userPrompt.length > 200) {
    throw new Error('Prompt must be less than 200 characters')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-deck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: userPrompt.trim() })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Request failed: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.deck) {
      throw new Error('Invalid response from server')
    }

    return data.deck
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your connection.')
    }
    throw error
  }
}

