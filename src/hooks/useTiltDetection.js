import { useEffect, useRef, useState, useCallback } from 'react'

// Degrees of deviation from the calibrated neutral pose required to
// trigger an action. Beta swings a large arc on "look down" (tracked
// beta flipping to ~180 in earlier absolute-threshold testing); gamma
// is the axis that actually moves on "look up" since beta barely
// changes there near this device pose. Tune from real device readings
// via ?debug=true, not guessed blind.
const CORRECT_BETA_THRESHOLD_DEG = 90
const PASS_GAMMA_THRESHOLD_DEG = 25

export function useTiltDetection(onCorrect, onPass, enabled = true) {
  const [calibrated, setCalibrated] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const neutralBeta = useRef(null)
  const neutralGamma = useRef(null)
  const lastTiltTime = useRef(0)
  const cooldownMs = 1000 // 1 second cooldown between tilts
  const onCorrectRef = useRef(onCorrect)
  const onPassRef = useRef(onPass)
  // Expose current values for debugging (use state so components can react to changes)
  const [currentBeta, setCurrentBeta] = useState(null)
  const [currentGamma, setCurrentGamma] = useState(null)

  // Keep callbacks in refs to avoid stale closures
  useEffect(() => {
    onCorrectRef.current = onCorrect
    onPassRef.current = onPass
  }, [onCorrect, onPass])

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission()
        if (response === 'granted') {
          setHasPermission(true)
          return true
        }
        return false
      } catch (error) {
        console.error('Error requesting permission:', error)
        return false
      }
    } else {
      // Non-iOS 13+ devices don't need permission
      setHasPermission(true)
      return true
    }
  }

  const calibrate = () => {
    // Reset calibration on new game
    neutralBeta.current = null
    neutralGamma.current = null
    setCalibrated(false)
  }

  const normalizeDelta = (delta) => {
    if (delta > 180) return delta - 360
    if (delta < -180) return delta + 360
    return delta
  }

  const handleOrientation = useCallback((event) => {
    if (!enabled || !hasPermission) return

    const beta = event.beta // Front-to-back tilt in degrees (-180 to 180)
    const gamma = event.gamma // Left-right tilt in degrees (-90 to 90)

    // Store current values for debugging
    setCurrentBeta(beta)
    setCurrentGamma(gamma)

    // Calibrate on first reading: whatever pose the phone is actually in
    // when the round starts becomes the zero point for both axes. No
    // assumption about what that angle "should" be -- that assumption
    // (hardcoded absolute thresholds) was the original bug.
    if (neutralBeta.current === null && beta !== null && beta !== undefined) {
      neutralBeta.current = beta
      neutralGamma.current = gamma !== null && gamma !== undefined ? gamma : null
      setCalibrated(true)
      return
    }

    if (neutralBeta.current === null || !calibrated) return

    const now = Date.now()
    if (now - lastTiltTime.current < cooldownMs) return

    // CORRECT: look down -- beta swings a large arc from neutral.
    if (beta !== null && beta !== undefined) {
      const deltaBeta = normalizeDelta(beta - neutralBeta.current)
      if (Math.abs(deltaBeta) > CORRECT_BETA_THRESHOLD_DEG) {
        lastTiltTime.current = now
        onCorrectRef.current()
        return
      }
    }

    // PASS: look up -- gamma moves away from neutral (beta stays near
    // neutral for this motion, which is why it can't detect it alone).
    if (gamma !== null && gamma !== undefined && neutralGamma.current !== null) {
      const deltaGamma = normalizeDelta(gamma - neutralGamma.current)
      if (Math.abs(deltaGamma) > PASS_GAMMA_THRESHOLD_DEG) {
        lastTiltTime.current = now
        onPassRef.current()
        return
      }
    }
  }, [enabled, hasPermission, calibrated])

  useEffect(() => {
    if (!enabled || !hasPermission) return

    window.addEventListener('deviceorientation', handleOrientation)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [enabled, hasPermission, calibrated, handleOrientation])

  return {
    requestPermission,
    calibrate,
    hasPermission,
    calibrated,
    // Expose current values for debugging
    beta: currentBeta,
    gamma: currentGamma,
    neutralBeta: neutralBeta.current,
    neutralGamma: neutralGamma.current
  }
}
