const CORRECT_BETA_THRESHOLD_DEG = 90
const PASS_GAMMA_THRESHOLD_DEG = 25

const normalizeDelta = (delta) => {
  if (delta > 180) return delta - 360
  if (delta < -180) return delta + 360
  return delta
}

export default function TiltDebug({ beta, gamma, neutralBeta, neutralGamma }) {
  const deltaBeta = beta !== null && beta !== undefined && neutralBeta !== null && neutralBeta !== undefined
    ? normalizeDelta(beta - neutralBeta)
    : null
  const deltaGamma = gamma !== null && gamma !== undefined && neutralGamma !== null && neutralGamma !== undefined
    ? normalizeDelta(gamma - neutralGamma)
    : null

  const getStatus = () => {
    if (deltaBeta !== null && Math.abs(deltaBeta) > CORRECT_BETA_THRESHOLD_DEG) return 'CORRECT'
    if (deltaGamma !== null && Math.abs(deltaGamma) > PASS_GAMMA_THRESHOLD_DEG) return 'PASS'
    return 'Neutral'
  }

  const status = getStatus()

  return (
    <div className="fixed bottom-20 left-2 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-[220px]">
      <div className="mb-2 font-bold text-yellow-400">TILT DEBUG (relative hybrid)</div>

      <div className="mb-2">
        <div>Beta: {beta?.toFixed(1) ?? 'N/A'}° (neutral {neutralBeta?.toFixed(1) ?? 'N/A'}°)</div>
        <div className={deltaBeta !== null && Math.abs(deltaBeta) > CORRECT_BETA_THRESHOLD_DEG ? 'text-green-400 font-bold' : ''}>
          Δβ: {deltaBeta?.toFixed(1) ?? 'N/A'}° (CORRECT at ±{CORRECT_BETA_THRESHOLD_DEG}°)
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600">
        <div>Gamma: {gamma?.toFixed(1) ?? 'N/A'}° (neutral {neutralGamma?.toFixed(1) ?? 'N/A'}°)</div>
        <div className={deltaGamma !== null && Math.abs(deltaGamma) > PASS_GAMMA_THRESHOLD_DEG ? 'text-orange-400 font-bold' : ''}>
          Δγ: {deltaGamma?.toFixed(1) ?? 'N/A'}° (PASS at ±{PASS_GAMMA_THRESHOLD_DEG}°)
        </div>
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
