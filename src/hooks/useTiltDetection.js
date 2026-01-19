import { useEffect, useRef, useState, useCallback } from 'react'

export function useTiltDetection(onCorrect, onPass, enabled = true) {
  const [calibrated, setCalibrated] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const neutralBeta = useRef(null)
  const lastTiltTime = useRef(0)
  const cooldownMs = 1000 // 1 second cooldown between tilts
  const onCorrectRef = useRef(onCorrect)
  const onPassRef = useRef(onPass)

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
    
    // Calibrate on first reading
    if (neutralBeta.current === null && beta !== null && beta !== undefined) {
      neutralBeta.current = beta
      setCalibrated(true)
      return
    }

    if (neutralBeta.current === null || !calibrated) return

    const now = Date.now()
    if (now - lastTiltTime.current < cooldownMs) return

    const tiltDifference = beta - neutralBeta.current

    // Forward tilt (looking down) = CORRECT
    // Beta increases when tilting forward (phone screen faces more downward)
    if (tiltDifference > 45) {
      lastTiltTime.current = now
      onCorrectRef.current()
      return
    }

    // Backward tilt (looking up) = PASS
    // Beta decreases when tilting backward (phone screen faces more upward)
    if (tiltDifference < -45) {
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
    calibrated
  }
}
