import { useEffect, useState } from 'react'
import './App.css'
import AdminOrders from './components/Admin/AdminOrders'
import AdminLogin from './components/Admin/AdminLogin'
import products from './data/products'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import WhatsAppButton from './components/WhatsAppButton'


function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)
  const [adminChecking, setAdminChecking] = useState(true)

useEffect(() => {
  if (window.location.pathname !== '/admin') {
    setAdminChecking(false)
    return
  }

  const checkAdminSession = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/check',
        {
          credentials: 'include',
        },
      )

      const data = await response.json()

      setAdminAuthenticated(data.authenticated === true)
    } catch (error) {
      console.error('Admin session check failed:', error)
      setAdminAuthenticated(false)
    } finally {
      setAdminChecking(false)
    }
  }

  checkAdminSession()
}, [])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id,
      )

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })

    setCartOpen(true)
  }


  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }


  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )



// Admin page
if (window.location.pathname === '/admin') {
  if (adminChecking) {
    return <div>Checking admin access...</div>
  }

  if (!adminAuthenticated) {
    return (
      <AdminLogin
        onLogin={() => setAdminAuthenticated(true)}
      />
    )
  }

return (
  <AdminOrders
    onLogout={async () => {
      try {
        await fetch(
          'http://localhost:5000/api/admin/logout',
          {
            method: 'POST',
            credentials: 'include',
          },
        )
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        setAdminAuthenticated(false)
      }
    }}
  />
)}

  return (
    <div className="app">

      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />


      <main id="home">

        <Hero />

        <Features />


        <Products
          products={products}
          onAddToCart={addToCart}
          onViewDetails={setSelectedProduct}
        />


        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />


        <About />

        <Contact />

      </main>


      <Footer />


      <Cart
        cart={cart}
        cartOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onCheckout={() => {
          setCartOpen(false)
          setCheckoutOpen(true)
        }}
      />


      <Checkout
        cart={cart}
        checkoutOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onOrderPlaced={(form) => {
          setOrder(form)
          setCheckoutOpen(false)
          setCart([])
          setOrderOpen(true)
        }}
      />


      <OrderSuccess
        order={order}
        orderOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
      />


      <WhatsAppButton />

    </div>
  )
}


export default App