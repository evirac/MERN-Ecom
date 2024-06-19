import React, { Fragment, useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
        <Fragment>
            <Header />
            <div className='container mb-5'>
                <h2>Order Summary</h2>
                <h3>Cart Items</h3>
                {order.cart.length > 0 ? (
                    order.cart.map(item => (
                        <div className='my-2' key={item.productId._id}>
                            {item.quantity} x {item.productId.Name} - ${item.productId.Price * item.quantity}
                        </div>
                    ))
                ) : (
                    <div>No items in the cart.</div>
                )}
                <h3>Shipping Address</h3>
                {order.shippingAddress ? (
                    <div>
                        {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </div>
                ) : (
                    <div>No shipping address provided.</div>
                )}
                <h3>Payment Method</h3>
                <div>{order.paymentMethod || 'No payment method selected.'}</div>
                <button className='btn' onClick={handlePlaceOrder}>Place Order</button>
            </div>
            <Footer />
        </Fragment>
    );
};

export default OrderSummary;
