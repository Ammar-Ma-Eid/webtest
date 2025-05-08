import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/api/books');
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Book Collection</h1>
      {books.length === 0 ? (
        <p>No books found. Add some books to get started!</p>
      ) : (
        <div className="book-list">
          {books.map(book => (
            <div key={book._id} className="book-card">
              {book.coverImage ? (
                <img src={book.coverImage} alt={book.title} />
              ) : (
                <div style={{ height: '300px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p>No Cover Image</p>
                </div>
              )}
              <h3>{book.title}</h3>
              <p>By {book.author}</p>
              <p>{book.genre}</p>
              <Link to={`/books/${book._id}`} className="btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
