import { useEffect, useRef, useState, useCallback } from 'react'

// Degrees of beta deviation from the calibrated neutral pose required to
// trigger an action. Same magnitude both directions -- tune from real
// device readings via ?debug=true, not guessed blind.
const TILT_THRESHOLD_DEG = 25

export function useTiltDetection(onCorrect, onPass, enabled = true) {
  const [calibrated, setCalibrated] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const neutralBeta = useRef(null)
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
    setCalibrated(false)
  }

  const handleOrientation = useCallback((event) => {
    if (!enabled || !hasPermission) return

    const beta = event.beta // Front-to-back tilt in degrees (-180 to 180)
    const gamma = event.gamma // Left-right tilt -- tracked for the debug overlay only, not used for detection

    // Store current values for debugging
    setCurrentBeta(beta)
    setCurrentGamma(gamma)

    // Calibrate on first reading: whatever pose the phone is actually in
    // when the round starts becomes the zero point. No assumption about
    // what that angle "should" be -- that assumption was the original bug.
    if (neutralBeta.current === null && beta !== null && beta !== undefined) {
      neutralBeta.current = beta
      setCalibrated(true)
      return
    }

    if (neutralBeta.current === null || !calibrated) return
    if (beta === null || beta === undefined) return

    const now = Date.now()
    if (now - lastTiltTime.current < cooldownMs) return

    // Deviation from calibrated neutral, normalized to -180..180 so a
    // wrap-around (e.g. neutral at 170, current at -170) doesn't read as
    // a huge false delta.
    let delta = beta - neutralBeta.current
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360

    // Direction mapping (which sign is CORRECT vs PASS) is unverified
    // against a real device -- confirm/flip via ?debug=true.
    if (delta > TILT_THRESHOLD_DEG) {
      lastTiltTime.current = now
      onCorrectRef.current()
      return
    }
    if (delta < -TILT_THRESHOLD_DEG) {
      lastTiltTime.current = now
      onPassRef.current()
      return
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
    neutralBeta: neutralBeta.current
  }
}
