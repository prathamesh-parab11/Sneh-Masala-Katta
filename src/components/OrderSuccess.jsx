function OrderSuccess({
  order,
  orderOpen,
  onClose,
}) {
  if (!orderOpen || !order) {
    return null
  }

  return (
    <div
      className="success-overlay"
      onClick={onClose}
    >
      <div
        className="success-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* Success Icon */}

        <div className="success-icon">
          ✓
        </div>

        {/* Heading */}

        <p className="success-label">
          ORDER CONFIRMED
        </p>

        <h2>
          Thank You, {order.name}! 🎉
        </h2>

        <p className="success-message">
          Your delicious Sneh Masala Katta
          order has been successfully placed.
        </p>

        {/* Order Number */}

        <div className="order-number">
          <span>ORDER NUMBER</span>

          <strong>
            SMK-{order.orderNumber}
          </strong>
        </div>

        {/* Delivery */}

        <div className="delivery-info">

          <div>
            <span>📦</span>

            <div>
              <strong>
                Delivery Address
              </strong>

              <p>
                {order.address}, {order.city}
                {' - '}
                {order.pincode}
              </p>
            </div>
          </div>

          <div>
            <span>🚚</span>

            <div>
              <strong>
                Estimated Delivery
              </strong>

              <p>
                2–4 business days
              </p>
            </div>
          </div>

        </div>

        {/* Button */}

        <button
          className="success-btn"
          onClick={onClose}
        >
          Continue Shopping 🌶️
        </button>

      </div>
    </div>
  )
}

export default OrderSuccess
