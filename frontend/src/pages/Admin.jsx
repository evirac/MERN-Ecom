import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Card, Col, Row, ListGroup, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5500/admin', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setUsers(response.data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">Admin Dashboard</h1>
                <Row>
                    <Col md={8} className="offset-md-2">
                        <Card>
                            <Card.Body>
                                <Card.Title>Users Actions</Card.Title>
                                <ListGroup>
                                    {users.map(user => (
                                        <ListGroup.Item variant='flush' key={user._id} className="list-group-item mb-1">
                                            <Link to={`/admin/user/${user._id}`}>
                                                {user.fullName} - {user.email}
                                            </Link>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>

                            <Card.Body>
                                <Card.Title>Products Actions</Card.Title>
                                <Stack gap={4} direction='horizontal'>
                                    <Link className='btn' to='/addproduct'>Add product</Link>
                                    <Link className='btn' to='/removeproduct'>Remove product</Link>
                                    <Link className='btn' to='/updateproduct'>Update product</Link>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Admin;