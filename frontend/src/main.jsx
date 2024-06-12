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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
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
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* Wrap the application with CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);