import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Col, Row, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UpdateProduct = () => {
    const [productId, setProductId] = useState('');
    const [productDetails, setProductDetails] = useState({
        name: '',
        price: '',
        category: '',
        subCategory: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleUpdateProduct = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.put(`http://localhost:5500/admin/${productId}`, productDetails, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setMessage('Product updated successfully');
                setLoading(false);
                setProductId('');
                setProductDetails({
                    name: '',
                    price: '',
                    category: '',
                    subCategory: '',
                    image: ''
                });
            })
            .catch(err => {
                console.error('Error updating product:', err);
                setMessage('Error updating product');
                setLoading(false);
            });
    };

    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">Update Product</h1>
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
                                    <Form.Group controlId="name" className="mt-3">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product name"
                                            name="name"
                                            value={productDetails.name}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="price" className="mt-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter product price"
                                            name="price"
                                            value={productDetails.price}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="category" className="mt-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product category"
                                            name="category"
                                            value={productDetails.category}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="subCategory" className="mt-3">
                                        <Form.Label>Sub Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter product sub category"
                                            name="subCategory"
                                            value={productDetails.subCategory}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="image" className="mt-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            onChange={(e) => setProductDetails({ ...productDetails, image: e.target.files[0] })}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="mt-3" onClick={handleUpdateProduct} disabled={loading}>
                                        {loading ? 'Updating...' : 'Update Product'}
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

export default UpdateProduct;
