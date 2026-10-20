export const ROWS = 6
export const COLS = 7
export const CONNECT = 4
export const EMPTY = null

export function createBoard() {
  return Array(ROWS * COLS).fill(EMPTY)
}

export function toIndex(row, col) {
  return row * COLS + col
}

export function toRowCol(index) {
  return { row: Math.floor(index / COLS), col: index % COLS }
}

export function isValidColumn(board, col) {
  return col >= 0 && col < COLS && board[toIndex(0, col)] === EMPTY
}

export function dropRow(board, col) {
  for (let row = ROWS - 1; row >= 0; row -= 1) {
    if (board[toIndex(row, col)] === EMPTY) return row
  }
  return -1
}

export function legalColumns(board) {
  const columns = []
  for (let col = 0; col < COLS; col += 1) {
    if (isValidColumn(board, col)) columns.push(col)
  }
  return columns
}

export function drop(board, col, symbol) {
  const row = dropRow(board, col)
  if (row === -1) return null

  const next = board.slice()
  const index = toIndex(row, col)
  next[index] = symbol
  return { board: next, row, col, index }
}

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
]

function lineFrom(board, row, col, symbol, stepRow, stepCol) {
  const line = []
  let r = row
  let c = col
  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLS &&
    board[toIndex(r, c)] === symbol
  ) {
    line.push(toIndex(r, c))
    r += stepRow
    c += stepCol
  }
  return line
}

export function getWinnerAt(board, row, col) {
  const symbol = board[toIndex(row, col)]
  if (!symbol) return null

  for (const [stepRow, stepCol] of DIRECTIONS) {
    const forward = lineFrom(board, row, col, symbol, stepRow, stepCol)
    const backward = lineFrom(
      board,
      row - stepRow,
      col - stepCol,
      symbol,
      -stepRow,
      -stepCol,
    )
    const line = [...backward.reverse(), ...forward]
    if (line.length >= CONNECT) {
      return { symbol, line }
    }
  }
  return null
}

export function getWinner(board) {
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      if (board[toIndex(row, col)]) {
        const winner = getWinnerAt(board, row, col)
        if (winner) return winner
      }
    }
  }
  return null
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== EMPTY)
}

export function getStatus(board, lastMove = null) {
  let winner = null
  if (lastMove !== null && lastMove !== undefined) {
    const { row, col } = toRowCol(lastMove)
    winner = getWinnerAt(board, row, col)
  } else {
    winner = getWinner(board)
  }

  if (winner) {
    return { type: 'win', symbol: winner.symbol, line: winner.line }
  }
  if (isBoardFull(board)) {
    return { type: 'draw', line: [] }
  }
  return { type: 'playing', line: [] }
}
