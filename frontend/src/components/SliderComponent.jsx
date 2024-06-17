import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/SliderComponent.css";
import { CartContext } from '../contexts/CartContext';
import Toast from "../components/Toast";

function SliderComponent() {
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:5500/products');
            setProducts(result.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        addToCart(product);
        setShowToast(true);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="container mx-auto p-4">
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {products.map((product) => (
                            <div key={product._id} className="card m-2 p-2">
                                <img
                                    src={`data:image/jpeg;base64,${product.Image}`}
                                    className="card-img-top"
                                    alt={product.Name}
                                />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{product.Name}</h5>
                                        <p className="card-text">${product.Price}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
                                        <button className="btn btn-secondary ms-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
            {showToast && <Toast message="Item added to cart" onClose={() => setShowToast(false)} />}
        </>
    );
}

export default SliderComponent;
