import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';

function BookList({ onSelectBook }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-list">
      <h2>Available Books</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id} onClick={() => onSelectBook(book)}>
              <div className="book-item">
                <h3>{book.title}</h3>
                <p>By: {book.author}</p>
                <p>Year: {book.year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
