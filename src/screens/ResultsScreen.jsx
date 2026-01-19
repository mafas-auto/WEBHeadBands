import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export default function ResultsScreen() {
  const navigate = useNavigate()
  const { state, dispatch } = useGame()

  const totalCards = state.correctGuesses.length + state.passedGuesses.length
  const score = state.correctGuesses.length
  const percentage = totalCards > 0 ? Math.round((score / totalCards) * 100) : 0

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' })
    navigate('/')
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black p-8 overflow-y-auto">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Game Over!</h1>
        <div className="text-6xl mb-4">{percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '😊'}</div>
      </header>

      <div className="flex-1 space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-6xl font-bold mb-2">{score}</div>
          <div className="text-2xl text-gray-400">Correct Guesses</div>
          <div className="mt-4 text-xl">
            {score} out of {totalCards} cards ({percentage}%)
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Correct ({state.correctGuesses.length})</h2>
          <div className="grid grid-cols-2 gap-2">
            {state.correctGuesses.map((card, index) => (
              <div key={index} className="bg-green-600 rounded p-3 text-center">
                {card}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Passed ({state.passedGuesses.length})</h2>
          <div className="grid grid-cols-2 gap-2">
            {state.passedGuesses.map((card, index) => (
              <div key={index} className="bg-orange-600 rounded p-3 text-center">
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={handlePlayAgain}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
        >
          Play Again
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
