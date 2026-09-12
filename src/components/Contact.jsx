function Contact() {
  return (
    <section id="contact" className="contact-section">

      <div className="contact-heading">
        <p>GET IN TOUCH</p>

        <h2>
          Let's Talk
          <span> Masala.</span>
        </h2>

        <p className="contact-description">
          Have a question about our masalas, want to
          place a bulk order, or simply want to say hello?
          We'd love to hear from you.
        </p>
      </div>

      <div className="contact-grid">

        {/* Contact information */}

        <div className="contact-info">

          <div className="contact-card">
            <div className="contact-icon">
              📍
            </div>

            <div>
              <span>Visit Us</span>

              <strong>
                Sneh Masala Katta
              </strong>

              <p>
                Pune, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              📞
            </div>

            <div>
              <span>Call Us</span>

              <strong>
                +91 XXXXX XXXXX
              </strong>

              <p>
                Mon - Sat, 9 AM - 7 PM
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              ✉️
            </div>

            <div>
              <span>Email Us</span>

              <strong>
                hello@snehmasalakatta.com
              </strong>

              <p>
                We usually reply within 24 hours
              </p>
            </div>
          </div>

        </div>

        {/* Contact form */}

        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault()
            alert('Thank you! We will get back to you soon. 🌶️')
          }}
        >

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="name">
                Your Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Your Message
            </label>

            <textarea
              id="message"
              rows="5"
              placeholder="Tell us how we can help..."
              required
            />
          </div>

          <button
            type="submit"
            className="contact-submit"
          >
            Send Message 🌶️
          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact