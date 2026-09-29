import GameIcon from './GameIcon.jsx'
import './GameSlot.css'

function GameSlot({ game }) {
  return (
    <article className="game-slot">
      <GameIcon variant={game.variant} />
      <h2 className="game-slot__name">{game.name}</h2>
      <p className="game-slot__description">{game.description}</p>
      <span className="game-slot__badge">Coming soon</span>
    </article>
  )
}

export default GameSlot