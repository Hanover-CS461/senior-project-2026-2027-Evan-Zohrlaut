import { EMPTY, SIZE, getLines, getWinner } from './logic.js'

const BEGINNER_BLUNDER_CHANCE = 0.75
const PRO_BLUNDER_CHANCE = 0.2

export function availableMoves(board) {
  const moves = []
  board.forEach((cell, index) => {
    if (cell === EMPTY) moves.push(index)
  })
  return moves
}

function other(symbol) {
  return symbol === 'X' ? 'O' : 'X'
}

function pickRandom(moves, random) {
  return moves[Math.floor(random() * moves.length)]
}

function winningMove(board, symbol) {
  for (const line of getLines()) {
    const marks = line.filter((index) => board[index] === symbol).length
    const empties = line.filter((index) => board[index] === EMPTY)
    if (marks === SIZE - 1 && empties.length === 1) {
      return empties[0]
    }
  }
  return null
}

function heuristicMove(board, symbol, opponent, random, blunderChance) {
  const moves = availableMoves(board)
  if (random() < blunderChance) {
    return pickRandom(moves, random)
  }
  const win = winningMove(board, symbol)
  if (win !== null) return win
  const block = winningMove(board, opponent)
  if (block !== null) return block
  return pickRandom(moves, random)
}

function minimax(board, current, botSymbol, depth) {
  const winner = getWinner(board)
  if (winner) {
    return winner.symbol === botSymbol ? 10 - depth : depth - 10
  }

  const moves = availableMoves(board)
  if (moves.length === 0) return 0

  const maximizing = current === botSymbol
  let best = maximizing ? -Infinity : Infinity
  for (const move of moves) {
    const next = board.slice()
    next[move] = current
    const score = minimax(next, other(current), botSymbol, depth + 1)
    best = maximizing ? Math.max(best, score) : Math.min(best, score)
  }
  return best
}

function expertMove(board, symbol) {
  let bestScore = -Infinity
  let bestMove = null
  for (const move of availableMoves(board)) {
    const next = board.slice()
    next[move] = symbol
    const score = minimax(next, other(symbol), symbol, 1)
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }
  return bestMove
}

export function chooseMove(board, symbol, difficulty, random = Math.random) {
  const opponent = other(symbol)
  if (difficulty === 'expert') return expertMove(board, symbol)
  if (difficulty === 'pro') {
    return heuristicMove(board, symbol, opponent, random, PRO_BLUNDER_CHANCE)
  }
  return heuristicMove(board, symbol, opponent, random, BEGINNER_BLUNDER_CHANCE)
}
