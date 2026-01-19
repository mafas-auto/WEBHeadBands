import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateAIDeck } from '../services/aiDeckGenerator'
import { saveCustomDeck } from '../data/decks'

export default function AIDeckScreen() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedDeck, setGeneratedDeck] = useState(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a theme or description')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedDeck(null)

    try {
      // API key is now handled server-side - no need to pass it from client
      const deck = await generateAIDeck(prompt)
      setGeneratedDeck(deck)
    } catch (err) {
      setError(err.message || 'Failed to generate deck. Please try again.')
      console.error('AI Deck Generation Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!generatedDeck) return

    saveCustomDeck(generatedDeck)
    alert('Deck saved successfully!')
    navigate('/')
  }

  const handleTryAgain = () => {
    setGeneratedDeck(null)
    setError(null)
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 overflow-y-auto">
      <header className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-400 hover:text-blue-300 mb-4 text-sm sm:text-base"
        >
          ← Back to Home
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">AI Deck Creator</h1>
        <p className="text-sm sm:text-base text-gray-400">
          Describe a theme and AI will create a 25-card deck for you
        </p>
      </header>

      {!generatedDeck ? (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4">
            <label className="block text-sm sm:text-base font-semibold mb-2">
              Theme or Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., '80s movies', 'famous landmarks', 'superheroes', 'cooking terms'..."
              className="w-full bg-gray-700 text-white rounded-lg p-3 sm:p-4 text-sm sm:text-base min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Be specific! Examples: "Disney characters", "sports actions", "famous quotes"
            </p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-3 sm:p-4 mb-4">
              <p className="text-red-200 text-sm sm:text-base">{error}</p>
            </div>
          )}

          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px] disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Generating...
                </span>
              ) : (
                'Generate Deck'
              )}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 sm:px-6 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-3 sm:py-4 rounded-lg text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px]"
            >
              Cancel
            </button>
          </div>

          {loading && (
            <div className="mt-6 bg-gray-800 rounded-lg p-4 sm:p-6 text-center">
              <div className="animate-spin text-4xl mb-4">🤖</div>
              <p className="text-gray-300 text-sm sm:text-base">
                AI is creating your custom deck...
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl sm:text-5xl">{generatedDeck.icon}</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{generatedDeck.title}</h2>
                <p className="text-sm sm:text-base text-gray-400">{generatedDeck.cards.length} cards</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 sm:p-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {generatedDeck.cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-center"
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px]"
            >
              Save Deck
            </button>
            <button
              onClick={handleTryAgain}
              className="px-4 sm:px-6 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-3 sm:py-4 rounded-lg text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px]"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 sm:px-6 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-3 sm:py-4 rounded-lg text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

