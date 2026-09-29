import './Header.css'

function Header({ title, tagline }) {
  return (
    <header className="header">
      <svg className="header__logo" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="10" fill="var(--color-accent)" />
        <path
          d="M17 17l14 14M31 17L17 31"
          stroke="var(--color-bg)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div className="header__text">
        <h1 className="header__title">{title}</h1>
        <p className="header__tagline">{tagline}</p>
      </div>
    </header>
  )
}

export default Header