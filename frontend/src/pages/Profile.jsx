import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../contexts/CartContext';
import { Row, Col, Container, Card, Spinner, Stack, ListGroup } from "react-bootstrap"


const Profile = () => {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const { clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5500/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setUser(response.data))
            .catch(err => console.error('Error fetching profile:', err));

        axios.get('http://localhost:5500/orders/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setOrders(response.data)
                setLoading(false); // Data fetched, set loading to false
            })
            .catch(err => console.error('Error fetching order history:', err));
    }, []);


    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">Profile</h1>
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}  className="ms-auto">
                        <Card>
                            <Card.Body>
                                <Card.Title>Profile Details</Card.Title>
                                <Card.Text>Full Name: {user.fullName}</Card.Text>
                                <Card.Text className="card-text">
                                    Email: {user.email}
                                </Card.Text>
                                <Stack direction='horizontal' gap={2} >
                                    <Link to="/updateEmail" className="btn btn-link ms-2">Update Email</Link>
                                    <Link to="/resetPassword" className=" btn btn-link">Reset Password</Link>

                                    {user.isAdmin && (
                                        <Link to="/admin" className="btn">Admin Actions</Link>
                                    )}
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                <h2 className="text-center my-4">Order History</h2>
                {loading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row>
                        {orders.map((order, index) => (
                            <Col  key={index} md={4} >
                                <Card className="my-2 shadow shadow-primary">
                                    <Card.Body>
                                        <Card.Title>
                                            <Link className='btn contrast' to={`/order/${order._id}`}>Order ID: {order._id}</Link>
                                            <hr className='shadow' />
                                        </Card.Title>
                                        {order.cart.slice(0, 3).map((product, idx) => (
                                            <div className='card-text' key={idx}>
                                                <ListGroup>
                                                    <ListGroup.Item variant='primary' className='mb-1'>
                                                        {product.productId.Name} X {product.quantity}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Profile;
