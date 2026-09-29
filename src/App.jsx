import './App.css'
import Header from './components/Header.jsx'
import GameSlot from './components/GameSlot.jsx'

const GAMES = [
  { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'The first game', variant: 'x' },
  { id: 'slot-2', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' },
  { id: 'slot-3', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' },
]

function App() {
  return (
    <div className="launcher">
      <Header title="EZ-Games" tagline="A place for quick, fun games — all in one site." />
      <main className="game-grid">
        {GAMES.map((game) => (
          <GameSlot key={game.id} game={game} />
        ))}
      </main>
    </div>
  )
}

export default App