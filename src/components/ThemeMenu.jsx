import { useEffect, useRef, useState } from 'react'
import { THEMES } from '../themes.js'
import './ThemeMenu.css'

function ThemeMenu({ theme, onThemeChange }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function selectTheme(id) {
    onThemeChange(id)
    setOpen(false)
  }

  const current = THEMES[theme]

  return (
    <div className="theme-menu" ref={menuRef}>
      <button
        type="button"
        className="theme-menu__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className="theme-menu__swatch"
          style={{ background: current.swatch }}
          aria-hidden="true"
        />
        <span className="theme-menu__label">{current.label}</span>
      </button>

      {open && (
        <ul className="theme-menu__list" role="menu">
          {Object.entries(THEMES).map(([id, entry]) => (
            <li key={id} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={id === theme}
                className="theme-menu__item"
                onClick={() => selectTheme(id)}
              >
                <span
                  className="theme-menu__swatch"
                  style={{ background: entry.swatch }}
                  aria-hidden="true"
                />
                {entry.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ThemeMenu
