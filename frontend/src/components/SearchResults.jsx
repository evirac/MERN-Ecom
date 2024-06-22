import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../contexts/CartContext';
import Toast from "../components/Toast";

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mern-ecom-tguf.onrender.com' 
  : 'http://localhost:5500';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/products`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setShowToast(true);
    };

    const filteredProducts = products.filter(product =>
        product.Name.toLowerCase().includes(query.toLowerCase()) ||
        product.Category.toLowerCase().includes(query.toLowerCase()) ||
        product.SubCategory.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="container my-3">
                <h1>Search Results for "{query}"</h1>
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product._id} className="col-lg-3 col-md-6 mb-3">
                                    <div className="card">
                                        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <img
                                                src={`data:image/jpeg;base64,${product.Image}`}
                                                className="card-img-top"
                                                alt={product.Name}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.Name}</h5>
                                                <p className="card-text">${product.Price}</p>
                                                <p className="card-text">Category: {product.Category}</p>
                                                <p className="card-text">Sub-Category: {product.SubCategory}</p>
                                            </div>
                                        </Link>
                                        <button className="btn btn-secondary ms-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                )}
            </div>
            {showToast && <Toast message="Item added to cart" onClose={() => setShowToast(false)} />}
            <Footer />
        </>
    );
};

export default SearchResults;
