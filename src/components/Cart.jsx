function Cart({
  cart,
  cartOpen,
  onClose,
  onIncrease,
  onDecrease,
    onCheckout,
}) {
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  if (!cartOpen) {
    return null
  }

  return (
    <div
      className="cart-overlay"
      onClick={onClose}
    >
      <aside
        className="cart-panel"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* Cart Header */}
        <div className="cart-header">
          <div>
            <p>YOUR ORDER</p>
            <h2>Shopping Cart 🛒</h2>
          </div>

          <button
            className="close-cart"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (

          <div className="empty-cart">

            <span>🛒</span>

            <h3>Your cart is empty</h3>

            <p>
              Add some delicious masalas
              to get started.
            </p>

            <button
              className="primary-btn"
              onClick={onClose}
            >
              Browse Masalas
            </button>

          </div>

        ) : (

          <>

            {/* Cart Items */}
            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-item-image">
                    {item.emoji}
                  </div>

                  <div className="cart-item-info">

                    <h3>{item.name}</h3>

                    <strong>
                      ₹{item.price}
                    </strong>

                    <div className="quantity">

                      <button
                        onClick={() =>
                          onDecrease(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          onIncrease(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <strong className="item-total">
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>

            {/* Cart Summary */}
            <div className="cart-summary">

              <div>
                <span>Subtotal</span>
                <strong>
                  ₹{cartTotal}
                </strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>FREE</strong>
              </div>

              <div className="cart-total">
                <span>Total</span>
                <strong>
                  ₹{cartTotal}
                </strong>
              </div>

<button
  className="checkout-btn"
  onClick={onCheckout}
>
  Order Now →
</button>

            </div>

          </>

        )}

      </aside>
    </div>
  )
}

export default Cart
