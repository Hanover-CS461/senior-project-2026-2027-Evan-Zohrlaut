import { describe, it, expect } from 'vitest'
import {
  COLS,
  EMPTY,
  ROWS,
  createBoard,
  drop,
  dropRow,
  getStatus,
  getWinner,
  getWinnerAt,
  isBoardFull,
  legalColumns,
  toIndex,
  toRowCol,
} from './logic.js'

function withCells(entries) {
  const board = createBoard()
  for (const [row, col, symbol] of entries) {
    board[toIndex(row, col)] = symbol
  }
  return board
}

describe('createBoard', () => {
  it('creates a rows x cols board of empty cells', () => {
    const board = createBoard()
    expect(board).toHaveLength(ROWS * COLS)
    expect(board.every((cell) => cell === EMPTY)).toBe(true)
  })
})

describe('toIndex / toRowCol', () => {
  it('round-trips a row and column', () => {
    expect(toRowCol(toIndex(4, 6))).toEqual({ row: 4, col: 6 })
  })
})

describe('dropRow', () => {
  it('finds the bottom row of an empty column', () => {
    expect(dropRow(createBoard(), 0)).toBe(ROWS - 1)
  })

  it('stacks on top of existing pieces', () => {
    const board = drop(drop(createBoard(), 2, 'red').board, 2, 'yellow').board
    expect(dropRow(board, 2)).toBe(ROWS - 3)
  })

  it('returns -1 for a full column', () => {
    let board = createBoard()
    for (let i = 0; i < ROWS; i += 1) board = drop(board, 0, 'red').board
    expect(dropRow(board, 0)).toBe(-1)
  })
})

describe('legalColumns', () => {
  it('lists every column on an empty board', () => {
    expect(legalColumns(createBoard())).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('excludes full columns', () => {
    let board = createBoard()
    for (let i = 0; i < ROWS; i += 1) board = drop(board, 3, 'red').board
    expect(legalColumns(board)).not.toContain(3)
  })
})

describe('drop', () => {
  it('places a piece at the bottom of the column', () => {
    const result = drop(createBoard(), 4, 'red')
    expect(result.row).toBe(ROWS - 1)
    expect(result.index).toBe(toIndex(ROWS - 1, 4))
    expect(result.board[result.index]).toBe('red')
  })

  it('does not mutate the original board', () => {
    const board = createBoard()
    drop(board, 0, 'red')
    expect(board.every((cell) => cell === EMPTY)).toBe(true)
  })

  it('returns null for a full column', () => {
    let board = createBoard()
    for (let i = 0; i < ROWS; i += 1) board = drop(board, 0, 'red').board
    expect(drop(board, 0, 'yellow')).toBeNull()
  })
})

describe('getWinnerAt', () => {
  it('detects a horizontal line', () => {
    const board = withCells([
      [5, 0, 'red'],
      [5, 1, 'red'],
      [5, 2, 'red'],
      [5, 3, 'red'],
    ])
    expect(getWinnerAt(board, 5, 3)).toEqual({
      symbol: 'red',
      line: [toIndex(5, 0), toIndex(5, 1), toIndex(5, 2), toIndex(5, 3)],
    })
  })

  it('detects a vertical line', () => {
    const board = withCells([
      [2, 0, 'yellow'],
      [3, 0, 'yellow'],
      [4, 0, 'yellow'],
      [5, 0, 'yellow'],
    ])
    expect(getWinnerAt(board, 4, 0).symbol).toBe('yellow')
  })

  it('detects a diagonal going down-right', () => {
    const board = withCells([
      [2, 0, 'red'],
      [3, 1, 'red'],
      [4, 2, 'red'],
      [5, 3, 'red'],
    ])
    expect(getWinnerAt(board, 5, 3).symbol).toBe('red')
  })

  it('detects a diagonal going down-left', () => {
    const board = withCells([
      [2, 3, 'yellow'],
      [3, 2, 'yellow'],
      [4, 1, 'yellow'],
      [5, 0, 'yellow'],
    ])
    expect(getWinnerAt(board, 4, 1).symbol).toBe('yellow')
  })

  it('returns null when there is no line through the cell', () => {
    const board = withCells([
      [5, 0, 'red'],
      [5, 1, 'red'],
      [5, 2, 'red'],
    ])
    expect(getWinnerAt(board, 5, 1)).toBeNull()
  })
})

describe('getWinner', () => {
  it('finds a winner anywhere on the board', () => {
    const board = withCells([
      [5, 0, 'red'],
      [5, 1, 'red'],
      [5, 2, 'red'],
      [5, 3, 'red'],
    ])
    expect(getWinner(board).symbol).toBe('red')
  })

  it('returns null for a board with no winner', () => {
    expect(getWinner(createBoard())).toBeNull()
  })
})

describe('isBoardFull', () => {
  it('is false for a new board', () => {
    expect(isBoardFull(createBoard())).toBe(false)
  })
})

describe('getStatus', () => {
  it('reports an in-progress game', () => {
    expect(getStatus(createBoard())).toEqual({ type: 'playing', line: [] })
  })

  it('reports a win together with the winning line when given the last move', () => {
    const board = withCells([
      [5, 0, 'red'],
      [5, 1, 'red'],
      [5, 2, 'red'],
      [5, 3, 'red'],
    ])
    expect(getStatus(board, toIndex(5, 3))).toEqual({
      type: 'win',
      symbol: 'red',
      line: [toIndex(5, 0), toIndex(5, 1), toIndex(5, 2), toIndex(5, 3)],
    })
  })

  it('reports a draw when the board is full with no winner', () => {
    const rows = [
      ['red', 'red', 'yellow', 'yellow', 'red', 'red', 'yellow'],
      ['yellow', 'yellow', 'red', 'red', 'yellow', 'yellow', 'red'],
      ['red', 'red', 'yellow', 'yellow', 'red', 'red', 'yellow'],
      ['yellow', 'yellow', 'red', 'red', 'yellow', 'yellow', 'red'],
      ['red', 'red', 'yellow', 'yellow', 'red', 'red', 'yellow'],
      ['yellow', 'yellow', 'red', 'red', 'yellow', 'yellow', 'red'],
    ]
    const board = []
    for (const row of rows) {
      for (const symbol of row) board.push(symbol)
    }
    expect(getWinner(board)).toBeNull()
    expect(getStatus(board)).toEqual({ type: 'draw', line: [] })
  })
})
