import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const bookRes = await axios.get(`/api/books/${id}`);
        setBook(bookRes.data);
        
        const reviewsRes = await axios.get(`/api/reviews/book/${id}`);
        setReviews(reviewsRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchBookAndReviews();
  }, [id]);

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      {book.coverImage ? (
        <img src={book.coverImage} alt={book.title} />
      ) : (
        <div style={{ width: '300px', height: '400px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>No Cover Image</p>
        </div>
      )}
      <div style={{ textAlign: 'left', width: '100%', maxWidth: '800px' }}>
        <h3>Author: {book.author}</h3>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Published:</strong> {book.publishedYear}</p>
        <h3>Description:</h3>
        <p>{book.description}</p>
      </div>

      <div className="review-section" style={{ width: '100%', maxWidth: '800px' }}>
        <h2>Reviews</h2>
        <ReviewForm bookId={id} addReview={addReview} />
        
        <div className="review-list">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="review-card">
                <div className="star-rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p>{review.text}</p>
                <p><strong>By:</strong> {review.userName}</p>
                <p><small>{new Date(review.createdAt).toLocaleDateString()}</small></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
