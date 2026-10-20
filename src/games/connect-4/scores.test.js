import { describe, it, expect, beforeEach } from 'vitest'
import {
  MODES,
  SCORES_STORAGE_KEY,
  createScores,
  loadScores,
  modeKey,
  normalizeScores,
  saveScores,
} from './scores.js'

beforeEach(() => {
  localStorage.clear()
})

describe('modeKey', () => {
  it('maps friend games to the friend mode', () => {
    expect(modeKey('friend', 'expert')).toBe('friend')
  })

  it('maps bot games to a difficulty-specific mode', () => {
    expect(modeKey('bot', 'pro')).toBe('bot-pro')
  })
})

describe('createScores', () => {
  it('creates a zeroed result for every mode', () => {
    const scores = createScores()
    expect(Object.keys(scores)).toEqual(MODES)
    for (const mode of MODES) {
      expect(scores[mode]).toEqual({ red: 0, yellow: 0, draws: 0 })
    }
  })
})

describe('loadScores', () => {
  it('returns zeroed scores when nothing is stored', () => {
    expect(loadScores()).toEqual(createScores())
  })

  it('reads stored per-mode scores', () => {
    const stored = createScores()
    stored['bot-pro'] = { red: 2, yellow: 1, draws: 0 }
    localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(stored))

    expect(loadScores()['bot-pro']).toEqual({ red: 2, yellow: 1, draws: 0 })
  })

  it('falls back to zeroed scores on invalid JSON', () => {
    localStorage.setItem(SCORES_STORAGE_KEY, 'not json')
    expect(loadScores()).toEqual(createScores())
  })

  it('normalizes missing or invalid counts', () => {
    localStorage.setItem(
      SCORES_STORAGE_KEY,
      JSON.stringify({ friend: { red: 'lots' }, 'bot-pro': null }),
    )

    const scores = loadScores()
    expect(scores.friend).toEqual({ red: 0, yellow: 0, draws: 0 })
    expect(scores['bot-pro']).toEqual({ red: 0, yellow: 0, draws: 0 })
  })
})

describe('normalizeScores', () => {
  it('ignores non-object input', () => {
    expect(normalizeScores(null)).toEqual(createScores())
  })
})

describe('saveScores', () => {
  it('writes normalized scores as JSON', () => {
    const scores = createScores()
    scores.friend = { red: 1, yellow: 2, draws: 3 }
    saveScores(scores)

    expect(JSON.parse(localStorage.getItem(SCORES_STORAGE_KEY)).friend).toEqual({
      red: 1,
      yellow: 2,
      draws: 3,
    })
  })
})
