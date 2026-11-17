import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App, { GAMES } from './App.jsx'

const playableGames = GAMES.filter((game) => game.component)
const comingSoonGames = GAMES.filter((game) => !game.component)

describe('App', () => {
  it('renders the launcher heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'EZ-Games' })).toBeInTheDocument()
  })

  it('renders one tile per game in the registry', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(GAMES.length)
  })

  it('marks every component-less game as coming soon', () => {
    render(<App />)
    expect(screen.queryAllByText('Coming Soon')).toHaveLength(comingSoonGames.length)
  })

  it('links every playable game to its hash route', () => {
    render(<App />)
    for (const game of playableGames) {
      const link = screen.getByRole('link', { name: new RegExp(game.name, 'i') })
      expect(link).toHaveAttribute('href', `#/${game.id}`)
    }
  })
})
