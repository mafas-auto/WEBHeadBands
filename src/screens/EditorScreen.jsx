import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveCustomDeck, loadCustomDecks, deleteCustomDeck } from '../data/decks'

const EMOJI_OPTIONS = ['🦁', '🎬', '🍕', '🏃', '📱', '🎮', '🎨', '🎵', '⚽', '🚗', '🏠', '👕', '🎭', '📚', '🌍']

export default function EditorScreen() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('🦁')
  const [cards, setCards] = useState([''])
  const customDecks = loadCustomDecks()

  const handleAddCard = () => {
    setCards([...cards, ''])
  }

  const handleCardChange = (index, value) => {
    const newCards = [...cards]
    newCards[index] = value
    setCards(newCards)
  }

  const handleRemoveCard = (index) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index))
    }
  }

  const handleSave = () => {
    const validCards = cards.filter(card => card.trim() !== '')
    if (!title.trim() || validCards.length === 0) {
      alert('Please enter a title and at least one card')
      return
    }

    const newDeck = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      icon: icon,
      cards: validCards.map(card => card.trim())
    }

    saveCustomDeck(newDeck)
    alert('Deck saved!')
    setTitle('')
    setIcon('🦁')
    setCards([''])
  }

  const handleDelete = (deckId) => {
    if (confirm('Are you sure you want to delete this deck?')) {
      deleteCustomDeck(deckId)
      navigate('/')
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black p-6 overflow-y-auto">
      <header className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-400 hover:text-blue-300 mb-4"
        >
          ← Back to Home
        </button>
        <h1 className="text-4xl font-bold mb-2">Create Custom Deck</h1>
      </header>

      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-xl font-bold mb-2">Deck Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., My Favorite Things"
            className="w-full bg-gray-800 text-white p-4 rounded-lg text-xl"
          />
        </div>

        <div>
          <label className="block text-xl font-bold mb-2">Icon</label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map(emoji => (
              <button
                key={emoji}
                onClick={() => setIcon(emoji)}
                className={`text-4xl p-2 rounded-lg transition-all ${
                  icon === emoji ? 'bg-blue-600 scale-110' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xl font-bold">Cards</label>
            <button
              onClick={handleAddCard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Card
            </button>
          </div>
          <div className="space-y-2">
            {cards.map((card, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={card}
                  onChange={(e) => handleCardChange(index, e.target.value)}
                  placeholder={`Card ${index + 1}`}
                  className="flex-1 bg-gray-800 text-white p-3 rounded-lg"
                />
                {cards.length > 1 && (
                  <button
                    onClick={() => handleRemoveCard(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
        >
          Save Deck
        </button>

        {customDecks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Custom Decks</h2>
            <div className="space-y-2">
              {customDecks.map(deck => (
                <div key={deck.id} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{deck.icon}</span>
                    <div>
                      <div className="font-bold">{deck.title}</div>
                      <div className="text-sm text-gray-400">{deck.cards.length} cards</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(deck.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
