function GameIcon({ variant = 'plus' }) {
  return (
    <svg className="game-slot__icon" viewBox="0 0 64 64" aria-hidden="true">
      {variant === 'x' && (
        <path
          d="M18 18l28 28M46 18L18 46"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
      {variant === 'connect-4' && (
        <>
          <circle cx="11" cy="32" r="6.5" fill="var(--color-accent)" />
          <circle cx="25" cy="32" r="6.5" fill="var(--color-accent)" />
          <circle cx="39" cy="32" r="6.5" fill="var(--color-accent)" />
          <circle cx="53" cy="32" r="6.5" fill="var(--color-muted)" />
        </>
      )}
      {variant === 'plus' && (
        <path
          d="M32 20v24M20 32h24"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default GameIcon
