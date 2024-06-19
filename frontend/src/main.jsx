import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Register from './pages/Register'
import AddProduct from './pages/AddProduct'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartProvider from './contexts/CartContext';
import SearchResults from './components/SearchResults';
import Profile from './pages/Profile'
import UpdateEmail from './pages/UpdateEmail'
import ResetPassword from './pages/ResetPassword'
import Error from './pages/Error'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import OrderSummary from './pages/OrderSummary'
import { OrderProvider } from './contexts/OrderContext'
import OrderDetails from './pages/OrderDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/addproduct',
    element: <AddProduct />
  },
  {
    path: '/product/:id',
    element: <ProductDetail />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/search',
    element: <SearchResults />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/updateEmail',
    element: <UpdateEmail />
  },
  {
    path: '/resetPassword',
    element: <ResetPassword />
  },
  {
    path: '/shipping',
    element: <Shipping />
  },
  {
    path: '/payment',
    element: <Payment />
  },
  {
    path: '/order-summary',
    element: <OrderSummary />
  },
  {
    path: "/order/:orderId",
    element: <OrderDetails />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CartProvider>
    <OrderProvider>
        <RouterProvider router={router} />
    </OrderProvider>
      </CartProvider>
  </React.StrictMode>
);