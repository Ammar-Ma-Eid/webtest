import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import BookDetails from './components/books/BookDetails';
import AddBook from './components/books/AddBook';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/add-book" element={<AddBook />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
