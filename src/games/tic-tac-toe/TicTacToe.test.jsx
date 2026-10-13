import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import TicTacToe from './TicTacToe.jsx'

function cells() {
  return screen.getAllByRole('button', { name: /^cell /i })
}

function startGame() {
  fireEvent.click(screen.getByRole('button', { name: /start game/i }))
}

function winForX() {
  fireEvent.click(cells()[0])
  fireEvent.click(cells()[3])
  fireEvent.click(cells()[1])
  fireEvent.click(cells()[4])
  fireEvent.click(cells()[2])
}

function rowCounts(label) {
  return within(screen.getByRole('row', { name: new RegExp(label, 'i') })).getAllByRole(
    'cell',
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('TicTacToe setup', () => {
  it('opens on the setup screen with no board', () => {
    render(<TicTacToe />)
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play a friend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play the bot/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^cell /i })).not.toBeInTheDocument()
  })

  it('shows difficulty options only for the bot', () => {
    render(<TicTacToe />)
    expect(screen.queryByRole('button', { name: /beginner/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    expect(screen.getByRole('button', { name: /beginner/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /pro/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /expert/i })).toBeInTheDocument()
  })

  it('returns to setup from Change setup', () => {
    render(<TicTacToe />)
    startGame()
    fireEvent.click(screen.getByRole('button', { name: /change setup/i }))
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument()
  })

  it('calls onBack from the back button', () => {
    const onBack = vi.fn()
    render(<TicTacToe onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})

describe('TicTacToe friend game', () => {
  it('starts with nine empty cells and X to play', () => {
    render(<TicTacToe />)
    startGame()
    expect(cells()).toHaveLength(9)
    expect(screen.getByText("X's turn")).toBeInTheDocument()
  })

  it('alternates X and O as cells are played', () => {
    render(<TicTacToe />)
    startGame()
    fireEvent.click(cells()[0])
    expect(cells()[0]).toHaveTextContent('X')
    expect(screen.getByText("O's turn")).toBeInTheDocument()

    fireEvent.click(cells()[4])
    expect(cells()[4]).toHaveTextContent('O')
    expect(screen.getByText("X's turn")).toBeInTheDocument()
  })

  it('ignores clicks on occupied cells', () => {
    render(<TicTacToe />)
    startGame()
    fireEvent.click(cells()[0])
    fireEvent.click(cells()[0])
    expect(cells()[0]).toHaveTextContent('X')
    expect(screen.getByText("O's turn")).toBeInTheDocument()
  })

  it('announces the winner and stops accepting moves', () => {
    render(<TicTacToe />)
    startGame()
    winForX()
    expect(screen.getByText('X wins')).toBeInTheDocument()
    fireEvent.click(cells()[5])
    expect(cells()[5]).toBeEmptyDOMElement()
  })

  it('announces a draw when the board fills up', () => {
    render(<TicTacToe />)
    startGame()
    ;[0, 1, 2, 4, 3, 5, 7, 6, 8].forEach((index) => fireEvent.click(cells()[index]))
    expect(screen.getByText('Draw')).toBeInTheDocument()
  })
})

describe('TicTacToe bot game', () => {
  it('lets the bot take its turn after you move', async () => {
    render(<TicTacToe botDelay={0} />)
    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    startGame()

    fireEvent.click(cells()[0])

    await waitFor(() => {
      const filled = cells().filter((cell) => cell.textContent !== '')
      expect(filled).toHaveLength(2)
    })
    expect(screen.getByText('Your turn')).toBeInTheDocument()
  })

  it('ignores clicks while the bot is taking its turn', () => {
    render(<TicTacToe botDelay={1000} />)
    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    startGame()

    fireEvent.click(cells()[0])
    expect(screen.getByText('Bot is thinking…')).toBeInTheDocument()

    fireEvent.click(cells()[4])
    expect(cells()[4]).toBeEmptyDOMElement()
  })
})

describe('TicTacToe score sheet', () => {
  it('starts with a zeroed row for every mode', () => {
    render(<TicTacToe />)
    startGame()
    for (const label of ['friend', 'beginner', 'pro', 'expert']) {
      expect(rowCounts(label)).toHaveLength(3)
      rowCounts(label).forEach((cell) => expect(cell).toHaveTextContent('0'))
    }
  })

  it('labels the columns X and O for a friend game', () => {
    render(<TicTacToe />)
    startGame()
    expect(screen.getByRole('columnheader', { name: 'X' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'O' })).toBeInTheDocument()
  })

  it('labels the columns You and Bot for a bot game', () => {
    render(<TicTacToe botDelay={1000} />)
    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    startGame()
    expect(screen.getByRole('columnheader', { name: 'You' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Bot' })).toBeInTheDocument()
  })

  it('tallies a friend win only in the friend row', () => {
    render(<TicTacToe />)
    startGame()
    winForX()

    expect(rowCounts('friend')[0]).toHaveTextContent('1')
    expect(rowCounts('expert')[0]).toHaveTextContent('0')
  })

  it('resets every row when Reset scores is clicked', () => {
    render(<TicTacToe />)
    startGame()
    winForX()
    fireEvent.click(screen.getByRole('button', { name: /reset scores/i }))

    rowCounts('friend').forEach((cell) => expect(cell).toHaveTextContent('0'))
  })

  it('persists scores across remounts', () => {
    const first = render(<TicTacToe />)
    startGame()
    winForX()
    first.unmount()

    render(<TicTacToe />)
    startGame()
    expect(rowCounts('friend')[0]).toHaveTextContent('1')
  })
})
