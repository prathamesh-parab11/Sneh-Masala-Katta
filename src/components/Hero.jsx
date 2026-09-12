function Hero() {
  const scrollToProducts = () => {
    document
      .getElementById('shop')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section">

      <div className="hero-content">

        <div className="hero-badge">
          🌶️ AUTHENTIC INDIAN FLAVOURS
        </div>

        <h1>
          Taste the
          <span> Tradition.</span>
        </h1>

        <p className="hero-subtitle">
          Handcrafted masalas made with love,
          tradition, and the finest Indian spices.
        </p>

        <p className="hero-description">
          Bring the authentic taste of homemade
          Indian cooking straight to your kitchen.
        </p>

        <div className="hero-buttons">

          <button
            className="hero-primary-btn"
            onClick={scrollToProducts}
          >
            Shop Masalas 🌶️
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() =>
              document
                .getElementById('about')
                ?.scrollIntoView({
                  behavior: 'smooth',
                })
            }
          >
            Our Story →
          </button>

        </div>

        <div className="hero-trust">

          <div>
            <strong>100%</strong>
            <span>Authentic</span>
          </div>

          <div>
            <strong>🌿</strong>
            <span>Fresh Spices</span>
          </div>

          <div>
            <strong>❤️</strong>
            <span>Made With Love</span>
          </div>

        </div>

      </div>

      <div className="hero-visual">

        <div className="hero-circle">

          <div className="hero-spice-card spice-one">
            🌶️
          </div>

          <div className="hero-spice-card spice-two">
            🫚
          </div>

          <div className="hero-spice-card spice-three">
            🌿
          </div>

          <div className="hero-main-product">
            <span>🌶️</span>
            <strong>
              SNEH
              <br />
              MASALA
              <br />
              KATTA
            </strong>
            <small>
              AUTHENTIC FLAVOURS
            </small>
          </div>

        </div>

        <div className="hero-floating-text">
          <span>✨</span>
          Traditional
          <br />
          Taste
        </div>

      </div>

    </section>
  )
}

export default Hero
