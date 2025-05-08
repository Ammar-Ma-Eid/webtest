
import React, { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [books, setBooks] = useState([]);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setShowAddBook(false);
  };

  const handleBackToList = () => {
    setSelectedBook(null);
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowAddBook(true);
  };

  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
    setShowAddBook(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Management System</h1>
      </header>

      <main>
        {!selectedBook && !showAddBook && (
          <div className="book-list-container">
            <div className="actions">
              <button className="add-button" onClick={handleAddBook}>
                Add New Book
              </button>
            </div>
            <BookList onSelectBook={handleSelectBook} />
          </div>
        )}

        {selectedBook && (
          <BookDetail book={selectedBook} onBack={handleBackToList} />
        )}

        {showAddBook && (
          <AddBook
            onBookAdded={handleBookAdded}
            onCancel={() => setShowAddBook(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
