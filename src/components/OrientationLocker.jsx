import { useState, useEffect } from 'react'

export default function OrientationLocker({ children, enforceLandscape = false }) {
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  // Only enforce landscape if enforceLandscape is true
  if (enforceLandscape && isPortrait) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50 p-8">
        <div className="text-6xl mb-8 animate-spin">📱</div>
        <h2 className="text-3xl font-bold mb-4 text-center">Turn Your Phone Sideways</h2>
        <p className="text-xl text-center text-gray-300">
          This game requires landscape mode to play!
        </p>
      </div>
    )
  }

  return <>{children}</>
}
