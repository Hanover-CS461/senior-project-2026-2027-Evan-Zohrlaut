import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('renders the launcher heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'EZ-Games' })).toBeInTheDocument()
  })

  it('renders the game slots from the games list', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Tic Tac Toe' })).toBeInTheDocument()
    expect(screen.getAllByText('Coming Soon')).toHaveLength(2)
  })
})
