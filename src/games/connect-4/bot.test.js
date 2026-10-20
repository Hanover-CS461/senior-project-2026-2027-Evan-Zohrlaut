import { describe, it, expect } from 'vitest'
import {
  COLS,
  ROWS,
  createBoard,
  drop,
  getStatus,
  legalColumns,
} from './logic.js'
import { chooseMove } from './bot.js'

function sequence(values) {
  let index = 0
  return () => values[index++ % values.length]
}

function randomColumn(board) {
  const columns = legalColumns(board)
  return columns[Math.floor(Math.random() * columns.length)]
}

function fullBoard() {
  let board = createBoard()
  for (let col = 0; col < COLS; col += 1) {
    for (let i = 0; i < ROWS; i += 1) {
      board = drop(board, col, i % 2 === 0 ? 'red' : 'yellow').board
    }
  }
  return board
}

describe('chooseMove', () => {
  it('returns a legal column for every difficulty', () => {
    const board = createBoard()
    for (const difficulty of ['beginner', 'pro', 'expert']) {
      expect(legalColumns(board)).toContain(chooseMove(board, 'red', difficulty))
    }
  })

  it('returns null when the board is full', () => {
    expect(chooseMove(fullBoard(), 'red', 'expert')).toBeNull()
  })
})

describe('expert', () => {
  it('takes an immediate win', () => {
    let board = createBoard()
    board = drop(board, 0, 'red').board
    board = drop(board, 1, 'yellow').board
    board = drop(board, 0, 'red').board
    board = drop(board, 1, 'yellow').board
    board = drop(board, 0, 'red').board
    board = drop(board, 2, 'yellow').board

    expect(chooseMove(board, 'red', 'expert')).toBe(0)
  })

  it('blocks an opponent about to win', () => {
    let board = createBoard()
    board = drop(board, 0, 'yellow').board
    board = drop(board, 1, 'red').board
    board = drop(board, 0, 'yellow').board
    board = drop(board, 2, 'red').board
    board = drop(board, 0, 'yellow').board
    board = drop(board, 6, 'red').board

    expect(chooseMove(board, 'red', 'expert')).toBe(0)
  })

  it('never loses to random play', () => {
    for (let game = 0; game < 5; game += 1) {
      let board = createBoard()
      let turn = 'red'

      while (getStatus(board).type === 'playing') {
        const col =
          turn === 'red'
            ? randomColumn(board)
            : chooseMove(board, 'yellow', 'expert', Math.random, { depth: 5 })
        board = drop(board, col, turn).board
        turn = turn === 'red' ? 'yellow' : 'red'
      }

      const status = getStatus(board)
      expect(status.type === 'win' && status.symbol === 'red').toBe(false)
    }
  })
})

describe('pro', () => {
  it('plays a random column when it blunders', () => {
    const board = createBoard()
    const move = chooseMove(board, 'red', 'pro', sequence([0, 0.5]))
    expect(move).toBe(3)
  })
})

describe('beginner', () => {
  it('plays a random column when it blunders', () => {
    const board = createBoard()
    const move = chooseMove(board, 'red', 'beginner', sequence([0, 0.5]))
    expect(move).toBe(3)
  })

  it('still takes an immediate win when it does not blunder', () => {
    let board = createBoard()
    board = drop(board, 0, 'red').board
    board = drop(board, 1, 'yellow').board
    board = drop(board, 0, 'red').board
    board = drop(board, 1, 'yellow').board
    board = drop(board, 0, 'red').board
    board = drop(board, 2, 'yellow').board

    expect(chooseMove(board, 'red', 'beginner', () => 0.9)).toBe(0)
  })
})
