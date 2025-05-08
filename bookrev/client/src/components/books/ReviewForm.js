import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ bookId, addReview }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    text: '',
    userName: ''
  });

  const { rating, text, userName } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    try {
      const res = await axios.post('/api/reviews', {
        book: bookId,
        rating,
        text,
        userName
      });
      
      addReview(res.data);
      
      // Reset form
      setFormData({
        rating: 5,
        text: '',
        userName: ''
      });
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="card">
      <h3>Add a Review</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={onChange}
            required
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="text">Review</label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={onChange}
            placeholder="Write your review here..."
            required
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="userName">Your Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit" className="btn btn-block">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
