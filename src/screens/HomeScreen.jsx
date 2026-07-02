import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { defaultDecks, loadCustomDecks } from '../data/decks'
import DeckList from '../components/DeckList'

export default function HomeScreen() {
  const navigate = useNavigate()
  const { dispatch } = useGame()
  const [showCustom, setShowCustom] = useState(false)
  const customDecks = loadCustomDecks()

  const decksToShow = showCustom ? customDecks : defaultDecks

  const handleSelectDeck = (deck) => {
    dispatch({ type: 'SET_DECK', payload: deck })
    navigate('/game')
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <header className="p-4 sm:p-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Forehead Charades</h1>
        <p className="text-sm sm:text-base text-gray-400 mb-4">Place phone on forehead and tilt to play!</p>

        <div className="flex items-center justify-center gap-3 mb-4">
          <span className={`text-sm sm:text-base font-medium ${!showCustom ? 'text-white' : 'text-gray-500'}`}>
            Free Decks
          </span>
          <button
            onClick={() => setShowCustom(!showCustom)}
            className={`relative inline-flex h-8 w-16 sm:h-9 sm:w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              showCustom ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'
            }`}
            role="switch"
            aria-checked={showCustom}
            aria-label="Toggle custom decks"
          >
            <span
              className={`inline-block h-6 w-6 sm:h-7 sm:w-7 transform rounded-full bg-white transition-transform ${
                showCustom ? 'translate-x-9 sm:translate-x-11' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm sm:text-base font-medium ${showCustom ? 'text-white' : 'text-gray-500'}`}>
            My Decks
          </span>
        </div>
      </header>

      <div className="flex-1 p-2 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-2 sm:px-4">
          {showCustom ? 'My Decks' : 'Choose a Deck'}
        </h2>

        {showCustom && customDecks.length === 0 ? (
          <div className="text-center py-8 px-4">
            <div className="text-6xl mb-4">🃏</div>
            <p className="text-gray-400 mb-6">No custom decks yet. Add your own cards or generate one with AI.</p>
          </div>
        ) : (
          <DeckList decks={decksToShow} onSelectDeck={handleSelectDeck} />
        )}

        {showCustom && (
          <div className="p-2 sm:p-4 space-y-2 max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/editor')}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-all touch-manipulation min-h-[44px]"
            >
              + Create Custom Deck
            </button>
            <button
              onClick={() => navigate('/ai-deck')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-all touch-manipulation min-h-[44px] flex items-center justify-center gap-2"
            >
              <span>🤖</span>
              <span>Generate with AI</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
