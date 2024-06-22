import React, { Fragment, useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Container , Row, Col} from 'react-bootstrap';

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
            <Container className='container mb-5'>
                <h2>Order Summary</h2>
                <Row className='p-2'>
                    <Col md={4}>
                    <h4>Cart Items</h4>
                        <div className="card-text">
                            {order.cart.length > 0 ? (
                                order.cart.map(item => (
                                    <ListGroup variant='flush' className='my-2' key={item.productId._id}>
                                        <ListGroup.Item>
                                            <ListGroup horizontal>
                                                <ListGroup.Item variant='dark'>{item.quantity}</ListGroup.Item>
                                                <ListGroup.Item variant='dark'>{item.productId.Name}</ListGroup.Item>
                                                <ListGroup.Item variant='dark'>${item.productId.Price * item.quantity}</ListGroup.Item>
                                            </ListGroup>

                                        </ListGroup.Item>
                                    </ListGroup>
                                ))
                            ) : (
                                <div>No items in the cart.</div>
                            )}

                        </div>
                    </Col>
                </Row>

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
            </Container>
            <Footer />
        </Fragment>
    );
};

export default OrderSummary;
