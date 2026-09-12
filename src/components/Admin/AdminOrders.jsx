import { useEffect, useMemo, useState } from 'react'
import './AdminOrders.css'

function AdminOrders({ onLogout }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [editingOrder, setEditingOrder] = useState(null)
  const [saving, setSaving] = useState(false)

  const [deletingOrderId, setDeletingOrderId] = useState(null)

  const API_URL =
    'https://sneh-masala-katta-backend.onrender.com/api/orders'

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(API_URL, {
        credentials: 'include',
      })

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

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return orders
    }

    return orders.filter((order) =>
      [
        order.orderNumber,
        order.name,
        order.phone,
        order.city,
        order.pincode,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
  }, [orders, search])

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  )

  const today = new Date().toDateString()

  const todayOrders = orders.filter(
    (order) =>
      new Date(order.createdAt).toDateString() === today
  )

  const todaySales = todayOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  )

  const openEditModal = (order) => {
    setEditingOrder({
      ...order,
      items: order.items.map((item) => ({
        ...item,
      })),
    })
  }

  const closeEditModal = () => {
    if (!saving) {
      setEditingOrder(null)
    }
  }

  const handleEditChange = (field, value) => {
    setEditingOrder((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleQuantityChange = (itemId, value) => {
    setEditingOrder((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: value,
            }
          : item
      ),
    }))
  }

  const calculateEditTotal = () => {
    if (!editingOrder) {
      return 0
    }

    return editingOrder.items.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    )
  }

  const saveOrder = async () => {
    if (!editingOrder) {
      return
    }

    try {
      setSaving(true)

      const response = await fetch(
        `${API_URL}/${editingOrder.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            name: editingOrder.name,
            phone: editingOrder.phone,
            address: editingOrder.address,
            city: editingOrder.city,
            pincode: editingOrder.pincode,
            items: editingOrder.items.map((item) => ({
              id: item.id,
              quantity: Number(item.quantity),
            })),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update order.'
        )
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === data.order.id
            ? data.order
            : order
        )
      )

      setEditingOrder(null)
    } catch (error) {
      console.error('Update order error:', error)
      alert(error.message || 'Unable to update order.')
    } finally {
      setSaving(false)
    }
  }

  const deleteOrder = async (order) => {
    const confirmed = window.confirm(
      `Delete order ${order.orderNumber}?\n\nThis action cannot be undone.`
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingOrderId(order.id)

      const response = await fetch(
        `${API_URL}/${order.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to delete order.'
        )
      }

      setOrders((currentOrders) =>
        currentOrders.filter(
          (currentOrder) =>
            currentOrder.id !== order.id
        )
      )
    } catch (error) {
      console.error('Delete order error:', error)
      alert(error.message || 'Unable to delete order.')
    } finally {
      setDeletingOrderId(null)
    }
  }

  if (loading) {
    return (
      <section className="admin-page">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="admin-page">
        <div className="admin-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button
            className="admin-primary-button"
            onClick={fetchOrders}
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-header">

        <div>
          <p className="admin-eyebrow">
            ADMIN PANEL
          </p>

          <h1>Customer Orders</h1>

          <p className="admin-subtitle">
            Manage and track your customer orders.
          </p>
        </div>

        <div className="admin-header-actions">

          <button
            className="admin-secondary-button"
            onClick={fetchOrders}
          >
            ↻ Refresh
          </button>

          <button
            className="admin-danger-button"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Today's Orders</span>
          <strong>{todayOrders.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Sales</span>
          <strong>
            ₹{totalSales.toLocaleString('en-IN')}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>Today's Sales</span>
          <strong>
            ₹{todaySales.toLocaleString('en-IN')}
          </strong>
        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="admin-toolbar">

        <div className="admin-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by order number, customer, phone..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch('')}
            >
              ×
            </button>
          )}

        </div>

        <p className="order-count">
          {filteredOrders.length}{' '}
          {filteredOrders.length === 1
            ? 'order'
            : 'orders'}
        </p>

      </div>


      {/* =========================
          ORDERS
      ========================= */}

      {filteredOrders.length === 0 ? (

        <div className="admin-empty">

          <div className="empty-icon">
            📦
          </div>

          <h2>
            {search
              ? 'No matching orders'
              : 'No orders yet'}
          </h2>

          <p>
            {search
              ? 'Try a different search.'
              : 'Customer orders will appear here.'}
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {filteredOrders.map((order) => (

            <article
              className="order-card"
              key={order.id}
            >

              {/* ORDER HEADER */}

              <div className="order-card-top">

                <div>

                  <span className="order-label">
                    ORDER
                  </span>

                  <h2>
                    {order.orderNumber}
                  </h2>

                  <p className="order-date">
                    {new Date(
                      order.createdAt
                    ).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                </div>

                <div className="order-total">
                  ₹
                  {Number(
                    order.total
                  ).toLocaleString('en-IN')}
                </div>

              </div>


              {/* CUSTOMER */}

              <div className="order-section">

                <h3>Customer</h3>

                <div className="customer-grid">

                  <div>
                    <span>Name</span>
                    <strong>{order.name}</strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>{order.phone}</strong>
                  </div>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="order-section">

                <h3>Delivery Address</h3>

                <p className="address-text">
                  {order.address}
                  <br />
                  {order.city} - {order.pincode}
                </p>

              </div>


              {/* ITEMS */}

              <div className="order-section">

                <h3>Items</h3>

                <div className="items-list">

                  {order.items.map((item) => (

                    <div
                      className="admin-order-item"
                      key={item.id}
                    >

                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          ₹{item.price} ×{' '}
                          {item.quantity}
                        </span>
                      </div>

                      <strong>
                        ₹
                        {Number(
                          item.subtotal
                        ).toLocaleString('en-IN')}
                      </strong>

                    </div>

                  ))}

                </div>

              </div>


              {/* ACTIONS */}

              <div className="order-actions">

                <button
                  className="edit-order-button"
                  onClick={() =>
                    openEditModal(order)
                  }
                >
                  ✎ Edit Order
                </button>

                <button
                  className="delete-order-button"
                  onClick={() =>
                    deleteOrder(order)
                  }
                  disabled={
                    deletingOrderId === order.id
                  }
                >
                  {deletingOrderId === order.id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>

              </div>

            </article>

          ))}

        </div>

      )}


      {/* =========================
          EDIT MODAL
      ========================= */}

      {editingOrder && (

        <div
          className="admin-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeEditModal()
            }
          }}
        >

          <div className="admin-modal">

            <div className="modal-header">

              <div>

                <p className="admin-eyebrow">
                  EDIT ORDER
                </p>

                <h2>
                  {editingOrder.orderNumber}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={closeEditModal}
                disabled={saving}
              >
                ×
              </button>

            </div>


            {/* CUSTOMER FIELDS */}

            <div className="modal-section">

              <h3>Customer Information</h3>

              <div className="form-grid">

                <label>
                  Name

                  <input
                    type="text"
                    value={editingOrder.name}
                    onChange={(event) =>
                      handleEditChange(
                        'name',
                        event.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Phone

                  <input
                    type="text"
                    value={editingOrder.phone}
                    onChange={(event) =>
                      handleEditChange(
                        'phone',
                        event.target.value
                      )
                    }
                  />
                </label>

              </div>

              <label>
                Address

                <textarea
                  value={editingOrder.address}
                  onChange={(event) =>
                    handleEditChange(
                      'address',
                      event.target.value
                    )
                  }
                  rows="3"
                />
              </label>

              <div className="form-grid">

                <label>
                  City

                  <input
                    type="text"
                    value={editingOrder.city}
                    onChange={(event) =>
                      handleEditChange(
                        'city',
                        event.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Pincode

                  <input
                    type="text"
                    value={editingOrder.pincode}
                    onChange={(event) =>
                      handleEditChange(
                        'pincode',
                        event.target.value
                      )
                    }
                  />
                </label>

              </div>

            </div>


            {/* ITEMS */}

            <div className="modal-section">

              <h3>Order Items</h3>

              <div className="edit-items">

                {editingOrder.items.map(
                  (item) => (

                    <div
                      className="edit-item"
                      key={item.id}
                    >

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          ₹{item.price} each
                        </span>

                      </div>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          handleQuantityChange(
                            item.id,
                            event.target.value
                          )
                        }
                      />

                      <strong>
                        ₹
                        {(
                          Number(item.price) *
                          Number(
                            item.quantity || 0
                          )
                        ).toLocaleString(
                          'en-IN'
                        )}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* TOTAL */}

            <div className="modal-total">

              <span>Updated Total</span>

              <strong>
                ₹
                {calculateEditTotal().toLocaleString(
                  'en-IN'
                )}
              </strong>

            </div>


            {/* MODAL ACTIONS */}

            <div className="modal-actions">

              <button
                className="admin-secondary-button"
                onClick={closeEditModal}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                className="admin-primary-button"
                onClick={saveOrder}
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}

export default AdminOrders