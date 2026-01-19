export default function TiltDebug({ beta, gamma, neutralBeta, neutralGamma }) {
  // Calculate status using hybrid approach
  const getStatus = () => {
    if (beta === null || gamma === null) return 'Neutral'
    
    // PASS: Gamma moves from -90 towards 0 (looking up)
    if (gamma > -50 && gamma < 0) return 'PASS'
    
    // CORRECT: Beta flips to ~180 (looking down)
    if (Math.abs(beta) > 140) return 'CORRECT'
    
    return 'Neutral'
  }

  const status = getStatus()
  const gammaDiff = gamma !== null && neutralGamma !== null ? gamma - neutralGamma : null

  return (
    <div className="fixed bottom-20 left-2 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-[220px]">
      <div className="mb-2 font-bold text-yellow-400">TILT DEBUG (Hybrid)</div>
      
      <div className="mb-2">
        <div>Beta: {beta?.toFixed(1) ?? 'N/A'}°</div>
        <div>Neutral β: {neutralBeta?.toFixed(1) ?? 'N/A'}°</div>
        <div className={Math.abs(beta) > 140 ? 'text-green-400 font-bold' : ''}>
          |β| &gt; 140: {Math.abs(beta) > 140 ? '✓ CORRECT' : '✗'}
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-600">
        <div>Gamma: {gamma?.toFixed(1) ?? 'N/A'}°</div>
        <div>Neutral γ: {neutralGamma?.toFixed(1) ?? 'N/A'}°</div>
        <div>γ Diff: {gammaDiff?.toFixed(1) ?? 'N/A'}°</div>
        <div className={gamma > -50 && gamma < 0 ? 'text-orange-400 font-bold' : ''}>
          -50 &lt; γ &lt; 0: {gamma > -50 && gamma < 0 ? '✓ PASS' : '✗'}
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

