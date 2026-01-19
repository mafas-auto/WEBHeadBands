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
      <header className="p-6 text-center">
        <h1 className="text-5xl font-bold mb-2">Forehead Charades</h1>
        <p className="text-gray-400">Place phone on forehead and tilt to play!</p>
      </header>
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4 px-4">Choose a Deck</h2>
        <DeckList decks={allDecks} onSelectDeck={handleSelectDeck} />
      </div>
      <div className="p-4">
        <button
          onClick={() => navigate('/editor')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
        >
          Create Custom Deck
        </button>
      </div>
    </div>
  )
}
