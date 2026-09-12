import React from 'react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      {/* Top accent bar inspired by rich spice colors */}
      <div className="footer-accent-bar" />

      <div className="footer-container">
        <div className="footer-main">

          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo-group">
              <span className="footer-logo-icon">🌶️</span>
              <h2>Sneh Masala Katta</h2>
            </div>
            <p className="footer-tagline">स्वादाची परंपरा</p>
            <p className="footer-description">
              Authentic Indian masalas crafted with handpicked, aromatic spices.
              Bringing traditional Maharashtrian flavors straight to your kitchen.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Instagram" className="social-btn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-btn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="social-btn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop Masalas</a></li>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Product Category Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Our Masalas</h3>
            <ul className="footer-links">
              <li><a href="#shop">Garam Masala</a></li>
              <li><a href="#shop">Chicken Masala</a></li>
              <li><a href="#shop">Misal Masala</a></li>
              <li><a href="#shop">Biryani Masala</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-column footer-contact">
            <h3 className="footer-heading">Get In Touch</h3>
            <ul className="footer-contact-info">
              <li>
                <span className="contact-icon">📍</span>
                <span>Pune, Maharashtra, India</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span>hello@snehmasalakatta.com</span>
              </li>
            </ul>
            <div className="footer-badge">
              Made with ❤️ in Maharashtra
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 Sneh Masala Katta. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="back-to-top"
            type="button"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="arrow-icon">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;