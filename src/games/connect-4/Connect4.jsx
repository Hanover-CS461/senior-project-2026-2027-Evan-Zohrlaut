import { useEffect, useState } from 'react'
import { COLS, EMPTY, createBoard, drop, getStatus, isValidColumn } from './logic.js'
import { chooseMove } from './bot.js'
import {
  MODES,
  MODE_LABELS,
  createScores,
  loadScores,
  modeKey,
  saveScores,
} from './scores.js'
import './Connect4.css'

const RED = 'red'
const YELLOW = 'yellow'
const HUMAN_SYMBOL = RED
const BOT_SYMBOL = YELLOW
const DEFAULT_BOT_DELAY = 450

const DIFFICULTIES = [
  { id: 'beginner', label: 'Beginner', blurb: 'Plays mostly at random.' },
  { id: 'pro', label: 'Pro', blurb: 'Solid play, but slips up sometimes.' },
  { id: 'expert', label: 'Expert', blurb: 'Near-perfect; very rarely beaten.' },
]

function symbolLabel(symbol) {
  return symbol === RED ? 'Red' : 'Yellow'
}

function Connect4({ onBack, botDelay = DEFAULT_BOT_DELAY }) {
  const [phase, setPhase] = useState('setup')
  const [opponent, setOpponent] = useState('friend')
  const [difficulty, setDifficulty] = useState('beginner')
  const [board, setBoard] = useState(() => createBoard())
  const [turn, setTurn] = useState(RED)
  const [scores, setScores] = useState(loadScores)

  useEffect(() => {
    saveScores(scores)
  }, [scores])

  const status = getStatus(board)
  const finished = status.type !== 'playing'
  const activeMode = modeKey(opponent, difficulty)
  const botIsNext = opponent === 'bot' && turn === BOT_SYMBOL
  const redLabel = opponent === 'bot' ? 'You' : 'Red'
  const yellowLabel = opponent === 'bot' ? 'Bot' : 'Yellow'

  useEffect(() => {
    if (phase !== 'playing' || finished || !botIsNext) return

    const timer = setTimeout(() => {
      const col = chooseMove(board, BOT_SYMBOL, difficulty)
      if (col !== null) applyMove(col, BOT_SYMBOL)
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

  function applyMove(col, symbol) {
    if (finished) return

    const result = drop(board, col, symbol)
    if (!result) return

    const nextStatus = getStatus(result.board, result.index)
    setBoard(result.board)
    setTurn(symbol === RED ? YELLOW : RED)

    if (nextStatus.type === 'win') {
      recordResult(activeMode, nextStatus.symbol)
    } else if (nextStatus.type === 'draw') {
      recordResult(activeMode, 'draw')
    }
  }

  function handleCellClick(col) {
    if (opponent === 'bot' && turn !== HUMAN_SYMBOL) return
    applyMove(col, turn)
  }

  function startGame() {
    setBoard(createBoard())
    setTurn(RED)
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
      return `${symbolLabel(status.symbol)} wins`
    }
    if (status.type === 'draw') return 'Draw'
    if (opponent === 'bot') {
      return turn === HUMAN_SYMBOL ? 'Your turn' : 'Bot is thinking…'
    }
    return `${symbolLabel(turn)}'s turn`
  }

  if (phase === 'setup') {
    return (
      <section className="c4" aria-label="Connect 4">
        <div className="c4__top">
          <button type="button" className="c4__back" onClick={onBack}>
            ← Back
          </button>
        </div>

        <h2 className="c4__setup-title">Choose your game</h2>

        <div className="c4__options">
          <button
            type="button"
            className="c4__option"
            aria-pressed={opponent === 'friend'}
            onClick={() => setOpponent('friend')}
          >
            <span className="c4__option-label">Play a friend</span>
            <span className="c4__option-blurb">Two players, one device.</span>
          </button>
          <button
            type="button"
            className="c4__option"
            aria-pressed={opponent === 'bot'}
            onClick={() => setOpponent('bot')}
          >
            <span className="c4__option-label">Play the bot</span>
            <span className="c4__option-blurb">You are Red and move first.</span>
          </button>
        </div>

        {opponent === 'bot' && (
          <fieldset className="c4__difficulty">
            <legend className="c4__difficulty-legend">Difficulty</legend>
            <div className="c4__difficulty-options">
              {DIFFICULTIES.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="c4__difficulty-option"
                  aria-pressed={difficulty === entry.id}
                  onClick={() => setDifficulty(entry.id)}
                >
                  <span className="c4__option-label">{entry.label}</span>
                  <span className="c4__option-blurb">{entry.blurb}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <button type="button" className="c4__start" onClick={startGame}>
          Start game
        </button>
      </section>
    )
  }

  return (
    <section className="c4" aria-label="Connect 4">
      <div className="c4__top">
        <button type="button" className="c4__back" onClick={onBack}>
          ← Back
        </button>
        <p className="c4__status" role="status">
          {statusText()}
        </p>
      </div>

      <p className="c4__mode">{MODE_LABELS[activeMode]}</p>

      <div
        className="c4__board"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {board.map((cell, index) => {
          const row = Math.floor(index / COLS)
          const col = index % COLS
          const columnFull = !isValidColumn(board, col)
          const disabled =
            finished ||
            row !== 0 ||
            cell !== EMPTY ||
            columnFull ||
            (opponent === 'bot' && turn !== HUMAN_SYMBOL)
          const classes = ['c4__cell']
          if (cell) classes.push(`c4__cell--${cell}`)
          if (status.line.includes(index)) classes.push('c4__cell--win')
          const label = cell
            ? `Column ${col + 1}, row ${row + 1}, ${cell}`
            : row === 0
              ? `Drop in column ${col + 1}`
              : `Column ${col + 1}, row ${row + 1}`

          return (
            <button
              key={index}
              type="button"
              className={classes.join(' ')}
              style={{ '--drop-rows': row }}
              onClick={() => handleCellClick(col)}
              disabled={disabled}
              aria-label={label}
            >
              <span className="c4__disc" />
            </button>
          )
        })}
      </div>

      <div className="c4__actions">
        <button type="button" className="c4__reset" onClick={startGame}>
          Play again
        </button>
        <button type="button" className="c4__change" onClick={changeSetup}>
          Change setup
        </button>
      </div>

      <table className="c4__scores">
        <caption className="c4__scores-caption">Score sheet</caption>
        <thead>
          <tr>
            <th scope="col">Mode</th>
            <th scope="col">{redLabel}</th>
            <th scope="col">{yellowLabel}</th>
            <th scope="col">Draws</th>
          </tr>
        </thead>
        <tbody>
          {MODES.map((mode) => (
            <tr
              key={mode}
              className={mode === activeMode ? 'c4__score-row--active' : undefined}
            >
              <th scope="row">{MODE_LABELS[mode]}</th>
              <td>{scores[mode].red}</td>
              <td>{scores[mode].yellow}</td>
              <td>{scores[mode].draws}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="c4__reset-scores" onClick={resetScores}>
        Reset scores
      </button>
    </section>
  )
}

export default Connect4
