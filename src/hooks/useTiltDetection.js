import { useEffect, useRef, useState, useCallback } from 'react'

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

  const handleOrientation = useCallback((event) => {
    if (!enabled || !hasPermission) return

    const beta = event.beta // Front-to-back tilt in degrees (-180 to 180)
    const gamma = event.gamma // Left-right tilt in degrees (-90 to 90)
    
    // Store current values for debugging
    setCurrentBeta(beta)
    setCurrentGamma(gamma)
    
    // Calibrate on first reading
    if (neutralBeta.current === null && beta !== null && beta !== undefined) {
      neutralBeta.current = beta
      neutralGamma.current = gamma !== null && gamma !== undefined ? gamma : -90
      setCalibrated(true)
      return
    }

    if (neutralBeta.current === null || !calibrated) return

    const now = Date.now()
    if (now - lastTiltTime.current < cooldownMs) return

    // Hybrid approach to handle gimbal lock:
    // In landscape mode on forehead:
    // - Neutral: γ ≈ -90°, β ≈ 0°
    // - PASS (Look Up): γ moves from -90° towards 0° (screen faces ceiling)
    // - CORRECT (Look Down): γ stays at -90°, but β flips to ~180° (screen faces floor)

    // 1. PASS: You look up at the ceiling
    // Gamma moves from -90 towards 0.
    // Threshold: If gamma is flatter than -50 degrees
    if (gamma !== null && gamma !== undefined && gamma > -50 && gamma < 0) {
      lastTiltTime.current = now
      onPassRef.current()
      return
    }

    // 2. CORRECT: You look down at the floor
    // Gamma gets stuck at -90, but Beta flips to +/- 180 when screen faces down.
    // Threshold: If Beta is upside down (greater than 140 or less than -140)
    if (beta !== null && beta !== undefined && Math.abs(beta) > 140) {
      lastTiltTime.current = now
      onCorrectRef.current()
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
    neutralBeta: neutralBeta.current,
    neutralGamma: neutralGamma.current
  }
}
