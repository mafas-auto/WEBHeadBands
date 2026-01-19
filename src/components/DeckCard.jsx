export default function DeckCard({ deck, onSelect }) {
  return (
    <button
      onClick={() => onSelect(deck)}
      className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-lg p-3 sm:p-4 md:p-6 text-left transition-all transform active:scale-95 touch-manipulation w-full min-h-[120px] sm:min-h-[140px]"
    >
      <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{deck.icon}</div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{deck.title}</h3>
      <p className="text-sm sm:text-base text-gray-400">{deck.cards.length} cards</p>
    </button>
  )
}
