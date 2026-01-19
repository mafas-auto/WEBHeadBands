import { Outlet, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import OrientationLocker from './OrientationLocker'

export default function Layout() {
  const { state } = useGame()
  const location = useLocation()
  
  // Only enforce landscape when actually playing the game
  const isGameScreen = location.pathname === '/game'
  const isPlaying = state.status === 'playing'
  const enforceLandscape = isGameScreen && isPlaying

  return (
    <OrientationLocker enforceLandscape={enforceLandscape}>
      <div className="h-screen w-screen overflow-hidden bg-black text-white">
        <Outlet />
      </div>
    </OrientationLocker>
  )
}
