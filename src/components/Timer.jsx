export default function Timer({ timeLeft }) {
  const percentage = (timeLeft / 60) * 100
  const color = timeLeft <= 10 ? 'bg-red-600' : timeLeft <= 20 ? 'bg-yellow-600' : 'bg-green-600'

  return (
    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
      <div className="bg-gray-800 rounded-lg p-2 sm:p-3 md:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[100px]">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2">{timeLeft}s</div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
          <div
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
