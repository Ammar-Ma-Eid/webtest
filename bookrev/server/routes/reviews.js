const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');

// POST new review
router.post('/', async (req, res) => {
  try {
    // Check if book exists
    const book = await Book.findById(req.body.book);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newReview = new Review({
      book: req.body.book,
      rating: req.body.rating,
      text: req.body.text,
      userName: req.body.userName
    });

    const review = await newReview.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET reviews for a specific book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
