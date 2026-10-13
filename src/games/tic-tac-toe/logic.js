export const SIZE = 3

export const EMPTY = null

export function createBoard(size = SIZE) {
  return Array(size * size).fill(EMPTY)
}

const linesCache = new Map()

export function getLines(size = SIZE) {
  if (linesCache.has(size)) return linesCache.get(size)

  const lines = []

  for (let row = 0; row < size; row += 1) {
    lines.push(Array.from({ length: size }, (_, col) => row * size + col))
  }

  for (let col = 0; col < size; col += 1) {
    lines.push(Array.from({ length: size }, (_, row) => row * size + col))
  }

  lines.push(Array.from({ length: size }, (_, i) => i * size + i))
  lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)))

  linesCache.set(size, lines)
  return lines
}

export function getWinner(board, size = SIZE) {
  for (const line of getLines(size)) {
    const symbol = board[line[0]]
    if (symbol && line.every((index) => board[index] === symbol)) {
      return { symbol, line }
    }
  }
  return null
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== EMPTY)
}

export function getStatus(board, size = SIZE) {
  const winner = getWinner(board, size)
  if (winner) {
    return { type: 'win', symbol: winner.symbol, line: winner.line }
  }
  if (isBoardFull(board)) {
    return { type: 'draw', line: [] }
  }
  return { type: 'playing', line: [] }
}
