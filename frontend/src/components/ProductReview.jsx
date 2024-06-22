import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mern-ecom-tguf.onrender.com' 
  : 'http://localhost:5500';

const ProductReview = ({ product, reviews, setReviews }) => {
    const [newReview, setNewReview] = useState({ rating: 0, review: '' });

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            // navigate to login
            return;
        }

        try {
            await axios.post(`${API_URL}/products/${product._id}/reviews`, newReview, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const reviewsResponse = await axios.get(`${API_URL}/products/${product._id}/reviews`);
            setReviews(reviewsResponse.data);
            setNewReview({ rating: 0, review: '' });
        } catch (error) {
            console.error('Error adding review:', error);
        }
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

    return (
        <div className="reviews-section card m-3 mb-3 p-3">
            <h2>Ratings and Reviews</h2>
            <div className="average-rating">
                <h3>
                    Average Rating: {product.averageRating.toFixed(1)}{' '}
                    {renderStars(product.averageRating)}
                </h3>
            </div>
            <ul className="list-group">
                {reviews.map((review, idx) => (
                    <li key={idx} className="list-group-item">
                        <div className="d-flex align-items-center">
                            <div className="user-name me-2">{review.user.fullName}</div>
                            <div className="rating">{renderStars(review.rating)}</div>
                        </div>
                        <div className="review-text">{review.review}</div>
                    </li>
                ))}
            </ul>

            <form className="mt-3" onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <select
                        id="rating"
                        className="form-select"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        required
                    >
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Review</label>
                    <textarea
                        id="review"
                        className="form-control"
                        value={newReview.review}
                        onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default ProductReview;
