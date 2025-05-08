import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookDetail.css';
import AddReview from './AddReview';

function BookDetail({ book, onBack }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddReview, setShowAddReview] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reviews');
        // Filter reviews for this book
        const bookReviews = response.data.filter(review => review.bookId === book.bookid);
        setReviews(bookReviews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    if (book) {
      fetchReviews();
    }
  }, [book]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
    setShowAddReview(false);
  };

  if (!book) return <div>No book selected</div>;

  return (
    <div className="book-detail">
      <button className="back-button" onClick={onBack}>Back to Books</button>
      <h2>{book.title}</h2>
      <div className="book-info">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Year:</strong> {book.year}</p>
        <p><strong>Book ID:</strong> {book.bookid}</p>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        {loading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="reviews-list">
            {reviews.map((review, index) => (
              <li key={review._id || index} className="review-item">
                <div className="review-header">
                  <span className="review-author">{review.author}</span>
                  <span className="review-rating">Rating: {review.rating}/5</span>
                </div>
                <p className="review-body">{review.body}</p>
              </li>
            ))}
          </ul>
        )}
        
        {!showAddReview ? (
          <button className="add-review-button" onClick={() => setShowAddReview(true)}>
            Add a Review
          </button>
        ) : (
          <AddReview bookId={book.bookid} onAddReview={handleAddReview} onCancel={() => setShowAddReview(false)} />
        )}
      </div>
    </div>
  );
}

export default BookDetail;
