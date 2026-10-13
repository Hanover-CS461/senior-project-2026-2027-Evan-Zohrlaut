import { describe, it, expect } from 'vitest'
import { createBoard, getStatus } from './logic.js'
import { availableMoves, chooseMove } from './bot.js'

function sequence(values) {
  let index = 0
  return () => values[index++ % values.length]
}

describe('availableMoves', () => {
  it('lists the empty cell indices', () => {
    const board = ['X', null, 'O', null, null, 'X', null, 'O', null]
    expect(availableMoves(board)).toEqual([1, 3, 4, 6, 8])
  })
})

describe('beginner', () => {
  it('usually plays a random move', () => {
    const move = chooseMove(createBoard(), 'O', 'beginner', sequence([0.1, 0.5]))
    expect(move).toBe(4)
  })

  it('can still take an immediate win', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null]
    expect(chooseMove(board, 'O', 'beginner', () => 0.9)).toBe(2)
  })
})

describe('pro', () => {
  it('takes an immediate win', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null]
    expect(chooseMove(board, 'O', 'pro', () => 0.5)).toBe(2)
  })

  it('blocks the opponent from winning', () => {
    const board = ['X', 'X', null, null, null, null, null, null, null]
    expect(chooseMove(board, 'O', 'pro', () => 0.5)).toBe(2)
  })

  it('sometimes slips and plays a random move instead of blocking', () => {
    const board = ['X', 'X', null, null, null, null, null, null, null]
    const move = chooseMove(board, 'O', 'pro', sequence([0.1, 0.99]))
    expect(move).toBe(8)
  })

  it('no longer always takes the centre', () => {
    expect(chooseMove(createBoard(), 'O', 'pro', () => 0.9)).toBe(8)
  })
})

describe('expert', () => {
  it('takes an immediate win', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null]
    expect(chooseMove(board, 'O', 'expert')).toBe(2)
  })

  it('blocks the opponent from winning', () => {
    const board = ['X', 'X', null, null, null, null, null, null, null]
    expect(chooseMove(board, 'O', 'expert')).toBe(2)
  })

  it('only ever returns an empty cell', () => {
    const board = ['X', null, 'O', null, null, 'X', null, 'O', null]
    expect(availableMoves(board)).toContain(chooseMove(board, 'O', 'expert'))
  })

  it('never loses, even against random play', () => {
    for (let game = 0; game < 12; game += 1) {
      let board = createBoard()
      let turn = 'X'

      while (getStatus(board).type === 'playing') {
        const moves = availableMoves(board)
        const move =
          turn === 'X'
            ? moves[Math.floor(Math.random() * moves.length)]
            : chooseMove(board, 'O', 'expert')

        board = board.slice()
        board[move] = turn
        turn = turn === 'X' ? 'O' : 'X'
      }

      const status = getStatus(board)
      expect(status.type === 'win' && status.symbol === 'X').toBe(false)
    }
  })
})
