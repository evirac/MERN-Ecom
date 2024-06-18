import React, { createContext, useState } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState({
        cart: [],
        shippingAddress: null,
        paymentMethod: null,
        totalPrice: 0
    });

    const addShippingAddress = (address) => {
        setOrder(prevOrder => ({ ...prevOrder, shippingAddress: address }));
    };

    const addPaymentMethod = (paymentMethod) => {
        setOrder(prevOrder => ({ ...prevOrder, paymentMethod }));
    };

    const placeOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5500/order', order, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
