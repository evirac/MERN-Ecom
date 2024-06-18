import React, { useState, useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const { addPaymentMethod } = useContext(OrderContext);
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleNext = () => {
        if (paymentMethod) {
            addPaymentMethod(paymentMethod);
            navigate('/order-summary');
        }
    };

    return (
        <div>
            <h2>Payment Method</h2>
            <input type="radio" name="paymentMethod" value="PayPal" onChange={handlePaymentChange} /> PayPal
            <input type="radio" name="paymentMethod" value="Cash on Delivery" onChange={handlePaymentChange} /> Cash on Delivery
            <button onClick={handleNext}>Order Summary</button>
        </div>
    );
};

export default Payment;
