export const THEME_STORAGE_KEY = 'ez-games-theme'

export const DEFAULT_THEME = 'blue'

export const THEMES = {
  blue: {
    label: 'Blue',
    swatch: '#7aa2f7',
    vars: {
      '--color-bg': '#1e1e2e',
      '--color-surface': '#2a2a3c',
      '--color-slot-border': '#3b3b52',
      '--color-accent': '#7aa2f7',
      '--color-muted': '#a6adc0',
    },
  },
  red: {
    label: 'Red',
    swatch: '#f7768e',
    vars: {
      '--color-bg': '#2a1a1e',
      '--color-surface': '#38232a',
      '--color-slot-border': '#4d3038',
      '--color-accent': '#f7768e',
      '--color-muted': '#c0a6ac',
    },
  },
  green: {
    label: 'Green',
    swatch: '#9ece6a',
    vars: {
      '--color-bg': '#1a2a20',
      '--color-surface': '#23382c',
      '--color-slot-border': '#304d3b',
      '--color-accent': '#9ece6a',
      '--color-muted': '#a6c0b0',
    },
  },
  purple: {
    label: 'Purple',
    swatch: '#bb9af7',
    vars: {
      '--color-bg': '#241a2e',
      '--color-surface': '#32233c',
      '--color-slot-border': '#443052',
      '--color-accent': '#bb9af7',
      '--color-muted': '#b3a6c0',
    },
  },
  orange: {
    label: 'Orange',
    swatch: '#ff9e64',
    vars: {
      '--color-bg': '#2a2018',
      '--color-surface': '#382b1f',
      '--color-slot-border': '#4d3a29',
      '--color-accent': '#ff9e64',
      '--color-muted': '#c0b0a0',
    },
  },
  pink: {
    label: 'Pink',
    swatch: '#f776c8',
    vars: {
      '--color-bg': '#2a1a26',
      '--color-surface': '#382333',
      '--color-slot-border': '#4d3047',
      '--color-accent': '#f776c8',
      '--color-muted': '#c0a6b8',
    },
  },
}

export function isTheme(id) {
  return Object.prototype.hasOwnProperty.call(THEMES, id)
}

export function loadTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(stored) ? stored : DEFAULT_THEME
}

export function saveTheme(id) {
  localStorage.setItem(THEME_STORAGE_KEY, id)
}

export function applyTheme(id) {
  const theme = THEMES[id] ?? THEMES[DEFAULT_THEME]
  const root = document.documentElement
  for (const [property, value] of Object.entries(theme.vars)) {
    root.style.setProperty(property, value)
  }
}
