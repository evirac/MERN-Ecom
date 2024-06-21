import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../contexts/CartContext';
import Toast from "../components/Toast";
import ProductReview from "../components/ProductReview";
import { Spinner } from "react-bootstrap";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/products/${id}`);
                setProduct(response.data);
                const reviewsResponse = await axios.get(`http://localhost:5500/products/${id}/reviews`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        addToCart(product);
        setShowToast(true);
    };

    if (!product) {
        return (<div className="text-center my-5"><Spinner /></div>)
    }

    const getCategoryBadgeClass = (category) => {
        switch (category) {
            case 'Men':
                return 'badge-men';
            case 'Women':
                return 'badge-women';
            case 'Kids':
                return 'badge-kids';
            default:
                return 'badge bg-primary';
        }
    };

    return (
        <>
            <Header />
            <div className="card m-3 mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={`data:image/jpeg;base64,${product.Image}`} className="img-fluid rounded p-1" alt={product.Name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-center">{product.Name}</h1>
                            <div className="d-flex justify-content-center mb-3">
                                <span className={`badge me-2 ${getCategoryBadgeClass(product.Category)}`}>{product.Category}</span>
                                <span className="badge bg-secondary">{product.SubCategory}</span>
                            </div>
                            <form className="card-text">
                                <strong className="d-block mb-1">${product.Price}</strong>
                                <div className="d-flex mb-1">
                                    <strong className="mb-1">Size:</strong>
                                    <select className="ms-2 border rounded" name="Size" id="">
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select>
                                </div>
                                <strong className="d-block mb-1">About this Product:</strong>
                                <ul>
                                    <li>Voluptas velit voluptates soluta cum, laboriosam mollitia quasi dolores expedita.</li>
                                    <li>Ratione debitis minima quisquam labore doloribus, quae expedita reiciendis tenetur nihil a aspernatur voluptatibus</li>
                                    <li>officiis nam quasi pariatur, nulla praesentium! Veritatis nesciunt quas</li>
                                </ul>
                                <p>Unde illo eos aliquid ex reprehenderit quia iusto, deserunt totam laboriosam obcaecati ipsa suscipit, consectetur iste nostrum quod! Molestiae dolores at, quas error atque temporibus impedit amet?</p>
                                <button type="button" className="btn contrast mt-3 p-2 btn-large" onClick={handleAddToCart}>
                                    Add to cart <FontAwesomeIcon icon={faCartShopping} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <ProductReview product={product} reviews={reviews} setReviews={setReviews} />

            {showToast && <Toast message="Item added to cart" onClose={() => setShowToast(false)} />}
            <Footer />
        </>
    );
}
