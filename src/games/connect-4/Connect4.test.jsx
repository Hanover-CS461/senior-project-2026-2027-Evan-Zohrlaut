import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import Connect4 from './Connect4.jsx'
import { COLS } from './logic.js'

function cellButtons() {
  return screen.getAllByRole('button', {
    name: /^(Column \d+, row \d+|Drop in column \d+)/i,
  })
}

function columnButtons(col) {
  return screen.getAllByRole('button', {
    name: new RegExp(`^(Column ${col + 1},|Drop in column ${col + 1}$)`, 'i'),
  })
}

function dropInColumn(col) {
  const target = columnButtons(col).find((button) => !button.disabled)
  fireEvent.click(target)
}

function filledCells() {
  return cellButtons().filter(
    (button) =>
      button.className.includes('c4__cell--red') ||
      button.className.includes('c4__cell--yellow'),
  )
}

function startGame() {
  fireEvent.click(screen.getByRole('button', { name: /start game/i }))
}

function redWins() {
  dropInColumn(0)
  dropInColumn(1)
  dropInColumn(0)
  dropInColumn(1)
  dropInColumn(0)
  dropInColumn(1)
  dropInColumn(0)
}

function rowCounts(label) {
  return within(screen.getByRole('row', { name: new RegExp(label, 'i') })).getAllByRole(
    'cell',
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('Connect4 setup', () => {
  it('opens on the setup screen with no board', () => {
    render(<Connect4 />)
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play a friend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play the bot/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^Column /i })).not.toBeInTheDocument()
  })

  it('shows difficulty options only for the bot', () => {
    render(<Connect4 />)
    expect(screen.queryByRole('button', { name: /beginner/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    expect(screen.getByRole('button', { name: /beginner/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /pro/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /expert/i })).toBeInTheDocument()
  })

  it('returns to setup from Change setup', () => {
    render(<Connect4 />)
    startGame()
    fireEvent.click(screen.getByRole('button', { name: /change setup/i }))
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument()
  })

  it('calls onBack from the back button', () => {
    const onBack = vi.fn()
    render(<Connect4 onBack={onBack} />)
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})

describe('Connect4 friend game', () => {
  it('starts with 42 empty cells and Red to play', () => {
    render(<Connect4 />)
    startGame()
    expect(cellButtons()).toHaveLength(42)
    expect(screen.getByText("Red's turn")).toBeInTheDocument()
  })

  it('only enables the top row as drop targets', () => {
    render(<Connect4 />)
    startGame()

    for (let col = 0; col < COLS; col += 1) {
      const enabled = columnButtons(col).filter((button) => !button.disabled)
      expect(enabled).toHaveLength(1)
      expect(enabled[0]).toHaveAccessibleName(
        new RegExp(`^Drop in column ${col + 1}$`, 'i'),
      )
    }
  })

  it('drops a piece to the bottom of the chosen column', () => {
    render(<Connect4 />)
    startGame()
    dropInColumn(0)
    expect(
      screen.getByRole('button', { name: /^Column 1, row 6, red$/i }),
    ).toBeInTheDocument()
  })

  it('alternates Red and Yellow as columns are played', () => {
    render(<Connect4 />)
    startGame()
    dropInColumn(0)
    expect(screen.getByText("Yellow's turn")).toBeInTheDocument()

    dropInColumn(1)
    expect(screen.getByText("Red's turn")).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /^Column 2, row 6, yellow$/i }),
    ).toBeInTheDocument()
  })

  it('disables a column once it is full', () => {
    render(<Connect4 />)
    startGame()
    for (let i = 0; i < 6; i += 1) dropInColumn(0)
    columnButtons(0).forEach((button) => expect(button).toBeDisabled())
  })

  it('announces the winner', () => {
    render(<Connect4 />)
    startGame()
    redWins()
    expect(screen.getByText('Red wins')).toBeInTheDocument()
  })
})

describe('Connect4 bot game', () => {
  it('lets the bot take its turn after you move', async () => {
    render(<Connect4 botDelay={0} />)
    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    startGame()

    dropInColumn(3)

    await waitFor(() => {
      expect(filledCells()).toHaveLength(2)
    })
  })

  it('ignores moves while the bot is thinking', () => {
    render(<Connect4 botDelay={1000} />)
    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    startGame()

    dropInColumn(3)
    expect(screen.getByText('Bot is thinking…')).toBeInTheDocument()
    expect(filledCells()).toHaveLength(1)
  })

  it('labels the score columns You and Bot', () => {
    render(<Connect4 botDelay={1000} />)
    fireEvent.click(screen.getByRole('button', { name: /play the bot/i }))
    startGame()
    expect(screen.getByRole('columnheader', { name: 'You' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Bot' })).toBeInTheDocument()
  })
})

describe('Connect4 score sheet', () => {
  it('starts with a zeroed row for every mode', () => {
    render(<Connect4 />)
    startGame()
    for (const label of ['friend', 'beginner', 'pro', 'expert']) {
      expect(rowCounts(label)).toHaveLength(3)
      rowCounts(label).forEach((cell) => expect(cell).toHaveTextContent('0'))
    }
  })

  it('labels the columns Red and Yellow for a friend game', () => {
    render(<Connect4 />)
    startGame()
    expect(screen.getByRole('columnheader', { name: 'Red' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Yellow' })).toBeInTheDocument()
  })

  it('tallies a friend win only in the friend row', () => {
    render(<Connect4 />)
    startGame()
    redWins()

    expect(rowCounts('friend')[0]).toHaveTextContent('1')
    expect(rowCounts('expert')[0]).toHaveTextContent('0')
  })

  it('resets every row when Reset scores is clicked', () => {
    render(<Connect4 />)
    startGame()
    redWins()
    fireEvent.click(screen.getByRole('button', { name: /reset scores/i }))

    rowCounts('friend').forEach((cell) => expect(cell).toHaveTextContent('0'))
  })

  it('persists scores across remounts', () => {
    const first = render(<Connect4 />)
    startGame()
    redWins()
    first.unmount()

    render(<Connect4 />)
    startGame()
    expect(rowCounts('friend')[0]).toHaveTextContent('1')
  })
})
