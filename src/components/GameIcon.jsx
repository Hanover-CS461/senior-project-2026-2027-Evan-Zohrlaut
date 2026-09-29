function GameIcon({ variant = 'plus' }) {
  const isX = variant === 'x'
  return (
    <svg className="game-slot__icon" viewBox="0 0 64 64" aria-hidden="true">
      {isX ? (
        <path
          d="M18 18l28 28M46 18L18 46"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ) : (
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