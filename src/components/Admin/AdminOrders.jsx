import { useEffect, useState } from 'react'

function AdminOrders({ onLogout }) {  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        'https://sneh-masala-katta-backend.onrender.com/api/orders',
        {
          credentials: 'include',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to load orders.'
        )
      }

      setOrders(data.orders)
    } catch (error) {
      console.error('Orders error:', error)
      setError('Unable to load orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <section className="admin-orders">
        <h2>Orders</h2>
        <p>Loading orders...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="admin-orders">
        <h2>Orders</h2>
        <p>{error}</p>

        <button onClick={fetchOrders}>
          Try Again
        </button>
      </section>
    )
  }

  return (
    <section className="admin-orders">
<div className="admin-orders-header">
  <div>
    <p>ADMIN PANEL</p>
    <h2>Customer Orders</h2>
  </div>

  <div>
    <button onClick={fetchOrders}>
      Refresh
    </button>

    <button onClick={onLogout}>
      Logout
    </button>
  </div>
</div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No orders yet</h3>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <div className="order-card-header">
                <div>
                  <span>ORDER</span>
                  <h3>{order.orderNumber}</h3>
                </div>

                <strong>
                  ₹{order.total}
                </strong>
              </div>

              <div className="customer-info">
                <p>
                  <strong>Customer:</strong>{' '}
                  {order.name}
                </p>

                <p>
                  <strong>Phone:</strong>{' '}
                  {order.phone}
                </p>

                <p>
                  <strong>Address:</strong>{' '}
                  {order.address}, {order.city} -{' '}
                  {order.pincode}
                </p>
              </div>

              <div className="order-items">
                <h4>Items</h4>

                {order.items.map((item) => (
                  <div
                    className="admin-order-item"
                    key={item.productId}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      ₹{item.subtotal}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-date">
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminOrders