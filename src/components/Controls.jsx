export default function Controls({ onCorrect, onPass, onPause, onResume, isPaused }) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
      <button
        onClick={onPass}
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
      >
        PASS
      </button>
      {isPaused ? (
        <button
          onClick={onResume}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
        >
          RESUME
        </button>
      ) : (
        <button
          onClick={onPause}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
        >
          PAUSE
        </button>
      )}
      <button
        onClick={onCorrect}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl active:scale-95 transition-transform"
      >
        CORRECT
      </button>
    </div>
  )
}
