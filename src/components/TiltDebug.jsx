const TILT_THRESHOLD_DEG = 25

export default function TiltDebug({ beta, gamma, neutralBeta }) {
  const delta = beta !== null && beta !== undefined && neutralBeta !== null && neutralBeta !== undefined
    ? (() => {
        let d = beta - neutralBeta
        if (d > 180) d -= 360
        if (d < -180) d += 360
        return d
      })()
    : null

  const getStatus = () => {
    if (delta === null) return 'Neutral'
    if (delta > TILT_THRESHOLD_DEG) return 'CORRECT'
    if (delta < -TILT_THRESHOLD_DEG) return 'PASS'
    return 'Neutral'
  }

  const status = getStatus()

  return (
    <div className="fixed bottom-20 left-2 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-[220px]">
      <div className="mb-2 font-bold text-yellow-400">TILT DEBUG (relative β)</div>

      <div className="mb-2">
        <div>Beta: {beta?.toFixed(1) ?? 'N/A'}°</div>
        <div>Neutral β: {neutralBeta?.toFixed(1) ?? 'N/A'}°</div>
        <div className={delta !== null && Math.abs(delta) > TILT_THRESHOLD_DEG ? 'text-green-400 font-bold' : ''}>
          Δβ: {delta?.toFixed(1) ?? 'N/A'}° (threshold ±{TILT_THRESHOLD_DEG}°)
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600 text-gray-500">
        <div>Gamma (unused): {gamma?.toFixed(1) ?? 'N/A'}°</div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600">
        <div className={`font-bold text-lg ${
          status === 'CORRECT' ? 'text-green-400' :
          status === 'PASS' ? 'text-orange-400' :
          'text-gray-400'
        }`}>
          Status: {status}
        </div>
      </div>
    </div>
  )
}
