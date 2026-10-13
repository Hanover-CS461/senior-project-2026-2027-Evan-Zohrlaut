import { describe, it, expect, beforeEach } from 'vitest'
import {
  SCORES_STORAGE_KEY,
  MODES,
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
      expect(scores[mode]).toEqual({ X: 0, O: 0, draws: 0 })
    }
  })
})

describe('loadScores', () => {
  it('returns zeroed scores when nothing is stored', () => {
    expect(loadScores()).toEqual(createScores())
  })

  it('reads stored per-mode scores', () => {
    const stored = createScores()
    stored['bot-pro'] = { X: 2, O: 1, draws: 0 }
    localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(stored))

    expect(loadScores()['bot-pro']).toEqual({ X: 2, O: 1, draws: 0 })
  })

  it('migrates the legacy flat score sheet into the friend mode', () => {
    localStorage.setItem(
      SCORES_STORAGE_KEY,
      JSON.stringify({ X: 3, O: 1, draws: 2 }),
    )

    const scores = loadScores()
    expect(scores.friend).toEqual({ X: 3, O: 1, draws: 2 })
    expect(scores['bot-expert']).toEqual({ X: 0, O: 0, draws: 0 })
  })

  it('falls back to zeroed scores on invalid JSON', () => {
    localStorage.setItem(SCORES_STORAGE_KEY, 'not json')
    expect(loadScores()).toEqual(createScores())
  })

  it('normalizes missing or invalid counts', () => {
    localStorage.setItem(
      SCORES_STORAGE_KEY,
      JSON.stringify({ friend: { X: 'lots' }, 'bot-pro': null }),
    )

    const scores = loadScores()
    expect(scores.friend).toEqual({ X: 0, O: 0, draws: 0 })
    expect(scores['bot-pro']).toEqual({ X: 0, O: 0, draws: 0 })
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
    scores.friend = { X: 1, O: 2, draws: 3 }
    saveScores(scores)

    expect(JSON.parse(localStorage.getItem(SCORES_STORAGE_KEY)).friend).toEqual({
      X: 1,
      O: 2,
      draws: 3,
    })
  })
})
