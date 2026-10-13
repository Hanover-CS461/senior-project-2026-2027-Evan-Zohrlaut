import { describe, it, expect } from 'vitest'
import {
  SIZE,
  createBoard,
  getLines,
  getWinner,
  getStatus,
} from './logic.js'

describe('createBoard', () => {
  it('creates a flat board of size x size empty cells', () => {
    const board = createBoard()
    expect(board).toHaveLength(SIZE * SIZE)
    expect(board.every((cell) => cell === null)).toBe(true)
  })
})

describe('getLines', () => {
  it('derives rows, columns and diagonals from the size', () => {
    const lines = getLines(3)
    expect(lines).toHaveLength(8)
    expect(lines.every((line) => line.length === 3)).toBe(true)
    expect(lines).toContainEqual([0, 1, 2])
    expect(lines).toContainEqual([0, 3, 6])
    expect(lines).toContainEqual([0, 4, 8])
    expect(lines).toContainEqual([2, 4, 6])
  })

  it('scales the number of lines with the size', () => {
    expect(getLines(4)).toHaveLength(10)
  })
})

describe('getWinner', () => {
  it('returns the winning symbol and the winning line for a row', () => {
    const board = ['X', 'X', 'X', null, 'O', null, 'O', null, null]
    expect(getWinner(board)).toEqual({ symbol: 'X', line: [0, 1, 2] })
  })

  it('detects columns and both diagonals', () => {
    expect(getWinner(['O', 'X', null, 'O', 'X', null, 'O', null, 'X'])).toEqual({
      symbol: 'O',
      line: [0, 3, 6],
    })
    expect(getWinner(['X', 'O', null, null, 'X', 'O', null, null, 'X'])).toEqual({
      symbol: 'X',
      line: [0, 4, 8],
    })
    expect(getWinner(['O', null, 'X', null, 'X', 'O', 'X', null, null])).toEqual({
      symbol: 'X',
      line: [2, 4, 6],
    })
  })

  it('returns null when nobody has won', () => {
    expect(getWinner(createBoard())).toBeNull()
  })
})

describe('getStatus', () => {
  it('reports an in-progress game', () => {
    const board = ['X', null, null, null, 'O', null, null, null, null]
    expect(getStatus(board)).toEqual({ type: 'playing', line: [] })
  })

  it('reports a win together with the winning line', () => {
    const board = ['X', 'X', 'X', null, 'O', null, 'O', null, null]
    expect(getStatus(board)).toEqual({
      type: 'win',
      symbol: 'X',
      line: [0, 1, 2],
    })
  })

  it('reports a draw when the board is full with no winner', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(getStatus(board)).toEqual({ type: 'draw', line: [] })
  })
})
