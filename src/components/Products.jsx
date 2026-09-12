import { useState } from 'react'
import ProductCard from './ProductCard'

function Products({
  products,
  onAddToCart,
  onViewDetails,
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  // Get all categories from products
  const categories = [
    'All',
    ...new Set(
      products.map((product) => product.category)
    ),
  ]

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' ||
      product.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <section id="shop" className="products-section">

      {/* Heading */}
      <div className="section-heading">
        <p>OUR SPECIALITIES</p>

        <h2>Popular Masalas</h2>

        <span>
          Discover the flavours that make every meal special.
        </span>
      </div>

      {/* Search */}
      <div className="product-controls">

        <div className="search-box">
          <span>🔎</span>

          <input
            type="text"
            placeholder="Search your favourite masala..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch('')}
            >
              ×
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="category-buttons">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? 'active-category'
                  : ''
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      {/* Result count */}
      <div className="product-result">

        <span>
          Showing {filteredProducts.length}{' '}
          {filteredProducts.length === 1
            ? 'product'
            : 'products'}
        </span>

        {(search || category !== 'All') && (
          <button
            onClick={() => {
              setSearch('')
              setCategory('All')
            }}
          >
            Clear filters
          </button>
        )}

      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (

        <div className="product-grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}

        </div>

      ) : (

        /* No products */
        <div className="no-products">

          <span>😕</span>

          <h3>No masalas found</h3>

          <p>
            We couldn't find anything matching
            "{search}".
          </p>

          <button
            className="primary-btn"
            onClick={() => {
              setSearch('')
              setCategory('All')
            }}
          >
            Show All Masalas
          </button>

        </div>

      )}

    </section>
  )
}

export default Products
