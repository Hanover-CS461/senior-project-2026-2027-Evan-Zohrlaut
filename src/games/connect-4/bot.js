import {
  CONNECT,
  COLS,
  ROWS,
  drop,
  getWinnerAt,
  isBoardFull,
  isValidColumn,
  legalColumns,
  toIndex,
  toRowCol,
} from './logic.js'

const CENTER_ORDER = [3, 2, 4, 1, 5, 0, 6]
const WIN_SCORE = 1_000_000

export const EXPERT_DEPTH = 8
const PRO_DEPTH = 3
const PRO_BLUNDER_CHANCE = 0.2
const BEGINNER_BLUNDER_CHANCE = 0.7

const WINDOW_SCORES = { 1: 1, 2: 8, 3: 50 }

const WINDOWS = buildWindows()

function buildWindows() {
  const windows = []
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ]

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      for (const [stepRow, stepCol] of directions) {
        const endRow = row + stepRow * (CONNECT - 1)
        const endCol = col + stepCol * (CONNECT - 1)
        if (endRow < 0 || endRow >= ROWS || endCol < 0 || endCol >= COLS) {
          continue
        }

        const window = []
        for (let i = 0; i < CONNECT; i += 1) {
          window.push(toIndex(row + stepRow * i, col + stepCol * i))
        }
        windows.push(window)
      }
    }
  }

  return windows
}

function other(symbol) {
  return symbol === 'red' ? 'yellow' : 'red'
}

function pickRandom(items, random) {
  return items[Math.floor(random() * items.length)]
}

function orderedColumns(board) {
  return CENTER_ORDER.filter((col) => isValidColumn(board, col))
}

function findImmediate(board, symbol) {
  for (const col of orderedColumns(board)) {
    const next = drop(board, col, symbol)
    const { row } = toRowCol(next.index)
    if (getWinnerAt(next.board, row, col)) return col
  }
  return null
}

function evaluate(board, botSymbol) {
  const opponent = other(botSymbol)
  let score = 0

  for (const window of WINDOWS) {
    let botCount = 0
    let opponentCount = 0

    for (let i = 0; i < window.length; i += 1) {
      const cell = board[window[i]]
      if (cell === botSymbol) botCount += 1
      else if (cell === opponent) opponentCount += 1
    }

    if (botCount && opponentCount) continue
    if (botCount) score += WINDOW_SCORES[botCount]
    else if (opponentCount) score -= WINDOW_SCORES[opponentCount]
  }

  return score
}

function minimax(board, depth, alpha, beta, maximizing, botSymbol, lastMove) {
  if (lastMove !== null) {
    const { row, col } = toRowCol(lastMove)
    const winner = getWinnerAt(board, row, col)
    if (winner) {
      const moverIsBot = winner.symbol === botSymbol
      return moverIsBot ? WIN_SCORE + depth : -WIN_SCORE - depth
    }
  }

  if (depth === 0 || isBoardFull(board)) {
    return evaluate(board, botSymbol)
  }

  const columns = orderedColumns(board)
  if (columns.length === 0) return evaluate(board, botSymbol)

  if (maximizing) {
    let best = -Infinity
    for (const col of columns) {
      const next = drop(board, col, botSymbol)
      const score = minimax(next.board, depth - 1, alpha, beta, false, botSymbol, next.index)
      if (score > best) best = score
      if (best > alpha) alpha = best
      if (alpha >= beta) break
    }
    return best
  }

  const opponent = other(botSymbol)
  let best = Infinity
  for (const col of columns) {
    const next = drop(board, col, opponent)
    const score = minimax(next.board, depth - 1, alpha, beta, true, botSymbol, next.index)
    if (score < best) best = score
    if (best < beta) beta = best
    if (alpha >= beta) break
  }
  return best
}

function searchMove(board, symbol, depth) {
  const columns = orderedColumns(board)
  if (columns.length === 0) return null

  const immediate = findImmediate(board, symbol)
  if (immediate !== null) return immediate

  let bestScore = -Infinity
  let bestColumn = columns[0]
  let alpha = -Infinity

  for (const col of columns) {
    const next = drop(board, col, symbol)
    const score = minimax(next.board, depth - 1, alpha, Infinity, false, symbol, next.index)
    if (score > bestScore) {
      bestScore = score
      bestColumn = col
    }
    if (score > alpha) alpha = score
  }

  return bestColumn
}

export function chooseMove(board, symbol, difficulty, random = Math.random, options = {}) {
  const columns = legalColumns(board)
  if (columns.length === 0) return null

  if (difficulty === 'expert') {
    return searchMove(board, symbol, options.depth ?? EXPERT_DEPTH)
  }

  if (difficulty === 'pro') {
    if (random() < PRO_BLUNDER_CHANCE) return pickRandom(columns, random)
    return searchMove(board, symbol, options.depth ?? PRO_DEPTH)
  }

  if (random() < BEGINNER_BLUNDER_CHANCE) return pickRandom(columns, random)

  const win = findImmediate(board, symbol)
  if (win !== null) return win

  const block = findImmediate(board, other(symbol))
  if (block !== null) return block

  return pickRandom(columns, random)
}
