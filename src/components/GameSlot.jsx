import GameIcon from './GameIcon.jsx'
import './GameSlot.css'

function GameSlot({ game }) {
  const playable = game.status === 'playable'

  const content = (
    <>
      <GameIcon variant={game.variant} />
      <h2 className="game-slot__name">{game.name}</h2>
      <p className="game-slot__description">{game.description}</p>
      <span className="game-slot__badge">{playable ? 'Play' : 'Coming soon'}</span>
    </>
  )

  if (playable) {
    return (
      <a className="game-slot game-slot--playable" href={`#/${game.id}`}>
        {content}
      </a>
    )
  }

  return <article className="game-slot">{content}</article>
}

export default GameSlot
