import { useEffect, useState } from 'react'

export default function CountdownOverlay({ onComplete }) {
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count === 0) {
      setTimeout(() => onComplete(), 500)
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onComplete])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-9xl font-bold animate-pulse">
        {count > 0 ? count : 'GO!'}
      </div>
    </div>
  )
}
