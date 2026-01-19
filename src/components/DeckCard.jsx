export default function DeckCard({ deck, onSelect }) {
  return (
    <button
      onClick={() => onSelect(deck)}
      className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 text-left transition-all transform hover:scale-105 active:scale-95"
    >
      <div className="text-5xl mb-3">{deck.icon}</div>
      <h3 className="text-2xl font-bold mb-2">{deck.title}</h3>
      <p className="text-gray-400">{deck.cards.length} cards</p>
    </button>
  )
}
