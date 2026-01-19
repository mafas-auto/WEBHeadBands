import React, { createContext, useContext, useReducer, useEffect } from 'react'

const GameContext = createContext()

const initialState = {
  status: 'idle', // idle, counting_down, playing, paused, finished
  currentDeck: null,
  remainingCards: [],
  correctGuesses: [],
  passedGuesses: [],
  timeLeft: 60,
  currentCard: null,
  hasPermission: false,
  permissionRequested: false
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_DECK':
      return {
        ...state,
        currentDeck: action.payload,
        remainingCards: [...action.payload.cards],
        correctGuesses: [],
        passedGuesses: [],
        currentCard: null
      }
    case 'START_COUNTDOWN':
      return {
        ...state,
        status: 'counting_down'
      }
    case 'START_GAME':
      return {
        ...state,
        status: 'playing',
        currentCard: state.remainingCards[0],
        remainingCards: state.remainingCards.slice(1),
        timeLeft: 60
      }
    case 'GUESS_CORRECT':
      return {
        ...state,
        correctGuesses: [...state.correctGuesses, state.currentCard],
        currentCard: state.remainingCards.length > 0 ? state.remainingCards[0] : null,
        remainingCards: state.remainingCards.slice(1)
      }
    case 'GUESS_PASS':
      return {
        ...state,
        passedGuesses: [...state.passedGuesses, state.currentCard],
        currentCard: state.remainingCards.length > 0 ? state.remainingCards[0] : null,
        remainingCards: state.remainingCards.slice(1)
      }
    case 'TICK_TIMER':
      const newTimeLeft = state.timeLeft - 1
      if (newTimeLeft <= 0) {
        return {
          ...state,
          timeLeft: 0,
          status: 'finished'
        }
      }
      return {
        ...state,
        timeLeft: newTimeLeft
      }
    case 'PAUSE_GAME':
      return {
        ...state,
        status: 'paused'
      }
    case 'RESUME_GAME':
      return {
        ...state,
        status: 'playing'
      }
    case 'RESET_GAME':
      return {
        ...initialState,
        hasPermission: state.hasPermission,
        permissionRequested: state.permissionRequested
      }
    case 'SET_PERMISSION':
      return {
        ...state,
        hasPermission: action.payload,
        permissionRequested: true
      }
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (state.status === 'playing' && state.timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [state.status, state.timeLeft])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
