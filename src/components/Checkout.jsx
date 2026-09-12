import { useState } from 'react'

function Checkout({
  cart,
  checkoutOpen,
  onClose,
  onOrderPlaced,
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

const handleSubmit = async (event) => {
  event.preventDefault()

  const name = form.name.trim()
  const phone = form.phone.trim()
  const address = form.address.trim()
  const city = form.city.trim()
  const pincode = form.pincode.trim()

  if (!name || !phone || !address || !city || !pincode) {
    alert('Please fill all the details.')
    return
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert('Please enter a valid 10-digit mobile number.')
    return
  }

  if (!/^\d{6}$/.test(pincode)) {
    alert('Please enter a valid 6-digit pincode.')
    return
  }

  try {
    const response = await fetch(
      'http://127.0.0.1:5000/api/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          city,
          pincode,
          items: cart,
          total: cartTotal,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to place order.'
      )
    }

    onOrderPlaced({
      name,
      phone,
      address,
      city,
      pincode,
      orderNumber: data.orderNumber,
    })
  } catch (error) {
    console.error('Order error:', error)

    alert(
      'Unable to place your order. Please try again.'
    )
  }
}


  if (!checkoutOpen) {
    return null
  }

  return (
    <div
      className="checkout-overlay"
      onClick={onClose}
    >
      <div
        className="checkout-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* Header */}

        <div className="checkout-header">

          <div>
            <p>ALMOST THERE</p>

            <h2>
              Complete Your Order 🛒
            </h2>
          </div>

          <button
            className="checkout-close"
            onClick={onClose}
            aria-label="Close checkout"
          >
            ✕
          </button>

        </div>

        {/* Content */}

        <div className="checkout-content">

          {/* Form */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h3>Delivery Details</h3>

            <div className="form-group">

              <label htmlFor="checkout-name">
                Full Name
              </label>

              <input
                id="checkout-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />

            </div>

            <div className="form-group">

              <label htmlFor="checkout-phone">
                Mobile Number
              </label>

              <input
                id="checkout-phone"
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
                maxLength="10"
                autoComplete="tel"
              />

            </div>

            <div className="form-group">

              <label htmlFor="checkout-address">
                Delivery Address
              </label>

              <textarea
                id="checkout-address"
                name="address"
                placeholder="House no., street, area..."
                rows="3"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="checkout-city">
                  City
                </label>

                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                />

              </div>

              <div className="form-group">

                <label htmlFor="checkout-pincode">
                  Pincode
                </label>

                <input
                  id="checkout-pincode"
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  maxLength="6"
                  inputMode="numeric"
                  autoComplete="postal-code"
                />

              </div>

            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={cart.length === 0}
            >
              Place Order — ₹{cartTotal}
            </button>

          </form>

          {/* Order Summary */}

          <div className="checkout-summary">

            <h3>Your Order</h3>

            <div className="checkout-items">

              {cart.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-item-image">
                    {item.emoji}
                  </div>

                  <div>
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>

            <div className="checkout-total">

              <span>Total</span>

              <strong>
                ₹{cartTotal}
              </strong>

            </div>

            <div className="secure-message">
              🔒 Your order details are safe with us.
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Checkout
