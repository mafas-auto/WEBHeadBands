export default function Controls({ onCorrect, onPass, onPause, onResume, isPaused }) {
  return (
    <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-3 md:gap-4 z-10 px-2">
      <button
        onClick={onPass}
        className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-transform touch-manipulation min-h-[44px] sm:min-h-[48px]"
      >
        PASS
      </button>
      {isPaused ? (
        <button
          onClick={onResume}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-transform touch-manipulation min-h-[44px] sm:min-h-[48px]"
        >
          RESUME
        </button>
      ) : (
        <button
          onClick={onPause}
          className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-transform touch-manipulation min-h-[44px] sm:min-h-[48px]"
        >
          PAUSE
        </button>
      )}
      <button
        onClick={onCorrect}
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 rounded-lg text-base sm:text-lg md:text-xl active:scale-95 transition-transform touch-manipulation min-h-[44px] sm:min-h-[48px]"
      >
        CORRECT
      </button>
    </div>
  )
}
