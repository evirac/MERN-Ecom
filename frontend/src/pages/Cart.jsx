import React, { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Stack, Container, Col, Row, Card, Spinner } from 'react-bootstrap';


export default function Cart() {
    const { cart, updateQuantity, removeFromCart, loading, error } = useContext(CartContext);
    const navigate = useNavigate();

    const calculateTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.productId.Price * item.quantity, 0);
        const tax = total * 0.1;
        return { total, tax, grandTotal: total + tax };
    };

    const handleProceedToPayment = () => {
        navigate('/shipping');
    };

    // Helper function to convert image buffer to base64 string
    const getImageSrc = (imageBuffer) => {
        if (!imageBuffer || !imageBuffer.data) return '';
        const uint8Array = new Uint8Array(imageBuffer.data);
        const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
        const imageBase64 = btoa(binaryString);
        return `data:image/jpeg;base64,${imageBase64}`;
    };

    if (loading) return (
        <div className="text-center mt-5">
            <Spinner />
        </div>
    );
    if (error) return <div>Error: {error}</div>;

    const { total, tax, grandTotal } = calculateTotal();
    return (
        <>
            <Header />
            <Container className="my-3">
                <h1 className="text-center">Shopping Cart</h1>
                <Row>
                    {cart.map(item => (
                        <Col xs={12} key={item._id} className="mb-3">
                            <Card className="d-flex" style={{maxWidth: "690px"}}>
                                <Row  className="g-0">
                                    <Col md={4}>
                                        <Card.Img variant='top' src={getImageSrc(item.productId.Image)}></Card.Img>
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{item.productId.Name}</Card.Title>
                                            <Card.Text>${item.productId.Price}</Card.Text>
                                            <div className="d-flex align-items-center mb-2">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    disabled={item.quantity === 1}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <Card.Link>
                                                <button
                                                    className="btn contrast"
                                                    onClick={() => removeFromCart(item.productId._id)}
                                                >
                                                    Remove
                                                </button>
                                            </Card.Link>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Summary</h5>
                                <p className="card-text">Subtotal: ${total.toFixed(2)}</p>
                                <p className="card-text">Tax (10%): ${tax.toFixed(2)}</p>
                                <h5 className="card-text">Total: ${grandTotal.toFixed(2)}</h5>
                                <button className="btn btn-primary mt-3" onClick={handleProceedToPayment}>Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}
