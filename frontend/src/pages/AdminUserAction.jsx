import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Card, Col, Row, Button, ListGroup } from 'react-bootstrap';

const AdminUserActions = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState({
        user: {},
        addresses: [],
        orders: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5500/admin/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUserDetails(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching user details:', err);
                setLoading(false);
            });
    }, [userId]);

    const toggleAdminAccess = () => {
        const token = localStorage.getItem('token');
        axios.patch(`http://localhost:5500/admin/${userId}/toggleAdmin`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUserDetails(prevState => ({
                    ...prevState,
                    user: response.data
                }));
            })
            .catch(err => {
                console.error('Error updating admin access:', err);
            });
    };

    if (loading) {
        return (
            <>
                <Header />
                <Container className="my-3 text-center">
                    <p>Loading...</p>
                </Container>
                <Footer />
            </>
        );
    }

    const { user, addresses, orders } = userDetails;

    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">User Details</h1>
                <Row>
                    <Col md={8} className="offset-md-2">
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.fullName}</Card.Title>
                                <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                                <Card.Text><strong>User ID:</strong> {user._id}</Card.Text>
                                <Card.Text><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</Card.Text>
                                <Button onClick={toggleAdminAccess} className="mb-3">
                                    {user.isAdmin ? 'Revoke Admin Access' : 'Give Admin Access'}
                                </Button>
                            </Card.Body>
                        </Card>

                        <h2 className="text-center my-4">Saved Addresses</h2>
                        {addresses.length ? (
                            <ListGroup>
                                {addresses.map((address, idx) => (
                                    <ListGroup.Item key={idx}>
                                        {address.fullName}, {address.address}, {address.city}, {address.postalCode}, {address.country}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No saved addresses</p>
                        )}

                        <h2 className="text-center my-4">Orders</h2>
                        {orders.length ? (
                            <ListGroup>
                                {orders.map((order, idx) => (
                                    <ListGroup.Item key={idx}>
                                        Order ID: {order._id} - Total Price: {order.totalPrice} - Status: {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No orders</p>
                        )}

                        <Button className="mt-3" onClick={() => navigate(-1)}>Back to Admin Dashboard</Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default AdminUserActions;