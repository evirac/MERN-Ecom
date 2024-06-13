import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            loadCart();
        }
    }, [token]);

    const loadCart = () => {
        axios.get('http://localhost:5500/users/cart', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setCart(response.data.cart);
        })
        .catch(err => console.error('Error loading cart:', err));
    };

    const saveCart = (updatedCart) => {
        axios.post('http://localhost:5500/users/cart', { cart: updatedCart }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .catch(err => console.error('Error saving cart:', err));
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            const updatedCart = existingProduct ? prevCart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ) : [...prevCart, { ...product, quantity: 1 }];
            
            saveCart(updatedCart);
            return updatedCart;
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item._id === productId ? { ...item, quantity } : item
            );
            saveCart(updatedCart);
            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item._id !== productId);
            saveCart(updatedCart);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
