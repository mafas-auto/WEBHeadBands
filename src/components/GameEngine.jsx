import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useTiltDetection } from '../hooks/useTiltDetection'
import CardDisplay from './CardDisplay'
import Timer from './Timer'
import Controls from './Controls'
import CountdownOverlay from './CountdownOverlay'
import FeedbackOverlay from './FeedbackOverlay'
import PermissionTutorial from './PermissionTutorial'
import TiltDebug from './TiltDebug'

export default function GameEngine() {
  const { state, dispatch } = useGame()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState({ show: false, type: null })
  const [countdownActive, setCountdownActive] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showDebug, setShowDebug] = useState(false) // Toggle with ?debug=true in URL
  const tiltEnabled = state.status === 'playing' && !state.hasPermission ? false : state.status === 'playing'

  // Enable debug mode from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setShowDebug(params.get('debug') === 'true')
  }, [])

  const playSound = (type) => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'correct') {
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
    } else {
      oscillator.frequency.value = 400
      oscillator.type = 'square'
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const handleCorrect = () => {
    if (state.status !== 'playing' || !state.currentCard) return
    
    playSound('correct')
    setFeedback({ show: true, type: 'correct' })
    setTimeout(() => setFeedback({ show: false, type: null }), 300)
    dispatch({ type: 'GUESS_CORRECT' })
  }

  const handlePass = () => {
    if (state.status !== 'playing' || !state.currentCard) return
    
    playSound('pass')
    setFeedback({ show: true, type: 'pass' })
    setTimeout(() => setFeedback({ show: false, type: null }), 300)
    dispatch({ type: 'GUESS_PASS' })
  }

  const tiltHook = useTiltDetection(
    handleCorrect,
    handlePass,
    tiltEnabled
  )
  
  const { requestPermission, calibrate, hasPermission, beta, gamma, neutralBeta, neutralGamma } = tiltHook

  useEffect(() => {
    if (state.status === 'idle' && state.currentDeck) {
      // Check if iOS and show tutorial first
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      if (isIOS && !state.hasPermission) {
        setShowTutorial(true)
      } else {
        setCountdownActive(true)
        dispatch({ type: 'START_COUNTDOWN' })
      }
    }
  }, [state.currentDeck, state.status, state.hasPermission, dispatch])

  const handleTutorialContinue = async () => {
    // Request permission immediately on user click (required for iOS)
    if (!state.hasPermission) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const granted = await requestPermission()
        if (granted) {
          dispatch({ type: 'SET_PERMISSION', payload: true })
        } else {
          dispatch({ type: 'SET_PERMISSION', payload: false })
        }
      } else {
        // Non-iOS devices don't need permission
        dispatch({ type: 'SET_PERMISSION', payload: true })
      }
    }
    
    setShowTutorial(false)
    
    // Request fullscreen on user interaction
    await requestFullscreen()
    
    // Resume countdown if we were in countdown, otherwise start it
    if (state.status === 'counting_down') {
      setCountdownActive(true)
    } else if (state.status === 'idle') {
      setCountdownActive(true)
      dispatch({ type: 'START_COUNTDOWN' })
    }
    // If paused, just close tutorial and stay paused
  }

  const handleTutorialSkip = async () => {
    setShowTutorial(false)
    
    // Request permission immediately on user click (required for iOS)
    if (!state.hasPermission) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const granted = await requestPermission()
        if (granted) {
          dispatch({ type: 'SET_PERMISSION', payload: true })
        } else {
          dispatch({ type: 'SET_PERMISSION', payload: false })
        }
      } else {
        // Non-iOS devices don't need permission
        dispatch({ type: 'SET_PERMISSION', payload: true })
      }
    }
    
    // Resume countdown if we were in countdown, otherwise start it
    if (state.status === 'counting_down') {
      setCountdownActive(true)
    } else if (state.status === 'idle') {
      setCountdownActive(true)
      dispatch({ type: 'START_COUNTDOWN' })
    }
    // If paused, just close tutorial and stay paused
  }

  const handleShowTutorial = () => {
    // Only allow showing tutorial if game hasn't started or is paused
    if (state.status === 'idle' || state.status === 'paused' || state.status === 'counting_down') {
      // Pause countdown if active
      if (countdownActive) {
        setCountdownActive(false)
      }
      setShowTutorial(true)
    }
  }

  // Request fullscreen before game starts (on user interaction)
  const requestFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.webkitEnterFullscreen) {
        // iOS Safari
        document.documentElement.webkitEnterFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen()
      }
    } catch (error) {
      console.log('Fullscreen not available:', error)
    }
  }

  // Fullscreen and orientation lock when game starts
  useEffect(() => {
    if (state.status === 'playing') {
      // Try to lock orientation
      const lockOrientation = async () => {
        try {
          if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape')
          } else if (screen.lockOrientation) {
            screen.lockOrientation('landscape')
          } else if (screen.mozLockOrientation) {
            screen.mozLockOrientation('landscape')
          } else if (screen.msLockOrientation) {
            screen.msLockOrientation('landscape')
          }
        } catch (error) {
          // Orientation lock not available on this device - silently fail
          // This is expected on many devices
        }
      }

      lockOrientation()
    } else if (state.status === 'finished' || state.status === 'idle') {
      // Exit fullscreen when game ends (only if we're actually in fullscreen)
      const exitFullscreen = async () => {
        const isFullscreen = document.fullscreenElement || 
                            document.webkitFullscreenElement || 
                            document.msFullscreenElement
        
        if (isFullscreen) {
          try {
            if (document.exitFullscreen) {
              await document.exitFullscreen()
            } else if (document.webkitExitFullscreen) {
              await document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
              await document.msExitFullscreen()
            }
          } catch (error) {
            // Ignore errors - might not be in fullscreen
          }
        }
      }

      exitFullscreen()
    }
  }, [state.status])

  const handleCountdownComplete = async () => {
    setCountdownActive(false)
    
    // Request fullscreen before starting (requires user gesture)
    await requestFullscreen()
    
    // Permission should already be requested from tutorial button click
    // Just start the game
    setTimeout(() => {
      calibrate()
      dispatch({ type: 'START_GAME' })
    }, 100)
  }

  // Detect orientation changes and check if permission is still valid
  useEffect(() => {
    let orientationCheckTimeout
    
    const handleOrientationChange = () => {
      // Wait a bit for orientation to settle
      clearTimeout(orientationCheckTimeout)
      orientationCheckTimeout = setTimeout(() => {
        // If game is playing, check if we need to re-request permission
        if (state.status === 'playing') {
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
          if (isIOS && !hasPermission) {
            // Permission was lost - pause game and show tutorial to re-request
            dispatch({ type: 'PAUSE_GAME' })
            dispatch({ type: 'SET_PERMISSION', payload: false })
            setShowTutorial(true)
          }
        }
      }, 500)
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)

    return () => {
      clearTimeout(orientationCheckTimeout)
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [state.status, hasPermission, dispatch])

  useEffect(() => {
    if (state.status === 'finished') {
      setTimeout(() => {
        navigate('/results')
      }, 1000)
    }
  }, [state.status, navigate])

  if (showTutorial) {
    return <PermissionTutorial onContinue={handleTutorialContinue} onSkip={handleTutorialSkip} />
  }

  if (countdownActive) {
    return <CountdownOverlay onComplete={handleCountdownComplete} />
  }

  return (
    <div className="h-screen w-screen flex flex-col relative bg-black">
      {/* Tutorial button in upper right */}
      {(state.status === 'idle' || state.status === 'paused' || state.status === 'counting_down') && (
        <button
          onClick={handleShowTutorial}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full p-2 sm:p-3 shadow-lg transition-all active:scale-95 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Show tutorial"
          title="Show tutorial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
      <Timer timeLeft={state.timeLeft} />
      <CardDisplay word={state.currentCard} status={feedback.type} />
      <FeedbackOverlay show={feedback.show} type={feedback.type} />
      <Controls
        onCorrect={handleCorrect}
        onPass={handlePass}
        onPause={() => dispatch({ type: 'PAUSE_GAME' })}
        onResume={() => dispatch({ type: 'RESUME_GAME' })}
        isPaused={state.status === 'paused'}
      />
      {showDebug && state.status === 'playing' && (
        <TiltDebug 
          beta={beta}
          gamma={gamma}
          neutralBeta={neutralBeta}
          neutralGamma={neutralGamma}
        />
      )}
    </div>
  )
}
