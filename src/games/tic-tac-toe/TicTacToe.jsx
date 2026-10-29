import { useEffect, useState } from 'react'
import { SIZE, createBoard, getStatus } from './logic.js'
import { chooseMove } from './bot.js'
import {
  MODES,
  MODE_LABELS,
  createScores,
  loadScores,
  modeKey,
  saveScores,
} from './scores.js'
import './TicTacToe.css'

const HUMAN_SYMBOL = 'X'
const BOT_SYMBOL = 'O'
const DEFAULT_BOT_DELAY = 450

const DIFFICULTIES = [
  { id: 'beginner', label: 'Beginner', blurb: 'Plays mostly at random.' },
  { id: 'pro', label: 'Pro', blurb: 'Blocks and wins, but slips up sometimes.' },
  { id: 'expert', label: 'Expert', blurb: 'Near-perfect; very rarely beaten.' },
]

function TicTacToe({ onBack, botDelay = DEFAULT_BOT_DELAY }) {
  const [phase, setPhase] = useState('setup')
  const [opponent, setOpponent] = useState('friend')
  const [difficulty, setDifficulty] = useState('beginner')
  const [board, setBoard] = useState(() => createBoard())
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState(loadScores)

  useEffect(() => {
    saveScores(scores)
  }, [scores])

  const status = getStatus(board)
  const finished = status.type !== 'playing'
  const currentPlayer = xIsNext ? HUMAN_SYMBOL : BOT_SYMBOL
  const activeMode = modeKey(opponent, difficulty)
  const botIsNext = opponent === 'bot' && currentPlayer === BOT_SYMBOL
  const xLabel = opponent === 'bot' ? 'You' : 'X'
  const oLabel = opponent === 'bot' ? 'Bot' : 'O'

  useEffect(() => {
    if (phase !== 'playing' || finished || !botIsNext) return

    const timer = setTimeout(() => {
      const move = chooseMove(board, BOT_SYMBOL, difficulty)
      if (move !== null) applyMove(move, BOT_SYMBOL)
    }, botDelay)

    return () => clearTimeout(timer)
  }, [phase, finished, botIsNext, board, difficulty, botDelay])

  function recordResult(mode, outcome) {
    setScores((current) => {
      const result = current[mode]
      const updated =
        outcome === 'draw'
          ? { ...result, draws: result.draws + 1 }
          : { ...result, [outcome]: result[outcome] + 1 }
      return { ...current, [mode]: updated }
    })
  }

  function applyMove(index, symbol) {
    if (finished || board[index]) return

    const next = board.slice()
    next[index] = symbol
    setBoard(next)
    setXIsNext(!xIsNext)

    const nextStatus = getStatus(next)
    if (nextStatus.type === 'win') {
      recordResult(activeMode, nextStatus.symbol)
    } else if (nextStatus.type === 'draw') {
      recordResult(activeMode, 'draw')
    }
  }

  function handleCellClick(index) {
    if (opponent === 'bot' && currentPlayer !== HUMAN_SYMBOL) return
    applyMove(index, currentPlayer)
  }

  function startGame() {
    setBoard(createBoard())
    setXIsNext(true)
    setPhase('playing')
  }

  function changeSetup() {
    setPhase('setup')
  }

  function resetScores() {
    setScores(createScores())
  }

  function statusText() {
    if (status.type === 'win') {
      if (opponent === 'bot') {
        return status.symbol === HUMAN_SYMBOL ? 'You win!' : 'Bot wins'
      }
      return `${status.symbol} wins`
    }
    if (status.type === 'draw') return 'Draw'
    if (opponent === 'bot') {
      return currentPlayer === HUMAN_SYMBOL ? 'Your turn' : 'Bot is thinking…'
    }
    return `${currentPlayer}'s turn`
  }

  if (phase === 'setup') {
    return (
      <section className="ttt" aria-label="Tic Tac Toe">
        <div className="ttt__top">
          <button type="button" className="ttt__back" onClick={onBack}>
            ← Back
          </button>
        </div>

        <h2 className="ttt__setup-title">Choose your game</h2>

        <div className="ttt__options">
          <button
            type="button"
            className="ttt__option"
            aria-pressed={opponent === 'friend'}
            onClick={() => setOpponent('friend')}
          >
            <span className="ttt__option-label">Play a friend</span>
            <span className="ttt__option-blurb">Two players, one device.</span>
          </button>
          <button
            type="button"
            className="ttt__option"
            aria-pressed={opponent === 'bot'}
            onClick={() => setOpponent('bot')}
          >
            <span className="ttt__option-label">Play the bot</span>
            <span className="ttt__option-blurb">You are X and move first.</span>
          </button>
        </div>

        {opponent === 'bot' && (
          <fieldset className="ttt__difficulty">
            <legend className="ttt__difficulty-legend">Difficulty</legend>
            <div className="ttt__difficulty-options">
              {DIFFICULTIES.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="ttt__difficulty-option"
                  aria-pressed={difficulty === entry.id}
                  onClick={() => setDifficulty(entry.id)}
                >
                  <span className="ttt__option-label">{entry.label}</span>
                  <span className="ttt__option-blurb">{entry.blurb}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <button type="button" className="ttt__start" onClick={startGame}>
          Start game
        </button>
      </section>
    )
  }

  return (
    <section className="ttt" aria-label="Tic Tac Toe">
      <div className="ttt__top">
        <button type="button" className="ttt__back" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div
        className={`ttt__banner${finished ? ' ttt__banner--finished' : ''}`}
        role="status"
      >
        {statusText()}
      </div>

      <p className="ttt__mode">{MODE_LABELS[activeMode]}</p>

      <div
        className="ttt__board"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            type="button"
            className={`ttt__cell${status.line.includes(index) ? ' ttt__cell--win' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={finished || Boolean(cell) || botIsNext}
            aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ''}`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="ttt__actions">
        <button type="button" className="ttt__reset" onClick={startGame}>
          Play again
        </button>
        <button type="button" className="ttt__change" onClick={changeSetup}>
          Change setup
        </button>
      </div>

      <table className="ttt__scores">
        <caption className="ttt__scores-caption">Score sheet</caption>
        <thead>
          <tr>
            <th scope="col">Mode</th>
            <th scope="col">{xLabel}</th>
            <th scope="col">{oLabel}</th>
            <th scope="col">Draws</th>
          </tr>
        </thead>
        <tbody>
          {MODES.map((mode) => (
            <tr
              key={mode}
              className={mode === activeMode ? 'ttt__score-row--active' : undefined}
            >
              <th scope="row">{MODE_LABELS[mode]}</th>
              <td>{scores[mode].X}</td>
              <td>{scores[mode].O}</td>
              <td>{scores[mode].draws}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="ttt__reset-scores" onClick={resetScores}>
        Reset scores
      </button>
    </section>
  )
}

export default TicTacToe
