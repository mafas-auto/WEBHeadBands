import DeckCard from './DeckCard'

export default function DeckList({ decks, onSelectDeck }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {decks.map(deck => (
        <DeckCard key={deck.id} deck={deck} onSelect={onSelectDeck} />
      ))}
    </div>
  )
}
