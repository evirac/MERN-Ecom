import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mern-ecom-tguf.onrender.com' 
  : 'http://localhost:5500';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { cart, clearCart } = useContext(CartContext);
    const [order, setOrder] = useState({
        cart: [],
        shippingAddress: null,
        paymentMethod: null,
        totalPrice: 0,
    });

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cart.reduce((acc, item) => acc + item.productId.Price * item.quantity, 0);
            const tax = total * 0.1;
            return total + tax;
        };

        setOrder(prevOrder => ({
            ...prevOrder,
            cart,
            totalPrice: calculateTotalPrice(),
        }));
    }, [cart]);

    const addShippingAddress = (address) => {
        setOrder(prevOrder => ({ ...prevOrder, shippingAddress: address }));
    };

    const addPaymentMethod = (paymentMethod) => {
        setOrder(prevOrder => ({ ...prevOrder, paymentMethod }));
    };

    const placeOrder = async () => {
        try {
            const token = localStorage.getItem('token');

            // Extract only necessary information from cart items
            const cartItems = cart.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.Price
            }));

            const orderData = {
                cart: cartItems,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                totalPrice: order.totalPrice,
            };

            const response = await axios.post(`${API_URL}/orders`, orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            clearCart(); // Clear the cart after placing the order
            return response.data;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider value={{ order, addShippingAddress, addPaymentMethod, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
