import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Col, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mern-ecom-tguf.onrender.com' 
  : 'http://localhost:5500';

const RemoveProduct = () => {
    const [productId, setProductId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRemoveProduct = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.delete(`${API_URL}/admin/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setMessage('Product removed successfully');
                setLoading(false);
                setProductId('');
            })
            .catch(err => {
                console.error('Error removing product:', err);
                setMessage('Error removing product');
                setLoading(false);
            });
    };

    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">Remove Product</h1>
                <Row>
                    <Col md={6} className="offset-md-3">
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="productId">
                                        <Form.Label>Product ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product ID"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="danger" className="mt-3" onClick={handleRemoveProduct} disabled={loading}>
                                        {loading ? 'Removing...' : 'Remove Product'}
                                    </Button>
                                </Form>
                                {message && <p className="mt-3">{message}</p>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Button className="mt-3" onClick={() => navigate(-1)}>Back to Admin Dashboard</Button>
            </Container>
            <Footer />
        </>
    );
};

export default RemoveProduct;
