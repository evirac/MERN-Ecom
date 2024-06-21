import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Toast from "../components/Toast";
import { Ratio, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const { addToCart } = useContext(CartContext);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const subCategories = {
        Men: ['Pant', 'Shirt', 'Hoodie'],
        Women: ['Pant', 'Skirt', 'Dress'],
        Kids: ['Boys', 'Girls']
    };

    const handleAddToCart = (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        addToCart(product);
        setShowToast(true);
    };

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const category = searchParams.get('category') || '';
        const subCategory = searchParams.get('subCategory') || '';

        setSelectedCategory(category);
        setSelectedSubCategory(subCategory);

        axios.get('http://localhost:5500/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false); // Data fetched, set loading to false
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false); // In case of error, set loading to false
            });
    }, [searchParams]);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSelectedSubCategory('');

        const newParams = new URLSearchParams();
        if (category) {
            newParams.set('category', category);
        }
        window.history.replaceState(null, '', `?${newParams.toString()}`);
    };

    const handleSubCategoryChange = (event) => {
        const subCategory = event.target.value;
        setSelectedSubCategory(subCategory);

        const newParams = new URLSearchParams();
        if (selectedCategory) {
            newParams.set('category', selectedCategory);
        }
        if (subCategory) {
            newParams.set('subCategory', subCategory);
        }
        window.history.replaceState(null, '', `?${newParams.toString()}`);
    };

    const filteredProducts = selectedSubCategory
        ? products.filter(product => product.SubCategory === selectedSubCategory && product.Category === selectedCategory)
        : selectedCategory
            ? products.filter(product => product.Category === selectedCategory)
            : products;

    return (
        <>
            <Header />
            <div className="container my-3">
                <div className="row mb-3">
                    <div className="col-md-4">
                        <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">All Categories</option>
                            {Object.keys(subCategories).map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" value={selectedSubCategory} onChange={handleSubCategoryChange} disabled={!selectedCategory}>
                            <option value="">All Subcategories</option>
                            {selectedCategory && subCategories[selectedCategory].map((subCategory, index) => (
                                <option key={index} value={subCategory}>{subCategory}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    {loading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        filteredProducts.map(product => (
                            <div key={product._id} className="col-lg-3 col-md-6 mb-3">
                                <div className="card">
                                    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Ratio aspectRatio={'1x1'}>
                                         <img
                                            src={`data:image/jpeg;base64,${product.Image}`}
                                            className="card-img-top"
                                            alt={product.Name}
                                        />
                                    </Ratio>
                                       

                                        <div className="card-body">
                                            <h5 className="card-title">{product.Name}</h5>
                                            <p className="card-text">${product.Price}</p>
                                            <p className="card-text">Category: {product.Category}</p>
                                            <p className="card-text">Sub-Category: {product.SubCategory}</p>
                                        </div>
                                    </Link>
                                    <button 
                                    className="btn contrast m-2" 
                                        onClick={() => handleAddToCart(product)}>
                                        Add to Cart <FontAwesomeIcon icon={faCartShopping} />
                                        </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {showToast && <Toast message="Item added to cart" onClose={() => setShowToast(false)} />}
            <Footer />
        </>
    );
};

export default Products;
