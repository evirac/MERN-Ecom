import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadCart(token);
        } else {
            setLoading(false);
        }
    }, []);

    const loadCart = async (token) => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5500/users/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data.cart);
            setLoading(false);
        } catch (err) {
            console.error('Error loading cart:', err);
            setError(err.response ? err.response.data.message : 'An error occurred');
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        axios.post('http://localhost:5500/users/cart/add', { productId: product._id }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async response => {
                setCart(response.data.cart);
                await loadCart(token)
            })
            .catch(err => {
                console.error('Error adding to cart:', err);
            });
    };

    const updateQuantity = (productId, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        axios.post('http://localhost:5500/users/cart/update', { productId, quantity }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async response => {
                setCart(response.data.cart);
                await loadCart(token)
            })
            .catch(err => {
                console.error('Error updating cart quantity:', err);
            });
    };

    const removeFromCart = (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        axios.post('http://localhost:5500/users/cart/remove', { productId }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async response => {
                setCart(response.data.cart);
                console.log('Remove from Cart:', response.data.cart);  // Debugging
                await loadCart(token)
            })
            .catch(err => {
                console.error('Error removing from cart:', err);
            });
    };


    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        try {
            await axios.post('http://localhost:5500/users/cart', { cart: [] }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart([]);
        } catch (err) {
            console.error('Error clearing cart:', err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, loadCart, loading, error }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
