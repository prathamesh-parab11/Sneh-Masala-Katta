function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}) {
  return (
    <article className="product-card">

      {/* Product Image */}

      <div className="product-image">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-real-image"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
              event.currentTarget.nextElementSibling.style.display = 'block'
            }}
          />
        ) : null}

        <div
          className="product-emoji"
          style={{
            display: product.image ? 'none' : 'block',
          }}
        >
          {product.emoji}
        </div>

        <span className="product-category">
          {product.category}
        </span>

      </div>

      {/* Product Info */}

      <div className="product-info">

        <p className="product-label">
          SNEH MASALA KATTA
        </p>

        <h3>
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">

          <div className="product-price">
            ₹{product.price}
          </div>

          <button
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            + Add
          </button>

        </div>

        <button
          className="view-product-btn"
          onClick={() => onViewDetails(product)}
        >
          View Details →
        </button>

      </div>

    </article>
  )
}

export default ProductCard
