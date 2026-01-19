import { useEffect, useState } from 'react'

export default function CardDisplay({ word, status }) {
  const [animation, setAnimation] = useState('')

  useEffect(() => {
    if (status === 'correct') {
      setAnimation('animate-slide-down bg-green-600')
      setTimeout(() => setAnimation(''), 500)
    } else if (status === 'pass') {
      setAnimation('animate-slide-up bg-orange-600')
      setTimeout(() => setAnimation(''), 500)
    } else {
      setAnimation('')
    }
  }, [status, word])

  if (!word) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-4xl text-gray-500">No more cards!</p>
      </div>
    )
  }

  return (
    <div className={`flex-1 flex items-center justify-center transition-colors duration-300 ${animation}`}>
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10vw font-bold text-center px-4 sm:px-6 md:px-8 break-words max-w-full" style={{ 
        writingMode: 'horizontal-tb',
        textOrientation: 'mixed',
        lineHeight: '1.2'
      }}>
        {word}
      </h1>
    </div>
  )
}
