import React, { useState } from 'react';
import axios from 'axios';
import './AddReview.css';

function AddReview({ bookId, onAddReview, onCancel }) {
  const [reviewData, setReviewData] = useState({
    bookId: bookId,
    comment: '',
    rating: 5,
    reviewer: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!reviewData.comment || !reviewData.reviewer) {
      setError('Comment and name are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/reviews', reviewData);
      onAddReview(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review. Please try again.');
      console.error('Error adding review:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-review-form">
      <h3>Add a Review</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reviewer">Your Name:</label>
          <input
            type="text"
            id="reviewer"
            name="reviewer"
            value={reviewData.reviewer}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Review:</label>
          <textarea
            id="comment"
            name="comment"
            value={reviewData.comment}
            onChange={handleChange}
            placeholder="Write your review here"
            rows="4"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
