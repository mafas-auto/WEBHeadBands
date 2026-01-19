import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { useTiltDetection } from '../hooks/useTiltDetection'
import CardDisplay from './CardDisplay'
import Timer from './Timer'
import Controls from './Controls'
import CountdownOverlay from './CountdownOverlay'
import FeedbackOverlay from './FeedbackOverlay'

export default function GameEngine() {
  const { state, dispatch } = useGame()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState({ show: false, type: null })
  const [countdownActive, setCountdownActive] = useState(false)
  const tiltEnabled = state.status === 'playing' && !state.hasPermission ? false : state.status === 'playing'

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
  
  const { requestPermission, calibrate, hasPermission } = tiltHook

  useEffect(() => {
    if (state.status === 'idle' && state.currentDeck) {
      setCountdownActive(true)
      dispatch({ type: 'START_COUNTDOWN' })
    }
  }, [state.currentDeck, state.status, dispatch])

  const handleCountdownComplete = async () => {
    setCountdownActive(false)
    
    // Request permission if needed
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
    
    // Calibrate after permission is handled
    setTimeout(() => {
      calibrate()
      dispatch({ type: 'START_GAME' })
    }, 100)
  }

  useEffect(() => {
    if (state.status === 'finished') {
      setTimeout(() => {
        navigate('/results')
      }, 1000)
    }
  }, [state.status, navigate])

  if (countdownActive) {
    return <CountdownOverlay onComplete={handleCountdownComplete} />
  }

  return (
    <div className="h-screen w-screen flex flex-col relative bg-black">
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
      {!hasPermission && state.status === 'playing' && (
        <div className="absolute top-20 left-4 right-4 bg-yellow-600 text-black p-4 rounded-lg text-center">
          <p className="font-bold">Tilt detection requires permission</p>
          <p className="text-sm">Use the buttons below to play</p>
        </div>
      )}
    </div>
  )
}
