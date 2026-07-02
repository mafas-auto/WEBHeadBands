import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Layout from './components/Layout'
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import ResultsScreen from './screens/ResultsScreen'
import EditorScreen from './screens/EditorScreen'
import AIDeckScreen from './screens/AIDeckScreen'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="game" element={<GameScreen />} />
            <Route path="results" element={<ResultsScreen />} />
            <Route path="editor" element={<EditorScreen />} />
            <Route path="ai-deck" element={<AIDeckScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
