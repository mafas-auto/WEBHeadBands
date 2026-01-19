export default function Timer({ timeLeft }) {
  const percentage = (timeLeft / 60) * 100
  const color = timeLeft <= 10 ? 'bg-red-600' : timeLeft <= 20 ? 'bg-yellow-600' : 'bg-green-600'

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-gray-800 rounded-lg p-4 min-w-[100px]">
        <div className="text-3xl font-bold text-center mb-2">{timeLeft}s</div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
