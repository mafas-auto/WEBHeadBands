import { useEffect, useState } from 'react'

export default function TiltDebug({ enabled = false }) {
  const [beta, setBeta] = useState(null)
  const [neutralBeta, setNeutralBeta] = useState(null)
  const [tiltDiff, setTiltDiff] = useState(null)
  const [orientation, setOrientation] = useState(null)

  useEffect(() => {
    if (!enabled) return

    let firstReading = true

    const handleOrientation = (event) => {
      const { beta: currentBeta, gamma, alpha } = event
      
      setBeta(currentBeta)
      setOrientation({ alpha, beta: currentBeta, gamma })

      if (firstReading && currentBeta !== null && currentBeta !== undefined) {
        setNeutralBeta(currentBeta)
        firstReading = false
      }

      if (neutralBeta !== null) {
        setTiltDiff(currentBeta - neutralBeta)
      }
    }

    window.addEventListener('deviceorientation', handleOrientation)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [enabled, neutralBeta])

  if (!enabled) return null

  return (
    <div className="fixed bottom-20 left-2 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-[200px]">
      <div className="mb-2 font-bold text-yellow-400">TILT DEBUG</div>
      <div>Beta: {beta?.toFixed(1) ?? 'N/A'}°</div>
      <div>Neutral: {neutralBeta?.toFixed(1) ?? 'N/A'}°</div>
      <div>Difference: {tiltDiff?.toFixed(1) ?? 'N/A'}°</div>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div>Alpha: {orientation?.alpha?.toFixed(1) ?? 'N/A'}°</div>
        <div>Gamma: {orientation?.gamma?.toFixed(1) ?? 'N/A'}°</div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className={tiltDiff < -35 ? 'text-green-400 font-bold' : ''}>
          CORRECT: {tiltDiff < -35 ? '✓' : '✗'} ({tiltDiff < -35 ? 'TRIGGERED' : 'Need < -35°'})
        </div>
        <div className={tiltDiff > 40 ? 'text-orange-400 font-bold' : ''}>
          PASS: {tiltDiff > 40 ? '✓' : '✗'} ({tiltDiff > 40 ? 'TRIGGERED' : 'Need > 40°'})
        </div>
      </div>
    </div>
  )
}

