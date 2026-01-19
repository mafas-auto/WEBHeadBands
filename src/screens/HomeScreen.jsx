import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { defaultDecks, loadCustomDecks } from '../data/decks'
import DeckList from '../components/DeckList'

export default function HomeScreen() {
  const navigate = useNavigate()
  const { dispatch } = useGame()
  const customDecks = loadCustomDecks()
  const allDecks = [...defaultDecks, ...customDecks]

  const handleSelectDeck = (deck) => {
    dispatch({ type: 'SET_DECK', payload: deck })
    navigate('/game')
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
      <header className="p-4 sm:p-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Forehead Charades</h1>
        <p className="text-sm sm:text-base text-gray-400">Place phone on forehead and tilt to play!</p>
      </header>
      <div className="flex-1 p-2 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-2 sm:px-4">Choose a Deck</h2>
        <DeckList decks={allDecks} onSelectDeck={handleSelectDeck} />
      </div>
      <div className="p-2 sm:p-4">
        <button
          onClick={() => navigate('/editor')}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-transform touch-manipulation min-h-[44px]"
        >
          Create Custom Deck
        </button>
      </div>
    </div>
  )
}
