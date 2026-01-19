export default function FeedbackOverlay({ show, type }) {
  if (!show) return null

  const bgColor = type === 'correct' ? 'bg-green-500' : 'bg-orange-500'
  const text = type === 'correct' ? '✓ CORRECT' : '→ PASS'

  return (
    <div className={`fixed inset-0 ${bgColor} bg-opacity-80 flex items-center justify-center z-40 transition-opacity duration-300`}>
      <div className="text-6xl font-bold text-white">{text}</div>
    </div>
  )
}
