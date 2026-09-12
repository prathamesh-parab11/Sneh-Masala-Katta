import { useState } from 'react'

function ProductDetails({
  product,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return null
  }

  const total = product.price * quantity

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product)
    }

    onClose()
  }

  return (
    <div
      className="product-modal-overlay"
      onClick={onClose}
    >
      <div
        className="product-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* Close button */}
        <button
          className="product-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        {/* Product image */}
        <div className="product-modal-image">
          <span>{product.emoji}</span>
        </div>

        {/* Product information */}
        <div className="product-modal-content">

          <p className="product-category">
            {product.category.toUpperCase()}
          </p>

          <h2>{product.name}</h2>

          <div className="product-rating">
            ⭐⭐⭐⭐⭐ <span>5.0</span>
          </div>

          <div className="detail-price">
            ₹{product.price}
          </div>

          <p className="detail-description">
            {product.description}
          </p>

          {/* Benefits */}
          <div className="product-benefits">

            <div>
              <span>🌿</span>
              <p>Fresh Ingredients</p>
            </div>

            <div>
              <span>✨</span>
              <p>Authentic Flavour</p>
            </div>

            <div>
              <span>❤️</span>
              <p>Made With Love</p>
            </div>

          </div>

          {/* Quantity + Cart */}
          <div className="detail-order">

            <div className="detail-quantity">

              <button
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

            <button
              className="detail-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart — ₹{total}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails
