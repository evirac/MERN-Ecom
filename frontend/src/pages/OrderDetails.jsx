import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Card, Row, Col } from 'react-bootstrap';
const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        console.log("order: ",order)
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5500/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setOrder(response.data))
            .catch(err => console.error('Error fetching order details:', err));
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    // Helper function to convert image buffer to base64 string
    const getImageSrc = (imageBuffer) => {
        if (!imageBuffer || !imageBuffer.data) return '';
        const uint8Array = new Uint8Array(imageBuffer.data);
        const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
        const imageBase64 = btoa(binaryString);
        return `data:image/jpeg;base64,${imageBase64}`;
    };

    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">Order Details</h1>
                {order.cart.map((product, index) => (
                    <Card className="my-3" key={index}>
                        <Row>
                            <Col md={3}>
                                <Card.Img variant="top" src={getImageSrc(product.productId.Image)} />
                            </Col>
                            <Col md={9}>
                                <Card.Body>
                                    <Card.Title>{product.productId.Name}</Card.Title>
                                    <Card.Text>Quantity: {product.quantity}</Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                ))}
                <div className="text-center">
                    <p>Order ID: {order._id}</p>
                    <p>Total Price Paid: ${order.totalPrice}</p>
                    <p>Mode of Payment: {order.paymentMethod}</p>
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default OrderDetails;
