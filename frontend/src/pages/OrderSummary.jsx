import React, { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    const { order, placeOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        try {
            const response = await placeOrder();
            navigate(`/order/${response.order._id}`);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Cart Items</h3>
            {order.cart.map(item => (
                <div key={item.productId}>
                    {item.quantity} x {item.productId}
                </div>
            ))}
            <h3>Shipping Address</h3>
            <div>
                {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </div>
            <h3>Payment Method</h3>
            <div>{order.paymentMethod}</div>
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};

export default OrderSummary;
