export const SCORES_STORAGE_KEY = 'ez-games-tic-tac-toe-scores'

export const MODES = ['friend', 'bot-beginner', 'bot-pro', 'bot-expert']

export const MODE_LABELS = {
  friend: 'Friend',
  'bot-beginner': 'Bot · Beginner',
  'bot-pro': 'Bot · Pro',
  'bot-expert': 'Bot · Expert',
}

export const EMPTY_RESULT = { X: 0, O: 0, draws: 0 }

export function modeKey(opponent, difficulty) {
  return opponent === 'bot' ? `bot-${difficulty}` : 'friend'
}

export function createScores() {
  const scores = {}
  for (const mode of MODES) {
    scores[mode] = { ...EMPTY_RESULT }
  }
  return scores
}

function toCount(value) {
  return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0
}

function normalizeResult(value) {
  if (!value || typeof value !== 'object') {
    return { ...EMPTY_RESULT }
  }
  return {
    X: toCount(value.X),
    O: toCount(value.O),
    draws: toCount(value.draws),
  }
}

function isLegacy(value) {
  if (!value || typeof value !== 'object') return false
  return !MODES.some((mode) => mode in value)
}

export function normalizeScores(value) {
  const scores = createScores()

  if (isLegacy(value)) {
    scores.friend = normalizeResult(value)
    return scores
  }

  for (const mode of MODES) {
    scores[mode] = normalizeResult(value?.[mode])
  }
  return scores
}

export function loadScores() {
  try {
    return normalizeScores(JSON.parse(localStorage.getItem(SCORES_STORAGE_KEY)))
  } catch {
    return createScores()
  }
}

export function saveScores(scores) {
  localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(normalizeScores(scores)))
}
