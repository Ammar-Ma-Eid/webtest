import React, { useState } from 'react';
import axios from 'axios';
import './AddBook.css';

function AddBook({ onBookAdded, onCancel }) {
  const [bookData, setBookData] = useState({
    bookid: '',
    title: '',
    author: '',
    year: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: name === 'year' ? (value === '' ? '' : parseInt(value, 10)) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!bookData.bookid || !bookData.title || !bookData.author || !bookData.year) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/books', bookData);
      onBookAdded(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add New Book</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookid">Book ID:</label>
          <input
            type="text"
            id="bookid"
            name="bookid"
            value={bookData.bookid}
            onChange={handleChange}
            placeholder="Enter a unique book ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={bookData.year}
            onChange={handleChange}
            placeholder="Enter publication year"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
