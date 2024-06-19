import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../contexts/CartContext';
import { Row, Col, Container, Card, Spinner } from "react-bootstrap"


const Profile = () => {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        clearCart();
        navigate('/login');
    };

    return (
        <>
            <Header />
            <Container className="container my-3">
                <h1 className="text-center">Profile</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Profile Details</h5>
                                <p className="card-text">Full Name: {user.fullName}</p>
                                <p className="card-text">
                                    Email: {user.email}
                                    <Link to="/updateEmail" className="btn btn-link ms-2">Update Email</Link>
                                </p>
                                <Link to="/resetPassword" className="btn btn-link">Reset Password</Link>
                            </div>
                        </div>
                        <button className="btn contrast mt-3" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
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
                            <Col md={4} key={index}>
                                <Card className="my-2">
                                    <Card.Body>
                                        <Card.Title>
                                            <Link className='btn contrast' to={`/order/${order._id}`}>Order ID: {order._id}</Link>
                                        </Card.Title>
                                        {order.cart.slice(0, 3).map((product, idx) => (
                                            <Card.Text key={idx}>
                                                {product.productId.Name} X {product.quantity}
                                            </Card.Text>
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
