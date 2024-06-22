import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Card, Row, Col, Spinner, ListGroup } from 'react-bootstrap';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mern-ecom-tguf.onrender.com' 
  : 'http://localhost:5500';


const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${API_URL}/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setOrder(response.data)
                console.log("order: ", order)
            })
            .catch(err => console.error('Error fetching order details:', err));
    }, [orderId]);

    if (!order) {
        return (
            <Container className='mt-5 text-center'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
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
                <Row>
                    {order.cart.map(product => (
                        <Col lg={6} key={product.productId._id}>
                            <Card className="my-3" >
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
                        </Col>
                    ))}
                </Row>
                <Row className='align-items-cente'>
                    <Col md={12}>
                        <ListGroup variant='' horizontal="md" >
                            <ListGroup.Item variant='dark'>Order ID: {order._id}</ListGroup.Item>
                            <ListGroup.Item variant='dark'>Total Price Paid: ${order.totalPrice}</ListGroup.Item>
                            <ListGroup.Item variant='dark'>Mode of Payment: {order.paymentMethod}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default OrderDetails;
