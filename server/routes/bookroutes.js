const express = require('express');
const Router = express.Router();
const Book = require('../models/bookschema');

// POST /api/books: Adds a new book to the database
Router.post('/books', async (req, res) => {
    const book = new Book({
        bookid: req.body.bookid,
        title: req.body.title || req.body.name, // Support both title and name
        author: req.body.author,
        year: req.body.year,
    });

    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/books: Returns a list of all books
Router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/books/:id: Returns details of a single book by ID
Router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ bookid: req.params.id });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

Router.delete('/deletebook/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id).then(() => {
        res.send('Book deleted');
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = Router;

