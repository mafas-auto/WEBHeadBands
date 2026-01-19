export const defaultDecks = [
  {
    id: 'deck_animals',
    title: 'Animals',
    icon: '🦁',
    cards: [
      'Lion', 'Tiger', 'Bear', 'Penguin', 'Elephant', 'Giraffe', 'Monkey',
      'Zebra', 'Kangaroo', 'Panda', 'Dolphin', 'Shark', 'Eagle', 'Owl',
      'Butterfly', 'Snake', 'Frog', 'Rabbit', 'Horse', 'Cow'
    ]
  },
  {
    id: 'deck_movies',
    title: 'Movies',
    icon: '🎬',
    cards: [
      'The Matrix', 'Titanic', 'Jurassic Park', 'Star Wars', 'Harry Potter',
      'The Avengers', 'Frozen', 'Toy Story', 'Finding Nemo', 'The Lion King',
      'Inception', 'The Dark Knight', 'Pulp Fiction', 'Forrest Gump', 'The Godfather'
    ]
  },
  {
    id: 'deck_food',
    title: 'Food',
    icon: '🍕',
    cards: [
      'Pizza', 'Hamburger', 'Sushi', 'Taco', 'Ice Cream', 'Chocolate', 'Pasta',
      'Salad', 'Sandwich', 'Soup', 'Steak', 'Chicken', 'Fish', 'Rice', 'Bread'
    ]
  },
  {
    id: 'deck_actions',
    title: 'Actions',
    icon: '🏃',
    cards: [
      'Running', 'Jumping', 'Dancing', 'Singing', 'Swimming', 'Flying', 'Cooking',
      'Reading', 'Writing', 'Drawing', 'Sleeping', 'Eating', 'Drinking', 'Laughing', 'Crying'
    ]
  },
  {
    id: 'deck_objects',
    title: 'Objects',
    icon: '📱',
    cards: [
      'Phone', 'Computer', 'Book', 'Car', 'Bicycle', 'Airplane', 'Camera',
      'Watch', 'Glasses', 'Umbrella', 'Key', 'Wallet', 'Backpack', 'Lamp', 'Chair'
    ]
  }
]

export const loadCustomDecks = () => {
  try {
    const stored = localStorage.getItem('customDecks')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const saveCustomDeck = (deck) => {
  try {
    const customDecks = loadCustomDecks()
    const updated = [...customDecks, deck]
    localStorage.setItem('customDecks', JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export const deleteCustomDeck = (deckId) => {
  try {
    const customDecks = loadCustomDecks()
    const updated = customDecks.filter(d => d.id !== deckId)
    localStorage.setItem('customDecks', JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}
