import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

    const calculateTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.productId.Price * item.quantity, 0);
        const tax = total * 0.1;
        return { total, tax, grandTotal: total + tax };
    };

    // Helper function to convert image buffer to base64 string
    const getImageSrc = (imageBuffer) => {
        if (!imageBuffer || !imageBuffer.data) return '';
        const uint8Array = new Uint8Array(imageBuffer.data);
        const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
        const imageBase64 = btoa(binaryString);
        return `data:image/jpeg;base64,${imageBase64}`;
    };
    
    const { total, tax, grandTotal } = calculateTotal();
    return (
        <>
            <Header />
            <div className="container my-3">
                <h1 className="text-center">Shopping Cart</h1>
                <div className="row">
                    {cart.map(item => (
                        <div key={item._id} className="col-12 mb-3">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src={getImageSrc(item.productId.Image)}
                                            className="img-thumbnail rounded-start"
                                            alt={item.productId.Name}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{item.productId.Name}</h5>
                                            <p className="card-text">${item.productId.Price}</p>
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
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeFromCart(item.productId._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Summary</h5>
                                <p className="card-text">Subtotal: ${total.toFixed(2)}</p>
                                <p className="card-text">Tax (10%): ${tax.toFixed(2)}</p>
                                <h5 className="card-text">Total: ${grandTotal.toFixed(2)}</h5>
                                <button className="btn btn-primary mt-3">Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
