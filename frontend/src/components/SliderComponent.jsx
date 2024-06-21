import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/SliderComponent.css";
import { CartContext } from '../contexts/CartContext';
import Toast from "../components/Toast";
import { Container, Card, Ratio, Spinner, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowRight, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";


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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.4 && rating % 1 <= 0.6;

        return (
            <>
                {[...Array(5)].map((star, i) => (
                    <FontAwesomeIcon
                        key={i}
                        icon={i < fullStars ? faStar : (i === fullStars && halfStar ? faStarHalfAlt : faStar)}
                        className={i < rating ? 'text-warning' : 'text-secondary'}
                    />
                ))}
            </>
        );
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
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <>
            <Container className="p-4">
                {loading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {products.map((product) => (
                            <Card key={product._id} className="m-2 p-2">
                                <Ratio aspectRatio={'1x1'}>
                                    <img
                                        src={`data:image/jpeg;base64,${product.Image}`}
                                        className="card-img-top"
                                        alt={product.Name}
                                    />
                                </Ratio>


                                <Card.Body className="card-body d-flex flex-column justify-content-between">
                                    <Stack direction="horizontal">
                                        <Card.Title>{product.Name}</Card.Title>
                                        <div className="vr ms-auto bg-primary" />
                                        <Card.Text className="ms-auto mb-2">${product.Price}</Card.Text>
                                    </Stack>
                                    <div className="d-flex justify-content-evenly mt-3">
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="btn ">
                                                Product Details <FontAwesomeIcon icon={faArrowRight} />
                                        </Link>
                                        <button
                                            className="btn contrast ms-2"
                                            onClick={() => handleAddToCart(product)}>
                                            <FontAwesomeIcon icon={faCartShopping} />
                                        </button>
                                    </div>
                                    <Card.Footer className="mt-3">
                                        {renderStars(product.averageRating)} ({product.reviews.length})
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        ))}
                    </Slider>
                )}
            </Container>
            {showToast && <Toast message="Item added to cart" onClose={() => setShowToast(false)} />}
        </>
    );
}

export default SliderComponent;
