import { useState } from 'react'

function Navbar({
  cartCount,
  onCartClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">

      <div className="nav-container">

        {/* Brand */}

        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
        >
          <div className="brand-icon">
            🌶️
          </div>

          <div className="brand-text">
            <strong>
              Sneh Masala Katta
            </strong>

            <span>
              स्वादाची परंपरा
            </span>
          </div>
        </a>

        {/* Navigation */}

        <nav
          className={`nav-links ${
            menuOpen ? 'nav-open' : ''
          }`}
        >

          <a
            href="#home"
            onClick={closeMenu}
          >
            Home
          </a>

          <a
            href="#shop"
            onClick={closeMenu}
          >
            Shop
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
          >
            Contact
          </a>

        </nav>

        {/* Actions */}

        <div className="nav-actions">

          <button
            className="cart-button"
            onClick={onCartClick}
            aria-label="Open shopping cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className={`menu-button ${
              menuOpen ? 'menu-active' : ''
            }`}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>

      </div>

    </header>
  )
}

export default Navbar
