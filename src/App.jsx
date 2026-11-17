import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import GameSlot from './components/GameSlot.jsx'
import TicTacToe from './games/tic-tac-toe/TicTacToe.jsx'
import Connect4 from './games/connect-4/Connect4.jsx'
import { applyTheme, loadTheme, saveTheme } from './themes.js'

export const GAMES = [
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    description: 'Play a friend or take on the bot.',
    variant: 'x',
    component: TicTacToe,
  },
  {
    id: 'connect-4',
    name: 'Connect 4',
    description: 'Line up four in a row to win.',
    variant: 'connect-4',
    component: Connect4,
  },
  {
    id: 'slot-3',
    name: 'Coming Soon',
    description: 'Reserved for the next game',
    variant: 'plus',
  },
]

function parseRoute(hash) {
  return hash.replace(/^#\/?/, '')
}

function App() {
  const [theme, setTheme] = useState(loadTheme)
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))

  useEffect(() => {
    function handleHashChange() {
      setRoute(parseRoute(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  const ActiveGame = GAMES.find((game) => game.id === route)?.component

  function goHome() {
    window.location.hash = '#/'
  }

  return (
    <div className="launcher">
      <Header
        title="EZ-Games"
        tagline="A place for quick, fun games — all in one site."
        theme={theme}
        onThemeChange={setTheme}
      />
      {ActiveGame ? (
        <ActiveGame onBack={goHome} />
      ) : (
        <main className="game-grid">
          {GAMES.map((game) => (
            <GameSlot
              key={game.id}
              game={game}
              playable={Boolean(game.component)}
            />
          ))}
        </main>
      )}
    </div>
  )
}

export default App
